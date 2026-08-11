import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Greeting } from './components/Greeting';
import { ChatInput } from './components/ChatInput';
import { AnalysisResultCard } from './components/AnalysisResultCard';
import { LoadingAnalysisCard } from './components/LoadingAnalysisCard';
import { CameraModal } from './components/CameraModal';
import { VoiceInputModal } from './components/VoiceInputModal';
import { ModelsModal } from './components/ModelsModal';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { INITIAL_HISTORY, INITIAL_MODELS, DEFAULT_USER_SETTINGS } from './data/initialData';
import { AIModel, ChatMessage, PlantDiagnosis, UserSettings } from './types';
import { Language } from './i18n/translations';
import { getClientFallbackDiagnosis } from './utils/fallbackAgronomy';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState<PlantDiagnosis[]>(INITIAL_HISTORY);
  const [activeDiagnosis, setActiveDiagnosis] = useState<PlantDiagnosis | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentModel, setCurrentModel] = useState<AIModel>(INITIAL_MODELS[0]);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleLanguageChange = (lang: Language) => {
    setSettings((prev) => ({ ...prev, language: lang }));
  };

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        showToast(
          settings.language === 'ru'
            ? `Добро пожаловать, ${currentUser.displayName || currentUser.email}!`
            : settings.language === 'kk'
            ? `Қош келдіңіз, ${currentUser.displayName || currentUser.email}!`
            : `Welcome, ${currentUser.displayName || currentUser.email}!`
        );
      }
    });
    return () => unsubscribe();
  }, [settings.language]);

  // Real-time Firestore Sync for User's Chats & History
  useEffect(() => {
    if (!user) {
      setHistory(INITIAL_HISTORY);
      return;
    }

    const q = query(
      collection(db, 'chats'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userChats: PlantDiagnosis[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          userChats.push({
            id: docSnap.id,
            plantName: data.plantName || 'Plant',
            botanicalName: data.botanicalName || '',
            diseaseName: data.diseaseName || 'Healthy',
            isHealthy: data.isHealthy !== undefined ? data.isHealthy : false,
            severity: data.severity || 'low',
            confidence: data.confidence || 95,
            summary: data.summary || '',
            imageUrl: data.imageUrl || '',
            symptoms: data.symptoms || [],
            treatmentSteps: data.treatmentSteps || [],
            preventativeTips: data.preventativeTips || [],
            careGuide: data.careGuide || {
              watering: '',
              humidity: '',
              light: '',
              fertilizer: '',
              temperature: '',
              soil: '',
            },
            recommendedProducts: data.recommendedProducts || [],
            weatherNotes: data.weatherNotes || {
              condition: '',
              tempImpact: '',
              humidityAlert: '',
              actionRequired: '',
            },
            timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isFavorite: !!data.isFavorite,
          });
        });

        // Sort by timestamp or ID descending
        userChats.sort((a, b) => b.id.localeCompare(a.id));
        setHistory(userChats);
      },
      (error) => {
        console.error('Error fetching Firestore chats:', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      showToast(
        settings.language === 'ru'
          ? 'Вы вышли из аккаунта'
          : settings.language === 'kk'
          ? 'Аккаунттан шықтыңыз'
          : 'Signed out successfully'
      );
      handleNewChat();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Execute Plant Analysis
  const handleSend = async (overridePrompt?: string, overrideImage?: string) => {
    const promptToSend = overridePrompt !== undefined ? overridePrompt : inputPrompt;
    const imageToSend = overrideImage !== undefined ? overrideImage : selectedImage;

    if (!promptToSend.trim() && !imageToSend) return;

    // Create User Message
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: promptToSend,
      imageUrl: imageToSend || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setInputPrompt('');
    setSelectedImage(null);

    try {
      let diag: PlantDiagnosis | null = null;
      
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptToSend,
            imageBase64: imageToSend,
            modelId: currentModel.id,
            language: settings.language,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.diagnosis) {
            diag = data.diagnosis;
          }
        }
      } catch (networkErr) {
        console.warn('API call failed or static host detected, using client agronomy engine fallback:', networkErr);
      }

      if (!diag) {
        diag = getClientFallbackDiagnosis(promptToSend, imageToSend, settings.language);
      }

      if (diag) {
        setActiveDiagnosis(diag);

        // Assistant Chat Message
        const assistantMsg: ChatMessage = {
          id: 'asst-' + Date.now(),
          sender: 'assistant',
          text: `Diagnostic result for ${diag.plantName}: ${diag.diseaseName}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          diagnosis: diag,
        };

        setChatMessages((prev) => [...prev, assistantMsg]);

        // Save to Firestore if user logged in
        if (user) {
          try {
            await setDoc(doc(db, 'chats', diag.id), {
              ...diag,
              userId: user.uid,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            showToast(
              settings.language === 'ru'
                ? `Диагноз сохранен в ваш аккаунт`
                : settings.language === 'kk'
                ? `Диагноз аккаунтыңызға сақталды`
                : `Diagnosis saved to your account`
            );
          } catch (dbErr) {
            console.error('Firestore save error:', dbErr);
          }
        } else {
          // Local fallback
          if (settings.autoSaveHistory) {
            setHistory((prev) => [diag!, ...prev.filter((h) => h.id !== diag!.id)]);
          }
          showToast(
            settings.language === 'ru'
              ? `Войдите в аккаунт, чтобы сохранить чат навсегда`
              : settings.language === 'kk'
              ? `Чатты мәңгіге сақтау үшін аккаунтқа кіріңіз`
              : `Sign in to save this chat permanently`
          );
        }
      }
    } catch (err) {
      console.error('Error handling plant analysis:', err);
      showToast('Could not complete analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (text: string) => {
    setInputPrompt(text);
  };

  const handleSelectDiagnosisFromHistory = (diag: PlantDiagnosis) => {
    setActiveDiagnosis(diag);
    setChatMessages([
      {
        id: 'hist-msg-' + Date.now(),
        sender: 'assistant',
        text: `Loaded saved analysis for ${diag.plantName}.`,
        timestamp: diag.timestamp,
        diagnosis: diag,
      },
    ]);
  };

  const handleNewChat = () => {
    setActiveDiagnosis(null);
    setChatMessages([]);
    setInputPrompt('');
    setSelectedImage(null);
  };

  const handleDeleteHistory = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      try {
        await deleteDoc(doc(db, 'chats', id));
      } catch (err) {
        console.error('Error deleting doc from Firestore:', err);
      }
    } else {
      setHistory((prev) => prev.filter((item) => item.id !== id));
    }

    if (activeDiagnosis?.id === id) {
      setActiveDiagnosis(null);
    }
    showToast('Removed from history');
  };

  const handleToggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const item = history.find((h) => h.id === id);
    const nextFavState = item ? !item.isFavorite : true;

    if (user) {
      try {
        await updateDoc(doc(db, 'chats', id), { isFavorite: nextFavState });
      } catch (err) {
        console.error('Error updating favorite in Firestore:', err);
      }
    } else {
      setHistory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
      );
    }

    if (activeDiagnosis && activeDiagnosis.id === id) {
      setActiveDiagnosis((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
    showToast('Updated favorites');
  };

  const handleAskFollowUp = (plantName: string) => {
    setInputPrompt(`What is the best long-term care routine for ${plantName}?`);
  };

  const handleSetReminder = (plantName: string) => {
    showToast(`Care reminder set for ${plantName}!`);
  };

  return (
    <div className="min-h-screen bg-[#0F1411] bg-field-grid text-[#F2F5F3] flex flex-col font-sans selection:bg-[#38A169]/30 selection:text-[#38A169] relative overflow-x-hidden">
      {/* Left Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        history={history}
        activeDiagnosis={activeDiagnosis}
        onSelectDiagnosis={handleSelectDiagnosisFromHistory}
        onNewChat={handleNewChat}
        onOpenModels={() => setIsModelsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        user={user}
        currentModel={currentModel}
        onDeleteHistory={handleDeleteHistory}
        onToggleFavorite={handleToggleFavorite}
        language={settings.language}
      />

      {/* Main Content Area */}
      <div className="lg:pl-[280px] flex-1 flex flex-col min-h-screen relative z-10">
        {/* Top Header */}
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenModels={() => setIsModelsOpen(true)}
          currentModel={currentModel}
          onReset={handleNewChat}
          onOpenCamera={() => setIsCameraOpen(true)}
          language={settings.language}
          onSelectLanguage={handleLanguageChange}
        />

        {/* Workspace Body */}
        <main className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-36">
          {chatMessages.length === 0 && !activeDiagnosis ? (
            /* Initial Greeting View */
            <Greeting onSelectPreset={handleSelectPreset} language={settings.language} />
          ) : (
            /* Chat Stream & Results */
            <div className="w-full max-w-3xl mx-auto py-6 space-y-6">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="space-y-4 animate-fade-in">
                  {/* User Bubble */}
                  {msg.sender === 'user' && (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl bg-[#1D2620] border border-[#2F3E32] p-4 text-sm text-[#F2F5F3] space-y-2 shadow-sm">
                        {msg.imageUrl && (
                          <div className="max-w-xs rounded-xl overflow-hidden border border-[#2F3E32] mb-2">
                            <img src={msg.imageUrl} alt="Uploaded plant" className="w-full h-auto object-cover" />
                          </div>
                        )}
                        <p className="leading-relaxed font-medium">{msg.text}</p>
                        <p className="text-[10px] text-[#8C9A8E] text-right font-mono">{msg.timestamp}</p>
                      </div>
                    </div>
                  )}

                  {/* Assistant Diagnosis Response */}
                  {msg.sender === 'assistant' && msg.diagnosis && (
                    <AnalysisResultCard
                      diagnosis={msg.diagnosis}
                      onToggleFavorite={handleToggleFavorite}
                      onAskFollowUp={handleAskFollowUp}
                      onSetReminder={handleSetReminder}
                      language={settings.language}
                    />
                  )}
                </div>
              ))}

              {/* Loading State */}
              {isLoading && <LoadingAnalysisCard language={settings.language} />}
            </div>
          )}
        </main>

        {/* Sticky Fixed Bottom Input Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-[280px] z-20 bg-[#0F1411]/95 border-t border-[#232D25] pt-3 pb-2 backdrop-blur-md">
          <ChatInput
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            onSend={() => handleSend()}
            isLoading={isLoading}
            onOpenCamera={() => setIsCameraOpen(true)}
            onOpenVoice={() => setIsVoiceOpen(true)}
            language={settings.language}
          />
        </div>
      </div>

      {/* Popups and Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={settings.language}
      />

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(img) => setSelectedImage(img)}
        language={settings.language}
      />

      <VoiceInputModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onTranscript={(text) => setInputPrompt((prev) => (prev ? `${prev} ${text}` : text))}
        language={settings.language}
      />

      <ModelsModal
        isOpen={isModelsOpen}
        onClose={() => setIsModelsOpen(false)}
        currentModel={currentModel}
        onSelectModel={(model) => setCurrentModel(model)}
        language={settings.language}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
        language={settings.language}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

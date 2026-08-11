import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Language } from '../i18n/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, language }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName.trim()) {
          await updateProfile(userCredential.user, { displayName: displayName.trim() });
        }
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: displayName.trim() || userCredential.user.email?.split('@')[0],
          createdAt: new Date().toISOString(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      let msg = err.message || 'Authentication failed';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        msg = language === 'ru' ? 'Неверный email или пароль' : language === 'kk' ? 'Қате email немесе құпия сөз' : 'Invalid email or password';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = language === 'ru' ? 'Пользователь с таким email уже существует' : language === 'kk' ? 'Бұл email тіркелген' : 'Email is already registered';
      } else if (err.code === 'auth/weak-password') {
        msg = language === 'ru' ? 'Пароль должен быть не менее 6 символов' : language === 'kk' ? 'Құпия сөз кемінде 6 таңба болуы керек' : 'Password must be at least 6 characters';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        const userDocRef = doc(db, 'users', res.user.uid);
        const existingDoc = await getDoc(userDocRef);

        if (!existingDoc.exists()) {
          await setDoc(userDocRef, {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName || res.user.email?.split('@')[0],
            createdAt: new Date().toISOString(),
          });
        }
      }
      onClose();
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      let msg = err.message || 'Google Sign-In failed';
      if (err.code === 'auth/unauthorized-domain') {
        msg = language === 'ru'
          ? 'Домен Vercel (agroai-db555.vercel.app) не добавлен в "Authorized domains" в консоли Firebase. Воспользуйтесь входом по Email/Паролю или добавьте домен в консоли Firebase.'
          : language === 'kk'
          ? 'Vercel домені (agroai-db555.vercel.app) Firebase консолінде тіркелмеген. Email/Құпия сөзбен кіріңіз немесе доменді консольге қосыңыз.'
          : 'Domain (agroai-db555.vercel.app) is not in Firebase Authorized Domains. Use Email/Password registration or add domain in Firebase Console.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        msg = language === 'ru' ? 'Окно авторизации было закрыто' : language === 'kk' ? 'Авторизация терезесі жабылды' : 'Sign in popup was closed';
      } else if (err.code === 'auth/popup-blocked') {
        msg = language === 'ru' ? 'Всплывающее окно заблокировано браузером' : language === 'kk' ? 'Браузер калқымалы терезені бұғаттады' : 'Sign in popup blocked by browser';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#151B17] border border-[#28352A] rounded-xl p-6 space-y-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#28352A] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#2E7D32]/20 border border-[#2E7D32] text-[#38A169]">
              {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-[#F2F5F3] text-base">
                {mode === 'login'
                  ? language === 'ru' ? 'Вход в аккаунт' : language === 'kk' ? 'Аккаунтқа кіру' : 'Sign In'
                  : language === 'ru' ? 'Регистрация' : language === 'kk' ? 'Тіркелу' : 'Create Account'}
              </h3>
              <p className="text-xs text-[#8C9A8E] mt-0.5">
                {language === 'ru' ? 'Сохраняйте личные диагнозы и чаты' : language === 'kk' ? 'Жеке диагноздар мен чаттарды сақтаңыз' : 'Sync your personal plant diagnoses'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1D2620] text-[#8C9A8E] hover:text-[#F2F5F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#0F1411] rounded-lg border border-[#263328]">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`py-1.5 rounded text-xs font-semibold transition-colors ${
              mode === 'login'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
            }`}
          >
            {language === 'ru' ? 'Вход' : language === 'kk' ? 'Кіру' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`py-1.5 rounded text-xs font-semibold transition-colors ${
              mode === 'register'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
            }`}
          >
            {language === 'ru' ? 'Регистрация' : language === 'kk' ? 'Тіркелу' : 'Register'}
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#8C9A8E]">
                {language === 'ru' ? 'Имя' : language === 'kk' ? 'Аты-жөні' : 'Display Name'}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#8C9A8E] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder={language === 'ru' ? 'Иван Агрономов' : language === 'kk' ? 'Агроном' : 'Alex Farmer'}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-[#0F1411] border border-[#263328] text-[#F2F5F3] placeholder-[#8C9A8E]/50 text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-[#38A169] transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#8C9A8E]">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C9A8E] absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="agronomist@farm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0F1411] border border-[#263328] text-[#F2F5F3] placeholder-[#8C9A8E]/50 text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-[#38A169] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#8C9A8E]">
              {language === 'ru' ? 'Пароль' : language === 'kk' ? 'Құпия сөз' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C9A8E] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0F1411] border border-[#263328] text-[#F2F5F3] placeholder-[#8C9A8E]/50 text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-[#38A169] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg field-button-primary font-semibold text-xs cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>{language === 'ru' ? 'Войти' : language === 'kk' ? 'Кіру' : 'Sign In'}</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>{language === 'ru' ? 'Зарегистрироваться' : language === 'kk' ? 'Тіркелу' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-[#263328] w-full" />
          <span className="bg-[#151B17] px-3 text-[10px] uppercase font-bold text-[#8C9A8E] tracking-wider absolute">
            {language === 'ru' ? 'Или' : language === 'kk' ? 'Немесе' : 'Or'}
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-[#111612] hover:bg-[#1D2620] border border-[#28352A] text-[#F2F5F3] font-semibold text-xs flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>
            {language === 'ru' ? 'Войти через Google' : language === 'kk' ? 'Google арқылы кіру' : 'Continue with Google'}
          </span>
        </button>
      </div>
    </div>
  );
};

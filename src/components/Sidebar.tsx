import React, { useState } from 'react';
import { 
  Plus, 
  History, 
  Star, 
  Cpu, 
  Settings as SettingsIcon, 
  User, 
  Sprout, 
  Search, 
  Trash2, 
  ChevronRight, 
  X,
  LogOut,
  LogIn
} from 'lucide-react';
import { AIModel, PlantDiagnosis } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Logo } from './Logo';

import { User as FirebaseUser } from 'firebase/auth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: PlantDiagnosis[];
  activeDiagnosis: PlantDiagnosis | null;
  onSelectDiagnosis: (diag: PlantDiagnosis) => void;
  onNewChat: () => void;
  onOpenModels: () => void;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
  onSignOut: () => void;
  user: FirebaseUser | null;
  currentModel: AIModel;
  onDeleteHistory: (id: string, e: React.MouseEvent) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  history,
  activeDiagnosis,
  onSelectDiagnosis,
  onNewChat,
  onOpenModels,
  onOpenSettings,
  onOpenAuth,
  onSignOut,
  user,
  currentModel,
  onDeleteHistory,
  onToggleFavorite,
  language,
}) => {
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language];

  const filteredHistory = history.filter((item) => {
    const matchesFilter = filter === 'all' || (filter === 'favorites' && item.isFavorite);
    const matchesSearch =
      item.plantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.diseaseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-[#131915] border-r border-[#263328] flex flex-col justify-between transition-transform duration-200 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand */}
        <div>
          <div className="p-4 flex items-center justify-between border-b border-[#263328]">
            <Logo size="md" variant="full" />

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-[#9EAC9F] hover:text-[#F2F5F3] hover:bg-[#1D2620] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              onClick={() => {
                onNewChat();
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg field-button-primary text-xs font-semibold cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>{t.newChat}</span>
              </div>
              <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono text-white">
                ⌘N
              </span>
            </button>
          </div>

          {/* Search & Filter Nav */}
          <div className="px-3 pt-1 pb-2 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8C9A8E] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0F1411] border border-[#263328] text-[#F2F5F3] placeholder-[#8C9A8E]/60 text-xs rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-[#38A169] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-1 p-1 bg-[#0F1411] rounded-lg border border-[#263328]">
              <button
                onClick={() => setFilter('all')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-[#1D2620] text-[#F2F5F3] border border-[#2B3A2E]'
                    : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>{t.history} ({history.length})</span>
              </button>

              <button
                onClick={() => setFilter('favorites')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-colors ${
                  filter === 'favorites'
                    ? 'bg-[#1D2620] text-[#F2F5F3] border border-[#2B3A2E]'
                    : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{t.starred} ({history.filter((h) => h.isFavorite).length})</span>
              </button>
            </div>
          </div>

          {/* History List */}
          <div className="px-3 py-1 overflow-y-auto max-h-[calc(100vh-370px)] custom-scrollbar space-y-1">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#8C9A8E]">
                <Sprout className="w-8 h-8 text-[#8C9A8E]/30 mx-auto mb-2" />
                {filter === 'favorites' ? t.noStarred : t.noHistory}
              </div>
            ) : (
              filteredHistory.map((item) => {
                const isActive = activeDiagnosis?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectDiagnosis(item);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`group relative flex items-center justify-between p-2.5 rounded-lg border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#1D2620] border-[#38A169] text-[#F2F5F3] font-medium'
                        : 'bg-[#151B17] border-[#263328] hover:bg-[#1D2620] text-[#9EAC9F] hover:text-[#F2F5F3]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="w-7 h-7 rounded bg-[#0F1411] border border-[#263328] overflow-hidden flex-shrink-0 flex items-center justify-center text-xs">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.plantName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Sprout className="w-3.5 h-3.5 text-[#38A169]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate text-[#F2F5F3]">
                          {item.plantName}
                        </p>
                        <p className="text-[10px] text-[#8C9A8E] truncate">
                          {item.diseaseName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={(e) => onToggleFavorite(item.id, e)}
                        className={`p-1 rounded hover:bg-[#263328] transition-colors ${
                          item.isFavorite
                            ? 'text-amber-400 opacity-100'
                            : 'opacity-0 group-hover:opacity-100 text-[#8C9A8E] hover:text-amber-400'
                        }`}
                        title={item.isFavorite ? 'Unstar' : 'Star'}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-amber-400' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => onDeleteHistory(item.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-950/40 text-[#8C9A8E] hover:text-red-400 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Section: AI Model Selector, Settings, Profile */}
        <div className="p-3 border-t border-[#263328] space-y-2 bg-[#131915]">
          {/* Active AI Model Pill */}
          <button
            onClick={onOpenModels}
            className="w-full p-2 rounded-lg bg-[#151B17] hover:bg-[#1D2620] border border-[#263328] flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#2E7D32]/20 border border-[#2E7D32]/40 flex items-center justify-center text-[#38A169]">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F2F5F3]">
                  {currentModel.name}
                </p>
                <p className="text-[10px] text-[#8C9A8E] font-mono">{currentModel.speed} {t.latency}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8C9A8E]" />
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-[#9EAC9F] hover:text-[#F2F5F3] hover:bg-[#1D2620] transition-colors cursor-pointer"
          >
            <SettingsIcon className="w-4 h-4" />
            <span>{t.settingsTitle}</span>
          </button>

          {/* Profile Card / Auth Action */}
          <div className="pt-2 border-t border-[#263328]">
            {user ? (
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#151B17] border border-[#263328]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#2E7D32] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#F2F5F3] truncate">
                      {user.displayName || user.email?.split('@')[0]}
                    </p>
                    <p className="text-[10px] text-[#8C9A8E] truncate">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={onSignOut}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-[#8C9A8E] hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer flex-shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="w-full py-2 px-3 rounded-lg field-button-primary font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>
                  {language === 'ru' ? 'Войти в аккаунт' : language === 'kk' ? 'Аккаунтқа кіру' : 'Sign In / Register'}
                </span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

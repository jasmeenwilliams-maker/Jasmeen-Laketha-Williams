import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Home, 
  ClipboardCheck, 
  Pill, 
  Compass, 
  CreditCard, 
  Printer, 
  ShieldCheck,
  ChevronDown,
  UserPlus,
  Users,
  Check,
  CheckCircle2,
  Clock,
  Activity,
  FileText
} from 'lucide-react';
import { ClientProfile } from '../types';

export type ScreenTab = 'handbook' | 'hub' | 'operations' | 'forms' | 'sop' | 'prep' | 'meds' | 'resources' | 'billing';

interface NavigationProps {
  activeScreen: ScreenTab;
  onSelectScreen: (screen: ScreenTab) => void;
  client: ClientProfile;
  allClients: ClientProfile[];
  onSelectClient: (clientId: string) => void;
  onOpenOnboardModal: () => void;
  onOpenSignModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeScreen,
  onSelectScreen,
  client,
  allClients,
  onSelectClient,
  onOpenOnboardModal,
  onOpenSignModal,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { id: ScreenTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'handbook', label: 'Client Handbook', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'hub', label: 'Family Care Hub', icon: <Home className="w-4 h-4" /> },
    { id: 'operations', label: 'Operations Hub', icon: <Activity className="w-4 h-4" />, badge: 'Ops' },
    { id: 'forms', label: 'Forms Packet', icon: <FileText className="w-4 h-4" />, badge: '01–11' },
    { id: 'sop', label: 'SOP Manual', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Rev 2' },
    { id: 'prep', label: 'Appointment Prep', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'meds', label: 'Medication Safety', icon: <Pill className="w-4 h-4" /> },
    { id: 'resources', label: 'South MS Resources', icon: <Compass className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing & Payments', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-sage-200/80 no-print transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top utility row */}
        <div className="flex items-center justify-between py-3 border-b border-sage-100 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv-3ntWs936kOOlmlH1M1SV-oHV9Fyyx2uctfZ7xSQ_Sdha-2bObSY2f1ONF5OjE6E9ZqWdmR3K3ZCa4Skk_1VuakkjxQ-lioMiBi5ShRm5cJPhjS9N2auACpbCjV376KGAWnVkS3rV_DGxKw50Z4UzENCM5uWTXHsI9DWs9bAIiryUDEQ8cijZZ4nerueAYixp86FgKMC6-KxYVhpWKFIH1ndcknHxDCUJcLM1uBmX7-Qj5tse9QNBdd08O_-K4ExWfQ"
              alt="SouthernWell of South Mississippi"
              className="w-9 h-9 object-contain rounded-xl bg-white p-0.5 border border-sage-200 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-pecan-900 tracking-tight">
                  SouthernWell
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-olive-50 text-olive border border-olive/20">
                  South Mississippi SOP 3.4
                </span>
              </div>
              <p className="text-[11px] text-pecan-600 hidden md:block">
                Hattiesburg Hub · Coordinated Care & Family Guide
              </p>
            </div>
          </div>

          {/* Center / Right: Client Switcher & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            
            {/* Client Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-white border border-sage-200 hover:border-olive/50 text-left transition-all cursor-pointer shadow-2xs"
                title="Switch active client to view their handbook and family hub"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0">
                  {getInitials(client.name)}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-pecan-900 leading-tight block truncate max-w-[110px] sm:max-w-[150px]">
                      {client.name}
                    </span>
                    <span className="hidden sm:inline-block text-[10px] text-olive font-semibold bg-olive-50 px-1.5 py-0.2 rounded border border-olive/20">
                      {client.county.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] text-pecan-600 block">
                    Case #{client.id.split('-').slice(-1)}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-pecan-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#FDFBF7] rounded-3xl border border-sage-200 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-sage-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-pecan-900 block">Client Records ({allClients.length})</span>
                      <span className="text-[11px] text-pecan-600">Select client to load their handbook & hub</span>
                    </div>
                    <Users className="w-4 h-4 text-olive" />
                  </div>

                  <div className="py-1.5 max-h-64 overflow-y-auto space-y-1">
                    {allClients.map((c) => {
                      const isSelected = c.id === client.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            onSelectClient(c.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-olive text-white shadow-xs'
                              : 'bg-white hover:bg-sage-50 text-pecan-800 border border-sage-200/70'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-olive-50 text-olive'
                            }`}>
                              {getInitials(c.name)}
                            </div>
                            <div className="truncate">
                              <span className={`font-bold text-xs block truncate ${isSelected ? 'text-white' : 'text-pecan-900'}`}>
                                {c.name}
                              </span>
                              <span className={`text-[10px] block ${isSelected ? 'text-olive-100' : 'text-pecan-600'}`}>
                                {c.county} · Case #{c.id}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 text-right ml-2">
                            {c.acknowledgmentSigned ? (
                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              }`}>
                                <Check className="w-2.5 h-2.5" /> Signed
                              </span>
                            ) : (
                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}>
                                <Clock className="w-2.5 h-2.5" /> Pending
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-sage-200/80 space-y-1.5">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onSelectScreen('sop');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-sage-50 hover:bg-sage-150 text-pecan-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-sage-200"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                      <span>SOP Manual (Rev 2)</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onSelectScreen('forms');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-sage-50 hover:bg-sage-150 text-pecan-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-sage-200"
                    >
                      <FileText className="w-3.5 h-3.5 text-olive" />
                      <span>Forms Packet (Forms 01–11)</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onSelectScreen('operations');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-sage-200"
                    >
                      <Activity className="w-3.5 h-3.5 text-olive" />
                      <span>Open Operations Hub</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenOnboardModal();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-olive-50 hover:bg-olive-100 text-olive font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-olive/20"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ Onboard New Client</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Signed status indicator */}
            <button
              onClick={onOpenSignModal}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                client.acknowledgmentSigned
                  ? 'bg-olive-50 text-olive border-olive/30 hover:bg-olive-100'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
              title="View Handbook Receipt Signature"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{client.acknowledgmentSigned ? 'Signed' : 'Sign Handbook'}</span>
            </button>

            {/* Print button */}
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-sage-200 text-pecan-700 hover:bg-sage-50 transition-colors font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-olive" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Tab row */}
        <nav className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto scrollbar-none text-xs">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-olive text-white shadow-xs'
                    : 'text-pecan-700 hover:text-pecan-900 hover:bg-sage-100/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-olive-50 text-olive border border-olive/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};

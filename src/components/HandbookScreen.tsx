import React, { useState } from 'react';
import { 
  Check, 
  Printer, 
  Phone, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  PenTool, 
  CheckCircle2, 
  Info, 
  Calendar, 
  Pill, 
  HeartHandshake, 
  Sparkles,
  ChevronDown,
  FileText,
  Heart
} from 'lucide-react';
import { ClientProfile } from '../types';

interface HandbookScreenProps {
  client: ClientProfile;
  allClients?: ClientProfile[];
  onSelectClient?: (clientId: string) => void;
  onOpenOnboardModal?: () => void;
  onUpdateClient: (updated: Partial<ClientProfile>) => void;
  onOpenSignModal: () => void;
  onNavigateToPrep?: () => void;
  onNavigateToMedSafety?: () => void;
  onNavigateToResources?: () => void;
  onNavigateToBilling?: () => void;
  onNavigateToPorchFund?: () => void;
}

export const HandbookScreen: React.FC<HandbookScreenProps> = ({
  client,
  allClients = [],
  onSelectClient,
  onOpenOnboardModal,
  onUpdateClient,
  onOpenSignModal,
  onNavigateToPrep,
  onNavigateToMedSafety,
  onNavigateToResources,
  onNavigateToBilling,
  onNavigateToPorchFund,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({
    '01': true,
    '02': true,
    '03': true,
    '04': true,
    '05': true,
    '06': true,
    '07': true,
    '08': true,
    '09': true,
  });
  const [fontSizeClass, setFontSizeClass] = useState<'normal' | 'large'>('normal');

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('');
  };

  const toggleSectionReviewed = (sectionId: string) => {
    setCompletedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleCommSelect = (method: 'phone' | 'text' | 'email' | 'virtual') => {
    onUpdateClient({ preferredCommunication: method });
  };

  const totalSections = 9;
  const reviewedCount = Object.values(completedSections).filter(Boolean).length;

  const handlePrint = () => {
    window.print();
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className={`py-6 md:py-10 px-3 md:px-6 antialiased selection:bg-rose-100 selection:text-rose-900 ${
      fontSizeClass === 'large' ? 'text-lg' : ''
    }`}>

      {/* Client Quick Switcher Bar */}
      {allClients.length > 0 && onSelectClient && (
        <div className="max-w-4xl mx-auto mb-4 no-print bg-white/90 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-sage-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-pecan-900 uppercase tracking-wide">
              Client Handbook Copy:
            </span>
            <span className="text-xs text-pecan-600">
              Each client receives the same official SOP handbook & matching hub
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {allClients.map((c) => {
              const isCurrent = c.id === client.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectClient(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-olive text-white shadow-xs'
                      : 'bg-sage-50 hover:bg-sage-100 text-pecan-800 border border-sage-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isCurrent ? 'bg-white/20 text-white' : 'bg-olive/10 text-olive'
                  }`}>
                    {getInitials(c.name)}
                  </span>
                  <span>{c.name.split(' ')[0]}</span>
                  {c.acknowledgmentSigned ? (
                    <span className="text-[10px] text-emerald-300">✓</span>
                  ) : (
                    <span className="text-[10px] text-amber-400">⏳</span>
                  )}
                </button>
              );
            })}

            {onOpenOnboardModal && (
              <button
                onClick={onOpenOnboardModal}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-olive-50 hover:bg-olive-100 text-olive border border-olive/30 transition-colors cursor-pointer"
                title="Onboard a new client with their own identical handbook and family hub"
              >
                + Onboard Client
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Top Action Utility Bar matching user design + interactive enhancements */}
      <div className="max-w-4xl mx-auto mb-6 no-print space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-sage-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-olive/10 text-olive flex items-center justify-center font-bold text-lg">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-pecan-900 tracking-tight">Official Client & Family Handbook</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-olive-50 text-olive border border-olive/20">
                  Active
                </span>
              </div>
              <p className="text-xs text-pecan-600">SouthernWell Case Management Services · Mississippi SOP Version 3.4</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Font size toggle for seniors */}
            <div className="flex items-center bg-sage-50 rounded-xl border border-sage-200 p-0.5 text-xs">
              <button
                onClick={() => setFontSizeClass('normal')}
                className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                  fontSizeClass === 'normal' ? 'bg-white shadow-xs text-pecan-900 font-bold' : 'text-pecan-600'
                }`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeClass('large')}
                className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                  fontSizeClass === 'large' ? 'bg-white shadow-xs text-pecan-900 font-bold' : 'text-pecan-600'
                }`}
                title="Large readable text size"
              >
                A+
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-olive text-white text-xs font-semibold hover:bg-olive-700 transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
          </div>
        </div>

        {/* Quick Jump Bar and Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#fbf9f4] p-3 rounded-2xl border border-sage-200/70 text-xs">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Search className="w-4 h-4 text-pecan-600 shrink-0" />
            <input
              type="text"
              placeholder="Search handbook (e.g. HIPAA, medication, billing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white px-3 py-1.5 rounded-xl border border-sage-200 text-pecan-900 placeholder:text-pecan-600/70 focus:outline-none focus:ring-1 focus:ring-olive"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-pecan-600 hover:text-pecan-900 px-1 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-pecan-600 font-medium">Jump to:</span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'sec-01', label: '01 Mission' },
                { id: 'sec-02', label: '02 Scope' },
                { id: 'sec-03', label: '03 Coordinator' },
                { id: 'sec-04', label: '04 Contact' },
                { id: 'sec-07', label: '07 Support' },
                { id: 'sec-09', label: '09 Billing' },
                { id: 'sec-receipt', label: 'Receipt' },
              ].map((jump) => (
                <a
                  key={jump.id}
                  href={`#${jump.id}`}
                  className="px-2 py-1 rounded-lg bg-white hover:bg-sage-100 text-pecan-800 border border-sage-200 transition-colors text-[11px] font-medium"
                >
                  {jump.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Handbook Document Container */}
      <main className="max-w-4xl mx-auto handbook-page rounded-3xl p-6 sm:p-10 md:p-16 border border-sage-200/80">
        
        {/* Cover & Header Section */}
        <header className="border-b-2 border-olive/30 pb-10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv-3ntWs936kOOlmlH1M1SV-oHV9Fyyx2uctfZ7xSQ_Sdha-2bObSY2f1ONF5OjE6E9ZqWdmR3K3ZCa4Skk_1VuakkjxQ-lioMiBi5ShRm5cJPhjS9N2auACpbCjV376KGAWnVkS3rV_DGxKw50Z4UzENCM5uWTXHsI9DWs9bAIiryUDEQ8cijZZ4nerueAYixp86FgKMC6-KxYVhpWKFIH1ndcknHxDCUJcLM1uBmX7-Qj5tse9QNBdd08O_-K4ExWfQ"
                alt="SouthernWell of South Mississippi Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-2xl bg-white p-1 border border-sage-200 shadow-sm"
              />
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-olive-50 text-olive text-xs font-bold uppercase tracking-wider mb-1.5 border border-olive/20">
                  Client & Family Guide
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-pecan-900 tracking-tight leading-tight">
                  Client Handbook
                </h1>
                <p className="font-serif italic text-lg sm:text-xl text-rose font-semibold mt-1">
                  Built Around Your Family
                </p>
              </div>
            </div>
            
            <div className="bg-white/80 p-4 rounded-2xl border border-sage-200 text-xs space-y-1.5 min-w-[210px] text-right sm:text-right">
              <div className="text-pecan-600 font-medium">Hattiesburg Coordination Hub</div>
              <div className="text-[11px] text-pecan-600 leading-tight">
                Forrest, Harrison, Jackson, Jones, Lamar & Pearl River Counties
              </div>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-olive-50 to-sage-50/50 rounded-2xl p-6 border-l-4 border-olive">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900 mb-2">Welcome</h2>
            <p className="text-pecan-800 text-base sm:text-lg leading-relaxed">
              This handbook explains what you can expect as a SouthernWell client. Our goal is to provide clear, compassionate, and structured support that helps you navigate your healthcare with confidence.
            </p>
          </div>

          {/* Dedicated Client Copy Identification Banner */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-sage-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-serif text-base font-bold shrink-0">
                {getInitials(client.name)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-pecan-900 text-sm">Official Handbook Issued To: {client.name}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-olive-50 text-olive border border-olive/20">
                    Case #{client.id}
                  </span>
                </div>
                <p className="text-pecan-600 text-[11px] mt-0.5">
                  {client.county} · Enrolled {client.enrolledDate} · Care Coordinator: {client.careCoordinator.name}, CSA®
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {client.acknowledgmentSigned ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Signed & Verified ({client.signatureDate})</span>
                </div>
              ) : (
                <button
                  onClick={onOpenSignModal}
                  className="no-print inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  <PenTool className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sign Receipt</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Layout */}
        <div className="space-y-12 text-pecan-800">

          {/* Section: Our Mission */}
          {matchesSearch('mission whole-person wellness communication family advocacy coordinated care') && (
            <section id="sec-01" className="scroll-mt-16">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">01</span>
                  <h2 className="font-serif text-2xl font-bold text-pecan-900">Our Mission</h2>
                </div>
                <button
                  onClick={() => toggleSectionReviewed('01')}
                  className="no-print text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors cursor-pointer"
                  style={{
                    backgroundColor: completedSections['01'] ? '#f5f7f0' : '#ffffff',
                    borderColor: completedSections['01'] ? '#556B2F' : '#cbd5c9',
                    color: completedSections['01'] ? '#556B2F' : '#5c493e',
                  }}
                  title="Mark section as reviewed"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{completedSections['01'] ? 'Reviewed' : 'Mark Reviewed'}</span>
                </button>
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-olive mb-4">SouthernWell is committed to:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                <div className="bg-white p-4 rounded-xl border border-sage-200 flex items-start gap-3 shadow-xs">
                  <span className="text-olive text-lg">🌿</span>
                  <div>
                    <strong className="block text-pecan-900 text-sm font-bold">Whole-person wellness</strong>
                    <span className="text-xs text-pecan-600">Addressing daily comfort, routine habits, and personal independence.</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-sage-200 flex items-start gap-3 shadow-xs">
                  <span className="text-olive text-lg">💬</span>
                  <div>
                    <strong className="block text-pecan-900 text-sm font-bold">Clear communication</strong>
                    <span className="text-xs text-pecan-600">Transparent updates, straightforward terms, and active listening.</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-sage-200 flex items-start gap-3 shadow-xs">
                  <span className="text-olive text-lg">🏡</span>
                  <div>
                    <strong className="block text-pecan-900 text-sm font-bold">Family-centered advocacy</strong>
                    <span className="text-xs text-pecan-600">Keeping designated loved ones seamlessly informed and reassured.</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-sage-200 flex items-start gap-3 shadow-xs">
                  <span className="text-olive text-lg">🤝</span>
                  <div>
                    <strong className="block text-pecan-900 text-sm font-bold">Safe, coordinated care</strong>
                    <span className="text-xs text-pecan-600">Bridging the gap between physician visits, pharmacies, and your home porch.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-sage-50/70 rounded-xl border border-sage-200 text-sm text-pecan-800 leading-relaxed font-medium">
                We help you understand your care plan, prepare for appointments, manage chronic conditions, and stay connected to the resources you need.
              </div>
            </section>
          )}

          {/* Section: Scope of Services & Non-Clinical Notice */}
          {matchesSearch('scope services non-clinical medical boundary appointment medication chronic condition family') && (
            <section id="sec-02" className="scroll-mt-16">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">02</span>
                  <h2 className="font-serif text-2xl font-bold text-pecan-900">Scope of Services</h2>
                </div>
                <button
                  onClick={() => toggleSectionReviewed('02')}
                  className="no-print text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors cursor-pointer"
                  style={{
                    backgroundColor: completedSections['02'] ? '#f5f7f0' : '#ffffff',
                    borderColor: completedSections['02'] ? '#556B2F' : '#cbd5c9',
                    color: completedSections['02'] ? '#556B2F' : '#5c493e',
                  }}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{completedSections['02'] ? 'Reviewed' : 'Mark Reviewed'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-2xl border border-olive/30 shadow-xs">
                  <div className="flex items-center gap-2 text-olive font-bold text-sm uppercase tracking-wide mb-3">
                    <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    SouthernWell provides:
                  </div>
                  <ul className="space-y-2 text-sm text-pecan-900">
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                      <span>Care coordination</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                      <span>Appointment preparation & follow-up</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                      <span>Medication review & safety guidance</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                      <span>Chronic condition support</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                      <span>Family advocacy</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                      <span>Resource navigation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose/30 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-rose font-bold text-sm uppercase tracking-wide mb-3">
                      <AlertTriangle className="w-5 h-5 text-rose shrink-0" />
                      Non-Clinical Scope Boundary:
                    </div>
                    <p className="text-sm font-semibold text-rose-800 leading-relaxed mb-3">
                      SouthernWell does not provide medical treatment, diagnosis, or hands-on care.
                    </p>
                    <p className="text-xs text-pecan-600 leading-relaxed">
                      Staff coordinators provide non-clinical advocacy, routine logging, appointment companionship, and observation. Clinical prescriptions, dose alterations, and emergency treatments are managed strictly by your licensed medical providers.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-rose/20 text-[11px] text-rose font-medium">
                    SOP-01 & SOP-06 Compliant Non-Medical Notice
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section: Your Care Coordinator & Communication */}
          {matchesSearch('care coordinator communication phone text email virtual sessions sarah jenkins') && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Care Coordinator Role */}
              <div id="sec-03" className="bg-white p-6 rounded-2xl border border-sage-200 scroll-mt-16">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">03</span>
                    <h2 className="font-serif text-xl font-bold text-pecan-900">Your Care Coordinator</h2>
                  </div>
                  <button
                    onClick={() => toggleSectionReviewed('03')}
                    className="no-print text-[11px] text-olive font-semibold hover:underline"
                  >
                    {completedSections['03'] ? '✓ Reviewed' : '+ Mark'}
                  </button>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-olive mb-3">Your care coordinator will:</p>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold mt-0.5">•</span>
                    <span>Review your health concerns</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold mt-0.5">•</span>
                    <span>Help organize your care plan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold mt-0.5">•</span>
                    <span>Communicate with your providers when needed</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold mt-0.5">•</span>
                    <span>Support medication safety</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold mt-0.5">•</span>
                    <span>Provide chronic condition education</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold mt-0.5">•</span>
                    <span>Help you prepare for appointments</span>
                  </li>
                </ul>

                {/* Assigned Coordinator Badge */}
                <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-pecan-600 block">Assigned Coordinator:</span>
                    <span className="font-bold text-pecan-900">{client.careCoordinator.name}, {client.careCoordinator.credential}</span>
                  </div>
                  {client.careCoordinator.phone && (
                    <a
                      href={`tel:${client.careCoordinator.phone.replace(/[^0-9]/g, '')}`}
                      className="text-olive font-semibold hover:underline"
                    >
                      {client.careCoordinator.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Communication Preferences */}
              <div id="sec-04" className="bg-white p-6 rounded-2xl border border-sage-200 flex flex-col justify-between scroll-mt-16">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">04</span>
                      <h2 className="font-serif text-xl font-bold text-pecan-900">Communication</h2>
                    </div>
                    <button
                      onClick={() => toggleSectionReviewed('04')}
                      className="no-print text-[11px] text-olive font-semibold hover:underline"
                    >
                      {completedSections['04'] ? '✓ Reviewed' : '+ Mark'}
                    </button>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-olive mb-3">We communicate through:</p>
                  
                  {/* Interactive Communication Selection */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => handleCommSelect('phone')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        client.preferredCommunication === 'phone'
                          ? 'bg-olive-50 border-olive ring-1 ring-olive/40'
                          : 'bg-sage-50/60 border-sage-200/80 hover:bg-sage-100/70'
                      }`}
                    >
                      <span className="text-lg block mb-1">📞</span>
                      <span className="text-xs font-bold text-pecan-900">Phone</span>
                      {client.preferredCommunication === 'phone' && (
                        <span className="block text-[10px] text-olive font-semibold mt-0.5">Preferred</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCommSelect('text')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        client.preferredCommunication === 'text'
                          ? 'bg-olive-50 border-olive ring-1 ring-olive/40'
                          : 'bg-sage-50/60 border-sage-200/80 hover:bg-sage-100/70'
                      }`}
                    >
                      <span className="text-lg block mb-1">💬</span>
                      <span className="text-xs font-bold text-pecan-900">Text</span>
                      {client.preferredCommunication === 'text' && (
                        <span className="block text-[10px] text-olive font-semibold mt-0.5">Preferred</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCommSelect('email')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        client.preferredCommunication === 'email'
                          ? 'bg-olive-50 border-olive ring-1 ring-olive/40'
                          : 'bg-sage-50/60 border-sage-200/80 hover:bg-sage-100/70'
                      }`}
                    >
                      <span className="text-lg block mb-1">✉️</span>
                      <span className="text-xs font-bold text-pecan-900">Email</span>
                      {client.preferredCommunication === 'email' && (
                        <span className="block text-[10px] text-olive font-semibold mt-0.5">Preferred</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCommSelect('virtual')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        client.preferredCommunication === 'virtual'
                          ? 'bg-olive-50 border-olive ring-1 ring-olive/40'
                          : 'bg-sage-50/60 border-sage-200/80 hover:bg-sage-100/70'
                      }`}
                    >
                      <span className="text-lg block mb-1">💻</span>
                      <span className="text-xs font-bold text-pecan-900">Virtual sessions</span>
                      {client.preferredCommunication === 'virtual' && (
                        <span className="block text-[10px] text-olive font-semibold mt-0.5">Preferred</span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-olive-50 rounded-xl border border-olive/20 text-center">
                  <span className="text-xs font-semibold text-olive-900">You may choose your preferred method at any time.</span>
                </div>
              </div>

            </section>
          )}

          {/* Section: Client Rights & Responsibilities */}
          {matchesSearch('rights responsibilities respectful confidentiality privacy notes accurate information') && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Rights */}
              <div id="sec-05" className="bg-white p-6 rounded-2xl border border-sage-200">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">05</span>
                    <h2 className="font-serif text-xl font-bold text-pecan-900">Client Rights</h2>
                  </div>
                  <button
                    onClick={() => toggleSectionReviewed('05')}
                    className="no-print text-[11px] text-olive font-semibold hover:underline"
                  >
                    {completedSections['05'] ? '✓ Reviewed' : '+ Mark'}
                  </button>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-olive mb-3">You have the right to:</p>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold">✓</span>
                    <span>Respectful, compassionate care</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold">✓</span>
                    <span>Confidentiality and privacy</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold">✓</span>
                    <span>Clear communication</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold">✓</span>
                    <span>Participation in care decisions</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-olive font-bold">✓</span>
                    <span>Access to your coordination notes</span>
                  </li>
                </ul>
              </div>

              {/* Responsibilities */}
              <div id="sec-06" className="bg-white p-6 rounded-2xl border border-sage-200">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">06</span>
                    <h2 className="font-serif text-xl font-bold text-pecan-900">Client Responsibilities</h2>
                  </div>
                  <button
                    onClick={() => toggleSectionReviewed('06')}
                    className="no-print text-[11px] text-olive font-semibold hover:underline"
                  >
                    {completedSections['06'] ? '✓ Reviewed' : '+ Mark'}
                  </button>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-olive mb-3">You are responsible for:</p>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose font-bold">📋</span>
                    <span>Providing accurate information</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose font-bold">🔄</span>
                    <span>Communicating changes in your condition</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose font-bold">🤝</span>
                    <span>Following agreed-upon care plans</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose font-bold">❤️</span>
                    <span>Treating staff respectfully</span>
                  </li>
                </ul>
              </div>

            </section>
          )}

          {/* Section: Privacy & HIPAA + Emergencies */}
          {matchesSearch('privacy hipaa protected health information emergencies 911 988 immediate medical need') && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Privacy & HIPAA */}
              <div className="p-6 bg-white rounded-2xl border border-sage-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-olive font-bold text-sm uppercase tracking-wide mb-2">
                    <ShieldCheck className="w-5 h-5 text-olive shrink-0" />
                    Privacy & HIPAA
                  </div>
                  <h3 className="font-serif text-lg font-bold text-pecan-900 mb-2">Protected Health Information</h3>
                  <p className="text-sm text-pecan-700 leading-relaxed">
                    SouthernWell protects your health information under HIPAA. Your information will only be shared with your care team when necessary for coordination.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-sage-100 text-xs text-pecan-600 font-medium">
                  Strict SOP-13 Client Privacy Protocol & Encrypted Records
                </div>
              </div>

              {/* Emergencies Callout */}
              <div className="p-6 bg-rose-50/80 rounded-2xl border-2 border-rose/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose font-bold text-sm uppercase tracking-wide mb-2">
                    <AlertTriangle className="w-5 h-5 text-rose shrink-0" />
                    Emergencies
                  </div>
                  <h3 className="font-serif text-lg font-bold text-rose-900 mb-2">Immediate Medical Need</h3>
                  <p className="text-sm text-rose-950 font-medium leading-relaxed">
                    SouthernWell does not provide emergency services. In an emergency, call 911 or go to the nearest emergency room.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="tel:911"
                    className="px-3.5 py-1.5 rounded-lg bg-rose text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-xs"
                  >
                    DIAL 911
                  </a>
                  <a
                    href="tel:988"
                    className="text-xs text-pecan-700 font-semibold hover:underline"
                  >
                    Crisis Lifeline: Dial 988
                  </a>
                </div>
              </div>

            </section>
          )}

          {/* Section: Key Programs Detail Grid */}
          {matchesSearch('support appointment preparation medication safety chronic condition diabetes hypertension resource navigation') && (
            <section id="sec-07" className="scroll-mt-16">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">07</span>
                  <h2 className="font-serif text-2xl font-bold text-pecan-900">How We Support You</h2>
                </div>
                <button
                  onClick={() => toggleSectionReviewed('07')}
                  className="no-print text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors cursor-pointer"
                  style={{
                    backgroundColor: completedSections['07'] ? '#f5f7f0' : '#ffffff',
                    borderColor: completedSections['07'] ? '#556B2F' : '#cbd5c9',
                    color: completedSections['07'] ? '#556B2F' : '#5c493e',
                  }}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{completedSections['07'] ? 'Reviewed' : 'Mark Reviewed'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Appointment Preparation */}
                <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-pecan-900 mb-2 flex items-center gap-2">
                      <span>📅</span> Appointment Preparation
                    </h3>
                    <p className="text-xs text-olive font-semibold uppercase tracking-wider mb-3">We help you prepare by:</p>
                    <ul className="space-y-2 text-sm text-pecan-800">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                        <span>Reviewing symptoms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                        <span>Listing questions for your provider</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                        <span>Organizing medication lists</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                        <span>Summarizing recent changes</span>
                      </li>
                    </ul>
                  </div>
                  {onNavigateToPrep && (
                    <button
                      onClick={onNavigateToPrep}
                      className="no-print mt-4 text-xs font-semibold text-olive hover:text-olive-800 flex items-center gap-1 pt-2 border-t border-sage-100"
                    >
                      Open Appointment Companion Tool →
                    </button>
                  )}
                </div>

                {/* Medication Safety */}
                <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-pecan-900 mb-2 flex items-center gap-2">
                      <span>💊</span> Medication Safety
                    </h3>
                    <p className="text-xs text-olive font-semibold uppercase tracking-wider mb-3">We support medication safety by:</p>
                    <ul className="space-y-2 text-sm text-pecan-800">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                        <span>Reviewing your medication list</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                        <span>Identifying potential interactions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
                        <span>Helping you understand instructions</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="mt-3 text-[11px] text-pecan-600 bg-sage-50 p-2 rounded-lg">
                      *Observation-only support. Staff does not dispense or alter dosages.
                    </div>
                    {onNavigateToMedSafety && (
                      <button
                        onClick={onNavigateToMedSafety}
                        className="no-print mt-2 text-xs font-semibold text-olive hover:text-olive-800 flex items-center gap-1"
                      >
                        View {client.name}'s Medication Observation Log →
                      </button>
                    )}
                  </div>
                </div>

                {/* Chronic Condition Support */}
                <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-xs">
                  <h3 className="font-serif text-lg font-bold text-pecan-900 mb-2 flex items-center gap-2">
                    <span>🩺</span> Chronic Condition Support
                  </h3>
                  <p className="text-xs text-olive font-semibold uppercase tracking-wider mb-3">We provide education and guidance for:</p>
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-olive-50 text-olive-900 font-semibold border border-olive/20">Diabetes</span>
                    <span className="px-2.5 py-1 rounded-lg bg-olive-50 text-olive-900 font-semibold border border-olive/20">Hypertension</span>
                    <span className="px-2.5 py-1 rounded-lg bg-olive-50 text-olive-900 font-semibold border border-olive/20">Heart disease</span>
                    <span className="px-2.5 py-1 rounded-lg bg-olive-50 text-olive-900 font-semibold border border-olive/20">COPD</span>
                    <span className="px-2.5 py-1 rounded-lg bg-olive-50 text-olive-900 font-semibold border border-olive/20">Arthritis</span>
                    <span className="px-2.5 py-1 rounded-lg bg-sage-100 text-pecan-800 font-medium">Other chronic conditions</span>
                  </div>

                  {client.conditions && client.conditions.length > 0 && (
                    <div className="pt-3 border-t border-sage-100">
                      <span className="text-[11px] text-pecan-600 block mb-1.5 font-medium">
                        Monitored in {client.name.split(' ')[0]}'s Care Plan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {client.conditions.map((cond, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 rounded-md bg-olive-100/70 text-olive-900 text-[11px] font-semibold border border-olive/20">
                            ✓ {cond}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Resource Navigation */}
                <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-pecan-900 mb-2 flex items-center gap-2">
                      <span>🧭</span> Resource Navigation
                    </h3>
                    <p className="text-xs text-olive font-semibold uppercase tracking-wider mb-3">We help connect you with:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-pecan-800">
                      <div className="flex items-center gap-1.5">
                        <span className="text-olive font-bold">•</span>
                        <span>Community programs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-olive font-bold">•</span>
                        <span>Senior services</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-olive font-bold">•</span>
                        <span>Transportation resources</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-olive font-bold">•</span>
                        <span>Support groups</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <span className="text-olive font-bold">•</span>
                        <span>Benefits assistance</span>
                      </div>
                    </div>
                  </div>
                  {onNavigateToResources && (
                    <button
                      onClick={onNavigateToResources}
                      className="no-print mt-3 text-xs font-semibold text-olive hover:text-olive-800 flex items-center gap-1 pt-2 border-t border-sage-100"
                    >
                      Browse South MS Community Directory →
                    </button>
                  )}
                </div>

              </div>
            </section>
          )}

          {/* Section: Coordination Logs & Payment/Billing */}
          {matchesSearch('coordination logs summaries payment billing direct-pay credit card ach invoice') && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

              {/* Coordination Logs */}
              <div id="sec-08" className="bg-white p-6 rounded-2xl border border-sage-200">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">08</span>
                    <h2 className="font-serif text-xl font-bold text-pecan-900">Coordination Logs</h2>
                  </div>
                  <button
                    onClick={() => toggleSectionReviewed('08')}
                    className="no-print text-[11px] text-olive font-semibold hover:underline"
                  >
                    {completedSections['08'] ? '✓ Reviewed' : '+ Mark'}
                  </button>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-olive mb-3">You will receive:</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 bg-sage-50/50 p-3 rounded-xl border border-sage-100">
                    <span className="text-olive text-lg">📄</span>
                    <div>
                      <strong className="block text-pecan-900 font-semibold">Monthly coordination summaries</strong>
                      <span className="text-xs text-pecan-600">A clear recap of all check-ins, tasks completed, and upcoming priorities.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-sage-50/50 p-3 rounded-xl border border-sage-100">
                    <span className="text-olive text-lg">💊</span>
                    <div>
                      <strong className="block text-pecan-900 font-semibold">Medication updates</strong>
                      <span className="text-xs text-pecan-600">Observation and refill status logs synchronized with your local pharmacy.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-sage-50/50 p-3 rounded-xl border border-sage-100">
                    <span className="text-olive text-lg">📈</span>
                    <div>
                      <strong className="block text-pecan-900 font-semibold">Care plan progress notes</strong>
                      <span className="text-xs text-pecan-600">Factual routine records ready to share directly with your physicians.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Payment & Billing */}
              <div id="sec-09" className="bg-white p-6 rounded-2xl border border-sage-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-olive text-white font-bold text-sm">09</span>
                      <h2 className="font-serif text-xl font-bold text-pecan-900">Payment & Billing</h2>
                    </div>
                    <button
                      onClick={() => toggleSectionReviewed('09')}
                      className="no-print text-[11px] text-olive font-semibold hover:underline"
                    >
                      {completedSections['09'] ? '✓ Reviewed' : '+ Mark'}
                    </button>
                  </div>
                  
                  <div className="mb-4 p-4 rounded-xl bg-olive-50 border border-olive/20 text-sm">
                    <p className="font-semibold text-olive-900 mb-1">Direct-Pay Service Standard</p>
                    <p className="text-pecan-800 text-xs leading-relaxed">
                      SouthernWell is a private, direct-pay service. Payment is due at the time of service.
                    </p>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-olive mb-3">Accepted payment methods:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-sage-200 text-sm font-medium">
                      <span className="text-base">💳</span>
                      <span>Credit/Debit Card</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-sage-200 text-sm font-medium">
                      <span className="text-base">🏦</span>
                      <span>ACH Transfer</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-sage-200 text-sm font-medium">
                      <span className="text-base">🧾</span>
                      <span>Online Invoice Payment</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-sage-100 text-[11px] text-pecan-600 flex items-center justify-between">
                  <span>*SouthernWell does not bill Medicare, Medicaid, or private health insurers directly (SOP-14).</span>
                  {onNavigateToBilling && (
                    <button
                      onClick={onNavigateToBilling}
                      className="no-print text-xs font-semibold text-olive hover:underline ml-2 whitespace-nowrap"
                    >
                      View Statements →
                    </button>
                  )}
                </div>
              </div>

            </section>
          )}

          {/* The Granny Doris Porch Fund Community Scholarship */}
          {matchesSearch('granny doris porch fund scholarship sliding scale assistance financial hardship discount free') && (
            <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200 mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif font-bold text-lg text-rose-950">The Granny Doris Porch Fund</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 border border-rose-300">
                      Community Aid & Scholarship
                    </span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed max-w-2xl">
                    “No one should have to choose between care and cost. When a neighbor needs help, we make room on the porch.” 
                    Providing <strong>100% free care coordination</strong> for families living below the poverty line, and <strong>50% off monthly packages</strong> after your first 6 months.
                  </p>
                </div>
              </div>

              {onNavigateToPorchFund && (
                <button
                  onClick={onNavigateToPorchFund}
                  className="shrink-0 px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-200" />
                  <span>View Flyer & Nominate</span>
                </button>
              )}
            </div>
          )}

          {/* Signature & Acceptance Block (Client Handbook Confirmation) */}
          <section id="sec-receipt" className="bg-white p-6 sm:p-8 rounded-2xl border border-sage-200 mt-10 scroll-mt-16">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Handbook Acknowledgment & Receipt</h3>
                <p className="text-xs text-pecan-600">
                  Please sign below to acknowledge receipt of the SouthernWell Client Handbook and your understanding of our non-clinical care coordination scope.
                </p>
              </div>
              <button
                onClick={onOpenSignModal}
                className="no-print inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-olive-50 hover:bg-olive-100 text-olive text-xs font-bold border border-olive/30 transition-colors shadow-xs"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>{client.acknowledgmentSigned ? 'Update Signature' : 'Sign Receipt'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Client or Family Representative Signature */}
              <div className="relative">
                <div className="h-12 border-b-2 border-pecan-700/40 flex items-end pb-1 font-serif italic text-pecan-900 text-xl overflow-hidden">
                  {client.signatureDataUrl ? (
                    <img src={client.signatureDataUrl} alt="Digital Signature" className="h-10 object-contain" />
                  ) : client.acknowledgmentSigned ? (
                    client.signerName || client.name
                  ) : (
                    <span className="text-amber-800 text-xs not-italic font-sans font-medium flex items-center gap-1.5 pb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      Awaiting Digital Acknowledgment Signature
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs text-pecan-600 mt-1.5">
                  <div className="flex items-center gap-1">
                    <span>{client.representativeName ? `${client.representativeName} (${client.representativeRelation})` : 'Client or Authorized Family Representative'}</span>
                    {client.acknowledgmentSigned && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-olive shrink-0" />
                    )}
                  </div>
                  <span>Date: {client.signatureDate || (client.acknowledgmentSigned ? 'Oct 24, 2026' : 'Pending')}</span>
                </div>
              </div>

              {/* Coordinator Representative Signature */}
              <div>
                <div className="h-12 border-b-2 border-pecan-700/40 flex items-end pb-1 font-serif italic text-olive text-xl">
                  {client.careCoordinator.name}, CSA®
                </div>
                <div className="flex justify-between items-center text-xs text-pecan-600 mt-1.5">
                  <span>SouthernWell Care Coordinator Representative</span>
                  <span>Date: {client.signatureDate || (client.acknowledgmentSigned ? 'Oct 24, 2026' : 'Oct 24, 2026')}</span>
                </div>
              </div>
            </div>

            {client.acknowledgmentSigned ? (
              <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between text-xs text-pecan-600">
                <div className="flex items-center gap-1.5 text-olive font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Officially signed & on record under SOP-01 Case File #{client.id}</span>
                </div>
                <span className="text-[11px] text-pecan-600">Hattiesburg Hub Verification: VALID</span>
              </div>
            ) : (
              <div className="mt-4 pt-3 border-t border-sage-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-800">
                <div className="flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Handbook receipt pending acknowledgment signature for {client.name} (Case #{client.id})</span>
                </div>
                <button
                  onClick={onOpenSignModal}
                  className="no-print font-bold text-olive hover:underline cursor-pointer text-left sm:text-right"
                >
                  Sign receipt now →
                </button>
              </div>
            )}
          </section>

        </div>

        {/* Footer */}
        <footer className="mt-14 pt-8 border-t-2 border-olive/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pecan-600">
          <div>
            <p className="font-bold text-pecan-900">SouthernWell Case Management Services</p>
            <p>Wellness with Southern Heart · South Mississippi Care Coordination</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="font-semibold text-olive">South Mississippi Coordination Desk</p>
            <p className="text-[11px]">SOP Reference: Client Onboarding & Handbook Standard 3.4</p>
          </div>
        </footer>

      </main>

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Search,
  Printer,
  ChevronRight,
  ExternalLink,
  Phone,
  Scale,
  Users,
  AlertCircle,
  HelpCircle,
  Check,
  Copy,
  Clock,
  ArrowRight,
  Filter,
  Flame,
  Award,
  Sparkles,
  Info,
  Calendar,
  Lock,
  HeartHandshake,
  Download,
  DollarSign,
  ListOrdered
} from 'lucide-react';
import { MOCK_SOP_MANUAL, SOPStep, ScopeComparisonItem, EscalationTier } from '../data/mockSOPData';
import { ScreenTab } from './Navigation';

interface SOPManualScreenProps {
  onNavigateToScreen: (screen: ScreenTab) => void;
  onNavigateToForm?: (formId: string) => void;
}

type SOPTab = 'overview' | 'sop18' | 'scope' | 'workflow' | 'pricing' | 'escalation' | 'mandatory' | 'audit' | 'ethics' | 'appendix' | 'quiz';

export const SOPManualScreen: React.FC<SOPManualScreenProps> = ({
  onNavigateToScreen,
  onNavigateToForm,
}) => {
  const [activeTab, setActiveTab] = useState<SOPTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSOP, setSelectedSOP] = useState<string>('SOP 4.1');
  const [selectedTier, setSelectedTier] = useState<string>('Tier 1');
  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [staffAcknowledged, setStaffAcknowledged] = useState(true);
  const [workflowFilter, setWorkflowFilter] = useState<string>('all');

  const manual = MOCK_SOP_MANUAL;

  const handleCopyScript = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptIndex(index);
    setTimeout(() => setCopiedScriptIndex(null), 2000);
  };

  const handleQuizAnswer = (quizId: string, answer: boolean) => {
    setQuizAnswers(prev => ({ ...prev, [quizId]: answer }));
    setQuizSubmitted(prev => ({ ...prev, [quizId]: true }));
  };

  // Filtered workflow SOPs
  const filteredWorkflowSOPs = useMemo(() => {
    return manual.workflowSOPs.filter(sop => {
      const matchesSearch = 
        sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sop.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sop.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sop.keyActionItems.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter = 
        workflowFilter === 'all' || 
        (workflowFilter === 'intake' && ['SOP 4.1', 'SOP 4.2', 'SOP 4.3', 'SOP 4.4'].includes(sop.code)) ||
        (workflowFilter === 'care' && ['SOP 4.5', 'SOP 4.6', 'SOP 4.7', 'SOP 4.8'].includes(sop.code)) ||
        (workflowFilter === 'safety' && ['SOP 4.9', 'SOP 4.10'].includes(sop.code));

      return matchesSearch && matchesFilter;
    });
  }, [manual.workflowSOPs, searchQuery, workflowFilter]);

  const activeSOPDetail = useMemo(() => {
    return manual.workflowSOPs.find(s => s.code === selectedSOP) || manual.workflowSOPs[0];
  }, [manual.workflowSOPs, selectedSOP]);

    const tabs: { id: SOPTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: '1. Purpose & Authority', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'sop18', label: '2. All 18 SOPs', icon: <ListOrdered className="w-4 h-4" />, badge: 'SOP 01–18' },
    { id: 'scope', label: '3. Scope Guardrails', icon: <Scale className="w-4 h-4" />, badge: 'Strict' },
    { id: 'workflow', label: '4. 10-Step Workflow', icon: <FileText className="w-4 h-4" />, badge: 'Workflow' },
    { id: 'pricing', label: '5. Programs & Prices', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'escalation', label: '6. Crisis Escalation', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'mandatory', label: '7. Mandatory Reporting', icon: <ShieldCheck className="w-4 h-4" />, badge: 'MS Law' },
    { id: 'audit', label: '8. Quality Auditing', icon: <Award className="w-4 h-4" /> },
    { id: 'ethics', label: '9. Code of Ethics', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'appendix', label: 'App. A–E Open Items', icon: <Info className="w-4 h-4" />, badge: 'Legal' },
    { id: 'quiz', label: 'Scope Quiz', icon: <HelpCircle className="w-4 h-4" />, badge: 'Test' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 text-pecan-900">
      
      {/* Top Banner / Document Header */}
      <section className="bg-gradient-to-b from-sage-100/90 via-sage-50 to-[#FDFBF7] border-b border-sage-200/80 pt-8 pb-6 px-4 sm:px-6 no-print">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-olive text-white shadow-xs">
                  {manual.revision} — Active
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sage-200/70 text-pecan-800">
                  Document ID: {manual.documentId}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pecan-100 text-pecan-800">
                  Effective: {manual.effectiveDate}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Supersedes: {manual.supersedes}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-pecan-900 tracking-tight">
                {manual.title}
              </h1>
              <p className="text-sm sm:text-base text-pecan-700 mt-1 max-w-3xl">
                {manual.subtitle} • <span className="font-semibold text-olive">{manual.organization.serviceArea}</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-pecan-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-olive inline-block"></span>
                  <strong>Author:</strong> {manual.author.name}, {manual.author.credentials}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-sage-500 inline-block"></span>
                  <strong>Clinical Oversight:</strong> {manual.clinicalReviewer.name} ({manual.clinicalReviewer.credentials})
                </span>
              </div>
            </div>

                        {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={manual.pdfAssetPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-olive hover:bg-olive/90 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all"
                title="View original revised SOP Guide PDF (October 2026)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View Revised PDF</span>
              </a>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-sage-50 text-pecan-800 font-semibold text-xs border border-sage-200 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Print SOP Manual or current section"
              >
                <Printer className="w-3.5 h-3.5 text-olive" />
                <span>Print SOP</span>
              </button>

              <button
                onClick={() => onNavigateToScreen('forms')}
                className="px-3.5 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 font-semibold text-xs border border-sage-300 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-olive" />
                <span>Forms Packet (01–11)</span>
              </button>

              <button
                onClick={() => onNavigateToScreen('operations')}
                className="px-3.5 py-2 rounded-xl bg-sage-200/80 hover:bg-sage-200 text-pecan-900 font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer border border-sage-300"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                <span>Operations Hub</span>
              </button>
            </div>

          </div>

          {/* Compliance & Staff Attestation Banner */}
          <div className="mt-5 p-3.5 rounded-2xl bg-white/80 backdrop-blur-xs border border-sage-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-olive-50 border border-olive/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-olive" />
              </div>
              <div>
                <div className="text-xs font-bold text-pecan-900 flex items-center gap-2">
                  <span>Staff Operating Compliance Attestation</span>
                  {staffAcknowledged ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="w-3 h-3" /> Acknowledged by Field Staff
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <AlertCircle className="w-3 h-3" /> Annual Review Pending
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-pecan-600 mt-0.5">
                  Governs all non-clinical case management, care navigation, and patient advocacy across Forrest, Lamar, Jones, and Stone Counties.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStaffAcknowledged(!staffAcknowledged)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-sage-200 bg-sage-50 hover:bg-sage-100 text-pecan-800 transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
            >
              {staffAcknowledged ? 'Toggle Attestation' : 'Mark Attested (Rev 2)'}
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-sage-200/80">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border-t border-x ${
                    isActive
                      ? 'bg-white text-olive border-sage-200 border-b-2 border-b-white -mb-px shadow-xs'
                      : 'border-transparent text-pecan-700 hover:text-pecan-900 hover:bg-sage-100/60'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-olive text-white' : 'bg-sage-200 text-pecan-700'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">

        {/* TAB 1: OVERVIEW & AUTHORITY */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Executive Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Executive Summary & Scope Definition</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900 mb-3">
                SouthernWell of South Mississippi Operating Charter
              </h2>
              <p className="text-pecan-800 leading-relaxed text-sm sm:text-base mb-6">
                {manual.executiveSummary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-sage-100">
                <div className="p-4 rounded-2xl bg-sage-50/70 border border-sage-200/80">
                  <h3 className="font-serif font-bold text-sm text-pecan-900 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-olive" />
                    <span>Our Mission</span>
                  </h3>
                  <p className="text-xs text-pecan-700 leading-relaxed">
                    {manual.purposeAndAuthority.mission}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sage-50/70 border border-sage-200/80">
                  <h3 className="font-serif font-bold text-sm text-pecan-900 mb-1 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-olive" />
                    <span>Core Philosophy (Person-in-Environment)</span>
                  </h3>
                  <p className="text-xs text-pecan-700 leading-relaxed">
                    {manual.purposeAndAuthority.corePhilosophy}
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Status & Strict Non-Clinical Mandate */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-amber-900" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-amber-950 mb-1">
                    Statutory Legal Status & Non-Clinical Distinction
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    {manual.purposeAndAuthority.legalStatus}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200">
                    <ShieldCheck className="w-4 h-4 text-amber-800" />
                    <span>Non-Medical Agency Operating Under MS Private Case Management Standards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order of Authority & Governance Hierarchy */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-pecan-900">
                    Order of Authority & Operational Governance
                  </h2>
                  <p className="text-xs text-pecan-600 mt-0.5">
                    Defines administrative accountability, clinical review touchpoints, and field delegation hierarchy.
                  </p>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-sage-100 text-pecan-800">
                  4 Tiers of Authority
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {manual.purposeAndAuthority.orderOfAuthority.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FDFBF7] border border-sage-200 flex flex-col justify-between">
                    <div>
                      <div className="w-7 h-7 rounded-lg bg-olive/10 text-olive font-bold text-xs flex items-center justify-center mb-2.5">
                        0{idx + 1}
                      </div>
                      <h4 className="font-bold text-sm text-pecan-900">{item.role}</h4>
                      <p className="text-xs font-semibold text-olive mt-0.5">{item.holder}</p>
                      <p className="text-xs text-pecan-600 mt-2 leading-relaxed">{item.scope}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programs & Core Service Lines */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-pecan-900 mb-1">
                Official Programs & Service Lines (Programs A–D)
              </h2>
              <p className="text-xs text-pecan-600 mb-6">
                Coordinated case management packages delivered across Forrest, Lamar, Jones, and Stone Counties.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {manual.programsAndServices.map((prog) => (
                  <div key={prog.id} className="p-5 rounded-2xl bg-sage-50/60 border border-sage-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-olive-50 text-olive border border-olive/20">
                          {prog.name.split(':')[0]}
                        </span>
                        <span className="text-[11px] text-pecan-600 font-medium">
                          {prog.countyCoverage}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-pecan-900 mb-1.5">
                        {prog.name.split(':')[1] || prog.name}
                      </h3>
                      <p className="text-xs text-pecan-700 italic mb-3">
                        <strong>Target Population:</strong> {prog.targetPopulation}
                      </p>
                      <ul className="space-y-1.5 text-xs text-pecan-800">
                        {prog.coreDeliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-olive shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        
        {/* TAB 2: COMPLETE 18 STANDARD OPERATING PROCEDURES (SOP-01 THROUGH SOP-18) */}
        {activeTab === 'sop18' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                    <ListOrdered className="w-4 h-4" />
                    <span>Revised Standard Operating Procedures Manual (Revision 2)</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                    All 18 Standard Operating Procedures (SOP-01 to SOP-18)
                  </h2>
                  <p className="text-xs sm:text-sm text-pecan-600 mt-1">
                    Exact operational procedures from the October 2026 revised SOP Guide governing all Pine Belt care navigation.
                  </p>
                </div>
                <div className="text-xs text-pecan-700 bg-sage-50 px-3 py-1.5 rounded-xl border border-sage-200 self-start sm:self-auto font-semibold">
                  18 Standardized Protocols
                </div>
              </div>

              {/* Grid of all 18 SOPs */}
              <div className="space-y-4 mt-6">
                {manual.allSOPs.map((sop, idx) => (
                  <div key={sop.number} className="p-5 rounded-2xl bg-[#FDFBF7] border border-sage-200/90 shadow-2xs hover:border-olive/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sage-200/70 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded-xl bg-olive text-white font-bold text-xs">
                          {sop.number}
                        </span>
                        <h3 className="font-serif font-bold text-base text-pecan-900">
                          {sop.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold text-olive uppercase tracking-wider bg-olive/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                        {sop.category}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="text-xs font-bold text-pecan-700 uppercase tracking-wide">Purpose: </span>
                      <span className="text-xs text-pecan-800 italic">{sop.purpose}</span>
                    </div>

                    <div className="space-y-2">
                      {sop.points.map((pt, pIdx) => (
                        <div key={pIdx} className="text-xs text-pecan-900 flex items-start gap-2 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-sage-100">
                          <span className="text-olive font-bold mt-0.5 shrink-0">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SCOPE GUARDRAILS (APPROVED VS PROHIBITED) */}
        {activeTab === 'scope' && (
          <div className="space-y-6">
            
            {/* Header info card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                    <Scale className="w-4 h-4" />
                    <span>Section 2: Scope Boundaries</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                    Clinical vs. Non-Clinical Boundaries & Scripting Guide
                  </h2>
                  <p className="text-xs sm:text-sm text-pecan-600 mt-1">
                    Defines strict non-negotiable boundaries under Mississippi healthcare statutes, with approved phrasing for field navigators.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold max-w-xs">
                  <div className="font-bold flex items-center gap-1.5 mb-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                    <span>Zero Clinical Tolerance</span>
                  </div>
                  <span>Staff NEVER administer medications, provide medical diagnosis, or perform invasive nursing tasks.</span>
                </div>
              </div>

              {/* Side-by-side matrices */}
              <div className="space-y-6 mt-6">
                {manual.scopeComparisons.map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-sage-200 overflow-hidden shadow-xs">
                    
                    {/* Category Header */}
                    <div className="bg-sage-100/70 px-5 py-3 border-b border-sage-200 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-olive text-white font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="font-serif font-bold text-base text-pecan-900">
                          {item.category}
                        </h3>
                      </div>
                      <span className="text-[11px] text-pecan-600 italic">
                        Governing Standard: Mississippi Professional Regulations
                      </span>
                    </div>

                    {/* Matrix row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-sage-200 bg-white">
                      
                      {/* Approved */}
                      <div className="p-5 bg-emerald-50/20">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Approved Non-Clinical Practice</span>
                        </div>
                        <p className="text-xs sm:text-sm text-pecan-800 leading-relaxed mb-4">
                          {item.approvedScope}
                        </p>

                        {/* Approved Scripting */}
                        <div className="p-3.5 rounded-xl bg-white border border-emerald-200 relative group">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-600" />
                              What to Say (Approved Script)
                            </span>
                            <button
                              onClick={() => handleCopyScript(item.scriptingExample, idx)}
                              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded cursor-pointer transition-colors"
                              title="Copy script to clipboard"
                            >
                              {copiedScriptIndex === idx ? (
                                <>
                                  <Check className="w-3 h-3" /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" /> Copy Script
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-pecan-900 italic font-medium leading-relaxed">
                            {item.scriptingExample}
                          </p>
                        </div>
                      </div>

                      {/* Prohibited */}
                      <div className="p-5 bg-rose-50/20">
                        <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-2">
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          <span>Strictly Prohibited Clinical Activity</span>
                        </div>
                        <p className="text-xs sm:text-sm text-pecan-800 leading-relaxed mb-4">
                          {item.prohibitedScope}
                        </p>

                        {/* Prohibited Scripting */}
                        <div className="p-3.5 rounded-xl bg-white border border-rose-200">
                          <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wide mb-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            Never Say (Prohibited Language)
                          </div>
                          <p className="text-xs text-rose-950 italic font-medium line-through leading-relaxed">
                            {item.prohibitedScripting}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Legal Rationale Footer */}
                    <div className="bg-[#FAF8F5] px-5 py-2.5 border-t border-sage-200 text-xs text-pecan-700 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-olive shrink-0" />
                      <span><strong>Regulatory Rationale:</strong> {item.rationale}</span>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: 10-STEP WORKFLOW SOPS (4.1 – 4.10) */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            
            {/* Control Bar */}
            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Section 4: Standard Operating Procedures</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                    The 10-Step New Client Workflow (SOP 4.1 through 4.10)
                  </h2>
                  <p className="text-xs text-pecan-600 mt-1">
                    Synchronized 1-to-1 with Forms Packet 01–11. Select an SOP to inspect step-by-step requirements.
                  </p>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-pecan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search SOPs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-hidden focus:ring-1 focus:ring-olive w-40 sm:w-56"
                    />
                  </div>

                  <select
                    value={workflowFilter}
                    onChange={(e) => setWorkflowFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-sage-300 bg-white text-xs text-pecan-800 font-medium focus:outline-hidden focus:ring-1 focus:ring-olive"
                  >
                    <option value="all">All SOP Steps (4.1–4.10)</option>
                    <option value="intake">Intake & Agreements (4.1–4.4)</option>
                    <option value="care">Care & Logistics (4.5–4.8)</option>
                    <option value="safety">Monitoring & Incidents (4.9–4.10)</option>
                  </select>
                </div>
              </div>

              {/* Horizontal SOP Step Pills */}
              <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {manual.workflowSOPs.map((sop) => {
                  const isSelected = selectedSOP === sop.code;
                  return (
                    <button
                      key={sop.code}
                      onClick={() => setSelectedSOP(sop.code)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-olive text-white border-olive shadow-xs'
                          : 'bg-sage-50 text-pecan-800 border-sage-200 hover:bg-sage-100'
                      }`}
                    >
                      <span className="font-bold">{sop.code}:</span> {sop.title.split(' ')[0]}...
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected SOP Detail Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-sage-200">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-olive text-white">
                      {activeSOPDetail.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sage-100 text-pecan-800 border border-sage-200">
                      {activeSOPDetail.stepNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> SLA: {activeSOPDetail.timeline}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-pecan-900">
                    {activeSOPDetail.title}
                  </h3>
                  
                  <div className="mt-2 text-xs text-pecan-600 flex flex-wrap items-center gap-4">
                    <span><strong>Responsible Role:</strong> {activeSOPDetail.responsibleRole}</span>
                    {activeSOPDetail.formName && (
                      <span className="text-olive font-semibold flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        {activeSOPDetail.formName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Action: Jump to corresponding Form in Forms Packet */}
                {activeSOPDetail.formId && (
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onNavigateToScreen('forms');
                        if (onNavigateToForm) {
                          onNavigateToForm(activeSOPDetail.formId!);
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 font-bold text-xs border border-sage-300 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-olive" />
                      <span>Open Form {activeSOPDetail.formId} in Forms Packet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Objective */}
              <div className="py-5 border-b border-sage-100">
                <h4 className="font-serif font-bold text-sm text-pecan-900 mb-1">
                  Procedure Objective
                </h4>
                <p className="text-sm text-pecan-800 leading-relaxed">
                  {activeSOPDetail.objective}
                </p>
              </div>

              {/* Step by Step Action Items */}
              <div className="py-5 border-b border-sage-100">
                <h4 className="font-serif font-bold text-sm text-pecan-900 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-olive" />
                  <span>Mandatory Step-by-Step Procedure</span>
                </h4>
                <div className="space-y-2.5">
                  {activeSOPDetail.keyActionItems.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-sage-50/60 border border-sage-200/80 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-olive/20 text-olive font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-pecan-900 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentation & Red Flags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-sage-200">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-pecan-900 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-olive" />
                    <span>Documentation Required</span>
                  </h4>
                  <p className="text-xs text-pecan-800 leading-relaxed">
                    {activeSOPDetail.documentationRequired}
                  </p>
                  <div className="mt-3 text-[11px] font-semibold text-olive bg-white p-2 rounded-lg border border-sage-200">
                    <strong>Quality Standard:</strong> {activeSOPDetail.qualityStandard}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                    <span>Protocol Red Flags (Immediate Escalation)</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-rose-950">
                    {activeSOPDetail.redFlags.map((flag, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Quick-reference table of all 10 SOPs */}
            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-pecan-900 mb-3">
                Full 10-Step Workflow Summary Index
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-sage-100/70 border-b border-sage-200 text-pecan-900 font-bold">
                    <tr>
                      <th className="py-2.5 px-3">SOP Code</th>
                      <th className="py-2.5 px-3">Step & Title</th>
                      <th className="py-2.5 px-3">Governing Form</th>
                      <th className="py-2.5 px-3">Timeline / SLA</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sage-100">
                    {manual.workflowSOPs.map((s) => (
                      <tr 
                        key={s.code} 
                        className={`hover:bg-sage-50/80 transition-colors cursor-pointer ${
                          selectedSOP === s.code ? 'bg-olive-50/40 font-semibold' : ''
                        }`}
                        onClick={() => setSelectedSOP(s.code)}
                      >
                        <td className="py-2.5 px-3 font-bold text-olive">{s.code}</td>
                        <td className="py-2.5 px-3 text-pecan-900">{s.title}</td>
                        <td className="py-2.5 px-3 text-pecan-700">{s.formName ? s.formName.split(':')[0] : 'Internal SOP'}</td>
                        <td className="py-2.5 px-3 text-pecan-600">{s.timeline.split('(')[0]}</td>
                        <td className="py-2.5 px-3 text-pecan-600">{s.responsibleRole}</td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSOP(s.code);
                            }}
                            className="text-olive hover:underline font-bold text-[11px]"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        
        {/* TAB 5: PROGRAMS, PRICES & SERVICE AREA */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Part II: Pricing & Service Structure</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900 mb-1">
                Programs, Prices and Service Area (Controlling Price Sheet)
              </h2>
              <p className="text-xs sm:text-sm text-pecan-600 mb-6">
                SouthernWell is private-pay only. In-person service covers Forrest, Lamar, Jones and Stone Counties; clients 75–100 miles away are served via Telephonic Program.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {manual.pricingPrograms.map((pr, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-sage-50/60 border border-sage-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-sm text-pecan-900">{pr.name}</span>
                        {pr.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-olive text-white">
                            {pr.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-pecan-700 leading-relaxed mb-4">
                        {pr.targetOrSummary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-sage-200/80 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-pecan-600">Rate / Fee:</span>
                      <span className="text-xs font-bold text-olive">{pr.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Area Notice */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FDFBF7] border border-sage-200 text-xs text-pecan-800 space-y-1.5">
                <div className="font-bold text-pecan-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-olive" />
                  <span>Approved Service Area & Payment Channels</span>
                </div>
                <p>• <strong>Primary 4-County Catchment:</strong> Forrest County (Hattiesburg), Lamar County (Purvis / Oak Grove), Jones County (Laurel / Ellisville), and Stone County (Wiggins). Note: Harrison, Jackson, and Pearl River were retired in October 2026.</p>
                <p>• <strong>Telephonic Services:</strong> Clients 75 to 100 miles from Hattiesburg Hub.</p>
                <p>• <strong>Accepted Payment Methods:</strong> Credit/debit card, ACH bank draft, Cash App, PayPal, Zelle, or invoice. Billed privately; does not bill Medicare/Medicaid.</p>
                <p>• <strong>LCSW Separation:</strong> Clinical mental health services provided by independent Consulting LCSW are billed completely separately under her own license with zero referral fees.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CRISIS ESCALATION PROTOCOLS */}
        {activeTab === 'escalation' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Section 5: Emergency Protocols</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                4-Tier Emergency & Crisis Escalation Hierarchy
              </h2>
              <p className="text-xs sm:text-sm text-pecan-600 mt-1 mb-6">
                Standardized decision framework for managing non-urgent social delays, mild health changes, falls, and life threats.
              </p>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {manual.escalationTiers.map((t) => {
                  const isSelected = selectedTier === t.tier;
                  const borderColors = {
                    emerald: 'border-emerald-300 bg-emerald-50/50',
                    amber: 'border-amber-300 bg-amber-50/50',
                    orange: 'border-orange-300 bg-orange-50/50',
                    rose: 'border-rose-400 bg-rose-50/70',
                  }[t.severityColor as 'emerald' | 'amber' | 'orange' | 'rose'] || 'border-sage-200';

                  return (
                    <div
                      key={t.tier}
                      onClick={() => setSelectedTier(t.tier)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        borderColors
                      } ${isSelected ? 'ring-2 ring-olive shadow-sm' : 'opacity-90 hover:opacity-100'}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-white shadow-xs">
                            {t.tier}
                          </span>
                          <span className="text-[10px] font-bold text-pecan-600">
                            {t.notificationWindow}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-pecan-900 mb-2">
                          {t.label}
                        </h4>
                        <p className="text-[11px] text-pecan-700 line-clamp-3">
                          {t.immediateAction}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-black/5 text-[10px] font-semibold text-pecan-800">
                        Select to View Full Protocol
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Tier Expanded View */}
              {(() => {
                const currentTier = manual.escalationTiers.find(t => t.tier === selectedTier) || manual.escalationTiers[0];
                return (
                  <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-sage-300 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-pecan-900 text-white">
                          {currentTier.tier}: {currentTier.label}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-pecan-900 mt-2">
                          Action Protocol & SLA: {currentTier.notificationWindow}
                        </h3>
                      </div>

                      <div className="text-xs text-pecan-700 font-semibold bg-white px-3 py-1.5 rounded-xl border border-sage-200">
                        Documentation: {currentTier.documentation}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white border border-sage-200">
                        <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-pecan-900 mb-2">
                          Recognized Field Trigger Scenarios
                        </h4>
                        <ul className="space-y-1.5 text-xs text-pecan-800">
                          {currentTier.examples.map((ex, exIdx) => (
                            <li key={exIdx} className="flex items-start gap-1.5">
                              <span className="text-olive font-bold">•</span>
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-sage-200">
                        <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-pecan-900 mb-2">
                          Immediate Action & Required Contacts
                        </h4>
                        <p className="text-xs text-pecan-900 font-medium mb-3">
                          {currentTier.immediateAction}
                        </p>
                        <div className="text-xs text-pecan-700">
                          <strong>Mandatory Notifications:</strong>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {currentTier.requiredContacts.map((c, cIdx) => (
                              <span key={cIdx} className="px-2 py-0.5 rounded-md bg-sage-100 text-pecan-800 text-[11px] font-semibold">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })()}

            </div>

            {/* Field Safety Guidelines */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-pecan-900 mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5 text-olive" />
                <span>Field Staff Safety & Home Visit Protocol</span>
              </h3>
              <p className="text-xs text-pecan-600 mb-4">
                Strict safety measures required for all navigators and CHWs entering residences across the 4-county service area.
              </p>

              <div className="space-y-2">
                {manual.fieldSafetyGuidelines.map((guide, gIdx) => (
                  <div key={gIdx} className="p-3.5 rounded-xl bg-sage-50/60 border border-sage-200/80 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-olive text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {gIdx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-pecan-900 leading-relaxed">
                      {guide}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: MANDATORY REPORTING (MISSISSIPPI VULNERABLE PERSONS ACT) */}
        {activeTab === 'mandatory' && (
          <div className="space-y-6">
            
            {/* Statute Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Mississippi Statutory Compliance</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                    {manual.mandatoryReportingPolicy.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-olive mt-0.5">
                    {manual.mandatoryReportingPolicy.statute}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold text-center">
                  <div className="text-[10px] uppercase text-rose-700">MS 24/7 APS HOTLINE</div>
                  <div className="text-base text-rose-900 font-extrabold mt-0.5">1-800-222-8000</div>
                  <div className="text-[10px] text-rose-700">Immediate Phone + 24h Written</div>
                </div>
              </div>

              {/* Definition */}
              <div className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200 mb-6">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-pecan-900 mb-1">
                  Legal Definition of a "Vulnerable Person" (MCA § 43-47-5)
                </h4>
                <p className="text-xs sm:text-sm text-pecan-800 leading-relaxed italic">
                  "{manual.mandatoryReportingPolicy.definitionOfVulnerablePerson}"
                </p>
              </div>

              {/* Reportable Acts */}
              <h3 className="font-serif font-bold text-base text-pecan-900 mb-3">
                Legally Reportable Categories of Abuse, Neglect & Exploitation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {manual.mandatoryReportingPolicy.reportableActs.map((act, aIdx) => {
                  const [category, desc] = act.split(': ');
                  return (
                    <div key={aIdx} className="p-4 rounded-xl bg-white border border-sage-200 shadow-2xs">
                      <h4 className="font-bold text-xs uppercase tracking-wide text-rose-900 mb-1 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>{category}</span>
                      </h4>
                      <p className="text-xs text-pecan-700 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* 5-Step Escalation Protocol */}
              <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-sage-200">
                <h3 className="font-serif font-bold text-base text-pecan-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-olive" />
                  <span>SouthernWell 5-Step Reporting Escalation Process</span>
                </h3>
                <div className="space-y-2">
                  {manual.mandatoryReportingPolicy.internalEscalationSteps.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-white border border-sage-200 text-xs sm:text-sm text-pecan-900 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-olive text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 4-County Sheriff Emergency Directory */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-pecan-900 mb-1">
                4-County Law Enforcement Emergency Contacts
              </h3>
              <p className="text-xs text-pecan-600 mb-4">
                Local Sheriff dispatch numbers for urgent physical checks or immediate elder protection in Pine Belt counties.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {manual.mandatoryReportingPolicy.localSheriffs.map((sheriff) => (
                  <div key={sheriff.county} className="p-4 rounded-2xl bg-sage-50/70 border border-sage-200 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-pecan-900">{sheriff.county}</h4>
                      <p className="text-xs text-pecan-600 mt-1">{sheriff.address}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-sage-200">
                      <a
                        href={`tel:${sheriff.phone.replace(/[^0-9]/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-olive hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{sheriff.phone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: CHART AUDITING & COMPLIANCE */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                <Award className="w-4 h-4" />
                <span>Section 6: Quality Assurance</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                Monthly 30-Day Chart Audit Protocol
              </h2>
              <p className="text-xs sm:text-sm text-pecan-600 mt-1 mb-6">
                Random 10% monthly sample + 100% audit of all new enrollments at Day 30 to guarantee legal compliance.
              </p>

              <div className="space-y-4">
                {manual.auditChecklist.map((item, idx) => (
                  <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-sage-50/50 border border-sage-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-olive-50 border border-olive/20 text-olive font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-xs text-olive">{item.code}</span>
                          <span className="text-[11px] font-semibold text-pecan-600 bg-white px-2 py-0.5 rounded-full border border-sage-200">
                            {item.frequency}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-pecan-900">
                          {item.title}
                        </h4>
                        <p className="text-xs text-pecan-700 mt-1">
                          <strong>Audit Standard:</strong> {item.standard}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 sm:border-l sm:border-sage-200 sm:pl-4">
                      <div className="text-[11px] text-pecan-500">Audited By</div>
                      <div className="text-xs font-bold text-pecan-900">{item.verifiedBy}</div>
                      <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Standard Enforced
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct link to Operations Hub Audit View */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FDFBF7] border border-sage-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-olive" />
                  <div>
                    <h4 className="font-bold text-sm text-pecan-900">Live Operations Hub Audit Tracker</h4>
                    <p className="text-xs text-pecan-600">Track real client compliance across Eleanor Mae Woods, Clara Mae Holloway, and Thomas E. Vance.</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToScreen('operations')}
                  className="px-4 py-2 rounded-xl bg-olive hover:bg-olive/90 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  Open Operations Audit Tab
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 7: CODE OF ETHICS & CONDUCT */}
        {activeTab === 'ethics' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>Section 7: Professional Standards</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                Staff Ethics, Gift Boundaries & HIPAA Safeguards
              </h2>
              <p className="text-xs sm:text-sm text-pecan-600 mt-1 mb-6">
                Mandatory ethical tenets grounded in the NASW Code of Ethics and National Association of Healthcare Advocacy (NAHAC).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Core Principles */}
                <div className="p-5 rounded-2xl bg-sage-50/60 border border-sage-200">
                  <h3 className="font-serif font-bold text-base text-pecan-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-olive" />
                    <span>Core Ethical Principles</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-pecan-800">
                    {manual.ethicsAndConduct.corePrinciples.map((pr, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-olive shrink-0 mt-0.5" />
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gift Policy */}
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <h3 className="font-serif font-bold text-base text-amber-950 mb-2 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-800" />
                    <span>Client Gift & Financial Boundary Policy</span>
                  </h3>
                  <p className="text-xs text-amber-900 leading-relaxed mb-3">
                    {manual.ethicsAndConduct.giftPolicy}
                  </p>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    {manual.ethicsAndConduct.conflictOfInterest}
                  </p>
                </div>

                {/* HIPAA & Privacy */}
                <div className="p-5 rounded-2xl bg-sage-50/60 border border-sage-200">
                  <h3 className="font-serif font-bold text-base text-pecan-900 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-olive" />
                    <span>HIPAA & Physical/Digital Privacy</span>
                  </h3>
                  <p className="text-xs text-pecan-800 leading-relaxed">
                    {manual.ethicsAndConduct.confidentialityAndHIPAA}
                  </p>
                </div>

                {/* CEUs */}
                <div className="p-5 rounded-2xl bg-sage-50/60 border border-sage-200">
                  <h3 className="font-serif font-bold text-base text-pecan-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-olive" />
                    <span>Annual Training & 10 CEU Requirement</span>
                  </h3>
                  <p className="text-xs text-pecan-800 leading-relaxed">
                    {manual.ethicsAndConduct.continuingEducation}
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        
        {/* TAB 10: APPENDIX A–E & OPEN ITEMS FOR OWNER / LEGAL */}
        {activeTab === 'appendix' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                <Info className="w-4 h-4" />
                <span>Appendix D & Governance</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900 mb-1">
                Appendix D: Open Items for Owner and Legal Decision
              </h2>
              <p className="text-xs sm:text-sm text-pecan-600 mb-6">
                Active decision items identified in Revision 2 requiring owner confirmation or formal legal review prior to final operational deployment.
              </p>

              <div className="space-y-3">
                {manual.openItemsAppendixD.map((item) => (
                  <div key={item.itemNumber} className="p-4 rounded-2xl bg-[#FDFBF7] border border-sage-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-xl bg-olive text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        #{item.itemNumber}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-pecan-900">
                          {item.item}
                        </h4>
                        <p className="text-xs text-pecan-700 mt-1 leading-relaxed">
                          <strong>Why It Matters:</strong> {item.whyItMatters}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 shrink-0 self-start sm:self-auto">
                      Legal / Owner Review
                    </span>
                  </div>
                ))}
              </div>

              {/* Revision Log Box */}
              <div className="mt-8 pt-6 border-t border-sage-200">
                <h3 className="font-serif font-bold text-base text-pecan-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-olive" />
                  <span>Appendix C: Formal Revision Log</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-sage-50/60 border border-sage-200 text-xs">
                    <div className="flex items-center justify-between mb-1.5 font-bold text-pecan-900">
                      <span>October 2026 (Revision 2 - Current)</span>
                      <span className="text-olive">Author: Jasmeen Williams, LPN, BS-HHS</span>
                    </div>
                    <p className="text-pecan-800 leading-relaxed mb-2">
                      <strong>Alignment:</strong> Service area corrected to Forrest, Lamar, Jones and Stone; programs and prices updated to Essentials, Signature, Concierge, add-ons and Telephonic Program; Senior Navigation removed; SteadyCare naming adopted; Rose Pink removed from palette in favor of Deep Pecan.<br />
                      <strong>Intake:</strong> SOP-02 and SOP-03 rebuilt around the 10-step Workflow Manual, two gates (Gate 1 Enrollment Complete, Gate 2 Ready to Start), authority to sign, four-test fit decision, capacity cap (15-20 clients), and waitlist. Psychosocial intake retired from SouthernWell scope.<br />
                      <strong>Safety & Practice:</strong> SOP-07 adds provider-directed parameters; SOP-10 defines missed check-in attempts and 2-hour welfare check; SOP-05 adds lone-worker check-in; SOP-06 adds strict never-touch rule and exception handling.<br />
                      <strong>New Chapters:</strong> SOP-17 Client Rights, Concerns and Complaints; SOP-18 Discharge, Transition and Record Closure; Appendix D Open Items.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-sage-200 text-xs text-pecan-700">
                    <div className="flex items-center justify-between font-bold text-pecan-900 mb-1">
                      <span>September 2026 (Revision 1)</span>
                      <span>Owner Initial Draft</span>
                    </div>
                    <p>Initial SOP draft; non-clinical wording updated; brand identity palette integrated.</p>
                  </div>
                </div>
              </div>

              {/* Appendix E Brand Standards */}
              <div className="mt-6 p-4 rounded-2xl bg-sage-50/70 border border-sage-200 text-xs text-pecan-800">
                <h4 className="font-serif font-bold text-sm text-pecan-900 mb-2">
                  Appendix E: Brand Identity & Document Standards
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] font-semibold">
                  <div className="p-2 rounded-xl bg-[#556B2F] text-white">Olive Green<br />#556B2F</div>
                  <div className="p-2 rounded-xl bg-[#8A9A86] text-white">Sage<br />#8A9A86</div>
                  <div className="p-2 rounded-xl bg-[#FDFBF7] text-pecan-900 border border-sage-300">Magnolia Cream<br />#FDFBF7</div>
                  <div className="p-2 rounded-xl bg-[#9EAB84] text-pecan-900">Sweetgrass<br />#9EAB84</div>
                  <div className="p-2 rounded-xl bg-[#4A3B32] text-white">Deep Pecan<br />#4A3B32</div>
                </div>
                <p className="mt-2 text-center text-pecan-700 font-serif italic">
                  Tagline: "Supporting Healing. Strengthening Families." (Phone: 601-554-6067)
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 11: INTERACTIVE SCOPE QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-xs">
              <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Field Self-Test</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                Pine Belt Field Scenarios: Approved vs. Prohibited Self-Test
              </h2>
              <p className="text-xs sm:text-sm text-pecan-600 mt-1 mb-6">
                Test your knowledge of SouthernWell non-clinical scope guardrails, Mississippi law, and emergency actions.
              </p>

              <div className="space-y-5">
                {manual.quizQuestions.map((q, idx) => {
                  const hasAnswered = quizSubmitted[q.id];
                  const userAnswer = quizAnswers[q.id];
                  const isCorrect = userAnswer === q.isApproved;

                  return (
                    <div key={q.id} className="p-5 rounded-2xl bg-[#FDFBF7] border border-sage-200">
                      
                      <div className="flex items-start gap-3 mb-3">
                        <span className="w-6 h-6 rounded-full bg-olive text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-serif font-bold text-sm text-pecan-900">
                            Scenario {idx + 1}:
                          </h4>
                          <p className="text-xs sm:text-sm text-pecan-800 mt-0.5 leading-relaxed">
                            {q.scenario}
                          </p>
                        </div>
                      </div>

                      {/* Proposed Action Box */}
                      <div className="p-3.5 rounded-xl bg-white border border-sage-200 mb-3 text-xs sm:text-sm text-pecan-900">
                        <strong>Proposed Action:</strong> {q.proposedAction}
                      </div>

                      {/* Decision buttons */}
                      {!hasAnswered ? (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuizAnswer(q.id, true)}
                            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Approved Non-Clinical Practice</span>
                          </button>

                          <button
                            onClick={() => handleQuizAnswer(q.id, false)}
                            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-300 transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>Prohibited / Clinical Breach</span>
                          </button>
                        </div>
                      ) : (
                        <div className={`p-4 rounded-xl border ${
                          isCorrect ? 'bg-emerald-50/70 border-emerald-300' : 'bg-rose-50/70 border-rose-300'
                        }`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={`font-bold text-xs flex items-center gap-1.5 ${
                              isCorrect ? 'text-emerald-800' : 'text-rose-800'
                            }`}>
                              {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                              {isCorrect ? 'Correct Assessment!' : 'Incorrect Scope Assessment'}
                            </span>
                            <span className="text-[11px] font-semibold text-pecan-600">
                              Ref: {q.relevantSOP}
                            </span>
                          </div>
                          <p className="text-xs text-pecan-900 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
};

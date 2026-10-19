import React, { useState, useMemo } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  Filter,
  Users,
  Calendar,
  Phone,
  MapPin,
  Check,
  AlertTriangle,
  Heart,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  ClipboardList,
  UserCheck,
  FileCheck2,
  RotateCcw,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ClientRecord, 
  ClientProfile, 
  FormsPacketData, 
  Form01Data, 
  Form02Data, 
  Form03Data, 
  Form04Data, 
  Form05Data, 
  Form06Data, 
  Form07Data, 
  Form08Data, 
  Form09Data, 
  Form10Data, 
  Form11Data,
  SDOHAreaRating 
} from '../types';
import { 
  FORMS_METADATA, 
  SDOH_DOMAIN_LABELS, 
  createDefaultFormsPacket 
} from '../data/mockFormsPacket';

interface ClientFormsPacketScreenProps {
  clientRecord: ClientRecord;
  allClients: ClientProfile[];
  onSelectClient: (clientId: string) => void;
  onUpdateFormsPacket: (updatedPacket: FormsPacketData) => void;
  onOpenSignModal: () => void;
  onNavigateToOperations?: () => void;
  onNavigateToSOP?: () => void;
}

export const ClientFormsPacketScreen: React.FC<ClientFormsPacketScreenProps> = ({
  clientRecord,
  allClients,
  onSelectClient,
  onUpdateFormsPacket,
  onOpenSignModal,
  onNavigateToOperations,
  onNavigateToSOP,
}) => {
  const client = clientRecord.client;
  
  // Initialize or fetch current client's forms packet
  const formsPacket: FormsPacketData = useMemo(() => {
    return clientRecord.formsPacket || createDefaultFormsPacket(client);
  }, [clientRecord, client]);

  const [activeFormId, setActiveFormId] = useState<string>('01');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isBlankTemplateMode, setIsBlankTemplateMode] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Local editable packet state
  const [packetData, setPacketData] = useState<FormsPacketData>(formsPacket);

  // Sync when clientRecord changes
  React.useEffect(() => {
    setPacketData(clientRecord.formsPacket || createDefaultFormsPacket(clientRecord.client));
  }, [clientRecord]);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSavePacket = () => {
    onUpdateFormsPacket(packetData);
    triggerToast('All changes saved to client records successfully.');
  };

  const handleResetToDefaults = () => {
    const fresh = createDefaultFormsPacket(client);
    setPacketData(fresh);
    onUpdateFormsPacket(fresh);
    triggerToast('Reset form packet to default profile data.');
  };

  const handlePrintCurrent = () => {
    window.print();
  };

  // Helper updates for specific forms
  const updateForm01 = (updater: Partial<Form01Data>) => {
    if (!packetData.form01) return;
    const updated = { ...packetData.form01, ...updater };
    const next = { ...packetData, form01: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm02 = (updater: Partial<Form02Data>) => {
    if (!packetData.form02) return;
    const updated = { ...packetData.form02, ...updater };
    const next = { ...packetData, form02: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm03 = (updater: Partial<Form03Data>) => {
    if (!packetData.form03) return;
    const updated = { ...packetData.form03, ...updater };
    const next = { ...packetData, form03: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm04 = (updater: Partial<Form04Data>) => {
    if (!packetData.form04) return;
    const updated = { ...packetData.form04, ...updater };
    const next = { ...packetData, form04: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm05 = (updater: Partial<Form05Data>) => {
    if (!packetData.form05) return;
    const updated = { ...packetData.form05, ...updater };
    const next = { ...packetData, form05: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm06 = (updater: Partial<Form06Data>) => {
    if (!packetData.form06) return;
    const updated = { ...packetData.form06, ...updater };
    const next = { ...packetData, form06: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm07 = (updater: Partial<Form07Data>) => {
    if (!packetData.form07) return;
    const updated = { ...packetData.form07, ...updater };
    const next = { ...packetData, form07: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm08 = (updater: Partial<Form08Data>) => {
    if (!packetData.form08) return;
    const updated = { ...packetData.form08, ...updater };
    const next = { ...packetData, form08: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm09 = (updater: Partial<Form09Data>) => {
    if (!packetData.form09) return;
    const updated = { ...packetData.form09, ...updater };
    const next = { ...packetData, form09: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm10 = (updater: Partial<Form10Data>) => {
    if (!packetData.form10) return;
    const updated = { ...packetData.form10, ...updater };
    const next = { ...packetData, form10: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const updateForm11 = (updater: Partial<Form11Data>) => {
    if (!packetData.form11) return;
    const updated = { ...packetData.form11, ...updater };
    const next = { ...packetData, form11: updated };
    setPacketData(next);
    onUpdateFormsPacket(next);
  };

  const activeMeta = FORMS_METADATA.find((m) => m.id === activeFormId) || FORMS_METADATA[0];

  const filteredForms = useMemo(() => {
    if (categoryFilter === 'all') return FORMS_METADATA;
    return FORMS_METADATA.filter((f) => f.category === categoryFilter);
  }, [categoryFilter]);

  // SDOH Summary statistics
  const sdohStats = useMemo(() => {
    if (!packetData.form08?.areas) return { needsHelp: 0, someNeed: 0, noNeed: 13 };
    let needsHelp = 0;
    let someNeed = 0;
    let noNeed = 0;
    Object.values(packetData.form08.areas).forEach((a) => {
      if (a.rating === 'Needs help') needsHelp++;
      else if (a.rating === 'Some need') someNeed++;
      else noNeed++;
    });
    return { needsHelp, someNeed, noNeed };
  }, [packetData.form08]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-pecan-900 pb-20">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-olive-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-olive-600 transition-all animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-semibold">{saveToast}</span>
        </div>
      )}

      {/* Top Breadcrumb & Workflow Header (No Print) */}
      <section className="no-print bg-gradient-to-b from-sage-100/90 to-sage-50/50 border-b border-sage-200/80 px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-olive mb-1">
                <span>SouthernWell of South Mississippi</span>
                <span>•</span>
                <span>Owner Review Draft</span>
                <span>•</span>
                <span className="bg-olive/10 text-olive px-2 py-0.5 rounded-full">October 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-pecan-950 flex items-center gap-3">
                <span>Client Forms Packet</span>
                <span className="text-xs sm:text-sm font-sans font-normal bg-sage-200/80 text-pecan-800 px-2.5 py-1 rounded-xl">
                  Forms 01 – 11
                </span>
              </h1>
              <p className="text-sm text-pecan-700 mt-1 max-w-3xl">
                The standard workflow forms used in the New Client Workflow, from first discovery call to active client care management.
                Service area: Forrest, Lamar, Jones and Stone Counties.
              </p>
            </div>

            {/* Client Context Card & Tools */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white px-4 py-2.5 rounded-2xl border border-sage-200 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-olive-100 text-olive font-bold flex items-center justify-center text-sm">
                  {client.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-pecan-500 font-medium">Active Client:</span>
                    <select
                      value={client.id}
                      onChange={(e) => onSelectClient(e.target.value)}
                      className="text-xs font-bold text-pecan-900 bg-transparent border-0 focus:ring-0 cursor-pointer p-0"
                    >
                      {allClients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.county.split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-[11px] text-pecan-600">
                    DOB: {client.dob} · ID: {client.id}
                  </div>
                </div>
              </div>

              {/* Blank printable switch */}
              <button
                onClick={() => setIsBlankTemplateMode(!isBlankTemplateMode)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isBlankTemplateMode
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                    : 'bg-white text-pecan-800 border-sage-200 hover:bg-sage-50'
                }`}
                title="Toggle blank fields for clean physical printing"
              >
                <span>{isBlankTemplateMode ? '📄 Blank Form Mode ON' : '👤 Client Data Mode'}</span>
              </button>

              {/* SOP Manual Button */}
              {onNavigateToSOP && (
                <button
                  onClick={onNavigateToSOP}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 text-xs font-bold border border-sage-300 transition-colors shadow-xs cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-olive" />
                  <span>SOP Manual (Rev 2)</span>
                </button>
              )}

              {/* Print Button */}
              <button
                onClick={handlePrintCurrent}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print {activeMeta.number}</span>
              </button>
            </div>
          </div>

          {/* Workflow Sequence Overview Bar */}
          <div className="mt-6 pt-4 border-t border-sage-200/60 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            <div className="bg-white/70 p-2.5 rounded-xl border border-sage-200/60">
              <span className="text-[10px] uppercase font-bold text-olive block">Step 1: First Call</span>
              <span className="font-semibold text-pecan-900 truncate block">Form 01: Inquiry</span>
            </div>
            <div className="bg-white/70 p-2.5 rounded-xl border border-sage-200/60">
              <span className="text-[10px] uppercase font-bold text-olive block">Step 2: Screening</span>
              <span className="font-semibold text-pecan-900 truncate block">Form 02: Scope</span>
            </div>
            <div className="bg-white/70 p-2.5 rounded-xl border border-sage-200/60">
              <span className="text-[10px] uppercase font-bold text-olive block">Step 5: Consent</span>
              <span className="font-semibold text-pecan-900 truncate block">Forms 03, 04, 05, 06</span>
            </div>
            <div className="bg-white/70 p-2.5 rounded-xl border border-sage-200/60">
              <span className="text-[10px] uppercase font-bold text-olive block">Step 6: Financial</span>
              <span className="font-semibold text-pecan-900 truncate block">Form 07: Sliding Scale</span>
            </div>
            <div className="bg-white/70 p-2.5 rounded-xl border border-sage-200/60">
              <span className="text-[10px] uppercase font-bold text-olive block">Step 7 & 8: Welcome</span>
              <span className="font-semibold text-pecan-900 truncate block">Forms 08 & 09</span>
            </div>
            <div className="bg-white/70 p-2.5 rounded-xl border border-sage-200/60">
              <span className="text-[10px] uppercase font-bold text-olive block">Step 9 & 10: Care & Safety</span>
              <span className="font-semibold text-pecan-900 truncate block">Forms 10 & 11</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Forms Index Sidebar (No Print) */}
          <aside className="no-print lg:col-span-4 space-y-4">
            {/* Category Filter Pills */}
            <div className="bg-white p-3 rounded-2xl border border-sage-200 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-pecan-700 mb-2 px-1">
                <span>Filter by Workflow Stage</span>
                <span className="text-[11px] text-olive">{filteredForms.length} Forms</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All 11' },
                  { id: 'Intake & Eligibility', label: 'Intake' },
                  { id: 'Agreements & Permissions', label: 'Legal / Consent' },
                  { id: 'Financial & SDOH', label: 'SDOH' },
                  { id: 'Care Planning', label: 'Plan' },
                  { id: 'Safety & Quality', label: 'Safety' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-olive text-white'
                        : 'bg-sage-50 text-pecan-700 hover:bg-sage-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Forms List */}
            <div className="bg-white rounded-2xl border border-sage-200 shadow-xs divide-y divide-sage-100 overflow-hidden">
              <div className="p-3.5 bg-sage-50/70 border-b border-sage-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-pecan-800">Forms Index</span>
                <span className="text-[11px] text-pecan-500">October 2026 Manual</span>
              </div>

              <div className="max-h-[640px] overflow-y-auto divide-y divide-sage-100">
                {filteredForms.map((meta) => {
                  const isActive = meta.id === activeFormId;
                  return (
                    <button
                      key={meta.id}
                      onClick={() => {
                        setActiveFormId(meta.id);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-3.5 transition-all cursor-pointer flex items-start gap-3 ${
                        isActive
                          ? 'bg-olive-50/70 border-l-4 border-olive'
                          : 'hover:bg-sage-50/60'
                      }`}
                    >
                      <span className={`px-2 py-1 rounded-md text-[11px] font-bold shrink-0 ${
                        isActive ? 'bg-olive text-white' : 'bg-sage-100 text-pecan-700'
                      }`}>
                        {meta.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-pecan-950 truncate">
                            {meta.title}
                          </span>
                          <span className="text-[10px] font-semibold text-olive shrink-0 ml-1">
                            {meta.step}
                          </span>
                        </div>
                        <p className="text-[11px] text-pecan-600 line-clamp-1 mt-0.5">
                          {meta.subtitle}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-olive translate-x-0.5' : 'text-sage-300'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note on Forms Already In System */}
            <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-sage-200/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-olive">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Existing Integrated Records</span>
              </div>
              <p className="text-[11px] text-pecan-700 leading-relaxed">
                Forms already integrated into SouthernWell modules:
              </p>
              <ul className="text-[11px] text-pecan-700 list-disc pl-4 space-y-1">
                <li>New Client Intake & Payment Agreement</li>
                <li>Medication Concierge Enrollment</li>
                <li>SteadyCare Non-Clinical Care Plan & STAR Logs</li>
                <li>Transportation & Clinic Request Tasks</li>
              </ul>
              {onNavigateToOperations && (
                <button
                  onClick={onNavigateToOperations}
                  className="w-full mt-2 py-1.5 px-3 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Go to Operations Hub (SOP 3.4) →</span>
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleSavePacket}
                className="flex-1 py-2 px-3 rounded-xl bg-olive text-white font-bold text-xs hover:bg-olive-700 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save All Forms</span>
              </button>
              <button
                onClick={handleResetToDefaults}
                className="py-2 px-3 rounded-xl bg-sage-100 text-pecan-700 font-medium text-xs hover:bg-sage-200 transition-colors cursor-pointer"
                title="Reset to default values from client profile"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </aside>

          {/* Right Main Form Viewer & Editor Canvas */}
          <main className="lg:col-span-8 print-container">
            {/* Document Sheet Card */}
            <div className="bg-white rounded-3xl border border-sage-200 shadow-md p-6 sm:p-10 document-sheet">
              {/* Official Document Letterhead */}
              <div className="border-b-2 border-olive pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold tracking-widest text-olive uppercase">
                    Supporting Healing. Strengthening Families.
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-pecan-950 tracking-tight mt-1">
                    SouthernWell
                  </h2>
                  <div className="text-xs font-serif italic text-pecan-700">
                    OF SOUTH MISSISSIPPI
                  </div>
                  <div className="text-[11px] text-pecan-600 mt-1">
                    Non-clinical care navigation, case management & resource coordination
                  </div>
                </div>

                <div className="text-center sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-sage-200 text-xs text-pecan-700 space-y-0.5">
                  <div className="font-bold text-olive uppercase tracking-wide">
                    CLIENT FORMS PACKET
                  </div>
                  <div className="font-mono font-semibold text-pecan-900">
                    {activeMeta.number} · {activeMeta.step}
                  </div>
                  <div className="text-[11px] text-pecan-500">
                    Forrest, Lamar, Jones & Stone Counties
                  </div>
                  <div className="text-[11px] font-mono text-pecan-600">
                    Phone: 601-554-6067
                  </div>
                </div>
              </div>

              {/* Form Title Banner */}
              <div className="bg-[#FAF7F0] border-l-4 border-olive p-4 rounded-r-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-olive block">
                    {activeMeta.number} ({activeMeta.step})
                  </span>
                  <h3 className="text-xl font-serif font-bold text-pecan-950">
                    {activeMeta.title}
                  </h3>
                  <p className="text-xs text-pecan-700 mt-0.5 italic">
                    {activeMeta.timing}
                  </p>
                </div>
                {activeMeta.required ? (
                  <span className="self-start sm:self-center px-2.5 py-1 rounded-full bg-olive-100 text-olive text-[11px] font-bold">
                    Required Workflow Form
                  </span>
                ) : (
                  <span className="self-start sm:self-center px-2.5 py-1 rounded-full bg-sage-100 text-pecan-700 text-[11px] font-semibold">
                    As Needed / Optional
                  </span>
                )}
              </div>

              {/* Render Active Form View */}
              {activeFormId === '01' && (
                <RenderForm01
                  data={isBlankTemplateMode ? emptyForm01() : packetData.form01 || createDefaultFormsPacket(client).form01!}
                  onChange={updateForm01}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '02' && (
                <RenderForm02
                  data={isBlankTemplateMode ? emptyForm02() : packetData.form02 || createDefaultFormsPacket(client).form02!}
                  onChange={updateForm02}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '03' && (
                <RenderForm03
                  data={isBlankTemplateMode ? emptyForm03() : packetData.form03 || createDefaultFormsPacket(client).form03!}
                  onChange={updateForm03}
                  onOpenSignModal={onOpenSignModal}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '04' && (
                <RenderForm04
                  data={isBlankTemplateMode ? emptyForm04() : packetData.form04 || createDefaultFormsPacket(client).form04!}
                  onChange={updateForm04}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '05' && (
                <RenderForm05
                  data={isBlankTemplateMode ? emptyForm05() : packetData.form05 || createDefaultFormsPacket(client).form05!}
                  onChange={updateForm05}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '06' && (
                <RenderForm06
                  data={isBlankTemplateMode ? emptyForm06() : packetData.form06 || createDefaultFormsPacket(client).form06!}
                  onChange={updateForm06}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '07' && (
                <RenderForm07
                  data={isBlankTemplateMode ? emptyForm07() : packetData.form07 || createDefaultFormsPacket(client).form07!}
                  onChange={updateForm07}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '08' && (
                <RenderForm08
                  data={isBlankTemplateMode ? emptyForm08() : packetData.form08 || createDefaultFormsPacket(client).form08!}
                  onChange={updateForm08}
                  stats={sdohStats}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '09' && (
                <RenderForm09
                  data={isBlankTemplateMode ? emptyForm09() : packetData.form09 || createDefaultFormsPacket(client).form09!}
                  onChange={updateForm09}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '10' && (
                <RenderForm10
                  data={isBlankTemplateMode ? emptyForm10() : packetData.form10 || createDefaultFormsPacket(client).form10!}
                  onChange={updateForm10}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {activeFormId === '11' && (
                <RenderForm11
                  data={isBlankTemplateMode ? emptyForm11() : packetData.form11 || createDefaultFormsPacket(client).form11!}
                  onChange={updateForm11}
                  isBlank={isBlankTemplateMode}
                />
              )}

              {/* Document Footer */}
              <div className="mt-12 pt-6 border-t border-sage-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-pecan-500 gap-2">
                <span>SouthernWell | Client Forms Packet · {activeMeta.title}</span>
                <span>Supporting Healing. Strengthening Families.</span>
                <span>Page {parseInt(activeMeta.id, 10) + 2} of 13</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 01: Inquiry and Discovery Call Notes
   ========================================================================= */
const RenderForm01: React.FC<{
  data: Form01Data;
  onChange: (u: Partial<Form01Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const howHeardOptions = [
    'Rural health center / clinic',
    'Church',
    'Senior center',
    'Friend or family',
    'Current client referral',
    'Social worker / provider',
    'Social media',
  ];

  const supportOptions = [
    'Appointment support',
    'Medication reminders',
    'Chronic condition support',
    'Daily routine support',
    'Family updates',
    'Resource navigation',
    'Transportation',
  ];

  const outcomeOptions = [
    'Packet to be sent',
    'Needs time to decide',
    'Referred out',
    'Not a fit',
    'Urgent concern, redirected to provider or 911',
  ];

  const toggleArrayItem = (list: string[], item: string) => {
    return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
  };

  return (
    <div className="space-y-6 text-xs text-pecan-900">
      {/* Top Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.date}
            onChange={(e) => onChange({ date: e.target.value })}
            placeholder="e.g. Oct 12, 2026"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Time</label>
          <input
            type="text"
            value={isBlank ? '' : data.time}
            onChange={(e) => onChange({ time: e.target.value })}
            placeholder="e.g. 10:30 AM"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Taken By</label>
          <input
            type="text"
            value={isBlank ? '' : data.takenBy}
            onChange={(e) => onChange({ takenBy: e.target.value })}
            placeholder="Coordinator Name"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Caller Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.callerName}
            onChange={(e) => onChange({ callerName: e.target.value })}
            placeholder="Caller's full name"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Relationship to Client</label>
          <input
            type="text"
            value={isBlank ? '' : data.relationshipToClient}
            onChange={(e) => onChange({ relationshipToClient: e.target.value })}
            placeholder="e.g. Daughter, Self, Spouse"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Phone</label>
          <input
            type="text"
            value={isBlank ? '' : data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="601-555-0100"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name (if different)</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            placeholder="Client's full name"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Best Time to Call</label>
          <input
            type="text"
            value={isBlank ? '' : data.bestTimeToCall}
            onChange={(e) => onChange({ bestTimeToCall: e.target.value })}
            placeholder="e.g. Mornings 9am"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">County</label>
          <input
            type="text"
            value={isBlank ? '' : data.county}
            onChange={(e) => onChange({ county: e.target.value })}
            placeholder="Forrest, Lamar, Jones, Stone"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>
      </div>

      {/* How Did You Hear About Us */}
      <div className="border border-sage-200 rounded-2xl p-4">
        <h4 className="font-bold text-olive uppercase tracking-wide text-[11px] mb-3">
          How Did You Hear About Us
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {howHeardOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={!isBlank && data.howHeard.includes(opt)}
                onChange={() => onChange({ howHeard: toggleArrayItem(data.howHeard, opt) })}
                className="rounded text-olive focus:ring-olive"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        <div className="pt-2 border-t border-sage-100 flex items-center gap-3">
          <span className="text-[11px] font-semibold text-pecan-700">Referred by (name, for credit):</span>
          <input
            type="text"
            value={isBlank ? '' : data.referredBy || ''}
            onChange={(e) => onChange({ referredBy: e.target.value })}
            placeholder="Physician, Clinic, Church member name"
            className="flex-1 bg-sage-50/50 px-3 py-1 rounded-lg border border-sage-200 text-xs"
          />
        </div>
      </div>

      {/* What Support is Needed */}
      <div className="border border-sage-200 rounded-2xl p-4">
        <h4 className="font-bold text-olive uppercase tracking-wide text-[11px] mb-3">
          What Support is Needed
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {supportOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={!isBlank && data.supportNeeded.includes(opt)}
                onChange={() => onChange({ supportNeeded: toggleArrayItem(data.supportNeeded, opt) })}
                className="rounded text-olive focus:ring-olive"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-sage-100">
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">
              Client's Doctor / Clinic (if known)
            </label>
            <input
              type="text"
              value={isBlank ? '' : data.doctorClinic || ''}
              onChange={(e) => onChange({ doctorClinic: e.target.value })}
              placeholder="e.g. Dr. Thornton / Hattiesburg Clinic"
              className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">
              Who Makes Decisions for the Client
            </label>
            <input
              type="text"
              value={isBlank ? '' : data.decisionMaker || ''}
              onChange={(e) => onChange({ decisionMaker: e.target.value })}
              placeholder="Client, Family Proxy, POA"
              className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Call Notes (STAR) */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-[#FCFAF5]">
        <h4 className="font-bold text-olive uppercase tracking-wide text-[11px] mb-3 flex items-center justify-between">
          <span>Call Notes (STAR Methodology)</span>
          <span className="text-[10px] font-normal text-pecan-600">Situation • Task • Action • Result</span>
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-pecan-800 mb-1">
              Situation: what is going on
            </label>
            <textarea
              rows={2}
              value={isBlank ? '' : data.starNotes.situation}
              onChange={(e) =>
                onChange({ starNotes: { ...data.starNotes, situation: e.target.value } })
              }
              placeholder="Client condition, home setting, current challenges..."
              className="w-full bg-white p-2.5 rounded-xl border border-sage-200 text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-pecan-800 mb-1">
              Task: what the caller wants
            </label>
            <textarea
              rows={2}
              value={isBlank ? '' : data.starNotes.task}
              onChange={(e) =>
                onChange({ starNotes: { ...data.starNotes, task: e.target.value } })
              }
              placeholder="Specific goals: ride coordination, daily check-in, doctor prep..."
              className="w-full bg-white p-2.5 rounded-xl border border-sage-200 text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-pecan-800 mb-1">
              Action: what was explained or offered
            </label>
            <textarea
              rows={2}
              value={isBlank ? '' : data.starNotes.action}
              onChange={(e) =>
                onChange({ starNotes: { ...data.starNotes, action: e.target.value } })
              }
              placeholder="Explained SouthernWell scope, non-clinical care package details..."
              className="w-full bg-white p-2.5 rounded-xl border border-sage-200 text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-pecan-800 mb-1">
              Result: outcome
            </label>
            <textarea
              rows={2}
              value={isBlank ? '' : data.starNotes.result}
              onChange={(e) =>
                onChange({ starNotes: { ...data.starNotes, result: e.target.value } })
              }
              placeholder="Agreement reached, date agreed for intake follow up..."
              className="w-full bg-white p-2.5 rounded-xl border border-sage-200 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Outcome Section */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-sage-50/50">
        <h4 className="font-bold text-olive uppercase tracking-wide text-[11px] mb-3">
          Outcome
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          {outcomeOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="radio"
                name="form01-outcome"
                checked={!isBlank && data.outcome === opt}
                onChange={() => onChange({ outcome: opt })}
                className="text-olive focus:ring-olive"
              />
              <span className={opt.includes('911') ? 'text-red-700 font-bold' : ''}>{opt}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-sage-200">
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Package of Interest</label>
            <input
              type="text"
              value={isBlank ? '' : data.packageOfInterest || ''}
              onChange={(e) => onChange({ packageOfInterest: e.target.value })}
              placeholder="e.g. Signature Care Navigation ($225/mo)"
              className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Next Step and Date</label>
            <input
              type="text"
              value={isBlank ? '' : data.nextStepDate || ''}
              onChange={(e) => onChange({ nextStepDate: e.target.value })}
              placeholder="e.g. Complete Form 02 Scope Checklist on Oct 14"
              className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 02: Scope and Eligibility Checklist
   ========================================================================= */
const RenderForm02: React.FC<{
  data: Form02Data;
  onChange: (u: Partial<Form02Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const checklistItems = [
    { key: 'item1', label: 'Lives in Forrest, Lamar, Jones or Stone County' },
    { key: 'item2', label: 'Lives 75-100 miles away (Telephonic Services Program)' },
    { key: 'item3', label: 'Needs fit non-clinical services only' },
    { key: 'item4', label: 'No emergency or urgent clinical need at this time' },
    { key: 'item5', label: 'Client or authorized representative can give consent' },
    { key: 'item6', label: 'Client or family willing to sign required forms' },
    { key: 'item7', label: 'Behavioral health support needed (LCSW referral to be explained)' },
    { key: 'item8', label: 'Has a primary care provider or clinic' },
  ];

  const decisions: Form02Data['decision'][] = [
    'Accept for enrollment',
    'Accept, Telephonic Services Program',
    'Refer out',
    'Decline',
  ];

  return (
    <div className="space-y-6 text-xs text-pecan-900">
      {/* Client Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Completed By</label>
          <input
            type="text"
            value={isBlank ? '' : data.completedBy}
            onChange={(e) => onChange({ completedBy: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.date}
            onChange={(e) => onChange({ date: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
      </div>

      {/* Checklist Table */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-olive text-white text-[11px] uppercase tracking-wider font-bold">
              <th className="py-2.5 px-4 w-12 text-center">#</th>
              <th className="py-2.5 px-4">Eligibility Item</th>
              <th className="py-2.5 px-4 text-center w-24">Yes</th>
              <th className="py-2.5 px-4 text-center w-24">No / N/A</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {checklistItems.map((item, idx) => {
              const checkedYes = !isBlank && data.checklist?.[item.key] === true;
              const checkedNo = !isBlank && data.checklist?.[item.key] === false;
              return (
                <tr key={item.key} className="hover:bg-sage-50/50 transition-colors">
                  <td className="py-2.5 px-4 text-center font-mono text-pecan-500 font-bold">{idx + 1}</td>
                  <td className="py-2.5 px-4 text-xs font-medium text-pecan-900">{item.label}</td>
                  <td className="py-2.5 px-4 text-center">
                    <input
                      type="radio"
                      name={`form02-${item.key}`}
                      checked={checkedYes}
                      onChange={() =>
                        onChange({
                          checklist: { ...data.checklist, [item.key]: true },
                        })
                      }
                      className="text-olive focus:ring-olive cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <input
                      type="radio"
                      name={`form02-${item.key}`}
                      checked={checkedNo}
                      onChange={() =>
                        onChange({
                          checklist: { ...data.checklist, [item.key]: false },
                        })
                      }
                      className="text-olive focus:ring-olive cursor-pointer"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Decision Box */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-sage-50/50">
        <h4 className="font-bold text-olive uppercase tracking-wide text-[11px] mb-3">
          Decision
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {decisions.map((dec) => (
            <label key={dec} className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="radio"
                name="form02-decision"
                checked={!isBlank && data.decision === dec}
                onChange={() => onChange({ decision: dec })}
                className="text-olive focus:ring-olive"
              />
              <span>{dec}</span>
            </label>
          ))}
        </div>
        <div className="pt-2">
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">
            Reason / Referral Given
          </label>
          <input
            type="text"
            value={isBlank ? '' : data.reasonReferral || ''}
            onChange={(e) => onChange({ reasonReferral: e.target.value })}
            placeholder="Details on acceptance rationale, telephonic qualification, or outside agency referral"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>
      </div>

      {/* Reminders Callout */}
      <div className="bg-[#FAF7F0] border-l-4 border-olive p-4 rounded-r-2xl space-y-1.5 text-xs text-pecan-800">
        <h5 className="font-bold text-olive uppercase text-[10px] tracking-wider">
          SouthernWell Practice Reminders
        </h5>
        <ul className="list-disc pl-4 space-y-1 text-[11px]">
          <li>SouthernWell does not provide medical care, nursing, diagnosis, treatment, or counseling.</li>
          <li>Redirect urgent medical needs to the provider or 911 immediately.</li>
          <li>Behavioral health needs are referred to an LCSW; LCSW billing is separate.</li>
        </ul>
      </div>

      {/* Reviewed By Signoff */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Reviewed By</label>
          <input
            type="text"
            value={isBlank ? '' : data.reviewedBy}
            onChange={(e) => onChange({ reviewedBy: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.reviewDate}
            onChange={(e) => onChange({ reviewDate: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 03: Service Agreement
   ========================================================================= */
const RenderForm03: React.FC<{
  data: Form03Data;
  onChange: (u: Partial<Form03Data>) => void;
  onOpenSignModal: () => void;
  isBlank: boolean;
}> = ({ data, onChange, onOpenSignModal, isBlank }) => {
  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs italic">
        Draft for owner review. Have the Service Agreement and Release language reviewed by a Mississippi attorney before use.
      </div>

      {/* Top Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Package Selected</label>
          <select
            value={isBlank ? '' : data.packageSelected}
            onChange={(e) =>
              onChange({
                packageSelected: e.target.value as any,
                monthlyFee: e.target.value === 'Essentials' ? '$150/mo' : e.target.value === 'Signature' ? '$225/mo' : '$300/mo',
              })
            }
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          >
            <option value="Essentials">Essentials ($150/mo)</option>
            <option value="Signature">Signature ($225/mo)</option>
            <option value="Concierge">Concierge ($300/mo)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Add-ons Selected</label>
          <input
            type="text"
            value={isBlank ? '' : data.addOnsSelected}
            onChange={(e) => onChange({ addOnsSelected: e.target.value })}
            placeholder="e.g. Escorted Rides, Med Concierge"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Start Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Monthly Fee</label>
          <input
            type="text"
            value={isBlank ? '' : data.monthlyFee}
            onChange={(e) => onChange({ monthlyFee: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold text-olive"
          />
        </div>
      </div>

      {/* Agreement Terms Accordion / Box */}
      <div className="border border-sage-200 rounded-2xl p-5 bg-white space-y-3">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs border-b border-sage-200 pb-2">
          Agreement Clauses & Non-Clinical Practice Standards
        </h4>
        <div className="space-y-2.5 text-[11px] text-pecan-800">
          <p>
            <strong className="text-pecan-950 font-bold">• Services.</strong> SouthernWell of South Mississippi provides non-clinical care navigation, case management, care planning, wellness support, advocacy and resource coordination. It does not provide medical care, nursing, home health, therapy, counseling, diagnosis, treatment or clinical assessments.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• Provider direction.</strong> SouthernWell follows the recommendations of the client's own healthcare providers only and does not give independent medical advice.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• Not an emergency service.</strong> In an emergency, call 911. For a mental health crisis, call or text 988.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• Fees and payment.</strong> Fees are monthly per the selected package and are due before services begin. Accepted methods: credit or debit card, ACH bank draft, Cash App, PayPal, Zelle, or invoice.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• Term and changes.</strong> Services continue month to month. Either party may end services with 
            <input
              type="number"
              value={isBlank ? '' : data.noticeDays}
              onChange={(e) => onChange({ noticeDays: parseInt(e.target.value, 10) || 30 })}
              className="w-12 mx-1 px-1 py-0.5 border border-sage-200 rounded text-center inline font-bold"
            />
            days written notice. Package changes take effect at the next billing month.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• Client responsibilities.</strong> Provide accurate information, respond to check-ins, keep the self-measured logs agreed on, tell SouthernWell about changes in status, and follow the advice of their own providers.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• Unable to reach.</strong> If SouthernWell cannot reach the client at a scheduled contact, it will try the client again and contact the emergency contact listed on Form 09. A safety concern may be reported to family, the provider, or emergency services.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• LCSW services.</strong> LCSW services are separate, billed separately by the LCSW, and are not provided by SouthernWell.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• Privacy.</strong> Client information is kept confidential and shared only as allowed by the signed HIPAA Authorization, Release of Information, and Family Communication Authorization, or as required by law.
          </p>
          <p>
            <strong className="text-pecan-950 font-bold">• No guarantee.</strong> SouthernWell supports the client's own goals and does not guarantee health outcomes.
          </p>
        </div>
      </div>

      {/* Signatures Section */}
      <div className="border border-sage-200 rounded-2xl p-5 bg-[#FCFAF5] space-y-4">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">
          Signatures & Client Acknowledgment
        </h4>
        <p className="text-[11px] text-pecan-700 italic">
          By signing, the client or authorized representative confirms they have read and agree to this Service Agreement.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Client signature */}
          <div className="border-b border-pecan-800 pb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-pecan-600">Client / Representative Signature</span>
              {!isBlank && data.isSigned && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  ✓ Verified Signed
                </span>
              )}
            </div>
            <input
              type="text"
              value={isBlank ? '' : data.clientSignatureName}
              onChange={(e) => onChange({ clientSignatureName: e.target.value })}
              placeholder="Print or Sign Full Name"
              className="w-full font-serif text-sm font-bold text-pecan-950 bg-transparent border-0 focus:ring-0 p-0"
            />
            <div className="text-[10px] text-pecan-500 mt-1">
              Date: {isBlank ? '___________________' : data.clientSignatureDate}
            </div>
          </div>

          {/* SouthernWell signature */}
          <div className="border-b border-pecan-800 pb-2">
            <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">SouthernWell Representative</span>
            <input
              type="text"
              value={isBlank ? '' : data.coordinatorSignatureName}
              onChange={(e) => onChange({ coordinatorSignatureName: e.target.value })}
              className="w-full font-serif text-sm font-bold text-olive bg-transparent border-0 focus:ring-0 p-0"
            />
            <div className="text-[10px] text-pecan-500 mt-1">
              Date: {isBlank ? '___________________' : data.coordinatorSignatureDate}
            </div>
          </div>
        </div>

        {/* Representative relationship row if applicable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-[10px] uppercase font-bold text-pecan-600 mb-1">
              Relationship to client (if representative)
            </label>
            <input
              type="text"
              value={isBlank ? '' : data.representativeRelation || ''}
              onChange={(e) => onChange({ representativeRelation: e.target.value })}
              placeholder="e.g. Healthcare Proxy / Daughter"
              className="w-full bg-white px-3 py-1 rounded-lg border border-sage-200 text-xs"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={onOpenSignModal}
              className="no-print py-1.5 px-3 rounded-xl bg-olive-50 hover:bg-olive-100 text-olive font-bold text-xs border border-olive/30 transition-colors cursor-pointer"
            >
              ✍️ Launch Digital Signature Canvas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 04: Release of Information (ROI)
   ========================================================================= */
const RenderForm04: React.FC<{
  data: Form04Data;
  onChange: (u: Partial<Form04Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const addProviderRow = () => {
    const next = [
      ...data.providers,
      { name: '', role: 'Specialist', phoneFax: '', canShare: true },
    ];
    onChange({ providers: next });
  };

  const removeProviderRow = (idx: number) => {
    const next = data.providers.filter((_, i) => i !== idx);
    onChange({ providers: next });
  };

  const updateProviderRow = (idx: number, patch: Partial<Form04Data['providers'][0]>) => {
    const next = data.providers.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    onChange({ providers: next });
  };

  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      {/* Client header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
      </div>

      {/* Provider Roster Table */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs flex items-center justify-between">
          <span>I AUTHORIZE SOUTHERNWELL TO COMMUNICATE WITH</span>
          <button
            type="button"
            onClick={addProviderRow}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Provider</span>
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-3">Name / Practice</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3">Phone / Fax</th>
              <th className="py-2 px-3 text-center">Can Receive & Share?</th>
              <th className="py-2 px-3 no-print w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {(isBlank ? [1, 2, 3] : data.providers).map((prov: any, idx: number) => {
              if (isBlank) {
                return (
                  <tr key={idx} className="h-10">
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 text-center">■ Yes ■ No</td>
                    <td></td>
                  </tr>
                );
              }
              return (
                <tr key={idx} className="hover:bg-sage-50/40">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={prov.name}
                      onChange={(e) => updateProviderRow(idx, { name: e.target.value })}
                      placeholder="Provider / Clinic / Pharmacy Name"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs font-semibold"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={prov.role}
                      onChange={(e) => updateProviderRow(idx, { role: e.target.value })}
                      placeholder="e.g. PCP, Pharmacy, Clinic"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={prov.phoneFax}
                      onChange={(e) => updateProviderRow(idx, { phoneFax: e.target.value })}
                      placeholder="601-555-0100"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => updateProviderRow(idx, { canShare: !prov.canShare })}
                      className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                        prov.canShare
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {prov.canShare ? '✓ Yes, Authorized' : '✗ Restricted'}
                    </button>
                  </td>
                  <td className="py-2 px-3 text-right no-print">
                    <button
                      type="button"
                      onClick={() => removeProviderRow(idx)}
                      className="text-pecan-400 hover:text-rose-600 transition-colors"
                      title="Remove provider"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Purpose & Covered Info */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-white space-y-2">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">
          Purpose and Information Covered
        </h4>
        <ul className="list-disc pl-4 space-y-1 text-[11px] text-pecan-800">
          <li><strong>Purpose:</strong> care coordination, appointment support, medication list and refill coordination, and sharing monthly updates and recommendations.</li>
          <li><strong>May include:</strong> appointment dates, medication lists, provider recommendations, and the client's self-measured logs such as blood pressure or weight.</li>
          <li>Information is shared in both directions, limited to what is needed for the purpose above.</li>
        </ul>
        <div className="mt-3 p-3 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center justify-between gap-3">
          <span className="text-[11px] text-amber-950 font-medium">
            Mental health therapy or substance use treatment information is included <strong>only if the client initials here:</strong>
          </span>
          <input
            type="text"
            value={isBlank ? '' : data.mentalHealthInitials}
            onChange={(e) => onChange({ mentalHealthInitials: e.target.value.toUpperCase() })}
            placeholder="Initials"
            maxLength={4}
            className="w-16 bg-white px-2 py-1 rounded-lg border border-amber-300 font-bold text-center text-xs uppercase"
          />
        </div>
      </div>

      {/* Terms Box */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-sage-50/50 space-y-2 text-[11px] text-pecan-800">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">Terms</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>This permission expires one year from the date signed, or on this date: 
            <input
              type="text"
              value={isBlank ? '' : data.expirationDate}
              onChange={(e) => onChange({ expirationDate: e.target.value })}
              className="w-36 mx-1 px-2 py-0.5 border border-sage-200 rounded text-center inline font-semibold bg-white"
            />
            unless the client revokes it sooner.
          </li>
          <li>The client may revoke this permission at any time by telling SouthernWell in writing. Revoking does not undo information already shared.</li>
          <li>Services do not depend on signing this form, but SouthernWell cannot coordinate with providers without it.</li>
          <li>Information shared under this form may be re-disclosed by the receiver and may no longer be protected by privacy law.</li>
        </ul>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-sage-200">
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">Client / Authorized Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.clientSignatureName}
            onChange={(e) => onChange({ clientSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-pecan-950 bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.clientSignatureDate}</div>
        </div>
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">Witness / SouthernWell Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.witnessSignatureName}
            onChange={(e) => onChange({ witnessSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-olive bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.witnessSignatureDate}</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 05: Family Communication Authorization
   ========================================================================= */
const RenderForm05: React.FC<{
  data: Form05Data;
  onChange: (u: Partial<Form05Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const sharedItems = [
    'Appointment dates and outcomes',
    'Check-in summaries',
    'Medication reminder status',
    'Wellness logs (BP, weight)',
    'Safety concerns',
    'Billing and payment',
    'Care plan progress',
    'Resources and referrals',
  ];

  const deliveryOptions = ['Phone call', 'Text message', 'Mail'];
  const frequencyOptions = ['Weekly', 'Every two weeks', 'Monthly', 'Only when there is a concern'];

  const toggleArrayItem = (list: string[], item: string) => {
    return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
  };

  const addContactRow = () => {
    const next = [
      ...data.contacts,
      { name: '', relationship: 'Family', phone: '', okLeaveMessage: true, role: 'Family Contact' },
    ];
    onChange({ contacts: next });
  };

  const removeContactRow = (idx: number) => {
    const next = data.contacts.filter((_, i) => i !== idx);
    onChange({ contacts: next });
  };

  const updateContactRow = (idx: number, patch: Partial<Form05Data['contacts'][0]>) => {
    const next = data.contacts.map((c, i) => (i === idx ? { ...c, ...patch } : c));
    onChange({ contacts: next });
  };

  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      {/* Client header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
      </div>

      {/* People SouthernWell May Contact Table */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs flex items-center justify-between">
          <span>PEOPLE SOUTHERNWELL MAY CONTACT</span>
          <button
            type="button"
            onClick={addContactRow}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Family Member</span>
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Relationship</th>
              <th className="py-2 px-3">Phone</th>
              <th className="py-2 px-3 text-center">OK to leave message?</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3 no-print w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {(isBlank ? [1, 2] : data.contacts).map((c: any, idx: number) => {
              if (isBlank) {
                return (
                  <tr key={idx} className="h-10">
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 text-center">■ Yes ■ No</td>
                    <td className="py-2 px-3"></td>
                    <td></td>
                  </tr>
                );
              }
              return (
                <tr key={idx} className="hover:bg-sage-50/40">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => updateContactRow(idx, { name: e.target.value })}
                      placeholder="Contact Name"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs font-semibold"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={c.relationship}
                      onChange={(e) => updateContactRow(idx, { relationship: e.target.value })}
                      placeholder="Daughter, Son, Spouse"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={c.phone}
                      onChange={(e) => updateContactRow(idx, { phone: e.target.value })}
                      placeholder="601-555-0199"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={c.okLeaveMessage}
                      onChange={(e) => updateContactRow(idx, { okLeaveMessage: e.target.checked })}
                      className="rounded text-olive focus:ring-olive cursor-pointer"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={c.role}
                      onChange={(e) => updateContactRow(idx, { role: e.target.value })}
                      placeholder="e.g. Primary Caregiver"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3 text-right no-print">
                    <button
                      type="button"
                      onClick={() => removeContactRow(idx)}
                      className="text-pecan-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* What May Be Shared */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-white">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs mb-3">
          What May Be Shared
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sharedItems.map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={!isBlank && data.whatMayBeShared.includes(item)}
                onChange={() => onChange({ whatMayBeShared: toggleArrayItem(data.whatMayBeShared, item) })}
                className="rounded text-olive focus:ring-olive"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* How and How Often */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-sage-50/50 space-y-3">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">
          How and How Often
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase text-pecan-600 block mb-1">Communication Method</span>
            <div className="flex flex-wrap gap-3">
              {deliveryOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={!isBlank && data.howDelivery.includes(opt)}
                    onChange={() => onChange({ howDelivery: toggleArrayItem(data.howDelivery, opt) })}
                    className="rounded text-olive focus:ring-olive"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-pecan-600 block mb-1">Frequency</span>
            <div className="flex flex-wrap gap-3">
              {frequencyOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="radio"
                    name="form05-freq"
                    checked={!isBlank && data.howOften === opt}
                    onChange={() => onChange({ howOften: opt })}
                    className="text-olive focus:ring-olive"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-sage-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">
              Do NOT share with (names)
            </label>
            <input
              type="text"
              value={isBlank ? '' : data.doNotShareWith || ''}
              onChange={(e) => onChange({ doNotShareWith: e.target.value })}
              placeholder="e.g. Estranged family members"
              className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">
              Special Instructions
            </label>
            <input
              type="text"
              value={isBlank ? '' : data.specialInstructions || ''}
              onChange={(e) => onChange({ specialInstructions: e.target.value })}
              placeholder="e.g. Call after 5pm only"
              className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-sage-200">
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">Client / Authorized Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.clientSignatureName}
            onChange={(e) => onChange({ clientSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-pecan-950 bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.clientSignatureDate}</div>
        </div>
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">SouthernWell Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.coordinatorSignatureName}
            onChange={(e) => onChange({ coordinatorSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-olive bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.coordinatorSignatureDate}</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 06: LCSW Referral Acknowledgment
   ========================================================================= */
const RenderForm06: React.FC<{
  data: Form06Data;
  onChange: (u: Partial<Form06Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const referralReasons = [
    'Stress or worry',
    'Mood or sadness',
    'Grief or loss',
    'Family or caregiver stress',
    'Coping with chronic illness',
  ];

  const acknowledgments = [
    { key: 'clinical', text: 'LCSW services are clinical. SouthernWell services are non-clinical.' },
    { key: 'independent', text: 'The LCSW is a separate, independent provider. LCSW billing and prices are separate from SouthernWell.' },
    { key: 'scheduling', text: 'The client is responsible for scheduling, payment and insurance verification with the LCSW.' },
    { key: 'noClinicalRole', text: 'SouthernWell has no clinical role in counseling and is not responsible for LCSW services.' },
    { key: 'suggestion', text: 'The referral is a suggestion. The client may choose any provider or decline.' },
  ];

  const toggleReason = (item: string) => {
    const list = data.reasons || [];
    const next = list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
    onChange({ reasons: next });
  };

  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      <div className="bg-sage-50 border border-sage-200 p-3 rounded-xl text-pecan-800 text-xs italic">
        Complete only when an LCSW referral is made. Step 5.
      </div>

      {/* Referral Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Referral Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.referralDate}
            onChange={(e) => onChange({ referralDate: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Referred to (LCSW name / practice)</label>
          <input
            type="text"
            value={isBlank ? '' : data.referredTo}
            onChange={(e) => onChange({ referredTo: e.target.value })}
            placeholder="e.g. Pine Belt Counseling / Jane Doe, LCSW"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">LCSW Phone</label>
          <input
            type="text"
            value={isBlank ? '' : data.lcswPhone}
            onChange={(e) => onChange({ lcswPhone: e.target.value })}
            placeholder="601-555-0177"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
      </div>

      {/* Reason for referral */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-white">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs mb-3">
          Reason for Referral (General, Client-Stated)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {referralReasons.map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={!isBlank && data.reasons?.includes(r)}
                onChange={() => toggleReason(r)}
                className="rounded text-olive focus:ring-olive"
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Client Understands That (5 Initials) */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs">
          THE CLIENT UNDERSTANDS THAT
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-4 w-20 text-center">Initials</th>
              <th className="py-2 px-4">Acknowledgment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {acknowledgments.map((item) => (
              <tr key={item.key} className="hover:bg-sage-50/40">
                <td className="py-2.5 px-4 text-center">
                  <input
                    type="text"
                    value={isBlank ? '' : (data.initials as any)?.[item.key] || ''}
                    onChange={(e) =>
                      onChange({
                        initials: { ...data.initials, [item.key]: e.target.value.toUpperCase() },
                      })
                    }
                    placeholder="____"
                    maxLength={4}
                    className="w-14 bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-center font-bold text-xs uppercase"
                  />
                </td>
                <td className="py-2.5 px-4 text-xs text-pecan-900 font-medium">
                  {item.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Information Sharing */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-[#FCFAF5] space-y-2">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">Information Sharing</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs">
            <input
              type="radio"
              name="form06-sharing"
              checked={!isBlank && data.infoSharing === 'name_phone_only'}
              onChange={() => onChange({ infoSharing: 'name_phone_only' })}
              className="text-olive focus:ring-olive"
            />
            <span>Client allows SouthernWell to give the LCSW the client's name and phone number only</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer text-xs">
            <input
              type="radio"
              name="form06-sharing"
              checked={!isBlank && data.infoSharing === 'contact_on_own'}
              onChange={() => onChange({ infoSharing: 'contact_on_own' })}
              className="text-olive focus:ring-olive"
            />
            <span>Client prefers to contact the LCSW on their own</span>
          </label>
        </div>
        <p className="text-[11px] text-amber-800 font-medium pt-2 border-t border-sage-200">
          In a crisis, call or text 988 or call 911. SouthernWell is not a crisis service.
        </p>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-sage-200">
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">Client / Authorized Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.clientSignatureName}
            onChange={(e) => onChange({ clientSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-pecan-950 bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.clientSignatureDate}</div>
        </div>
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">SouthernWell Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.coordinatorSignatureName}
            onChange={(e) => onChange({ coordinatorSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-olive bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.coordinatorSignatureDate}</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 07: Sliding Scale Request
   ========================================================================= */
const RenderForm07: React.FC<{
  data: Form07Data;
  onChange: (u: Partial<Form07Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const circumstancesList = [
    'Limited household income',
    'Financial hardship',
    'Caregiver burden',
    'Special circumstances',
    'Fixed income',
    'Recent loss of income or job',
    'High medical costs',
  ];

  const packages = [
    { name: 'Essentials', standard: '$150/mo', range: '$100 - $125' },
    { name: 'Signature', standard: '$225/mo', range: '$150 - $200' },
    { name: 'Concierge', standard: '$300/mo', range: '$225 - $275' },
  ];

  const toggleCircumstance = (item: string) => {
    const list = data.circumstances || [];
    const next = list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
    onChange({ circumstances: next });
  };

  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      <div className="bg-sage-50 border border-sage-200 p-3 rounded-xl text-pecan-800 text-xs italic">
        Optional. Reviewed case by case with limited availability. Step 6.
      </div>

      {/* Household Profile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Person Completing Form</label>
          <input
            type="text"
            value={isBlank ? '' : data.personCompleting}
            onChange={(e) => onChange({ personCompleting: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Phone</label>
          <input
            type="text"
            value={isBlank ? '' : data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Number in Household</label>
          <input
            type="number"
            value={isBlank ? '' : data.numberInHousehold}
            onChange={(e) => onChange({ numberInHousehold: parseInt(e.target.value, 10) || 1 })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-center font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Number of Caregivers</label>
          <input
            type="number"
            value={isBlank ? '' : data.numberCaregivers}
            onChange={(e) => onChange({ numberCaregivers: parseInt(e.target.value, 10) || 1 })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 text-center font-bold"
          />
        </div>
      </div>

      {/* Package Requested Table */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs">PACKAGE REQUESTED</div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2.5 px-4">Package</th>
              <th className="py-2.5 px-4">Standard Rate</th>
              <th className="py-2.5 px-4">Sliding Scale Range</th>
              <th className="py-2.5 px-4 text-center w-20">Select</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {packages.map((pkg) => (
              <tr key={pkg.name} className="hover:bg-sage-50/40">
                <td className="py-2.5 px-4 font-bold text-pecan-950">{pkg.name}</td>
                <td className="py-2.5 px-4 text-pecan-600">{pkg.standard}</td>
                <td className="py-2.5 px-4 font-semibold text-olive">{pkg.range}</td>
                <td className="py-2.5 px-4 text-center">
                  <input
                    type="radio"
                    name="form07-pkg"
                    checked={!isBlank && data.packageRequested === pkg.name}
                    onChange={() => onChange({ packageRequested: pkg.name as any })}
                    className="text-olive focus:ring-olive cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Circumstances */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-white space-y-3">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">
          Circumstances (Check all that apply)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {circumstancesList.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={!isBlank && data.circumstances?.includes(c)}
                onChange={() => toggleCircumstance(c)}
                className="rounded text-olive focus:ring-olive"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
        <div className="pt-2">
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">
            Approximate Monthly Household Income Range
          </label>
          <input
            type="text"
            value={isBlank ? '' : data.monthlyIncomeRange}
            onChange={(e) => onChange({ monthlyIncomeRange: e.target.value })}
            placeholder="e.g. $1,200 - $1,800/mo (Social Security)"
            className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">
            Tell Us More About Your Situation
          </label>
          <textarea
            rows={3}
            value={isBlank ? '' : data.narrativeSituation}
            onChange={(e) => onChange({ narrativeSituation: e.target.value })}
            placeholder="Describe living arrangements, medical copays, or caregiver factors..."
            className="w-full bg-white p-3 rounded-xl border border-sage-200 text-xs"
          />
        </div>
      </div>

      {/* Client Statement */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-[#FAF7F0] space-y-3">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">Client Statement</h4>
        <p className="text-[11px] text-pecan-800">
          I confirm the information above is true to the best of my knowledge. I understand sliding scale rates are reviewed individually, are not guaranteed, and may be reviewed again.
        </p>
        <div className="border-b border-pecan-800 pb-2 pt-2 max-w-md">
          <input
            type="text"
            value={isBlank ? '' : data.clientSignatureName}
            onChange={(e) => onChange({ clientSignatureName: e.target.value })}
            placeholder="Client / Authorized Representative Signature"
            className="w-full font-serif text-sm font-bold text-pecan-950 bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.clientSignatureDate}</div>
        </div>
      </div>

      {/* For SouthernWell Use Box */}
      <div className="border-2 border-olive rounded-2xl p-4 bg-olive-50/30 space-y-3">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">
          For SouthernWell Administration Use
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Approved Rate</label>
            <input
              type="text"
              value={isBlank ? '' : data.forSouthernWellUse?.approvedRate || ''}
              onChange={(e) =>
                onChange({
                  forSouthernWellUse: { ...data.forSouthernWellUse, approvedRate: e.target.value },
                })
              }
              placeholder="$185/mo"
              className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold text-olive"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Review Date</label>
            <input
              type="text"
              value={isBlank ? '' : data.forSouthernWellUse?.reviewDate || ''}
              onChange={(e) =>
                onChange({
                  forSouthernWellUse: { ...data.forSouthernWellUse, reviewDate: e.target.value },
                })
              }
              className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Decision</label>
            <select
              value={isBlank ? 'approved' : data.forSouthernWellUse?.decision || 'approved'}
              onChange={(e) =>
                onChange({
                  forSouthernWellUse: { ...data.forSouthernWellUse, decision: e.target.value as any },
                })
              }
              className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
            >
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
              <option value="waitlist">Waitlist</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Reviewed By</label>
            <input
              type="text"
              value={isBlank ? '' : data.forSouthernWellUse?.reviewedBy || ''}
              onChange={(e) =>
                onChange({
                  forSouthernWellUse: { ...data.forSouthernWellUse, reviewedBy: e.target.value },
                })
              }
              placeholder="Jasmeen Williams, LPN"
              className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 08: SDOH Screening Form
   ========================================================================= */
const RenderForm08: React.FC<{
  data: Form08Data;
  onChange: (u: Partial<Form08Data>) => void;
  stats: { needsHelp: 0; someNeed: 0; noNeed: 13 } | any;
  isBlank: boolean;
}> = ({ data, onChange, stats, isBlank }) => {
  const updateArea = (domainKey: string, rating: SDOHAreaRating['rating'], notes?: string) => {
    const prev = data.areas?.[domainKey] || { rating: 'No need', notes: '' };
    const nextArea: SDOHAreaRating = {
      rating,
      notes: notes !== undefined ? notes : prev.notes,
    };
    const next = { ...data.areas, [domainKey]: nextArea };
    onChange({ areas: next });
  };

  const addReferralRow = () => {
    const next = [
      ...data.resourceReferrals,
      {
        id: `sdoh-${Date.now()}`,
        need: 'Transportation / Meals',
        resource: 'Community Partner Agency',
        date: new Date().toLocaleDateString(),
        followUp: 'Pending outreach',
      },
    ];
    onChange({ resourceReferrals: next });
  };

  const removeReferralRow = (id: string) => {
    onChange({ resourceReferrals: data.resourceReferrals.filter((r) => r.id !== id) });
  };

  const updateReferralRow = (id: string, patch: Partial<Form08Data['resourceReferrals'][0]>) => {
    const next = data.resourceReferrals.map((r) => (r.id === id ? { ...r, ...patch } : r));
    onChange({ resourceReferrals: next });
  };

  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      {/* Header Info */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.date}
            onChange={(e) => onChange({ date: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Completed By</label>
          <input
            type="text"
            value={isBlank ? '' : data.completedBy}
            onChange={(e) => onChange({ completedBy: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
      </div>

      {/* Summary Score Card */}
      {!isBlank && (
        <div className="no-print bg-[#FAF7F0] border border-sage-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-olive block">SDOH Score Summary</span>
            <div className="text-sm font-bold text-pecan-950 mt-0.5">
              13 Non-Clinical Determinant Domains Evaluated
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200">
              {stats.needsHelp} Needs Help
            </span>
            <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200">
              {stats.someNeed} Some Need
            </span>
            <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
              {stats.noNeed} No Need (Stable)
            </span>
          </div>
        </div>
      )}

      {/* 13 Domain Rating Table */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-olive text-white text-[11px] uppercase tracking-wider font-bold">
              <th className="py-2.5 px-3">Area</th>
              <th className="py-2.5 px-2 text-center w-20">No Need</th>
              <th className="py-2.5 px-2 text-center w-20">Some Need</th>
              <th className="py-2.5 px-2 text-center w-24">Needs Help</th>
              <th className="py-2.5 px-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {Object.entries(SDOH_DOMAIN_LABELS).map(([domainKey, label]) => {
              const item = data.areas?.[domainKey] || { rating: 'No need', notes: '' };
              return (
                <tr key={domainKey} className="hover:bg-sage-50/40">
                  <td className="py-2.5 px-3 text-xs font-semibold text-pecan-900 max-w-xs">
                    {label}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <input
                      type="radio"
                      name={`form08-${domainKey}`}
                      checked={!isBlank && item.rating === 'No need'}
                      onChange={() => updateArea(domainKey, 'No need')}
                      className="text-olive focus:ring-olive cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <input
                      type="radio"
                      name={`form08-${domainKey}`}
                      checked={!isBlank && item.rating === 'Some need'}
                      onChange={() => updateArea(domainKey, 'Some need')}
                      className="text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <input
                      type="radio"
                      name={`form08-${domainKey}`}
                      checked={!isBlank && item.rating === 'Needs help'}
                      onChange={() => updateArea(domainKey, 'Needs help')}
                      className="text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={isBlank ? '' : item.notes}
                      onChange={(e) => updateArea(domainKey, item.rating, e.target.value)}
                      placeholder="Notes on client situation..."
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Resource Referrals and Follow-up Table */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs flex items-center justify-between">
          <span>RESOURCE REFERRALS AND FOLLOW-UP</span>
          <button
            type="button"
            onClick={addReferralRow}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Referral</span>
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-3">Need Identified</th>
              <th className="py-2 px-3">Resource / Referral</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Follow-up</th>
              <th className="py-2 px-3 no-print w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {(isBlank ? [1, 2] : data.resourceReferrals).map((ref: any, idx: number) => {
              if (isBlank) {
                return (
                  <tr key={idx} className="h-10">
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3"></td>
                    <td></td>
                  </tr>
                );
              }
              return (
                <tr key={ref.id} className="hover:bg-sage-50/40">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={ref.need}
                      onChange={(e) => updateReferralRow(ref.id, { need: e.target.value })}
                      placeholder="e.g. Clinic Transportation"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs font-semibold"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={ref.resource}
                      onChange={(e) => updateReferralRow(ref.id, { resource: e.target.value })}
                      placeholder="Agency name"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={ref.date}
                      onChange={(e) => updateReferralRow(ref.id, { date: e.target.value })}
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={ref.followUp}
                      onChange={(e) => updateReferralRow(ref.id, { followUp: e.target.value })}
                      placeholder="e.g. Approved, ride confirmed"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3 text-right no-print">
                    <button
                      type="button"
                      onClick={() => removeReferralRow(ref.id)}
                      className="text-pecan-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-pecan-700 italic">
        This screening identifies needs for resource navigation only. It is not a clinical assessment. Report safety concerns using Form 11.
      </p>

      {/* Reviewer Signatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Reviewed By</label>
          <input
            type="text"
            value={isBlank ? '' : data.reviewedBy}
            onChange={(e) => onChange({ reviewedBy: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.reviewDate}
            onChange={(e) => onChange({ reviewDate: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 09: Client Handbook Acknowledgment and Emergency Contacts
   ========================================================================= */
const RenderForm09: React.FC<{
  data: Form09Data;
  onChange: (u: Partial<Form09Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const ackList = [
    { key: 'receivedHandbook', text: 'I received and reviewed the SouthernWell Client Handbook (mission, how it works, client responsibilities).' },
    { key: 'nonClinical', text: 'SouthernWell services are non-clinical and are not a substitute for my doctor, nurse, or emergency services.' },
    { key: 'notEmergency', text: 'I understand SouthernWell is not an emergency service. In an emergency I will call 911.' },
    { key: 'unableToReach', text: 'If SouthernWell cannot reach me at a scheduled contact, it will try again and then contact my emergency contact.' },
    { key: 'planCompliance', text: 'If I am not following my plan or not responding, SouthernWell will talk with me about it and may update or end services as described in the handbook.' },
    { key: 'preferredTimes', text: 'My preferred check-in days and times are set below.' },
  ];

  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      <div className="bg-sage-50 border border-sage-200 p-3 rounded-xl text-pecan-800 text-xs italic">
        Review on the welcome call. Step 8.
      </div>

      {/* Client header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
      </div>

      {/* 6 Initials Acknowledgments */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs">ACKNOWLEDGMENTS</div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-4 w-20 text-center">Initials</th>
              <th className="py-2 px-4">Acknowledgment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {ackList.map((item) => (
              <tr key={item.key} className="hover:bg-sage-50/40">
                <td className="py-2.5 px-4 text-center">
                  <input
                    type="text"
                    value={isBlank ? '' : (data.initials as any)?.[item.key] || ''}
                    onChange={(e) =>
                      onChange({
                        initials: { ...data.initials, [item.key]: e.target.value.toUpperCase() },
                      })
                    }
                    placeholder="____"
                    maxLength={4}
                    className="w-14 bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-center font-bold text-xs uppercase"
                  />
                </td>
                <td className="py-2.5 px-4 text-xs text-pecan-900 font-medium">
                  {item.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preferred Check-in Schedule */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FCFAF5] p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Preferred Days</label>
          <input
            type="text"
            value={isBlank ? '' : data.preferredDays}
            onChange={(e) => onChange({ preferredDays: e.target.value })}
            placeholder="e.g. Tuesday & Thursday"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Preferred Times</label>
          <input
            type="text"
            value={isBlank ? '' : data.preferredTimes}
            onChange={(e) => onChange({ preferredTimes: e.target.value })}
            placeholder="e.g. 10:00 AM – 11:30 AM"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Preferred Method</label>
          <select
            value={isBlank ? 'call' : data.preferredMethod}
            onChange={(e) => onChange({ preferredMethod: e.target.value as any })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          >
            <option value="call">Phone Call</option>
            <option value="text">Text Message</option>
            <option value="both">Both (Call & Text)</option>
          </select>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs">EMERGENCY CONTACTS</div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Relationship</th>
              <th className="py-2 px-3">Phone</th>
              <th className="py-2 px-3">Alt Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {(isBlank ? [1, 2] : data.emergencyContacts).map((ec: any, idx: number) => (
              <tr key={idx} className="hover:bg-sage-50/40">
                <td className="py-2 px-3 font-semibold text-pecan-950">
                  <input
                    type="text"
                    value={isBlank ? '' : ec.name}
                    onChange={(e) => {
                      const next = [...data.emergencyContacts];
                      next[idx] = { ...next[idx], name: e.target.value };
                      onChange({ emergencyContacts: next });
                    }}
                    placeholder="Name"
                    className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                  />
                </td>
                <td className="py-2 px-3">
                  <input
                    type="text"
                    value={isBlank ? '' : ec.relationship}
                    onChange={(e) => {
                      const next = [...data.emergencyContacts];
                      next[idx] = { ...next[idx], relationship: e.target.value };
                      onChange({ emergencyContacts: next });
                    }}
                    placeholder="Relationship"
                    className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                  />
                </td>
                <td className="py-2 px-3">
                  <input
                    type="text"
                    value={isBlank ? '' : ec.phone}
                    onChange={(e) => {
                      const next = [...data.emergencyContacts];
                      next[idx] = { ...next[idx], phone: e.target.value };
                      onChange({ emergencyContacts: next });
                    }}
                    placeholder="Phone"
                    className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                  />
                </td>
                <td className="py-2 px-3">
                  <input
                    type="text"
                    value={isBlank ? '' : ec.altPhone}
                    onChange={(e) => {
                      const next = [...data.emergencyContacts];
                      next[idx] = { ...next[idx], altPhone: e.target.value };
                      onChange({ emergencyContacts: next });
                    }}
                    placeholder="Alt Phone"
                    className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Health Care Contacts */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-white space-y-3">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">HEALTH CARE CONTACTS</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Primary Care Provider / Clinic</label>
            <input
              type="text"
              value={isBlank ? '' : data.pcpClinic}
              onChange={(e) => onChange({ pcpClinic: e.target.value })}
              className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Phone</label>
            <input
              type="text"
              value={isBlank ? '' : data.pcpPhone}
              onChange={(e) => onChange({ pcpPhone: e.target.value })}
              className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Pharmacy</label>
            <input
              type="text"
              value={isBlank ? '' : data.pharmacy}
              onChange={(e) => onChange({ pharmacy: e.target.value })}
              className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Phone</label>
            <input
              type="text"
              value={isBlank ? '' : data.pharmacyPhone}
              onChange={(e) => onChange({ pharmacyPhone: e.target.value })}
              className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Preferred Hospital</label>
            <input
              type="text"
              value={isBlank ? '' : data.preferredHospital}
              onChange={(e) => onChange({ preferredHospital: e.target.value })}
              className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs font-semibold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Phone</label>
            <input
              type="text"
              value={isBlank ? '' : data.hospitalPhone}
              onChange={(e) => onChange({ hospitalPhone: e.target.value })}
              className="w-full bg-sage-50/50 px-3 py-1.5 rounded-lg border border-sage-200 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-sage-200">
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">Client / Authorized Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.clientSignatureName}
            onChange={(e) => onChange({ clientSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-pecan-950 bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.clientSignatureDate}</div>
        </div>
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">SouthernWell Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.coordinatorSignatureName}
            onChange={(e) => onChange({ coordinatorSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-olive bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.coordinatorSignatureDate}</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 10: Family Communication Plan
   ========================================================================= */
const RenderForm10: React.FC<{
  data: Form10Data;
  onChange: (u: Partial<Form10Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const triggerList = [
    'Missed or unreturned check-in',
    'Hospital or ER visit',
    'Fall or injury reported',
    'Medication change or problem reported',
    'Change in condition reported by client',
    'Safety concern at home',
    'Client or family needs to change services',
  ];

  const toggleTrigger = (item: string) => {
    const list = data.contactTriggers || [];
    const next = list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
    onChange({ contactTriggers: next });
  };

  const addRecipientRow = () => {
    const next = [
      ...data.recipients,
      { name: '', relationship: 'Family', topics: 'All updates', howOften: 'Weekly', method: 'Phone' },
    ];
    onChange({ recipients: next });
  };

  const removeRecipientRow = (idx: number) => {
    onChange({ recipients: data.recipients.filter((_, i) => i !== idx) });
  };

  const updateRecipientRow = (idx: number, patch: Partial<Form10Data['recipients'][0]>) => {
    const next = data.recipients.map((r, i) => (i === idx ? { ...r, ...patch } : r));
    onChange({ recipients: next });
  };

  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      <div className="bg-sage-50 border border-sage-200 p-3 rounded-xl text-pecan-800 text-xs italic">
        Built from Form 05 at the care plan stage. Step 9.
      </div>

      {/* Plan Header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Birth</label>
          <input
            type="text"
            value={isBlank ? '' : data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Plan Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.planDate}
            onChange={(e) => onChange({ planDate: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Next Review Date</label>
          <input
            type="text"
            value={isBlank ? '' : data.nextReviewDate}
            onChange={(e) => onChange({ nextReviewDate: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
      </div>

      {/* Who Receives Updates Table */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs flex items-center justify-between">
          <span>WHO RECEIVES UPDATES</span>
          <button
            type="button"
            onClick={addRecipientRow}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Family Recipient</span>
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Relationship</th>
              <th className="py-2 px-3">Update Topics</th>
              <th className="py-2 px-3">How Often</th>
              <th className="py-2 px-3">Method</th>
              <th className="py-2 px-3 no-print w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {(isBlank ? [1, 2] : data.recipients).map((r: any, idx: number) => {
              if (isBlank) {
                return (
                  <tr key={idx} className="h-10">
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3"></td>
                    <td></td>
                  </tr>
                );
              }
              return (
                <tr key={idx} className="hover:bg-sage-50/40">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={r.name}
                      onChange={(e) => updateRecipientRow(idx, { name: e.target.value })}
                      placeholder="Name"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs font-semibold"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={r.relationship}
                      onChange={(e) => updateRecipientRow(idx, { relationship: e.target.value })}
                      placeholder="Relationship"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={r.topics}
                      onChange={(e) => updateRecipientRow(idx, { topics: e.target.value })}
                      placeholder="Doctor prep, rides, meds"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={r.howOften}
                      onChange={(e) => updateRecipientRow(idx, { howOften: e.target.value })}
                      placeholder="Weekly"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={r.method}
                      onChange={(e) => updateRecipientRow(idx, { method: e.target.value })}
                      placeholder="Phone & Text"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3 text-right no-print">
                    <button
                      type="button"
                      onClick={() => removeRecipientRow(idx)}
                      className="text-pecan-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Contact SouthernWell Right Away If */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-white space-y-3">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">
          CONTACT SOUTHERNWELL RIGHT AWAY IF (CHECK ALL)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {triggerList.map((trig) => (
            <label key={trig} className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={!isBlank && data.contactTriggers?.includes(trig)}
                onChange={() => toggleTrigger(trig)}
                className="rounded text-olive focus:ring-olive"
              />
              <span className={trig.includes('Hospital') || trig.includes('Fall') ? 'font-semibold text-pecan-950' : ''}>
                {trig}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Escalation Steps Box */}
      <div className="bg-[#FAF7F0] border-l-4 border-olive p-4 rounded-r-2xl space-y-2">
        <h4 className="font-bold text-olive uppercase text-xs tracking-wider">
          ESCALATION STEPS (NON-CLINICAL CARE PROTOCOL)
        </h4>
        <ol className="list-decimal pl-4 space-y-1 text-xs text-pecan-900 font-medium">
          <li>1. Try the client again by phone and text.</li>
          <li>2. Contact the emergency contact listed on Form 09.</li>
          <li>3. Notify the client's provider if authorized on Form 04.</li>
          <li>4. Call 911 for an immediate safety concern, then complete Form 11.</li>
        </ol>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Special Instructions</label>
        <textarea
          rows={2}
          value={isBlank ? '' : data.specialInstructions || ''}
          onChange={(e) => onChange({ specialInstructions: e.target.value })}
          placeholder="Special notes, preferred times to call proxies..."
          className="w-full bg-white p-3 rounded-xl border border-sage-200 text-xs"
        />
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-sage-200">
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">Client / Authorized Representative</span>
          <input
            type="text"
            value={isBlank ? '' : data.clientSignatureName}
            onChange={(e) => onChange({ clientSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-pecan-950 bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.clientSignatureDate}</div>
        </div>
        <div className="border-b border-pecan-800 pb-2">
          <span className="text-[10px] uppercase font-bold text-pecan-600 block mb-1">SouthernWell Care Coordinator</span>
          <input
            type="text"
            value={isBlank ? '' : data.coordinatorSignatureName}
            onChange={(e) => onChange({ coordinatorSignatureName: e.target.value })}
            className="w-full font-serif text-sm font-bold text-olive bg-transparent border-0 focus:ring-0 p-0"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.coordinatorSignatureDate}</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM 11: Incident Report
   ========================================================================= */
const RenderForm11: React.FC<{
  data: Form11Data;
  onChange: (u: Partial<Form11Data>) => void;
  isBlank: boolean;
}> = ({ data, onChange, isBlank }) => {
  const incidentTypesList = [
    'Unable to reach client',
    'Fall or injury reported',
    'ER or hospital visit',
    'Medication concern reported',
    'Safety concern',
    'Complaint',
    'Privacy concern',
    'Client not following plan',
    'Suspected abuse, neglect or exploitation',
  ];

  const notifiedCheckboxesList = ['Family', 'Provider', 'Consulting RN', '911 / emergency', 'LCSW'];

  const toggleIncidentType = (item: string) => {
    const list = data.incidentTypes || [];
    const next = list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
    onChange({ incidentTypes: next });
  };

  const toggleNotified = (item: string) => {
    const list = data.notifiedCheckboxes || [];
    const next = list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
    onChange({ notifiedCheckboxes: next });
  };

  const addNotificationRow = () => {
    const next = [
      ...data.notifications,
      { personOrAgency: '', dateTime: '', method: 'Phone', response: '' },
    ];
    onChange({ notifications: next });
  };

  const removeNotificationRow = (idx: number) => {
    onChange({ notifications: data.notifications.filter((_, i) => i !== idx) });
  };

  const updateNotificationRow = (idx: number, patch: Partial<Form11Data['notifications'][0]>) => {
    const next = data.notifications.map((n, i) => (i === idx ? { ...n, ...patch } : n));
    onChange({ notifications: next });
  };

  return (
    <div className="space-y-6 text-xs text-pecan-900 leading-relaxed">
      <div className="bg-sage-50 border border-sage-200 p-3 rounded-xl text-pecan-800 text-xs italic">
        Complete the same day. Facts only. Step 10, as needed.
      </div>

      {/* Incident Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sage-50/50 p-4 rounded-2xl border border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date of Incident</label>
          <input
            type="text"
            value={isBlank ? '' : data.dateOfIncident}
            onChange={(e) => onChange({ dateOfIncident: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Time</label>
          <input
            type="text"
            value={isBlank ? '' : data.time}
            onChange={(e) => onChange({ time: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Location</label>
          <input
            type="text"
            value={isBlank ? '' : data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Client home, clinic, ride..."
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Client Name</label>
          <input
            type="text"
            value={isBlank ? '' : data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Reported By</label>
          <input
            type="text"
            value={isBlank ? '' : data.reportedBy}
            onChange={(e) => onChange({ reportedBy: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Date Reported</label>
          <input
            type="text"
            value={isBlank ? '' : data.dateReported}
            onChange={(e) => onChange({ dateReported: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200"
          />
        </div>
      </div>

      {/* Type of Incident Checkboxes */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-white">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs mb-3">
          TYPE OF INCIDENT (CHECK ALL)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {incidentTypesList.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={!isBlank && data.incidentTypes?.includes(t)}
                onChange={() => toggleIncidentType(t)}
                className="rounded text-olive focus:ring-olive"
              />
              <span className={t.includes('abuse') || t.includes('ER') ? 'font-bold text-rose-800' : ''}>
                {t}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* What Happened (STAR) */}
      <div className="border border-sage-200 rounded-2xl p-4 bg-[#FCFAF5] space-y-3">
        <h4 className="font-bold text-olive uppercase tracking-wide text-xs">
          WHAT HAPPENED (STAR METHODOLOGY)
        </h4>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Situation</label>
          <textarea
            rows={2}
            value={isBlank ? '' : data.starNotes?.situation || ''}
            onChange={(e) => onChange({ starNotes: { ...data.starNotes, situation: e.target.value } })}
            placeholder="Describe factual sequence of events..."
            className="w-full bg-white p-2.5 rounded-xl border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Task</label>
          <textarea
            rows={2}
            value={isBlank ? '' : data.starNotes?.task || ''}
            onChange={(e) => onChange({ starNotes: { ...data.starNotes, task: e.target.value } })}
            placeholder="Immediate non-clinical duty or safety response needed..."
            className="w-full bg-white p-2.5 rounded-xl border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Action</label>
          <textarea
            rows={2}
            value={isBlank ? '' : data.starNotes?.action || ''}
            onChange={(e) => onChange({ starNotes: { ...data.starNotes, action: e.target.value } })}
            placeholder="Specific actions taken, calls placed, family informed..."
            className="w-full bg-white p-2.5 rounded-xl border border-sage-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Result</label>
          <textarea
            rows={2}
            value={isBlank ? '' : data.starNotes?.result || ''}
            onChange={(e) => onChange({ starNotes: { ...data.starNotes, result: e.target.value } })}
            placeholder="Immediate outcome, current client state, resolved safety..."
            className="w-full bg-white p-2.5 rounded-xl border border-sage-200 text-xs"
          />
        </div>
      </div>

      {/* Who Was Notified */}
      <div className="border border-sage-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-olive text-white p-3 font-bold text-xs flex items-center justify-between">
          <span>WHO WAS NOTIFIED</span>
          <button
            type="button"
            onClick={addNotificationRow}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="p-3 bg-sage-50 border-b border-sage-200 flex flex-wrap gap-4 text-xs font-semibold">
          {notifiedCheckboxesList.map((box) => (
            <label key={box} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!isBlank && data.notifiedCheckboxes?.includes(box)}
                onChange={() => toggleNotified(box)}
                className="rounded text-olive focus:ring-olive"
              />
              <span>{box}</span>
            </label>
          ))}
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage-100 text-pecan-800 text-[10px] uppercase tracking-wider font-bold">
              <th className="py-2 px-3">Person / Agency</th>
              <th className="py-2 px-3">Date / Time</th>
              <th className="py-2 px-3">Method</th>
              <th className="py-2 px-3">Response</th>
              <th className="py-2 px-3 no-print w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100 bg-white">
            {(isBlank ? [1, 2] : data.notifications).map((n: any, idx: number) => {
              if (isBlank) {
                return (
                  <tr key={idx} className="h-10">
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3 border-r border-sage-100"></td>
                    <td className="py-2 px-3"></td>
                    <td></td>
                  </tr>
                );
              }
              return (
                <tr key={idx} className="hover:bg-sage-50/40">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={n.personOrAgency}
                      onChange={(e) => updateNotificationRow(idx, { personOrAgency: e.target.value })}
                      placeholder="e.g. Dorothy Miller (Daughter)"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs font-semibold"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={n.dateTime}
                      onChange={(e) => updateNotificationRow(idx, { dateTime: e.target.value })}
                      placeholder="Oct 14, 2:25 PM"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={n.method}
                      onChange={(e) => updateNotificationRow(idx, { method: e.target.value })}
                      placeholder="Phone, Portal"
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={n.response}
                      onChange={(e) => updateNotificationRow(idx, { response: e.target.value })}
                      placeholder="Response details..."
                      className="w-full bg-sage-50/50 px-2 py-1 rounded border border-sage-200 text-xs"
                    />
                  </td>
                  <td className="py-2 px-3 text-right no-print">
                    <button
                      type="button"
                      onClick={() => removeNotificationRow(idx)}
                      className="text-pecan-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Follow-up Plan */}
      <div>
        <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Follow-up Plan</label>
        <textarea
          rows={2}
          value={isBlank ? '' : data.followUpPlan}
          onChange={(e) => onChange({ followUpPlan: e.target.value })}
          placeholder="Preventive steps, home environment adjustments, monitoring schedule..."
          className="w-full bg-white p-3 rounded-xl border border-sage-200 text-xs"
        />
      </div>

      {/* Mandatory Reporting Warning */}
      <div className="bg-rose-50 border-l-4 border-rose-600 p-3.5 rounded-r-xl text-rose-950 text-xs font-medium">
        Suspected abuse, neglect or exploitation must be reported as required by law and the SOP Guide. State only what was observed or reported.
      </div>

      {/* Completed By & RN Advisory Signoff */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-sage-200">
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">Completed By</label>
          <input
            type="text"
            value={isBlank ? '' : data.completedBy}
            onChange={(e) => onChange({ completedBy: e.target.value })}
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-bold"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.completedDate}</div>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-pecan-600 mb-1">RN Advisory Review (if applicable)</label>
          <input
            type="text"
            value={isBlank ? '' : data.rnAdvisoryReview || ''}
            onChange={(e) => onChange({ rnAdvisoryReview: e.target.value })}
            placeholder="Consulting RN Signoff & Notes"
            className="w-full bg-white px-3 py-1.5 rounded-lg border border-sage-200 font-semibold"
          />
          <div className="text-[10px] text-pecan-500 mt-1">Date: {isBlank ? '___________' : data.rnReviewDate || '___________'}</div>
        </div>
      </div>
    </div>
  );
};

/* Blank Data Factories */
function emptyForm01(): Form01Data {
  return {
    date: '', time: '', takenBy: '', callerName: '', relationshipToClient: '', phone: '', clientName: '', bestTimeToCall: '', county: '',
    howHeard: [], supportNeeded: [], starNotes: { situation: '', task: '', action: '', result: '' }, outcome: '',
  };
}

function emptyForm02(): Form02Data {
  return {
    clientName: '', dob: '', completedBy: '', date: '', checklist: {}, decision: 'Accept for enrollment', reviewedBy: '', reviewDate: '',
  };
}

function emptyForm03(): Form03Data {
  return {
    clientName: '', dob: '', packageSelected: 'Signature', addOnsSelected: '', startDate: '', monthlyFee: '', noticeDays: 30,
    clientSignatureName: '', clientSignatureDate: '', coordinatorSignatureName: '', coordinatorSignatureDate: '', isSigned: false,
  };
}

function emptyForm04(): Form04Data {
  return {
    clientName: '', dob: '', providers: [], mentalHealthInitials: '', expirationDate: '',
    clientSignatureName: '', clientSignatureDate: '', witnessSignatureName: '', witnessSignatureDate: '',
  };
}

function emptyForm05(): Form05Data {
  return {
    clientName: '', dob: '', contacts: [], whatMayBeShared: [], howDelivery: [], howOften: 'Weekly',
    clientSignatureName: '', clientSignatureDate: '', coordinatorSignatureName: '', coordinatorSignatureDate: '',
  };
}

function emptyForm06(): Form06Data {
  return {
    clientName: '', dob: '', referralDate: '', referredTo: '', lcswPhone: '', reasons: [],
    initials: { clinical: '', independent: '', scheduling: '', noClinicalRole: '', suggestion: '' },
    infoSharing: 'name_phone_only', clientSignatureName: '', clientSignatureDate: '', coordinatorSignatureName: '', coordinatorSignatureDate: '',
  };
}

function emptyForm07(): Form07Data {
  return {
    clientName: '', dob: '', personCompleting: '', phone: '', numberInHousehold: 1, numberCaregivers: 1, packageRequested: 'Signature',
    circumstances: [], monthlyIncomeRange: '', narrativeSituation: '', clientStatementConfirmed: false, clientSignatureName: '', clientSignatureDate: '',
    forSouthernWellUse: { approvedRate: '', reviewDate: '', decision: 'approved', reviewedBy: '' },
  };
}

function emptyForm08(): Form08Data {
  return {
    clientName: '', dob: '', date: '', completedBy: '', areas: {}, resourceReferrals: [], reviewedBy: '', reviewDate: '',
  };
}

function emptyForm09(): Form09Data {
  return {
    clientName: '', dob: '',
    initials: { receivedHandbook: '', nonClinical: '', notEmergency: '', unableToReach: '', planCompliance: '', preferredTimes: '' },
    preferredDays: '', preferredTimes: '', preferredMethod: 'call', emergencyContacts: [],
    pcpClinic: '', pcpPhone: '', pharmacy: '', pharmacyPhone: '', preferredHospital: '', hospitalPhone: '',
    clientSignatureName: '', clientSignatureDate: '', coordinatorSignatureName: '', coordinatorSignatureDate: '',
  };
}

function emptyForm10(): Form10Data {
  return {
    clientName: '', dob: '', planDate: '', nextReviewDate: '', recipients: [], contactTriggers: [],
    clientSignatureName: '', clientSignatureDate: '', coordinatorSignatureName: '', coordinatorSignatureDate: '',
  };
}

function emptyForm11(): Form11Data {
  return {
    id: 'inc-blank', dateOfIncident: '', time: '', location: '', clientName: '', reportedBy: '', dateReported: '', incidentTypes: [],
    starNotes: { situation: '', task: '', action: '', result: '' }, notifications: [], notifiedCheckboxes: [], followUpPlan: '', completedBy: '', completedDate: '',
  };
}

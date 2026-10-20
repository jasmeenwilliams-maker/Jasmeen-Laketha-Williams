import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Pill, 
  Calendar, 
  MapPin, 
  UserCheck, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Printer, 
  Plus, 
  Check, 
  ShieldCheck, 
  Phone, 
  Users, 
  ChevronRight, 
  FileCheck2, 
  Sparkles,
  ClipboardList,
  AlertCircle,
  Truck,
  HeartPulse,
  Award,
  ExternalLink,
  X,
  Stethoscope,
  Edit3,
  Trash2,
  DollarSign,
  TrendingUp,
  CheckSquare,
  RefreshCw,
  SlidersHorizontal,
  Layers,
  Shield,
  Package,
  CreditCard,
  QrCode,
  FileSpreadsheet,
  Rocket,
  Heart
} from 'lucide-react';
import { ClientRecord, OperationsTask, MedicationItem, Appointment, ClientProfile } from '../types';
import { INITIAL_OPERATIONS_TASKS } from '../data/mockData';
import { ScreenTab } from './Navigation';

interface OperationsHubScreenProps {
  clientRecords: ClientRecord[];
  activeClientId: string;
  onSelectClient: (clientId: string) => void;
  onNavigateToScreen: (screen: ScreenTab) => void;
  onOpenSignModalForClient: (clientId: string) => void;
  onOpenOnboardModal: () => void;
  onUpdateMedication?: (clientId: string, med: MedicationItem) => void;
  onUpdateAppointment?: (clientId: string, apt: Appointment) => void;
  onUpdateClient?: (clientId: string, updated: Partial<ClientProfile>) => void;
  onDeleteClient?: (clientId: string) => void;
  onOpenQRModalForClient?: (clientId: string) => void;
  onOpenGoogleSheet?: () => void;
  onOpenGoLive?: () => void;
}

type OpsSubTab = 'overview' | 'roster' | 'tasks' | 'medications' | 'billing' | 'audit';

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warning';
}

export const OperationsHubScreen: React.FC<OperationsHubScreenProps> = ({
  clientRecords,
  activeClientId,
  onSelectClient,
  onNavigateToScreen,
  onOpenSignModalForClient,
  onOpenOnboardModal,
  onUpdateMedication,
  onUpdateAppointment,
  onUpdateClient,
  onDeleteClient,
  onOpenQRModalForClient,
  onOpenGoogleSheet,
  onOpenGoLive,
}) => {
  const [activeTab, setActiveTab] = useState<OpsSubTab>('overview');
  const [tasks, setTasks] = useState<OperationsTask[]>(INITIAL_OPERATIONS_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedPackage, setSelectedPackage] = useState<string>('all');
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [medFilter, setMedFilter] = useState<'all' | 'needs_review' | 'refill_soon'>('all');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // New task modal state
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskClientId, setNewTaskClientId] = useState(clientRecords[0]?.client.id || '');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<OperationsTask['category']>('Transportation');
  const [newTaskPriority, setNewTaskPriority] = useState<OperationsTask['priority']>('high');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-11-01');
  const [newTaskNotes, setNewTaskNotes] = useState('');

  // Edit client modal state
  const [editingClient, setEditingClient] = useState<ClientProfile | null>(null);
  const [editFormData, setEditFormData] = useState<{
    name: string;
    phone: string;
    address: string;
    county: string;
    representativeName: string;
    representativeRelation: string;
    conditions: string;
    preferredCommunication: 'phone' | 'text' | 'email' | 'virtual';
  }>({
    name: '',
    phone: '',
    address: '',
    county: 'Forrest County',
    representativeName: '',
    representativeRelation: '',
    conditions: '',
    preferredCommunication: 'phone',
  });

  // Delete client modal state
  const [clientToDelete, setClientToDelete] = useState<ClientProfile | null>(null);

  // Medication Concierge 4-step pipeline status
  const [conciergeSteps, setConciergeSteps] = useState([
    { id: 'step-1', label: 'Intake Rx Reconciled', status: 'completed', date: 'Oct 24, 2026', note: 'All active medications cross-referenced with physician record' },
    { id: 'step-2', label: 'Pillbox & Blister Pack Synced', status: 'in_progress', date: 'Active Today', note: '7-day AM/Noon/PM pill organizers assembled for Pine Belt clients' },
    { id: 'step-3', label: 'Prescribing MD Verification Signed', status: 'completed', date: 'Oct 22, 2026', note: 'Dr. Raymond Thornton cardiology confirmation on file' },
    { id: 'step-4', label: 'Corner Drug Co. Delivery Scheduled', status: 'pending', date: 'Due Oct 31', note: 'Monthly refill drop scheduled for Hattiesburg & Petal routes' },
  ]);

  // Audit state checklist (SOP 3.4 Standards)
  const [auditItems, setAuditItems] = useState([
    { id: 'sop-1', code: 'SOP 3.4.1', title: '5-Day Initial Intake & In-Home Assessment Completed', verified: true, date: 'Oct 18, 2026', authority: 'Jasmeen Williams, LPN, BS-HHS' },
    { id: 'sop-2', code: 'SOP 3.4.2', title: 'Client Rights & Digital Handbook Acknowledgment on File', verified: false, date: 'Pending Clara Mae Holloway', authority: 'Family Liaison' },
    { id: 'sop-3', code: 'SOP 3.4.3', title: '30-Day Medication Reconciliation & Allergy Safety Review', verified: true, date: 'Oct 15, 2026', authority: 'Clinical Advisory' },
    { id: 'sop-4', code: 'SOP 3.4.4', title: 'Clinical Visit Preparation & Transportation 48-Hour Confirmation', verified: true, date: 'Oct 20, 2026', authority: 'Transit Coordinator' },
    { id: 'sop-5', code: 'SOP 3.4.5', title: '24-Hour Post-Appointment Provider Debrief to Family', verified: true, date: 'Oct 19, 2026', authority: 'Care Coordinator' },
    { id: 'sop-6', code: 'SOP 3.4.6', title: 'Mississippi Adult Protective Services & Ombudsman Rights Notice Issued', verified: true, date: 'Oct 12, 2026', authority: 'Quality Director' },
  ]);

  const showToast = (title: string, description: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ id: Date.now().toString(), title, description, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Aggregate operations metrics
  const totalClients = clientRecords.length;
  const signedClients = clientRecords.filter(r => r.client.acknowledgmentSigned).length;
  const complianceRate = Math.round((signedClients / Math.max(totalClients, 1)) * 100);

  const allAppointments = useMemo(() => {
    return clientRecords.flatMap(r => r.appointments.map(a => ({ ...a, clientId: r.client.id, clientName: r.client.name, county: r.client.county })));
  }, [clientRecords]);

  const upcomingAppointments = allAppointments.filter(a => a.status === 'upcoming');
  const transportationPending = upcomingAppointments.filter(a => !a.transportationArranged);
  const transportationConfirmedCount = upcomingAppointments.filter(a => a.transportationArranged).length;
  const transportationRate = upcomingAppointments.length > 0 
    ? Math.round((transportationConfirmedCount / upcomingAppointments.length) * 100) 
    : 100;

  const allMedications = useMemo(() => {
    return clientRecords.flatMap(r => r.medications.map(m => ({ ...m, clientId: r.client.id, clientName: r.client.name, county: r.client.county })));
  }, [clientRecords]);

  const medicationsFlagged = allMedications.filter(m => m.needsReview);
  const medicationsRefillSoon = allMedications.filter(m => {
    return m.refillDueDate.toLowerCase().includes('oct') || m.refillDueDate.toLowerCase().includes('nov 1');
  });

  // Client roster with enriched status
  const filteredClients = useMemo(() => {
    return clientRecords.filter(rec => {
      const matchSearch = rec.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.client.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.client.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.client.conditions.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCounty = selectedCounty === 'all' || rec.client.county.toLowerCase().includes(selectedCounty.toLowerCase());
      
      let matchPackage = true;
      if (selectedPackage !== 'all') {
        const pkg = rec.formsPacket?.form03?.packageSelected || (rec.client.id.includes('084') ? 'Signature' : rec.client.id.includes('092') ? 'Concierge' : 'Essentials');
        matchPackage = pkg.toLowerCase() === selectedPackage.toLowerCase();
      }

      return matchSearch && matchCounty && matchPackage;
    });
  }, [clientRecords, searchQuery, selectedCounty, selectedPackage]);

  // Task filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchStatus = taskFilter === 'all' || t.status === taskFilter;
      const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
      const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchPriority && matchSearch;
    });
  }, [tasks, taskFilter, priorityFilter, searchQuery]);

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
        showToast(
          nextStatus === 'completed' ? 'Task Completed' : 'Task Reopened',
          `"${t.title}" for ${t.clientName}`,
          nextStatus === 'completed' ? 'success' : 'info'
        );
        return {
          ...t,
          status: nextStatus
        };
      }
      return t;
    }));
  };

  // Add new task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const clientRec = clientRecords.find(r => r.client.id === newTaskClientId);
    const newTask: OperationsTask = {
      id: `task-op-${Date.now()}`,
      clientId: newTaskClientId,
      clientName: clientRec ? clientRec.client.name : 'Client',
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      assignedCoordinator: clientRec?.client.careCoordinator.name || 'Jasmeen Williams, LPN, BS-HHS',
      dueDate: newTaskDueDate,
      status: 'pending',
      notes: newTaskNotes.trim() || undefined,
    };
    setTasks(prev => [newTask, ...prev]);
    setIsAddTaskModalOpen(false);
    setNewTaskTitle('');
    setNewTaskNotes('');
    showToast('Operational Task Created', `Assigned to ${newTask.clientName} due ${newTask.dueDate}`);
  };

  // Jump to client screen
  const handleJumpToClientScreen = (clientId: string, screen: ScreenTab) => {
    onSelectClient(clientId);
    onNavigateToScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle transport arranged
  const handleToggleTransport = (clientId: string, aptId: string, currentArranged: boolean) => {
    if (!onUpdateAppointment) return;
    const clientRec = clientRecords.find(r => r.client.id === clientId);
    if (!clientRec) return;
    const targetApt = clientRec.appointments.find(a => a.id === aptId);
    if (!targetApt) return;
    onUpdateAppointment(clientId, {
      ...targetApt,
      transportationArranged: !currentArranged
    });
    showToast(
      !currentArranged ? 'Transportation Confirmed' : 'Ride Marked Pending',
      `${targetApt.provider} on ${targetApt.date} for ${clientRec.client.name}`
    );
  };

  // Toggle med review flag
  const handleToggleMedReview = (clientId: string, medId: string, currentFlag: boolean) => {
    if (!onUpdateMedication) return;
    const clientRec = clientRecords.find(r => r.client.id === clientId);
    if (!clientRec) return;
    const targetMed = clientRec.medications.find(m => m.id === medId);
    if (!targetMed) return;
    onUpdateMedication(clientId, {
      ...targetMed,
      needsReview: !currentFlag
    });
    showToast(
      !currentFlag ? 'Flagged for Clinical Review' : 'Medication Reconciled',
      `${targetMed.name} ${targetMed.dosage} (${clientRec.client.name})`
    );
  };

  // Toggle audit verification
  const handleToggleAuditItem = (itemId: string) => {
    setAuditItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const nextVerified = !item.verified;
        showToast(
          nextVerified ? 'Standard Audit Passed' : 'Audit Action Required',
          `${item.code}: ${item.title}`
        );
        return {
          ...item,
          verified: nextVerified,
          date: nextVerified ? 'Oct 24, 2026 (Verified)' : 'Pending Verification'
        };
      }
      return item;
    }));
  };

  // Open Edit Client Modal
  const handleOpenEditClient = (client: ClientProfile) => {
    setEditingClient(client);
    setEditFormData({
      name: client.name,
      phone: client.phone,
      address: client.address,
      county: client.county,
      representativeName: client.representativeName || '',
      representativeRelation: client.representativeRelation || '',
      conditions: client.conditions.join(', '),
      preferredCommunication: client.preferredCommunication || 'phone',
    });
  };

  // Save Edit Client Form
  const handleSaveEditClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient || !onUpdateClient) return;

    const parsedConditions = editFormData.conditions
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    onUpdateClient(editingClient.id, {
      name: editFormData.name.trim(),
      phone: editFormData.phone.trim(),
      address: editFormData.address.trim(),
      county: editFormData.county.trim(),
      representativeName: editFormData.representativeName.trim() || undefined,
      representativeRelation: editFormData.representativeRelation.trim() || undefined,
      conditions: parsedConditions.length > 0 ? parsedConditions : editingClient.conditions,
      preferredCommunication: editFormData.preferredCommunication,
    });

    showToast('Client Record Updated', `${editFormData.name} profile successfully updated.`);
    setEditingClient(null);
  };

  // Delete Client
  const handleConfirmDeleteClient = () => {
    if (!clientToDelete || !onDeleteClient) return;
    onDeleteClient(clientToDelete.id);
    showToast('Client Caseload Archived', `${clientToDelete.name} removed from active caseload.`, 'warning');
    setClientToDelete(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* ========================================================= */}
      {/* EXECUTIVE BANNER & SOUTHERNWELL BRAND PRESENCE */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-br from-pecan-900 via-pecan-800 to-[#124e4b] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
        {/* Subtle decorative radial rings */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-sage-400/20 via-transparent to-transparent -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-radial from-[#1a6b68]/30 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-white backdrop-blur-md border border-white/20">
                <Activity className="w-3.5 h-3.5 text-sage-300" />
                South Mississippi Operations Hub (OPS)
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#1a6b68]/40 text-sage-100 border border-sage-300/30 font-medium">
                SOP 3.4 Care Governance
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/90">
                Hattiesburg HQ · Forrest, Lamar, Jones & Stone Counties
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
              SouthernWell Operations & Clinical Quality Hub
            </h1>
            <p className="text-sage-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              Centralized operational command center for South Mississippi Board-Certified Patient Advocates. 
              Real-time oversight for client handbook compliance, Coast Transit clinic logistics, 30-day medication reconciliations, and Mississippi SOP 3.4 standards.
            </p>
          </div>

          {/* Quick Hub Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenGoLive && (
              <button
                onClick={onOpenGoLive}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
                title="Launch & Go-Live Readiness Center"
              >
                <Rocket className="w-4 h-4 text-amber-300" />
                <span>Go-Live Center</span>
              </button>
            )}
            {onOpenGoogleSheet && (
              <button
                onClick={onOpenGoogleSheet}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
                title="Open Connected Google Sheet Master"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
                <span>Google Sheet</span>
              </button>
            )}
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#1a6b68] hover:bg-[#155755] text-white font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/20"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Ops Task</span>
            </button>
            <button
              onClick={onOpenOnboardModal}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs flex items-center gap-2 backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-sage-300" />
              <span>+ New Client Intake</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/15"
              title="Print operations summary"
            >
              <Printer className="w-4 h-4 text-sage-300" />
              <span className="hidden sm:inline">Print Report</span>
            </button>
          </div>
        </div>

        {/* Operational Status KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-white/15 text-xs">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
            <span className="text-sage-200 block text-[11px] mb-0.5">Active Caseload</span>
            <span className="text-xl font-bold font-serif text-white">{totalClients} Seniors</span>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${Math.min((totalClients / 30) * 100, 100)}%` }} />
            </div>
            <span className="text-[10px] text-sage-300 block mt-1">Capacity: {totalClients} / 30 (83%)</span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
            <span className="text-sage-200 block text-[11px] mb-0.5">Handbook Compliance</span>
            <span className="text-xl font-bold font-serif text-white">{complianceRate}%</span>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#556B2F] h-full rounded-full" style={{ width: `${complianceRate}%` }} />
            </div>
            <span className="text-[10px] text-sage-300 block mt-1">{signedClients} of {totalClients} signed</span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
            <span className="text-sage-200 block text-[11px] mb-0.5">Upcoming Clinic Visits</span>
            <span className="text-xl font-bold font-serif text-white">{upcomingAppointments.length} Visits</span>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: `${transportationRate}%` }} />
            </div>
            <span className={`text-[10px] block mt-1 ${transportationPending.length > 0 ? 'text-amber-300 font-semibold' : 'text-sage-300'}`}>
              {transportationPending.length > 0 ? `${transportationPending.length} ride confirmations needed` : '100% rides secured'}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
            <span className="text-sage-200 block text-[11px] mb-0.5">Med Safety Review</span>
            <span className="text-xl font-bold font-serif text-white">{medicationsFlagged.length} Flagged</span>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-rose-400 h-full rounded-full" style={{ width: `${medicationsFlagged.length > 0 ? 45 : 100}%` }} />
            </div>
            <span className="text-[10px] text-sage-300 block mt-1">{allMedications.length} active prescriptions</span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
            <span className="text-sage-200 block text-[11px] mb-0.5">Quality SLA</span>
            <span className="text-xl font-bold font-serif text-emerald-300">100% On-Time</span>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-300 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-[10px] text-sage-300 block mt-1">24h Debrief to Families</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* OPERATIONS NAVIGATION SUB-TABS */}
      {/* ========================================================= */}
      <div className="flex items-center justify-between border-b border-sage-200/80 pb-2 overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[
            { id: 'overview' as OpsSubTab, label: 'Ops Dashboard & Alerts', icon: <Activity className="w-4 h-4" /> },
            { id: 'roster' as OpsSubTab, label: 'Master Client Roster', icon: <Users className="w-4 h-4" />, count: totalClients },
            { id: 'tasks' as OpsSubTab, label: 'Action Item Queue', icon: <ClipboardList className="w-4 h-4" />, count: tasks.filter(t => t.status !== 'completed').length },
            { id: 'medications' as OpsSubTab, label: 'Medication Safety Concierge', icon: <Pill className="w-4 h-4" />, count: medicationsFlagged.length > 0 ? medicationsFlagged.length : undefined },
            { id: 'billing' as OpsSubTab, label: 'Packages & Plans', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'audit' as OpsSubTab, label: 'SOP 3.4 Quality Audit', icon: <FileCheck2 className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1a6b68] text-white shadow-xs'
                    : 'bg-white hover:bg-sage-50 text-pecan-700 border border-sage-200/80'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-olive-50 text-olive'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Client Quick Badge */}
        <div className="hidden md:flex items-center gap-2 shrink-0 text-xs bg-white px-3 py-1.5 rounded-xl border border-sage-200 shadow-xs">
          <span className="text-[11px] text-pecan-600">Active Focus:</span>
          <span className="font-bold text-pecan-900">
            {clientRecords.find(r => r.client.id === activeClientId)?.client.name}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#e6f3f2] text-[#1a6b68] font-bold">
            {clientRecords.find(r => r.client.id === activeClientId)?.client.county.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW 1: OVERVIEW & PROGRESS COMMAND CENTER */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Priority Operational Alerts Notice */}
          <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-800" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-amber-950">
                    Active Operational Attention Items ({(!clientRecords.every(r => r.client.acknowledgmentSigned) ? 1 : 0) + transportationPending.length + medicationsFlagged.length})
                  </h3>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-200/60 px-2.5 py-0.5 rounded-full">
                    Action Required
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900/90 mb-4">
                  These items require South Mississippi coordinator outreach, signature verification, or provider logistics today.
                </p>

                <div className="space-y-2.5">
                  {/* Unsigned Handbook Alert */}
                  {clientRecords.filter(r => !r.client.acknowledgmentSigned).map(r => (
                    <div key={r.client.id} className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs">
                          {r.client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-pecan-900">{r.client.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md">
                              Handbook Signature Pending
                            </span>
                          </div>
                          <span className="text-xs text-pecan-600 block">
                            Enrolled {r.client.enrolledDate} · {r.client.county} · Caregiver: {r.client.representativeName || 'Direct'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            onSelectClient(r.client.id);
                            onOpenSignModalForClient(r.client.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Obtain Signature</span>
                        </button>
                        <button
                          onClick={() => handleJumpToClientScreen(r.client.id, 'handbook')}
                          className="px-3 py-1.5 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-800 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Review Handbook</span>
                          <ArrowUpRight className="w-3 h-3 text-pecan-600" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Unarranged Transportation Alert */}
                  {transportationPending.map(apt => (
                    <div key={apt.id} className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                          <Truck className="w-4 h-4 text-blue-700" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-pecan-900">{apt.clientName}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md">
                              Ride Not Confirmed
                            </span>
                          </div>
                          <span className="text-xs text-pecan-600 block">
                            {apt.provider} ({apt.clinic}) on <strong className="text-pecan-900">{apt.date} at {apt.time}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleTransport(apt.clientId, apt.id, false)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Confirm Transport</span>
                        </button>
                        <button
                          onClick={() => handleJumpToClientScreen(apt.clientId, 'prep')}
                          className="px-3 py-1.5 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-800 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Prep Visit</span>
                          <ArrowUpRight className="w-3 h-3 text-pecan-600" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Medications Flagged for Clinical Review */}
                  {medicationsFlagged.map(med => (
                    <div key={med.id} className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                          <Pill className="w-4 h-4 text-rose-700" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-pecan-900">{med.name} {med.dosage}</span>
                            <span className="text-xs text-pecan-600">({med.clientName})</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-900 rounded-md">
                              Clinical Review Flag
                            </span>
                          </div>
                          <span className="text-xs text-pecan-600 block">
                            Refill Due: {med.refillDueDate} · {med.pharmacy} · {med.observationNotes}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleMedReview(med.clientId, med.id, true)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Reviewed</span>
                        </button>
                        <button
                          onClick={() => handleJumpToClientScreen(med.clientId, 'meds')}
                          className="px-3 py-1.5 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-800 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Med Screen</span>
                          <ArrowUpRight className="w-3 h-3 text-pecan-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* THREE PROGRESS CARDS: APPOINTMENTS, CARE-PLAN, WELLNESS */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Appointments Logistics Progress */}
            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-700" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    Logistics 88%
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Clinic Visits & Rides</h3>
                <p className="text-xs text-pecan-600 leading-relaxed mb-4">
                  Coast Transit, CareVan, and family vehicle logistics tracking for scheduled specialist visits.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-pecan-700">Rides Confirmed</span>
                    <span className="font-bold text-pecan-900">{transportationConfirmedCount} of {upcomingAppointments.length}</span>
                  </div>
                  <div className="w-full bg-sage-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${transportationRate}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-pecan-600 pt-1">
                    <span>48h Confirmation Window</span>
                    <span className="font-semibold text-emerald-700">On Track</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('tasks')}
                className="mt-5 w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Transit Tasks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Care-Plan Follow-Up Progress */}
            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#e6f3f2] text-[#1a6b68] flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-[#1a6b68]" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#e6f3f2] text-[#1a6b68] border border-[#1a6b68]/30">
                    SLA 94%
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Care-Plan Follow-Up</h3>
                <p className="text-xs text-pecan-600 leading-relaxed mb-4">
                  30-day comprehensive care plan updates, specialist debriefs, and family progress dispatches.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-pecan-700">Monthly Summaries Filed</span>
                    <span className="font-bold text-pecan-900">{clientRecords.reduce((acc, r) => acc + r.coordinationLogs.length, 0)} Dispatched</span>
                  </div>
                  <div className="w-full bg-sage-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#1a6b68] h-full rounded-full transition-all" style={{ width: '94%' }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-pecan-600 pt-1">
                    <span>24h Post-MD Debriefs</span>
                    <span className="font-semibold text-emerald-700">100% SLA</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('audit')}
                className="mt-5 w-full py-2 rounded-xl bg-[#e6f3f2] hover:bg-[#d4ecea] text-[#124e4b] font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Care Governance</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. Wellness Check-Ins Progress */}
            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-emerald-700" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Weekly 100%
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Wellness & Vulnerability</h3>
                <p className="text-xs text-pecan-600 leading-relaxed mb-4">
                  Weekly telephone checks, fall mitigation screenings, and Mississippi Vulnerable Persons safeguards.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-pecan-700">Active Senior Caseload</span>
                    <span className="font-bold text-pecan-900">{totalClients} Checked This Week</span>
                  </div>
                  <div className="w-full bg-sage-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '100%' }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-pecan-600 pt-1">
                    <span>Senior Isolation Index</span>
                    <span className="font-semibold text-emerald-700">Low Risk</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('roster')}
                className="mt-5 w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Caseload Roster</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* ========================================================= */}
          {/* WINS THIS PERIOD & AREAS FOR IMPROVEMENT */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Wins This Period */}
            <div className="bg-gradient-to-br from-emerald-50/70 via-white to-sage-50/50 rounded-3xl p-6 border border-emerald-200 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Award className="w-4 h-4 text-emerald-700" />
                </div>
                <h3 className="font-serif text-lg font-bold text-emerald-950">
                  Operational Wins This Period (October 2026)
                </h3>
              </div>

              <ul className="space-y-3 text-xs text-pecan-800">
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pecan-900 block font-semibold">Zero Preventable Hospital Readmissions</strong>
                    <span>Pine Belt senior caseload maintained 0 emergency visits or readmissions throughout Forrest & Jones Counties this cycle.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pecan-900 block font-semibold">100% 24-Hour Physician Debrief SLA Adherence</strong>
                    <span>All post-consultation summaries dispatched to family proxies within 24 hours of appointment completion.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pecan-900 block font-semibold">Standardized Forms Packet (01–11) Digitized</strong>
                    <span>Interactive 11-form client onboarding and intake packet active for all South Mississippi counties.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pecan-900 block font-semibold">Pine Belt Transportation Partnerships Active</strong>
                    <span>Coast Transit and CareVan routes established for Hattiesburg Clinic and South Central Regional Medical Center visits.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Areas for Improvement / Watchlist */}
            <div className="bg-gradient-to-br from-amber-50/70 via-white to-sage-50/50 rounded-3xl p-6 border border-amber-200 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-amber-700" />
                </div>
                <h3 className="font-serif text-lg font-bold text-amber-950">
                  Areas for Improvement & Action Focus
                </h3>
              </div>

              <ul className="space-y-3 text-xs text-pecan-800">
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pecan-900 block font-semibold">Obtain Clara Mae Holloway's Signed Handbook</strong>
                    <span>Complete digital signature before Nov 2 clinical consultation with Dr. Robert Palmer in Laurel, MS.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pecan-900 block font-semibold">30-Day Medication Auto-Refill Synchronization</strong>
                    <span>Align Corner Drug Co. and Hattiesburg Clinic Pharmacy refill schedules to a single delivery window per month.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pecan-900 block font-semibold">Expand Jones County Volunteer Driver Pool</strong>
                    <span>Partner with Laurel Council on Aging to reduce peak morning transit wait times for dial-a-ride users.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-amber-100 shadow-2xs">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pecan-900 block font-semibold">Annual 10-CEU Advocate Recertification Tracking</strong>
                    <span>Schedule November continuing education modules for NASW ethics & Mississippi Elder Law update.</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* ========================================================= */}
          {/* MEDICATION CONCIERGE PACKET STATUS & COORDINATOR ROSTER */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Medication Concierge Pipeline */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-sage-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Pill className="w-5 h-5 text-[#1a6b68]" />
                    <h3 className="font-serif text-lg font-bold text-pecan-900">
                      Medication Concierge Packet Status
                    </h3>
                  </div>
                  <p className="text-xs text-pecan-600">
                    4-step operational pipeline tracking blister-pack synchronization, prescriber verification, and pharmacy delivery.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#e6f3f2] text-[#124e4b] border border-[#1a6b68]/30">
                  Step 2 of 4 Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {conciergeSteps.map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isInProgress = step.status === 'in_progress';

                  return (
                    <div 
                      key={step.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone 
                          ? 'bg-emerald-50/50 border-emerald-200' 
                          : isInProgress 
                          ? 'bg-blue-50/50 border-blue-200 ring-2 ring-blue-500/10' 
                          : 'bg-sage-50/40 border-sage-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isDone ? 'bg-emerald-600 text-white' : isInProgress ? 'bg-blue-600 text-white' : 'bg-sage-200 text-pecan-700'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="font-bold text-xs text-pecan-900">{step.label}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          isDone ? 'bg-emerald-100 text-emerald-800' : isInProgress ? 'bg-blue-100 text-blue-800' : 'bg-sage-100 text-pecan-700'
                        }`}>
                          {step.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-pecan-600 leading-relaxed mb-2">
                        {step.note}
                      </p>
                      <div className="pt-2 border-t border-sage-100 text-[10px] text-pecan-500 font-medium flex items-center justify-between">
                        <span>Timeline: {step.date}</span>
                        <span className="text-[#1a6b68] font-bold">SOP 3.4.3</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coordinator Team & Supervision */}
            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-pecan-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-olive" />
                    <span>Care Advocates</span>
                  </h3>
                  <span className="text-xs text-pecan-600 font-medium">Hattiesburg HQ</span>
                </div>

                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl border border-olive/30 bg-olive-50/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-sm text-pecan-900 block">Jasmeen Williams, LPN, BS-HHS</span>
                        <span className="text-xs text-pecan-600 block">Owner & Care Coordinator</span>
                        <span className="text-[11px] text-olive font-semibold block mt-1">
                          Pine Belt Lead · Forrest, Lamar, Jones & Stone Counties (601-554-6067)
                        </span>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-olive text-white font-bold">
                        Active Lead
                      </span>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-olive/10 flex items-center justify-between text-[11px] text-pecan-700">
                      <span>Caseload: {totalClients} seniors</span>
                      <span className="font-bold text-emerald-800">100% SOP Rev 2 Compliant</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-sage-200 bg-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-sm text-pecan-900 block">Consulting RN Reviewer</span>
                        <span className="text-xs text-pecan-600 block">RN, BSN, CCM · Clinical Advisory Consultant</span>
                        <span className="text-[11px] text-pecan-600 block mt-1">
                          Monthly Quality & Non-Clinical Documentation Audits
                        </span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        Monthly Retainer
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-sage-200 bg-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-sm text-pecan-900 block">Consulting LCSW</span>
                        <span className="text-xs text-pecan-600 block">Family Support & Psychosocial Specialist</span>
                        <span className="text-[11px] text-pecan-600 block mt-1">
                          Independent Complex Care Navigation & Caregiver Mediation
                        </span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-sage-100 text-pecan-700 font-semibold">
                        On-Call
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-2xl bg-sage-50 border border-sage-200/80 text-xs text-pecan-700">
                <span className="font-bold block text-pecan-900 mb-0.5">Clinical Scope Notice:</span>
                Non-clinical case management strictly follows SouthernWell SOP Revision 2 (18 Procedures). All medical diagnoses and therapy are deferred to licensed healthcare providers.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: MASTER CLIENT OPERATIONS ROSTER */}
      {/* ========================================================= */}
      {activeTab === 'roster' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-3xl border border-sage-200 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-pecan-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client name, ID, conditions, or county..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sage-200 bg-sage-50/50 text-xs focus:outline-none focus:border-[#1a6b68] text-pecan-900"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <Filter className="w-4 h-4 text-pecan-600 shrink-0" />
              
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="px-3 py-2 rounded-xl border border-sage-200 bg-white text-xs font-semibold text-pecan-800 cursor-pointer focus:outline-none"
              >
                <option value="all">All South MS Counties</option>
                <option value="Forrest">Forrest County (Hattiesburg)</option>
                <option value="Lamar">Lamar County (Purvis)</option>
                <option value="Jones">Jones County (Laurel)</option>
                <option value="Stone">Stone County (Wiggins)</option>
              </select>

              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="px-3 py-2 rounded-xl border border-sage-200 bg-white text-xs font-semibold text-pecan-800 cursor-pointer focus:outline-none"
              >
                <option value="all">All Service Tiers</option>
                <option value="Essentials">Essentials ($150/mo)</option>
                <option value="Signature">Signature ($325/mo)</option>
                <option value="Concierge">Concierge ($550/mo)</option>
              </select>

              <button
                onClick={onOpenOnboardModal}
                className="px-4 py-2 rounded-xl bg-[#1a6b68] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:bg-[#155755] transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Onboard Client</span>
              </button>
            </div>
          </div>

          {/* Roster Cards */}
          <div className="space-y-4">
            {filteredClients.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-sage-200">
                <Users className="w-10 h-10 text-pecan-400 mx-auto mb-2" />
                <h4 className="font-serif font-bold text-base text-pecan-900">No matching clients found</h4>
                <p className="text-xs text-pecan-600 mt-1">Try adjusting your search criteria or county filter.</p>
              </div>
            ) : (
              filteredClients.map((rec) => {
                const client = rec.client;
                const isSelected = client.id === activeClientId;
                const nextAppointment = rec.appointments.find(a => a.status === 'upcoming');
                const dueRefill = rec.medications.find(m => m.needsReview || m.refillDueDate.toLowerCase().includes('oct'));
                const packageTier = rec.formsPacket?.form03?.packageSelected || (client.id.includes('084') ? 'Signature' : client.id.includes('092') ? 'Concierge' : 'Essentials');

                return (
                  <div
                    key={client.id}
                    className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-xs hover:shadow-md ${
                      isSelected ? 'border-[#1a6b68] ring-2 ring-[#1a6b68]/20' : 'border-sage-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      
                      {/* Left: Client Identity */}
                      <div className="flex items-start gap-4">
                        <div className={`w-13 h-13 rounded-2xl flex items-center justify-center font-serif font-bold text-lg shrink-0 shadow-xs ${
                          isSelected ? 'bg-[#1a6b68] text-white' : 'bg-olive-50 text-olive border border-olive/20'
                        }`}>
                          {client.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-serif text-lg font-bold text-pecan-900">{client.name}</h3>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sage-100 text-pecan-700 font-semibold border border-sage-200">
                              {client.county}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-md bg-pecan-100/70 text-pecan-800 font-mono text-[11px]">
                              Case #{client.id}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              packageTier === 'Concierge' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                              packageTier === 'Signature' ? 'bg-[#e6f3f2] text-[#124e4b] border border-[#1a6b68]/30' :
                              'bg-sage-100 text-pecan-800 border border-sage-200'
                            }`}>
                              {packageTier} Plan
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1a6b68] text-white uppercase tracking-wider">
                                Active Focus
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-pecan-600 mb-2.5">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-olive" /> {client.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-olive" />
                              {client.representativeName ? `${client.representativeName} (${client.representativeRelation})` : 'Self-Directing'}
                            </span>
                            <span>DOB: {client.dob}</span>
                            <span>Enrolled: {client.enrolledDate}</span>
                            <span className="capitalize">Comms: {client.preferredCommunication}</span>
                          </div>

                          {/* Conditions Tags */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            {client.conditions.map((c) => (
                              <span key={c} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-sage-50 text-pecan-800 border border-sage-200/60">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Operational Status Indicators */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-sage-50/60 p-3.5 rounded-2xl border border-sage-100 text-xs shrink-0">
                        
                        {/* Handbook Status */}
                        <div>
                          <span className="text-[10px] text-pecan-600 block mb-0.5">Handbook Receipt</span>
                          {client.acknowledgmentSigned ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Signed ({client.signatureDate})</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                onSelectClient(client.id);
                                onOpenSignModalForClient(client.id);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md hover:bg-amber-200 cursor-pointer"
                            >
                              <Clock className="w-3 h-3 text-amber-700" />
                              <span>Sign Now</span>
                            </button>
                          )}
                        </div>

                        {/* Next Clinic Event */}
                        <div>
                          <span className="text-[10px] text-pecan-600 block mb-0.5">Next Clinic Event</span>
                          {nextAppointment ? (
                            <span className="text-[11px] font-bold text-pecan-900 block truncate" title={nextAppointment.provider}>
                              {nextAppointment.date.slice(5)} · {nextAppointment.specialty.split(' ')[0]}
                            </span>
                          ) : (
                            <span className="text-[11px] text-pecan-500">None scheduled</span>
                          )}
                          {nextAppointment && (
                            <span className={`text-[10px] font-semibold ${nextAppointment.transportationArranged ? 'text-emerald-700' : 'text-amber-700'}`}>
                              {nextAppointment.transportationArranged ? 'Ride set' : 'Needs ride'}
                            </span>
                          )}
                        </div>

                        {/* Active Prescriptions */}
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-pecan-600 block mb-0.5">Active Meds</span>
                          <span className="text-[11px] font-bold text-pecan-900">
                            {rec.medications.length} Prescriptions
                          </span>
                          {dueRefill && (
                            <span className="text-[10px] text-rose-700 font-semibold block truncate">
                              Refill: {dueRefill.refillDueDate}
                            </span>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Quick Action Navigation & Modification Buttons */}
                    <div className="mt-4 pt-4 border-t border-sage-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => {
                            onSelectClient(client.id);
                            onNavigateToScreen('handbook');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-sage-50 text-pecan-800 font-semibold border border-sage-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-olive" />
                          <span>Handbook</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectClient(client.id);
                            onNavigateToScreen('forms');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-sage-50 text-pecan-800 font-semibold border border-sage-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <FileCheck2 className="w-3.5 h-3.5 text-olive" />
                          <span>Forms (01–11)</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectClient(client.id);
                            onNavigateToScreen('hub');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-sage-50 text-pecan-800 font-semibold border border-sage-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Users className="w-3.5 h-3.5 text-olive" />
                          <span>Care Hub</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectClient(client.id);
                            onNavigateToScreen('prep');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-sage-50 text-pecan-800 font-semibold border border-sage-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Calendar className="w-3.5 h-3.5 text-olive" />
                          <span>Prep</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectClient(client.id);
                            onNavigateToScreen('meds');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-sage-50 text-pecan-800 font-semibold border border-sage-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Pill className="w-3.5 h-3.5 text-olive" />
                          <span>Meds</span>
                        </button>

                        {/* Assigned Patient QR Code Pass Button */}
                        <button
                          onClick={() => {
                            onSelectClient(client.id);
                            if (onOpenQRModalForClient) onOpenQRModalForClient(client.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-olive-50 hover:bg-olive-100 text-olive font-bold border border-olive/30 transition-colors cursor-pointer flex items-center gap-1"
                          title="View & Print Assigned QR Code Pass"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>QR Pass</span>
                        </button>

                        {/* Edit Client Button */}
                        <button
                          onClick={() => handleOpenEditClient(client)}
                          className="px-3 py-1.5 rounded-xl bg-sage-50 hover:bg-sage-100 text-pecan-800 font-semibold border border-sage-200 transition-colors cursor-pointer flex items-center gap-1"
                          title="Edit client demographics"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-pecan-600" />
                          <span>Edit</span>
                        </button>

                        {/* Delete Client Button */}
                        <button
                          onClick={() => setClientToDelete(client)}
                          className="px-2.5 py-1.5 rounded-xl hover:bg-rose-50 text-rose-700 font-semibold border border-transparent hover:border-rose-200 transition-colors cursor-pointer flex items-center gap-1"
                          title="Archive client"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                          <FileSpreadsheet className="w-3 h-3 text-emerald-700" />
                          <span>Sheet Synced</span>
                        </span>
                        <button
                          onClick={() => onSelectClient(client.id)}
                        className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#1a6b68] text-white'
                            : 'bg-sage-100 hover:bg-sage-200 text-pecan-900'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{isSelected ? 'Currently Selected' : 'Set Active Focus'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
            )}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 3: ACTION ITEM & TASK QUEUE */}
      {/* ========================================================= */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          
          {/* Controls */}
          <div className="bg-white p-4 rounded-3xl border border-sage-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-pecan-700 mr-1">Status:</span>
              {(['all', 'pending', 'in_progress', 'completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setTaskFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                    taskFilter === st
                      ? 'bg-[#1a6b68] text-white shadow-xs'
                      : 'bg-sage-50 hover:bg-sage-100 text-pecan-800'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-sage-200 bg-white text-xs font-semibold text-pecan-800 cursor-pointer focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <button
                onClick={() => setIsAddTaskModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#1a6b68] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#155755] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Ops Task</span>
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-sage-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-serif font-bold text-base text-pecan-900">No matching operational tasks</h4>
                <p className="text-xs text-pecan-600 mt-1">All coordination items in this category are fully up to date.</p>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const isCompleted = task.status === 'completed';
                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isCompleted ? 'border-sage-200 bg-sage-50/40 opacity-75' : 'border-sage-200 shadow-xs hover:border-[#1a6b68]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                          isCompleted
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-pecan-300 hover:border-[#1a6b68] bg-white'
                        }`}
                        title={isCompleted ? 'Mark pending' : 'Mark completed'}
                      >
                        {isCompleted && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-sm font-bold ${isCompleted ? 'line-through text-pecan-500' : 'text-pecan-900'}`}>
                            {task.title}
                          </span>

                          {/* Priority badge */}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            task.priority === 'critical' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                            task.priority === 'high' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-sage-100 text-pecan-700'
                          }`}>
                            {task.priority}
                          </span>

                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#e6f3f2] text-[#124e4b] font-semibold">
                            {task.category}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 text-xs text-pecan-600">
                          <span className="font-semibold text-pecan-800">Client: {task.clientName}</span>
                          <span>Assigned: {task.assignedCoordinator}</span>
                          <span className="flex items-center gap-1 font-medium text-pecan-700">
                            <Clock className="w-3 h-3 text-olive" /> Due: {task.dueDate}
                          </span>
                        </div>

                        {task.notes && (
                          <p className="text-xs text-pecan-700/80 mt-1.5 italic bg-sage-50/80 p-2 rounded-xl border border-sage-100">
                            "{task.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => {
                          onSelectClient(task.clientId);
                          if (task.category === 'Compliance') {
                            onNavigateToScreen('handbook');
                          } else if (task.category === 'Transportation' || task.category === 'Clinical Debrief') {
                            onNavigateToScreen('prep');
                          } else if (task.category === 'Medication') {
                            onNavigateToScreen('meds');
                          } else {
                            onNavigateToScreen('hub');
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-800 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Open Context</span>
                        <ArrowUpRight className="w-3 h-3 text-pecan-600" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 4: CROSS-CLIENT MEDICATION SAFETY TRACKER */}
      {/* ========================================================= */}
      {activeTab === 'medications' && (
        <div className="space-y-6">
          
          <div className="bg-white p-4 rounded-3xl border border-sage-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-pecan-900">
                Cross-Client Medication Directory ({allMedications.length} Prescriptions)
              </h3>
              <p className="text-xs text-pecan-600">
                Monitored for adverse drug interactions, pharmacy refill deadlines, and observation cues across all Pine Belt seniors.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMedFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  medFilter === 'all' ? 'bg-[#1a6b68] text-white' : 'bg-sage-50 text-pecan-800'
                }`}
              >
                All Meds ({allMedications.length})
              </button>
              <button
                onClick={() => setMedFilter('needs_review')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  medFilter === 'needs_review' ? 'bg-rose-700 text-white' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                Flagged for Review ({medicationsFlagged.length})
              </button>
              <button
                onClick={() => setMedFilter('refill_soon')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  medFilter === 'refill_soon' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                Refill Due Soon ({medicationsRefillSoon.length})
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sage-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-sage-50 border-b border-sage-200 text-pecan-800 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Medication & Dose</th>
                    <th className="py-3.5 px-4">Frequency & Purpose</th>
                    <th className="py-3.5 px-4">Prescriber / Clinic</th>
                    <th className="py-3.5 px-4">Pharmacy & Refill</th>
                    <th className="py-3.5 px-4 text-center">Safety Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {allMedications
                    .filter((m) => {
                      if (medFilter === 'needs_review') return m.needsReview;
                      if (medFilter === 'refill_soon') return m.refillDueDate.toLowerCase().includes('oct') || m.refillDueDate.toLowerCase().includes('nov 1');
                      return true;
                    })
                    .map((med) => (
                      <tr key={`${med.clientId}-${med.id}`} className="hover:bg-sage-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-pecan-900 whitespace-nowrap">
                          <div>{med.clientName}</div>
                          <span className="text-[10px] text-pecan-500 font-normal">{med.county}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-pecan-900 block">{med.name}</span>
                          <span className="text-[11px] text-pecan-600 font-mono">{med.dosage}</span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <span className="text-pecan-800 font-medium block">{med.frequency}</span>
                          <span className="text-[11px] text-pecan-600 italic block">{med.purpose}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-pecan-900 font-medium">{med.prescribingDoctor}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-pecan-900 font-semibold block">{med.pharmacy}</span>
                          <span className="text-[11px] text-pecan-600 block">Due: {med.refillDueDate}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          {med.needsReview ? (
                            <button
                              onClick={() => handleToggleMedReview(med.clientId, med.id, true)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-200 cursor-pointer"
                              title="Click to resolve and mark reconciled"
                            >
                              <AlertCircle className="w-3 h-3 text-rose-600" />
                              <span>Clinical Review</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleMedReview(med.clientId, med.id, false)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-pointer"
                              title="Click to flag for clinical review"
                            >
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Reconciled</span>
                            </button>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleJumpToClientScreen(med.clientId, 'meds')}
                            className="text-[#1a6b68] hover:text-[#124e4b] font-bold hover:underline"
                          >
                            Open Meds →
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

      {/* ========================================================= */}
      {/* VIEW 5: PACKAGES & BILLING TRACKER */}
      {/* ========================================================= */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          
          {/* Package Tier Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sage-100 text-pecan-800">
                  Level 1 Service
                </span>
                <span className="font-serif font-bold text-xl text-pecan-900">$150<span className="text-xs font-normal text-pecan-600">/mo</span></span>
              </div>
              <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Essentials Care</h3>
              <p className="text-xs text-pecan-600 leading-relaxed mb-4">
                Monthly telephonic care review, prescription refill synchronizations, and digital family portal access.
              </p>
              <div className="pt-3 border-t border-sage-100 text-xs text-pecan-700 flex items-center justify-between">
                <span>Active Clients</span>
                <strong className="font-bold text-pecan-900">
                  {clientRecords.filter(r => (r.formsPacket?.form03?.packageSelected || 'Essentials') === 'Essentials').length}
                </strong>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#e6f3f2] to-white rounded-3xl p-6 border-2 border-[#1a6b68] shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#1a6b68] text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-xl uppercase tracking-wider">
                Popular
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1a6b68]/20 text-[#124e4b]">
                  Level 2 Service
                </span>
                <span className="font-serif font-bold text-xl text-[#124e4b]">$325<span className="text-xs font-normal text-pecan-600">/mo</span></span>
              </div>
              <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Signature Care</h3>
              <p className="text-xs text-pecan-600 leading-relaxed mb-4">
                Includes in-person clinic escorts, 24-hour post-appointment debriefs to family, and Coast Transit ride booking.
              </p>
              <div className="pt-3 border-t border-[#1a6b68]/20 text-xs text-pecan-700 flex items-center justify-between">
                <span>Active Clients</span>
                <strong className="font-bold text-[#124e4b]">
                  {clientRecords.filter(r => (r.formsPacket?.form03?.packageSelected || (r.client.id.includes('084') ? 'Signature' : '')) === 'Signature').length}
                </strong>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Level 3 Service
                </span>
                <span className="font-serif font-bold text-xl text-purple-950">$550<span className="text-xs font-normal text-pecan-600">/mo</span></span>
              </div>
              <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Concierge Care</h3>
              <p className="text-xs text-pecan-600 leading-relaxed mb-4">
                24/7 dedicated Board-Certified Advocate access, weekly in-home visits, pillbox packing, and hospital crisis liaison.
              </p>
              <div className="pt-3 border-t border-sage-100 text-xs text-pecan-700 flex items-center justify-between">
                <span>Active Clients</span>
                <strong className="font-bold text-purple-900">
                  {clientRecords.filter(r => (r.formsPacket?.form03?.packageSelected || (r.client.id.includes('092') ? 'Concierge' : '')) === 'Concierge').length}
                </strong>
              </div>
            </div>
          </div>

          {/* The Granny Doris Porch Fund Community Scholarship Management */}
          <div className="bg-rose-50/70 rounded-3xl p-6 border border-rose-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0 text-rose-600">
                <Heart className="w-6 h-6 fill-rose-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-lg font-bold text-rose-950">
                    The Granny Doris Porch Fund
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 border border-rose-300">
                    Pine Belt Scholarship
                  </span>
                </div>
                <p className="text-rose-900 leading-relaxed max-w-2xl text-xs">
                  “When a neighbor needs help, we make room on the porch.” SouthernWell provides <strong>100% free care coordination</strong> for clients living below the poverty line, and <strong>50% off monthly packages</strong> after their first 6 months. Review the official 8.5 x 11 flyer, process partner church nominations, and monitor community grant distributions.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateToScreen('porchfund')}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-rose-200" />
              <span>Open Porch Fund & Flyer</span>
            </button>
          </div>

          {/* Client Plan Table */}
          <div className="bg-white rounded-3xl border border-sage-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-sage-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-base font-bold text-pecan-900">
                  Client Service Tier & Invoice Status
                </h3>
                <p className="text-xs text-pecan-600">
                  Direct billing schedule for private-pay coordination in Forrest, Lamar, and Jones Counties.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  100% Active Accounts Good Standing
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-sage-50 border-b border-sage-200 text-pecan-800 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Client Name</th>
                    <th className="py-3.5 px-4">County</th>
                    <th className="py-3.5 px-4">Assigned Tier</th>
                    <th className="py-3.5 px-4">Monthly Rate</th>
                    <th className="py-3.5 px-4">Billing Status</th>
                    <th className="py-3.5 px-4">Payment Method</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-100">
                  {clientRecords.map((rec) => {
                    const client = rec.client;
                    const pkg = rec.formsPacket?.form03?.packageSelected || (client.id.includes('084') ? 'Signature' : client.id.includes('092') ? 'Concierge' : 'Essentials');
                    const rate = pkg === 'Concierge' ? '$550.00' : pkg === 'Signature' ? '$325.00' : '$150.00';
                    const invoice = rec.invoices[0];

                    return (
                      <tr key={client.id} className="hover:bg-sage-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-pecan-900 whitespace-nowrap">
                          {client.name}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-pecan-700">
                          {client.county}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            pkg === 'Concierge' ? 'bg-purple-100 text-purple-800' :
                            pkg === 'Signature' ? 'bg-[#e6f3f2] text-[#124e4b]' :
                            'bg-sage-100 text-pecan-800'
                          }`}>
                            {pkg}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-pecan-900 whitespace-nowrap">
                          {rate}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Paid · Auto-Pay</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-pecan-600">
                          {invoice?.paymentMethod || 'Visa ending 4242'}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              onSelectClient(client.id);
                              onNavigateToScreen('billing');
                            }}
                            className="text-[#1a6b68] hover:text-[#124e4b] font-bold hover:underline"
                          >
                            Open Billing →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 6: SOP 3.4 QUALITY AUDIT & COMPLIANCE CHECKLIST */}
      {/* ========================================================= */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sage-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-6 h-6 text-[#1a6b68]" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-pecan-900">
                    SOP 3.4 Operational Compliance & Quality Assurance
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-pecan-700">
                  Mississippi Non-Clinical Case Management & Board Certified Patient Advocacy Regulatory Standard
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-pecan-600 block">Audit Score</span>
                  <span className="text-2xl font-serif font-bold text-[#1a6b68]">
                    {Math.round((auditItems.filter(i => i.verified).length / auditItems.length) * 100)}%
                  </span>
                </div>
                <button
                  onClick={() => onNavigateToScreen('sop')}
                  className="px-3.5 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 font-bold text-xs flex items-center gap-1.5 border border-sage-300 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                  <span>SOP Manual (Rev 2)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-[#1a6b68] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#155755] transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Audit Certification</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {auditItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-sage-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-sage-50/40"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleAuditItem(item.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors ${
                        item.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                      title="Click to toggle audit verification"
                    >
                      {item.verified ? <Check className="w-4 h-4 text-emerald-700" /> : <Clock className="w-4 h-4 text-amber-700" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-pecan-100 text-pecan-800 rounded">
                          {item.code}
                        </span>
                        <span className="font-bold text-sm text-pecan-900">{item.title}</span>
                      </div>
                      <span className="text-xs text-pecan-600 block mt-0.5">
                        Verification status: <strong className={item.verified ? 'text-emerald-800' : 'text-amber-800'}>{item.date}</strong> · Auditor: {item.authority}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleAuditItem(item.id)}
                    className={`text-xs font-bold px-3 py-1 rounded-full text-center shrink-0 cursor-pointer transition-colors ${
                      item.verified ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {item.verified ? 'Passed Audit' : 'Action Required'}
                  </button>
                </div>
              ))}
            </div>

            {/* Certification Statement */}
            <div className="mt-8 pt-6 border-t border-sage-200 text-xs text-pecan-700 leading-relaxed bg-sage-50/70 p-4 rounded-2xl">
              <p className="font-bold text-pecan-900 mb-1">
                South Mississippi Operations Compliance Affirmation:
              </p>
              SouthernWell coordinates strictly within the scope of Mississippi non-clinical case management and Board Certified Patient Advocacy. 
              We do not provide direct medical treatment, nursing interventions, or home healthcare services. All clinical questions and medication alterations are deferred to licensed primary care and specialty physicians.
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD OPERATIONS TASK */}
      {/* ========================================================= */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FDFBF7] rounded-3xl border border-sage-300 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative">
            
            <button
              onClick={() => setIsAddTaskModalOpen(false)}
              className="absolute top-5 right-5 text-pecan-500 hover:text-pecan-900 p-1 rounded-xl hover:bg-sage-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a6b68] px-2.5 py-0.5 rounded-full bg-[#e6f3f2] border border-[#1a6b68]/20 inline-block mb-1">
                Operations Management
              </span>
              <h3 className="font-serif text-xl font-bold text-pecan-900">Create Operational Task</h3>
              <p className="text-xs text-pecan-600">Assign a care coordination follow-up to a South Mississippi client file.</p>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1">Select Client File</label>
                <select
                  value={newTaskClientId}
                  onChange={(e) => setNewTaskClientId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-300 bg-white text-xs font-medium text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                >
                  {clientRecords.map((r) => (
                    <option key={r.client.id} value={r.client.id}>
                      {r.client.name} ({r.client.county} · Case #{r.client.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1">Task Title / Action Item</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule Coast Transit ride confirmation for Tuesday visit"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-pecan-800 mb-1">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-sage-300 bg-white text-xs font-medium text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                  >
                    <option value="Transportation">Transportation</option>
                    <option value="Medication">Medication</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Clinical Debrief">Clinical Debrief</option>
                    <option value="Intake">Intake</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-pecan-800 mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-sage-300 bg-white text-xs font-medium text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1">Target Completion Date</label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1">Operational Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Additional logistics notes, pharmacy contact, or family instruction..."
                  value={newTaskNotes}
                  onChange={(e) => setNewTaskNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                />
              </div>

              <div className="pt-3 border-t border-sage-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-sage-300 text-pecan-700 hover:bg-sage-100 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1a6b68] hover:bg-[#155755] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT CLIENT PROFILE */}
      {/* ========================================================= */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FDFBF7] rounded-3xl border border-sage-300 shadow-2xl max-w-xl w-full p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setEditingClient(null)}
              className="absolute top-5 right-5 text-pecan-500 hover:text-pecan-900 p-1 rounded-xl hover:bg-sage-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a6b68] px-2.5 py-0.5 rounded-full bg-[#e6f3f2] border border-[#1a6b68]/20 inline-block mb-1">
                Client Caseload Management
              </span>
              <h3 className="font-serif text-xl font-bold text-pecan-900">Edit Client: {editingClient.name}</h3>
              <p className="text-xs text-pecan-600">Update South Mississippi demographics, primary contacts, and clinical tags.</p>
            </div>

            <form onSubmit={handleSaveEditClient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-pecan-800 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pecan-800 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-pecan-800 mb-1">County</label>
                  <select
                    value={editFormData.county}
                    onChange={(e) => setEditFormData({ ...editFormData, county: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-sage-300 bg-white text-xs font-medium text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                  >
                    <option value="Forrest County">Forrest County (Hattiesburg)</option>
                    <option value="Lamar County">Lamar County (Purvis / Oak Grove)</option>
                    <option value="Jones County">Jones County (Laurel)</option>
                    <option value="Stone County">Stone County (Wiggins)</option>
                    <option value="Pearl River County">Pearl River County (Picayune)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-pecan-800 mb-1">Preferred Communication</label>
                  <select
                    value={editFormData.preferredCommunication}
                    onChange={(e) => setEditFormData({ ...editFormData, preferredCommunication: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-sage-300 bg-white text-xs font-medium text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                  >
                    <option value="phone">Telephone Call</option>
                    <option value="text">SMS Text Message</option>
                    <option value="email">Email</option>
                    <option value="virtual">Virtual / Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-pecan-800 mb-1">Family Proxy / Representative</label>
                  <input
                    type="text"
                    placeholder="e.g. Dorothy Miller"
                    value={editFormData.representativeName}
                    onChange={(e) => setEditFormData({ ...editFormData, representativeName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pecan-800 mb-1">Relationship</label>
                  <input
                    type="text"
                    placeholder="e.g. Daughter / Healthcare Proxy"
                    value={editFormData.representativeRelation}
                    onChange={(e) => setEditFormData({ ...editFormData, representativeRelation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1">Clinical Conditions (comma separated)</label>
                <input
                  type="text"
                  value={editFormData.conditions}
                  onChange={(e) => setEditFormData({ ...editFormData, conditions: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-sage-300 bg-white text-xs text-pecan-900 focus:outline-none focus:border-[#1a6b68]"
                />
                <span className="text-[10px] text-pecan-500 block mt-1">Example: Hypertension, Osteoarthritis, Mild Cognitive Impairment</span>
              </div>

              <div className="pt-3 border-t border-sage-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2 rounded-xl border border-sage-300 text-pecan-700 hover:bg-sage-100 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1a6b68] hover:bg-[#155755] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DELETE / ARCHIVE CLIENT CONFIRMATION */}
      {/* ========================================================= */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FDFBF7] rounded-3xl border border-rose-300 shadow-2xl max-w-md w-full p-6 relative">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-rose-700" />
            </div>

            <h3 className="font-serif text-xl font-bold text-pecan-900 mb-2">
              Archive Client File?
            </h3>
            <p className="text-xs text-pecan-600 leading-relaxed mb-4">
              Are you sure you want to remove <strong className="text-pecan-900">{clientToDelete.name}</strong> (Case #{clientToDelete.id}) from the active caseload? 
              This will remove active appointments, care plans, and medication logs from the active Operations Hub.
            </p>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-800 mb-5">
              <strong>Notice:</strong> Per Mississippi record retention rules (SOP 6.3), historical chart data must be retained for 7 years.
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2 rounded-xl border border-sage-300 text-pecan-700 hover:bg-sage-100 text-xs font-semibold cursor-pointer transition-colors"
              >
                Keep Active
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteClient}
                className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                Confirm Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TOAST NOTIFICATION */}
      {/* ========================================================= */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3.5 max-w-md ${
            toast.type === 'warning' ? 'bg-amber-900 text-white border-amber-700' :
            toast.type === 'info' ? 'bg-[#124e4b] text-white border-[#1a6b68]' :
            'bg-pecan-900 text-white border-pecan-700'
          }`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              toast.type === 'warning' ? 'bg-amber-700 text-white' :
              toast.type === 'info' ? 'bg-[#1a6b68] text-white' :
              'bg-emerald-600 text-white'
            }`}>
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-xs block text-white">{toast.title}</span>
              <span className="text-[11px] text-sage-200 block">{toast.description}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-sage-300 hover:text-white p-1 rounded-lg"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

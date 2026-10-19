import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Heart, 
  FileText, 
  CheckCircle, 
  Check,
  Plus, 
  AlertCircle,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ClientProfile, Appointment, CoordinationLog, MedicationItem } from '../types';

interface CareHubScreenProps {
  client: ClientProfile;
  allClients?: ClientProfile[];
  onSelectClient?: (clientId: string) => void;
  onOpenOnboardModal?: () => void;
  appointments: Appointment[];
  medications: MedicationItem[];
  coordinationLogs: CoordinationLog[];
  onAddLog: (newLog: CoordinationLog) => void;
  onNavigateToPrep: (aptId?: string) => void;
  onNavigateToHandbook: () => void;
  onNavigateToMedSafety?: () => void;
  onNavigateToForms?: () => void;
  onNavigateToSOP?: () => void;
}

export const CareHubScreen: React.FC<CareHubScreenProps> = ({
  client,
  allClients = [],
  onSelectClient,
  onOpenOnboardModal,
  appointments,
  medications,
  coordinationLogs,
  onAddLog,
  onNavigateToPrep,
  onNavigateToHandbook,
  onNavigateToMedSafety,
  onNavigateToForms,
  onNavigateToSOP,
}) => {
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [newLogType, setNewLogType] = useState<CoordinationLog['type']>('Family Check-in');
  const [newLogSummary, setNewLogSummary] = useState('');
  const [newActionItem, setNewActionItem] = useState('');
  const [actionItemsList, setActionItemsList] = useState<string[]>([]);

  const upcomingAppointments = appointments.filter((a) => a.status === 'upcoming');
  const nextApt = upcomingAppointments[0];

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('');
  };

  const handleAddActionItem = () => {
    if (newActionItem.trim()) {
      setActionItemsList([...actionItemsList, newActionItem.trim()]);
      setNewActionItem('');
    }
  };

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogSummary.trim()) return;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const created: CoordinationLog = {
      id: `log-${Date.now()}`,
      date: today,
      type: newLogType,
      coordinator: `${client.careCoordinator.name}, CSA®`,
      summary: newLogSummary.trim(),
      actionItems: actionItemsList.length > 0 ? actionItemsList : ['Logged by client/family for coordinator review.'],
      sharedWithFamily: true,
    };

    onAddLog(created);
    setNewLogSummary('');
    setActionItemsList([]);
    setShowAddLogModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-in fade-in duration-200">
      
      {/* Client Quick Switcher Bar */}
      {allClients.length > 0 && onSelectClient && (
        <div className="no-print bg-white/90 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-sage-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-pecan-900 uppercase tracking-wide">
              Family Hub Client:
            </span>
            <span className="text-xs text-pecan-600">
              Each client has their own identical Handbook & synchronized Hub
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
                  ) : null}
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

      {/* Top Welcome Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-olive-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-serif text-2xl font-bold shrink-0">
              {getInitials(client.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-pecan-900">
                  {client.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-olive-50 text-olive font-semibold border border-olive/20">
                  Case #{client.id}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sage-100 text-pecan-800">
                  {client.county}
                </span>
              </div>
              {client.representativeName ? (
                <p className="text-xs text-pecan-600">
                  Designated Representative: <strong className="text-pecan-800">{client.representativeName}</strong> ({client.representativeRelation || 'Authorized Proxy'})
                </p>
              ) : (
                <p className="text-xs text-pecan-600">
                  Direct Client Self-Advocacy · Primary Healthcare Contact
                </p>
              )}
              <p className="text-xs text-pecan-600 mt-0.5">
                Client Address: {client.address} · Enrolled {client.enrolledDate}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onNavigateToHandbook}
              className="px-3.5 py-2 rounded-xl bg-sage-50 hover:bg-sage-100 text-pecan-800 text-xs font-semibold border border-sage-200 transition-colors cursor-pointer"
            >
              📖 View {client.name.split(' ')[0]}'s Handbook
            </button>
            {onNavigateToForms && (
              <button
                onClick={onNavigateToForms}
                className="px-3.5 py-2 rounded-xl bg-sage-50 hover:bg-sage-100 text-pecan-800 text-xs font-semibold border border-sage-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-olive" />
                <span>Forms Packet (01–11)</span>
              </button>
            )}
            {onNavigateToSOP && (
              <button
                onClick={onNavigateToSOP}
                className="px-3.5 py-2 rounded-xl bg-sage-50 hover:bg-sage-100 text-pecan-800 text-xs font-semibold border border-sage-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                <span>SOP Manual (Rev 2)</span>
              </button>
            )}
            <button
              onClick={() => setShowAddLogModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Family Note
            </button>
          </div>
        </div>

        {/* Status Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-sage-100 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#faf8f4] border border-sage-200">
            <span className="text-pecan-600 block mb-1">Care Plan Handbook Status</span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${client.acknowledgmentSigned ? 'bg-emerald-600' : 'bg-amber-500'}`}></span>
              <strong className="text-pecan-900 text-sm">
                {client.acknowledgmentSigned ? 'Signed & Compliant' : 'Pending Signature'}
              </strong>
            </div>
            <span className="text-[11px] text-pecan-600 mt-1 block">
              {client.acknowledgmentSigned && client.signatureDate ? `SOP-01 Verified on ${client.signatureDate}` : 'Awaiting digital acknowledgment'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#faf8f4] border border-sage-200">
            <span className="text-pecan-600 block mb-1">Next Coordinated Clinic Visit</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-olive" />
              <strong className="text-pecan-900 text-sm">
                {nextApt ? `${nextApt.date} · ${nextApt.time}` : 'No upcoming visit'}
              </strong>
            </div>
            <span className="text-[11px] text-pecan-600 mt-1 block truncate">
              {nextApt ? `${nextApt.provider} (${nextApt.specialty})` : 'All check-ups up to date'}
            </span>
          </div>

          <div 
            onClick={onNavigateToMedSafety}
            className={`p-3.5 rounded-2xl bg-[#faf8f4] border border-sage-200 transition-all ${
              onNavigateToMedSafety ? 'cursor-pointer hover:border-olive/50 hover:bg-olive-50/20' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-pecan-600 block">Monitored Regimen</span>
              {onNavigateToMedSafety && (
                <span className="text-[10px] text-olive font-bold">⏰ Reminders →</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">💊</span>
              <strong className="text-pecan-900 text-sm">
                {medications.length} Active Prescriptions & OTC
              </strong>
            </div>
            <span className="text-[11px] text-pecan-600 mt-1 block truncate">
              {medications[0]?.pharmacy ? `Synchronized with ${medications[0].pharmacy}` : 'Local Pharmacy Synchronization'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols on LG): Upcoming Care & Recent Logs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Appointment Card */}
          {nextApt && (
            <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-pecan-900">Next Upcoming Visit</h3>
                    <p className="text-xs text-pecan-600">Appointment preparation & family coordination</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToPrep(nextApt.id)}
                  className="text-xs font-bold text-olive hover:underline inline-flex items-center gap-1"
                >
                  Prepare Companion Sheet <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-sage-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-pecan-900 text-sm">{nextApt.provider}</h4>
                    <p className="text-xs text-olive font-medium">{nextApt.specialty} · {nextApt.clinic}</p>
                    <p className="text-xs text-pecan-600 mt-0.5">{nextApt.location}</p>
                  </div>
                  <div className="text-right sm:text-right">
                    <div className="inline-block px-3 py-1 bg-white rounded-xl border border-sage-200 text-xs font-bold text-pecan-900">
                      {nextApt.date} at {nextApt.time}
                    </div>
                    {nextApt.transportationArranged && (
                      <span className="block text-[11px] text-emerald-700 font-semibold mt-1">
                        ✓ Coast Transit Van Confirmed
                      </span>
                    )}
                  </div>
                </div>

                {nextApt.questionsForDoctor.length > 0 && (
                  <div className="pt-2 border-t border-sage-200/60">
                    <span className="text-xs font-bold text-pecan-800 uppercase tracking-wide block mb-1.5">
                      Coordinated Questions for Doctor:
                    </span>
                    <ul className="space-y-1">
                      {nextApt.questionsForDoctor.slice(0, 2).map((q, idx) => (
                        <li key={idx} className="text-xs text-pecan-700 flex items-start gap-2">
                          <span className="text-olive font-bold">•</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Coordination Logs Stream */}
          <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-olive-50 text-olive flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-pecan-900">Coordination Logs & Progress Notes</h3>
                  <p className="text-xs text-pecan-600">SOP-08 Factual routine records & family updates</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddLogModal(true)}
                className="text-xs font-bold text-olive hover:underline"
              >
                + Add Entry
              </button>
            </div>

            <div className="space-y-4">
              {coordinationLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl bg-[#FDFBF7] border border-sage-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-olive-50 text-olive text-[11px] font-bold border border-olive/20">
                        {log.type}
                      </span>
                      <span className="text-xs font-semibold text-pecan-900">{log.coordinator}</span>
                    </div>
                    <span className="text-xs text-pecan-600">{log.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-pecan-800 leading-relaxed mb-3">
                    {log.summary}
                  </p>

                  {log.actionItems && log.actionItems.length > 0 && (
                    <div className="bg-white/80 p-3 rounded-xl border border-sage-100 text-xs">
                      <strong className="block text-pecan-900 font-semibold mb-1 text-[11px] uppercase tracking-wide">
                        Follow-Up Actions:
                      </strong>
                      <ul className="space-y-1">
                        {log.actionItems.map((act, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-pecan-700">
                            <CheckCircle className="w-3.5 h-3.5 text-olive shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Coordinator Card & Wellness Pillars */}
        <div className="space-y-6">
          
          {/* Assigned Care Coordinator Card */}
          <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-olive block mb-2">
              Your Designated Coordinator
            </span>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-olive text-white flex items-center justify-center font-bold text-lg">
                SJ
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-pecan-900">{client.careCoordinator.name}</h4>
                <p className="text-xs text-pecan-600">{client.careCoordinator.credential}</p>
                <p className="text-[11px] text-olive font-semibold">{client.careCoordinator.office}</p>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-sage-100 text-xs">
              {client.careCoordinator.phone ? (
                <a
                  href={`tel:${client.careCoordinator.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sage-50/70 hover:bg-sage-100 text-pecan-900 font-medium transition-colors"
                >
                  <Phone className="w-4 h-4 text-olive" />
                  <span>Call Coordinator: {client.careCoordinator.phone}</span>
                </a>
              ) : (
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sage-50/70 text-pecan-900 font-medium">
                  <User className="w-4 h-4 text-olive" />
                  <span>Direct Desk Liaison: Hattiesburg Hub</span>
                </div>
              )}

              <a
                href={`mailto:${client.careCoordinator.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sage-50/70 hover:bg-sage-100 text-pecan-900 font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-olive" />
                <span>Email: {client.careCoordinator.email}</span>
              </a>
            </div>

            <div className="mt-4 p-3 bg-olive-50 rounded-xl border border-olive/20 text-[11px] text-pecan-800 leading-relaxed">
              Available Monday – Friday, 8:00 AM – 5:00 PM for scheduled care coordination, provider liaison, and family check-ins.
            </div>
          </div>

          {/* Active Health Profile */}
          <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs">
            <h4 className="font-serif text-base font-bold text-pecan-900 mb-3">
              Monitored Chronic Conditions
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {client.conditions.map((cond, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-olive-50 text-olive-900 text-xs font-semibold border border-olive/20"
                >
                  {cond}
                </span>
              ))}
            </div>
            <p className="text-xs text-pecan-600 leading-relaxed">
              Education and routine observation notes are coordinated through Hattiesburg Clinic and Dr. Thornton's office.
            </p>
          </div>

          {/* Emergency reminder card */}
          <div className="bg-rose-50/70 rounded-3xl p-5 border border-rose/30">
            <div className="flex items-center gap-2 text-rose font-bold text-xs uppercase tracking-wide mb-1.5">
              <AlertCircle className="w-4 h-4" />
              Emergency Reminder
            </div>
            <p className="text-xs text-rose-950 font-medium leading-relaxed mb-3">
              SouthernWell provides non-clinical care coordination. In case of acute chest pain, sudden weakness, or urgent crisis:
            </p>
            <div className="flex items-center gap-2">
              <a
                href="tel:911"
                className="px-3 py-1.5 rounded-xl bg-rose text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-xs"
              >
                Call 911
              </a>
              <a
                href="tel:988"
                className="px-3 py-1.5 rounded-xl border border-rose/30 text-rose-800 font-bold text-xs hover:bg-rose-100 transition-colors"
              >
                Crisis Line: 988
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Modal for adding a coordination note */}
      {showAddLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pecan-900/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full border border-sage-200 shadow-2xl p-6 animate-in fade-in zoom-in-95">
            <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Add Family Coordination Note</h3>
            <p className="text-xs text-pecan-600 mb-4">
              Add a record for care coordinator {client.careCoordinator.name} to review and include in {client.name}'s routine summary.
            </p>

            <form onSubmit={handleSaveLog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                  Entry Type
                </label>
                <select
                  value={newLogType}
                  onChange={(e) => setNewLogType(e.target.value as CoordinationLog['type'])}
                  className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-2 focus:ring-olive/40"
                >
                  <option value="Family Check-in">Family Check-in</option>
                  <option value="Medication Review">Medication Observation / Refill</option>
                  <option value="Provider Communication">Doctor / Clinic Follow-up</option>
                  <option value="Monthly Summary">Routine Daily Comfort Note</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                  Observations / Summary
                </label>
                <textarea
                  rows={3}
                  value={newLogSummary}
                  onChange={(e) => setNewLogSummary(e.target.value)}
                  placeholder={`Detail ${client.name}'s recent symptom patterns, question topics, or schedule changes...`}
                  className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-2 focus:ring-olive/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                  Action Item for Coordinator (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newActionItem}
                    onChange={(e) => setNewActionItem(e.target.value)}
                    placeholder="e.g. Call Corner Drug regarding refill"
                    className="flex-1 px-3 py-1.5 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddActionItem}
                    className="px-3 py-1.5 bg-sage-100 hover:bg-sage-200 text-pecan-800 rounded-xl text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
                {actionItemsList.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-pecan-700">
                    {actionItemsList.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-olive" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-sage-200">
                <button
                  type="button"
                  onClick={() => setShowAddLogModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-sage-200 text-xs text-pecan-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 shadow-sm"
                >
                  Save to Care Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

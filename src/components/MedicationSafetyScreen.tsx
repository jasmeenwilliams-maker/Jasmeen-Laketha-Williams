import React, { useState, useEffect, useRef } from 'react';
import { 
  Pill, 
  AlertCircle, 
  Clock, 
  Building2, 
  CheckCircle, 
  RotateCw, 
  ShieldAlert, 
  Plus, 
  Printer,
  Bell,
  BellRing,
  BellOff,
  Check,
  X,
  Volume2,
  VolumeX,
  Calendar,
  Sparkles,
  CheckCheck
} from 'lucide-react';
import { MedicationItem, ClientProfile } from '../types';

interface MedicationSafetyScreenProps {
  client: ClientProfile;
  medications: MedicationItem[];
  onUpdateMedication: (updated: MedicationItem) => void;
  onAddMedication: (item: MedicationItem) => void;
}

export const MedicationSafetyScreen: React.FC<MedicationSafetyScreenProps> = ({
  client,
  medications,
  onUpdateMedication,
  onAddMedication,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'needs_review'>('all');
  
  // Notification states
  const [notificationPermission, setNotificationPermission] = useState<
    'default' | 'granted' | 'denied' | 'unsupported'
  >('default');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeReminderToast, setActiveReminderToast] = useState<{
    medName: string;
    dosage: string;
    time: string;
    timestamp: number;
  } | null>(null);

  // Reminder editing modal state
  const [editingReminderMed, setEditingReminderMed] = useState<MedicationItem | null>(null);
  const [tempTimes, setTempTimes] = useState<string[]>([]);
  const [tempEnabled, setTempEnabled] = useState(true);
  const [customTimeInput, setCustomTimeInput] = useState('08:00');

  // Daily taken status tracking for the current session
  const [takenTracker, setTakenTracker] = useState<Record<string, boolean>>({
    'med-1-08:00': true,
    'med-2-08:30': true,
  });

  // Track triggered minutes to prevent repeat firing in the same minute
  const lastTriggeredMinute = useRef<string>('');

  // Check notification support on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    } else {
      setNotificationPermission('unsupported');
    }
  }, []);

  // Request browser notification permission
  const handleRequestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotificationPermission('unsupported');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setNotificationPermission(result);
      if (result === 'granted') {
        // Send welcoming test notification
        playReminderChime();
        new Notification('🔔 SouthernWell Reminders Enabled', {
          body: `Browser notifications are active for ${client.name}'s daily medication schedule.`,
          icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv-3ntWs936kOOlmlH1M1SV-oHV9Fyyx2uctfZ7xSQ_Sdha-2bObSY2f1ONF5OjE6E9ZqWdmR3K3ZCa4Skk_1VuakkjxQ-lioMiBi5ShRm5cJPhjS9N2auACpbCjV376KGAWnVkS3rV_DGxKw50Z4UzENCM5uWTXHsI9DWs9bAIiryUDEQ8cijZZ4nerueAYixp86FgKMC6-KxYVhpWKFIH1ndcknHxDCUJcLM1uBmX7-Qj5tse9QNBdd08O_-K4ExWfQ',
        });
      }
    } catch (e) {
      console.error('Error requesting notification permission:', e);
    }
  };

  // Harmonious web audio chime generator (no external files needed)
  const playReminderChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      // Tone 1: C5 (523Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.5);

      // Tone 2: E5 (659Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.16);
      gain2.gain.setValueAtTime(0.15, now + 0.16);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.16);
      osc2.stop(now + 0.85);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Format 24-hr time ("08:00") into 12-hr friendly ("8:00 AM")
  const formatTime12h = (time24: string) => {
    if (!time24) return '';
    const [hStr, mStr] = time24.split(':');
    const h = parseInt(hStr, 10);
    const m = mStr || '00';
    if (isNaN(h)) return time24;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${m} ${ampm}`;
  };

  // Trigger both browser notification and in-app toast
  const fireNotification = (med: MedicationItem, timeStr: string) => {
    const formatted = formatTime12h(timeStr);
    playReminderChime();

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        const notif = new Notification(`💊 Medication Reminder · SouthernWell`, {
          body: `Scheduled for ${formatted}: Time for ${client.name}'s ${med.name} (${med.dosage}). ${med.observationNotes || med.frequency}`,
          icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv-3ntWs936kOOlmlH1M1SV-oHV9Fyyx2uctfZ7xSQ_Sdha-2bObSY2f1ONF5OjE6E9ZqWdmR3K3ZCa4Skk_1VuakkjxQ-lioMiBi5ShRm5cJPhjS9N2auACpbCjV376KGAWnVkS3rV_DGxKw50Z4UzENCM5uWTXHsI9DWs9bAIiryUDEQ8cijZZ4nerueAYixp86FgKMC6-KxYVhpWKFIH1ndcknHxDCUJcLM1uBmX7-Qj5tse9QNBdd08O_-K4ExWfQ',
        });
        notif.onclick = () => {
          window.focus();
          notif.close();
        };
      } catch (err) {
        console.warn('Notification trigger warning:', err);
      }
    }

    setActiveReminderToast({
      medName: med.name,
      dosage: med.dosage,
      time: formatted,
      timestamp: Date.now(),
    });
  };

  // Background clock listener checking every 10 seconds
  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentHHMM = `${currentHours}:${currentMinutes}`;

      if (lastTriggeredMinute.current === currentHHMM) return;

      medications.forEach((med) => {
        if (med.reminderEnabled && med.reminderTimes && med.reminderTimes.includes(currentHHMM)) {
          lastTriggeredMinute.current = currentHHMM;
          fireNotification(med, currentHHMM);
        }
      });
    };

    const interval = setInterval(checkSchedule, 10000);
    return () => clearInterval(interval);
  }, [medications, soundEnabled]);

  // Open modal to configure reminder times for a med
  const handleOpenReminderModal = (med: MedicationItem) => {
    setEditingReminderMed(med);
    setTempTimes(med.reminderTimes || ['08:00']);
    setTempEnabled(med.reminderEnabled !== false);
  };

  const handleSaveReminders = () => {
    if (!editingReminderMed) return;
    const sorted = [...tempTimes].sort();
    onUpdateMedication({
      ...editingReminderMed,
      reminderTimes: sorted,
      reminderEnabled: tempEnabled,
    });
    setEditingReminderMed(null);
  };

  const handleAddTempTime = (timeToAdd: string) => {
    if (!tempTimes.includes(timeToAdd)) {
      setTempTimes([...tempTimes, timeToAdd].sort());
    }
  };

  const handleRemoveTempTime = (timeToRemove: string) => {
    setTempTimes(tempTimes.filter((t) => t !== timeToRemove));
  };

  const toggleMedReminderActive = (med: MedicationItem) => {
    onUpdateMedication({
      ...med,
      reminderEnabled: !med.reminderEnabled,
    });
  };

  const toggleTakenStatus = (medId: string, time: string) => {
    const key = `${medId}-${time}`;
    setTakenTracker((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // New med form state
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [purpose, setPurpose] = useState('');
  const [prescribingDoctor, setPrescribingDoctor] = useState('Dr. Raymond Thornton');
  const [pharmacy, setPharmacy] = useState('Corner Drug Co. (Hattiesburg)');
  const [refillDueDate, setRefillDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [newMedReminderTimes, setNewMedReminderTimes] = useState<string[]>(['08:00']);

  const filteredMeds = filterType === 'needs_review'
    ? medications.filter((m) => m.needsReview)
    : medications;

  const handleCreateMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMed: MedicationItem = {
      id: `med-${Date.now()}`,
      name: name.trim(),
      dosage: dosage.trim() || 'Standard',
      frequency: frequency.trim() || 'Daily',
      purpose: purpose.trim() || 'General health maintenance',
      prescribingDoctor: prescribingDoctor.trim() || 'Primary Care Provider',
      pharmacy: pharmacy.trim() || 'Corner Drug Co.',
      refillDueDate: refillDueDate || 'Next month',
      observationNotes: notes.trim() || 'Routine observation noted by family/coordinator.',
      needsReview: false,
      reminderTimes: newMedReminderTimes,
      reminderEnabled: true,
    };

    onAddMedication(newMed);
    setShowAddModal(false);
    setName('');
    setDosage('');
    setFrequency('');
    setPurpose('');
    setRefillDueDate('');
    setNotes('');
    setNewMedReminderTimes(['08:00']);
  };

  const toggleReviewStatus = (med: MedicationItem) => {
    onUpdateMedication({
      ...med,
      needsReview: !med.needsReview,
    });
  };

  // Gather all scheduled daily reminders for the timeline overview
  const allDailySchedules: { med: MedicationItem; time: string }[] = [];
  medications.forEach((med) => {
    if (med.reminderEnabled && med.reminderTimes) {
      med.reminderTimes.forEach((time) => {
        allDailySchedules.push({ med, time });
      });
    }
  });
  allDailySchedules.sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-200">
      
      {/* Active In-App Reminder Notification Toast */}
      {activeReminderToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-full bg-white rounded-2xl border-2 border-olive shadow-2xl p-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-olive text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                <BellRing className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-olive block">
                  Scheduled Daily Reminder ({activeReminderToast.time})
                </span>
                <h4 className="font-serif text-base font-bold text-pecan-900 leading-snug">
                  {client.name}: {activeReminderToast.medName}
                </h4>
                <p className="text-xs text-pecan-700 mt-0.5">
                  Strength / Dosage: {activeReminderToast.dosage}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveReminderToast(null)}
              className="p-1 rounded-lg hover:bg-sage-100 text-pecan-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 pt-2.5 border-t border-sage-100 flex items-center justify-between text-xs">
            <span className="text-pecan-600 text-[11px]">SOP-06 Routine Schedule Sync</span>
            <button
              onClick={() => {
                setActiveReminderToast(null);
              }}
              className="px-3 py-1 bg-olive text-white font-semibold rounded-lg hover:bg-olive-700 transition-colors"
            >
              Acknowledge & Mark
            </button>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-olive px-3 py-1 bg-olive-50 rounded-full border border-olive/20 inline-block">
              Section 07 Tool · Medication Safety & Daily Reminders
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sage-100 text-pecan-800">
              Client: {client.name} (Case #{client.id})
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-pecan-900">
            Medication Observation & Reminder Schedule
          </h1>
          <p className="text-xs sm:text-sm text-pecan-600 mt-1">
            Set daily reminder times with browser notifications and coordinated pharmacy observation for {client.name}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print Schedule
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-sage-200 text-pecan-700 text-xs font-semibold hover:bg-sage-50 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-olive" />
            Add Medication
          </button>
        </div>
      </div>

      {/* Browser Notification Banner & Daily Reminder Controller */}
      <div className="bg-[#FDFBF7] rounded-3xl p-6 border border-sage-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sage-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              notificationPermission === 'granted'
                ? 'bg-olive text-white'
                : 'bg-amber-100 text-amber-900'
            }`}>
              {notificationPermission === 'granted' ? (
                <BellRing className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-bold text-pecan-900">
                  Browser Notification Reminders
                </h3>
                {notificationPermission === 'granted' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Check className="w-3 h-3" /> Active & Scheduled
                  </span>
                ) : notificationPermission === 'denied' ? (
                  <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    Notifications Blocked in Browser
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Permission Needed
                  </span>
                )}
              </div>
              <p className="text-xs text-pecan-600 mt-0.5">
                Receive scheduled sound and screen alerts when Eleanor's daily doses are due.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-white border-sage-200 text-pecan-800 hover:bg-sage-50'
                  : 'bg-sage-100 border-sage-200 text-pecan-600'
              }`}
              title={soundEnabled ? 'Chime sound is enabled' : 'Chime sound is muted'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-olive" />
                  <span className="hidden sm:inline">Chime On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-pecan-600" />
                  <span className="hidden sm:inline">Chime Muted</span>
                </>
              )}
            </button>

            {/* Test Alert Button */}
            <button
              onClick={() => {
                if (medications.length > 0) {
                  fireNotification(medications[0], '08:00');
                }
              }}
              className="px-3 py-2 rounded-xl bg-white border border-sage-200 hover:bg-sage-50 text-pecan-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-olive" />
              <span>Test Alert</span>
            </button>

            {/* Request Permission Button if not granted */}
            {notificationPermission !== 'granted' && (
              <button
                onClick={handleRequestPermission}
                className="px-4 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-sm cursor-pointer"
              >
                Enable Browser Notifications
              </button>
            )}
          </div>
        </div>

        {/* Daily Schedule Timeline (Today's Checklist) */}
        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-olive flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Today's Scheduled Reminders ({allDailySchedules.length} times)
            </span>
            <span className="text-[11px] text-pecan-600">
              Click checkbox to log dose as taken
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {allDailySchedules.map(({ med, time }, idx) => {
              const trackerKey = `${med.id}-${time}`;
              const isTaken = !!takenTracker[trackerKey];
              const timeDisplay = formatTime12h(time);

              return (
                <div
                  key={idx}
                  onClick={() => toggleTakenStatus(med.id, time)}
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                    isTaken
                      ? 'bg-olive-50/80 border-olive/30 text-olive-900'
                      : 'bg-white border-sage-200 text-pecan-800 hover:border-olive/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 transition-colors ${
                      isTaken ? 'bg-olive text-white' : 'border border-sage-200 bg-sage-50 text-pecan-600'
                    }`}>
                      {isTaken ? <Check className="w-3.5 h-3.5" /> : null}
                    </div>
                    <div className="truncate">
                      <strong className={`block truncate ${isTaken ? 'line-through text-pecan-600' : 'text-pecan-900'}`}>
                        {med.name} ({med.dosage})
                      </strong>
                      <span className="text-[11px] text-pecan-600">{med.frequency}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-lg text-[11px] font-bold shrink-0 ${
                    isTaken ? 'bg-olive/10 text-olive' : 'bg-sage-100 text-pecan-900'
                  }`}>
                    {timeDisplay}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mandatory Non-Clinical Scope Notice */}
      <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose/30 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-rose shrink-0 mt-0.5" />
        <div className="text-xs text-rose-950 space-y-1">
          <strong className="block text-sm text-rose-900 font-bold">
            SOP-06 Non-Clinical Observation Boundary
          </strong>
          <p className="leading-relaxed">
            SouthernWell care coordinators provide non-clinical observation, reminder scheduling assistance, and pharmacy refill syncing. 
            Staff members <strong>do not dispense medications, administer injections, or alter prescribed dosages</strong>. All medication adjustments must come directly from your licensed healthcare provider.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-olive text-white shadow-xs'
                : 'bg-white text-pecan-700 border border-sage-200 hover:bg-sage-50'
            }`}
          >
            All Medications ({medications.length})
          </button>
          <button
            onClick={() => setFilterType('needs_review')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              filterType === 'needs_review'
                ? 'bg-olive text-white shadow-xs'
                : 'bg-white text-pecan-700 border border-sage-200 hover:bg-sage-50'
            }`}
          >
            Refill Flags / Needs Review ({medications.filter((m) => m.needsReview).length})
          </button>
        </div>

        <div className="text-xs text-pecan-600">
          Coordinated with Corner Drug Co. & Hattiesburg Clinic
        </div>
      </div>

      {/* Medication Cards Grid with Reminder Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMeds.map((med) => (
          <div
            key={med.id}
            className={`bg-white rounded-3xl p-6 border shadow-xs transition-all relative flex flex-col justify-between ${
              med.needsReview ? 'border-amber-300 ring-1 ring-amber-200' : 'border-sage-200'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-pecan-900">{med.name}</h3>
                    <span className="text-xs font-bold text-olive">{med.dosage}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleReviewStatus(med)}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
                      med.needsReview
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-sage-100 text-pecan-700 hover:bg-sage-200'
                    }`}
                    title="Toggle review flag"
                  >
                    {med.needsReview ? '⚠️ Refill Flag' : 'Routine'}
                  </button>
                </div>
              </div>

              {/* Medication Details */}
              <div className="space-y-2 text-xs text-pecan-800 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-olive shrink-0" />
                  <span><strong>Schedule:</strong> {med.frequency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-olive font-bold">•</span>
                  <span><strong>Purpose:</strong> {med.purpose}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-olive shrink-0" />
                  <span><strong>Pharmacy:</strong> {med.pharmacy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-olive font-bold">•</span>
                  <span><strong>Prescriber:</strong> {med.prescribingDoctor}</span>
                </div>
              </div>

              {/* Reminder Times Config Block on Card */}
              <div className="p-3.5 bg-[#FAF8F4] rounded-2xl border border-sage-200 text-xs mb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-pecan-900">
                    <Bell className="w-3.5 h-3.5 text-olive" />
                    <span>Daily Reminder Times:</span>
                  </div>
                  
                  {/* Active / Muted Toggle */}
                  <button
                    onClick={() => toggleMedReminderActive(med)}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${
                      med.reminderEnabled
                        ? 'bg-olive-50 text-olive border-olive/30'
                        : 'bg-sage-100 text-pecan-600 border-sage-200'
                    }`}
                    title="Toggle daily alert notifications"
                  >
                    {med.reminderEnabled ? '🔔 Alert On' : '🔕 Alert Off'}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {med.reminderTimes && med.reminderTimes.length > 0 ? (
                    med.reminderTimes.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-white border border-sage-200 text-pecan-900 font-bold text-xs shadow-2xs"
                      >
                        {formatTime12h(t)}
                      </span>
                    ))
                  ) : (
                    <span className="text-pecan-600 italic">No reminder times set</span>
                  )}
                  
                  <button
                    onClick={() => handleOpenReminderModal(med)}
                    className="px-2.5 py-1 rounded-xl bg-olive-50 hover:bg-olive-100 text-olive font-bold text-xs border border-olive/20 transition-colors cursor-pointer"
                  >
                    + Edit Times
                  </button>
                </div>
              </div>

              {/* Routine Observation Notes */}
              <div className="p-3 bg-white rounded-xl border border-sage-200 text-xs">
                <span className="font-semibold text-pecan-900 block mb-0.5">Routine Observation Notes:</span>
                <span className="text-pecan-700">{med.observationNotes}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between text-xs">
              <span className="text-pecan-600">
                Refill Due: <strong className="text-pecan-900">{med.refillDueDate}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fireNotification(med, med.reminderTimes?.[0] || '08:00')}
                  className="text-pecan-600 hover:text-olive font-semibold transition-colors cursor-pointer"
                  title="Fire a test notification for this medication"
                >
                  Test Alert
                </button>
                <span className="text-sage-300">·</span>
                <button
                  onClick={() => toggleReviewStatus(med)}
                  className="text-olive font-semibold hover:underline cursor-pointer"
                >
                  {med.needsReview ? 'Mark Refill Synchronized' : 'Flag Refill'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reminder Times Configuration Modal */}
      {editingReminderMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pecan-900/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full border border-sage-200 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-sage-200 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-bold">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-pecan-900">
                    Set Daily Reminder Times
                  </h3>
                  <p className="text-xs text-pecan-600">
                    {editingReminderMed.name} ({editingReminderMed.dosage})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingReminderMed(null)}
                className="p-1 rounded-xl hover:bg-sage-100 text-pecan-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Enable / Disable Alert Toggle */}
              <div className="p-3.5 bg-white rounded-2xl border border-sage-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-pecan-900 block">Daily Alerts Active</span>
                  <span className="text-pecan-600 text-[11px]">Send browser popup & gentle chime when due</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTempEnabled(!tempEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    tempEnabled ? 'bg-olive' : 'bg-sage-200'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                      tempEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Current Configured Times */}
              <div>
                <label className="block font-bold text-pecan-800 mb-1.5 uppercase tracking-wide">
                  Configured Daily Times:
                </label>
                {tempTimes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tempTimes.map((time, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-sage-200 text-pecan-900 font-bold shadow-2xs"
                      >
                        <span>{formatTime12h(time)}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTempTime(time)}
                          className="text-pecan-600 hover:text-rose p-0.5 cursor-pointer"
                          title="Remove time"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-pecan-600 italic">No times set yet. Add a time below.</p>
                )}
              </div>

              {/* Add Custom Time */}
              <div className="p-3.5 bg-sage-50/70 rounded-2xl border border-sage-200">
                <label className="block font-bold text-pecan-800 mb-1.5 uppercase tracking-wide">
                  Add Specific Time
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={customTimeInput}
                    onChange={(e) => setCustomTimeInput(e.target.value)}
                    className="px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTempTime(customTimeInput)}
                    className="px-3.5 py-2 rounded-xl bg-olive text-white font-bold hover:bg-olive-700 transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Time</span>
                  </button>
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block font-bold text-pecan-800 mb-1.5 uppercase tracking-wide">
                  Quick Meal / Routine Presets:
                </label>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleAddTempTime('08:00')}
                    className="p-2 rounded-xl bg-white border border-sage-200 text-left hover:border-olive/50 transition-colors cursor-pointer"
                  >
                    <strong>🌅 Morning (8:00 AM)</strong>
                    <span className="block text-pecan-600 text-[10px]">With breakfast</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTempTime('12:30')}
                    className="p-2 rounded-xl bg-white border border-sage-200 text-left hover:border-olive/50 transition-colors cursor-pointer"
                  >
                    <strong>☀️ Midday (12:30 PM)</strong>
                    <span className="block text-pecan-600 text-[10px]">With lunch</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTempTime('18:30')}
                    className="p-2 rounded-xl bg-white border border-sage-200 text-left hover:border-olive/50 transition-colors cursor-pointer"
                  >
                    <strong>🍽️ Evening (6:30 PM)</strong>
                    <span className="block text-pecan-600 text-[10px]">With supper</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddTempTime('21:00')}
                    className="p-2 rounded-xl bg-white border border-sage-200 text-left hover:border-olive/50 transition-colors cursor-pointer"
                  >
                    <strong>🌙 Bedtime (9:00 PM)</strong>
                    <span className="block text-pecan-600 text-[10px]">Before rest</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-olive-50 rounded-xl border border-olive/20 text-[11px] text-pecan-800 leading-relaxed">
                Reminders will fire automatically via browser notifications and audio chimes at each chosen daily time.
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-sage-200">
              <button
                type="button"
                onClick={() => fireNotification(editingReminderMed, tempTimes[0] || '08:00')}
                className="text-xs font-semibold text-olive hover:underline cursor-pointer"
              >
                Send Test Alert Now
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingReminderMed(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-sage-200 text-xs text-pecan-700 cursor-pointer hover:bg-sage-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveReminders}
                  className="px-4 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-sm cursor-pointer"
                >
                  Save Reminders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pecan-900/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full border border-sage-200 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">Add Medication to Observation Log</h3>
            <p className="text-xs text-pecan-600 mb-4">
              Add a prescription or over-the-counter supplement with daily notification reminder times.
            </p>

            <form onSubmit={handleCreateMed} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. CoQ10 or Amlodipine"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Strength / Dosage
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 5 mg"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                  Frequency / Instructions
                </label>
                <input
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. Once daily with evening meal"
                  className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                />
              </div>

              {/* Reminder Time Picker in Add Form */}
              <div className="p-3 bg-white rounded-xl border border-sage-200">
                <label className="block font-bold text-pecan-800 mb-1.5 uppercase tracking-wide">
                  Daily Reminder Notification Times
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {newMedReminderTimes.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-olive-50 border border-olive/20 text-olive font-bold text-xs"
                    >
                      {formatTime12h(t)}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {['08:00', '12:30', '18:30', '21:00'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        if (newMedReminderTimes.includes(preset)) {
                          setNewMedReminderTimes(newMedReminderTimes.filter((x) => x !== preset));
                        } else {
                          setNewMedReminderTimes([...newMedReminderTimes, preset].sort());
                        }
                      }}
                      className={`px-2 py-1 rounded-lg border text-[11px] font-semibold cursor-pointer transition-colors ${
                        newMedReminderTimes.includes(preset)
                          ? 'bg-olive text-white border-olive'
                          : 'bg-sage-50 text-pecan-700 border-sage-200'
                      }`}
                    >
                      {formatTime12h(preset)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Health Purpose
                  </label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g. Blood pressure"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Refill Due Date
                  </label>
                  <input
                    type="text"
                    value={refillDueDate}
                    onChange={(e) => setRefillDueDate(e.target.value)}
                    placeholder="e.g. Dec 10, 2026"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Prescribing Doctor
                  </label>
                  <input
                    type="text"
                    value={prescribingDoctor}
                    onChange={(e) => setPrescribingDoctor(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Pharmacy
                  </label>
                  <input
                    type="text"
                    value={pharmacy}
                    onChange={(e) => setPharmacy(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                  Observation / Special Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Take with 8oz water; avoid taking at bedtime."
                  className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-sage-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-sage-200 text-pecan-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-olive text-white font-bold hover:bg-olive-700 shadow-sm cursor-pointer"
                >
                  Save to Regimen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

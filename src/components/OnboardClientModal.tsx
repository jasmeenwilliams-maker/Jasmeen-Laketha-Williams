import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  UserPlus, 
  Heart, 
  MapPin, 
  UserCheck, 
  ShieldCheck, 
  Pill, 
  Calendar, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  Phone, 
  Mail, 
  Sparkles, 
  AlertCircle, 
  FileText, 
  Stethoscope, 
  Clock, 
  RefreshCw,
  Check,
  CheckCircle2,
  User,
  Car,
  QrCode,
  FileSpreadsheet,
  ExternalLink,
  Printer,
  Copy
} from 'lucide-react';
import { ClientRecord, ClientProfile, Appointment, MedicationItem, CoordinationLog, InvoiceItem } from '../types';

interface OnboardClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (newRecord: ClientRecord) => void;
}

type TabKey = 'demographics' | 'coordination' | 'health' | 'medications' | 'appointment';

interface StarterMedState {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  prescribingDoctor: string;
  pharmacy: string;
  refillDueDate: string;
  reminderTime: string;
  reminderEnabled: boolean;
}

const COMMON_CONDITIONS = [
  'Hypertension',
  'Type 2 Diabetes',
  'Mild Osteoarthritis',
  'Congestive Heart Failure',
  'Memory Care / Mild Dementia',
  'COPD / Respiratory',
  'Fall Risk & Mobility Support',
  'Post-Hospital Transition',
  'Neuropathy',
  'Glaucoma / Vision Impairment',
  'Osteoporosis',
  'Chronic Kidney Disease',
];

const PRESET_CLIENTS = [
  {
    label: 'Clara Mae Davis',
    tag: 'Forrest Co · Hattiesburg',
    name: 'Clara Mae Davis',
    dob: '1946-04-18',
    phone: '601-583-1944',
    county: 'Forrest County',
    address: '418 Live Oak Lane, Hattiesburg, MS 39402',
    repName: 'Karen Davis Hayes',
    repRelation: 'Daughter / Designated Healthcare Proxy',
    repPhone: '601-270-4491',
    comm: 'phone' as const,
    coordinator: 'jasmeen' as const,
    tier: 'standard' as const,
    conditions: ['Hypertension', 'Mild Osteoarthritis', 'Osteoporosis'],
    allergies: 'Penicillin, Sulfa drugs',
    notes: 'Family requests appointment transport advocacy and weekly medication routine checks.',
    meds: [
      {
        id: 'med-preset-1',
        name: 'Lisinopril',
        dosage: '20 mg',
        frequency: 'Once daily in the morning',
        purpose: 'Blood pressure regulation',
        prescribingDoctor: 'Dr. Raymond Thornton, MD',
        pharmacy: 'Corner Drug Co. (Hattiesburg)',
        refillDueDate: 'Nov 28, 2026',
        reminderTime: '08:00',
        reminderEnabled: true,
      },
      {
        id: 'med-preset-2',
        name: 'Meloxicam',
        dosage: '7.5 mg',
        frequency: 'Once daily with breakfast',
        purpose: 'Osteoarthritis knee & hip comfort',
        prescribingDoctor: 'Dr. Marcus Vance, DO',
        pharmacy: 'Corner Drug Co. (Hattiesburg)',
        refillDueDate: 'Dec 05, 2026',
        reminderTime: '08:30',
        reminderEnabled: true,
      },
      {
        id: 'med-preset-3',
        name: 'Calcium 600mg + Vitamin D3',
        dosage: '1 tablet',
        frequency: 'Once daily with midday meal',
        purpose: 'Bone density maintenance',
        prescribingDoctor: 'Primary Physician Recommendation',
        pharmacy: 'Over-the-counter',
        refillDueDate: 'Jan 15, 2027',
        reminderTime: '12:30',
        reminderEnabled: false,
      },
    ],
    apt: {
      provider: 'Dr. Raymond Thornton, MD',
      specialty: 'Cardiology & Preventive Care',
      clinic: 'Hattiesburg Clinic Heart Center',
      date: '2026-11-18',
      time: '10:30 AM',
      transportation: true,
      reason: 'Routine quarterly cardiovascular review and blood pressure check',
      questions: 'Review morning blood pressure readings and tolerability of Lisinopril.',
    },
  },
  {
    label: 'Arthur "Ray" Montgomery',
    tag: 'Lamar Co · Purvis',
    name: 'Arthur Ray Montgomery',
    dob: '1942-11-09',
    phone: '601-794-5512',
    county: 'Lamar County',
    address: '215 Pecan Orchard Rd, Purvis, MS 39475',
    repName: 'David Montgomery',
    repRelation: 'Son / Authorized Family Representative',
    repPhone: '601-325-8820',
    comm: 'text' as const,
    coordinator: 'rn' as const,
    tier: 'transition' as const,
    conditions: ['Type 2 Diabetes', 'Congestive Heart Failure', 'Memory Care / Mild Dementia'],
    allergies: 'No known drug allergies (NKDA)',
    notes: 'Recently transitioned home from rehabilitation; daughter and son managing shared care schedule.',
    meds: [
      {
        id: 'med-preset-4',
        name: 'Metformin HCl',
        dosage: '500 mg',
        frequency: 'Twice daily with morning and evening meals',
        purpose: 'Glucose stabilization',
        prescribingDoctor: 'Dr. Marcus Vance, DO',
        pharmacy: 'Purvis Pharmacy & Wellness',
        refillDueDate: 'Nov 22, 2026',
        reminderTime: '08:00',
        reminderEnabled: true,
      },
      {
        id: 'med-preset-5',
        name: 'Furosemide',
        dosage: '20 mg',
        frequency: 'Once daily at 8:00 AM',
        purpose: 'Fluid balance and heart failure management',
        prescribingDoctor: 'Dr. Gregory Palmer, MD',
        pharmacy: 'Purvis Pharmacy & Wellness',
        refillDueDate: 'Nov 16, 2026',
        reminderTime: '08:00',
        reminderEnabled: true,
      },
    ],
    apt: {
      provider: 'Dr. Gregory Palmer, MD',
      specialty: 'Heart Failure & Clinical Cardiology',
      clinic: 'Pine Belt Heart Associates',
      date: '2026-11-24',
      time: '09:15 AM',
      transportation: true,
      reason: 'Post-discharge 30-day heart failure wellness follow-up and weight log inspection',
      questions: 'Confirm dry weight targets and electrolyte lab frequency.',
    },
  },
  {
    label: 'Gladys Pearl Smith',
    tag: 'Jones Co · Laurel',
    name: 'Gladys Pearl Smith',
    dob: '1947-08-22',
    phone: '601-428-3390',
    county: 'Jones County',
    address: '512 Euclid Avenue, Laurel, MS 39440',
    repName: 'Brenda Smith Wallace',
    repRelation: 'Niece / Healthcare Proxy',
    repPhone: '601-649-7102',
    comm: 'phone' as const,
    coordinator: 'jasmeen' as const,
    tier: 'wellness' as const,
    conditions: ['Hypertension', 'Fall Risk & Mobility Support', 'Mild Osteoarthritis'],
    allergies: 'Aspirin (causes stomach irritation)',
    notes: 'Lives independently in historic Laurel district; desires companion support for grocery and clinic check-ins.',
    meds: [
      {
        id: 'med-preset-6',
        name: 'Amlodipine',
        dosage: '5 mg',
        frequency: 'Once daily in the morning',
        purpose: 'Blood pressure maintenance',
        prescribingDoctor: 'Dr. Claire Montgomery, MD',
        pharmacy: 'Laurel Family Medicine Pharmacy',
        refillDueDate: 'Dec 12, 2026',
        reminderTime: '08:30',
        reminderEnabled: true,
      },
    ],
    apt: {
      provider: 'Dr. Marcus Vance, DO',
      specialty: 'Internal Medicine / Geriatric Care',
      clinic: 'South Mississippi Medical Group',
      date: '2026-11-30',
      time: '02:00 PM',
      transportation: false,
      reason: 'Annual wellness exam and mobility fall prevention discussion',
      questions: 'Discuss physical therapy referral for balance strengthening.',
    },
  },
];

export const OnboardClientModal: React.FC<OnboardClientModalProps> = ({
  isOpen,
  onClose,
  onAddClient,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('demographics');

  // Demographics & Contact
  const [name, setName] = useState('');
  const [dob, setDob] = useState('1946-05-14');
  const [phone, setPhone] = useState('601-');
  const [county, setCounty] = useState('Forrest County');
  const [address, setAddress] = useState('Hattiesburg, MS');
  const [preferredCommunication, setPreferredCommunication] = useState<'phone' | 'text' | 'email' | 'virtual'>('phone');
  
  // Proxy / Representative
  const [representativeName, setRepresentativeName] = useState('');
  const [representativeRelation, setRepresentativeRelation] = useState('Daughter / Designated Healthcare Proxy');
  const [representativePhone, setRepresentativePhone] = useState('');

  // Coordination & Service Tier
  const [coordinatorChoice, setCoordinatorChoice] = useState<'jasmeen' | 'rn' | 'lcsw' | 'custom'>('jasmeen');
  const [customCoordName, setCustomCoordName] = useState('Jasmeen Williams');
  const [customCoordCred, setCustomCoordCred] = useState('LPN, BS-HHS, Owner and Care Coordinator');
  const [packageTier, setPackageTier] = useState<'standard' | 'transition' | 'wellness'>('standard');
  const [intakeGoalNotes, setIntakeGoalNotes] = useState('Establish regular medication reminder schedule, accompany client to primary appointments, and keep family representative informed weekly.');
  const [syncToGoogleSheet, setSyncToGoogleSheet] = useState(true);
  const [createdRecord, setCreatedRecord] = useState<ClientRecord | null>(null);
  const [copiedQrLink, setCopiedQrLink] = useState(false);

  // Health & Conditions
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['Hypertension', 'Mild Osteoarthritis']);
  const [customConditionInput, setCustomConditionInput] = useState('');
  const [allergiesInput, setAllergiesInput] = useState('No known drug allergies (NKDA)');

  // Starter Medications List (dynamic!)
  const [medications, setMedications] = useState<StarterMedState[]>([
    {
      id: `med-${Date.now()}-1`,
      name: 'Lisinopril',
      dosage: '10 mg',
      frequency: 'Once daily in the morning',
      purpose: 'Blood pressure control',
      prescribingDoctor: 'Primary Physician',
      pharmacy: 'Local Community Pharmacy',
      refillDueDate: 'Next month',
      reminderTime: '08:00',
      reminderEnabled: true,
    },
  ]);

  // Initial Appointment
  const [includeAppointment, setIncludeAppointment] = useState(true);
  const [aptProvider, setAptProvider] = useState('Dr. Marcus Vance, DO');
  const [aptSpecialty, setAptSpecialty] = useState('Internal Medicine & Geriatric Care');
  const [aptClinic, setAptClinic] = useState('Forrest General Clinic Network');
  const [aptDate, setAptDate] = useState('2026-11-20');
  const [aptTime, setAptTime] = useState('10:00 AM');
  const [aptTransportation, setAptTransportation] = useState(true);
  const [aptReason, setAptReason] = useState('Comprehensive non-clinical intake health history and care plan sync');
  const [aptQuestions, setAptQuestions] = useState('Review current medication regimen, refill schedule, and home safety recommendations.');

  if (!isOpen) return null;

  // Toggle condition chip
  const toggleCondition = (cond: string) => {
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  // Add custom condition
  const handleAddCustomCondition = () => {
    if (!customConditionInput.trim()) return;
    if (!selectedConditions.includes(customConditionInput.trim())) {
      setSelectedConditions((prev) => [...prev, customConditionInput.trim()]);
    }
    setCustomConditionInput('');
  };

  // Medication handlers
  const handleAddMedication = () => {
    const newMed: StarterMedState = {
      id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: '',
      dosage: 'Standard dose',
      frequency: 'Once daily in the morning',
      purpose: 'Wellness maintenance',
      prescribingDoctor: 'Primary Physician',
      pharmacy: 'Local Community Pharmacy',
      refillDueDate: 'In 30 days',
      reminderTime: '08:00',
      reminderEnabled: true,
    };
    setMedications((prev) => [...prev, newMed]);
  };

  const handleUpdateMed = (id: string, field: keyof StarterMedState, value: any) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleRemoveMed = (id: string) => {
    if (medications.length <= 1) {
      setMedications([
        {
          id: `med-${Date.now()}`,
          name: '',
          dosage: '',
          frequency: 'Once daily',
          purpose: '',
          prescribingDoctor: '',
          pharmacy: '',
          refillDueDate: '',
          reminderTime: '08:00',
          reminderEnabled: false,
        },
      ]);
      return;
    }
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  // Load a preset
  const handleLoadPreset = (preset: typeof PRESET_CLIENTS[0]) => {
    setName(preset.name);
    setDob(preset.dob);
    setPhone(preset.phone);
    setCounty(preset.county);
    setAddress(preset.address);
    setRepresentativeName(preset.repName);
    setRepresentativeRelation(preset.repRelation);
    setRepresentativePhone(preset.repPhone);
    setPreferredCommunication(preset.comm);
    setCoordinatorChoice(preset.coordinator);
    setPackageTier(preset.tier);
    setSelectedConditions(preset.conditions);
    setAllergiesInput(preset.allergies);
    setIntakeGoalNotes(preset.notes);
    setMedications(preset.meds);
    setIncludeAppointment(true);
    setAptProvider(preset.apt.provider);
    setAptSpecialty(preset.apt.specialty);
    setAptClinic(preset.apt.clinic);
    setAptDate(preset.apt.date);
    setAptTime(preset.apt.time);
    setAptTransportation(preset.apt.transportation);
    setAptReason(preset.apt.reason);
    setAptQuestions(preset.apt.questions);
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setActiveTab('demographics');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = `SW-MS-2026-${randomSuffix}`;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    // Coordinator resolution
    let careCoordinator = {
      name: 'Jasmeen Williams',
      credential: 'LPN, BS-HHS, Owner and Care Coordinator',
      phone: '601-554-6067',
      email: 'care@southernwell.org',
      office: 'Hattiesburg Hub · Forrest, Lamar, Jones & Stone Counties, MS',
    };

    if (coordinatorChoice === 'rn') {
      careCoordinator = {
        name: 'Consulting RN Reviewer',
        credential: 'RN, BSN, CCM, Clinical Oversight Consultant',
        phone: '601-554-6067',
        email: 'clinical@southernwell.org',
        office: 'Advisory Clinical Oversight, South Mississippi',
      };
    } else if (coordinatorChoice === 'lcsw') {
      careCoordinator = {
        name: 'Consulting LCSW',
        credential: 'MSW, LCSW, Family Support Specialist',
        phone: '601-554-6067',
        email: 'familysupport@southernwell.org',
        office: 'Family Support Program, Pine Belt Region, MS',
      };
    } else if (coordinatorChoice === 'custom' && customCoordName.trim()) {
      careCoordinator = {
        name: customCoordName.trim(),
        credential: customCoordCred.trim() || 'Care Coordinator',
        phone: '601-554-6067',
        email: 'care@southernwell.org',
        office: `${county.replace(' County', '')} Hub, MS`,
      };
    }

    const conditionsList = selectedConditions.length > 0 
      ? selectedConditions 
      : ['General Wellness Monitoring'];

    const qrPortalUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}?client=${newId}` 
      : `https://southernwell.org/portal?client=${newId}`;

    const newClient: ClientProfile = {
      id: newId,
      name: name.trim(),
      representativeName: representativeName.trim() || undefined,
      representativeRelation: representativeName.trim() ? representativeRelation : undefined,
      dob: dob || 'Not Specified',
      phone: phone || '601-554-6067',
      address: address || `${county}, MS`,
      county,
      careCoordinator,
      enrolledDate: today,
      acknowledgmentSigned: false,
      signerName: '',
      preferredCommunication,
      conditions: conditionsList,
      qrPortalUrl,
      googleSheetSynced: syncToGoogleSheet,
      googleSheetSyncedAt: syncToGoogleSheet ? today : undefined,
      gate1Status: 'verified',
      gate2Status: 'verified',
    };

    // Filter valid medications
    const validMeds: MedicationItem[] = medications
      .filter((m) => m.name.trim().length > 0)
      .map((m, idx) => ({
        id: `med-${Date.now()}-${idx + 1}`,
        name: m.name.trim(),
        dosage: m.dosage.trim() || 'Daily',
        frequency: m.frequency.trim() || 'Once daily in morning',
        purpose: m.purpose.trim() || 'Wellness maintenance',
        prescribingDoctor: m.prescribingDoctor.trim() || 'Primary Physician',
        pharmacy: m.pharmacy.trim() || 'Community Pharmacy',
        refillDueDate: m.refillDueDate.trim() || 'In 30 days',
        observationNotes: `Initiated upon onboarding. Monitored on family schedule.`,
        needsReview: false,
        reminderTimes: m.reminderTime ? [m.reminderTime] : ['08:00'],
        reminderEnabled: m.reminderEnabled,
      }));

    // Initial appointment
    const initialAppointments: Appointment[] = includeAppointment && aptProvider.trim()
      ? [
          {
            id: `apt-${Date.now()}-1`,
            provider: aptProvider.trim(),
            specialty: aptSpecialty.trim() || 'Primary Care & Family Medicine',
            clinic: aptClinic.trim() || `${county.replace(' County', '')} Medical Clinic`,
            date: aptDate || '2026-11-20',
            time: aptTime || '10:00 AM',
            location: `${address || county}, MS`,
            transportationArranged: aptTransportation,
            symptomsToDiscuss: aptReason.trim()
              ? [aptReason.trim()]
              : ['Initial care coordination health history intake'],
            questionsForDoctor: aptQuestions.trim()
              ? [aptQuestions.trim()]
              : ['Review current medications and care plan goals'],
            prepNotes: `Intake companion sheet prepared by ${careCoordinator.name}. Accompaniment confirmed.`,
            status: 'upcoming',
          },
        ]
      : [];

    // Initial logs
    const initialLogs: CoordinationLog[] = [
      {
        id: `log-${Date.now()}-1`,
        date: today,
        type: 'Monthly Summary',
        coordinator: `${careCoordinator.name}, ${careCoordinator.credential}`,
        summary: `Client officially onboarded into SouthernWell Case Management Services (${packageTier.toUpperCase()} Tier). Personalized Client Handbook generated and awaiting family acknowledgment review. Intake goals: ${intakeGoalNotes}`,
        actionItems: [
          'Review Official Handbook and obtain signed family acknowledgment.',
          'Verify initial medication schedule and reminder times with client / proxy.',
          includeAppointment ? `Confirm transportation and companion notes for ${aptProvider} visit on ${aptDate}.` : 'Schedule initial in-home wellness check-in.',
        ],
        sharedWithFamily: true,
      },
    ];

    // Initial Invoice according to package tier
    let invoiceServices = [
      { description: 'Comprehensive Non-Clinical Intake & Handbook Orientation', hours: 4, rate: 65, amount: 260 },
    ];
    let invoiceTotal = 260;

    if (packageTier === 'transition') {
      invoiceServices = [
        { description: 'Post-Acute Hospital Care Transition & Intake Assessment', hours: 4, rate: 65, amount: 260 },
        { description: 'Medication Reconciliation Companion & Physician Coordination', hours: 2, rate: 60, amount: 120 },
      ];
      invoiceTotal = 380;
    } else if (packageTier === 'wellness') {
      invoiceServices = [
        { description: 'Routine Senior Wellness Intake & Family Hub Setup', hours: 3, rate: 60, amount: 180 },
      ];
      invoiceTotal = 180;
    }

    const initialInvoices: InvoiceItem[] = [
      {
        id: `inv-${Date.now()}-1`,
        invoiceNumber: `SW-2026-${randomSuffix}`,
        date: today,
        dueDate: '15 days from enrollment',
        period: 'Onboarding & Comprehensive Care Assessment',
        services: invoiceServices,
        total: invoiceTotal,
        status: 'pending',
      },
    ];

    const newRecord: ClientRecord = {
      client: newClient,
      appointments: initialAppointments,
      medications: validMeds,
      coordinationLogs: initialLogs,
      invoices: initialInvoices,
    };

    onAddClient(newRecord);
    setCreatedRecord(newRecord);
  };

  if (createdRecord) {
    const c = createdRecord.client;
    const portalUrl = c.qrPortalUrl || (typeof window !== 'undefined' ? `${window.location.origin}?client=${c.id}` : `https://southernwell.org/portal?client=${c.id}`);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-pecan-900/65 backdrop-blur-xs overflow-y-auto no-print-backdrop">
        <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full border border-sage-200 shadow-2xl p-6 sm:p-7 animate-in fade-in zoom-in-95 my-6 text-center space-y-4">
          
          <div className="flex items-center justify-between border-b border-sage-200 pb-3 no-print">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </span>
              <div className="text-left">
                <h3 className="font-serif text-lg font-bold text-pecan-900">
                  Patient Enrolled Successfully!
                </h3>
                <p className="text-xs text-pecan-600">
                  Assigned QR Portal Scan Pass & Synced to Google Sheet
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-xl hover:bg-sage-100 text-pecan-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Printable Refrigerator QR Card */}
          <div className="bg-white p-5 rounded-2xl border-2 border-olive/30 shadow-xs text-center space-y-3">
            <div className="flex items-center justify-between text-left border-b border-sage-100 pb-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-olive tracking-wider block">
                  Official Patient QR Pass
                </span>
                <span className="font-serif text-base font-bold text-pecan-900 block">
                  {c.name}
                </span>
                <span className="text-xs text-pecan-600">
                  Case #{c.id} · {c.county}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Gate 1 & 2 Active
              </span>
            </div>

            <div className="py-2 flex flex-col items-center justify-center">
              <div className="p-3 bg-white rounded-2xl border-2 border-olive/40 shadow-sm inline-block">
                <QRCodeSVG
                  value={portalUrl}
                  size={160}
                  level="H"
                  imageSettings={{
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-3ntWs936kOOlmlH1M1SV-oHV9Fyyx2uctfZ7xSQ_Sdha-2bObSY2f1ONF5OjE6E9ZqWdmR3K3ZCa4Skk_1VuakkjxQ-lioMiBi5ShRm5cJPhjS9N2auACpbCjV376KGAWnVkS3rV_DGxKw50Z4UzENCM5uWTXHsI9DWs9bAIiryUDEQ8cijZZ4nerueAYixp86FgKMC6-KxYVhpWKFIH1ndcknHxDCUJcLM1uBmX7-Qj5tse9QNBdd08O_-K4ExWfQ",
                    x: undefined,
                    y: undefined,
                    height: 28,
                    width: 28,
                    excavate: true,
                  }}
                />
              </div>
              <p className="text-xs text-pecan-700 font-semibold mt-2 max-w-xs">
                Point smartphone camera here to view {c.name.split(' ')[0]}'s Handbook & Hub
              </p>
            </div>

            {/* Google Sheet Sync badge */}
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-left text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-900 font-medium">
                  Linked to Google Sheet Master Register
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                Live Row Created
              </span>
            </div>

            <div className="text-[11px] text-pecan-600 text-left pt-1 flex items-center justify-between">
              <span>Coordinator: <strong>{c.careCoordinator.name}</strong></span>
              <span className="font-mono text-olive font-bold">601-554-6067</span>
            </div>
          </div>

          {/* Action row */}
          <div className="p-2 bg-white rounded-xl border border-sage-200 flex items-center justify-between text-xs no-print">
            <span className="truncate font-mono text-[11px] text-pecan-700 max-w-[260px]">
              {portalUrl}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(portalUrl);
                setCopiedQrLink(true);
                setTimeout(() => setCopiedQrLink(false), 2000);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sage-100 hover:bg-sage-200 text-pecan-800 font-bold transition-colors cursor-pointer text-xs shrink-0"
            >
              {copiedQrLink ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-olive" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 no-print">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 font-bold text-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-olive" />
              <span>Print Refrigerator Card</span>
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-olive text-white hover:bg-olive-700 font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <span>Open Client Handbook & Hub →</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-pecan-900/65 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-3xl w-full border border-sage-200 shadow-2xl p-5 sm:p-7 animate-in fade-in zoom-in-95 my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sage-200 pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-bold shadow-xs">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-pecan-900">
                  Onboard New Client
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-olive-100 text-olive border border-olive/25">
                  South Mississippi
                </span>
              </div>
              <p className="text-xs text-pecan-600">
                Generates Official Client Handbook, Family Hub portal, Medication Schedule, and Billing Record
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl hover:bg-sage-100 text-pecan-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Sample Presets Banner */}
        <div className="mb-4 p-3 bg-white rounded-2xl border border-sage-200 shadow-xs shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pecan-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-olive" />
              Pre-load Pine Belt Intake Profile Standards
            </span>
            <span className="text-[10px] text-pecan-500">Click to load standard Mississippi intake data</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESET_CLIENTS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className="text-left px-3 py-2 rounded-xl bg-sage-50/70 hover:bg-sage-100 border border-sage-200 transition-all text-xs group cursor-pointer"
              >
                <div className="font-bold text-pecan-900 group-hover:text-olive transition-colors flex items-center justify-between">
                  <span>{preset.label}</span>
                  <Plus className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-[10px] text-pecan-600 truncate">{preset.tag}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1.5 bg-sage-100/70 rounded-2xl mb-4 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('demographics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'demographics'
                ? 'bg-white text-olive shadow-xs'
                : 'text-pecan-700 hover:text-pecan-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. Client Info</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('coordination')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'coordination'
                ? 'bg-white text-olive shadow-xs'
                : 'text-pecan-700 hover:text-pecan-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2. Coordinator & Plan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'health'
                ? 'bg-white text-olive shadow-xs'
                : 'text-pecan-700 hover:text-pecan-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>3. Health & Conditions</span>
            {selectedConditions.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-olive-100 text-olive text-[10px] flex items-center justify-center font-bold">
                {selectedConditions.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('medications')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'medications'
                ? 'bg-white text-olive shadow-xs'
                : 'text-pecan-700 hover:text-pecan-900'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>4. Medications</span>
            <span className="w-4 h-4 rounded-full bg-olive-100 text-olive text-[10px] flex items-center justify-center font-bold">
              {medications.filter((m) => m.name.trim()).length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('appointment')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'appointment'
                ? 'bg-white text-olive shadow-xs'
                : 'text-pecan-700 hover:text-pecan-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>5. First Visit</span>
            {includeAppointment && (
              <span className="w-2 h-2 rounded-full bg-olive"></span>
            )}
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          
          {/* TAB 1: Demographics & Contact */}
          {activeTab === 'demographics' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-xs space-y-3">
                <h4 className="font-bold text-pecan-900 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-olive" />
                  Primary Client Demographics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide text-[11px]">
                      Client Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Clara Mae Davis"
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide text-[11px]">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide text-[11px]">
                      Mississippi Service County *
                    </label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                    >
                      <option value="Forrest County">Forrest County (Hattiesburg / Petal)</option>
                      <option value="Lamar County">Lamar County (Purvis / Oak Grove / Sumrall)</option>
                      <option value="Jones County">Jones County (Laurel / Ellisville)</option>
                      <option value="Harrison County">Harrison County (Gulfport / Biloxi / Long Beach)</option>
                      <option value="Jackson County">Jackson County (Pascagoula / Ocean Springs)</option>
                      <option value="Pearl River County">Pearl River County (Picayune / Poplarville)</option>
                      <option value="Perry County">Perry County (Richton / New Augusta)</option>
                      <option value="Covington County">Covington County (Collins / Mount Olive)</option>
                      <option value="Stone County">Stone County (Wiggins)</option>
                      <option value="Wayne County">Wayne County (Waynesboro)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide text-[11px]">
                      Client Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="601-583-1944"
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide text-[11px]">
                    Residential Street Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 418 Live Oak Lane, Hattiesburg, MS 39402"
                    className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                  />
                </div>

                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide text-[11px]">
                    Preferred Communication Channel
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'phone', label: 'Phone Call', icon: Phone },
                      { id: 'text', label: 'SMS Text', icon: Clock },
                      { id: 'email', label: 'Email', icon: Mail },
                      { id: 'virtual', label: 'Virtual / Video', icon: Stethoscope },
                    ].map((c) => {
                      const Icon = c.icon;
                      const isSelected = preferredCommunication === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setPreferredCommunication(c.id as any)}
                          className={`p-2.5 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-olive text-white border-olive font-bold shadow-xs'
                              : 'bg-sage-50/60 border-sage-200 text-pecan-700 hover:bg-sage-100'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[11px]">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Designated Family Representative */}
              <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-pecan-900 text-sm flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-olive" />
                    Designated Family Representative / Proxy (Optional)
                  </h4>
                  <span className="text-[10px] text-pecan-600 bg-sage-100 px-2 py-0.5 rounded-md">Family Portal Access</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-pecan-700 mb-1">
                      Representative Full Name
                    </label>
                    <input
                      type="text"
                      value={representativeName}
                      onChange={(e) => setRepresentativeName(e.target.value)}
                      placeholder="e.g. Karen Davis Hayes"
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-pecan-700 mb-1">
                      Relationship / Legal Authority
                    </label>
                    <input
                      type="text"
                      value={representativeRelation}
                      onChange={(e) => setRepresentativeRelation(e.target.value)}
                      placeholder="e.g. Daughter / Healthcare POA"
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-pecan-700 mb-1">
                      Representative Phone
                    </label>
                    <input
                      type="text"
                      value={representativePhone}
                      onChange={(e) => setRepresentativePhone(e.target.value)}
                      placeholder="e.g. 601-270-4491"
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Coordinator & Plan */}
          {activeTab === 'coordination' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-xs space-y-3">
                <h4 className="font-bold text-pecan-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-olive" />
                  Assigned Care Coordinator
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'jasmeen',
                      name: 'Jasmeen Williams, LPN',
                      title: 'Owner & Care Coordinator',
                      badge: 'Pine Belt Case Management Lead',
                      office: 'Hattiesburg Hub · 601-554-6067',
                    },
                    {
                      id: 'rn',
                      name: 'Consulting RN Reviewer',
                      title: 'Clinical Advisory Reviewer',
                      badge: 'RN, BSN, CCM (Monthly Audit)',
                      office: 'Clinical Oversight Partner',
                    },
                    {
                      id: 'lcsw',
                      name: 'Consulting LCSW',
                      title: 'Family Support Specialist',
                      badge: 'Licensed Clinical Social Work',
                      office: 'Family Transitions & Support',
                    },
                  ].map((c) => {
                    const isSelected = coordinatorChoice === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCoordinatorChoice(c.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-olive/10 border-olive text-pecan-900 ring-1 ring-olive'
                            : 'bg-sage-50/50 border-sage-200 hover:bg-sage-100/70 text-pecan-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs">{c.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-olive" />}
                        </div>
                        <div className="text-[10px] text-olive font-medium">{c.badge}</div>
                        <div className="text-[10px] text-pecan-600 mt-1">{c.office}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Google Sheet & QR Scan Link Automation Box */}
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs shrink-0">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-pecan-900 block flex items-center gap-1.5">
                      <span>Sync to Google Sheet Master Register</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        Automated
                      </span>
                    </span>
                    <span className="text-[11px] text-pecan-600 block">
                      Logs this client into the connected Google Sheet and assigns an instant QR scan portal pass upon enrollment.
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={syncToGoogleSheet}
                    onChange={(e) => setSyncToGoogleSheet(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-sage-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sage-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Service Package & Initial Invoice */}
              <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-xs space-y-3">
                <h4 className="font-bold text-pecan-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-olive" />
                  Select Onboarding Care Package & Initial Assessment
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      tier: 'standard',
                      title: 'Comprehensive Intake & Handbook',
                      fee: '$260',
                      desc: '4 hrs comprehensive assessment, official handbook binder generation, & safety checklist.',
                    },
                    {
                      tier: 'transition',
                      title: 'Acute Care Transition Package',
                      fee: '$380',
                      desc: 'Post-discharge hospital transition, med reconciliation companion, & primary clinic debrief.',
                    },
                    {
                      tier: 'wellness',
                      title: 'Senior Routine Navigation',
                      fee: '$180',
                      desc: '3 hrs intake & family hub activation with bi-weekly coordination monitoring.',
                    },
                  ].map((pkg) => {
                    const isSelected = packageTier === pkg.tier;
                    return (
                      <button
                        key={pkg.tier}
                        type="button"
                        onClick={() => setPackageTier(pkg.tier as any)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-olive text-white border-olive shadow-sm'
                            : 'bg-sage-50/50 border-sage-200 hover:bg-sage-100/60 text-pecan-900'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs">{pkg.title}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed mt-1 ${isSelected ? 'text-olive-100' : 'text-pecan-600'}`}>
                            {pkg.desc}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between">
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-olive-200' : 'text-pecan-500'}`}>
                            Initial Fee
                          </span>
                          <span className="font-serif text-sm font-bold">{pkg.fee}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Intake Assessment Goals & Family Notes
                  </label>
                  <textarea
                    rows={2}
                    value={intakeGoalNotes}
                    onChange={(e) => setIntakeGoalNotes(e.target.value)}
                    placeholder="e.g. Accompany client to upcoming clinic visits, monitor daily medication compliance, and provide monthly summaries to daughter."
                    className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Health & Conditions */}
          {activeTab === 'health' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-pecan-900 text-sm flex items-center gap-2">
                    <Heart className="w-4 h-4 text-olive" />
                    Monitored Chronic Conditions & Diagnoses
                  </h4>
                  <span className="text-[10px] text-pecan-600">Select all that apply</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {COMMON_CONDITIONS.map((cond) => {
                    const isChecked = selectedConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => toggleCondition(cond)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isChecked
                            ? 'bg-olive text-white border-olive shadow-xs'
                            : 'bg-sage-50/60 border-sage-200 text-pecan-800 hover:bg-sage-100'
                        }`}
                      >
                        {isChecked ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 opacity-50" />}
                        <span>{cond}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-sage-200/80 flex items-center gap-2">
                  <input
                    type="text"
                    value={customConditionInput}
                    onChange={(e) => setCustomConditionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomCondition();
                      }
                    }}
                    placeholder="Add other condition or diagnosis..."
                    className="flex-1 px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomCondition}
                    className="px-3.5 py-2 rounded-xl bg-sage-200 hover:bg-sage-300 text-pecan-900 font-bold text-xs transition-colors cursor-pointer"
                  >
                    + Add Condition
                  </button>
                </div>
              </div>

              {/* Allergies & Dietary Restrictions */}
              <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-xs space-y-3">
                <h4 className="font-bold text-pecan-900 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  Known Allergies & Home Dietary Safety
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                      Known Drug Allergies / Sensitivities
                    </label>
                    <input
                      type="text"
                      value={allergiesInput}
                      onChange={(e) => setAllergiesInput(e.target.value)}
                      placeholder="e.g. Penicillin, Sulfa drugs, Latex (or NKDA)"
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                      Dietary or Nutrition Protocol
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Low sodium / Diabetic friendly / Pureed"
                      defaultValue="Consistent carbohydrate & low sodium intake"
                      className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Dynamic Medications List */}
          {activeTab === 'medications' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-pecan-900 text-sm flex items-center gap-2">
                    <Pill className="w-4 h-4 text-olive" />
                    Medication Routine & Reminder Schedule ({medications.length})
                  </h4>
                  <p className="text-[11px] text-pecan-600">
                    Add all current prescriptions or over-the-counter supplements to monitor daily
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="px-3.5 py-1.5 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Medication</span>
                </button>
              </div>

              <div className="space-y-3">
                {medications.map((med, index) => (
                  <div
                    key={med.id}
                    className="p-3.5 bg-white rounded-2xl border border-sage-200 shadow-xs space-y-2.5 relative group"
                  >
                    <div className="flex items-center justify-between border-b border-sage-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-olive-100 text-olive text-[11px] font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="font-bold text-pecan-900 text-xs">
                          {med.name || 'New Medication Entry'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMed(med.id)}
                        className="text-pecan-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove medication"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-pecan-700 mb-0.5 uppercase">
                          Medication Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={med.name}
                          onChange={(e) => handleUpdateMed(med.id, 'name', e.target.value)}
                          placeholder="e.g. Lisinopril"
                          className="w-full px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-pecan-700 mb-0.5 uppercase">
                          Dosage / Strength
                        </label>
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) => handleUpdateMed(med.id, 'dosage', e.target.value)}
                          placeholder="e.g. 10 mg"
                          className="w-full px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-pecan-700 mb-0.5 uppercase">
                          Frequency
                        </label>
                        <select
                          value={med.frequency}
                          onChange={(e) => handleUpdateMed(med.id, 'frequency', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
                        >
                          <option value="Once daily in the morning">Once daily in the morning</option>
                          <option value="Twice daily (morning and evening)">Twice daily (morning & evening)</option>
                          <option value="Three times daily with meals">Three times daily with meals</option>
                          <option value="Once daily at bedtime">Once daily at bedtime</option>
                          <option value="As needed (PRN)">As needed (PRN)</option>
                          <option value="Weekly injection">Weekly</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-pecan-700 mb-0.5 uppercase">
                          Purpose / Medical Reason
                        </label>
                        <input
                          type="text"
                          value={med.purpose}
                          onChange={(e) => handleUpdateMed(med.id, 'purpose', e.target.value)}
                          placeholder="e.g. Blood pressure regulation"
                          className="w-full px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-pecan-700 mb-0.5 uppercase">
                          Daily Reminder Time
                        </label>
                        <input
                          type="time"
                          value={med.reminderTime}
                          onChange={(e) => handleUpdateMed(med.id, 'reminderTime', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 font-bold"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-4">
                        <input
                          type="checkbox"
                          id={`remind-${med.id}`}
                          checked={med.reminderEnabled}
                          onChange={(e) => handleUpdateMed(med.id, 'reminderEnabled', e.target.checked)}
                          className="w-4 h-4 text-olive rounded border-sage-300 focus:ring-olive cursor-pointer"
                        />
                        <label htmlFor={`remind-${med.id}`} className="text-[11px] font-semibold text-pecan-800 cursor-pointer">
                          Enable Alarm
                        </label>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="w-full py-2.5 rounded-2xl border border-dashed border-sage-300 hover:border-olive text-pecan-700 hover:text-olive font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Another Prescription or Supplement</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: First Clinic Visit */}
          {activeTab === 'appointment' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white p-4 rounded-2xl border border-sage-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-pecan-900 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-olive" />
                    Initial Companion Medical Visit (Optional)
                  </h4>
                  <label className="flex items-center gap-2 text-xs font-bold text-pecan-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAppointment}
                      onChange={(e) => setIncludeAppointment(e.target.checked)}
                      className="w-4 h-4 text-olive rounded border-sage-300 focus:ring-olive cursor-pointer"
                    />
                    <span>Schedule First Visit</span>
                  </label>
                </div>

                {includeAppointment ? (
                  <div className="space-y-3 pt-2 border-t border-sage-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                          Physician / Provider Name
                        </label>
                        <input
                          type="text"
                          value={aptProvider}
                          onChange={(e) => setAptProvider(e.target.value)}
                          placeholder="e.g. Dr. Raymond Thornton, MD"
                          className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                          Specialty / Practice Field
                        </label>
                        <input
                          type="text"
                          value={aptSpecialty}
                          onChange={(e) => setAptSpecialty(e.target.value)}
                          placeholder="e.g. Cardiology & Preventive Care"
                          className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                          Clinic / Hospital Facility
                        </label>
                        <input
                          type="text"
                          value={aptClinic}
                          onChange={(e) => setAptClinic(e.target.value)}
                          placeholder="e.g. Hattiesburg Clinic Heart Center"
                          className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                          Appointment Date
                        </label>
                        <input
                          type="date"
                          value={aptDate}
                          onChange={(e) => setAptDate(e.target.value)}
                          className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                          Appointment Time
                        </label>
                        <input
                          type="text"
                          value={aptTime}
                          onChange={(e) => setAptTime(e.target.value)}
                          placeholder="e.g. 10:30 AM"
                          className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 font-medium"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-sage-50/70 rounded-xl border border-sage-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-olive" />
                        <div>
                          <span className="font-bold text-xs text-pecan-900 block">
                            Non-Emergency Medical Transportation Required
                          </span>
                          <span className="text-[11px] text-pecan-600">
                            Coast Transit CareVan or coordinator accompaniment
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAptTransportation(!aptTransportation)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          aptTransportation
                            ? 'bg-olive text-white'
                            : 'bg-white border border-sage-300 text-pecan-700'
                        }`}
                      >
                        {aptTransportation ? 'Ride Arranged' : 'Family Driving'}
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                        Key Discussion Items / Symptoms to Address
                      </label>
                      <input
                        type="text"
                        value={aptReason}
                        onChange={(e) => setAptReason(e.target.value)}
                        placeholder="e.g. Morning lightheadedness, review recent lab panel"
                        className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-pecan-600 border border-dashed border-sage-300 rounded-2xl">
                    <p className="text-xs">No initial medical appointment scheduled at this time.</p>
                    <p className="text-[11px] text-pecan-500 mt-1">
                      Appointments can be added anytime inside the Appointment Prep builder or Operations Hub.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Summary Notice */}
          <div className="p-3 bg-olive-50 rounded-2xl border border-olive/20 text-[11px] text-pecan-800 flex items-start gap-2.5 shrink-0">
            <ShieldCheck className="w-4 h-4 text-olive shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-pecan-900">
                Official SouthernWell Case Management Intake Guarantee:
              </span>{' '}
              Submitting creates an identical Official Client Handbook, family portal access with active medication alarms, and generates Invoice #{`SW-2026-###`}.
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-sage-200 shrink-0">
            <div className="flex items-center gap-2">
              {activeTab !== 'demographics' && (
                <button
                  type="button"
                  onClick={() => {
                    const tabs: TabKey[] = ['demographics', 'coordination', 'health', 'medications', 'appointment'];
                    const currIdx = tabs.indexOf(activeTab);
                    if (currIdx > 0) setActiveTab(tabs[currIdx - 1]);
                  }}
                  className="px-3 py-2 rounded-xl border border-sage-200 text-xs text-pecan-700 hover:bg-sage-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              )}
              {activeTab !== 'appointment' && (
                <button
                  type="button"
                  onClick={() => {
                    const tabs: TabKey[] = ['demographics', 'coordination', 'health', 'medications', 'appointment'];
                    const currIdx = tabs.indexOf(activeTab);
                    if (currIdx < tabs.length - 1) setActiveTab(tabs[currIdx + 1]);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl border border-sage-200 text-xs text-pecan-700 hover:bg-sage-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Complete Onboarding & Open Handbook</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

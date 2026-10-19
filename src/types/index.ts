export interface ClientProfile {
  id: string;
  name: string;
  representativeName?: string;
  representativeRelation?: string;
  dob: string;
  phone: string;
  address: string;
  county: string;
  careCoordinator: {
    name: string;
    credential: string;
    phone: string;
    email: string;
    office: string;
  };
  enrolledDate: string;
  acknowledgmentSigned: boolean;
  signatureDate?: string;
  signatureDataUrl?: string;
  signerName?: string;
  preferredCommunication: 'phone' | 'text' | 'email' | 'virtual';
  conditions: string[];
}

export interface Appointment {
  id: string;
  provider: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  location: string;
  transportationArranged: boolean;
  symptomsToDiscuss: string[];
  questionsForDoctor: string[];
  prepNotes: string;
  status: 'upcoming' | 'completed' | 'needs_follow_up';
}

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  prescribingDoctor: string;
  pharmacy: string;
  refillDueDate: string;
  observationNotes: string;
  needsReview: boolean;
  reminderTimes?: string[];
  reminderEnabled?: boolean;
  lastTakenTimestamp?: string;
}

export interface CoordinationLog {
  id: string;
  date: string;
  type: 'Monthly Summary' | 'Medication Review' | 'Provider Communication' | 'Family Check-in';
  coordinator: string;
  summary: string;
  actionItems: string[];
  sharedWithFamily: boolean;
}

export interface CommunityResource {
  id: string;
  name: string;
  category: 'Senior Services' | 'Transportation' | 'Nutrition & Meals' | 'Support Groups' | 'Healthcare Navigation';
  county: string;
  phone: string;
  address: string;
  description: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  period: string;
  services: {
    description: string;
    hours: number;
    rate: number;
    amount: number;
  }[];
  total: number;
  status: 'paid' | 'pending';
  paymentMethod?: string;
}

export interface OperationsTask {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  category: 'Transportation' | 'Medication' | 'Compliance' | 'Clinical Debrief' | 'Intake';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignedCoordinator: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  notes?: string;
}

export interface Form01Data {
  date: string;
  time: string;
  takenBy: string;
  callerName: string;
  relationshipToClient: string;
  phone: string;
  clientName: string;
  bestTimeToCall: string;
  county: string;
  howHeard: string[];
  howHeardOther?: string;
  referredBy?: string;
  supportNeeded: string[];
  supportNeededOther?: string;
  doctorClinic?: string;
  decisionMaker?: string;
  starNotes: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  outcome: string;
  packageOfInterest?: string;
  nextStepDate?: string;
}

export interface Form02Data {
  clientName: string;
  dob: string;
  completedBy: string;
  date: string;
  checklist: Record<string, boolean>;
  decision: 'Accept for enrollment' | 'Accept, Telephonic Services Program' | 'Refer out' | 'Decline';
  reasonReferral?: string;
  reviewedBy: string;
  reviewDate: string;
}

export interface Form03Data {
  clientName: string;
  dob: string;
  packageSelected: 'Essentials' | 'Signature' | 'Concierge';
  addOnsSelected: string;
  startDate: string;
  monthlyFee: string;
  noticeDays: number;
  clientSignatureName: string;
  clientSignatureDate: string;
  representativeName?: string;
  representativeRelation?: string;
  representativeSignatureDate?: string;
  coordinatorSignatureName: string;
  coordinatorSignatureDate: string;
  isSigned: boolean;
}

export interface Form04Data {
  clientName: string;
  dob: string;
  providers: {
    name: string;
    role: string;
    phoneFax: string;
    canShare: boolean;
  }[];
  mentalHealthInitials: string;
  expirationDate: string;
  clientSignatureName: string;
  clientSignatureDate: string;
  witnessSignatureName: string;
  witnessSignatureDate: string;
}

export interface Form05Data {
  clientName: string;
  dob: string;
  contacts: {
    name: string;
    relationship: string;
    phone: string;
    okLeaveMessage: boolean;
    role: string;
  }[];
  whatMayBeShared: string[];
  howDelivery: string[];
  howOften: string;
  doNotShareWith?: string;
  specialInstructions?: string;
  clientSignatureName: string;
  clientSignatureDate: string;
  coordinatorSignatureName: string;
  coordinatorSignatureDate: string;
}

export interface Form06Data {
  clientName: string;
  dob: string;
  referralDate: string;
  referredTo: string;
  lcswPhone: string;
  reasons: string[];
  reasonOther?: string;
  initials: {
    clinical: string;
    independent: string;
    scheduling: string;
    noClinicalRole: string;
    suggestion: string;
  };
  infoSharing: 'name_phone_only' | 'contact_on_own';
  clientSignatureName: string;
  clientSignatureDate: string;
  coordinatorSignatureName: string;
  coordinatorSignatureDate: string;
}

export interface Form07Data {
  clientName: string;
  dob: string;
  personCompleting: string;
  phone: string;
  numberInHousehold: number;
  numberCaregivers: number;
  packageRequested: 'Essentials' | 'Signature' | 'Concierge';
  circumstances: string[];
  circumstancesOther?: string;
  monthlyIncomeRange: string;
  narrativeSituation: string;
  clientStatementConfirmed: boolean;
  clientSignatureName: string;
  clientSignatureDate: string;
  forSouthernWellUse: {
    approvedRate: string;
    reviewDate: string;
    decision: 'approved' | 'denied' | 'waitlist';
    reviewedBy: string;
  };
}

export interface SDOHAreaRating {
  rating: 'No need' | 'Some need' | 'Needs help';
  notes: string;
}

export interface Form08Data {
  clientName: string;
  dob: string;
  date: string;
  completedBy: string;
  areas: Record<string, SDOHAreaRating>;
  resourceReferrals: {
    id: string;
    need: string;
    resource: string;
    date: string;
    followUp: string;
  }[];
  reviewedBy: string;
  reviewDate: string;
}

export interface Form09Data {
  clientName: string;
  dob: string;
  initials: {
    receivedHandbook: string;
    nonClinical: string;
    notEmergency: string;
    unableToReach: string;
    planCompliance: string;
    preferredTimes: string;
  };
  preferredDays: string;
  preferredTimes: string;
  preferredMethod: 'call' | 'text' | 'both';
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
    altPhone: string;
  }[];
  pcpClinic: string;
  pcpPhone: string;
  pharmacy: string;
  pharmacyPhone: string;
  preferredHospital: string;
  hospitalPhone: string;
  clientSignatureName: string;
  clientSignatureDate: string;
  coordinatorSignatureName: string;
  coordinatorSignatureDate: string;
}

export interface Form10Data {
  clientName: string;
  dob: string;
  planDate: string;
  nextReviewDate: string;
  recipients: {
    name: string;
    relationship: string;
    topics: string;
    howOften: string;
    method: string;
  }[];
  contactTriggers: string[];
  contactTriggersOther?: string;
  specialInstructions?: string;
  clientSignatureName: string;
  clientSignatureDate: string;
  coordinatorSignatureName: string;
  coordinatorSignatureDate: string;
}

export interface Form11Data {
  id: string;
  dateOfIncident: string;
  time: string;
  location: string;
  clientName: string;
  reportedBy: string;
  dateReported: string;
  incidentTypes: string[];
  incidentTypesOther?: string;
  starNotes: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  notifications: {
    personOrAgency: string;
    dateTime: string;
    method: string;
    response: string;
  }[];
  notifiedCheckboxes: string[];
  notifiedOther?: string;
  followUpPlan: string;
  completedBy: string;
  completedDate: string;
  rnAdvisoryReview?: string;
  rnReviewDate?: string;
}

export interface FormsPacketData {
  form01?: Form01Data;
  form02?: Form02Data;
  form03?: Form03Data;
  form04?: Form04Data;
  form05?: Form05Data;
  form06?: Form06Data;
  form07?: Form07Data;
  form08?: Form08Data;
  form09?: Form09Data;
  form10?: Form10Data;
  form11?: Form11Data;
}

export interface ClientRecord {
  client: ClientProfile;
  appointments: Appointment[];
  medications: MedicationItem[];
  coordinationLogs: CoordinationLog[];
  invoices: InvoiceItem[];
  formsPacket?: FormsPacketData;
}


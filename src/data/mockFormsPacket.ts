import { 
  FormsPacketData, 
  ClientProfile, 
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
  Form11Data 
} from '../types';

export interface FormMeta {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  step: string;
  category: 'Intake & Eligibility' | 'Agreements & Permissions' | 'Financial & SDOH' | 'Care Planning' | 'Safety & Quality';
  timing: string;
  required: boolean;
}

export const FORMS_METADATA: FormMeta[] = [
  {
    id: '01',
    number: 'Form 01',
    title: 'Inquiry and Discovery Call Notes',
    subtitle: 'First contact documentation, caller details, and STAR call review',
    step: 'Step 1',
    category: 'Intake & Eligibility',
    timing: 'Complete during or right after the first contact',
    required: true,
  },
  {
    id: '02',
    number: 'Form 02',
    title: 'Scope and Eligibility Checklist',
    subtitle: '8-point non-clinical verification and county service area screening',
    step: 'Step 2',
    category: 'Intake & Eligibility',
    timing: 'Complete before sending the enrollment packet',
    required: true,
  },
  {
    id: '03',
    number: 'Form 03',
    title: 'Service Agreement',
    subtitle: 'Monthly service package, legal clauses, client & coordinator terms',
    step: 'Step 5',
    category: 'Agreements & Permissions',
    timing: 'Signed before any services begin',
    required: true,
  },
  {
    id: '04',
    number: 'Form 04',
    title: 'Release of Information (ROI)',
    subtitle: 'Permission to coordinate with client providers, clinic & pharmacy',
    step: 'Step 5',
    category: 'Agreements & Permissions',
    timing: 'Signed before communicating with outside providers',
    required: true,
  },
  {
    id: '05',
    number: 'Form 05',
    title: 'Family Communication Authorization',
    subtitle: 'Designated contacts, authorized topics, and communication frequency',
    step: 'Step 5',
    category: 'Agreements & Permissions',
    timing: 'Signed prior to sharing updates with family members',
    required: true,
  },
  {
    id: '06',
    number: 'Form 06',
    title: 'LCSW Referral Acknowledgment',
    subtitle: 'Clinical vs non-clinical boundary confirmation and referral choices',
    step: 'Step 5',
    category: 'Agreements & Permissions',
    timing: 'Complete only when an LCSW referral is made',
    required: false,
  },
  {
    id: '07',
    number: 'Form 07',
    title: 'Sliding Scale Request',
    subtitle: 'Household circumstances review for reduced monthly care tier',
    step: 'Step 6',
    category: 'Financial & SDOH',
    timing: 'Optional. Reviewed case by case with limited availability',
    required: false,
  },
  {
    id: '08',
    number: 'Form 08',
    title: 'SDOH Screening Form',
    subtitle: '13-domain social determinants of health and community resource link',
    step: 'Step 7',
    category: 'Financial & SDOH',
    timing: 'Non-clinical intake screening completed at enrollment',
    required: true,
  },
  {
    id: '09',
    number: 'Form 09',
    title: 'Client Handbook Acknowledgment & Emergency Contacts',
    subtitle: 'Welcome call review, check-in schedule, and healthcare contacts',
    step: 'Step 8',
    category: 'Care Planning',
    timing: 'Review and verify during the official welcome call',
    required: true,
  },
  {
    id: '10',
    number: 'Form 10',
    title: 'Family Communication Plan',
    subtitle: 'Structured escalation protocols, emergency triggers, and update schedule',
    step: 'Step 9',
    category: 'Care Planning',
    timing: 'Built from Form 05 at the active care plan stage',
    required: true,
  },
  {
    id: '11',
    number: 'Form 11',
    title: 'Incident Report',
    subtitle: 'Factual STAR incident logs, notification registry, and RN review',
    step: 'Step 10',
    category: 'Safety & Quality',
    timing: 'Complete the same day. Facts only, as needed',
    required: false,
  },
];

export const SDOH_DOMAIN_LABELS: Record<string, string> = {
  housing: 'Housing: safe, stable, repairs or accessibility needs',
  food: 'Food: enough healthy food each week',
  utilities: 'Utilities: electric, water, heat, phone',
  transportation: 'Transportation: gets to appointments and pharmacy',
  medication: 'Medication affordability and pharmacy access',
  healthcareAccess: 'Access to a doctor or clinic',
  caregiverSupport: 'Caregiver support available when needed',
  socialConnection: 'Social connection: isolation or loneliness',
  safety: 'Safety: feels safe at home and in the community',
  financialStrain: 'Financial strain: bills, costs of care',
  phoneInternet: 'Phone and internet access',
  adlSupport: 'Help with daily activities (bathing, meals, mobility)',
  healthLiteracy: 'Understanding health information or language needs',
};

export function createDefaultFormsPacket(client: ClientProfile): FormsPacketData {
  const clientInitials = client.signerName 
    ? client.signerName.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase()
    : client.name 
    ? client.name.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase()
    : 'SW';

  const form01: Form01Data = {
    date: client.enrolledDate || 'Active Production',
    time: '09:00 AM',
    takenBy: 'Jasmeen Williams, LPN, BS-HHS',
    callerName: client.representativeName || client.name,
    relationshipToClient: client.representativeRelation || 'Self',
    phone: client.phone,
    clientName: client.name,
    bestTimeToCall: 'Mornings (9:00 AM – 11:30 AM)',
    county: client.county,
    howHeard: ['Rural health center / clinic', 'Community referral'],
    referredBy: 'Self / Community Healthcare Referral',
    supportNeeded: [
      'Appointment support',
      'Medication reminders',
      'Chronic condition support',
      'Transportation'
    ],
    doctorClinic: 'Primary Care Physician / Local Clinic',
    decisionMaker: client.representativeName ? `${client.representativeName} (${client.representativeRelation})` : 'Client',
    starNotes: {
      situation: `Client is a resident of ${client.county} seeking non-clinical care management and family communication.`,
      task: 'Provide routine check-ins, clinic appointment accompaniment, and medication schedule organization.',
      action: 'Explained SouthernWell non-clinical navigation boundaries, post-doctor debriefs, and care coordination.',
      result: 'Enrolled under SouthernWell SOP Rev 2 Standards.'
    },
    outcome: 'Enrolled / Active',
    packageOfInterest: 'Signature Care Navigation ($325/mo)',
    nextStepDate: 'Initial assessment & service coordination'
  };

  const form02: Form02Data = {
    clientName: client.name,
    dob: client.dob,
    completedBy: 'Jasmeen Williams, LPN, BS-HHS',
    date: client.enrolledDate,
    checklist: {
      item1: true, // Forrest, Lamar, Jones or Stone County
      item2: false, // 75-100 miles away
      item3: true, // non-clinical only
      item4: true, // no emergency
      item5: true, // can give consent
      item6: true, // willing to sign
      item7: false, // behavioral health
      item8: true, // has PCP
    },
    decision: 'Accept for enrollment',
    reasonReferral: 'Client meets Pine Belt service territory criteria for non-clinical care management.',
    reviewedBy: 'Jasmeen Williams, LPN, BS-HHS',
    reviewDate: client.enrolledDate
  };

  const form03: Form03Data = {
    clientName: client.name,
    dob: client.dob,
    packageSelected: 'Signature',
    addOnsSelected: 'Medication Concierge & Escorted Clinic Transportation',
    startDate: client.enrolledDate,
    monthlyFee: '$325/mo',
    noticeDays: 30,
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || '',
    representativeName: client.representativeName,
    representativeRelation: client.representativeRelation,
    representativeSignatureDate: client.signatureDate || '',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || '',
    isSigned: client.acknowledgmentSigned
  };

  const form04: Form04Data = {
    clientName: client.name,
    dob: client.dob,
    providers: [
      {
        name: 'Primary Care Clinic / Physician',
        role: 'Primary Care Provider',
        phoneFax: '601-554-6067',
        canShare: true,
      },
      {
        name: 'Designated Local Pharmacy',
        role: 'Pharmacist / Pharmacy',
        phoneFax: '601-554-6067',
        canShare: true,
      }
    ],
    mentalHealthInitials: clientInitials,
    expirationDate: 'One Year from Enrollment',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || '',
    witnessSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    witnessSignatureDate: client.signatureDate || ''
  };

  const form05: Form05Data = {
    clientName: client.name,
    dob: client.dob,
    contacts: [
      {
        name: client.representativeName || (client.name ? `${client.name} Family Contact` : 'Primary Family Contact'),
        relationship: client.representativeRelation || 'Designated Healthcare Proxy',
        phone: client.phone || '601-554-6067',
        okLeaveMessage: true,
        role: 'Primary family decision maker & contact',
      }
    ],
    whatMayBeShared: [
      'Appointment dates and outcomes',
      'Check-in summaries',
      'Medication reminder status',
      'Wellness logs (BP, weight)',
      'Safety concerns',
      'Billing and payment',
      'Care plan progress'
    ],
    howDelivery: ['Phone call', 'Text message'],
    howOften: 'Weekly',
    doNotShareWith: 'None noted',
    specialInstructions: 'Contact primary family proxy for care updates.',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || '',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || ''
  };

  const form06: Form06Data = {
    clientName: client.name,
    dob: client.dob,
    referralDate: client.enrolledDate,
    referredTo: 'Pine Belt Regional Counseling & Behavioral Health',
    lcswPhone: '601-544-4641',
    reasons: ['Caregiver support', 'Community adjustment'],
    initials: {
      clinical: clientInitials,
      independent: clientInitials,
      scheduling: clientInitials,
      noClinicalRole: clientInitials,
      suggestion: clientInitials
    },
    infoSharing: 'name_phone_only',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || '',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || ''
  };

  const form07: Form07Data = {
    clientName: client.name,
    dob: client.dob,
    personCompleting: client.representativeName || client.name,
    phone: client.phone,
    numberInHousehold: 1,
    numberCaregivers: 1,
    packageRequested: 'Signature',
    circumstances: ['Fixed income'],
    monthlyIncomeRange: 'Fixed Income / Social Security',
    narrativeSituation: 'Standard sliding scale evaluation per SouthernWell policy.',
    clientStatementConfirmed: true,
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || '',
    forSouthernWellUse: {
      approvedRate: '$325/mo',
      reviewDate: client.enrolledDate,
      decision: 'approved',
      reviewedBy: 'Jasmeen Williams, LPN, BS-HHS'
    }
  };

  const form08: Form08Data = {
    clientName: client.name,
    dob: client.dob,
    date: client.enrolledDate,
    completedBy: 'Jasmeen Williams, LPN, BS-HHS',
    areas: {
      housing: { rating: 'No need', notes: 'Safe home environment' },
      food: { rating: 'No need', notes: 'Adequate nutritional access' },
      utilities: { rating: 'No need', notes: 'Stable utilities' },
      transportation: { rating: 'Some need', notes: 'Requires clinic transportation coordination' },
      medication: { rating: 'Some need', notes: 'Medication reminder routine requested' },
      healthcareAccess: { rating: 'No need', notes: 'Established with local clinic' },
      caregiverSupport: { rating: 'No need', notes: 'Family proxy engaged' },
      socialConnection: { rating: 'No need', notes: 'Church & community fellowship' },
      safety: { rating: 'No need', notes: 'Safe home environment' },
      financialStrain: { rating: 'No need', notes: 'Direct-pay agreement active' },
      phoneInternet: { rating: 'No need', notes: 'Active phone service' },
      adlSupport: { rating: 'No need', notes: 'Independent daily mobility' },
      healthLiteracy: { rating: 'No need', notes: 'Benefits from written debrief notes' },
    },
    resourceReferrals: [],
    reviewedBy: 'Jasmeen Williams, LPN, BS-HHS',
    reviewDate: client.enrolledDate
  };

  const form09: Form09Data = {
    clientName: client.name,
    dob: client.dob,
    initials: {
      receivedHandbook: clientInitials,
      nonClinical: clientInitials,
      notEmergency: clientInitials,
      unableToReach: clientInitials,
      planCompliance: clientInitials,
      preferredTimes: clientInitials,
    },
    preferredDays: 'Tuesday & Thursday',
    preferredTimes: '10:00 AM – 11:30 AM',
    preferredMethod: 'call',
    emergencyContacts: [
      {
        name: client.representativeName || 'Primary Emergency Contact',
        relationship: client.representativeRelation || 'Family Proxy',
        phone: client.phone || '601-554-6067',
        altPhone: '',
      }
    ],
    pcpClinic: 'Primary Care Clinic',
    pcpPhone: '601-554-6067',
    pharmacy: 'Local Pharmacy',
    pharmacyPhone: '601-554-6067',
    preferredHospital: 'Regional Hospital (South MS)',
    hospitalPhone: '601-554-6067',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || '',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || ''
  };

  const form10: Form10Data = {
    clientName: client.name,
    dob: client.dob,
    planDate: client.enrolledDate,
    nextReviewDate: 'Quarterly Review',
    recipients: [
      {
        name: client.representativeName || 'Designated Family Proxy',
        relationship: client.representativeRelation || 'Family Proxy',
        topics: 'Clinic appointment outcomes, ride confirmations, medication refill reminders',
        howOften: 'Weekly',
        method: 'Phone & Text'
      }
    ],
    contactTriggers: [
      'Missed or unreturned check-in',
      'Hospital or ER visit',
      'Fall or injury reported',
      'Medication change or problem reported',
      'Safety concern at home'
    ],
    specialInstructions: 'Contact designated proxy in case of routine schedule changes.',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || '',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || ''
  };

  const form11: Form11Data = {
    id: `inc-${client.id}-clean`,
    dateOfIncident: '',
    time: '',
    location: '',
    clientName: client.name,
    reportedBy: 'Jasmeen Williams, LPN, BS-HHS',
    dateReported: '',
    incidentTypes: [],
    starNotes: {
      situation: '',
      task: '',
      action: '',
      result: ''
    },
    notifications: [],
    notifiedCheckboxes: [],
    followUpPlan: '',
    completedBy: 'Jasmeen Williams, LPN, BS-HHS',
    completedDate: '',
    rnAdvisoryReview: '',
    rnReviewDate: ''
  };

  return {
    form01,
    form02,
    form03,
    form04,
    form05,
    form06,
    form07,
    form08,
    form09,
    form10,
    form11,
  };
}

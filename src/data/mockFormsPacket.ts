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
  const isEleanor = client.id.includes('084');
  const isClara = client.id.includes('105');
  const isThomas = client.id.includes('108');

  const form01: Form01Data = {
    date: client.enrolledDate || 'October 12, 2026',
    time: '10:30 AM',
    takenBy: 'Jasmeen Williams, LPN, BS-HHS',
    callerName: client.representativeName || client.name,
    relationshipToClient: client.representativeRelation || 'Self',
    phone: client.phone,
    clientName: client.name,
    bestTimeToCall: 'Mornings (9:00 AM – 11:30 AM)',
    county: client.county,
    howHeard: isEleanor 
      ? ['Rural health center / clinic', 'Friend or family'] 
      : isClara 
      ? ['Church', 'Current client referral'] 
      : ['Social worker / provider'],
    referredBy: isEleanor ? 'Hattiesburg Clinic Social Services' : 'Community Pastor Henderson',
    supportNeeded: [
      'Appointment support',
      'Medication reminders',
      'Chronic condition support',
      'Transportation',
      'Family updates'
    ],
    doctorClinic: isEleanor ? 'Dr. Raymond Thornton, MD (Pine Grove Cardiology)' : 'Hattiesburg Community Clinic',
    decisionMaker: client.representativeName ? `${client.representativeName} (${client.representativeRelation})` : 'Client',
    starNotes: {
      situation: `Client is a ${client.dob}-born senior living in ${client.county} managing ${client.conditions.slice(0, 2).join(' & ')}. Family sought non-clinical support to prevent hospital readmissions.`,
      task: 'Family wants reliable ride coordination to Hattiesburg clinic visits, medication schedule organization, and weekly check-in updates.',
      action: 'Explained SouthernWell non-clinical navigation boundaries, 24-hr post-doctor debriefs, and coordination with local transportation.',
      result: 'Caller enthusiastic. Agreed to proceed with Scope review and send enrollment packet.'
    },
    outcome: 'Packet to be sent',
    packageOfInterest: 'Signature Care Navigation ($225/mo)',
    nextStepDate: 'Welcome call & Intake Form 02'
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
    reasonReferral: 'Client meets all South Mississippi service territory requirements; non-clinical care management aligns with client goals.',
    reviewedBy: 'Jasmeen Williams, LPN, BS-HHS',
    reviewDate: client.enrolledDate
  };

  const form03: Form03Data = {
    clientName: client.name,
    dob: client.dob,
    packageSelected: isClara ? 'Essentials' : isThomas ? 'Concierge' : 'Signature',
    addOnsSelected: 'Medication Concierge & Escorted Clinic Transportation',
    startDate: client.enrolledDate,
    monthlyFee: isClara ? '$150/mo' : isThomas ? '$300/mo' : '$225/mo',
    noticeDays: 30,
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || 'Oct 24, 2026',
    representativeName: client.representativeName,
    representativeRelation: client.representativeRelation,
    representativeSignatureDate: client.signatureDate || 'Oct 24, 2026',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || 'Oct 24, 2026',
    isSigned: client.acknowledgmentSigned
  };

  const form04: Form04Data = {
    clientName: client.name,
    dob: client.dob,
    providers: [
      {
        name: isEleanor ? 'Pine Grove Cardiology / Dr. Raymond Thornton' : 'Hattiesburg Medical Clinic',
        role: 'Primary Care Provider',
        phoneFax: '601-582-4000 / Fax: 601-582-4001',
        canShare: true,
      },
      {
        name: 'Southern Eye Center / Dr. Claire Montgomery',
        role: 'Specialist (Optometry)',
        phoneFax: '601-544-3937',
        canShare: true,
      },
      {
        name: 'Walgreens Pharmacy #1044 (Hardy St)',
        role: 'Pharmacist / Pharmacy',
        phoneFax: '601-268-3180',
        canShare: true,
      },
      {
        name: 'Coast Transit Authority (CareVan Service)',
        role: 'Transportation Partner',
        phoneFax: '228-896-8080',
        canShare: true,
      }
    ],
    mentalHealthInitials: client.signerName ? client.signerName.slice(0, 2).toUpperCase() : 'EMW',
    expirationDate: 'October 24, 2027',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || 'Oct 24, 2026',
    witnessSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    witnessSignatureDate: client.signatureDate || 'Oct 24, 2026'
  };

  const form05: Form05Data = {
    clientName: client.name,
    dob: client.dob,
    contacts: [
      {
        name: client.representativeName || 'Dorothy Woods Miller',
        relationship: client.representativeRelation || 'Daughter / Proxy',
        phone: '601-582-4190',
        okLeaveMessage: true,
        role: 'Primary family decision maker & contact',
      },
      {
        name: 'Marcus Woods',
        relationship: 'Son (Atlanta, GA)',
        phone: '404-555-0194',
        okLeaveMessage: true,
        role: 'Secondary contact for monthly email summary',
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
    specialInstructions: 'Text Dorothy first prior to calling during work hours (8 AM - 4 PM).',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || 'Oct 24, 2026',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || 'Oct 24, 2026'
  };

  const form06: Form06Data = {
    clientName: client.name,
    dob: client.dob,
    referralDate: 'October 18, 2026',
    referredTo: 'Pine Belt Counseling Associates (LCSW Clinic)',
    lcswPhone: '601-545-3668',
    reasons: ['Coping with chronic illness', 'Family or caregiver stress'],
    initials: {
      clinical: 'EMW',
      independent: 'EMW',
      scheduling: 'EMW',
      noClinicalRole: 'EMW',
      suggestion: 'EMW'
    },
    infoSharing: 'name_phone_only',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: 'Oct 24, 2026',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: 'Oct 24, 2026'
  };

  const form07: Form07Data = {
    clientName: client.name,
    dob: client.dob,
    personCompleting: client.representativeName || client.name,
    phone: client.phone,
    numberInHousehold: 1,
    numberCaregivers: 1,
    packageRequested: 'Signature',
    circumstances: ['Fixed income', 'High medical costs'],
    monthlyIncomeRange: '$1,500 – $2,200 (Social Security + Pension)',
    narrativeSituation: 'Client lives independently on fixed retirement income with ongoing copays for cardiology and diabetic testing supplies.',
    clientStatementConfirmed: true,
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || 'Oct 24, 2026',
    forSouthernWellUse: {
      approvedRate: '$185/mo',
      reviewDate: 'October 25, 2026',
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
      housing: { rating: 'No need', notes: 'Single-story home in Hattiesburg, no steep stairs' },
      food: { rating: 'Some need', notes: 'Needs low-sodium meal support; daughter assists on weekends' },
      utilities: { rating: 'No need', notes: 'Stable electric, water, phone' },
      transportation: { rating: 'Needs help', notes: 'Does not drive; requires door-through-door ride coordination for clinics' },
      medication: { rating: 'Some need', notes: 'Insulin pen and blood pressure medication coordination needed' },
      healthcareAccess: { rating: 'No need', notes: 'Established with primary care and cardiology' },
      caregiverSupport: { rating: 'Some need', notes: 'Daughter provides strong support but works full-time' },
      socialConnection: { rating: 'Some need', notes: 'Enjoys church and porch fellowship; occasional loneliness during weekdays' },
      safety: { rating: 'No need', notes: 'Safe neighborhood, grab bars installed in shower' },
      financialStrain: { rating: 'Some need', notes: 'Copays can be burdensome; requested sliding scale consideration' },
      phoneInternet: { rating: 'No need', notes: 'Active cellular phone with large buttons' },
      adlSupport: { rating: 'No need', notes: 'Independent with bathing, grooming, and light dressing' },
      healthLiteracy: { rating: 'Some need', notes: 'Benefits from written summary and bulleted doctor questions' },
    },
    resourceReferrals: [
      {
        id: 'sdoh-ref-1',
        need: 'Clinic Transportation',
        resource: 'Coast Transit Authority CareVan Service',
        date: '2026-10-15',
        followUp: 'Approved for discounted medical round-trips'
      },
      {
        id: 'sdoh-ref-2',
        need: 'Nutritious Low-Sodium Meals',
        resource: 'Pine Belt Christian Ministries Meal Box',
        date: '2026-10-18',
        followUp: 'Bi-weekly box arranged'
      }
    ],
    reviewedBy: 'Jasmeen Williams, LPN, BS-HHS',
    reviewDate: client.enrolledDate
  };

  const form09: Form09Data = {
    clientName: client.name,
    dob: client.dob,
    initials: {
      receivedHandbook: client.signerName ? client.signerName.slice(0, 2).toUpperCase() : 'EMW',
      nonClinical: client.signerName ? client.signerName.slice(0, 2).toUpperCase() : 'EMW',
      notEmergency: client.signerName ? client.signerName.slice(0, 2).toUpperCase() : 'EMW',
      unableToReach: client.signerName ? client.signerName.slice(0, 2).toUpperCase() : 'EMW',
      planCompliance: client.signerName ? client.signerName.slice(0, 2).toUpperCase() : 'EMW',
      preferredTimes: client.signerName ? client.signerName.slice(0, 2).toUpperCase() : 'EMW',
    },
    preferredDays: 'Tuesday & Thursday',
    preferredTimes: '10:00 AM – 11:30 AM',
    preferredMethod: 'call',
    emergencyContacts: [
      {
        name: client.representativeName || 'Dorothy Woods Miller',
        relationship: client.representativeRelation || 'Daughter',
        phone: '601-582-4190',
        altPhone: '601-582-4191',
      },
      {
        name: 'Pastor Thomas Henderson',
        relationship: 'Pastor / Church Elder',
        phone: '601-583-1288',
        altPhone: '',
      }
    ],
    pcpClinic: 'Dr. Raymond Thornton, MD (Hattiesburg Clinic)',
    pcpPhone: '601-582-4000',
    pharmacy: 'Walgreens Pharmacy #1044',
    pharmacyPhone: '601-268-3180',
    preferredHospital: 'Forrest General Hospital (Hattiesburg, MS)',
    hospitalPhone: '601-288-7000',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || 'Oct 24, 2026',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || 'Oct 24, 2026'
  };

  const form10: Form10Data = {
    clientName: client.name,
    dob: client.dob,
    planDate: client.enrolledDate,
    nextReviewDate: 'January 15, 2027',
    recipients: [
      {
        name: client.representativeName || 'Dorothy Woods Miller',
        relationship: 'Daughter / Proxy',
        topics: 'Clinic appointment outcomes, ride confirmations, medication refill reminders',
        howOften: 'Weekly (Tuesdays)',
        method: 'Phone & Text'
      },
      {
        name: 'Marcus Woods',
        relationship: 'Son (Remote)',
        topics: 'Monthly care coordination summary and physician debrief notes',
        howOften: 'Monthly',
        method: 'Email'
      }
    ],
    contactTriggers: [
      'Missed or unreturned check-in',
      'Hospital or ER visit',
      'Fall or injury reported',
      'Medication change or problem reported',
      'Safety concern at home'
    ],
    specialInstructions: 'Contact Dorothy immediately if client reports dizziness or morning blood pressure over 140/90.',
    clientSignatureName: client.signerName || client.name,
    clientSignatureDate: client.signatureDate || 'Oct 24, 2026',
    coordinatorSignatureName: 'Jasmeen Williams, LPN, BS-HHS',
    coordinatorSignatureDate: client.signatureDate || 'Oct 24, 2026'
  };

  const form11: Form11Data = {
    id: `inc-${client.id}-01`,
    dateOfIncident: '2026-10-14',
    time: '2:15 PM',
    location: 'Client Home (Front Porch / Living Area)',
    clientName: client.name,
    reportedBy: 'Jasmeen Williams, LPN, BS-HHS',
    dateReported: '2026-10-14',
    incidentTypes: ['Fall or injury reported'],
    starNotes: {
      situation: 'During routine afternoon check-in call, client reported slipping on a damp welcome mat while stepping onto front porch at 11:30 AM.',
      task: 'Verify client safety, assess if urgent clinical attention is required, and notify designated family contact per Form 10 protocol.',
      action: 'Client confirmed no head impact, no loss of consciousness, and no severe pain. Guided client to rest in recliner with ice pack on mild left wrist scrape. Called daughter Dorothy immediately. Advised primary care contact if soreness persists.',
      result: 'Daughter arrived within 30 minutes to inspect wrist and confirmed no swelling. Follow-up call next morning at 9:00 AM showed client resting comfortably with normal vitals.'
    },
    notifications: [
      {
        personOrAgency: 'Dorothy Woods Miller (Daughter)',
        dateTime: '2026-10-14 2:25 PM',
        method: 'Direct Phone Call',
        response: 'Acknowledged immediately; came home to check on mother.'
      },
      {
        personOrAgency: 'Dr. Raymond Thornton Clinic (FYI Note)',
        dateTime: '2026-10-14 3:10 PM',
        method: 'Secure Portal Message',
        response: 'Received; added to chart for next scheduled visit.'
      }
    ],
    notifiedCheckboxes: ['Family', 'Provider'],
    followUpPlan: 'Replace porch mat with high-traction non-slip rubber backing. Verified during next home visit on Oct 19.',
    completedBy: 'Jasmeen Williams, LPN, BS-HHS',
    completedDate: '2026-10-14',
    rnAdvisoryReview: 'Reviewed by Consulting RN - Non-clinical protocol properly executed. No clinical triage breached.',
    rnReviewDate: '2026-10-15'
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

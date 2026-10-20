export interface SOPStep {
  stepNumber: string;
  code: string;
  title: string;
  category?: string;
  formId?: string;
  formName?: string;
  timeline: string;
  responsibleRole: string;
  objective: string;
  keyActionItems: string[];
  documentationRequired: string;
  redFlags: string[];
  qualityStandard: string;
}

export interface ScopeComparisonItem {
  category: string;
  approvedScope: string;
  prohibitedScope: string;
  scriptingExample: string;
  prohibitedScripting: string;
  rationale: string;
}

export interface EscalationTier {
  tier: string;
  label: string;
  severityColor: string;
  examples: string[];
  immediateAction: string;
  notificationWindow: string;
  requiredContacts: string[];
  documentation: string;
}

export interface AuditChecklistItem {
  id: string;
  code: string;
  title: string;
  frequency: string;
  standard: string;
  verifiedBy: string;
}

export interface ScopeQuizQuestion {
  id: string;
  scenario: string;
  proposedAction: string;
  isApproved: boolean;
  explanation: string;
  relevantSOP: string;
}

export interface ProgramPricing {
  name: string;
  targetOrSummary: string;
  price: string;
  badge?: string;
}

export interface SOPManualData {
  documentId: string;
  title: string;
  subtitle: string;
  revision: string;
  revisionDate: string;
  effectiveDate: string;
  supersedes: string;
  status: string;
  pdfAssetPath: string;
  author: {
    name: string;
    credentials: string;
    title: string;
  };
  clinicalReviewer: {
    name: string;
    credentials: string;
    title: string;
  };
  lcswConsultant: {
    name: string;
    credentials: string;
    title: string;
  };
  organization: {
    name: string;
    tagline: string;
    serviceArea: string;
    counties: string[];
    headquarters: string;
    phone: string;
    email: string;
  };
  executiveSummary: string;
  purposeAndAuthority: {
    mission: string;
    corePhilosophy: string;
    orderOfAuthority: {
      role: string;
      holder: string;
      scope: string;
    }[];
    legalStatus: string;
  };
  pricingPrograms: ProgramPricing[];
  programsAndServices: {
    id: string;
    name: string;
    targetPopulation: string;
    coreDeliverables: string[];
    countyCoverage: string;
  }[];
  allSOPs: {
    number: string;
    title: string;
    category: string;
    purpose: string;
    points: string[];
  }[];
  openItemsAppendixD: {
    itemNumber: number;
    item: string;
    whyItMatters: string;
  }[];
  scopeComparisons: ScopeComparisonItem[];
  workflowSOPs: SOPStep[];
  escalationTiers: EscalationTier[];
  auditChecklist: AuditChecklistItem[];
  mandatoryReportingPolicy: {
    statute: string;
    title: string;
    definitionOfVulnerablePerson: string;
    reportableActs: string[];
    reportingTimelines: string;
    hotline: string;
    localSheriffs: { county: string; phone: string; address: string }[];
    internalEscalationSteps: string[];
  };
  fieldSafetyGuidelines: string[];
  ethicsAndConduct: {
    corePrinciples: string[];
    giftPolicy: string;
    conflictOfInterest: string;
    confidentialityAndHIPAA: string;
    continuingEducation: string;
  };
  quizQuestions: ScopeQuizQuestion[];
}

export const MOCK_SOP_MANUAL: SOPManualData = {
  documentId: 'SW-SOP-MS-2026-REV2',
  title: 'SouthernWell Case Management Services: Standard Operating Procedures',
  subtitle: 'Non-clinical care navigation, case management, wellness support, advocacy and resource coordination',
  revision: 'Revision 2 (October 2026)',
  revisionDate: 'October 2026',
  effectiveDate: 'Upon owner approval & legal review',
  supersedes: 'September 2026 draft',
  status: 'Internal use only. Confidential. Draft for owner review',
  pdfAssetPath: '/assets/aistudio/SouthernWell_SOP_Guide_Revised__3__b9361371.pdf',
  author: {
    name: 'Jasmeen Williams',
    credentials: 'LPN, BS-HHS',
    title: 'Owner and Care Coordinator',
  },
  clinicalReviewer: {
    name: 'Consulting RN Reviewer',
    credentials: 'RN (Independent)',
    title: 'Advisory Quality Oversight & Script Auditor',
  },
  lcswConsultant: {
    name: 'Consulting LCSW',
    credentials: 'LCSW (Independent)',
    title: 'Clinical & Psychosocial Assessment Partner',
  },
  organization: {
    name: 'SouthernWell of South Mississippi',
    tagline: 'Supporting Healing. Strengthening Families.',
    serviceArea: 'Forrest, Lamar, Jones and Stone Counties, Mississippi (Clients 75-100 miles served via Telephonic Program)',
    counties: ['Forrest County', 'Lamar County', 'Jones County', 'Stone County'],
    headquarters: 'Hattiesburg Hub, Suite 304, Hattiesburg, MS 39401',
    phone: '601-554-6067',
    email: 'care@southernwellcare.org',
  },
  executiveSummary:
    'SouthernWell Case Management Services provides private-pay, non-clinical care navigation, case management, wellness support, advocacy and resource coordination for seniors, individuals with developmental needs and their families across Forrest, Lamar, Jones and Stone Counties, Mississippi. This guide sets one consistent, safe way of doing the work so every client receives professional, dignified service while strictly observing non-clinical legal boundaries under Mississippi law.',
  purposeAndAuthority: {
    mission:
      'To provide compassionate, dignity-centered, non-clinical care navigation, case management, and advocacy that empowers South Mississippi elders and individuals with developmental needs to thrive safely in their homes.',
    corePhilosophy:
      'Supporting Healing. Strengthening Families. SouthernWell operates on respectful advocacy, culturally attuned local coordination, transparent communication with family proxies, and collaborative alignment with licensed medical and behavioral providers.',
    orderOfAuthority: [
      {
        role: 'Applicable Law & Regulation',
        holder: 'Mississippi State Law & Health Codes',
        scope: 'Mississippi statutes (MCA § 43-47-1 et seq.) and healthcare regulations come first. In any conflict, higher statutory authority governs.',
      },
      {
        role: 'Licensed Provider Instructions',
        holder: 'Client MD, DO, NP, or PA',
        scope: 'Provider-directed written orders and parameters for when to call or seek urgent care govern all health-related observations.',
      },
      {
        role: 'Owner and Care Coordinator',
        holder: 'Jasmeen Williams, LPN, BS-HHS',
        scope: 'Final authority on administrative policies, intake fit decisions, client assignments, safety protocols, billing, and exceptions.',
      },
      {
        role: 'Consulting RN Reviewer & LCSW',
        holder: 'Independent Advisory Contractors',
        scope: 'RN audits documentation samples monthly for non-clinical scope. LCSW conducts independent clinical/psychosocial assessments billed separately.',
      },
    ],
    legalStatus:
      'SouthernWell is a private, non-clinical care navigation and coordination service. SouthernWell is NOT a Home Health Agency, Hospice, or Skilled Nursing Facility. Staff NEVER diagnose, treat, prescribe, titrate medications, administer injections, or handle client financial instruments.',
  },

  pricingPrograms: [
    {
      name: 'SouthernWell Essentials',
      targetOrSummary: 'Initial wellness & support assessment (non-clinical), personalized action plan, resource identification & referrals, care navigation support, 1 monthly check-in, email support.',
      price: '$150 / month',
    },
    {
      name: 'SouthernWell Signature',
      targetOrSummary: 'Non-clinical case management, care navigation & coordination, personalized care planning, resource referrals, 2 monthly check-ins, wellness accountability, family communication support, priority phone & email.',
      price: '$225 / month',
      badge: 'Most Popular',
    },
    {
      name: 'SouthernWell Concierge',
      targetOrSummary: 'Comprehensive care navigation & non-clinical case management, care planning, wellness accountability, weekly check-ins, family coordination, priority communication, advocacy & resource coordination, customized wellness action plans.',
      price: '$300 / month',
      badge: 'Premium',
    },
    {
      name: 'Medication Concierge Plans',
      targetOrSummary: 'Clients living independently. Observation-only support while client fills their own organizer, complimentary SouthernWell pill organizer included. Magnolia: 1 weekly visit ($125/mo); Signature: 2 weekly visits ($150/mo); or $25 add-on.',
      price: '$125 – $150 / mo ($25 add-on)',
    },
    {
      name: 'Telephonic Services Program',
      targetOrSummary: 'Clients 75 to 100 miles away. Package 1: 1 scheduled in-person visit/mo, 4 telephonic check-ins, provider coordination ($195/mo). Package 2: 2 visits/mo + unlimited telephonic check-ins ($225/mo).',
      price: '$195 – $225 / mo',
    },
    {
      name: 'Neighborly Rate (Sliding Scale)',
      targetOrSummary: 'Reviewed case-by-case on income, hardship, caregiver burden, and special circumstances. Essentials: $100-$125; Signature: $150-$200; Concierge: $225-$275.',
      price: 'Sliding Scale (Case-by-Case)',
    },
    {
      name: 'Pay-As-You-Go Components',
      targetOrSummary: 'Front Porch Flex in-home check-ins; Porch-to-Provider appointment companion; Southern Vitals self-measured readings log; Well Connected resource navigation.',
      price: '$25 – $60 / hour',
    },
  ],

  programsAndServices: [
    {
      id: 'prog-essentials',
      name: 'SouthernWell Essentials',
      targetPopulation: 'Seniors and adults managing mild chronic needs needing structured monthly navigation and community resource linkages.',
      coreDeliverables: [
        'Initial non-clinical wellness and support assessment',
        'Personalized Non-Clinical Action Plan',
        'Resource identification, community program referrals, and application assistance',
        'One scheduled monthly telephonic check-in call (STAR format note)',
        'Ongoing coordinator email support',
      ],
      countyCoverage: 'Forrest, Lamar, Jones, and Stone Counties (Mississippi)',
    },
    {
      id: 'prog-signature',
      name: 'SouthernWell Signature (Most Popular)',
      targetPopulation: 'Active Pine Belt seniors and adults with multiple chronic diagnoses needing routine coordination, family updates, and proactive wellness accountability.',
      coreDeliverables: [
        'Comprehensive non-clinical case management and care navigation',
        'Individualized Care Plan (ICP) updated quarterly',
        'Two monthly check-in touchpoints (in-home visit and/or telephonic check-in)',
        'Wellness accountability and self-measured readings logging',
        'Family proxy communication support and post-visit summaries',
        'Priority telephone and email access to Care Coordinator',
      ],
      countyCoverage: 'Forrest, Lamar, Jones, and Stone Counties',
    },
    {
      id: 'prog-concierge',
      name: 'SouthernWell Concierge',
      targetPopulation: 'Clients with complex medical provider networks, post-rehab transitions, or high caregiver burden requiring weekly engagement.',
      coreDeliverables: [
        'Comprehensive non-clinical care management & individualized care planning',
        'Weekly coordinator touchpoints (in-home visits and telephonic check-ins)',
        'Observation-only medication concierge support (with complimentary pill organizer)',
        'Porch-to-Provider appointment companion accompaniment and note-taking',
        'Priority family proxy communication and 24-hour post-visit debriefs',
        'Direct emergency contact coordination and monthly provider updates',
      ],
      countyCoverage: 'Forrest, Lamar, Jones, and Stone Counties',
    },
    {
      id: 'prog-telephonic',
      name: 'Telephonic Services Program',
      targetPopulation: 'Clients living 75 to 100 miles from the South Mississippi primary service area desiring consistent remote wellness navigation.',
      coreDeliverables: [
        'Package 1: 1 monthly scheduled in-person visit + 4 weekly telephonic check-ins ($195/mo)',
        'Package 2: 2 monthly in-person visits + unlimited telephonic check-in calls ($225/mo)',
        'Provider coordination, appointment reminders, and prescription refill tracking',
        'Emergency contact monitoring and rapid welfare check escalation protocol',
      ],
      countyCoverage: 'Regional 75–100 mile perimeter around Hattiesburg Hub',
    },
  ],

  allSOPs: [
    {
      number: 'SOP-01',
      title: 'Scope of Practice and Approved Wording',
      category: 'Scope & Guardrails',
      purpose: 'Keep every service strictly within non-clinical care coordination under Mississippi law.',
      points: [
        'Approved Scope: Check in regularly and record observations in client\'s own words; remind clients of appointments, refills and provider directions; keep logs of self-measured readings to share with providers; coordinate transportation, resources, and administrative paperwork; observe (without touching) while client fills their own pill organizer; update designated family with signed consent.',
        'Prohibited Scope: Diagnosing, assessing, treating or evaluating conditions or readings; setting clinical parameters, thresholds or target numbers; selecting, counting, administering, verifying or changing medications; giving medical, dietary, exercise or treatment advice; counseling or psychotherapy; handling client money or signing medical consents.',
        'Approved Wording Standard: Use \'Medication reminders and organization support\' (Never \'Medication management, administration or clinical oversight\'); Use \'Log self-measured readings for provider review\' (Never \'Monitor vital signs or evaluate clinical trends\'); Use \'Check in, coordinate care, support\' (Never \'Assess, evaluate, treat, manage clinically\'); Use \'Care Plan (non-clinical) or Family Support Plan\' (Never \'Plan of care, clinical treatment plan\'); Use \'Client and family\' (Never \'Patient\'); Use \'Non-clinical care coordination\' (Never \'Behavioral health treatment, nursing care, clinical therapy\'); Use \'Screening of social needs (SDOH)\' (Never \'Psychosocial or clinical assessment - reserved for the LCSW\').',
        'When a client asks a clinical question, say: \"That is a question for your provider. I can help you write it down and bring it to your appointment, or help you call the office.\" Do not interpret, reassure or advise. If symptoms sound urgent, immediately execute SOP-10.'
      ]
    },
    {
      number: 'SOP-02',
      title: 'Inquiry, Eligibility and Fit Decision',
      category: 'Intake & Eligibility',
      purpose: 'Decide, in writing and quickly, whether SouthernWell can serve a caller safely.',
      points: [
        '1. Safety screen first: Ask whether anyone is in immediate danger or having a medical emergency. If yes, direct to 911 and document. Stop intake.',
        '2. Initial contact: Assign a Client ID (SW-YY-###). Record caller name and relationship, client name, county, contact details, call times, language or communication needs, decision maker, and referral source.',
        '3. Four-test fit decision (by next business day): Geography (service area or Telephonic Program range); Scope (needs are strictly non-clinical); Capacity (caseload below owner-set cap, currently planned at 15 to 20 active clients); Safety and conduct (no known risk that cannot be safely managed under SOP-05 and SOP-15).',
        '4. Record one outcome: Accept, Waitlist, Refer out or Decline, with the documented reason. Communicate outcome by next business day. Provide at least two vetted community resources when referring out or declining.',
        '5. Program fit: For Accept, present the suited program and Price Sheet, and send the enrollment packet (Workflow Manual Step 3).'
      ]
    },
    {
      number: 'SOP-03',
      title: 'Intake and Enrollment',
      category: 'Intake & Eligibility',
      purpose: 'Bring each client on board with a single, auditable path using the 10-step Workflow and two validation gates.',
      points: [
        'Phase 1: Inquiry and fit (Steps 1 to 2) - Safety screen, Client ID, four-test fit decision, documented outcome.',
        'Phase 2: Packet (Steps 3 to 4) - Packet sent in one send; Completeness Review; one consolidated request for missing items; reminders Day 2, 5 and 8; close at Day 10 if not returned.',
        'Phase 3: Consents and payment (Steps 5 to 6) - Authority to sign verified; HIPAA authorization, Consent and Enrollment Agreement, Service Agreement and Release signed; payment confirmed. Gate 1: Enrollment Complete.',
        'Phase 4: Onboarding (Steps 7 to 9) - SDOH screening and welcome call within 3 business days of Gate 1; Emergency Contact Sheet with missed check-in and welfare check authorization. Gate 2: Ready to Start. Non-Clinical Care Plan within 7 calendar days of Gate 1.',
        'Phase 5: Active (Step 10) - Services begin only after Gate 2. Day-30 review completed and logged.',
        'Standing rules: No service, provider call or family update before signed documents covering it are on file.',
        'Authority to sign: Accept signatures only from client or an authorized representative (POA, Healthcare Proxy, Guardian). File a copy of authorizing document. If capacity or authority is in doubt, pause and consult owner or legal counsel.',
        'Required before Gate 1: Service Agreement and Privacy Notice; HIPAA Privacy and Communication Authorization; Consent and Enrollment Agreement; Information Release (provider, therapist, pharmacist; family if involved); payment authorization; Observation-Only Medication Consent if Medication Concierge applies.',
        'Retired scope note: The \'Psychosocial Intake and Needs Assessment\' in earlier drafts is retired. SouthernWell performs a non-clinical intake review and SDOH screening. Psychosocial and clinical assessment belongs exclusively to the independent LCSW.',
        'Maintain one client record per Client ID. Releases carry expiration dates tracked in the Google Sheet.'
      ]
    },
    {
      number: 'SOP-04',
      title: 'Telephonic Check-In Calls',
      category: 'Service Delivery',
      purpose: 'Provide consistent, documented, non-clinical check-ins.',
      points: [
        '1. Prepare: Review prior Call Notes, the Care Plan and open tasks before dialing.',
        '2. Verify identity: Confirm two identifiers (full name plus date of birth or home address) before discussing anything.',
        '3. Engage: Use client\'s preferred call times. Record updates in client\'s exact words.',
        '4. Coordinate: Identify barriers (transportation, refills, resources) and assist with non-clinical navigation.',
        '5. Document the Call Note in STAR format (Situation, Task, Action, Result) the same business day and no later than 24 hours.',
        '6. Emergency: If client reports severe distress (chest pain, trouble breathing, stroke signs, sudden confusion, thoughts of self-harm), execute SOP-10 immediately.',
        '7. Voicemail standard: Leave only staff name and 601-554-6067 (SOP-13), without mentioning clinical details or reason for call.'
      ]
    },
    {
      number: 'SOP-05',
      title: 'In-Home Visits and Home Safety Check-In',
      category: 'Service Delivery',
      purpose: 'Observe and report environmental conditions safely without crossing into hands-on clinical care.',
      points: [
        '1. Before: Confirm visit by phone and log destination, arrival time and expected end time. Share schedule with designated check-in contact.',
        '2. Safety check: Visually observe walkways, lighting, telephone access, emergency contact placement, smoke detectors, food storage and room temperature. Record what you see, not what you conclude.',
        '3. Boundaries: Give observational notes to client or family. Do not repair fixtures, adjust medical equipment or provide personal care.',
        '4. Staff safety (Lone-worker policy): If environment presents immediate hazards, exit safely and notify owner. Text check-in contact on arrival and departure.',
        '5. After: Complete In-Home Visit Note (STAR format) the same business day.'
      ]
    },
    {
      number: 'SOP-06',
      title: 'Medication Concierge Visits',
      category: 'Service Delivery',
      purpose: 'Observation-only support for clients who fill their own organizer.',
      points: [
        '1. Verify signed Observation-Only Medication Consent on file. Provide complimentary SouthernWell pill organizer.',
        '2. The client (or a designated family member) fills the organizer from pharmacy-labeled packaging and provider orders.',
        '3. Staff remain present ONLY to observe and encourage. Staff NEVER touch, count, sort or hand over medications.',
        '4. Document factual observations, for example: \"Client filled own organizer; staff reminded client to follow original pharmacy labels.\"',
        '5. If client asks staff to help with pills or cannot fill organizer: Decline, document, suggest client contact pharmacist or provider, and notify owner and (with consent) family. Do not substitute.',
        '6. If something looks inconsistent (missed doses reported, label that does not match what client says): Do not interpret. Encourage client to call pharmacist or provider and document exactly what was said and observed.'
      ]
    },
    {
      number: 'SOP-07',
      title: 'SteadyCare Chronic Condition Support',
      category: 'Service Delivery',
      purpose: 'Support routine and self-management for adults with hypertension, COPD, type 2 diabetes or hyperlipidemia, using provider recommendations only.',
      points: [
        '1. At enrollment, ask client to bring provider\'s written instructions on when to call the office or seek urgent care. File them. SouthernWell never writes or changes clinical parameters/thresholds.',
        '2. Hold weekly check-ins focused on routine adherence and client\'s own self-measured logs.',
        '3. Log readings exactly as client gives them. Respond neutrally: \"Thank you for sharing.\" Do not label numbers high, low or stable.',
        '4. If client reports reading outside provider\'s written instructions or asks if a number is okay: \"Your provider\'s instructions say when to call. Would you like help calling the office now?\" Document factual response.',
        '5. If client reports emergency symptoms, execute SOP-10 immediately.',
        '6. Send compiled log to managing provider only with written authorization (Monthly Provider Update).'
      ]
    },
    {
      number: 'SOP-08',
      title: 'Appointment Companion (Porch-to-Provider)',
      category: 'Service Delivery',
      purpose: 'Accompany clients door-to-door to appointments for health literacy and logistical support.',
      points: [
        '1. Align appointment calendar and arrange transportation (Transportation and Appointment Request form).',
        '2. Accompany client; assist with check-in paperwork and comfort.',
        '3. If attending visit in the exam room at client\'s request, take objective written notes for client and family review.',
        '4. Strictly non-clinical: Do not give clinical opinions, interpret medical advice, or sign medical consent forms.'
      ]
    },
    {
      number: 'SOP-09',
      title: 'Family Support Program and LCSW Collaboration',
      category: 'Inter-Professional',
      purpose: 'Coordinate with independent Licensed Clinical Social Workers while upholding strict ethical boundaries.',
      points: [
        '1. Maintain a distinct boundary between SouthernWell care coordination and the independent LCSW\'s clinical care.',
        '2. Execute mutual releases before exchanging coordination notes.',
        '3. Use LCSW recommendations to build a Family Support Plan limited to non-medical tasks, family roles and community support.',
        '4. Keep administrative and client records completely separate. No referral fee, credit, gift or other compensation passes in either direction between SouthernWell and the LCSW.',
        '5. Licensed professionals (LCSW, RN reviewer, providers) are strictly excluded from Community Referral Program credits unless legal counsel confirms otherwise (Appendix D, item 2).'
      ]
    },
    {
      number: 'SOP-10',
      title: 'Emergency, Crisis and Missed Check-In Response',
      category: 'Safety & Escalation',
      purpose: 'Standardized protocols for acute medical emergencies, suicide crises, falls, outages, and missed check-ins.',
      points: [
        'Acute medical emergency (chest pain, severe shortness of breath, stroke symptoms, loss of consciousness): Call 911 immediately and stay on line if possible. After emergency services are dispatched, contact emergency contact. Document and file Incident Report within 24 hours.',
        'Behavioral health or suicide crisis: Call 911 for immediate danger, or 988 Suicide and Crisis Lifeline. Stay with client on the line. Notify emergency contacts and consulting LCSW as consent allows. Incident Report within 24 hours.',
        'Missed scheduled check-in: 1) Call again twice at 15-minute intervals (three attempts total). 2) Text if client has consented. 3) Call first emergency contact. 4) If no contact is made and safety risk suspected, or client has not been reached within 2 hours of scheduled time, request welfare check from local law enforcement as authorized on Emergency Contact Sheet. 5) Document each attempt with time and result.',
        'Client fall: Do not lift or move client. Call 911 if injured or unable to rise comfortably. Notify emergency contact. File Incident Report.',
        'Severe weather, power or phone outage: Use Emergency Contact Sheet to reach clients flagged as high-need first. Document each contact.',
        'Unable to decide: Treat as emergency. Call 911 or owner. Document decision and reason.',
        'After any emergency: Notify consulting RN reviewer at next monthly review (or immediately if it changes client status), and review Care Plan.'
      ]
    },
    {
      number: 'SOP-11',
      title: 'Abuse, Neglect, Exploitation and Incident Reporting',
      category: 'Mandatory Reporting',
      purpose: 'Mandatory statutory duty under Mississippi law to report vulnerable adult abuse, neglect, or exploitation.',
      points: [
        'Report promptly: Report any observed or reported sign of abuse, neglect, physical harm or financial exploitation of an adult to Mississippi Adult Protective Services (1-844-437-6282). Do not investigate and do not wait for proof.',
        'Immediate danger: Call 911 first.',
        'Objective records only: Write facts and direct quotes, not opinions or unverified accusations. File an internal Incident Report within 24 hours.',
        'Confidentiality: Share only what is needed to make the report; do not discuss report with alleged person responsible.'
      ]
    },
    {
      number: 'SOP-12',
      title: 'Documentation and Record Keeping',
      category: 'Operations & Compliance',
      purpose: 'Standards for auditable, factual, same-day records.',
      points: [
        'Log every call, visit and coordination task the same business day, and no later than 24 hours. Use the STAR method (Situation, Task, Action, Result).',
        'Record factual observations and direct client quotes. Avoid clinical impression terms and diagnostic labels.',
        'Corrections: Single strikethrough, initial and date. Never overwrite or delete history. In electronic records, add a dated correction entry.',
        'Late entries: Labeled \'Late entry,\' dated with actual entry date and state why.',
        'Storage: Store electronic records in encrypted, access-controlled software. Back up regularly. No client information on personal messaging apps or unsecured notes.',
        'Organization: Each client has one file organized by Client ID in the order of the Master Forms Checklist.',
        'Retention and destruction periods: Set after legal review (Appendix D, item 5) and recorded once confirmed.',
        'Records requests: Clients may request a copy of their records in writing; respond within period set by law and Service Agreement.'
      ]
    },
    {
      number: 'SOP-13',
      title: 'Privacy, Consent and Communication',
      category: 'Operations & Compliance',
      purpose: 'HIPAA and privacy safeguards for all client communications.',
      points: [
        'Disclose information only to people named on signed Release of Information or Family Communication Authorization, and only the minimum necessary.',
        'Verify identity before discussing client details by phone (two identifiers: name + DOB or address per SOP-04).',
        'Voicemails and texts: Staff name and 601-554-6067 only, with no care details. Use text or email for scheduling only unless client has agreed in writing to a specific channel.',
        'Keep devices password-protected and locked. Do not photograph clients, medications or documents on personal devices unless record system requires it and client consents.',
        'Suspected privacy incident (lost device, misdirected message, wrong recipient): Tell owner same day, log what happened, take steps to limit harm, and follow statutory notification duties.',
        'Track Release expiration dates in Google Sheet. Renew or stop disclosure when release expires or is revoked.'
      ]
    },
    {
      number: 'SOP-14',
      title: 'Billing, Payments and Sliding Scale',
      category: 'Finance & Billing',
      purpose: 'Private-pay fee collection, sliding scale, and transparent billing.',
      points: [
        'SouthernWell is private-pay only. It does not bill Medicare, Medicaid or private health insurance.',
        'Written Service Agreement and fee schedule before services begin. Payment is due monthly before services begin.',
        'Accepted methods: Credit or debit card, ACH bank draft, Cash App, PayPal, Zelle or invoice. Use payment-processor link; do not record full card or bank numbers on paper forms or Google Sheet.',
        'Neighborly Rate is approved by owner on Sliding Scale Request and reviewed every six months.',
        'Late or missed payment timeline (proposed): Reminder on due date; second notice on Day 5; written notice of pause on Day 10; services resume when paid. Hardship handled through Neighborly Rate.',
        'Referral credits applied to referrer\'s next month and recorded. Cancellation and refund terms follow signed Service Agreement.',
        'Staff may not accept gifts or cash, handle client bank accounts or make purchases with client funds.'
      ]
    },
    {
      number: 'SOP-15',
      title: 'Scheduling, Travel, Service Area and Continuity',
      category: 'Operations & Compliance',
      purpose: 'Geographic boundaries, mileage logs, and caseload continuity planning.',
      points: [
        'Coordinate in-person activities only in Forrest, Lamar, Jones and Stone Counties. Clients 75 to 100 miles away are served through Telephonic Services Program.',
        'Log exact business mileage for field work and companion travel.',
        'Transporting clients requires active commercial auto coverage that applies to client transport.',
        'Continuity plan: Name backup contact and tell every client in Handbook who will reach them if Care Coordinator is unavailable. For planned absences, give 7 days\' notice and schedule coverage for high-need clients first. Maintain up-to-date active client and emergency contact list for designee.',
        'Capacity cap: Owner sets active caseload cap (15-20 clients); at cap, new clients go on waitlist (SOP-02).'
      ]
    },
    {
      number: 'SOP-16',
      title: 'Quality Review, Training and Updates',
      category: 'Quality Assurance',
      purpose: 'Monthly audits, training requirements, and governance review.',
      points: [
        'Monthly: Consulting RN reviewer audits sample documentation and scripts for non-clinical scope.',
        'Quarterly: Audit client files for signed consents, authority to sign, current releases, accurate pricing and timely documentation.',
        'Annual: CPR/First Aid, privacy, scope boundaries and reporting duties training. Log completion.',
        'Intake measures (review quarterly): Days from inquiry to packet sent; packet return rate; percent of files complete at Gate 1; days from inquiry to start; percent of notes filed on time; number of waitlisted and declined inquiries with reasons.',
        'Log every change to this guide in Appendix C Revision Log.'
      ]
    },
    {
      number: 'SOP-17',
      title: 'Client Rights, Concerns and Complaints (new)',
      category: 'Client Rights',
      purpose: 'Give clients a clear, safe way to raise concerns.',
      points: [
        '1. Client Handbook states client rights: Respectful service, privacy, understanding of fees, right to ask questions, to decline or end services and to raise concerns without retaliation.',
        '2. Record any concern or complaint (written or verbal) with date and client\'s words.',
        '3. Acknowledge within 2 business days. Aim to resolve or give a written response within 10 business days.',
        '4. Log outcome and any change made. Review patterns at quarterly audit.'
      ]
    },
    {
      number: 'SOP-18',
      title: 'Discharge, Transition and Record Closure (new)',
      category: 'Client Transition',
      purpose: 'End services safely, fairly and in writing.',
      points: [
        '1. Reasons for discharge: Client request, move outside service area, needs beyond non-clinical scope, non-payment, safety or conduct concerns, or death.',
        '2. Give written notice (except death or immediate safety risk) with reason, last service date and community resources. Offer transition call.',
        '3. With authorization, notify provider and family. Hand off open tasks and return client items.',
        '4. Complete final documentation and close Care Coordination Tasks Log. Record closure reason and date in Sheet.',
        '5. Stop disclosures when releases end; retain and later destroy record per SOP-12.'
      ]
    }
  ],

  openItemsAppendixD: [
    {
      itemNumber: 1,
      item: 'Confirm active caseload cap used in SOP-02 (currently 15 to 20 client planning range)',
      whyItMatters: 'Drives the Capacity test and the waitlist for incoming inquiries.'
    },
    {
      itemNumber: 2,
      item: 'Legal review of the Community Referral Program, especially credits to social workers and healthcare professionals',
      whyItMatters: 'SOP-09 bars referral compensation with the LCSW; the program as written could conflict. Interim rule excludes licensed professionals.'
    },
    {
      itemNumber: 3,
      item: 'Confirm Medication Concierge pricing: $25 add-on vs. $125 / $150 standalone plans',
      whyItMatters: 'The documents currently show both tiers. Clarifies independent living vs. full care management.'
    },
    {
      itemNumber: 4,
      item: 'Approve proposed late-payment timeline (SOP-14) and cancellation/refund terms in Service Agreement',
      whyItMatters: 'Needed for consistent, fair enforcement across all private-pay clients.'
    },
    {
      itemNumber: 5,
      item: 'Record retention and destruction periods; client records request timeline; privacy incident notification duties',
      whyItMatters: 'Set by Mississippi law and legal counsel; SOP-12 and SOP-13 refer directly to them.'
    },
    {
      itemNumber: 6,
      item: 'Confirm Mississippi reporting duty and APS hotline number with counsel or MDHS',
      whyItMatters: 'SOP-11 and Form 11 incident reporting statutory compliance depends on it.'
    },
    {
      itemNumber: 7,
      item: 'Confirm whether HIPAA applies to SouthernWell activities and whether BAA agreements are needed with LCSW and RN reviewer',
      whyItMatters: 'HIPAA authorization forms and contractor consulting agreements depend on this classification.'
    },
    {
      itemNumber: 8,
      item: 'Confirm missed check-in welfare check timing (three attempts, then 2 hours) and use of local law enforcement',
      whyItMatters: 'SOP-10 sets a default welfare check protocol; adjust to Pine Belt rural dispatch realities.'
    },
    {
      itemNumber: 9,
      item: 'Confirm program naming: SteadyCare, Steady Wellness, and retired \'Steady Roots\'',
      whyItMatters: 'Standardizes terminology across client forms, SOP-07, and the Price Sheet.'
    }
  ],

  scopeComparisons: [
    {
      category: 'Medication Management vs. Reminders',
      approvedScope: 'Observe (without touching) while client fills their own pill organizer from pharmacy-labeled packaging; verify label dates; assist in calling local pharmacy (e.g. Corner Drug Co.) for refills; maintain current printed medication list for providers.',
      prohibitedScope: 'Physically filling pill boxes without client/family; administering oral medications, injections, eye drops, or IVs; counting, sorting, verifying or altering dosages; disposing of controlled substances.',
      scriptingExample: '\"Ms. Woods, let us write down that you felt dizzy after your morning pills so Dr. Thornton can review your medication instructions at your appointment on Thursday.\"',
      prohibitedScripting: '\"Your blood pressure is low today, so you should skip your Lisinopril pill this morning.\"',
      rationale: 'Under Mississippi State Board of Nursing regulations, medication administration and prescription titration constitute skilled clinical acts strictly restricted to licensed healthcare professionals.',
    },
    {
      category: 'Self-Measured Readings vs. Clinical Vitals',
      approvedScope: 'Log self-measured readings exactly as reported by client using home monitor; respond neutrally (\"Thank you for sharing\"); share compiled logs with managing provider under written authorization.',
      prohibitedScope: 'Taking vital signs to diagnose clinical conditions; performing lung sound auscultation, wound staging, fingerstick blood draws; interpreting EKG strips; labeling numbers high, low, or stable.',
      scriptingExample: '\"I see you wrote down 138/84 in your morning blood pressure log. I will make sure Dr. Thornton receives this log when we visit him next week.\"',
      prohibitedScripting: '\"Let me listen to your lungs to see if your congestive heart failure is worsening.\"',
      rationale: 'Non-clinical navigators record observations and promote health literacy but never engage in diagnostic physical examination.',
    },
    {
      category: 'Non-Clinical Care Plan vs. Medical Plan of Care',
      approvedScope: 'Collaborate with client and family to establish non-medical lifestyle goals (transportation, pantry access, home safety modifications, appointment schedules) in a Non-Clinical Care Plan.',
      prohibitedScope: 'Drafting medical treatment plans, prescribing rehabilitation exercises, formulating psychiatric interventions, or establishing clinical thresholds.',
      scriptingExample: '\"Let us add a goal to contact PRVO for LIHEAP utility assistance and schedule your ride with Hub City Transit two days before your eye doctor visit.\"',
      prohibitedScripting: '\"I am creating a treatment plan to manage your stage-3 chronic kidney disease through dietary sodium restriction.\"',
      rationale: 'Treatment plans require clinical licensure; non-clinical care plans address social determinants of health and care logistics.',
    },
    {
      category: 'Social Determinants (SDOH) vs. Psychosocial Therapy',
      approvedScope: 'Screen for social and environmental barriers (food security, utilities, transit, social isolation) using Form 08; connect clients with community resources and food pantries.',
      prohibitedScope: 'Conducting psychosocial clinical assessments, psychotherapy, depression counseling, or grief therapy (these are strictly referred to the independent Consulting LCSW).',
      scriptingExample: '\"We can connect you with the pantry at Christian Services and assist with your SNAP application.\"',
      prohibitedScripting: '\"Let us begin weekly psychotherapy sessions to process your clinical depression and trauma.\"',
      rationale: 'Clinical mental health assessment and psychotherapy require an active LCSW, LPC, or psychiatric license.',
    },
    {
      category: 'Appointment Accompaniment vs. Medical Consent',
      approvedScope: 'Accompany client to exam room at their request; assist with check-in paperwork; take objective notes on physician directions; facilitate post-visit family summaries.',
      prohibitedScope: 'Providing clinical opinions to the doctor, interpreting complex surgical advice, or signing informed consent forms on behalf of client.',
      scriptingExample: '\"Dr. Thornton, Ms. Woods wanted to make sure we asked about the swelling in her ankles that started on Tuesday.\"',
      prohibitedScripting: '\"As her care coordinator, I consent to you performing this surgical biopsy today.\"',
      rationale: 'Navigators are health literacy liaisons and note-takers, not legal healthcare proxies or surrogate decision-makers.',
    },
  ],

  workflowSOPs: [
    {
      stepNumber: 'Step 1',
      code: 'SOP-01 / 4.1',
      title: 'Inquiry & Discovery Intake Screen',
      category: 'Intake',
      formId: '01',
      formName: 'Form 01: Inquiry and Discovery Call Notes',
      timeline: 'Initial contact; document within 4 business hours',
      responsibleRole: 'Owner and Care Coordinator (Jasmeen Williams, LPN, BS-HHS)',
      objective: 'Conduct initial inquiry, immediate safety triage, and determine initial non-clinical fit.',
      keyActionItems: [
        'Conduct immediate safety screen: Confirm caller is not experiencing acute medical emergency (if yes, call 911).',
        'Assign official Client ID formatted as SW-YY-### in the Client Register.',
        'Record caller identity, relationship to senior, Mississippi service county, and preferred call times.',
        'Confirm whether caller is seeking non-clinical care coordination versus skilled home health or hospice.',
        'Log referral source and contact parameters.',
      ],
      documentationRequired: 'Completed Form 01 archived in client record; logged in Google Sheet register.',
      redFlags: ['Immediate suicidal ideation', 'Active elder abuse/starvation reported', 'Residence outside 4-county service area', 'Caller requesting 24/7 hands-on nursing care'],
      qualityStandard: '100% of discovery inquiries documented and acknowledged within 4 business hours.',
    },
    {
      stepNumber: 'Step 2',
      code: 'SOP-02 / 4.2',
      title: 'Four-Test Scope & Eligibility Screening',
      category: 'Intake',
      formId: '02',
      formName: 'Form 02: Scope and Eligibility Checklist',
      timeline: 'Complete by next business day following inquiry',
      responsibleRole: 'Owner and Care Coordinator',
      objective: 'Apply the Four-Test Fit Decision (Geography, Scope, Capacity, Safety) before dispatching enrollment paperwork.',
      keyActionItems: [
        'Test 1 (Geography): Resides in Forrest, Lamar, Jones, or Stone County (or 75–100 mile range for Telephonic Program).',
        'Test 2 (Scope): Needs are strictly non-clinical (coordination, navigation, observation, reminders).',
        'Test 3 (Capacity): Current active caseload is below owner-set capacity cap (15–20 active clients).',
        'Test 4 (Safety): Home environment and conduct present no hazards that cannot be managed under SOP-05/15.',
        'Record one official outcome: Accept, Waitlist, Refer Out, or Decline with documented rationale.',
        'If referring out or declining, provide at least two validated community alternative resources.',
      ],
      documentationRequired: 'Form 02 completed with four-test checkboxes and disposition signed by Owner.',
      redFlags: ['Active violent behavior in home', 'Unmanaged substance abuse posing physical danger', 'Client refusal of non-clinical advocacy'],
      qualityStandard: 'Zero inappropriate enrollments; 100% of declined inquiries provided with 2+ community referrals.',
    },
    {
      stepNumber: 'Step 3',
      code: 'SOP-03 / 4.3',
      title: 'Service Agreement & Financial Execution (Gate 1)',
      category: 'Enrollment',
      formId: '03',
      formName: 'Form 03: Service Agreement and Fee Schedule',
      timeline: 'Executed prior to initiating any billable navigation services',
      responsibleRole: 'Owner and Care Coordinator',
      objective: 'Formally execute terms of non-clinical care management, private-pay package, and verify legal authority to sign.',
      keyActionItems: [
        'Present Service Agreement with approved pricing (Essentials $150, Signature $225, Concierge $300, or Neighborly sliding scale).',
        'Verify signer authority: Client self-signature or legal representative (POA, Healthcare Proxy, Guardian with filed documentation).',
        'Collect signed HIPAA Authorization, Service Agreement, and Payment Authorization.',
        'Confirm first monthly payment confirmed via card, ACH, PayPal, Zelle, or invoice.',
        'Certify Gate 1 Complete: All initial documents and payment on file.',
      ],
      documentationRequired: 'Fully executed Form 03 countersigned by Jasmeen Williams, LPN, BS-HHS, with POA copy if applicable.',
      redFlags: ['Unclear legal authority of signature proxy (lacks Power of Attorney documentation)', 'Disputed billing terms'],
      qualityStandard: '100% of active clients must have executed Form 03 on file before service commencement.',
    },
    {
      stepNumber: 'Step 4',
      code: 'SOP-04 / 4.4',
      title: 'Telephonic Check-Ins & Identity Verification',
      category: 'Service Delivery',
      formId: '04',
      formName: 'Form 04: Consent, Releases & Call Note (STAR)',
      timeline: 'Scheduled bi-weekly or monthly per service plan',
      responsibleRole: 'Care Coordinator',
      objective: 'Deliver structured, documented non-clinical telephonic check-in calls adhering to two-identifier verification.',
      keyActionItems: [
        'Verify two identifiers (client name + DOB or address) before discussing any case specifics.',
        'Review open tasks and previous call notes before dialing.',
        'Engage client using their preferred call time; record updates in client\'s own exact words.',
        'Coordinate non-clinical barriers (rides, refills, community assistance).',
        'Document note using STAR format (Situation, Task, Action, Result) the same business day.',
        'Voicemail standard: Leave only coordinator name and 601-554-6067 without disclosing care details.',
      ],
      documentationRequired: 'STAR Telephonic Call Note filed within 24 hours of call.',
      redFlags: ['Client reports acute chest pain, shortness of breath, or stroke signs (execute SOP-10)', 'Unanswered call triggers missed check-in protocol'],
      qualityStandard: '100% of scheduled calls verified with 2 identifiers; notes logged within 24 hours.',
    },
    {
      stepNumber: 'Step 5',
      code: 'SOP-05 / 4.5',
      title: 'In-Home Safety & Environmental Check-In',
      category: 'Service Delivery',
      formId: '07',
      formName: 'Form 07: In-Home Assessment & Environmental Safety Checklist',
      timeline: 'Initial home visit within 5 business days of Gate 1; reassessed every 6 months',
      responsibleRole: 'Care Coordinator',
      objective: 'Conduct visual observational check of walkways, lighting, smoke detectors, utilities, and lone-worker safety.',
      keyActionItems: [
        'Confirm visit by phone beforehand; share destination, arrival and expected departure time with check-in contact.',
        'Observe walkways, rugs, bathroom grab bars, smoke detectors, food storage, heating/cooling, and phone access.',
        'Strict non-clinical boundaries: Document what is seen; do not repair fixtures or provide personal care.',
        'Lone-worker safety: Text check-in contact upon arrival and safe departure.',
        'Complete In-Home Visit Note (STAR format) the same business day.',
      ],
      documentationRequired: 'Form 07 Environmental Checklist and STAR Home Visit Note.',
      redFlags: ['Severe structural hazards, exposed wiring, non-working refrigeration, or unrestrained aggressive animals'],
      qualityStandard: '100% of home visits preceded and followed by lone-worker check-in timestamp.',
    },
    {
      stepNumber: 'Step 6',
      code: 'SOP-06 / 4.6',
      title: 'Medication Concierge Observation Visits',
      category: 'Service Delivery',
      formId: '06',
      formName: 'Form 06: Observation-Only Medication Consent & Log',
      timeline: 'Weekly or bi-weekly for enrolled Medication Concierge clients',
      responsibleRole: 'Care Coordinator / Advisory RN Reviewer',
      objective: 'Provide observational support while client fills their own pill organizer with STRICT NEVER-TOUCH RULE.',
      keyActionItems: [
        'Verify signed Observation-Only Medication Consent on file; provide complimentary SouthernWell pill organizer.',
        'Client or designated family member fills organizer from pharmacy-labeled bottles and doctor orders.',
        'Coordinator remains present ONLY to observe and encourage; NEVER touch, sort, count, or hand over medications.',
        'Document factual observations: \"Client filled own organizer; coordinator reminded client to follow pharmacy labels.\"',
        'If client cannot fill organizer or asks coordinator to handle pills: Politely decline, document, and connect with pharmacist/family.',
      ],
      documentationRequired: 'Completed Form 06 observation log with current pharmacy labels verified.',
      redFlags: ['Client unable to manage organizer independently', 'Multiple bottles with contradictory dosages', 'Expired cardiac medications'],
      qualityStandard: 'Strict zero-touch compliance; 100% of observations verified against pharmacy labels.',
    },
    {
      stepNumber: 'Step 7',
      code: 'SOP-07 / 4.7',
      title: 'SteadyCare Chronic Condition Support',
      category: 'Service Delivery',
      formId: '05',
      formName: 'Form 05: SteadyCare Non-Clinical Care Plan & Self-Readings Log',
      timeline: 'Weekly routine accountability check-ins',
      responsibleRole: 'Care Coordinator',
      objective: 'Support self-management routines for hypertension, diabetes, COPD using provider-directed parameters only.',
      keyActionItems: [
        'Collect provider\'s written instructions on when to call doctor or seek urgent care. SouthernWell never writes clinical thresholds.',
        'Log readings exactly as reported by client; respond neutrally (\"Thank you for sharing\").',
        'Never label readings high, low, or stable.',
        'If reading is outside provider\'s written instructions: \"Your doctor\'s instructions say when to call. Would you like help calling the office now?\"',
        'Compile monthly self-measured log and forward to doctor with signed release (Monthly Provider Update).',
      ],
      documentationRequired: 'Form 05 Care Plan and Monthly Provider Update log.',
      redFlags: ['Client reports critical emergency symptoms (execute SOP-10)', 'Readings persistently outside provider parameters without provider contact'],
      qualityStandard: '100% adherence to provider-directed parameters; zero clinical editorializing.',
    },
    {
      stepNumber: 'Step 8',
      code: 'SOP-08 / 4.8',
      title: 'Appointment Companion (Porch-to-Provider)',
      category: 'Service Delivery',
      formId: '09',
      formName: 'Form 09: Clinical Appointment Prep & Debrief Sheet',
      timeline: 'T-48h confirmation; visit accompaniment; T+24h family debrief',
      responsibleRole: 'Care Coordinator',
      objective: 'Door-to-door transit coordination, exam room health literacy note-taking, and family care summaries.',
      keyActionItems: [
        'T-48 hours: Verify appointment date/time with clinic and confirm transportation booking.',
        'T-24 hours: Prepare 3-question doctor prep sheet with client and organize insurance cards.',
        'Day of visit: Accompany client, assist with check-in clipboard, provide calm presence.',
        'In exam room: Take objective notes on physician instructions; do not give clinical advice or sign medical consents.',
        'Post-visit T+24h: Provide family summary to authorized proxy and update task log.',
      ],
      documentationRequired: 'Form 09 prep and debrief sheet filed in client chart.',
      redFlags: ['Physician orders invasive procedure without proxy awareness', 'Transportation no-show'],
      qualityStandard: '100% of accompanied visits followed by family debrief within 24 hours.',
    },
    {
      stepNumber: 'Step 9',
      code: 'SOP-09 / 4.9',
      title: 'Family Support & Independent LCSW Collaboration',
      category: 'Inter-Professional',
      formId: '08',
      formName: 'Form 08: SDOH Screening & LCSW Referral Acknowledgment',
      timeline: 'At intake and updated semi-annually',
      responsibleRole: 'Care Coordinator & Independent Consulting LCSW',
      objective: 'Coordinate with independent LCSW for psychosocial needs with zero referral fees or compensation.',
      keyActionItems: [
        'Maintain clear division between non-clinical coordination and independent LCSW clinical care.',
        'Execute mutual releases before exchanging coordination notes.',
        'Use LCSW recommendations to formulate non-clinical Family Support Plan.',
        'Enforce strict ethical separation: Zero referral fees, credits, or kickbacks in either direction.',
        'Exclude licensed healthcare professionals from Community Referral Program credits.',
      ],
      documentationRequired: 'LCSW Referral Acknowledgment and mutual release on file.',
      redFlags: ['Care coordinator attempting to provide clinical grief or mental health counseling'],
      qualityStandard: 'Strict financial separation; zero compensation between SouthernWell and LCSW.',
    },
    {
      stepNumber: 'Step 10',
      code: 'SOP-10 / 4.10',
      title: 'Emergency Response, Welfare Checks & Incident Reporting',
      category: 'Safety & Incidents',
      formId: '11',
      formName: 'Form 11: Critical Incident Report (STAR) & APS Hotline',
      timeline: 'Immediate for emergencies; within 24 hours for incident reports',
      responsibleRole: 'Owner and Care Coordinator',
      objective: 'Execute crisis protocols, missed check-in welfare checks, and mandatory vulnerable adult abuse reporting.',
      keyActionItems: [
        'Acute Medical Emergency: Call 911 immediately, stay on line, notify emergency contact, file Form 11 within 24 hours.',
        'Behavioral Health Crisis: Call 911 or 988 Suicide and Crisis Lifeline; notify LCSW and proxy.',
        'Missed Check-In: 3 calls at 15-minute intervals -> text -> emergency contact -> law enforcement welfare check after 2 hours.',
        'Fall Protocol: Do not lift or move client; call 911 if injured; notify family proxy; file Incident Report.',
        'Mandatory Reporting (MCA § 43-47-1): Immediately report suspected abuse/neglect/exploitation to MS APS (1-844-437-6282).',
      ],
      documentationRequired: 'Form 11 Critical Incident Report with APS intake tracking number and Sheriff incident #.',
      redFlags: ['Unexplained physical injuries or burns', 'Sudden transfer of client assets', 'Extreme caregiver neglect'],
      qualityStandard: '100% compliance with Mississippi mandatory reporting statutes within 24 hours.',
    },
  ],

  escalationTiers: [
    {
      tier: 'Tier 1',
      label: 'Low / Social & Logistical Need',
      severityColor: 'emerald',
      examples: [
        'Upcoming appointment ride canceled by vendor 3 days in advance',
        'Non-urgent utility payment notice received (due in 2 weeks)',
        'Client requests connection to local food pantry or community meal site',
        'Routine prescription refill needed within next 7 days',
      ],
      immediateAction: 'Log in Care Hub tasks; contact appropriate community resource partner (PRVO, transit dispatcher, pharmacy); resolve during normal business hours.',
      notificationWindow: 'Within 24 business hours',
      requiredContacts: ['Care Coordinator (Jasmeen Williams)', 'Client', 'Designated Community Partner'],
      documentation: 'Coordination Log in Family Care Hub; updated Operations Task list.',
    },
    {
      tier: 'Tier 2',
      label: 'Moderate / Health Change or Field Hazard',
      severityColor: 'amber',
      examples: [
        'Client reports persistent mild cough, fever < 100.5°F, or increased knee pain',
        'Client missed 1 dose of morning maintenance medication due to nausea',
        'Coordinator identifies new tripping hazard or burned-out exterior safety light',
        'Primary caregiver reports feeling exhausted and requesting temporary respite',
      ],
      immediateAction: 'Contact primary care physician clinic to schedule non-urgent consultation; inform designated family proxy; coordinate safety repair or respite voucher.',
      notificationWindow: 'Same day (within 4 to 8 hours)',
      requiredContacts: ['Care Coordinator', 'Primary Care Provider Clinic', 'Designated Family Proxy'],
      documentation: 'Care Hub Note; notification sent to Owner; updated Care Plan goal.',
    },
    {
      tier: 'Tier 3',
      label: 'Urgent / Fall (No Loss of Consciousness) or Severe Distress',
      severityColor: 'orange',
      examples: [
        'Client sustained fall at home, alert and oriented, denies head injury or acute bone fracture',
        'Sudden utility shut-off notice effective within 24 hours during freezing or extreme heat warning',
        'Client ran out of insulin or blood pressure medication with zero refills remaining',
        'Severe confusion or acute delirium spike reported by family',
      ],
      immediateAction: 'Conduct immediate safety check; if fall occurred, do not move client; encourage evaluation at Urgent Care or ED; if refusal, notify family proxy and PCP immediately; initiate emergency utility crisis funding; contact on-call pharmacy.',
      notificationWindow: 'Immediate (within 1 hour)',
      requiredContacts: ['Owner Jasmeen Williams', 'Consulting RN Reviewer', 'Designated Family Proxy', 'Primary Physician'],
      documentation: 'Form 11 Critical Incident Report drafted; logged in Operations Hub Audit tracking.',
    },
    {
      tier: 'Tier 4',
      label: 'Emergency / Life Threat & Mandatory Abuse Reporting',
      severityColor: 'rose',
      examples: [
        'Active chest pain, difficulty breathing, stroke symptoms (facial droop, arm weakness, slurred speech)',
        'Unresponsive client or fall with loss of consciousness / severe bleeding / head trauma',
        'Active suicide attempt or acute violent crisis in home (call 911 / 988)',
        'Observable signs of severe physical abuse, sexual assault, malnutrition, or major financial exploitation',
      ],
      immediateAction: 'CALL 911 IMMEDIATELY. Do not attempt private vehicle transport. Stay on scene until paramedics arrive if safe. For suspected abuse: notify Mississippi Adult Protective Services (1-844-437-6282 / 1-800-222-8000) promptly.',
      notificationWindow: 'Immediate (0 minutes for 911; within 24 hours for APS)',
      requiredContacts: ['Emergency Services (911)', 'Mississippi Dept of Human Services APS', 'Owner Jasmeen Williams', 'Family Proxy', 'Local Law Enforcement (if required)'],
      documentation: 'Form 11 Incident Report mandatory; law enforcement incident number; APS intake confirmation report.',
    },
  ],

  auditChecklist: [
    {
      id: 'sop-audit-1',
      code: 'SOP-01 & 02',
      title: 'Four-Test Intake & Eligibility Screening Verified',
      frequency: 'All new inquiries prior to packet delivery',
      standard: 'Four-test fit decision documented (Geography, Scope, Capacity, Safety); Client ID issued.',
      verifiedBy: 'Jasmeen Williams, LPN, BS-HHS',
    },
    {
      id: 'sop-audit-2',
      code: 'SOP-03 Gate 1',
      title: 'Gate 1 Enrollment Complete & Authority to Sign',
      frequency: 'Prior to any billable service commencement',
      standard: 'Form 03 Service Agreement, HIPAA Authorization, and payment confirmed; legal authority (POA) verified.',
      verifiedBy: 'Owner / Billing Coordinator',
    },
    {
      id: 'sop-audit-3',
      code: 'SOP-03 Gate 2',
      title: 'Gate 2 Ready to Start & Welfare Check Authorization',
      frequency: 'Within 3 business days of Gate 1; Care Plan within 7 days',
      standard: 'Emergency Contact Sheet with welfare check authorization and SDOH screening complete.',
      verifiedBy: 'Care Coordinator',
    },
    {
      id: 'sop-audit-4',
      code: 'SOP-06 & 07',
      title: 'Observation-Only Medication & Provider Parameters Check',
      frequency: 'Monthly sample review by Consulting RN Reviewer',
      standard: 'Zero hands-on medication administration; provider-directed parameters on file for all steady readings.',
      verifiedBy: 'Consulting RN Reviewer (Independent)',
    },
    {
      id: 'sop-audit-5',
      code: 'SOP-08 & 09',
      title: 'Appointment Prep & Independent LCSW Separation',
      frequency: 'Quarterly compliance audit',
      standard: '24-hour post-visit debrief logged; zero referral fees or financial compensation between SouthernWell and LCSW.',
      verifiedBy: 'Quality Assurance Coordinator',
    },
    {
      id: 'sop-audit-6',
      code: 'SOP-10 & 11',
      title: 'Emergency Incidents & Mississippi APS Statutory Compliance',
      frequency: '100% of critical incidents reviewed within 24 hours',
      standard: 'Form 11 filed within 24h; MS APS hotline (1-844-437-6282) report filed for any suspected adult abuse.',
      verifiedBy: 'Owner Jasmeen Williams',
    },
  ],

  mandatoryReportingPolicy: {
    statute: 'Mississippi Code Annotated § 43-47-1 et seq. (Mississippi Vulnerable Persons Act)',
    title: 'Statutory Obligation to Report Abuse, Neglect, and Exploitation',
    definitionOfVulnerablePerson:
      'A person, whether residing in a facility or in a private home, whose ability to perform the normal activities of daily living or to provide for his or her own care or protection is impaired due to a mental, emotional, physical or developmental disability or dysfunction, or brain damage, or the infirmities of aging.',
    reportableActs: [
      'Physical abuse: Wilful infliction of physical pain, injury, mental anguish, unreasonable confinement, or deprivation of services necessary to maintain mental and physical health.',
      'Caregiver Neglect: Failure by a caregiver to provide food, clothing, shelter, health care, or personal hygiene necessary to avoid serious physical or mental harm.',
      'Self-Neglect: Failure of a vulnerable person to provide for their own essential needs to such an extent that severe physical or mental harm is threatened.',
      'Financial Exploitation: Illegal or improper use of a vulnerable person’s funds, assets, or property for personal gain by another individual without valid consent.',
      'Sexual Abuse: Any non-consensual sexual contact or coercion involving a vulnerable adult.',
    ],
    reportingTimelines: 'Immediate telephone notification to Mississippi Adult Protective Services (1-844-437-6282 / 1-800-222-8000), followed by written report within 24 hours.',
    hotline: '1-844-437-6282 (Mississippi APS Hotline) / 1-800-222-8000 / Online: www.mdhs.ms.gov',
    localSheriffs: [
      { county: 'Forrest County', phone: '(601) 544-7800', address: '55 Laurel St, Hattiesburg, MS 39401' },
      { county: 'Lamar County', phone: '(601) 794-1005', address: '205 Broad St, Purvis, MS 39475' },
      { county: 'Jones County', phone: '(601) 425-3147', address: '419 N 5th Ave, Laurel, MS 39440' },
      { county: 'Stone County', phone: '(601) 928-7251', address: '1420 Central Ave E, Wiggins, MS 39577' },
    ],
    internalEscalationSteps: [
      'Step 1: Ensure immediate physical safety of vulnerable adult. If active emergency or threat of violence, call 911 immediately.',
      'Step 2: Notify Owner Jasmeen Williams, LPN, BS-HHS immediately via direct phone call.',
      'Step 3: Contact Mississippi APS Hotline at 1-844-437-6282 and record the report intake confirmation number.',
      'Step 4: Complete Form 11 (Critical Incident Report) within 24 hours using STAR investigation structure, recording only objective facts.',
      'Step 5: Preserve all evidence, documents, financial notices, or photographs in an encrypted, restricted file.',
    ],
  },

  fieldSafetyGuidelines: [
    'Always notify the designated check-in contact with destination, arrival time and expected departure time before entering any residence.',
    'Text the check-in contact immediately upon arrival and safe departure (lone-worker safety procedure).',
    'Conduct dynamic environmental safety sweep upon approaching property: observe loose dogs/animals, visible weapons, or volatile bystanders.',
    'Keep your mobile phone fully charged and accessible on your person; never leave phone or bag unattended in an unverified location.',
    'If you observe active drug manufacturing, unconfined aggressive animals, or weapons handled threateningly, do NOT enter. Exit safely and notify Owner.',
    'Transporting clients requires active commercial auto coverage that specifically applies to client transport (SOP-15).',
  ],

  ethicsAndConduct: {
    corePrinciples: [
      'Adhere strictly to client dignity, cultural humility, and non-clinical care navigation standards.',
      'Maintain unconditional positive regard and anti-ageist communication in all interactions with South Mississippi elders.',
      'Respect client self-determination: Clients possess the right to make their own lifestyle and healthcare decisions, including the right to refuse services, unless adjudicated legally incompetent by a Mississippi chancery court.',
    ],
    giftPolicy: 'Staff may NOT accept cash, checks, gift cards, or financial favors under any circumstance. Staff may not handle client bank accounts or make purchases with client funds.',
    conflictOfInterest: 'Staff shall never enter into business transactions, loan money, borrow money, or purchase property from clients or their families.',
    confidentialityAndHIPAA: 'All client information is confidential under HIPAA and Mississippi privacy statutes. Disclose only to people named on signed Releases and only the minimum necessary. Voicemails and texts must contain only staff name and 601-554-6067.',
    continuingEducation: 'All navigators and coordinators must complete annual training covering CPR/First Aid, privacy, scope boundaries, and mandatory reporting obligations.',
  },

  quizQuestions: [
    {
      id: 'quiz-1',
      scenario: 'A client’s daughter asks you to fill her mother’s 7-day pill organizer because she has to go out of town for work.',
      proposedAction: 'You agree and place the pills into the compartments according to the prescription bottles on the counter.',
      isApproved: false,
      explanation: 'PROHIBITED. Under SOP-01 and SOP-06, staff NEVER touch, count, sort, or fill pill organizers. Staff may only observe while the client or family fills the organizer. Recommend the family request a multi-dose blister pack from Corner Drug Co.',
      relevantSOP: 'SOP-01 Scope & SOP-06 Medication Concierge',
    },
    {
      id: 'quiz-2',
      scenario: 'During an appointment with Dr. Thornton, the doctor gives detailed instructions about adjusting Lisinopril. The client seems confused.',
      proposedAction: 'You ask the doctor to write down the instructions clearly, confirm the reason for the change, take detailed notes, and summarize the discussion for the family.',
      isApproved: true,
      explanation: 'APPROVED. Under SOP-08 (Appointment Companion), serving as a health literacy liaison, taking notes, and facilitating family communication is an approved core non-clinical role.',
      relevantSOP: 'SOP-08 Appointment Companion (Porch-to-Provider)',
    },
    {
      id: 'quiz-3',
      scenario: 'You notice severe bruising on a client’s upper arms and back that the client hesitantly attributes to \"bumping into the door.\" The live-in grandson appears hostile.',
      proposedAction: 'You document your objective physical observations and immediately contact the Mississippi APS Hotline (1-844-437-6282) and notify Owner Jasmeen Williams.',
      isApproved: true,
      explanation: 'APPROVED & MANDATORY. Under MCA § 43-47-1 and SOP-11, staff are mandated reporters and must immediately notify Mississippi APS without investigating or waiting for proof.',
      relevantSOP: 'SOP-11 Abuse, Neglect & Incident Reporting',
    },
    {
      id: 'quiz-4',
      scenario: 'A client’s electric bill is 2 months past due, and a shutoff notice was delivered. The client asks you to write and sign a check from their bank account.',
      proposedAction: 'You sign the client’s check using their pen so their power stays on.',
      isApproved: false,
      explanation: 'PROHIBITED. Under SOP-01 and SOP-14, staff may NEVER sign checks, manage bank accounts, or handle client financial instruments. Instead, immediately assist the client with an emergency LIHEAP grant via PRVO or Christian Services.',
      relevantSOP: 'SOP-01 Scope & SOP-14 Billing Safeguards',
    },
    {
      id: 'quiz-5',
      scenario: 'A client in Stone County complains of sudden onset slurred speech, facial drooping on the right side, and right arm numbness.',
      proposedAction: 'You immediately call 911 for emergency paramedic response and remain on the line until first responders arrive.',
      isApproved: true,
      explanation: 'APPROVED & REQUIRED. These are classic FAST stroke symptoms (Tier 4 Emergency). Under SOP-10, immediate 911 dispatch is required; staff must never attempt transport in a private vehicle.',
      relevantSOP: 'SOP-10 Emergency & Crisis Response',
    },
  ],
};

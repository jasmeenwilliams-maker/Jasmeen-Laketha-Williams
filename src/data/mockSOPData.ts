export interface SOPStep {
  stepNumber: string;
  code: string;
  title: string;
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

export interface SOPManualData {
  documentId: string;
  title: string;
  subtitle: string;
  revision: string;
  revisionDate: string;
  effectiveDate: string;
  supersedes: string;
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
  programsAndServices: {
    id: string;
    name: string;
    targetPopulation: string;
    coreDeliverables: string[];
    countyCoverage: string;
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
  title: 'Case Management Services Standard Operating Procedures Manual',
  subtitle: 'Non-Clinical Care Navigation, Client Advocacy, Wellness Coordination & Quality Assurance',
  revision: 'Revision 2',
  revisionDate: 'October 2026',
  effectiveDate: 'October 1, 2026',
  supersedes: 'Revision 1 (January 15, 2026)',
  author: {
    name: 'Jasmeen Williams',
    credentials: 'LBSW, CSA®, Certified Healthcare Navigator',
    title: 'Director of Case Management Services & Founder',
  },
  clinicalReviewer: {
    name: 'Advisory Clinical Consultant',
    credentials: 'RN, BSN, MSW, CCM',
    title: 'Clinical Advisory & Quality Oversight Liaison',
  },
  organization: {
    name: 'SouthernWell of South Mississippi',
    tagline: 'Rooted Care. Dignified Independence.',
    serviceArea: 'Pine Belt Region: Forrest, Lamar, Jones, and Stone Counties, Mississippi',
    counties: ['Forrest County', 'Lamar County', 'Jones County', 'Stone County'],
    headquarters: 'Hattiesburg Hub, Suite 304, Hattiesburg, MS 39401',
    phone: '(601) 582-4190',
    email: 'care@southernwellcare.org',
  },
  executiveSummary: 
    'This Standard Operating Procedures Manual (Revision 2, October 2026) governs all professional operations, non-clinical care navigation, client advocacy, and community coordination delivered by SouthernWell of South Mississippi. This revision synchronizes internal practice with the 10-Step New Client Workflow and Forms Packet (Forms 01–11), establishes strict clinical vs. non-clinical boundaries under Mississippi law, and formalizes mandatory adult protective reporting obligations under MCA § 43-47-1 et seq.',
  purposeAndAuthority: {
    mission: 
      'To provide compassionate, dignity-centered, non-clinical care management and patient advocacy that enables South Mississippi seniors and adults managing chronic health conditions to age safely and independently in their own homes and communities.',
    corePhilosophy: 
      'SouthernWell operates on the Person-in-Environment social work principle and patient-centered empowerment. We believe every Pine Belt elder deserves respectful advocacy, culturally attuned support, transparent communication with family caregivers, and coordinated access to medical and community resources.',
    orderOfAuthority: [
      {
        role: 'Director of Case Management',
        holder: 'Jasmeen Williams, LBSW',
        scope: 'Final authority on administrative policies, case assignments, client intake eligibility, staffing, compliance, and agency operations.',
      },
      {
        role: 'Advisory Clinical Consultant',
        holder: 'Advisory RN / MSW Consultant',
        scope: 'Reviews high-complexity care plans, medication safety checklists, clinical escalation protocols, and conducts quarterly quality chart reviews.',
      },
      {
        role: 'Senior Care Navigators / Case Managers',
        holder: 'LBSW / CSA / Certified Navigators',
        scope: 'Lead in-home assessments, care plan formulation, physician visit accompaniment, family debriefs, and crisis de-escalation in assigned counties.',
      },
      {
        role: 'Community Health Workers / Navigator Aides',
        holder: 'Trained CHWs / Staff Navigators',
        scope: 'Conduct scheduled wellness calls, verify appointment rides, assist with community pantry/utility applications, and log client contact records.',
      },
    ],
    legalStatus: 
      'SouthernWell of South Mississippi is a private, non-clinical care coordination and client advocacy agency. SouthernWell is NOT a licensed Home Health Agency, Hospice, or Skilled Nursing Facility under Mississippi law. Staff do not provide hands-on nursing, physical therapy, medical diagnosis, or prescription medication administration.',
  },
  programsAndServices: [
    {
      id: 'prog-a',
      name: 'Program A: Independence At Home (Ongoing Care Management)',
      targetPopulation: 'Seniors (60+) and adults with 2+ chronic medical diagnoses residing in private homes across Forrest, Lamar, Jones, and Stone Counties.',
      coreDeliverables: [
        'Monthly comprehensive in-home safety & SDOH reassessments',
        'Bi-weekly telephone wellness check-ins',
        'Social Determinants of Health coordination (PRVO, LIHEAP, food pantries, home repair)',
        'Quarterly Individualized Care Plan (ICP) updates and family care circle conferences',
      ],
      countyCoverage: 'Forrest, Lamar, Jones, and Stone Counties',
    },
    {
      id: 'prog-b',
      name: 'Program B: Clinical Visit Advocacy & Accompaniment',
      targetPopulation: 'Clients with frequent specialist visits, complex multi-physician regimens, or mild cognitive impairment needing appointment advocacy.',
      coreDeliverables: [
        'T-48 hour pre-visit confirmation and transportation booking (Hub City Transit / Coast Transit)',
        'Formulation of the 3-Question Physician Prep Sheet with client and family',
        'In-exam room professional note-taking and clarifying physician directives',
        '24-hour post-visit Family Care Summary distributed to designated healthcare proxy',
      ],
      countyCoverage: 'All medical facilities in Hattiesburg, Laurel, and regional Pine Belt clinics',
    },
    {
      id: 'prog-c',
      name: 'Program C: Care Transitions & Post-Discharge Bridge',
      targetPopulation: 'Clients discharging from Forrest General Hospital, South Central Regional Medical Center, or rehabilitation centers back home.',
      coreDeliverables: [
        'Initial home visit within 48 hours of hospital discharge',
        '30-day intensive transitional monitoring (preventing avoidable 30-day hospital readmissions)',
        'PCP follow-up appointment confirmation within 7 to 14 days of discharge',
        'Medication reconciliation observation with dispensing pharmacy',
      ],
      countyCoverage: 'Forrest, Lamar, and Jones County hospital catchment areas',
    },
    {
      id: 'prog-d',
      name: 'Program D: Family Caregiver Coaching & Respite Linkage',
      targetPopulation: 'Family caregivers experiencing high burden, emotional burnout, or navigating late-stage dementia in an aging parent.',
      coreDeliverables: [
        'Modified Caregiver Strain Index (CSI) screening',
        'Linkage to Mississippi Area Agencies on Aging (AAA) respite vouchers',
        'Bi-weekly caregiver coaching and communication facilitation',
        'Advance care planning and healthcare proxy documentation assistance',
      ],
      countyCoverage: 'Regional South Mississippi service area',
    },
  ],
  scopeComparisons: [
    {
      category: 'Medication Management',
      approvedScope: 'Observe client self-administering from pre-filled pill organizer or original pharmacy container; verify label dates; assist client in calling Corner Drug or local pharmacy for refills; maintain current printed medication list for doctors.',
      prohibitedScope: 'Physically filling pill boxes without client/family; administering oral medications, injections, eye drops, or IVs; advising client to stop, start, or alter dosages; disposing of controlled substances.',
      scriptingExample: '"Ms. Woods, let us write down that you felt dizzy after your morning pills so Dr. Thornton can review whether Lisinopril needs adjustment at your appointment on Thursday."',
      prohibitedScripting: '"Your blood pressure is low today, so you should skip your Lisinopril pill this morning."',
      rationale: 'Under Mississippi State Board of Nursing regulations, medication administration and prescription titration constitute skilled clinical acts restricted to licensed nurses and physicians.',
    },
    {
      category: 'Clinical Assessment & Vitals',
      approvedScope: 'Observe and document self-reported symptoms (e.g. client states ankles are swollen); encourage client to take and log their own vitals using home monitor; log observations for physician review.',
      prohibitedScope: 'Taking vital signs to diagnose clinical conditions; performing lung sound auscultation, wound staging, fingerstick blood draws, or interpreting EKG strips.',
      scriptingExample: '"I see you wrote down 138/84 in your morning blood pressure book. I will make sure Dr. Thornton receives this log when we visit him next week."',
      prohibitedScripting: '"Let me listen to your lungs to see if your congestive heart failure is worsening."',
      rationale: 'Non-clinical navigators record observations and promote health literacy but never engage in diagnostic physical examination.',
    },
    {
      category: 'Physician Visits & Advocacy',
      approvedScope: 'With signed Form 04 (Consent), attend clinical visits to take notes, ask pre-formulated client questions, request written after-care instructions, and facilitate clear patient-doctor communication.',
      prohibitedScope: 'Overriding physician instructions; providing legal consent for medical procedures unless holding court-appointed legal guardianship (prohibited for staff); arguing clinical efficacy with providers.',
      scriptingExample: '"Dr. Thornton, Ms. Woods and her daughter Dorothy asked if we could review whether compression socks would help with her evening ankle swelling."',
      prohibitedScripting: '"I am deciding for the client that she will not consent to this cardiac catheterization."',
      rationale: 'The navigator is an empowerment liaison and scribe, ensuring the client understands and the family stays informed.',
    },
    {
      category: 'Home & Environmental Safety',
      approvedScope: 'Conduct non-invasive visual fall hazard walk-throughs (Form 07); recommend throw rug removal, grab bar installations, lighting improvements; connect to PRVO or volunteer home modification programs.',
      prohibitedScope: 'Performing architectural structural changes; certifying ADA compliance; attempting to repair electrical wiring or mechanical stairlifts personally.',
      scriptingExample: '"We noticed the throw rug in the hallway tends to curl at the corners. Would you like us to contact Christian Services to look at non-slip anchoring?"',
      prohibitedScripting: '"I will rewire this hallway fixture and install your shower bars this afternoon."',
      rationale: 'Staff recommend safety measures and coordinate licensed contractors or vetted volunteers.',
    },
    {
      category: 'Financial & Legal Assistance',
      approvedScope: 'Assist client in locating and completing benefits applications (LIHEAP, PRVO utility grants, Medicare Part D Extra Help, SNAP); organize invoices and bills into folders.',
      prohibitedScope: 'Signing checks on client bank accounts; serving as Power of Attorney, conservator, or executor; accepting cash or financial control; providing formal legal counsel.',
      scriptingExample: '"I can help you print and assemble the income documents required for the PRVO cooling assistance application."',
      prohibitedScripting: '"Hand me your checkbook and ATM card, and I will pay your electric bill for you."',
      rationale: 'Protecting client assets from exploitation is a core ethical standard under the NASW Code and Mississippi Vulnerable Persons Act.',
    },
    {
      category: 'Mental Health & Emotional Support',
      approvedScope: 'Provide empathetic active listening, companionship, dignity reassurance, and screen for loneliness/depression using standard screening tools (PHQ-2/PHQ-9 referral triggers); link to Pine Belt Mental Health.',
      prohibitedScope: 'Conducting formal psychotherapy, psychiatric diagnosis, suicide risk contracting without clinical crisis escalation, or prescribing psychiatric interventions.',
      scriptingExample: '"I hear how overwhelming this has been since Mr. Woods passed. Would it be helpful if I connected us with the bereavement support group at Forrest General?"',
      prohibitedScripting: '"You have clinical major depression with generalized anxiety disorder, and I will be providing your cognitive behavioral therapy."',
      rationale: 'Psychotherapy in Mississippi requires LCSW, LPC, or psychiatric licensing. Navigators provide compassionate supportive counseling and resource linkage.',
    },
  ],
  workflowSOPs: [
    {
      stepNumber: 'Step 1',
      code: 'SOP 4.1',
      title: 'Inquiry and Discovery Call Protocol',
      formId: '01',
      formName: 'Form 01: Inquiry and Discovery Call Notes',
      timeline: 'Complete during or within 4 hours of first contact (Max 24 hours)',
      responsibleRole: 'Intake Coordinator / Lead Navigator',
      objective: 'Capture comprehensive first-contact details, establish caller relationship, assess urgent needs, and apply STAR method review.',
      keyActionItems: [
        'Answer intake call with standard greeting: "SouthernWell of South Mississippi, this is [Name], how may I assist your family today?"',
        'Record caller name, relationship to client, contact information, and primary referral source.',
        'Document the primary situation using the STAR inquiry structure (Situation, Task, Action, Result expectation).',
        'Screen client address to confirm residency in Forrest, Lamar, Jones, or Stone County.',
        'Determine if client requires emergency medical intervention (if yes, initiate 911 transfer immediately).',
        'Schedule preliminary Scope & Eligibility consultation within 48 hours.',
      ],
      documentationRequired: 'Completed Form 01 archived in client record; electronic notification to Case Management Director.',
      redFlags: ['Immediate suicidal ideation', 'Active elder abuse/starvation reported', 'Residence outside 4-county service area', 'Client requesting 24/7 skilled nursing care'],
      qualityStandard: '100% of discovery inquiries documented and acknowledged within 4 business hours.',
    },
    {
      stepNumber: 'Step 2',
      code: 'SOP 4.2',
      title: 'Scope & Eligibility Screening Verification',
      formId: '02',
      formName: 'Form 02: Scope and Eligibility Checklist',
      timeline: 'Complete prior to dispatching enrollment agreement',
      responsibleRole: 'Lead Care Navigator / LBSW',
      objective: 'Verify client meets all 8 non-clinical criteria and service area requirements before initiating formal care agreements.',
      keyActionItems: [
        'Review the 8-point eligibility checklist: Age 60+ or adult with chronic condition; resides in Forrest, Lamar, Jones, or Stone County.',
        'Confirm client is medically stable and not seeking acute inpatient psychiatric or intensive skilled medical care.',
        'Confirm client or authorized legal proxy is willing and able to participate in care coordination.',
        'Assess whether home environment is safe for field staff entry.',
        'If eligible, approve for enrollment and prepare Service Agreement & Consent packet.',
        'If ineligible, issue formal non-clinical redirection letter and connect caller with appropriate regional agency (e.g., SMPDD, Home Health, Hospice).',
      ],
      documentationRequired: 'Completed Form 02 signed by Navigator with eligibility disposition indicated.',
      redFlags: ['Active violent behavior in home', 'Unmanaged substance abuse posing immediate physical danger', 'Client refusal of non-clinical advocacy'],
      qualityStandard: 'Zero inappropriate enrollments; 100% of redirected inquiries provided with 2+ validated community alternative referrals.',
    },
    {
      stepNumber: 'Step 3',
      code: 'SOP 4.3',
      title: 'Service Agreement & Financial Terms Execution',
      formId: '03',
      formName: 'Form 03: Service Agreement',
      timeline: 'Executed prior to initiating any billable navigation services',
      responsibleRole: 'Director of Case Management / Senior Navigator',
      objective: 'Formally execute terms of non-clinical care management, billing package, client responsibilities, and cancellation terms.',
      keyActionItems: [
        'Present Service Agreement in person or via secure digital signature portal.',
        'Review selected monthly service tier (Tier 1 Core, Tier 2 Comprehensive, or Tier 3 Transitions).',
        'Review payment terms: Private pay, sliding scale, or grant-subsidized billing; invoice schedule (Net 15).',
        'Explain 30-day voluntary termination policy for either party.',
        'Ensure client or designated legal healthcare representative signs and dates agreement.',
        'Provide client with physical or digital duplicate copy for their home records.',
      ],
      documentationRequired: 'Fully executed Form 03 countersigned by Jasmeen Williams, LBSW.',
      redFlags: ['Unclear legal authority of signature proxy (lacks Power of Attorney documentation)', 'Disputed billing terms'],
      qualityStandard: '100% of active clients must have executed Form 03 on file before service commencement.',
    },
    {
      stepNumber: 'Step 4',
      code: 'SOP 4.4',
      title: 'Consent, Releases & Client Rights Disclosure',
      formId: '04',
      formName: 'Form 04: Consent, Releases, and Client Rights',
      timeline: 'Executed concurrent with Form 03 Service Agreement',
      responsibleRole: 'Care Navigator',
      objective: 'Secure HIPAA release of information, physician communication authorization, transportation liability consent, and acknowledge Client Bill of Rights.',
      keyActionItems: [
        'Read and explain the Client Bill of Rights in plain, accessible language.',
        'Obtain specific HIPAA authorization to communicate with identified physicians (e.g. Dr. Thornton, Dr. Vance).',
        'Obtain authorization for designated family proxy (e.g. Dorothy Woods Miller) to receive post-visit clinical debriefs.',
        'Review transportation coordination waiver for third-party medical transit (Hub City Transit, Coast Transit).',
        'Review emergency medical transport permission clause.',
        'Collect formal signatures from client and navigator.',
      ],
      documentationRequired: 'Completed Form 04 filed in permanent client chart; copy placed in client home handbook.',
      redFlags: ['Client refuses to authorize communication with primary care doctor', 'Conflicting family proxy claims'],
      qualityStandard: 'Zero unauthorized disclosures; HIPAA authorizations renewed annually.',
    },
    {
      stepNumber: 'Step 5',
      code: 'SOP 4.5',
      title: 'Individualized Care Plan (ICP) Formulation',
      formId: '05',
      formName: 'Form 05: Individualized Care Plan (ICP)',
      timeline: 'Within 7 calendar days of initial home assessment',
      responsibleRole: 'Case Management Director / Lead Navigator',
      objective: 'Co-design a client-centered, SMART-goal action plan addressing chronic condition support, appointment logistics, and SDOH needs.',
      keyActionItems: [
        'Review assessment findings from Forms 07 & 08.',
        'Formulate minimum 3 SMART goals in partnership with client and family (e.g., Blood pressure log adherence, Fall risk reduction, Eye doctor follow-up).',
        'Identify specific action steps, responsible parties, and target completion dates.',
        'Establish routine contact cadence (e.g., 2 visits/month, weekly phone check-in).',
        'Review plan with Advisory Clinical Consultant if client has 3+ chronic conditions or complex medications.',
        'Secure client/family sign-off and distribute copy to client.',
      ],
      documentationRequired: 'Completed Form 05 signed by client and navigator; copy uploaded to Family Care Hub.',
      redFlags: ['Goals established without client input', 'Unrealistic clinical targets outside non-clinical scope'],
      qualityStandard: '100% of ICPs completed within 7-day SLA; quarterly progress updates logged.',
    },
    {
      stepNumber: 'Step 6',
      code: 'SOP 4.6',
      title: 'Medication Safety & Observation Protocol',
      formId: '06',
      formName: 'Form 06: Medication Safety & Observation Protocol',
      timeline: 'Conducted at initial assessment and reviewed every 30 days',
      responsibleRole: 'Care Navigator / Advisory RN Consultant',
      objective: 'Conduct non-clinical observation of client medication storage, verify pharmacy refill schedules, and detect safety hazards.',
      keyActionItems: [
        'Request client display all current prescription bottles, OTC supplements, and vitamins.',
        'Verify client has active prescriptions from licensed providers; check label dates and expiration dates.',
        'Confirm client uses a weekly pill organizer or blister pack; observe if doses are organized properly.',
        'Observe client ability to open containers and read label print.',
        'Note any expired medications or duplicate therapies for physician consultation.',
        'Enforce STRICT NEVER-TOUCH RULE: Staff do NOT fill pillboxes, administer pills, or alter doses.',
        'Ensure client has pharmacy phone number (e.g. Corner Drug Co.) posted visibly.',
      ],
      documentationRequired: 'Completed Form 06 with full medication list; copy provided for appointment prep bag.',
      redFlags: ['Multiple bottles of same medication with different dosages', 'Expired cardiac or diabetic medications', 'Client skipping doses due to financial hardship (trigger LIHEAP/Extra Help)'],
      qualityStandard: '100% of clients have updated 30-day medication observation records on file.',
    },
    {
      stepNumber: 'Step 7',
      code: 'SOP 4.7',
      title: 'In-Home Environmental Safety & Fall Risk Audit',
      formId: '07',
      formName: 'Form 07: In-Home Assessment & Environmental Safety Checklist',
      timeline: 'Within 5 business days of enrollment; reassessed every 6 months or post-hospitalization',
      responsibleRole: 'Lead Care Navigator',
      objective: 'Systematically assess home safety, identify fall hazards, verify functioning utilities, and document emergency accessibility.',
      keyActionItems: [
        'Walk through main living areas: Entryway, living room, hallways, kitchen, bathroom, and bedroom.',
        'Check for loose throw rugs, clutter, trailing electrical cords, and adequate lighting.',
        'Inspect bathroom: Check toilet height, shower/tub accessibility, non-slip mat presence, and grab bar needs.',
        'Verify working smoke detectors, carbon monoxide detectors, and operable telephone/cell service.',
        'Check food storage: Working refrigerator, perishable food freshness, water access.',
        'Document heating/cooling functionality (essential for South Mississippi extreme summer heat).',
        'Generate immediate action plan for identified hazards (coordinate grab bars via local partners).',
      ],
      documentationRequired: 'Completed Form 07 with remediation checklist and partner referral notes.',
      redFlags: ['Non-working refrigeration or no running water', 'Dangerous electrical wiring or space heaters near bedding', 'Severe pest infestation', 'Absence of secondary egress'],
      qualityStandard: '100% of homes assessed within 5 days; urgent hazards remediated or referred within 48 hours.',
    },
    {
      stepNumber: 'Step 8',
      code: 'SOP 4.8',
      title: 'Social Determinants of Health (SDOH) Screening',
      formId: '08',
      formName: 'Form 08: Social Determinants of Health (SDOH) Screening Tool',
      timeline: 'Administered at enrollment and updated semi-annually',
      responsibleRole: 'LBSW / Case Navigator',
      objective: 'Evaluate 14 life domains including housing, food security, transportation, social connection, and financial strain.',
      keyActionItems: [
        'Administer the 14-domain screening tool using conversational, non-judgmental dialogue.',
        'Rate each domain: Safe/Stable (1), Mild Need (2), Moderate Need (3), or Urgent Deficit (4).',
        'Identify urgent deficits: Food insecurity (link to Edwards Street Fellowship / Christian Services food pantry); Utility shutoff (link to PRVO LIHEAP).',
        'Assess transportation barriers: Wheelchair requirement, transit route accessibility.',
        'Assess social isolation: Screen for lack of family contact or community engagement.',
        'Incorporate high-need SDOH items directly into the Form 05 Care Plan.',
      ],
      documentationRequired: 'Completed Form 08 with composite vulnerability score and referral action log.',
      redFlags: ['Imminent eviction or utility shut-off within 72 hours', 'Client reporting skipping meals due to empty pantry', 'Unmanaged financial exploitation by acquaintances'],
      qualityStandard: 'All moderate/urgent needs linked to vetted community resource within 3 business days.',
    },
    {
      stepNumber: 'Step 9',
      code: 'SOP 4.9',
      title: 'Clinical Appointment Prep, Accompaniment & Debrief',
      formId: '09',
      formName: 'Form 09: Clinical Appointment Preparation and Debrief Sheet',
      timeline: 'Initiated T-48 hours prior to appointment; debrief completed within T+24 hours post-visit',
      responsibleRole: 'Care Navigator',
      objective: 'Ensure client arrives prepared for clinical encounters, advocates effectively, and communicates physician findings to family.',
      keyActionItems: [
        'T-48 Hours: Call physician office to verify appointment time, address, provider name, and required documents.',
        'T-48 Hours: Verify transportation booking (Hub City Transit, Coast Transit, or designated family driver).',
        'T-24 Hours: Conduct pre-visit prep with client: review recent symptoms, draft top 3 questions, pack appointment folder.',
        'Day of Visit: Accompany client, arrive 15 minutes early, assist with check-in paperwork.',
        'In Exam Room: Introduce self as Non-Clinical Navigator; take detailed notes on provider instructions and medication changes.',
        'Post-Visit T+24 Hours: Complete Family Care Summary; call designated family proxy with debrief; update client medication record.',
      ],
      documentationRequired: 'Completed Form 09 with physician summary; debrief notes filed in Care Hub.',
      redFlags: ['Physician orders new critical medication requiring immediate pharmacy coordination', 'Client scheduled for invasive procedure without proxy awareness', 'Transportation no-show'],
      qualityStandard: '100% of accompanied visits documented with family debrief issued within 24 hours.',
    },
    {
      stepNumber: 'Step 10',
      code: 'SOP 4.10',
      title: 'Monthly Progress Monitoring & Incident Reporting',
      formId: '10',
      formName: 'Form 10 (Progress Review) & Form 11 (Incident Report)',
      timeline: 'Form 10 completed monthly; Form 11 completed within 24 hours of any critical incident',
      responsibleRole: 'Case Management Director & Assigned Navigator',
      objective: 'Maintain ongoing progress oversight, detect emerging risks, and execute statutory incident reporting when required.',
      keyActionItems: [
        'Conduct monthly progress review (Form 10): Assess goal achievement, medication changes, and upcoming care visits.',
        'Every 90 days, conduct formal care plan recertification conference with client and family.',
        'CRITICAL INCIDENT PROTOCOL (Form 11): Triggered immediately upon fall, medical emergency, medication error, or abuse report.',
        'If client is in immediate danger: Call 911 first, secure emergency medical care, notify family proxy.',
        'Under Mississippi Vulnerable Persons Act (MCA § 43-47-1 et seq.): Report suspected abuse, neglect, or exploitation to Mississippi Department of Human Services APS (1-800-222-8000) within 24 hours.',
        'Document Form 11 using STAR investigation structure (Situation, Task, Action, Result); submit to Director and Advisory RN within 24 hours.',
      ],
      documentationRequired: 'Monthly Form 10 progress report; Form 11 incident report with APS confirmation number if applicable.',
      redFlags: ['Unexplained bruising, burns, or physical injuries', 'Sudden transfer of client property or bank access to third party', 'Substandard home conditions caused by caregiver neglect'],
      qualityStandard: '100% compliance with Mississippi mandatory reporting laws; zero late incident filings.',
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
      requiredContacts: ['Assigned Care Navigator', 'Client', 'Designated Community Partner'],
      documentation: 'Coordination Log in Family Care Hub; updated Operations Task list.',
    },
    {
      tier: 'Tier 2',
      label: 'Moderate / Health Change or Field Hazard',
      severityColor: 'amber',
      examples: [
        'Client reports persistent mild cough, fever < 100.5°F, or increased knee pain',
        'Client missed 1 dose of morning maintenance medication due to nausea',
        'Navigator identifies new tripping hazard or burned-out exterior safety light',
        'Primary caregiver reports feeling exhausted and requesting temporary respite',
      ],
      immediateAction: 'Contact primary care physician clinic to schedule non-urgent consultation; inform designated family proxy; coordinate safety repair or respite voucher.',
      notificationWindow: 'Same day (within 4 to 8 hours)',
      requiredContacts: ['Assigned Care Navigator', 'Primary Care Provider Clinic', 'Designated Family Proxy'],
      documentation: 'Care Hub Note; notification sent to Director; updated Care Plan goal.',
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
      immediateAction: 'Conduct immediate safety check; if fall occurred, encourage client to be evaluated at Urgent Care or ED; if refusal, notify family proxy and PCP immediately; initiate emergency utility crisis funding; contact on-call pharmacy.',
      notificationWindow: 'Immediate (within 1 hour)',
      requiredContacts: ['Director of Case Management', 'Advisory RN Consultant', 'Designated Family Proxy', 'Primary Physician'],
      documentation: 'Form 11 Critical Incident Report drafted; logged in Operations Hub Audit tracking.',
    },
    {
      tier: 'Tier 4',
      label: 'Emergency / Life Threat & Mandatory Abuse Reporting',
      severityColor: 'rose',
      examples: [
        'Active chest pain, difficulty breathing, stroke symptoms (facial droop, arm weakness, slurred speech)',
        'Unresponsive client or fall with loss of consciousness / severe bleeding / head trauma',
        'Active suicide attempt or acute violent crisis in home',
        'Observable signs of severe physical abuse, sexual assault, malnutrition, or major financial theft',
      ],
      immediateAction: 'CALL 911 IMMEDIATELY. Do not attempt private vehicle transport. Stay on scene until paramedics arrive if safe. For suspected abuse: notify Mississippi Adult Protective Services (1-800-222-8000) within 24 hours as required by law.',
      notificationWindow: 'Immediate (0 minutes for 911; within 24 hours for APS)',
      requiredContacts: ['Emergency Services (911)', 'Mississippi Dept of Human Services APS', 'Director Jasmeen Williams', 'Family Proxy', 'Local Law Enforcement (if required)'],
      documentation: 'Form 11 Incident Report mandatory; law enforcement incident number; APS intake confirmation report.',
    },
  ],
  auditChecklist: [
    {
      id: 'sop-audit-1',
      code: 'SOP 4.1 & 4.2',
      title: '5-Day Initial Intake & In-Home Assessment Completed',
      frequency: 'All new clients within 5 business days',
      standard: 'Forms 01, 02, and 07 fully executed with signature and county verification on file.',
      verifiedBy: 'Jasmeen Williams, LBSW',
    },
    {
      id: 'sop-audit-2',
      code: 'SOP 4.3 & 4.4',
      title: 'Client Rights & Digital Handbook Acknowledgment on File',
      frequency: 'Prior to first billable service; renewed annually',
      standard: 'Form 03 Service Agreement and Form 04 Consent/Rights signed by client or designated legal proxy.',
      verifiedBy: 'Operations & Billing Coordinator',
    },
    {
      id: 'sop-audit-3',
      code: 'SOP 4.6 & 4.8',
      title: '30-Day Medication Reconciliation & Allergy Safety Review',
      frequency: 'Every 30 calendar days for all active clients',
      standard: 'Form 06 verified against current pharmacy printout; zero expired medications in daily pill organizer.',
      verifiedBy: 'Advisory Clinical Consultant (RN)',
    },
    {
      id: 'sop-audit-4',
      code: 'SOP 4.9',
      title: 'Clinical Visit Preparation & Transportation 48-Hour Confirmation',
      frequency: 'Prior to every scheduled physician visit',
      standard: 'Form 09 prep sheet generated; ride confirmed 48h prior with Hub City Transit or Coast Transit.',
      verifiedBy: 'Lead Care Navigator',
    },
    {
      id: 'sop-audit-5',
      code: 'SOP 4.9',
      title: '24-Hour Post-Appointment Provider Debrief to Family Proxy',
      frequency: 'Within 24 hours following any accompanied appointment',
      standard: 'Family Care Summary logged and communicated via phone/email to designated proxy.',
      verifiedBy: 'Care Navigator',
    },
    {
      id: 'sop-audit-6',
      code: 'SOP 4.10',
      title: 'Mississippi Adult Protective Services & Ombudsman Rights Notice Issued',
      frequency: 'At enrollment and whenever potential vulnerable adult risk arises',
      standard: 'Client and family supplied with MS Code § 43-47-1 mandatory reporting disclosures and Ombudsman hotline.',
      verifiedBy: 'Director of Case Management',
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
    reportingTimelines: 'Immediate telephone notification to the Mississippi Department of Human Services APS Centralized Intake (1-800-222-8000), followed by written report within 24 hours.',
    hotline: '1-800-222-8000 (Mississippi APS 24/7 Hotline) / Online: www.mdhs.ms.gov',
    localSheriffs: [
      { county: 'Forrest County', phone: '(601) 544-7800', address: '55 Laurel St, Hattiesburg, MS 39401' },
      { county: 'Lamar County', phone: '(601) 794-1005', address: '205 Broad St, Purvis, MS 39475' },
      { county: 'Jones County', phone: '(601) 425-3147', address: '419 N 5th Ave, Laurel, MS 39440' },
      { county: 'Stone County', phone: '(601) 928-7251', address: '1420 Central Ave E, Wiggins, MS 39577' },
    ],
    internalEscalationSteps: [
      'Step 1: Ensure the immediate physical safety of the vulnerable adult. If active emergency or threat of physical violence, call 911 immediately.',
      'Step 2: Notify Director Jasmeen Williams, LBSW immediately via phone call.',
      'Step 3: Contact the Mississippi APS 24/7 Hotline at 1-800-222-8000 and record the report intake number.',
      'Step 4: Complete Form 11 (Critical Incident Report) within 24 hours, recording all factual observations, statements, and actions taken without editorializing.',
      'Step 5: Preserve all evidence, documents, financial notices, or photographs in an encrypted, restricted file.',
    ],
  },
  fieldSafetyGuidelines: [
    'Always notify the office dispatcher or check in via the staff coordination channel prior to entering and immediately upon exiting a client home.',
    'Conduct a dynamic environmental safety sweep upon approaching the property: observe pets/canines, unrestrained animals, visible weapons, or volatile bystanders.',
    'Keep your mobile phone fully charged and accessible on your person; never leave your phone or bag unattended in an unverified location.',
    'If you observe active drug manufacturing, unconfined aggressive animals, or weapons handled threateningly, do NOT enter. Return to your vehicle and notify the Director.',
    'Do not transport clients in staff personal vehicles unless specifically authorized under agency commercial insurance with signed Form 04 waiver.',
  ],
  ethicsAndConduct: {
    corePrinciples: [
      'Adhere strictly to the National Association of Social Workers (NASW) Code of Ethics and National Association of Healthcare Advocacy (NAHAC) standards.',
      'Maintain unconditional positive regard, cultural humility, and anti-ageist communication in all interactions with South Mississippi elders.',
      'Respect client self-determination: Clients possess the right to make their own lifestyle and healthcare decisions, including the right to refuse services, unless adjudicated legally incompetent by a Mississippi chancery court.',
    ],
    giftPolicy: 'Staff may NOT accept cash, checks, gift cards, or financial favors under any circumstance. Nominal handmade crafts, baked goods, or small tokens with a value under $15 may be graciously shared with the entire agency office.',
    conflictOfInterest: 'Staff shall never enter into business transactions, loan money, borrow money, or purchase property from clients or their families.',
    confidentialityAndHIPAA: 'All client information is confidential under HIPAA and Mississippi privacy statutes. Documents containing Protected Health Information (PHI) must be stored in locked file cabinets or encrypted digital platforms. Never discuss client cases in public dining areas or non-secure spaces.',
    continuingEducation: 'All navigators and case managers must complete a minimum of 10 continuing education units (CEUs) annually covering Mississippi elder law, dementia care, ethics, and cultural competency in rural healthcare.',
  },
  quizQuestions: [
    {
      id: 'quiz-1',
      scenario: 'A client’s daughter asks you to fill her mother’s 7-day pill organizer because she has to go out of town for work.',
      proposedAction: 'You agree and place the pills into the compartments according to the prescription bottles on the counter.',
      isApproved: false,
      explanation: 'PROHIBITED. Filling pill organizers is considered medication administration/dispensing under Mississippi nursing laws. Instead, staff should advise the family to request a multi-dose blister pack from Corner Drug Co. or have family pre-fill the boxes.',
      relevantSOP: 'SOP 4.8 / Section 2.2 Scope Guardrails',
    },
    {
      id: 'quiz-2',
      scenario: 'During an appointment with Dr. Thornton, the doctor gives detailed instructions about adjusting Lisinopril. The client seems confused.',
      proposedAction: 'You ask the doctor to write down the instructions clearly, confirm the reason for the change, take detailed notes, and summarize the discussion for the family.',
      isApproved: true,
      explanation: 'APPROVED. Serving as a health literacy liaison and scribe during physician encounters is a core non-clinical navigation responsibility.',
      relevantSOP: 'SOP 4.9 (Appointment Accompaniment)',
    },
    {
      id: 'quiz-3',
      scenario: 'You notice severe bruising on a client’s upper arms and back that the client hesitantly attributes to "bumping into the door." The live-in grandson appears hostile.',
      proposedAction: 'You document your objective physical observations and immediately contact the Mississippi APS Hotline (1-800-222-8000) and notify Director Jasmeen Williams.',
      isApproved: true,
      explanation: 'APPROVED & MANDATORY. Under the Mississippi Vulnerable Persons Act (MCA § 43-47-1), staff are mandated reporters and must immediately notify APS when abuse or neglect is suspected.',
      relevantSOP: 'SOP 4.10 / Section 5 Mandatory Reporting',
    },
    {
      id: 'quiz-4',
      scenario: 'A client’s electric bill is 2 months past due, and a shutoff notice was delivered. The client asks you to write and sign a check from their bank account.',
      proposedAction: 'You sign the client’s check using their pen so their power stays on.',
      isApproved: false,
      explanation: 'PROHIBITED. Staff may NEVER sign checks, manage bank accounts, or handle client financial instruments. Instead, immediately assist the client with an emergency LIHEAP grant via PRVO or Christian Services.',
      relevantSOP: 'SOP 4.8 / Section 2.2 Financial Safeguards',
    },
    {
      id: 'quiz-5',
      scenario: 'A client in Stone County complains of sudden onset slurred speech, facial drooping on the right side, and right arm numbness.',
      proposedAction: 'You immediately call 911 for emergency paramedic response and remain on the line until first responders arrive.',
      isApproved: true,
      explanation: 'APPROVED & REQUIRED. These are classic FAST stroke symptoms (Tier 4 Emergency). Immediate 911 dispatch is required; navigators must never attempt transport in a private vehicle.',
      relevantSOP: 'Section 5 Emergency Escalation Protocol',
    },
  ],
};

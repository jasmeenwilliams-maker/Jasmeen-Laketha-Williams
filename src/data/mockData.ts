import { ClientProfile, Appointment, MedicationItem, CoordinationLog, CommunityResource, InvoiceItem, ClientRecord, OperationsTask } from '../types';

export const DEFAULT_TEMPLATE_CLIENT: ClientProfile = {
  id: 'SW-MS-2026-###',
  name: 'Standard Client Handbook',
  representativeName: undefined,
  representativeRelation: undefined,
  dob: 'Service Year 2026',
  phone: '601-554-6067',
  address: 'Pine Belt Region, South Mississippi',
  county: 'Forrest, Lamar, Jones & Stone Counties, MS',
  careCoordinator: {
    name: 'Jasmeen Williams',
    credential: 'LPN, BS-HHS, Owner and Care Coordinator',
    phone: '601-554-6067',
    email: 'jasmeenwilliams@southernwellofsouthms.com',
    office: 'Hattiesburg Hub · Forrest, Lamar, Jones & Stone Counties, MS',
  },
  enrolledDate: 'Active Production Standard',
  qrPortalUrl: '',
  googleSheetSynced: false,
  gate1Status: 'verified',
  gate2Status: 'verified',
  acknowledgmentSigned: false,
  signerName: '',
  preferredCommunication: 'phone',
  conditions: [],
};

// Clean production roster — all demo and fake client records removed
export const INITIAL_CLIENT_RECORDS: ClientRecord[] = [];

export const INITIAL_CLIENT: ClientProfile = DEFAULT_TEMPLATE_CLIENT;
export const MOCK_APPOINTMENTS: Appointment[] = [];
export const MOCK_MEDICATIONS: MedicationItem[] = [];
export const MOCK_COORDINATION_LOGS: CoordinationLog[] = [];
export const MOCK_INVOICES: InvoiceItem[] = [];
export const INITIAL_OPERATIONS_TASKS: OperationsTask[] = [];

// Real South Mississippi Community Resources
export const MOCK_RESOURCES: CommunityResource[] = [
  {
    id: 'res-1',
    name: 'Southern Mississippi Planning & Development District (SMPDD) - Area Agency on Aging',
    category: 'Senior Services',
    county: 'Forrest, Lamar, Jones, Harrison, Jackson, Pearl River',
    phone: '1-800-444-8014',
    address: '9229 Highway 49, Gulfport & Hattiesburg Hub',
    description: 'Comprehensive elder resource coordination, respite vouchers, caregiver support groups, and regional advocacy across South Mississippi.',
  },
  {
    id: 'res-2',
    name: 'Hub City Transit & Coastal CareVan Coordinated Rides',
    category: 'Transportation',
    county: 'Forrest & Lamar Counties',
    phone: '601-545-4672',
    address: 'Hattiesburg Intermodal Facility',
    description: 'Curb-to-curb non-emergency medical appointment transit for seniors and individuals requiring reliable clinic transport.',
  },
  {
    id: 'res-3',
    name: 'Pine Belt Mental Health Senior Wellness Outreach',
    category: 'Support Groups',
    county: 'Forrest, Jones, Lamar',
    phone: '601-544-4641',
    address: '103 S 19th Ave, Hattiesburg, MS',
    description: 'Gentle social connection circles, grief support, memory stimulation workshops, and community companionship.',
  },
  {
    id: 'res-4',
    name: 'Extra Table & Forrest County Senior Nutrition Program',
    category: 'Nutrition & Meals',
    county: 'Forrest County',
    phone: '601-264-0677',
    address: '3904 W 4th St, Hattiesburg, MS',
    description: 'Healthy, shelf-stable and fresh southern produce distribution tailored for seniors managing hypertension and diabetes.',
  },
  {
    id: 'res-5',
    name: 'Forrest General Hospital Community Health Education Center',
    category: 'Healthcare Navigation',
    county: 'Forrest, Jones, Perry, Lamar',
    phone: '601-288-4322',
    address: '6051 US-49, Hattiesburg, MS',
    description: 'Free diabetes self-management classes, cardiac health seminars, and blood pressure monitoring kiosks.',
  },
  {
    id: 'res-6',
    name: 'Jones County Senior Citizens Center',
    category: 'Senior Services',
    county: 'Jones County',
    phone: '601-428-5695',
    address: '526 S Magnolia St, Laurel, MS',
    description: 'Day activities, gentle chair yoga, hot nutritious lunch programs, and fellowship for older adults.',
  },
];

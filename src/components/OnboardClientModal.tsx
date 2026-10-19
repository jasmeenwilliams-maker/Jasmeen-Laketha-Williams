import React, { useState } from 'react';
import { X, UserPlus, Heart, MapPin, UserCheck, ShieldCheck } from 'lucide-react';
import { ClientRecord, ClientProfile } from '../types';

interface OnboardClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (newRecord: ClientRecord) => void;
}

export const OnboardClientModal: React.FC<OnboardClientModalProps> = ({
  isOpen,
  onClose,
  onAddClient,
}) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('1945-06-15');
  const [phone, setPhone] = useState('601-');
  const [county, setCounty] = useState('Forrest County');
  const [address, setAddress] = useState('Hattiesburg, MS');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativeRelation, setRepresentativeRelation] = useState('Daughter / Designated Healthcare Proxy');
  const [conditionsInput, setConditionsInput] = useState('Hypertension, Arthritis');
  const [preferredCommunication, setPreferredCommunication] = useState<'phone' | 'text' | 'email' | 'virtual'>('phone');
  const [starterMedName, setStarterMedName] = useState('Daily Multivitamin / Prescription');
  const [starterMedDosage, setStarterMedDosage] = useState('Standard dose');
  const [starterReminderTime, setStarterReminderTime] = useState('08:00');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = `SW-MS-2026-${randomSuffix}`;

    const conditions = conditionsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newClient: ClientProfile = {
      id: newId,
      name: name.trim(),
      representativeName: representativeName.trim() || undefined,
      representativeRelation: representativeName.trim() ? representativeRelation : undefined,
      dob: dob || 'Not Specified',
      phone: phone || '601-555-0100',
      address: address || `${county}, MS`,
      county,
      careCoordinator: {
        name: 'Sarah Jenkins',
        credential: 'CSA®, Board Certified Patient Advocate',
        phone: '',
        email: 'sjenkins@southernwellcare.org',
        office: 'Hattiesburg Hub, Suite 304, Hattiesburg, MS',
      },
      enrolledDate: today,
      acknowledgmentSigned: false,
      signerName: '',
      preferredCommunication,
      conditions: conditions.length > 0 ? conditions : ['General Wellness Monitoring'],
    };

    const newRecord: ClientRecord = {
      client: newClient,
      appointments: [
        {
          id: `apt-${Date.now()}-1`,
          provider: 'Primary Care Physician',
          specialty: 'Internal Medicine / Family Practice',
          clinic: `${county.replace(' County', '')} Medical Clinic`,
          date: '2026-11-15',
          time: '10:00 AM',
          location: `${county}, MS`,
          transportationArranged: false,
          symptomsToDiscuss: ['Initial care coordination health history intake'],
          questionsForDoctor: ['Review current medications and care plan goals'],
          prepNotes: 'Intake companion sheet prepared by SouthernWell care coordination.',
          status: 'upcoming',
        },
      ],
      medications: starterMedName.trim()
        ? [
            {
              id: `med-${Date.now()}-1`,
              name: starterMedName.trim(),
              dosage: starterMedDosage.trim() || 'Daily',
              frequency: 'Once daily in the morning',
              purpose: 'Wellness maintenance',
              prescribingDoctor: 'Primary Physician',
              pharmacy: 'Local Community Pharmacy',
              refillDueDate: 'Next month',
              observationNotes: 'Monitored daily schedule.',
              needsReview: false,
              reminderTimes: [starterReminderTime],
              reminderEnabled: true,
            },
          ]
        : [],
      coordinationLogs: [
        {
          id: `log-${Date.now()}-1`,
          date: today,
          type: 'Monthly Summary',
          coordinator: 'Sarah Jenkins, CSA®',
          summary: `Client onboarded into SouthernWell Case Management Services. Client Handbook generated and awaiting acknowledgment review.`,
          actionItems: [
            'Provide family handbook copy for signature.',
            'Schedule initial home safety and care coordination intake check-in.',
          ],
          sharedWithFamily: true,
        },
      ],
      invoices: [
        {
          id: `inv-${Date.now()}-1`,
          invoiceNumber: `SW-2026-${randomSuffix}`,
          date: today,
          dueDate: '15 days from enrollment',
          period: 'Onboarding & Comprehensive Care Assessment',
          services: [
            { description: 'Comprehensive Non-Clinical Intake & Handbook Orientation', hours: 4, rate: 65, amount: 260 },
          ],
          total: 260,
          status: 'pending',
        },
      ],
    };

    onAddClient(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pecan-900/60 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-xl w-full border border-sage-200 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-sage-200 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-pecan-900">
                Onboard New Client
              </h3>
              <p className="text-xs text-pecan-600">
                Creates an identical Official Handbook, Family Hub, and Reminder Schedule
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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                Client Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Samuel J. Peterson"
                className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                Service County *
              </label>
              <select
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
              >
                <option value="Forrest County">Forrest County (Hattiesburg)</option>
                <option value="Lamar County">Lamar County (Purvis / Oak Grove)</option>
                <option value="Jones County">Jones County (Laurel / Ellisville)</option>
                <option value="Harrison County">Harrison County (Gulfport / Biloxi)</option>
                <option value="Jackson County">Jackson County (Pascagoula / Ocean Springs)</option>
                <option value="Pearl River County">Pearl River County (Picayune / Poplarville)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="601-555-0100"
                className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
              Residential Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 418 Live Oak Lane, Hattiesburg, MS 39402"
              className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
            />
          </div>

          <div className="p-3 bg-white rounded-2xl border border-sage-200 space-y-3">
            <span className="font-bold text-pecan-900 block text-xs">
              Designated Family Representative / Proxy (Optional)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-pecan-700 mb-0.5">
                  Representative Name
                </label>
                <input
                  type="text"
                  value={representativeName}
                  onChange={(e) => setRepresentativeName(e.target.value)}
                  placeholder="e.g. Karen Hayes"
                  className="w-full px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-pecan-700 mb-0.5">
                  Relationship / Proxy Authority
                </label>
                <input
                  type="text"
                  value={representativeRelation}
                  onChange={(e) => setRepresentativeRelation(e.target.value)}
                  placeholder="e.g. Daughter / Healthcare POA"
                  className="w-full px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
              Monitored Chronic Conditions (Comma-separated)
            </label>
            <input
              type="text"
              value={conditionsInput}
              onChange={(e) => setConditionsInput(e.target.value)}
              placeholder="e.g. Hypertension, Type 2 Diabetes, Arthritis"
              className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
            />
          </div>

          <div className="p-3 bg-white rounded-2xl border border-sage-200 space-y-2">
            <span className="font-bold text-pecan-900 block text-xs">
              Initial Starter Medication & Daily Reminder
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={starterMedName}
                onChange={(e) => setStarterMedName(e.target.value)}
                placeholder="Medication name"
                className="px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
              />
              <input
                type="text"
                value={starterMedDosage}
                onChange={(e) => setStarterMedDosage(e.target.value)}
                placeholder="Strength (e.g. 10 mg)"
                className="px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900"
              />
              <input
                type="time"
                value={starterReminderTime}
                onChange={(e) => setStarterReminderTime(e.target.value)}
                className="px-2.5 py-1.5 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 font-bold"
              />
            </div>
          </div>

          <div className="p-3 bg-olive-50 rounded-xl border border-olive/20 text-[11px] text-pecan-800 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-olive shrink-0 mt-0.5" />
            <span>
              Onboarding automatically configures the standard SouthernWell Client Handbook and generates a dedicated Family Hub for this client.
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-sage-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-sage-200 text-xs text-pecan-700 hover:bg-sage-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-sm cursor-pointer"
            >
              Complete Onboarding & Open Handbook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

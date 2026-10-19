import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  HelpCircle, 
  Pill, 
  AlertCircle,
  FileCheck,
  Share2
} from 'lucide-react';
import { Appointment, ClientProfile, MedicationItem } from '../types';

interface AppointmentPrepScreenProps {
  client: ClientProfile;
  appointments: Appointment[];
  medications: MedicationItem[];
  onUpdateAppointment: (updated: Appointment) => void;
  selectedAptId?: string;
}

export const AppointmentPrepScreen: React.FC<AppointmentPrepScreenProps> = ({
  client,
  appointments,
  medications,
  onUpdateAppointment,
  selectedAptId,
}) => {
  const [activeAptId, setActiveAptId] = useState<string>(
    selectedAptId || appointments[0]?.id || ''
  );
  const [newSymptom, setNewSymptom] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (selectedAptId) {
      setActiveAptId(selectedAptId);
    } else if (appointments.length > 0 && !appointments.some((a) => a.id === activeAptId)) {
      setActiveAptId(appointments[0].id);
    }
  }, [selectedAptId, appointments, activeAptId]);

  const activeApt = appointments.find((a) => a.id === activeAptId) || appointments[0];

  const handleAddSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymptom.trim() || !activeApt) return;
    const updated: Appointment = {
      ...activeApt,
      symptomsToDiscuss: [...activeApt.symptomsToDiscuss, newSymptom.trim()],
    };
    onUpdateAppointment(updated);
    setNewSymptom('');
  };

  const handleRemoveSymptom = (index: number) => {
    if (!activeApt) return;
    const updated: Appointment = {
      ...activeApt,
      symptomsToDiscuss: activeApt.symptomsToDiscuss.filter((_, i) => i !== index),
    };
    onUpdateAppointment(updated);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !activeApt) return;
    const updated: Appointment = {
      ...activeApt,
      questionsForDoctor: [...activeApt.questionsForDoctor, newQuestion.trim()],
    };
    onUpdateAppointment(updated);
    setNewQuestion('');
  };

  const handleRemoveQuestion = (index: number) => {
    if (!activeApt) return;
    const updated: Appointment = {
      ...activeApt,
      questionsForDoctor: activeApt.questionsForDoctor.filter((_, i) => i !== index),
    };
    onUpdateAppointment(updated);
  };

  const handleCopySummary = () => {
    if (!activeApt) return;
    const text = `SouthernWell Appointment Companion Sheet
Client: ${client.name} (DOB: ${client.dob})
Physician: ${activeApt.provider} - ${activeApt.clinic}
Date & Time: ${activeApt.date} at ${activeApt.time}

SYMPTOMS / OBSERVATIONS:
${activeApt.symptomsToDiscuss.map((s, i) => `${i + 1}. ${s}`).join('\n')}

QUESTIONS FOR PROVIDER:
${activeApt.questionsForDoctor.map((q, i) => `${i + 1}. ${q}`).join('\n')}

CURRENT MEDICATIONS REVIEWED:
${medications.map((m) => `• ${m.name} (${m.dosage}) - ${m.frequency}`).join('\n')}

Care Coordinator: ${client.careCoordinator.name}, CSA®${client.careCoordinator.phone ? ` (${client.careCoordinator.phone})` : ''}`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!activeApt) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-pecan-600">No scheduled appointments available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-200">
      
      {/* Header and appointment selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-olive px-3 py-1 bg-olive-50 rounded-full border border-olive/20 inline-block">
              Section 07 Tool · Appointment Preparation
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sage-100 text-pecan-800">
              Client: {client.name} (Case #{client.id})
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-pecan-900">
            Doctor Visit Companion Sheet
          </h1>
          <p className="text-xs sm:text-sm text-pecan-600 mt-1">
            Build your personalized question sheet and symptom log before sitting down with your doctor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print Companion Sheet
          </button>
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-sage-200 text-pecan-700 text-xs font-semibold hover:bg-sage-50 transition-colors"
          >
            <Share2 className="w-4 h-4 text-olive" />
            {isCopied ? 'Copied to Clipboard!' : 'Copy Summary'}
          </button>
        </div>
      </div>

      {/* Appointment Tab Selector */}
      <div className="flex flex-wrap gap-2">
        {appointments.map((apt) => (
          <button
            key={apt.id}
            onClick={() => setActiveAptId(apt.id)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
              activeApt.id === apt.id
                ? 'bg-olive text-white border-olive shadow-sm'
                : 'bg-white text-pecan-800 border-sage-200 hover:bg-sage-50'
            }`}
          >
            <div className="font-bold">{apt.provider}</div>
            <div className={`text-[11px] ${activeApt.id === apt.id ? 'text-olive-100' : 'text-pecan-600'}`}>
              {apt.date} · {apt.specialty}
            </div>
          </button>
        ))}
      </div>

      {/* Printable Sheet View */}
      <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-10 border border-sage-200 shadow-sm space-y-8">
        
        {/* Physician & Visit Information */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-sage-200">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-olive">Physician & Clinic</span>
            <h2 className="font-serif text-2xl font-bold text-pecan-900 mt-0.5">
              {activeApt.provider}
            </h2>
            <p className="text-sm font-semibold text-pecan-700">{activeApt.specialty}</p>
            <p className="text-xs text-pecan-600 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-olive shrink-0" />
              {activeApt.clinic} · {activeApt.location}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-sage-200 text-xs min-w-[200px] text-right sm:text-right">
            <span className="text-pecan-600 block">Appointment Date & Time</span>
            <span className="font-bold text-pecan-900 text-sm block mt-0.5">{activeApt.date} at {activeApt.time}</span>
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
              {activeApt.transportationArranged ? 'Ride Confirmed (CareVan)' : 'Private Transport'}
            </span>
          </div>
        </div>

        {/* Symptoms & Observations to Discuss */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-pecan-900 flex items-center gap-2">
                <span>🔍</span> Symptoms & Changes to Review
              </h3>
              <p className="text-xs text-pecan-600">
                Noticeable day-to-day changes in comfort, stamina, sleep, or routine.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {activeApt.symptomsToDiscuss.map((symp, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-sage-200 text-xs sm:text-sm text-pecan-900"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-olive-50 text-olive text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{symp}</span>
                </div>
                <button
                  onClick={() => handleRemoveSymptom(idx)}
                  className="no-print text-pecan-600 hover:text-rose p-1 transition-colors"
                  title="Remove symptom"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddSymptom} className="no-print flex gap-2 pt-1">
            <input
              type="text"
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              placeholder="Add another symptom or observation (e.g. Mild knee stiffness after morning walks)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-sage-200 text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-sage-100 hover:bg-sage-200 text-pecan-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Symptom
            </button>
          </form>
        </div>

        {/* Questions for the Doctor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-pecan-900 flex items-center gap-2">
                <span>💬</span> Specific Questions for Doctor
              </h3>
              <p className="text-xs text-pecan-600">
                Coordinated with Sarah Jenkins, CSA® so you never forget what to ask.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {activeApt.questionsForDoctor.map((quest, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-sage-200 text-xs sm:text-sm text-pecan-900"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-olive text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ?
                  </span>
                  <span className="font-medium">{quest}</span>
                </div>
                <button
                  onClick={() => handleRemoveQuestion(idx)}
                  className="no-print text-pecan-600 hover:text-rose p-1 transition-colors"
                  title="Remove question"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddQuestion} className="no-print flex gap-2 pt-1">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Add a question for the doctor (e.g. Can we review my morning blood pressure readings?)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-sage-200 text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-olive text-white hover:bg-olive-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Question
            </button>
          </form>
        </div>

        {/* Current Medication Summary for Provider Review */}
        <div className="space-y-3 pt-4 border-t border-sage-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-pecan-900 flex items-center gap-2">
                <span>💊</span> Synchronized Medication List
              </h3>
              <p className="text-xs text-pecan-600">
                Observed and verified with Corner Drug Co. and Hattiesburg Clinic Pharmacy.
              </p>
            </div>
            <span className="text-[11px] text-olive font-semibold bg-olive-50 px-2 py-0.5 rounded-md">
              SOP-06 Observation Only
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {medications.map((med) => (
              <div key={med.id} className="p-3 bg-white rounded-xl border border-sage-200">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-pecan-900 font-bold">{med.name} ({med.dosage})</strong>
                  <span className="text-[10px] text-pecan-600">{med.pharmacy.split(' ')[0]}</span>
                </div>
                <p className="text-pecan-700">{med.frequency}</p>
                <p className="text-pecan-600 text-[11px] mt-0.5">Purpose: {med.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Non-clinical Care Coordination Sign-off on Companion Sheet */}
        <div className="p-4 bg-sage-50/70 rounded-2xl border border-sage-200 text-xs text-pecan-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <strong className="text-pecan-900 block">SouthernWell Case Management Services</strong>
            <span>Prepared by {client.careCoordinator.name}, {client.careCoordinator.credential} · Hattiesburg Coordination Hub</span>
          </div>
          <div className="text-[11px] text-pecan-600">
            Client File: #{client.id} · Non-Clinical Observation Sheet
          </div>
        </div>

      </div>

    </div>
  );
};

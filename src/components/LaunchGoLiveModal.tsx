import React, { useState } from 'react';
import { 
  X, 
  Rocket, 
  CheckCircle2, 
  ShieldCheck, 
  FileSpreadsheet, 
  QrCode, 
  Phone, 
  MapPin, 
  Printer, 
  AlertTriangle,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  FileCheck,
  Heart
} from 'lucide-react';
import { ClientRecord } from '../types';

interface LaunchGoLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLiveMode: boolean;
  onToggleLiveMode: (isLive: boolean) => void;
  clientRecords: ClientRecord[];
  onOpenGoogleSheet: () => void;
  onOpenOnboardModal: () => void;
}

export const LaunchGoLiveModal: React.FC<LaunchGoLiveModalProps> = ({
  isOpen,
  onClose,
  isLiveMode,
  onToggleLiveMode,
  clientRecords,
  onOpenGoogleSheet,
  onOpenOnboardModal,
}) => {
  const [goLiveDate, setGoLiveDate] = useState<string>(() => {
    return localStorage.getItem('sw_go_live_timestamp') || 'October 19, 2026 · 11:00 AM CST';
  });

  const [checklist, setChecklist] = useState({
    sopApproved: true,
    regionalCoverage: true,
    googleSheetLinked: true,
    qrPortalActive: true,
    phoneHotlineActive: true,
    intakeFormsReady: true,
    hipaaScopeReviewed: true,
    consultingRNRetained: true,
    porchFundFlyer: true,
  });

  if (!isOpen) return null;

  const handleToggle = () => {
    const nextState = !isLiveMode;
    onToggleLiveMode(nextState);
    if (nextState) {
      const now = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
      });
      setGoLiveDate(now);
      localStorage.setItem('sw_go_live_timestamp', now);
      localStorage.setItem('sw_is_live_mode', 'true');
    } else {
      localStorage.setItem('sw_is_live_mode', 'false');
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const allItemsChecked = Object.values(checklist).every(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pecan-900/60 backdrop-blur-xs overflow-y-auto no-print-backdrop">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full border border-sage-200 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 my-8 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sage-200 pb-3 mb-5 no-print">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-xs ${
              isLiveMode 
                ? 'bg-emerald-600 text-white animate-pulse' 
                : 'bg-olive-50 border border-olive/20 text-olive'
            }`}>
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-pecan-900">
                  Launch & Go-Live Operations Center
                </h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isLiveMode
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {isLiveMode ? '● LIVE OPERATIONAL' : '○ PRE-LAUNCH VERIFICATION'}
                </span>
              </div>
              <p className="text-xs text-pecan-600">
                SouthernWell Case Management Services · Production Deployment Control
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

        {/* Live Banner & Mode Toggle */}
        <div className="bg-white p-5 rounded-2xl border-2 border-olive/30 shadow-xs mb-5 no-print">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pecan-600 block">
                Production System Environment
              </span>
              <h4 className="font-serif text-lg font-bold text-pecan-900">
                {isLiveMode ? 'System is LIVE for Pine Belt Client Intakes' : 'System in Pre-Launch Readiness Mode'}
              </h4>
              <p className="text-xs text-pecan-600 mt-0.5">
                {isLiveMode 
                  ? `Activated on ${goLiveDate} · Active Roster: ${clientRecords.length} enrolled patients` 
                  : 'Review the launch checklist below and toggle to deploy live.'}
              </p>
            </div>

            <button
              onClick={handleToggle}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-xs cursor-pointer ${
                isLiveMode
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-olive hover:bg-olive-700 text-white'
              }`}
            >
              {isLiveMode ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Production Live Active</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Activate Production Go-Live</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Printable Official Go-Live Attestation Certificate */}
        <div className="bg-white p-6 rounded-2xl border border-sage-200 shadow-sm space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-sage-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-olive text-white flex items-center justify-center font-serif font-bold text-xs shadow-2xs">
                SW
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-pecan-900 block leading-tight">
                  SouthernWell Case Management Services
                </span>
                <span className="text-[10px] text-olive font-semibold">
                  SOP Revision 2 · Owner & Clinical Operations Approval
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Go-Live Verified
            </span>
          </div>

          {/* Core Launch Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            <div className="p-3 rounded-xl bg-sage-50/60 border border-sage-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pecan-600 block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-olive" />
                Service Territory
              </span>
              <strong className="text-pecan-900 block font-semibold">
                Forrest, Lamar, Jones & Stone Counties
              </strong>
              <span className="text-[11px] text-pecan-600">
                Pine Belt Region, Mississippi · Headquarters: Hattiesburg
              </span>
            </div>

            <div className="p-3 rounded-xl bg-sage-50/60 border border-sage-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pecan-600 block flex items-center gap-1">
                <Phone className="w-3 h-3 text-olive" />
                Central Dispatch Hotline
              </span>
              <strong className="text-pecan-900 block font-semibold font-mono">
                601-554-6067
              </strong>
              <span className="text-[11px] text-pecan-600">
                Printed on all client handbooks, cards & SOP materials
              </span>
            </div>

            <div className="p-3 rounded-xl bg-sage-50/60 border border-sage-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pecan-600 block flex items-center gap-1">
                <QrCode className="w-3 h-3 text-olive" />
                Patient QR Portal Link Engine
              </span>
              <strong className="text-pecan-900 block font-semibold text-emerald-800">
                Active for All Enrolled Seniors
              </strong>
              <span className="text-[11px] text-pecan-600">
                Instant smartphone camera access for family care hubs
              </span>
            </div>

            <div className="p-3 rounded-xl bg-sage-50/60 border border-sage-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pecan-600 block flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3 text-olive" />
                Google Sheet Master Register
              </span>
              <strong className="text-pecan-900 block font-semibold text-emerald-800">
                Live Synchronized & Connected
              </strong>
              <span className="text-[11px] text-pecan-600">
                Real-time multi-staff intake logging & CSV sync
              </span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1 sm:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-600 fill-rose-300" />
                The Granny Doris Porch Fund & Community Flyer
              </span>
              <strong className="text-rose-950 block font-semibold">
                Official 8.5 x 11 Flyer & Poverty-Level Scholarship Program Activated
              </strong>
              <span className="text-[11px] text-rose-900/90">
                100% free care navigation below poverty line · 50% discount after 6 months · Partner church nominations open
              </span>
            </div>

          </div>

          {/* Launch Verification Checklist */}
          <div className="pt-3 border-t border-sage-100 space-y-2">
            <span className="font-bold text-xs text-pecan-900 block uppercase tracking-wide">
              Mandatory SOP Rev 2 Operational Checklist:
            </span>

            <div className="space-y-1.5">
              {[
                { key: 'sopApproved', label: 'SOP Revision 2 Guide Approved (18 Detailed Procedures)' },
                { key: 'regionalCoverage', label: 'Service Area Boundaries Defined (Forrest, Lamar, Jones, Stone MS)' },
                { key: 'googleSheetLinked', label: 'Google Sheets Master Intake & Enrollment Register Connected' },
                { key: 'qrPortalActive', label: 'Patient QR Scan Links Assigned for Digital Handbooks & Fridge Cards' },
                { key: 'porchFundFlyer', label: 'The Granny Doris Porch Fund & 8.5 x 11 Community Flyer Activated' },
                { key: 'phoneHotlineActive', label: 'Single Contact Hotline 601-554-6067 Verified on All Forms' },
                { key: 'intakeFormsReady', label: 'Client Forms Packet 01–11 Standardized and Digitally Fillable' },
                { key: 'hipaaScopeReviewed', label: 'Non-Clinical Scope Clear: Private Pay, No Medical Diagnosis' },
                { key: 'consultingRNRetained', label: 'Clinical Advisory Retained (Consulting RN Reviewer & LCSW)' },
              ].map((item) => {
                const isChecked = checklist[item.key as keyof typeof checklist];
                return (
                  <div
                    key={item.key}
                    onClick={() => setChecklist(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof checklist] }))}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F4] border border-sage-200/70 hover:bg-sage-50 transition-colors cursor-pointer text-xs"
                  >
                    <span className="text-pecan-800 font-medium flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-md flex items-center justify-center text-xs font-bold ${
                        isChecked ? 'bg-olive text-white' : 'border border-sage-300'
                      }`}>
                        {isChecked ? '✓' : ''}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Executive Sign-off */}
          <div className="pt-3 border-t border-sage-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-pecan-900 block">Executive Attestation:</span>
              <span className="text-pecan-700">Jasmeen Williams, LPN, BS-HHS</span>
              <span className="text-[11px] text-pecan-600 block">Owner & Care Coordinator · SouthernWell</span>
            </div>
            <div className="sm:text-right">
              <span className="font-bold text-pecan-900 block">Clinical Oversight:</span>
              <span className="text-pecan-700">Consulting RN Reviewer (RN, BSN, CCM)</span>
              <span className="text-[11px] text-pecan-600 block">Monthly Sample Review & Non-Clinical Quality Audits</span>
            </div>
          </div>

        </div>

        {/* Actions Row */}
        <div className="mt-5 flex items-center justify-between gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-sage-200 text-pecan-700 hover:bg-sage-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenGoogleSheet}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Google Sheet Master</span>
            </button>

            <button
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-pecan-900 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-olive" />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenOnboardModal();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-olive text-white hover:bg-olive-700 text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Enrol Live Client</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

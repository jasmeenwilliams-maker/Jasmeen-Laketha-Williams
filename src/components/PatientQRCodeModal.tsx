import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  QrCode, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Phone, 
  Heart,
  Share2
} from 'lucide-react';
import { ClientProfile } from '../types';

interface PatientQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientProfile;
}

export const PatientQRCodeModal: React.FC<PatientQRCodeModalProps> = ({
  isOpen,
  onClose,
  client,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Use configured QR portal URL or construct standard client portal URL
  const portalUrl = client.qrPortalUrl || 
    (typeof window !== 'undefined' 
      ? `${window.location.origin}?client=${client.id}` 
      : `https://southernwell.org/portal?client=${client.id}`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pecan-900/60 backdrop-blur-xs overflow-y-auto no-print-backdrop">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full border border-sage-200 shadow-2xl p-6 sm:p-7 animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sage-200 pb-3 mb-4 no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-pecan-900">
                Patient QR Access Portal
              </h3>
              <p className="text-xs text-pecan-600">
                Assigned Digital Handbook & Family Hub QR Link
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

        {/* Printable Card Area */}
        <div id="printable-qr-card" className="bg-white rounded-2xl border-2 border-olive/30 p-6 shadow-sm relative overflow-hidden text-center space-y-4">
          
          {/* Watermark / Brand Header */}
          <div className="flex items-center justify-between pb-3 border-b border-sage-200 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-olive text-white flex items-center justify-center font-bold text-xs font-serif shadow-2xs">
                SW
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-pecan-900 leading-tight">
                  SouthernWell of South Mississippi
                </h4>
                <p className="text-[10px] text-olive font-semibold tracking-wide">
                  Pine Belt Non-Clinical Case Management
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-olive-50 text-olive border border-olive/20 shrink-0">
              Official QR Pass
            </span>
          </div>

          {/* Patient Details */}
          <div className="text-left bg-[#FAF8F4] p-3 rounded-xl border border-sage-200/80">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-pecan-600 block">
                  Enrolled Client
                </span>
                <span className="text-base font-bold text-pecan-900 block font-serif">
                  {client.name}
                </span>
                <span className="text-xs text-pecan-700">
                  Case #{client.id} · {client.county}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider font-bold text-pecan-600 block">
                  DOB
                </span>
                <span className="text-xs font-semibold text-pecan-800">
                  {client.dob}
                </span>
              </div>
            </div>
            {client.representativeName && (
              <div className="mt-2 pt-2 border-t border-sage-200 text-[11px] text-pecan-700">
                <strong>Family Proxy:</strong> {client.representativeName} ({client.representativeRelation || 'Healthcare Proxy'})
              </div>
            )}
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="p-3 bg-white rounded-2xl border-2 border-olive/40 shadow-md inline-block">
              <QRCodeSVG
                value={portalUrl}
                size={180}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-3ntWs936kOOlmlH1M1SV-oHV9Fyyx2uctfZ7xSQ_Sdha-2bObSY2f1ONF5OjE6E9ZqWdmR3K3ZCa4Skk_1VuakkjxQ-lioMiBi5ShRm5cJPhjS9N2auACpbCjV376KGAWnVkS3rV_DGxKw50Z4UzENCM5uWTXHsI9DWs9bAIiryUDEQ8cijZZ4nerueAYixp86FgKMC6-KxYVhpWKFIH1ndcknHxDCUJcLM1uBmX7-Qj5tse9QNBdd08O_-K4ExWfQ",
                  x: undefined,
                  y: undefined,
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
            </div>
            <p className="text-[11px] text-pecan-700 font-semibold mt-3 max-w-xs">
              Point your smartphone camera at this code to open {client.name.split(' ')[0]}'s Live Digital Handbook, Medication Schedule & Appointment Prep.
            </p>
          </div>

          {/* Instructions for Home & Refrigerator Placement */}
          <div className="bg-olive-50/60 p-3 rounded-xl border border-olive/20 text-left text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-olive font-bold">
              <Heart className="w-3.5 h-3.5" />
              <span>Recommended Placement: Refrigerator or Care Binder</span>
            </div>
            <p className="text-[11px] text-pecan-800 leading-relaxed">
              Keep this card accessible in the home. Family members, visiting companions, and emergency responders can scan for vital non-clinical care contacts and appointment schedules.
            </p>
          </div>

          {/* Contact & Hotline Footer */}
          <div className="pt-2 border-t border-sage-200 text-left text-[11px] text-pecan-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-pecan-900 block">Care Coordinator:</span>
              <span>{client.careCoordinator.name}, {client.careCoordinator.credential}</span>
            </div>
            <div className="sm:text-right">
              <span className="font-bold text-olive flex items-center gap-1 sm:justify-end">
                <Phone className="w-3 h-3" />
                <span>601-554-6067</span>
              </span>
              <span className="text-[10px] text-pecan-500">24/7 Crisis: 911</span>
            </div>
          </div>

        </div>

        {/* Portal URL copy row */}
        <div className="mt-4 p-2.5 bg-white rounded-xl border border-sage-200 flex items-center justify-between gap-2 text-xs no-print">
          <div className="truncate text-pecan-700 font-mono text-[11px] max-w-[280px]">
            {portalUrl}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sage-100 hover:bg-sage-200 text-pecan-800 font-semibold transition-colors cursor-pointer text-xs"
              title="Copy URL"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-sage-100 hover:bg-sage-200 text-pecan-800 transition-colors cursor-pointer"
              title="Open Portal in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-between gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-sage-200 text-pecan-700 hover:bg-sage-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-olive text-white hover:bg-olive-700 text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Refrigerator Card</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

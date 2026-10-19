import React, { useState, useRef } from 'react';
import { X, CheckCircle, PenTool, RotateCcw } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSignature: (signerName: string, representativeRole: string, date: string, signatureImage?: string) => void;
  initialSignerName?: string;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSaveSignature,
  initialSignerName = 'Eleanor Mae Woods',
}) => {
  const [signerName, setSignerName] = useState(initialSignerName);
  const [role, setRole] = useState<'client' | 'family_rep'>('client');
  const [repTitle, setRepTitle] = useState('Daughter / Designated Healthcare Proxy');
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('type');
  const [drawn, setDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  if (!isOpen) return null;

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#281f1a';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setDrawn(true);
  };

  const handleEndDraw = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawn(false);
  };

  const handleConfirm = () => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let signatureImg: string | undefined = undefined;
    if (signatureType === 'draw' && canvasRef.current && drawn) {
      signatureImg = canvasRef.current.toDataURL('image/png');
    }

    const effectiveRole = role === 'client' ? 'Client' : repTitle;
    onSaveSignature(signerName, effectiveRole, today, signatureImg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pecan-900/60 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full border border-sage-200 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sage-200 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-olive-50 border border-olive/20 text-olive flex items-center justify-center font-bold">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-pecan-900">Sign Handbook Acknowledgment</h3>
              <p className="text-xs text-pecan-600">SOP-01 & SOP-06 Non-Clinical Care Standard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-sage-100 text-pecan-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-pecan-800 uppercase tracking-wider mb-1">
              Signer Full Legal Name
            </label>
            <input
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-sage-200 rounded-xl text-sm text-pecan-900 focus:outline-none focus:ring-2 focus:ring-olive/40"
              placeholder="e.g. Eleanor Mae Woods"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-pecan-800 uppercase tracking-wider mb-1">
              Signer Capacity / Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                  role === 'client'
                    ? 'bg-olive text-white border-olive shadow-xs'
                    : 'bg-white text-pecan-700 border-sage-200 hover:bg-sage-50'
                }`}
              >
                Client (Primary)
              </button>
              <button
                type="button"
                onClick={() => setRole('family_rep')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                  role === 'family_rep'
                    ? 'bg-olive text-white border-olive shadow-xs'
                    : 'bg-white text-pecan-700 border-sage-200 hover:bg-sage-50'
                }`}
              >
                Authorized Family Rep
              </button>
            </div>
          </div>

          {role === 'family_rep' && (
            <div>
              <label className="block text-xs font-medium text-pecan-700 mb-1">
                Relationship or Proxy Authority
              </label>
              <input
                type="text"
                value={repTitle}
                onChange={(e) => setRepTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-2 focus:ring-olive/40"
                placeholder="e.g. Daughter / Healthcare Power of Attorney"
              />
            </div>
          )}

          {/* Signature Type Switch */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-pecan-800 uppercase tracking-wider">
                Signature Format
              </label>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSignatureType('type')}
                  className={`px-2 py-0.5 rounded-lg ${
                    signatureType === 'type' ? 'bg-olive/10 text-olive font-bold' : 'text-pecan-600 hover:text-pecan-900'
                  }`}
                >
                  Type Script
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureType('draw')}
                  className={`px-2 py-0.5 rounded-lg ${
                    signatureType === 'draw' ? 'bg-olive/10 text-olive font-bold' : 'text-pecan-600 hover:text-pecan-900'
                  }`}
                >
                  Draw Pad
                </button>
              </div>
            </div>

            {signatureType === 'type' ? (
              <div className="bg-white p-4 rounded-xl border border-sage-200 flex items-center justify-center min-h-[90px]">
                <div className="font-serif italic text-2xl text-pecan-900 select-none tracking-wide text-center">
                  {signerName || 'Eleanor Mae Woods'}
                </div>
              </div>
            ) : (
              <div className="relative bg-white rounded-xl border border-sage-200 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={110}
                  onMouseDown={handleStartDraw}
                  onMouseMove={handleDraw}
                  onMouseUp={handleEndDraw}
                  onMouseLeave={handleEndDraw}
                  onTouchStart={handleStartDraw}
                  onTouchMove={handleDraw}
                  onTouchEnd={handleEndDraw}
                  className="w-full h-[110px] cursor-crosshair touch-none"
                />
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="absolute bottom-2 right-2 px-2 py-1 bg-sage-100 hover:bg-sage-200 text-pecan-700 text-[11px] rounded-lg flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Clear
                </button>
              </div>
            )}
          </div>

          <div className="p-3 bg-olive-50/70 border border-olive/20 rounded-xl text-xs text-pecan-800 leading-relaxed">
            By signing, I acknowledge that SouthernWell provides non-clinical care coordination, observation, and appointment advocacy, and does not provide medical diagnosis or emergency care.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-sage-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-sage-200 text-pecan-700 text-xs font-semibold hover:bg-sage-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Apply Signature
          </button>
        </div>

      </div>
    </div>
  );
};

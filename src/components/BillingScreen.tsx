import React, { useState } from 'react';
import { 
  CreditCard, 
  Building, 
  CheckCircle2, 
  Clock, 
  Printer, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  AlertCircle,
  Heart
} from 'lucide-react';
import { InvoiceItem, ClientProfile } from '../types';

interface BillingScreenProps {
  client: ClientProfile;
  invoices: InvoiceItem[];
  onPayInvoice: (invoiceId: string, paymentMethod: string) => void;
  onNavigateToPorchFund?: () => void;
}

export const BillingScreen: React.FC<BillingScreenProps> = ({
  client,
  invoices,
  onPayInvoice,
  onNavigateToPorchFund,
}) => {
  const [activePaymentModal, setActivePaymentModal] = useState<InvoiceItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4129');
  const [achRouting, setAchRouting] = useState('065300214');
  const [achAccount, setAchAccount] = useState('••••••4910');
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingInvoices = invoices.filter((i) => i.status === 'pending');
  const paidInvoices = invoices.filter((i) => i.status === 'paid');

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePaymentModal) return;

    setIsProcessing(true);
    setTimeout(() => {
      const methodLabel = paymentMethod === 'card' 
        ? `Visa ending in 4129 (Direct-Pay)` 
        : `ACH Bank Debit ending in 4910 (Bank of Commerce)`;
      onPayInvoice(activePaymentModal.id, methodLabel);
      setIsProcessing(false);
      setActivePaymentModal(null);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-olive px-3 py-1 bg-olive-50 rounded-full border border-olive/20 inline-block">
              Section 09 Tool · Payment & Billing
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sage-100 text-pecan-800">
              Account: {client.name} (Case #{client.id})
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-pecan-900">
            Direct-Pay Service Billing & Receipts
          </h1>
          <p className="text-xs sm:text-sm text-pecan-600 mt-1">
            Review itemized coordination hours, download statements, and submit direct-pay fees for {client.name}.
          </p>
        </div>

        <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-sage-200 text-xs min-w-[200px]">
          <span className="text-pecan-600 block">Current Account Balance</span>
          <span className="font-bold text-pecan-900 text-2xl block mt-0.5">
            ${pendingInvoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}
          </span>
          <span className="text-[11px] text-olive font-semibold block mt-1">
            {pendingInvoices.length > 0 ? `${pendingInvoices.length} Pending Invoice Due` : 'Account in Good Standing'}
          </span>
        </div>
      </div>

      {/* Mandatory Non-Insurance Disclaimer matching handbook */}
      <div className="bg-olive-50/70 p-5 rounded-2xl border border-olive/20 text-xs text-pecan-800 space-y-1">
        <div className="flex items-center gap-2 font-bold text-olive-900 text-sm">
          <ShieldCheck className="w-4 h-4 text-olive" />
          SOP-14 Direct-Pay Service Standard
        </div>
        <p className="leading-relaxed">
          SouthernWell is a private, direct-pay healthcare management and patient advocacy service. 
          Payment is due at the time of service. <strong>SouthernWell does not bill Medicare, Medicaid, or private commercial health insurers directly.</strong> 
          Itemized routine invoices with care coordination hours can be downloaded below for personal record-keeping or FSA/HSA submission.
        </p>
      </div>

      {/* Granny Doris Porch Fund - Financial Hardship & Scholarship Assistance */}
      <div className="bg-rose-50/70 p-5 rounded-3xl border border-rose-200 text-xs text-rose-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0 mt-0.5">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-serif font-bold text-base text-rose-950">
                The Granny Doris Porch Fund
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900 border border-rose-300">
                Community Aid
              </span>
            </div>
            <p className="text-rose-900 leading-relaxed text-xs max-w-2xl">
              No one should have to choose between care and cost. SouthernWell provides <strong>100% free care coordination</strong> for neighbors living below the poverty line, and <strong>50% off monthly packages</strong> after your first 6 months.
            </p>
          </div>
        </div>

        {onNavigateToPorchFund && (
          <button
            onClick={onNavigateToPorchFund}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-200" />
            <span>View Porch Fund & Flyer</span>
          </button>
        )}
      </div>

      {/* Pending Invoices */}
      {pendingInvoices.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-pecan-900">
            Pending Statements
          </h2>

          <div className="space-y-4">
            {pendingInvoices.map((inv) => (
              <div
                key={inv.id}
                className="bg-white rounded-3xl p-6 border-2 border-olive/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="font-serif text-lg font-bold text-pecan-900">
                      Invoice #{inv.invoiceNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                      Payment Due
                    </span>
                  </div>
                  <p className="text-xs text-pecan-600">
                    Period: <strong className="text-pecan-800">{inv.period}</strong> · Due by {inv.dueDate}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-pecan-700">
                    {inv.services.map((svc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-olive font-bold">•</span>
                        <span>{svc.description} ({svc.hours} hrs @ ${svc.rate}/hr)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-3">
                  <div>
                    <span className="text-xs text-pecan-600 block">Total Due:</span>
                    <span className="font-serif text-2xl font-bold text-pecan-900">
                      ${inv.total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => setActivePaymentModal(inv)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-xs"
                  >
                    <CreditCard className="w-4 h-4" />
                    Pay Invoice Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Paid Receipts & Invoices */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-pecan-900">
          Payment History & Receipts
        </h2>

        <div className="space-y-4">
          {paidInvoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="font-serif text-lg font-bold text-pecan-900">
                    Invoice #{inv.invoiceNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Paid & Cleared
                  </span>
                </div>
                <p className="text-xs text-pecan-600">
                  {inv.period} · Billed {inv.date} · Paid via {inv.paymentMethod}
                </p>

                <div className="mt-3 space-y-1 text-xs text-pecan-700">
                  {inv.services.map((svc, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-olive font-bold">•</span>
                      <span>{svc.description} — ${svc.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-3">
                <div>
                  <span className="text-xs text-pecan-600 block">Amount Paid:</span>
                  <span className="font-serif text-xl font-bold text-pecan-900">
                    ${inv.total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-sage-200 text-pecan-800 text-xs font-semibold hover:bg-sage-50 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-olive" />
                  Print Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Payment Modal */}
      {activePaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pecan-900/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full border border-sage-200 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
            <h3 className="font-serif text-lg font-bold text-pecan-900 mb-1">
              Direct-Pay Invoice #{activePaymentModal.invoiceNumber}
            </h3>
            <p className="text-xs text-pecan-600 mb-4">
              Secure online payment for {activePaymentModal.period} (${activePaymentModal.total.toFixed(2)}).
            </p>

            <form onSubmit={handleProcessPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-olive text-white border-olive'
                        : 'bg-white text-pecan-700 border-sage-200'
                    }`}
                  >
                    💳 Credit/Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ach')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                      paymentMethod === 'ach'
                        ? 'bg-olive text-white border-olive'
                        : 'bg-white text-pecan-700 border-sage-200'
                    }`}
                  >
                    🏦 ACH Bank Transfer
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block font-medium text-pecan-700 mb-0.5">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium text-pecan-700 mb-0.5">Expires</label>
                      <input
                        type="text"
                        defaultValue="08/29"
                        className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-pecan-700 mb-0.5">CVC</label>
                      <input
                        type="text"
                        defaultValue="382"
                        className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block font-medium text-pecan-700 mb-0.5">Routing Number</label>
                    <input
                      type="text"
                      value={achRouting}
                      onChange={(e) => setAchRouting(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-pecan-700 mb-0.5">Account Number</label>
                    <input
                      type="text"
                      value={achAccount}
                      onChange={(e) => setAchAccount(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-sage-200 rounded-xl"
                    />
                  </div>
                </div>
              )}

              <div className="p-3 bg-olive-50 rounded-xl border border-olive/20 text-[11px] text-pecan-800">
                Encrypted 256-bit direct settlement. A formal receipt will be generated immediately for {client.name}.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-sage-200">
                <button
                  type="button"
                  onClick={() => setActivePaymentModal(null)}
                  className="px-3 py-1.5 rounded-xl border border-sage-200 text-xs text-pecan-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2.5 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors shadow-sm disabled:opacity-60"
                >
                  {isProcessing ? 'Processing...' : `Submit Payment ($${activePaymentModal.total.toFixed(2)})`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

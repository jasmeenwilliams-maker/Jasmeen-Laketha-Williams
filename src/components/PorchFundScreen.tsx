import React, { useState } from 'react';
import { 
  Heart, 
  Printer, 
  Share2, 
  Check, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText, 
  Sparkles, 
  Users, 
  ExternalLink,
  ShieldCheck,
  Award,
  Download,
  Eye,
  FileCode
} from 'lucide-react';
import { ClientProfile } from '../types';

interface PorchFundScreenProps {
  client?: ClientProfile;
  onNavigateToScreen?: (screen: any) => void;
  onOpenGoogleSheet?: () => void;
}

interface NominationRecord {
  id: string;
  applicantName: string;
  nominatorName: string;
  phone: string;
  email: string;
  county: string;
  tier: '100%' | '50%';
  season: 'Jan–Jun' | 'Aug–Dec';
  needStory: string;
  date: string;
  status: 'approved' | 'under_review' | 'waitlist';
}

export const PorchFundScreen: React.FC<PorchFundScreenProps> = ({
  client,
  onNavigateToScreen,
  onOpenGoogleSheet,
}) => {
  const [activeTab, setActiveTab] = useState<'flyer' | 'apply' | 'community'>('flyer');
  const [flyerViewMode, setFlyerViewMode] = useState<'embed' | 'canvas'>('embed');
  const [copiedLink, setCopiedLink] = useState(false);

  // Nomination form state
  const [applicantName, setApplicantName] = useState('');
  const [nominatorName, setNominatorName] = useState('');
  const [nominatorRelation, setNominatorRelation] = useState('Church Member / Neighbor');
  const [phone, setPhone] = useState('601-');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Forrest County');
  const [tier, setTier] = useState<'100%' | '50%'>('100%');
  const [season, setSeason] = useState<'Jan–Jun' | 'Aug–Dec'>('Aug–Dec');
  const [needStory, setNeedStory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Local state for active fund allocations
  const [nominations, setNominations] = useState<NominationRecord[]>([
    {
      id: 'pf-1',
      applicantName: 'Mable Lee Robinson (Age 84)',
      nominatorName: 'Rev. Harold Jenkins (Mount Olive Baptist)',
      phone: '601-582-8911',
      email: 'pastor@mtolivehattiesburg.org',
      county: 'Forrest County',
      tier: '100%',
      season: 'Aug–Dec',
      needStory: 'Lives on fixed Social Security of $890/mo; needs ride coordination and medication adherence checks following knee surgery.',
      date: 'Aug 14, 2026',
      status: 'approved',
    },
    {
      id: 'pf-2',
      applicantName: 'Elder Vernon Hayes (Age 78)',
      nominatorName: 'Dorothy Miller (Daughter / Proxy)',
      phone: '601-794-6120',
      email: 'dmiller@pinebeltcare.org',
      county: 'Lamar County',
      tier: '50%',
      season: 'Aug–Dec',
      needStory: 'Completed 6 months on Signature tier; daughter experiencing sudden reduction in work hours. Requesting 50% scholarship.',
      date: 'Sep 02, 2026',
      status: 'approved',
    },
    {
      id: 'pf-3',
      applicantName: 'Lucille Bridges (Age 76)',
      nominatorName: 'First Presbyterian Senior Outreach',
      phone: '601-428-9043',
      email: 'seniorcare@laurelpres.org',
      county: 'Jones County',
      tier: '100%',
      season: 'Aug–Dec',
      needStory: 'Widow with no local family in Laurel; needs doctor companion support for monthly diabetes checkups.',
      date: 'Oct 08, 2026',
      status: 'under_review',
    },
  ]);

  const handleSubmitNomination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim()) return;

    const newRecord: NominationRecord = {
      id: `pf-${Date.now()}`,
      applicantName: applicantName.trim(),
      nominatorName: nominatorName.trim() || 'Self-Nomination',
      phone: phone.trim() || '601-554-6067',
      email: email.trim() || 'jasmeenwilliams@southernwellofsouthms.com',
      county,
      tier,
      season,
      needStory: needStory.trim() || 'Fixed income assistance request for non-clinical care navigation.',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'under_review',
    };

    setNominations([newRecord, ...nominations]);
    setIsSubmitted(true);
  };

  const handlePrintFlyer = () => {
    window.print();
  };

  const handleCopyContact = () => {
    navigator.clipboard.writeText('Jasmeen Williams · 601-554-6067 · jasmeenwilliams@southernwellofsouthms.com');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-[#556B2F] text-[#FDFBF7] rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden no-print">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-widest font-bold px-3 py-1 bg-white/20 rounded-full border border-white/30 text-[#FDFBF7]">
                SouthernWell Community Scholarship
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-100 border border-rose-300/40 font-semibold flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-300 fill-rose-300" />
                <span>In Loving Memory of Granny Doris</span>
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              The Granny Doris Porch Fund
            </h1>
            <p className="text-[#FDFBF7]/90 text-sm sm:text-base max-w-2xl leading-relaxed italic font-serif">
              “No one should have to choose between care and cost. When a neighbor needs help, we make room on the porch.”
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handlePrintFlyer}
              className="px-4 py-2.5 rounded-xl bg-white text-[#556B2F] hover:bg-sage-100 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print 8.5 x 11 Flyer</span>
            </button>
            <button
              onClick={handleCopyContact}
              className="px-3.5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md border border-white/25 transition-all cursor-pointer"
              title="Copy phone & email"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied!' : 'Share Fund Info'}</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/20 text-xs text-white">
          <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
            <span className="text-white/80 block text-[11px] mb-1">Poverty Level Coverage</span>
            <span className="text-2xl font-bold font-serif text-white">100% Free</span>
            <p className="text-[11px] text-white/80 mt-1">Full non-clinical care navigation for families below poverty line</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
            <span className="text-white/80 block text-[11px] mb-1">Care Continuity Discount</span>
            <span className="text-2xl font-bold font-serif text-white">50% Off</span>
            <p className="text-[11px] text-white/80 mt-1">Up to half off one monthly package after your first 6 months</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
            <span className="text-white/80 block text-[11px] mb-1">Two Annual Seasons</span>
            <span className="text-2xl font-bold font-serif text-white">Jan–Jun & Aug–Dec</span>
            <p className="text-[11px] text-white/80 mt-1">Reviewed individually across Forrest, Lamar, Jones & Stone MS</p>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 p-1.5 bg-sage-100/70 rounded-2xl max-w-xl mx-auto no-print">
        <button
          onClick={() => setActiveTab('flyer')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
            activeTab === 'flyer'
              ? 'bg-white text-[#556B2F] shadow-xs'
              : 'text-pecan-700 hover:text-pecan-900'
          }`}
        >
          📄 Official 8.5 x 11 Flyer
        </button>
        <button
          onClick={() => setActiveTab('apply')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
            activeTab === 'apply'
              ? 'bg-white text-[#556B2F] shadow-xs'
              : 'text-pecan-700 hover:text-pecan-900'
          }`}
        >
          ✍️ Nominate a Neighbor
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
            activeTab === 'community'
              ? 'bg-white text-[#556B2F] shadow-xs'
              : 'text-pecan-700 hover:text-pecan-900'
          }`}
        >
          🏡 Active Allocations ({nominations.length})
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: EXACT 8.5 x 11 FLYER EMBED & PRINTABLE CANVAS */}
      {/* ============================================================ */}
      {activeTab === 'flyer' && (
        <div className="flex flex-col items-center space-y-4">
          
          {/* Controls Bar */}
          <div className="no-print flex flex-col md:flex-row items-center justify-between w-full max-w-[850px] gap-3 bg-white p-3.5 rounded-2xl border border-sage-200 shadow-xs text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-pecan-900">Format:</span>
              <div className="inline-flex rounded-xl bg-sage-100 p-1">
                <button
                  onClick={() => setFlyerViewMode('embed')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    flyerViewMode === 'embed'
                      ? 'bg-white text-olive shadow-xs'
                      : 'text-pecan-700 hover:text-pecan-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-olive" />
                  <span>Official Flyer Document</span>
                </button>
                <button
                  onClick={() => setFlyerViewMode('canvas')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    flyerViewMode === 'canvas'
                      ? 'bg-white text-olive shadow-xs'
                      : 'text-pecan-700 hover:text-pecan-900'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5 text-olive" />
                  <span>8.5 x 11 Print Sheet</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/assets/aistudio/Granny_Doris_Porch_Fund_Flyer_08776436.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sage-200 hover:bg-sage-50 text-pecan-800 font-bold transition-colors cursor-pointer"
                title="Open standalone Granny Doris Porch Fund Flyer HTML in a new tab"
              >
                <ExternalLink className="w-3.5 h-3.5 text-olive" />
                <span className="hidden sm:inline">Open Fullscreen</span>
              </a>
              <a
                href="/assets/aistudio/Granny_Doris_Porch_Fund_Flyer_08776436.html"
                download="Granny_Doris_Porch_Fund_Flyer.html"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sage-200 hover:bg-sage-50 text-pecan-800 font-bold transition-colors cursor-pointer"
                title="Download original Granny Doris Porch Fund Flyer HTML file"
              >
                <Download className="w-3.5 h-3.5 text-olive" />
                <span className="hidden sm:inline">Download HTML</span>
              </a>
              <button
                onClick={handlePrintFlyer}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#556B2F] text-white hover:bg-olive-800 font-bold transition-colors shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Flyer</span>
              </button>
            </div>
          </div>

          {/* Embedded Direct HTML Document View */}
          {flyerViewMode === 'embed' ? (
            <div className="w-full max-w-[850px] bg-white rounded-3xl border border-sage-200 shadow-xl overflow-hidden p-2 sm:p-4">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-sage-100 text-[11px] text-pecan-600 px-2">
                <span className="flex items-center gap-1.5 font-mono text-pecan-700">
                  <FileCode className="w-3.5 h-3.5 text-olive" />
                  public/assets/aistudio/Granny_Doris_Porch_Fund_Flyer_08776436.html
                </span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ● Verified Community Asset
                </span>
              </div>
              <iframe
                src="/assets/aistudio/Granny_Doris_Porch_Fund_Flyer_08776436.html"
                title="The Granny Doris Porch Fund Flyer"
                className="w-full h-[1100px] rounded-2xl border border-sage-200 bg-[#FAF9F5]"
              />
            </div>
          ) : (
            /* Printable 8.5 x 11 Canvas (Width 816px, Height 1056px at 96 DPI) */
            <div 
              id="granny-doris-flyer-print"
              className="w-full max-w-[816px] min-h-[1056px] bg-[#FDFBF7] text-[#4A3B32] font-serif border border-sage-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col justify-between"
              style={{ boxSizing: 'border-box' }}
            >
            {/* Flyer Top Header Banner */}
            <div className="bg-[#556B2F] text-[#FDFBF7] text-center py-8 px-10">
              <div className="text-4xl sm:text-5xl italic font-serif leading-tight">
                SouthernWell
              </div>
              <div className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase mt-2 font-semibold">
                of South Mississippi
              </div>
            </div>

            {/* Flyer Body Content */}
            <div className="flex-1 flex flex-col gap-6 p-8 sm:p-12">
              
              {/* Title Block */}
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#4A3B32] font-serif m-0">
                  The Granny Doris<br />Porch Fund
                </h1>
                <p className="text-lg sm:text-xl italic text-[#556B2F] mt-3 font-serif">
                  In loving memory of Granny Doris
                </p>
              </div>

              {/* Heartfelt Purpose Statement */}
              <p className="text-center text-lg sm:text-xl leading-relaxed text-[#4A3B32] font-serif max-w-xl mx-auto m-0">
                No one should have to choose between care and cost. When a neighbor needs help, we make room on the porch.
              </p>

              {/* Three Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2 font-serif">
                <div className="bg-[#EEF1E6] rounded-2xl p-6 text-center flex flex-col justify-center">
                  <div className="text-4xl sm:text-5xl font-bold text-[#556B2F] leading-none">
                    100%
                  </div>
                  <div className="text-sm sm:text-base leading-snug mt-3 text-[#4A3B32]">
                    free services for clients living below the poverty line
                  </div>
                </div>

                <div className="bg-[#EEF1E6] rounded-2xl p-6 text-center flex flex-col justify-center">
                  <div className="text-4xl sm:text-5xl font-bold text-[#556B2F] leading-none">
                    50% off
                  </div>
                  <div className="text-sm sm:text-base leading-snug mt-3 text-[#4A3B32]">
                    up to half off one package's monthly fee after your first 6 months
                  </div>
                </div>

                <div className="bg-[#EEF1E6] rounded-2xl p-6 text-center flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#556B2F] leading-tight py-1">
                    Jan–Jun<br />Aug–Dec
                  </div>
                  <div className="text-sm sm:text-base leading-snug mt-3 text-[#4A3B32]">
                    two enrollment seasons every year
                  </div>
                </div>
              </div>

              {/* Know someone callout banner */}
              <div className="bg-[#556B2F] text-[#FDFBF7] rounded-3xl p-6 sm:p-8 text-center font-serif shadow-sm">
                <div className="text-xl sm:text-2xl font-bold">
                  Know someone who could use this?
                </div>
                <div className="text-sm sm:text-base leading-relaxed mt-2 text-[#FDFBF7]/95 max-w-md mx-auto">
                  A neighbor, church member, or family member struggling to afford care coordination. Reach out today.
                </div>
                <div className="text-2xl sm:text-3xl font-bold mt-4 font-mono tracking-wide">
                  601-554-6067
                </div>
                <div className="text-sm sm:text-base mt-1 text-[#FDFBF7]/90 font-sans">
                  jasmeenwilliams@southernwellofsouthms.com
                </div>
              </div>

            </div>

            {/* Flyer Footer */}
            <div className="pb-8 px-10 text-center border-t border-sage-200/80 pt-4">
              <div className="text-base sm:text-lg italic text-[#556B2F] font-serif">
                Supporting Healing. Strengthening Families.
              </div>
              <div className="font-sans text-xs text-pecan-600 leading-relaxed mt-2 max-w-xl mx-auto">
                Serving Forrest, Lamar, Jones and Stone Counties. Spots are reviewed individually. SouthernWell provides non-clinical care navigation, case management, and advocacy services only.
              </div>
            </div>

          </div>
          )}

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: NOMINATE A NEIGHBOR / APPLY FORM */}
      {/* ============================================================ */}
      {activeTab === 'apply' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="border-b border-sage-200 pb-4">
            <h3 className="font-serif text-2xl font-bold text-pecan-900">
              Nominate a Neighbor or Apply for Assistance
            </h3>
            <p className="text-xs text-pecan-600 mt-1">
              The Granny Doris Porch Fund is funded through SouthernWell's community outreach mission to ensure no South Mississippi senior goes without advocacy.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-pecan-900">
                Nomination Received
              </h4>
              <p className="text-xs text-pecan-700 max-w-md mx-auto leading-relaxed">
                Thank you for looking out for our neighbor. Jasmeen Williams will review the nomination under the {season} enrollment cycle and follow up at <strong>{phone}</strong>.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-olive text-white text-xs font-bold hover:bg-olive-700 transition-colors cursor-pointer"
                >
                  Submit Another Nomination
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitNomination} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Senior / Neighbor Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Samuel Henderson"
                    className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Service County (Pine Belt) *
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                  >
                    <option value="Forrest County">Forrest County (Hattiesburg)</option>
                    <option value="Lamar County">Lamar County (Purvis / Oak Grove)</option>
                    <option value="Jones County">Jones County (Laurel / Ellisville)</option>
                    <option value="Stone County">Stone County (Wiggins)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Nominated By (Your Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={nominatorName}
                    onChange={(e) => setNominatorName(e.target.value)}
                    placeholder="e.g. Pastor James Green / Self"
                    className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Relationship to Client
                  </label>
                  <input
                    type="text"
                    value={nominatorRelation}
                    onChange={(e) => setNominatorRelation(e.target.value)}
                    placeholder="e.g. Church Member, Neighbor, Daughter"
                    className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="601-554-6067"
                    className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="neighbor@pinebeltcare.org"
                    className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                  />
                </div>
              </div>

              {/* Fund Tier Selection */}
              <div className="pt-2">
                <label className="block font-bold text-pecan-800 mb-1.5 uppercase tracking-wide">
                  Porch Fund Assistance Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div 
                    onClick={() => setTier('100%')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      tier === '100%' 
                        ? 'bg-olive/10 border-olive ring-1 ring-olive' 
                        : 'bg-white border-sage-200 hover:bg-sage-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-pecan-900 text-sm">100% Free Scholarship</span>
                      {tier === '100%' && <Check className="w-4 h-4 text-olive" />}
                    </div>
                    <p className="text-[11px] text-pecan-600">
                      Living below the federal poverty line or in emergency fixed income distress.
                    </p>
                  </div>

                  <div 
                    onClick={() => setTier('50%')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      tier === '50%' 
                        ? 'bg-olive/10 border-olive ring-1 ring-olive' 
                        : 'bg-white border-sage-200 hover:bg-sage-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-pecan-900 text-sm">50% Longevity Discount</span>
                      {tier === '50%' && <Check className="w-4 h-4 text-olive" />}
                    </div>
                    <p className="text-[11px] text-pecan-600">
                      For ongoing clients after their first 6 months of continuous care coordination.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enrollment Season */}
              <div className="pt-1">
                <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                  Enrollment Cycle
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-pecan-800">
                    <input
                      type="radio"
                      name="season"
                      checked={season === 'Aug–Dec'}
                      onChange={() => setSeason('Aug–Dec')}
                      className="accent-[#556B2F]"
                    />
                    <span>Aug–Dec Cycle (Active Enrolling)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-pecan-800">
                    <input
                      type="radio"
                      name="season"
                      checked={season === 'Jan–Jun'}
                      onChange={() => setSeason('Jan–Jun')}
                      className="accent-[#556B2F]"
                    />
                    <span>Jan–Jun Cycle (Spring/Summer)</span>
                  </label>
                </div>
              </div>

              {/* Story & Non-Clinical Needs */}
              <div>
                <label className="block font-bold text-pecan-800 mb-1 uppercase tracking-wide">
                  Tell Us About the Need
                </label>
                <textarea
                  rows={3}
                  value={needStory}
                  onChange={(e) => setNeedStory(e.target.value)}
                  placeholder="Describe transportation challenges, clinic appointment preparation, medication routine monitoring, or fixed-income circumstances..."
                  className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                />
              </div>

              <div className="p-3 bg-sage-50 rounded-xl border border-sage-200 text-[11px] text-pecan-600 leading-relaxed">
                *SouthernWell provides private non-clinical care navigation and advocacy only. No medical services or prescriptions are altered. All applications are reviewed with strict confidentiality by Jasmeen Williams, Owner.
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-pecan-600">
                  Questions? Call <strong>601-554-6067</strong>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#556B2F] text-white hover:bg-olive-800 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Submit Nomination to Fund
                </button>
              </div>

            </form>
          )}

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: COMMUNITY ALLOCATIONS & GRANT OVERSIGHT */}
      {/* ============================================================ */}
      {activeTab === 'community' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sage-200 pb-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-pecan-900">
                Porch Fund Community Allocation Tracker
              </h3>
              <p className="text-xs text-pecan-600 mt-0.5">
                Pine Belt Region grant awards, partner church referrals, and poverty-level scholarships
              </p>
            </div>
            {onOpenGoogleSheet && (
              <button
                onClick={onOpenGoogleSheet}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                <span>Sync with Google Sheet</span>
              </button>
            )}
          </div>

          {/* Allocation roster */}
          <div className="space-y-3">
            {nominations.map((nom) => (
              <div
                key={nom.id}
                className="p-4 rounded-2xl bg-[#FAF8F4] border border-sage-200/80 hover:border-olive/40 transition-all text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-pecan-900">
                      {nom.applicantName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-olive-50 text-olive font-bold border border-olive/20">
                      {nom.county}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      nom.tier === '100%' 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                        : 'bg-purple-100 text-purple-900 border border-purple-300'
                    }`}>
                      {nom.tier} Scholarship
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0 ${
                    nom.status === 'approved' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    ● {nom.status === 'approved' ? 'Active Grant Award' : 'Review in Progress'}
                  </span>
                </div>

                <p className="text-pecan-700 text-xs leading-relaxed mb-2">
                  {nom.needStory}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-sage-200/60 text-[11px] text-pecan-600">
                  <div>
                    <span>Nominated by: <strong>{nom.nominatorName}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Season: <strong>{nom.season}</strong></span>
                    <span>Approved / Logged: <strong>{nom.date}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Oversight Sign-off Card */}
          <div className="p-4 rounded-2xl bg-olive-50/60 border border-olive/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-pecan-900 block font-serif text-sm">
                Fund Governance & Community Care Stewardship
              </span>
              <p className="text-pecan-700 text-[11px] mt-0.5">
                Every application is evaluated against the federal poverty threshold and Pine Belt community partner nominations.
              </p>
            </div>
            <div className="shrink-0 sm:text-right">
              <span className="font-bold text-olive block">Jasmeen Williams, LPN, BS-HHS</span>
              <span className="text-[11px] text-pecan-600">Fund Administrator & Owner</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

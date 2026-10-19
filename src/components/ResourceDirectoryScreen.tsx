import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Filter, 
  Search, 
  ExternalLink, 
  Bus, 
  Heart, 
  Users, 
  Utensils 
} from 'lucide-react';
import { CommunityResource, ClientProfile } from '../types';

interface ResourceDirectoryScreenProps {
  client: ClientProfile;
  resources: CommunityResource[];
}

export const ResourceDirectoryScreen: React.FC<ResourceDirectoryScreenProps> = ({
  client,
  resources,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const counties = ['All', 'Forrest', 'Lamar', 'Jones', 'Harrison', 'Jackson', 'Pearl River'];
  const categories = ['All', 'Senior Services', 'Transportation', 'Nutrition & Meals', 'Support Groups', 'Healthcare Navigation'];

  const filteredResources = resources.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesCounty = selectedCounty === 'All' || item.county.toLowerCase().includes(selectedCounty.toLowerCase());
    const matchesSearch = !searchQuery.trim() || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCounty && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-olive px-3 py-1 bg-olive-50 rounded-full border border-olive/20 inline-block mb-2">
            Section 07 Tool · Resource Navigation
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-pecan-900">
            South Mississippi Community Resource Directory
          </h1>
          <p className="text-xs sm:text-sm text-pecan-600 mt-1">
            Verified local aging, transit, meal, and support services across South Mississippi counties.
          </p>
        </div>

        <div className="text-xs text-pecan-700 bg-olive-50/70 p-3.5 rounded-2xl border border-olive/20 max-w-xs">
          <strong className="text-olive block mb-0.5">Need Coordinator Assistance?</strong>
          {client.careCoordinator.name} can directly initiate referrals or coordinate transit vouchers for {client.name}.
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-pecan-600 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search services (e.g. CareVan, Meals on Wheels, SMPDD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-sage-50/60 border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
            />
          </div>

          {/* County Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-pecan-700 font-semibold whitespace-nowrap">County:</span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="px-3 py-2 bg-white border border-sage-200 rounded-xl text-xs text-pecan-900 focus:outline-none focus:ring-1 focus:ring-olive"
            >
              {counties.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Service Counties' : `${c} County`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-sage-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-olive text-white shadow-xs'
                  : 'bg-sage-50/70 text-pecan-800 hover:bg-sage-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl p-6 border border-sage-200 shadow-xs flex flex-col justify-between hover:border-olive/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-olive-50 text-olive text-[11px] font-bold border border-olive/20">
                  {res.category}
                </span>
                <span className="text-[11px] text-pecan-600 bg-sage-50 px-2 py-0.5 rounded-md">
                  {res.county}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-pecan-900 mb-2 leading-snug">
                {res.name}
              </h3>

              <p className="text-xs text-pecan-700 leading-relaxed mb-4">
                {res.description}
              </p>

              <div className="space-y-1.5 text-xs text-pecan-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-olive shrink-0" />
                  <span>{res.address}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-sage-100 flex items-center justify-between">
              <a
                href={`tel:${res.phone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-olive hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                {res.phone}
              </a>
              <span className="text-[11px] text-pecan-600 font-medium">Hattiesburg Hub Verified</span>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-sage-200">
          <p className="text-sm font-semibold text-pecan-800">No resources matched your current filter.</p>
          <p className="text-xs text-pecan-600 mt-1">Try selecting "All Service Counties" or clearing your search term.</p>
        </div>
      )}

    </div>
  );
};

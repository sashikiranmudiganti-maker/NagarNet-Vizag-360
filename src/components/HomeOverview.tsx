import React, { useState } from 'react';
import {
  AlertTriangle,
  MapPin,
  Clock,
  Shield,
  ShieldAlert,
  Radio,
  PhoneCall,
  Bot,
  Activity,
  CheckCircle2,
  TrendingUp,
  Compass,
  ArrowRight,
  Flame,
  Newspaper,
  ChevronRight,
  ExternalLink,
  Award,
} from 'lucide-react';
import { BorderBeam } from 'border-beam';
import { ThinkingOrb } from 'thinking-orbs';
import { Complaint, WeatherData, CivicNewsItem } from '../types';
import { CIVIC_NEWS_ITEMS } from '../data/mockData';
import { calculateSlaStatus } from '../utils/civicLogic';
import nagernetLogoImg from '../assets/images/nagernet_logo_1793901289370.jpg';

interface HomeOverviewProps {
  weather: WeatherData;
  complaints: Complaint[];
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenMitra: () => void;
  onOpenSos: () => void;
  onSelectComplaint: (complaint: Complaint) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  weather,
  complaints,
  onNavigate,
  onOpenSearch,
  onOpenMitra,
  onOpenSos,
  onSelectComplaint,
}) => {
  const [newsTier, setNewsTier] = useState<'local' | 'district' | 'state' | 'national'>('local');

  const filteredNews = CIVIC_NEWS_ITEMS.filter((n) => n.tier === newsTier);

  // Municipal Stats
  const total = complaints.length;
  const inProgress = complaints.filter((c) => c.status === 'in_progress' || c.status === 'under_review').length;
  const resolved = complaints.filter((c) => c.status === 'resolved' || c.status === 'verified_closed').length;
  const complianceRate = Math.round((resolved / Math.max(1, total)) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Banner with Modern Civic Startup Aesthetic */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-8 sm:p-12 shadow-2xl overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-cyan-400/40 shadow-xl shadow-cyan-500/20 bg-slate-950 ring-2 ring-blue-500/30 shrink-0">
              <img
                src={nagernetLogoImg}
                alt="NagarNet Emblem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1.5 rounded-xl text-xs font-black text-sky-300 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Greater Visakhapatnam Municipal Corporation (GVMC)</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            One City. One Platform. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Every Problem Matters.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Welcome to <strong className="text-white font-display-brand text-base sm:text-lg tracking-wide">Nagar<span className="text-blue-400">Net</span></strong>—an AI-powered civic
            intelligence, satellite telemetry, and disaster resilience platform. Citizens report hazards
            with Gemini multimodal vision; municipal engineers are bound by a strict 72-hour SLA.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('report')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span>Report Infrastructure Hazard</span>
            </button>

            {/* HIGH-PRIORITY SOS FEATURE IN TOP HERO */}
            <button
              onClick={onOpenSos}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm shadow-xl shadow-red-600/30 transition-all flex items-center gap-2 border border-red-400/40 animate-pulse"
              title="Trigger Immediate Disaster SOS Beacon"
            >
              <ShieldAlert className="w-4 h-4 text-amber-200" />
              <span>Emergency SOS Beacon</span>
            </button>

            <button
              onClick={() => onNavigate('ward-success')}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
              title="Inspect Ward Success Rates & Solved Problems Portal"
            >
              <Award className="w-4 h-4 text-emerald-200" />
              <span>Ward Success Portal</span>
            </button>

            <button
              onClick={() => onNavigate('map')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Explore Live GIS Map</span>
            </button>

            <button
              onClick={onOpenMitra}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-sky-200" />
              <span>Chat with Mitra AI (తెలుగు / हिंदी)</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Stats on Right for Large Screens */}
        <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 w-72 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <span className="text-xs font-bold text-slate-300 uppercase">Live Vizag Telemetry</span>
            <span className="text-[10px] text-emerald-400 font-bold">● Active Online</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Coastal Air Quality:</span>
              <span className="font-bold text-emerald-400">AQI {weather.aqi} ({weather.aqiStatus})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Ambient Temperature:</span>
              <span className="font-bold text-white">{weather.temp}°C ({weather.condition})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">72h SLA Compliance:</span>
              <span className="font-bold text-sky-400">{complianceRate}% On-Time</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Active Cyclone Shelters:</span>
              <span className="font-bold text-amber-400">4 Multi-purpose Centers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Highlights Metric Strip / Top Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* TOP FEATURE 1: DISASTER RESILIENCE SOS */}
        <div
          onClick={onOpenSos}
          className="bg-gradient-to-br from-red-50 via-rose-50 to-white p-4 sm:p-5 rounded-2xl border-2 border-red-300 hover:border-red-500 shadow-sm flex items-center gap-3.5 cursor-pointer transition-all hover:shadow-md group relative overflow-hidden"
        >
          <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-black shadow-md shadow-red-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
            <ShieldAlert className="w-6 h-6 text-amber-200 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black text-red-700 uppercase tracking-wider block">Top Feature</span>
            <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight">Mesh-SOS</span>
            <span className="text-[10px] text-red-600 font-bold block mt-0.5">1-Tap Distress Beacon</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black flex-shrink-0">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Binding SLA</span>
            <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight">72 Hours</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Strict countdown timer</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Citizen Sign-off</span>
            <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight">Proof-of-Work</span>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Citizen approves closure</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black flex-shrink-0">
            <Flame className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Hotspot Clusters</span>
            <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight">50m Spatial</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Merges duplicate reports</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-black flex-shrink-0">
            <Compass className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Satellite GEE</span>
            <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight">GRACE & SAR</span>
            <span className="text-[10px] text-cyan-600 font-semibold block mt-0.5">Groundwater & Surge</span>
          </div>
        </div>
      </div>

      {/* Rapid Coastal Early Warning & SOS Trigger Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 rounded-2xl p-4 sm:p-5 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-red-400/40">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0">
            <Radio className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                Coastal Early Warning & SOS Command
              </span>
              <span className="text-[10px] bg-red-950/60 border border-red-400/30 px-2 py-0.5 rounded-full text-red-200 font-bold">
                Tide 1.2m • Wind Gusts 55 km/h
              </span>
            </div>
            <p className="text-xs sm:text-sm text-red-100 font-medium mt-0.5">
              Facing localized flooding, coastal surge, or trapped residents? Dispatch an instant SOS beacon to GVMC.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={onOpenSos}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white text-red-700 hover:bg-red-50 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Trigger SOS Beacon</span>
          </button>
          <button
            onClick={() => onNavigate('disaster')}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>Evacuation Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Featured Civic Tickets & Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900">Active Grievance Stream</h2>
            <p className="text-xs text-slate-500">Live infrastructure tickets currently being addressed by GVMC.</p>
          </div>
          <button
            onClick={() => onNavigate('track')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Track All Tickets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {complaints.slice(0, 3).map((c) => {
            const sla = calculateSlaStatus(c.createdAt);

            return (
              <div
                key={c.id}
                onClick={() => {
                  onSelectComplaint(c);
                  onNavigate('track');
                }}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold text-blue-700">{c.id}</span>
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                        c.status === 'resolved'
                          ? 'bg-teal-100 text-teal-800'
                          : c.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{c.title}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{c.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">{c.ward.split(' - ')[0]}</span>
                  <span
                    className={`font-bold ${
                      sla.isOverdue
                        ? 'text-red-600'
                        : sla.urgency === 'critical'
                        ? 'text-amber-600'
                        : 'text-indigo-600'
                    }`}
                  >
                    {sla.formattedTime}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hierarchical News & Public Feeds (NewsAPI / Official Broadcasts) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-base font-black text-slate-900">
                Hierarchical Civic News & Emergency Broadcasts
              </h3>
              <p className="text-xs text-slate-500">
                Official notices synced from GVMC, District Collectorate, and NDMA.
              </p>
            </div>
          </div>

          {/* News Tier Tabs */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-bold text-slate-600">
            <button
              onClick={() => setNewsTier('local')}
              className={`px-3 py-1 rounded-md transition-colors ${
                newsTier === 'local' ? 'bg-white text-blue-700 shadow-sm' : ''
              }`}
            >
              Vizag City
            </button>
            <button
              onClick={() => setNewsTier('district')}
              className={`px-3 py-1 rounded-md transition-colors ${
                newsTier === 'district' ? 'bg-white text-blue-700 shadow-sm' : ''
              }`}
            >
              District
            </button>
            <button
              onClick={() => setNewsTier('state')}
              className={`px-3 py-1 rounded-md transition-colors ${
                newsTier === 'state' ? 'bg-white text-blue-700 shadow-sm' : ''
              }`}
            >
              Andhra Pradesh
            </button>
            <button
              onClick={() => setNewsTier('national')}
              className={`px-3 py-1 rounded-md transition-colors ${
                newsTier === 'national' ? 'bg-white text-blue-700 shadow-sm' : ''
              }`}
            >
              National
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredNews.map((item) => (
            <div key={item.id} className="py-3.5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-blue-600">{item.source}</span>
                <span className="text-slate-400">{item.timestamp}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  ShieldAlert, 
  ShieldCheck,
  Globe, 
  Lock, 
  Unlock, 
  Activity, 
  Layers, 
  Zap,
  Server,
  Cloud,
  Wifi,
  ExternalLink,
  Search,
  FileCode
} from 'lucide-react';
import { cn } from '../lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DnsEvent {
  id: string;
  time: string;
  query: string;
  type: 'A' | 'AAAA' | 'TXT' | 'CNAME' | 'TLSA';
  src: string;
  campus: string;
  status: 'ALLOWED' | 'BLOCKED' | 'SUSPICIOUS';
  reason?: string;
  entropy?: number;
}

const MOCK_CAMPUSES = [
  "North Campus", "South Campus", "East Campus", "West Campus", 
  "Medical Center", "Research Hub", "Innovation Lab", "Student Union",
  "Athletic Village", "Library Annex"
];

const INITIAL_EVENTS: DnsEvent[] = [
  { id: '1', time: '18:31:02', query: 'google.com', type: 'A', src: '10.0.1.45', campus: 'North Campus', status: 'ALLOWED' },
  { id: '2', time: '18:31:05', query: 'v4.0.0.1.dns-tunnel-demo.io', type: 'TXT', src: '10.0.4.12', campus: 'Research Hub', status: 'SUSPICIOUS', entropy: 4.8, reason: 'High Entropy' },
  { id: '3', time: '18:31:08', query: 'cloudflare-dns.com', type: 'AAAA', src: '10.0.2.89', campus: 'South Campus', status: 'ALLOWED' },
  { id: '4', time: '18:31:12', query: 'doh.vpn-bypass.net', type: 'A', src: '10.0.10.5', campus: 'Library Annex', status: 'BLOCKED', reason: 'Hagezi DoH-VPN List' },
];

const TRAFFIC_DATA = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  queries: Math.floor(Math.random() * 5000) + 1000,
  blocked: Math.floor(Math.random() * 200),
}));

export default function DnsScrutiny() {
  const [events, setEvents] = useState<DnsEvent[]>(INITIAL_EVENTS);
  const [activeTab, setActiveTab] = useState<'tunneling' | 'doh' | 'infrastructure'>('tunneling');

  useEffect(() => {
    const interval = setInterval(() => {
      const isTunneling = Math.random() > 0.8;
      const isBlockedIdx = Math.random() > 0.7;
      
      const newEvent: DnsEvent = {
        id: Math.random().toString(36).substr(2, 9),
        time: new Date().toLocaleTimeString([], { hour12: false }),
        query: isTunneling 
          ? `${Math.random().toString(36).substring(2, 15)}.${Math.random().toString(36).substring(2, 8)}.tunnel.io`
          : ['internal-service.local', 'api.github.com', 'microsoft.com', 'outlook.office365.com', 'ai-agent-v1.prod.int'][Math.floor(Math.random() * 5)],
        type: isTunneling ? 'TXT' : (Math.random() > 0.9 ? 'TLSA' : 'A'),
        src: `10.0.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 254)}`,
        campus: MOCK_CAMPUSES[Math.floor(Math.random() * MOCK_CAMPUSES.length)],
        status: isTunneling ? 'SUSPICIOUS' : (isBlockedIdx ? 'BLOCKED' : 'ALLOWED'),
        reason: isTunneling ? 'High Entropy Subdomain' : (isBlockedIdx ? 'Hagezi Filter Match' : undefined),
        entropy: isTunneling ? Number((Math.random() * 2 + 4).toFixed(2)) : undefined
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 50));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Database className="text-emerald-500" />
          DNS Scrutiny & Hardening
        </h2>
          <p className="text-zinc-400 max-w-3xl text-sm leading-relaxed">
          <strong className="text-zinc-300">Blue Team Zero-Trust Console:</strong> Actively monitoring 10 campuses via deep-packet inspection for DNS tunneling, rogue DoH (DNS-over-HTTPS) bypasses, and data exfiltration pipelines. 
          Enforcing strict <b>Root of Trust</b> architecture via DNSSEC and DANE (TLSA records) to prevent AI-agent spoofing and Man-in-the-Middle (MitM) attacks.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Activity size={20} className="text-emerald-500" />}
          label="Total Queries / 24h"
          value="1.2M"
          trend="+12%"
        />
        <StatCard 
          icon={<ShieldAlert size={20} className="text-red-500" />}
          label="Trust Violations"
          value="07"
          trend="Severe"
          trendColor="text-red-500"
        />
        <StatCard 
          icon={<Lock size={20} className="text-blue-500" />}
          label="DNSSEC Coverage"
          value="84.2%"
          trend="Active"
        />
        <StatCard 
          icon={<Layers size={20} className="text-amber-500" />}
          label="DANE Bindings"
          value="254"
          trend="Secure"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Intelligence Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
            <div className="p-6 border-b border-zinc-800 bg-zinc-800/30 flex justify-between items-center">
              <div className="flex gap-4">
                <TabButton active={activeTab === 'tunneling'} onClick={() => setActiveTab('tunneling')}>Real-time Feed</TabButton>
                <TabButton active={activeTab === 'doh'} onClick={() => setActiveTab('doh')}>DoH Compliance</TabButton>
                <TabButton active={activeTab === 'infrastructure'} onClick={() => setActiveTab('infrastructure')}>Trust Anchors</TabButton>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Listen Active
              </div>
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-[11px] p-2 space-y-1">
              <AnimatePresence initial={false}>
                {activeTab === 'infrastructure' ? (
                  <div className="p-4 space-y-4 font-sans">
                     <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-4">
                           <FileCode className="text-blue-500 w-4 h-4" />
                           <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">DANE (TLSA) Identity Audit</h4>
                        </div>
                        <div className="space-y-2">
                           {['api.openai.com', 'anthropic.com', 'google-ai.internal', 'hf.co'].map((domain, i) => (
                             <div key={i} className="flex items-center justify-between p-2 hover:bg-zinc-900 rounded transition-colors group">
                                <div className="flex items-center gap-3">
                                   <div className={cn("w-1.5 h-1.5 rounded-full", i === 2 ? "bg-red-500 animate-pulse" : "bg-emerald-500")} />
                                   <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200">{`_443._tcp.${domain}`}</span>
                                </div>
                                <div className="flex gap-2">
                                   <span className="text-[9px] px-1.5 py-0.5 bg-zinc-800 text-zinc-500 rounded font-mono">TLSA 3 1 1</span>
                                   <span className={cn("text-[9px] font-bold uppercase", i === 2 ? "text-red-500" : "text-emerald-500")}>
                                     {i === 2 ? "FINGERPRINT_MISMATCH" : "VERIFIED"}
                                   </span>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-4">
                           <ShieldCheck className="text-emerald-500 w-4 h-4" />
                           <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">CAA Record Enforcement</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                              <div className="text-[10px] text-zinc-500 uppercase font-bold">Policy</div>
                              <div className="text-xs font-mono text-zinc-300 mt-1">issue "letsencrypt.org"</div>
                              <div className="text-xs font-mono text-zinc-300">issuewild ";"</div>
                           </div>
                           <div className="flex flex-col justify-center">
                              <span className="text-[10px] text-emerald-500 font-bold">STRICT_CAA_ACTIVE</span>
                              <p className="text-[9px] text-zinc-600 mt-1">Blocking non-authorized Certificate Authorities from issuing for root or subdomains.</p>
                           </div>
                        </div>
                     </div>
                  </div>
                ) : (
                  events.map((event) => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "grid grid-cols-12 gap-2 p-2 rounded items-center group transition-colors",
                        event.status === 'BLOCKED' ? "bg-red-500/5 text-red-400/80" :
                        event.status === 'SUSPICIOUS' ? "bg-amber-500/5 text-amber-400/80" :
                        "hover:bg-zinc-800/50 text-zinc-500"
                      )}
                    >
                      <span className="col-span-1 text-zinc-600">{event.time}</span>
                      <span className="col-span-1 font-bold text-zinc-400 text-[10px]">{event.type}</span>
                      <span className={cn(
                        "col-span-4 truncate font-bold",
                        event.status === 'ALLOWED' ? "text-zinc-300" : ""
                      )}>{event.query}</span>
                      <span className="col-span-2 text-zinc-600 text-[10px]">{event.src}</span>
                      <span className="col-span-2 truncate text-zinc-600 uppercase text-[9px]">{event.campus}</span>
                      <div className="col-span-2 text-right">
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase",
                          event.status === 'ALLOWED' ? "bg-emerald-500/10 text-emerald-500" :
                          event.status === 'BLOCKED' ? "bg-red-500/20 text-red-500" :
                          "bg-amber-500/20 text-amber-500"
                        )}>
                          {event.status}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Analysis */}
        <div className="space-y-6">
          {/* Forced DoH Status */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Lock size={16} className="text-blue-500" />
              Browser DoH Policies
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl relative overflow-hidden group">
                 <div className="flex justify-between items-start relative z-10">
                    <div>
                       <div className="text-[10px] text-zinc-500 uppercase font-bold">Primary Resolver</div>
                       <div className="text-sm font-bold text-zinc-200 mt-1">dns.secure-campus.int</div>
                       <div className="text-[10px] text-zinc-600 mt-1">internal-sink: 10.0.0.1</div>
                    </div>
                    <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-bold">HEALTHY</div>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
              </div>

              <div className="space-y-3">
                 <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Site Hardening Progress</div>
                 {MOCK_CAMPUSES.slice(0, 5).map((campus, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">{campus}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-24 bg-zinc-800 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500" style={{ width: `${80 + (i * 4)}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">{80 + (i * 4)}%</span>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Hagezi Sink-hole Stats */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-4">
              <Zap size={16} className="text-amber-500" />
              Bypass Prevention
            </h3>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TRAFFIC_DATA}>
                  <defs>
                    <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="blocked" stroke="#f59e0b" fillOpacity={1} fill="url(#colorBlocked)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
               <div className="flex justify-between items-center text-[11px]">
                  <span className="text-zinc-500">VPN Blocked</span>
                  <span className="text-zinc-300 font-bold">1,204</span>
               </div>
               <div className="flex justify-between items-center text-[11px]">
                  <span className="text-zinc-500">DoH Proxy Blocked</span>
                  <span className="text-zinc-300 font-bold">892</span>
               </div>
               <div className="pt-2 border-t border-zinc-800">
                  <p className="text-[10px] text-zinc-600 leading-tight">
                    Synchronized with Hagezi DNS-DOH-VPN list. Prevents users from manually setting browsers to bypass filters.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Policy Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
               <Globe className="text-blue-500" />
            </div>
            <div>
               <h4 className="font-bold text-blue-400">Public DoH Enforcement</h4>
               <p className="text-xs text-blue-300/60 mt-1 leading-relaxed">
                 For remote workers, we force browser-level DoH to our cloud-anchored resolvers. This ensures the same Hagezi security posture even off-campus.
               </p>
            </div>
         </div>
         <div className="p-6 bg-red-600/10 border border-red-500/20 rounded-3xl flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
               <ShieldAlert className="text-red-500" />
            </div>
            <div>
               <h4 className="font-bold text-red-400">Tunneling Alert Line</h4>
               <p className="text-xs text-red-300/60 mt-1 leading-relaxed">
                 DNS tunneling patterns identified in North Campus for client 10.0.4.12. Suggest immediate investigation for stealth persistence.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendColor = "text-emerald-500" }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendColor?: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-lg hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center">
          {icon}
        </div>
        <span className={cn("text-[10px] font-bold uppercase", trendColor)}>{trend}</span>
      </div>
      <div className="text-3xl font-black text-zinc-100 font-mono tracking-tighter">{value}</div>
      <div className="text-[10px] font-bold text-zinc-500 uppercase mt-1 tracking-widest">{label}</div>
    </div>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full transition-all",
        active ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
      )}
    >
      {children}
    </button>
  );
}

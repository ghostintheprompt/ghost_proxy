import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  BrainCircuit, 
  Skull, 
  Terminal, 
  Zap, 
  Target, 
  MessageSquareWarning,
  Flame,
  FileSearch,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Database,
  Fingerprint,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const PRESSURE_POINTS = [
  { type: 'EXTORTION_ANCHOR', label: 'Patient PII found in chat logs', weight: 95, icon: <Target className="text-red-500" /> },
  { type: 'LEGAL_LIABILITY', label: 'Unsecured merger documents', weight: 88, icon: <ShieldAlert className="text-amber-500" /> },
  { type: 'INSIDER_GRIEVANCE', label: 'HR sentiment indicates flight risk', weight: 72, icon: <MessageSquareWarning className="text-blue-500" /> },
  { type: 'WORLDLEAKS_TTP', label: 'Personalized employee ransom templates', weight: 98, icon: <Skull className="text-red-600" /> },
  { type: 'ANTS_LEAK', label: '11M+ Identity records (Passports/IDs)', weight: 99, icon: <Fingerprint className="text-emerald-500" /> },
];

const SPEED_COMPARISON = [
  { name: 'Manual Audit', time: 120, fill: '#3f3f46' },
  { name: 'AI Accelerated', time: 2, fill: '#ef4444' }
];

const WORLDLEAKS_IOCS = [
  { name: 'privacy.sexy execution', type: 'EPP_KILL', risk: 'CRITICAL' },
  { name: 'SoftPerfect Scanner', type: 'RECON', risk: 'HIGH' },
  { name: 'RustyRocket (Rust)', type: 'EXFIL_TOOL', risk: 'CRITICAL' },
  { name: 'Cloudflare IP Rotation', type: 'NETWORK', risk: 'HIGH' },
];

const ANTS_IOCS = [
  { name: 'Government Credential Leak', type: 'CRED_THEFT', risk: 'CRITICAL' },
  { name: 'Bulk Identity Scraping', type: 'EXFIL', risk: 'CRITICAL' },
  { name: 'ANTS API Manipulation', type: 'API_ABUSE', risk: 'HIGH' },
  { name: 'Secondary Identity Fraud', type: 'FRAUD', risk: 'HIGH' },
];

const SAAS_IOCS = [
  { name: 'Browser Session Hijack', type: 'AUTH_BYPASS', risk: 'CRITICAL' },
  { name: 'Jira API Key Harvesting', type: 'CRED_THEFT', risk: 'HIGH' },
  { name: 'Shadow Instance Discovery', type: 'RECON', risk: 'HIGH' },
  { name: 'Cross-SaaS Syncing', type: 'EXFIL', risk: 'MEDIUM' },
];

export default function ThreatSimulator() {
  const [model, setModel] = useState<'worldleaks' | 'ants' | 'saas'>('worldleaks');
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);

  const startSimulation = () => {
    setIsSimulating(true);
    setHasSimulated(false);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Skull className="text-emerald-500" />
            Threat Actor Lab: {model === 'worldleaks' ? 'Worldleaks Edition' : model === 'ants' ? 'France Titres (ANTS) Edition' : 'Shadow SaaS Edition'}
          </h2>
          <p className="text-zinc-400 max-w-3xl text-sm leading-relaxed">
            {model === 'worldleaks' 
              ? 'Executing the "Worldleaks" 2026 playbook: Initial access via compromised RDP, neutralizing EDR telemetry via kernel-level driver kills (privacy.sexy), and launching an AI-driven script to scrape internal DBs and auto-generate highly personalized, psychologically coercive extortion payloads.'
              : model === 'ants' 
              ? 'Mapping the France Titres (ANTS) catastrophe: Bypassing government API rate limits to execute a bulk scrape of 11M+ identity records. The payload actively synthesizes secondary identities (fake passports/IDs) from biometric metadata for immediate dark-web auction.'
              : 'Exploiting "Shadow SaaS" infrastructure: Locating orphaned internal Jira/Confluence instances via subdomain enumeration. The offensive payload extracts cached browser session tokens (JWTs) to bypass MFA and achieve lateral movement across the target\'s cloud perimeter.'}
          </p>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800 shrink-0">
          <button 
            onClick={() => setModel('worldleaks')}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              model === 'worldleaks' ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            Worldleaks
          </button>
          <button 
            onClick={() => setModel('ants')}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              model === 'ants' ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            France ANTS
          </button>
          <button 
            onClick={() => setModel('saas')}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              model === 'saas' ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            SaaS Hijack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Input / Launcher */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xl">
             <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Exfiltrated Payload</span>
                <Flam className="text-red-500 w-4 h-4" />
             </div>
             
             <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 font-mono text-[11px] h-64 overflow-y-auto text-zinc-500 leading-relaxed uppercase">
                <p className="mb-2 text-zinc-400 font-bold">// {model === 'worldleaks' ? 'WORLDLEAKS TTP REPLICATION' : model === 'ants' ? 'ANTS BREACH ANALYSIS' : 'SHADOW SAAS EXPLOITATION'}</p>
                {model === 'worldleaks' ? (
                  <>
                    <p>{`... privacy.sexy executed (defender killed) ...`}</p>
                    <p>{`... RustyRocket.exe (agent.exe) initiated via SMB ...`}</p>
                    <p>{`... exfiltrating via Cloudflare 6,900+ IPs ...`}</p>
                    <p>{`... payload: employee_directory.csv, internal_comms_db.sql ...`}</p>
                  </>
                ) : model === 'ants' ? (
                  <>
                    <p>{`... bulk scraping identity database ...`}</p>
                    <p>{`... 11,000,000 passport records intercepted ...`}</p>
                    <p>{`... biometric metadata exfiltration in progress ...`}</p>
                    <p>{`... detected cross-border credentials theft ...`}</p>
                  </>
                ) : (
                  <>
                    <p>{`... locating orphaned Jira/Confluence instances ...`}</p>
                    <p>{`... bypass: session token extraction via browser cache ...`}</p>
                    <p>{`... harvesting engineering design docs & API keys ...`}</p>
                    <p>{`... detected 42 unprotected app integrations ...`}</p>
                  </>
                )}
                <p className="mt-4 animate-pulse">{`>>> GENERATING ${model === 'worldleaks' ? 'PERSONALIZED EXTORTION NOTES' : model === 'ants' ? 'SECONDARY FRAUD PAYLOADS' : 'LATERAL MOVEMENT MAPPING'}...`}</p>
             </div>

             <button 
               onClick={startSimulation}
               disabled={isSimulating}
               className={cn(
                 "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg",
                 isSimulating ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" : "bg-red-500 text-zinc-100 hover:bg-red-400 active:scale-95 shadow-red-500/10"
               )}
             >
               {isSimulating ? (
                 <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating {model === 'worldleaks' ? 'Worldleaks' : model === 'ants' ? 'ANTS' : 'SaaS'} Report...
                 </>
               ) : (
                 <>
                  <BrainCircuit size={18} />
                  Simulate {model === 'worldleaks' ? 'Worldleaks' : model === 'ants' ? 'ANTS' : 'SaaS'} Attack
                 </>
               )}
             </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
             <h3 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">{model === 'worldleaks' ? 'Worldleaks' : model === 'ants' ? 'France ANTS' : 'Shadow SaaS'} Indicators (IOCs)</h3>
             <div className="space-y-2">
                {(model === 'worldleaks' ? WORLDLEAKS_IOCS : model === 'ants' ? ANTS_IOCS : SAAS_IOCS).map((ioc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-zinc-950/50 rounded-xl border border-zinc-800">
                     <div>
                        <div className="text-[10px] font-bold text-zinc-300">{ioc.name}</div>
                        <div className="text-[9px] text-zinc-600 font-mono">{ioc.type}</div>
                     </div>
                     <span className={cn(
                       "text-[9px] font-bold px-1.5 py-0.5 rounded",
                       ioc.risk === 'CRITICAL' ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                     )}>{ioc.risk}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right: Simulation Output */}
        <div className="lg:col-span-3 space-y-6">
           <AnimatePresence mode="wait">
              {!isSimulating && !hasSimulated && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full border border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                  <Terminal className="w-12 h-12 text-zinc-800 mb-4" />
                  <h3 className="text-zinc-600 font-bold">Awaiting {model === 'worldleaks' ? 'Worldleaks' : 'ANTS'} Simulation</h3>
                  <p className="text-zinc-700 text-xs mt-2">
                    Launch the simulation to analyze AI-powered {model === 'worldleaks' ? 'personalized extortion' : 'secondary identity fraud'} based on {model === 'worldleaks' ? 'Worldleaks' : 'ANTS breach'} techniques.
                  </p>
                </motion.div>
              )}

              {hasSimulated && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                   {/* Personalization Report */}
                   <div className="bg-zinc-900 border border-red-500/50 p-8 rounded-3xl text-zinc-100 shadow-2xl relative overflow-hidden">
                      <div className="relative z-10 space-y-6">
                         <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-red-500 text-zinc-950 px-2 py-1 rounded">
                              {model === 'worldleaks' ? 'Personalized Extortion Matrix' : model === 'ants' ? 'Secondary Fraud Propagation' : 'Lateral SaaS Expansion'}
                            </span>
                            <MessageSquareWarning size={20} className="text-red-500" />
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                            <div className="space-y-2">
                               <h4 className="text-xs font-bold text-zinc-500 uppercase">{model === 'worldleaks' ? 'Employee Template 01 (Public)' : model === 'ants' ? 'Phishing Payload (ID Theft)' : 'Infiltration Path (Design)'}</h4>
                               <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-[10px] font-mono text-zinc-400 italic">
                                  {model === 'worldleaks' 
                                    ? '"Hello [Name], we have acquired your internal communications... Contact us to prevent leak."'
                                    : model === 'ants'
                                    ? '"Urgent: France Titres identity update required. Please verify your passport [Number] to avoid suspension."'
                                    : '"Extracted Architecture: Orphaned Jira instance 10.0.1.25 contains production AWS keys in description of Ticket SEC-402."'
                                  }
                               </div>
                            </div>
                            <div className="space-y-2">
                               <h4 className="text-xs font-bold text-zinc-500 uppercase">{model === 'worldleaks' ? 'Management Template 01 (Direct)' : model === 'ants' ? 'Synthetic Identity Report' : 'Cross-App Exploitation'}</h4>
                               <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-[10px] font-mono text-zinc-400 italic">
                                  {model === 'worldleaks'
                                    ? '"Attention Board, network compromised via RDP... Price: 15 BTC."'
                                    : model === 'ants'
                                    ? '"Secondary market value: 11M records categorized by verified status. Identity synthetic kits generated."'
                                    : '"Lateral detected: Using Jira token to authenticate with Slack. 85 channels joined without notification."'
                                  }
                               </div>
                            </div>
                         </div>

                         <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                            <p className="text-xs text-red-500 font-bold flex items-center gap-2">
                               <AlertCircle size={14} />
                               AI Summary Impact: Increased negotiation pressure by 400% via employee-level targeting.
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Red Playbook */}
                      <div className="bg-zinc-900 border border-red-500/30 rounded-3xl p-6 space-y-4">
                         <h4 className="text-[10px] uppercase font-bold text-red-500 tracking-widest flex items-center gap-2">
                            <Skull size={14} />
                            Adversary Red Playbook
                         </h4>
                         <div className="space-y-4">
                            {model === 'worldleaks' && (
                              <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                                "The offensive goal is psychological dominance. By taking employee PII and merging it with company 'soft secrets' (like layoff lists), we create a high-pressure environment where every employee becomes an internal advocate for paying the ransom to protect their own privacy."
                              </p>
                            )}
                            {model === 'ants' && (
                              <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                                "We target government API caches because they are often less monitored than the core DB. By scraping 11M IDs, we create a primary dataset for secondary market fraud. The offensive value isn't just the data, but the trust we exploit via phishing these specific victims later."
                              </p>
                            )}
                            {model === 'saas' && (
                              <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                                "We look for 'Shadow IT'—the Jira or Trello boards created by marketing or dev without IT's knowledge. These often contain production keys. Once we have a session token via browser cache exploitation, we have a silent entry point that bypasses traditional network EDR."
                              </p>
                            )}
                         </div>
                      </div>

                      {/* Blue Counter-Measures */}
                      <div className="bg-zinc-900 border border-emerald-500/30 rounded-3xl p-6 space-y-4">
                         <h4 className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest flex items-center gap-2">
                            <ShieldCheck size={14} />
                            Blue Team Defensive Response
                         </h4>
                         <div className="space-y-3">
                            <div className="p-3 bg-zinc-950/50 rounded-xl border border-zinc-800">
                               <div className="text-[10px] font-bold text-zinc-300">Strategy: {model === 'worldleaks' ? 'Kill-Chain Intercept' : model === 'ants' ? 'Sovereignty Enforcement' : 'Identity Scrutiny'}</div>
                               <p className="text-[10px] text-zinc-500 mt-1">
                                  {model === 'worldleaks' 
                                    ? "Monitor EDR for 100+ Cloudflare IP rotations and block 'privacy.sexy' execution signatures instantly." 
                                    : model === 'ants' 
                                    ? "Encrypt API caches at rest and implement query rate-limiting based on biometric sensitivity flags." 
                                    : "Audit browser session longevity and force MFA challenges on any lateral SaaS movement beyond known IPs."}
                               </p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold uppercase py-2 border-t border-zinc-800">
                               <Zap size={12} className="text-amber-500" />
                               Recommended Tool: {model === 'worldleaks' ? 'DNS Scrutiny' : model === 'ants' ? 'Data Sovereignty' : 'Shadow Drive Audit'}
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Pressure Points (Moved below Playbooks) */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                         <h4 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-2">Social Engineering Anchors</h4>
                         <div className="space-y-3">
                            {PRESSURE_POINTS.map((pt, i) => (
                              <div key={i} className="flex gap-4 p-3 bg-zinc-950/50 rounded-2xl border border-zinc-800 group hover:border-zinc-700 transition-colors">
                                 <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">
                                    {pt.icon}
                                 </div>
                                 <div>
                                    <div className="text-xs font-bold text-zinc-200">{pt.label}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                       <div className="h-1 w-20 bg-zinc-800 rounded-full overflow-hidden">
                                          <div className="h-full bg-red-500" style={{ width: `${pt.weight}%` }} />
                                       </div>
                                       <span className="text-[9px] font-mono text-zinc-500">{pt.weight}% Impact</span>
                                    </div>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* Speed Metrics */}
                      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col">
                         <h4 className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-6">Processing Speed (Minutes)</h4>
                         <div className="flex-1 h-32">
                            <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={SPEED_COMPARISON} layout="vertical">
                                  <XAxis type="number" hide />
                                  <YAxis dataKey="name" type="category" hide />
                                  <Bar dataKey="time" radius={[0, 4, 4, 0]}>
                                     {SPEED_COMPARISON.map((entry, index) => (
                                       <Cell key={index} fill={entry.fill} />
                                     ))}
                                  </Bar>
                               </BarChart>
                            </ResponsiveContainer>
                         </div>
                         <div className="space-y-2 mt-4 pt-4 border-t border-zinc-800">
                            <div className="flex justify-between items-center text-[11px]">
                               <span className="text-zinc-500 uppercase">Manual Sifting</span>
                               <span className="text-zinc-300 font-bold">~2 Hours</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px]">
                               <span className="text-zinc-500 uppercase">AI Accelerated</span>
                               <span className="text-emerald-500 font-bold">2 Minutes</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Threat Mitigation Feedback */}
                   <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-4">
                      <div className="flex items-center gap-2">
                         <ShieldAlert className="text-amber-500 w-5 h-5" />
                         <h4 className="text-sm font-bold text-zinc-200">Pentest Strategic Note</h4>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        The speed of AI analysis means the window to stop an extortion campaign is now measured in minutes, not days. Intercepting the prompt <b>before</b> it leaves the organization is the only effective defense. Legacy DLP that logs after the fact is already too late.
                      </p>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Flam({ className }: { className?: string }) {
  return <Flame className={className} />;
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  ShieldCheck, 
  Zap, 
  Trash2, 
  Plus, 
  Eye, 
  Code2,
  ChevronRight,
  Globe,
  Database,
  Lock,
  Skull,
  Activity,
  Fingerprint,
  Radio,
  Network
} from 'lucide-react';
import { cn } from '../lib/utils';

interface HoneyToken {
  id: string;
  name: string;
  type: 'AWS_KEY' | 'DB_CRED' | 'ENV_VAR' | 'PII_FILE';
  location: string;
  status: 'active' | 'triggered';
  triggers: number;
  attackerFingerprint?: {
    ip: string;
    asn: string;
    tooling: string;
    c2Node: string;
  };
}

const INITIAL_TOKENS: HoneyToken[] = [
  { 
    id: 't1', 
    name: 'Fake Prod S3 Key', 
    type: 'AWS_KEY', 
    location: '/src/config/aws.js', 
    status: 'active', 
    triggers: 0 
  },
  { 
    id: 't2', 
    name: 'Shadow DB Creds', 
    type: 'DB_CRED', 
    location: '/.env.backup', 
    status: 'triggered', 
    triggers: 14,
    attackerFingerprint: {
      ip: '182.44.12.99',
      asn: 'AS59711 (Hostinger)',
      tooling: 'Custom Python Script (Requests/2.31.0)',
      c2Node: 'c2.ghost-proxy-evil.net'
    }
  },
  { 
    id: 't3', 
    name: 'Employee Health Records', 
    type: 'PII_FILE', 
    location: '/public/staging/data.csv', 
    status: 'active', 
    triggers: 0 
  }
];

export default function DeceptionEngine() {
  const [tokens, setTokens] = useState<HoneyToken[]>(INITIAL_TOKENS);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>('t2');

  const selectedToken = tokens.find(t => t.id === selectedTokenId);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <Target className="text-emerald-500" />
            Active Deception Engine
          </h2>
          <p className="text-zinc-400 text-sm font-mono uppercase tracking-tighter">Deploy Honey-Tokens and Trace Lateral Movement</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
           <Plus size={14} /> DEPLOY_NEW_HONEY_TOKEN
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Token List */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-xl">
           <div className="p-4 border-b border-zinc-800 bg-black/50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-2"><Database size={12} className="text-emerald-500" /> Deception_Grid</span>
              <span className="bg-zinc-800 px-2 py-0.5 rounded-full text-emerald-400">ACTIVE: {tokens.length}</span>
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {tokens.map(token => (
                <div 
                  key={token.id}
                  onClick={() => setSelectedTokenId(token.id)}
                  className={cn(
                    "p-4 mb-2 border rounded-lg cursor-pointer transition-all hover:bg-zinc-800/80 group",
                    selectedTokenId === token.id ? "bg-zinc-800 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.1)]" : "bg-zinc-950 border-zinc-800"
                  )}
                >
                   <div className="flex justify-between items-center mb-2">
                      <span className={cn(
                        "text-[8px] font-black uppercase px-2 py-0.5 rounded border tracking-widest",
                        token.status === 'active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                      )}>{token.status}</span>
                      <div className="flex items-center gap-1 text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                         <Activity size={10} /> TRIGGERS: {token.triggers}
                      </div>
                   </div>
                   <h3 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-1">{token.name}</h3>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase truncate">{token.location}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Detailed Interaction */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           {selectedToken ? (
             <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col h-full overflow-y-auto custom-scrollbar relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                   <Skull size={200} className={selectedToken.status === 'triggered' ? "text-red-500" : "text-emerald-500"} />
                </div>
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                           <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-widest">
                              {selectedToken.type}
                           </span>
                           <span className="text-zinc-600 font-mono text-xs">ID: {selectedToken.id}</span>
                        </div>
                        <h1 className="text-3xl font-black text-white italic tracking-tighter mb-2 uppercase">{selectedToken.name}</h1>
                        <p className="text-zinc-400 text-xs font-mono flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800 w-fit">
                           <Globe size={14} className="text-emerald-500" /> SOURCE_LINK: {selectedToken.location}
                        </p>
                      </div>
                      <div className="flex gap-3">
                         <button className="px-6 py-2 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg text-[10px] font-black uppercase hover:bg-zinc-700 transition-all flex items-center gap-2">
                            <Eye size={14} /> ROTATE_HONEY_TOKEN
                         </button>
                      </div>
                   </div>

                   {selectedToken.status === 'triggered' && selectedToken.attackerFingerprint && (
                     <div className="mb-8 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                           <Fingerprint size={100} className="text-red-500" />
                        </div>
                        <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2 mb-4 relative z-10">
                           <Radio size={14} /> Attacker_Fingerprint_Extracted
                        </h4>
                        <div className="grid grid-cols-2 gap-4 relative z-10 font-mono text-xs">
                           <div>
                              <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Origin_IP</div>
                              <div className="text-red-400 font-bold">{selectedToken.attackerFingerprint.ip}</div>
                           </div>
                           <div>
                              <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">ASN_Provider</div>
                              <div className="text-zinc-300">{selectedToken.attackerFingerprint.asn}</div>
                           </div>
                           <div>
                              <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Detected_Tooling</div>
                              <div className="text-zinc-300">{selectedToken.attackerFingerprint.tooling}</div>
                           </div>
                           <div>
                              <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Traced_C2_Node</div>
                              <div className="text-yellow-500 font-bold">{selectedToken.attackerFingerprint.c2Node}</div>
                           </div>
                        </div>
                     </div>
                   )}

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-8 border-t border-zinc-800/50">
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                            <Network size={14} /> Lateral_Movement_Trap
                         </h4>
                         <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-center gap-2">
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Total_Unauthorized_Access</div>
                            <div className="text-5xl font-black text-white italic tracking-tighter">
                               {selectedToken.triggers}
                               <span className="text-sm text-zinc-600 ml-2 not-italic tracking-normal">Hits</span>
                            </div>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                            <Lock size={14} /> Kill_Chain_Impact
                         </h4>
                         <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 h-full">
                            <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                               The Honey-Token successfully halted lateral movement. The injected credentials act as a sinkhole, instantly triggering a high-priority alert to the Cyber SOC when queried. Originating IPs are automatically isolated by the PF Firewall orchestrator.
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 min-h-[200px] bg-zinc-950 border border-zinc-800 rounded-xl p-5 font-mono overflow-hidden flex flex-col shadow-inner">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                         <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Trigger_History_Stream</span>
                         <span className="text-[9px] text-zinc-600 font-bold bg-zinc-900 px-2 py-1 rounded">LIVE_MONITORING</span>
                      </div>
                      <div className="flex-1 overflow-y-auto text-[10px] space-y-2 custom-scrollbar">
                         {selectedToken.status === 'triggered' ? (
                           <>
                              <div className="text-red-400 font-bold tracking-wide">
                                 <span className="text-zinc-700 mr-2">[14:22:01]</span> ALERT: UNAUTHORIZED ACCESS ATTEMPT FROM {selectedToken.attackerFingerprint?.ip}
                              </div>
                              <div className="text-zinc-500">
                                 <span className="text-zinc-700 mr-2">[14:22:02]</span> DBG: Attempted to query database using shadow credentials.
                              </div>
                              <div className="text-yellow-500 font-bold">
                                 <span className="text-yellow-700 mr-2">[14:22:03]</span> INF: Extracting attacker telemetry (Headers, Tools, ASN).
                              </div>
                              <div className="text-emerald-500 font-bold tracking-wide">
                                 <span className="text-emerald-700 mr-2">[14:22:05]</span> ACT: Auto-Redirection deployed. Session trapped in Deception_Sandbox_V1.
                              </div>
                              <div className="text-blue-400">
                                 <span className="text-blue-700 mr-2">[14:22:06]</span> RUN: Sending IOCs to PF Firewall and Cyber SOC.
                              </div>
                           </>
                         ) : (
                           <div className="text-zinc-800 italic flex items-center justify-center h-full">Awaiting link trigger...</div>
                         )}
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full bg-zinc-900 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center p-12 text-center opacity-30">
                <Skull className="w-16 h-16 text-zinc-700 mb-4" />
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Select Honey-Token</h3>
                <p className="text-zinc-500 text-sm max-w-sm italic">Deploy active deception artifacts to fingerprint adversaries during lateral movement.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

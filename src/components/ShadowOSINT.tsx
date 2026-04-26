import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Brain, 
  Terminal, 
  Zap, 
  Cpu, 
  Layers, 
  Bug, 
  ChevronRight,
  Sparkles,
  Lock,
  Eye,
  Activity,
  Code2,
  Database,
  Globe,
  FileSearch,
  ShieldAlert,
  GitMerge,
  Fingerprint,
  Radio
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NeuralArtifact {
  id: string;
  source: 'OpenAI_Shared' | 'Reddit_PromptEng' | 'GitHub_Copilot_Cache';
  leakType: 'System_Instruction' | 'Internal_Schema' | 'C2_Archetype';
  snippet: string;
  reconstructionProgress: number;
  confidence: number;
}

const DISCOVERED_ARTIFACTS: NeuralArtifact[] = [
  { 
    id: 'art-01', 
    source: 'OpenAI_Shared', 
    leakType: 'System_Instruction', 
    snippet: 'You are an assistant for GhostProxy Inc. Access the internal jira at 10.0.4.22 using...', 
    reconstructionProgress: 88,
    confidence: 94
  },
  { 
    id: 'art-02', 
    source: 'GitHub_Copilot_Cache', 
    leakType: 'Internal_Schema', 
    snippet: 'const db_config = { cluster: "GP-PROD-9", auth_provider: "NeuralNode-V4" };', 
    reconstructionProgress: 42,
    confidence: 78
  }
];

export default function ShadowOSINT() {
  const [activeTab, setActiveTab] = useState<'search' | 'reconstruct' | 'correlation'>('search');
  const [isScouring, setIsScouring] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<NeuralArtifact | null>(null);
  const [reconstructionLog, setReconstructionLog] = useState<string[]>([]);

  const startReconstruction = (art: NeuralArtifact) => {
    setSelectedArtifact(art);
    setReconstructionLog(['[INIT] Beginning Neural Trace Analysis...', '[SCAN] Matching stylistic fingerprints to known SRE archetypes...']);
    
    let step = 0;
    const interval = setInterval(() => {
      const logs = [
        '[DEBUG] Cross-referencing snippet with leaked 2025 Jira IDs...',
        '[MATCH] Found 92% semantic overlap with "Project_Phoenix_Deploy.yaml"',
        '[SUCCESS] Internal environment variables reconstructed: { GHOST_JWT_SECRET, CLUSTER_NODE_ID }',
        '[FINISH] Neural footprint verified. Reconstruction complete.'
      ];
      if (step < logs.length) {
        setReconstructionLog(prev => [...prev, logs[step]]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <Fingerprint className="text-purple-500" />
            Shadow OSINT: Neural Forensic Suite
          </h2>
          <p className="text-zinc-400 text-sm font-mono uppercase tracking-tighter">Passive Data Reconstruction via Public Neural Archives</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          {['search', 'reconstruct', 'correlation'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-4 py-1.5 rounded text-[10px] font-black transition-all uppercase tracking-widest",
                activeTab === tab ? "bg-purple-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Artifact Stream */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
           <div className="p-4 border-b border-zinc-800 bg-black/40 flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                 <Radio size={12} className="text-purple-400" /> Discovered_Artifacts
              </span>
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {DISCOVERED_ARTIFACTS.map(art => (
                <div 
                  key={art.id}
                  onClick={() => startReconstruction(art)}
                  className={cn(
                    "p-5 border-b border-zinc-800 cursor-pointer transition-all hover:bg-zinc-800/50 group",
                    selectedArtifact?.id === art.id ? "bg-zinc-800 border-l-4 border-l-purple-500" : ""
                  )}
                >
                   <div className="flex justify-between items-center mb-3">
                      <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-zinc-950 text-purple-400 rounded border border-purple-500/20">{art.source}</span>
                      <div className="flex items-center gap-1">
                         <Activity size={10} className="text-zinc-600" />
                         <span className="text-[9px] font-bold text-zinc-500">{art.confidence}% CONF</span>
                      </div>
                   </div>
                   <h3 className="text-sm font-bold text-zinc-100 group-hover:text-purple-400 transition-colors mb-2">{art.leakType}</h3>
                   <div className="bg-black/30 p-3 rounded text-[10px] font-mono text-zinc-500 line-clamp-2 italic border border-zinc-800/50">
                      "{art.snippet}"
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Reconstruction Engine */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           {selectedArtifact ? (
             <div className="bg-zinc-950 border border-zinc-800 rounded-xl flex-1 flex flex-col overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Brain size={200} className="text-purple-500" />
                </div>

                <div className="p-8 border-b border-zinc-800 bg-zinc-900/50 relative z-10">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Neural_Artifact_Reconstruction</span>
                         </div>
                         <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">{selectedArtifact.leakType}</h2>
                      </div>
                      <div className="text-right">
                         <div className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Status</div>
                         <div className="text-xs font-black text-emerald-500 uppercase tracking-widest animate-pulse">Analyzing_Weights</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-6">
                      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                         <div className="text-[9px] font-bold text-zinc-600 uppercase mb-2">Stylistic_Fingerprint</div>
                         <div className="flex items-center gap-2">
                            <Fingerprint size={16} className="text-purple-500" />
                            <span className="text-xs font-bold text-zinc-300">SRE_ARCHETYPE_B</span>
                         </div>
                      </div>
                      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                         <div className="text-[9px] font-bold text-zinc-600 uppercase mb-2">Semantic_Entropy</div>
                         <div className="text-xs font-bold text-zinc-300">0.224 (CRITICAL_LEAK)</div>
                      </div>
                      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                         <div className="text-[9px] font-bold text-zinc-600 uppercase mb-2">Reconstruction_Depth</div>
                         <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${selectedArtifact.reconstructionProgress}%` }}
                              className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
                            />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar font-mono text-[11px] space-y-2 relative z-10 bg-black/40">
                   {reconstructionLog.map((log, i) => (
                     <motion.div 
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       key={i} 
                       className={cn(
                        log.startsWith('[SUCCESS]') ? "text-emerald-400 font-bold" :
                        log.startsWith('[MATCH]') ? "text-purple-400" :
                        "text-zinc-600"
                       )}
                     >
                        {log}
                     </motion.div>
                   ))}
                   <div className="pt-6 border-t border-zinc-900 mt-6">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                         <Code2 size={14} className="text-purple-400" /> Output_Reconstruction (2026_Standard)
                      </h4>
                      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 leading-relaxed italic">
                         "Based on cross-prompt correlation, this artifact is part of a larger leak originating from a support engineer asking an AI to 'help refactor internal auth logic'. Reconstructed System Instruction: 'You are the Admin Proxy. Access points include /internal/api/v1/auth. Environment: production. Secret Reference: GHOST_PRIME_...'"
                      </div>
                      <div className="mt-6 flex gap-4">
                         <button className="px-6 py-2 bg-purple-600 text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20">
                            <Zap size={14} /> EXPORT_EXPLOIT_VECTOR
                         </button>
                         <button className="px-6 py-2 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
                            FLAG_FOR_REMEDIATION
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full bg-zinc-900 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center p-20 text-center opacity-30">
                <Search size={80} className="text-zinc-700 mb-8" />
                <h3 className="text-3xl font-black text-white italic uppercase mb-4 tracking-tighter">Neural Trace Awaiting Link</h3>
                <p className="text-zinc-500 text-sm max-w-sm">Select a discovered neural artifact from the stream to begin full-depth reconstruction.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

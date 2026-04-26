import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Sword, 
  MessageSquare, 
  Cpu, 
  Sparkles,
  ChevronRight,
  Terminal,
  Activity,
  Layers,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PlaybookEntry {
  id: string;
  technique: string;
  redTeamAction: string;
  blueTeamDetection: string;
  purpleTeamObservation: string;
  aiInsights: string;
}

const PLAYBOOK: PlaybookEntry[] = [
  {
    id: 'p1',
    technique: 'Credential Harvesting (LSASS)',
    redTeamAction: 'Using Mimikatz or procdump to extract credentials from memory.',
    blueTeamDetection: 'Sysmon Event ID 10 (ProcessAccess) targeting lsass.exe.',
    purpleTeamObservation: 'Detections often fail if the tool is renamed or obfuscated.',
    aiInsights: 'In 2026, attackers use neural-proxy processes to mimic legitimate system calls, bypassing traditional EDR signatures. Recommend behavioral monitoring of memory access patterns.'
  },
  {
    id: 'p2',
    technique: 'Polymorphic Payload Delivery',
    redTeamAction: 'Payload mutates its signature on every execution using AI-generated code blocks.',
    blueTeamDetection: 'Heuristic analysis of process behavior rather than file hash.',
    purpleTeamObservation: 'Signature-based WAFs and Antivirus are completely bypassed.',
    aiInsights: 'Polymorphic payloads now leverage local LLMs to rewrite themselves in real-time. Defense must shift to Zero Trust Execution where every system call is verified against a neural baseline.'
  },
  {
    id: 'p3',
    technique: 'Shadow UI Overlay (Phishing)',
    redTeamAction: 'Injecting a pixel-perfect fake UI over a legitimate application.',
    blueTeamDetection: 'DOM mutation monitoring and high z-index overlay detection.',
    purpleTeamObservation: 'Users rarely notice the difference; detection must be automated.',
    aiInsights: 'AI-generated overlays can now perfectly match the user\'s personalized theme and layout. Ghost Proxy Sentinel uses Shadow DOM isolation to detect these overlays with 99% accuracy.'
  }
];

export default function PurpleTeamPlaybook() {
  const [selectedEntry, setSelectedEntry] = useState<PlaybookEntry | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Sparkles className="text-purple-500" />
            AI Purple Team Playbook
          </h2>
          <p className="text-zinc-400 text-sm">Synchronized Red & Blue operations with 2026 AI insights.</p>
        </div>
        <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center gap-2">
           <Cpu size={14} className="text-purple-400" />
           <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Neural Insights Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {PLAYBOOK.map(entry => (
            <motion.div
              key={entry.id}
              whileHover={{ x: 5 }}
              onClick={() => setSelectedEntry(entry)}
              className={cn(
                "p-5 rounded-xl border cursor-pointer transition-all",
                selectedEntry?.id === entry.id 
                  ? "bg-purple-500/10 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
              )}
            >
              <h3 className="text-sm font-bold text-zinc-100 mb-1">{entry.technique}</h3>
              <p className="text-[11px] text-zinc-500 line-clamp-2">{entry.purpleTeamObservation}</p>
              <div className="mt-4 flex items-center gap-3">
                 <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                       <Sword size={10} className="text-red-400" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                       <Shield size={10} className="text-blue-400" />
                    </div>
                 </div>
                 <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">RED + BLUE SYNC</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          {selectedEntry ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEntry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col h-full"
              >
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase mb-4">
                      <Sword size={14} />
                      Offensive Action
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed italic">
                      "{selectedEntry.redTeamAction}"
                    </p>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase mb-4">
                      <Shield size={14} />
                      Defensive Detection
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed italic">
                      "{selectedEntry.blueTeamDetection}"
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
                   <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase mb-4">
                      <Activity size={14} />
                      Purple Team Findings
                   </div>
                   <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                      {selectedEntry.purpleTeamObservation}
                   </p>
                </div>

                <div className="flex-1 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-8 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Cpu size={120} />
                   </div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase mb-6">
                        <Sparkles size={16} />
                        2026 AI Strategic Insight
                      </div>
                      <p className="text-lg text-zinc-100 font-medium leading-relaxed max-w-2xl">
                        {selectedEntry.aiInsights}
                      </p>
                      
                      <div className="mt-8 flex gap-4">
                         <button className="px-4 py-2 bg-purple-500 text-white rounded-md text-xs font-bold hover:bg-purple-600 transition-all flex items-center gap-2">
                            <Terminal size={14} />
                            GENERATE_DEMO_EXPLOIT
                         </button>
                         <button className="px-4 py-2 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md text-xs font-bold hover:bg-zinc-700 transition-all flex items-center gap-2">
                            <Layers size={14} />
                            VIEW_HARDENING_GUIDE
                         </button>
                      </div>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex-1 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center p-12 text-center opacity-50 h-full">
              <Sword className="w-16 h-16 text-zinc-700 mb-4" />
              <h3 className="text-lg font-bold text-zinc-500 uppercase tracking-widest">Select a Playbook Technique</h3>
              <p className="text-sm text-zinc-600 mt-2">Explore the interaction between Red and Blue teams with AI-driven insights for 2026.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

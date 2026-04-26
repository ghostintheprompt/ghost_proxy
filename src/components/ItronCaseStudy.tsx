import React, { useState } from 'react';
import { 
  Shield, 
  Sword, 
  Activity, 
  Terminal, 
  AlertTriangle, 
  UserCircle,
  ChevronRight,
  ExternalLink,
  Brain,
  Zap,
  Target,
  Eye,
  ShieldCheck,
  Split
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const ANALYSIS_DATA = [
  { subject: 'Entry Reproducibility', value: 85, info: "High: Attackers reuse standard TTPs like phishing or MFA fatigue." },
  { subject: 'Target Commonality', value: 95, info: "Utility providers are constant targets for both e-crime and nation-states." },
  { subject: 'Defensive Potential', value: 70, info: "Modern tools exist, but human/legacy factors create gaps." },
  { subject: 'Containment Success', value: 90, info: "Itron's segmentation between IT and OT was highly effective." },
  { subject: 'Attacker ROI', value: 80, info: "High: Access to grid-adjacent networks provides immense leverage." },
];

const MINDSETS = {
  RED: {
    title: "Red Team: The Scalpel",
    subtitle: "Think like the Attacker",
    icon: <Target className="w-5 h-5 text-red-500" />,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    concepts: [
      {
        q: "Why target a defensible firm?",
        a: "Because defensible doesn't mean impermeable. Itron's value as a gatekeeper to regional grids makes a 1% chance of success worth a 100% effort. We don't break the vault; we just need one tired employee to approve an MFA prompt."
      },
      {
        q: "How did we get in?",
        a: "Likely Edge-to-Identity hopping. Exploiting a known vulnerability in a VPN gateway or a simple spear-phishing mail to gain a foothold on the IT network, then harvesting tokens for lateral movement."
      },
      {
        q: "What was the failure?",
        a: "The containment was the failure from our perspective. We hit the IT wall, but couldn't jump to the OT control systems. The segmentation held."
      }
    ]
  },
  BLUE: {
    title: "Blue Team: The Shield",
    subtitle: "Think like the Defender",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    concepts: [
      {
        q: "Why did it happen if we're secure?",
        a: "The Defender's Dilemma. We protect 10,000 endpoints; they only need one. A breach isn't always a sign of a bad defense; it's a test of resilience. We accepted the IT breach but successfully defended the mission-critical systems."
      },
      {
        q: "How did we stop it?",
        a: "Zero Trust and Network Segmentation. By treating the IT network as compromised by default relative to the OT grid, we ensured the intruder lacked the pathways to cause a blackout."
      },
      {
        q: "What is the lesson?",
        a: "Visibility is everything. Detect faster, isolate harder. The breach happened, but the outage didn't. That is a strategic Blue Team win."
      }
    ]
  }
};

export default function ItronCaseStudy() {
  const [persona, setPersona] = useState<'RED' | 'BLUE'>('BLUE');
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full gap-8 overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Itron Breach Analysis</h2>
            <p className="text-[10px] text-zinc-500 font-mono flex items-center gap-1 uppercase tracking-tighter">
              <Terminal className="w-3 h-3" /> System ID: CASE-STUDY-2025-02
            </p>
          </div>
        </div>
        
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-1 shadow-inner">
          <button 
            onClick={() => setPersona('BLUE')}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2",
              persona === 'BLUE' ? "bg-emerald-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Shield className="w-3 h-3" /> BLUE_TEAM
          </button>
          <button 
            onClick={() => setPersona('RED')}
            className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2",
              persona === 'RED' ? "bg-red-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Sword className="w-3 h-3" /> RED_TEAM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={persona}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold tracking-tight text-white leading-tight">
                {persona === 'BLUE' ? "Resilience Over Prevention" : "Precision Over Volume"}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                {persona === 'BLUE' 
                  ? "In the Itron breach, the goal wasn't just to stay un-hackable—it was to stay operable. High defensibility means having the architecture to ensure a breach doesn't become a catastrophe."
                  : "We chose Itron precisely because they are important. A highly defensible target often suffers from complexity fatigue. We don't attack the firewall; we attack the human handling the admin key."
                }
              </p>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-3 rounded-xl">
              <span className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Entry Vector</span>
              <span className="text-xs font-semibold flex items-center gap-2 text-zinc-200">
                <UserCircle className="w-4 h-4 text-blue-400" /> Identity Compromise
              </span>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-3 rounded-xl">
              <span className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1">The Pivot</span>
              <span className="text-xs font-semibold flex items-center gap-2 text-zinc-200">
                <Split className="w-4 h-4 text-orange-400" /> IT-to-OT Bridge
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative z-10">
             <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ANALYSIS_DATA}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={8} />
                  <Radar
                    name="Metric"
                    dataKey="value"
                    stroke={persona === 'BLUE' ? "#10b981" : "#ef4444"}
                    fill={persona === 'BLUE' ? "#10b981" : "#ef4444"}
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {ANALYSIS_DATA.map((d, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedMetric(i)}
                  className={cn(
                    "p-2 rounded-lg text-[9px] text-left transition-colors border font-mono uppercase",
                    selectedMetric === i 
                      ? (persona === 'BLUE' ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-red-500/50 bg-red-500/10 text-red-400")
                      : "border-transparent text-zinc-500 hover:bg-white/5"
                  )}
                >
                  {d.subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <div className="flex items-center gap-4 mb-8">
          <div className={cn("p-3 rounded-2xl", MINDSETS[persona].bgColor)}>
            {MINDSETS[persona].icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-100">{MINDSETS[persona].title}</h3>
            <p className="text-zinc-500 text-xs uppercase tracking-widest">{MINDSETS[persona].subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {MINDSETS[persona].concepts.map((concept, idx) => (
              <motion.div
                key={persona + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "bg-zinc-900 border rounded-2xl p-6 flex flex-col justify-between group h-full",
                  MINDSETS[persona].borderColor
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 opacity-50 font-mono text-[9px] uppercase tracking-tighter text-zinc-400">
                    <Terminal className="w-3 h-3" /> Interview Fragment {idx + 1}
                  </div>
                  <h4 className="text-zinc-100 font-semibold leading-snug group-hover:text-blue-400 transition-colors">
                    "{concept.q}"
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed italic">
                    {concept.a}
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <div className={cn("w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]", persona === 'BLUE' ? "text-emerald-500 bg-emerald-500" : "text-red-500 bg-red-500")} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
          <div className="shrink-0">
             <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-zinc-500" />
             </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-zinc-100 uppercase tracking-tighter">The Student's Takeaway</h4>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-4xl">
              A common mistake in cyber studies is equating breached with failed. Itron was breached on its IT side, but they chose a <span className="text-white font-medium">highly defensible network architecture</span> that utilized air-gapping and strict segmentation to protect the truly valuable return: the grid itself. The attackers likely wanted Grid Access but settled for Internal Data—proving the Blue Team's fundamental defensive design worked where it mattered most.
            </p>
            <div className="flex gap-4 pt-4">
               <span className="text-[9px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase">#DefenseInDepth</span>
               <span className="text-[9px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase">#NetworkSegmentation</span>
               <span className="text-[9px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase">#ResilientInfrastructure</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Eye className="w-32 h-32" />
        </div>
      </section>

      <footer className="mt-auto pt-8 border-t border-zinc-800 flex justify-between items-center text-[9px] text-zinc-600 uppercase font-mono">
        <div className="flex items-center gap-2">
           <AlertTriangle className="w-3 h-3 text-yellow-500/50" /> FOR EDUCATIONAL USE ONLY
        </div>
        <a 
          href="https://www.bleepingcomputer.com/news/security/american-utility-firm-itron-discloses-breach-of-internal-it-network/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors group"
        >
          ORIGINAL SEC FILING & BREACH REPORT
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </footer>
    </div>
  );
}

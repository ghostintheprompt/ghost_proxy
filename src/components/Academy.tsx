import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Code2, 
  Network, 
  ShieldAlert, 
  Cpu, 
  Globe, 
  Lock, 
  Zap, 
  ChevronRight,
  Target,
  ShieldCheck,
  Brain,
  Search,
  History,
  Activity,
  Bug,
  Database,
  Terminal,
  FileCode2,
  AlertTriangle,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

type Domain = 'NETWORK' | 'APPSEC' | 'OT_ICS' | 'IAM' | 'CRYPTO' | 'MALWARE' | 'IR_DFIR' | 'GRC' | 'PRIVACY';

interface Scenario {
  id: string;
  title: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
  redTeam: {
    objective: string;
    technique: string;
    action: string;
  };
  blueTeam: {
    defense: string;
    detection: string;
    hardening: string;
  };
  aiInsight: string;
}

const DOMAINS: Record<Domain, { title: string; icon: React.ReactNode; color: string; description: string }> = {
  NETWORK: { 
    title: 'Network Security', 
    icon: <Network size={20} />, 
    color: 'text-blue-400', 
    description: 'Protocol analysis, segmentation, and perimeter defense.' 
  },
  APPSEC: { 
    title: 'Application Security', 
    icon: <Code2 size={20} />, 
    color: 'text-emerald-400', 
    description: 'Secure SDLC, API protection, and OWASP Top 10 mitigation.' 
  },
  OT_ICS: { 
    title: 'OT / ICS Security', 
    icon: <Settings size={20} />, 
    color: 'text-orange-400', 
    description: 'Industrial control systems, safety, and critical infrastructure.' 
  },
  IAM: { 
    title: 'Identity & Access', 
    icon: <Lock size={20} />, 
    color: 'text-purple-400', 
    description: 'AAA framework, passwordless, and zero-trust identity.' 
  },
  CRYPTO: { 
    title: 'Cryptography', 
    icon: <Database size={20} />, 
    color: 'text-yellow-400', 
    description: 'Encryption standards, KMS, and Post-Quantum readiness.' 
  },
  MALWARE: { 
    title: 'Malware Analysis', 
    icon: <Bug size={20} />, 
    color: 'text-red-400', 
    description: 'Static/Dynamic analysis, APK reversing, and C2 tracking.' 
  },
  IR_DFIR: { 
    title: 'Incident Response', 
    icon: <ShieldAlert size={20} />, 
    color: 'text-pink-400', 
    description: 'Digital forensics, containment, and recovery strategies.' 
  },
  GRC: {
    title: 'GRC & Compliance',
    icon: <ShieldCheck size={20} />,
    color: 'text-emerald-500',
    description: 'Policy orchestration, data classification, and risk audit.'
  },
  PRIVACY: {
    title: 'Privacy Engineering',
    icon: <EyeOff size={20} />,
    color: 'text-blue-500',
    description: 'Differential privacy, clean rooms, and anonymization stack.'
  }
};

const SCENARIOS: Record<Domain, Scenario[]> = {
  NETWORK: [
    {
      id: 'net-1',
      title: 'Zero Trust Hospital Segmentation',
      difficulty: 'Senior',
      redTeam: {
        objective: 'Lateral movement from Guest Wi-Fi to Medical IoT.',
        technique: 'VLAN Hopping & ARP Spoofing',
        action: 'Infect a nurse\'s workstation to pivot into the Clinical VLAN.'
      },
      blueTeam: {
        defense: 'Micro-segmentation & NAC',
        detection: 'Monitor for unauthorized inter-VLAN traffic at the Core Switch.',
        hardening: 'Implement port-level security and strict Clinical isolated VLANs.'
      },
      aiInsight: '2026 AI-driven NAC can now predict device identity based on sub-packet jitter patterns, making MAC spoofing impossible.'
    }
  ],
  APPSEC: [
    {
      id: 'app-1',
      title: 'The Internal API Leak',
      difficulty: 'Junior',
      redTeam: {
        objective: 'Exfiltrate user database via unsecured internal API.',
        technique: 'Broken Object Level Authorization (BOLA)',
        action: 'Iterate user IDs on /api/internal/users and capture hashed passwords.'
      },
      blueTeam: {
        defense: 'Attribute-Based Access Control (ABAC)',
        detection: 'Rate-limit alerts on internal API endpoints and data minimization.',
        hardening: 'Never return sensitive fields (hashes, PII) even to internal clients.'
      },
      aiInsight: 'Modern AppSec proxies now use "Response Scrubbing" LLMs to redact sensitive data from API responses in real-time.'
    }
  ],
  OT_ICS: [
    {
      id: 'ot-1',
      title: 'The Sunday Morning Patch Crisis',
      difficulty: 'Mid',
      redTeam: {
        objective: 'Induce unsafe process state during forced maintenance.',
        technique: 'Reboot Hijacking',
        action: 'Trigger automatic updates to lock valves in "Open" state during a pressure spike.'
      },
      blueTeam: {
        defense: 'Coordinated Maintenance Windows',
        detection: 'Monitor for unexpected PLC reboots during active production cycles.',
        hardening: 'Isolate OT update servers and require manual safety interlocks for reboots.'
      },
      aiInsight: 'AI Process Twins now simulate patch impact on physical thermodynamics before allowing a single bit to change on a PLC.'
    }
  ],
  IAM: [
    {
      id: 'iam-1',
      title: 'The Passwordless Rollout Challenge',
      difficulty: 'Mid',
      redTeam: {
        objective: 'Bypass MFA on unmanaged field devices.',
        technique: 'MFA Fatigue / Push Spam',
        action: 'Spam push notifications to a field technician until they click "Approve".'
      },
      blueTeam: {
        defense: 'Context-Aware Authentication',
        detection: 'Flag multiple denied push notifications followed by a successful one from a new IP.',
        hardening: 'Implement Number Matching or FIDO2 hardware keys for all technicians.'
      },
      aiInsight: 'Behavioral biometrics in 2026 analyze how a user holds their phone, blocking approval even if the "Approve" button is pressed by a malicious actor.'
    }
  ],
  CRYPTO: [
    {
      id: 'cry-1',
      title: 'Post-Quantum TLS Migration',
      difficulty: 'Senior',
      redTeam: {
        objective: 'Harvest encrypted traffic for future decryption.',
        technique: 'Store-Now-Decrypt-Later (SNDL)',
        action: 'Record multi-gigabyte PCAPs of internal TLS 1.2 traffic for 2030 decryption.'
      },
      blueTeam: {
        defense: 'Hybrid Classical-PQC Exchange',
        detection: 'Monitor for unusually large key exchange packets (ML-KEM/Kyber impacts).',
        hardening: 'Upgrade internal PKI to support ML-DSA signatures and Kyber key exchange.'
      },
      aiInsight: '2026 neural processors include hardware-accelerated Kyber engines, eliminating the performance penalty of post-quantum crypto.'
    }
  ],
  MALWARE: [
    {
      id: 'mal-1',
      title: 'Android Banking Trojan Overlay',
      difficulty: 'Senior',
      redTeam: {
        objective: 'Steal banking credentials via UI manipulation.',
        technique: 'SYSTEM_ALERT_WINDOW Overlay',
        action: 'Monitor for bank app launch, then draw a fake login screen over it.'
      },
      blueTeam: {
        defense: 'Overlay Detection (FLAG_SECURE)',
        detection: 'Accessibility service monitoring for apps requesting sensitive permissions.',
        hardening: 'Block apps with high-risk permission combinations (SMS + SYSTEM_ALERT_WINDOW).'
      },
      aiInsight: 'Mobile OS in 2026 use "Screen Isolation" where financial apps run in a secure buffer that external apps literally cannot see or draw over.'
    }
  ],
  IR_DFIR: [
    {
      id: 'ir-1',
      title: 'The "Weird Laptop" Triage',
      difficulty: 'Junior',
      redTeam: {
        objective: 'Maintain persistence while appearing as a background process.',
        technique: 'Process Hollowing',
        action: 'Inject malicious code into a legitimate svchost.exe process.'
      },
      blueTeam: {
        defense: 'Memory Forensics & Isolation',
        detection: 'Identify unusual network callouts from a process that should be internal-only.',
        hardening: 'Isolate machine from VPN immediately, then capture memory for analysis.'
      },
      aiInsight: 'Automated DFIR bots can now reconstruct a full attack timeline from a memory dump in under 45 seconds using neural trace analysis.'
    }
  ],
  GRC: [
    {
      id: 'grc-1',
      title: 'Shadow IT Data Leak',
      difficulty: 'Mid',
      redTeam: {
        objective: 'Circumvent official storage to exfiltrate records.',
        technique: 'Unapproved Cloud Export',
        action: 'Export customer database to a personal Google Sheet to bypass enterprise DLP.'
      },
      blueTeam: {
        defense: 'CASB & Shadow IT Monitoring',
        detection: 'Monitor for large outbound transfers to unapproved third-party domains.',
        hardening: 'Implement strict data classification and block high-sensitivity exports at the API gateway.'
      },
      aiInsight: '2026 GRC tools use "Purpose-Aware Auditing" to detect if data is being used for a different reason than why it was collected.'
    }
  ],
  PRIVACY: [
    {
      id: 'priv-1',
      title: 'The Clean Room Matching Attack',
      difficulty: 'Senior',
      redTeam: {
        objective: 'Re-identify individuals from hashed datasets.',
        technique: 'Frequency Analysis / Collision Attack',
        action: 'Correlate hashed emails with public breach data to reveal raw identities.'
      },
      blueTeam: {
        defense: 'Salted HMAC & Differential Noise',
        detection: 'Audit clean room queries for "small-n" results that reveal individual attributes.',
        hardening: 'Enforce minimum aggregation thresholds (k-anonymity) and unique salting per transaction.'
      },
      aiInsight: 'Privacy processors now insert "Synthetic Collisions" into clean rooms to render re-identification mathematically impossible.'
    }
  ]
};

export default function Academy() {
  const [selectedDomain, setSelectedDomain] = useState<Domain>('NETWORK');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(SCENARIOS['NETWORK'][0]);
  const [view, setView] = useState<'RED' | 'BLUE'>('BLUE');

  return (
    <div className="flex flex-col h-full gap-8 overflow-hidden">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <BookOpen className="text-emerald-500" />
            Ghost Academy
          </h2>
          <p className="text-zinc-400 text-sm">Systematic cybersecurity domain mastery and scenario labs.</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          <button 
            onClick={() => setView('BLUE')}
            className={cn(
              "px-4 py-1.5 rounded text-[10px] font-bold transition-all uppercase tracking-widest flex items-center gap-2",
              view === 'BLUE' ? "bg-emerald-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <ShieldCheck size={12} />
            Defensive_Lab
          </button>
          <button 
            onClick={() => setView('RED')}
            className={cn(
              "px-4 py-1.5 rounded text-[10px] font-bold transition-all uppercase tracking-widest flex items-center gap-2",
              view === 'RED' ? "bg-red-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Target size={12} />
            Offensive_Lab
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Domain Matrix */}
        <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {Object.entries(DOMAINS).map(([id, domain]) => (
            <motion.div
              key={id}
              whileHover={{ x: 5 }}
              onClick={() => {
                setSelectedDomain(id as Domain);
                setActiveScenario(SCENARIOS[id as Domain][0]);
              }}
              className={cn(
                "p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 group",
                selectedDomain === id 
                  ? "bg-zinc-800 border-zinc-600 shadow-xl" 
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
              )}
            >
              <div className={cn(
                "p-3 rounded-lg transition-colors",
                selectedDomain === id ? "bg-zinc-700 text-white" : "bg-zinc-950 text-zinc-500 group-hover:text-zinc-300"
              )}>
                {domain.icon}
              </div>
              <div className="flex-1">
                <h3 className={cn("text-sm font-bold mb-1", domain.color)}>{domain.title}</h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{domain.description}</p>
              </div>
              <ChevronRight size={14} className={cn(
                "mt-1 transition-transform",
                selectedDomain === id ? "rotate-90 text-zinc-300" : "text-zinc-700 group-hover:translate-x-1"
              )} />
            </motion.div>
          ))}
        </div>

        {/* Lab Content */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {activeScenario ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario.id + view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full gap-6"
              >
                {/* Scenario Header */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <Brain size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                        Scenario: {activeScenario.id}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest",
                        activeScenario.difficulty === 'Junior' ? "bg-blue-500/10 text-blue-400" :
                        activeScenario.difficulty === 'Mid' ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-red-500/10 text-red-400"
                      )}>
                        {activeScenario.difficulty}_LEVEL
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-white italic tracking-tighter mb-4">{activeScenario.title}</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                      {view === 'RED' ? "Red Team Perspective: Focus on the exploit chain and stealth." : "Blue Team Perspective: Focus on the detection signal and resilience."}
                    </p>
                  </div>
                </div>

                {/* Perspective Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={cn(
                    "p-6 rounded-2xl border",
                    view === 'RED' ? "bg-red-500/5 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]" : "bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                  )}>
                    <div className="flex items-center gap-2 mb-4">
                      {view === 'RED' ? <Target size={16} className="text-red-500" /> : <ShieldCheck size={16} className="text-emerald-500" />}
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-200">
                        {view === 'RED' ? "Attack Technique" : "Defense Strategy"}
                      </h4>
                    </div>
                    <h5 className="text-lg font-bold text-zinc-100 mb-2">
                      {view === 'RED' ? activeScenario.redTeam.technique : activeScenario.blueTeam.defense}
                    </h5>
                    <p className="text-xs text-zinc-500 leading-relaxed italic">
                      {view === 'RED' ? activeScenario.redTeam.action : activeScenario.blueTeam.hardening}
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4 text-zinc-400 font-bold text-[10px] uppercase tracking-widest">
                      <Activity size={14} />
                      {view === 'RED' ? "Primary Objective" : "Detection Vector"}
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                      {view === 'RED' ? activeScenario.redTeam.objective : activeScenario.blueTeam.detection}
                    </p>
                  </div>
                </div>

                {/* AI Insight Bridge */}
                <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap size={64} className="text-yellow-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-yellow-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                      <Brain size={16} /> 2026_Neural_Strategy_Review
                    </div>
                    <p className="text-lg text-zinc-100 font-medium leading-relaxed max-w-3xl">
                      {activeScenario.aiInsight}
                    </p>
                    <div className="mt-8 flex gap-4">
                       <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[10px] font-bold uppercase tracking-widest transition-all">
                          Load_Simulation_Lab
                       </button>
                       <button className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-zinc-500 rounded text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">
                          View_Source_PCAP
                       </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-20 text-center opacity-30">
               <BookOpen size={64} className="text-zinc-700 mb-6" />
               <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">Select a Domain Matrix</h3>
               <p className="text-zinc-500 text-sm italic max-w-sm">Deep-dive into the technical core of the Ghost Proxy 2026 security ecosystem.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Settings, ShieldCheck, Lock, Eye, MessageSquare, Info, ChevronRight, Zap, Target } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  policyMode: 'BLOCK' | 'COACH' | 'AUDIT';
  setPolicyMode: (mode: 'BLOCK' | 'COACH' | 'AUDIT') => void;
}

export default function GovernanceRules({ policyMode, setPolicyMode }: Props) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Settings className="text-emerald-500" />
          Governance Lab
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
          Switch between different governance paradigms. Test how your users react to total blocking versus real-time coaching. The goal is "visibility without proxy lag."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PolicyCard 
          icon={<Lock size={20} />}
          title="Static Block"
          description="Legacy CASB-style filtering. Blocks any interaction containing blacklisted patterns. High friction, low flexibility."
          active={policyMode === 'BLOCK'}
          onClick={() => setPolicyMode('BLOCK')}
          accent="red"
          stats={[{ label: 'User Friction', val: 'Extreme' }, { label: 'Lag', val: '250ms' }]}
        />
        <PolicyCard 
          icon={<MessageSquare size={20} />}
          title="Contextual Coach"
          description="Modern visibility. Flags sensitive data, alerts the user, and coaches them on safe handling without blocking. Low friction."
          active={policyMode === 'COACH'}
          onClick={() => setPolicyMode('COACH')}
          accent="emerald"
          stats={[{ label: 'User Friction', val: 'Minimal' }, { label: 'Lag', val: '<50ms' }]}
        />
        <PolicyCard 
          icon={<Eye size={20} />}
          title="Shadow Audit"
          description="Silent monitoring. All data lineage is logged and scored but the user interaction is never interrupted. Zero friction."
          active={policyMode === 'AUDIT'}
          onClick={() => setPolicyMode('AUDIT')}
          accent="zinc"
          stats={[{ label: 'User Friction', val: 'None' }, { label: 'Lag', val: '0ms' }]}
        />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
          <Zap className="text-amber-500 w-5 h-5" />
          Active Scrutiny Settings
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
           <RuleToggle 
             label="Global Hash Lineage Sync" 
             description="Tracks file hashes across all organizational nodes to detect tampering, duplication, or unauthorized encryption."
             enabled={true}
           />
           <RuleToggle 
             label="Shadow Mount Detection" 
             description="Real-time monitoring for unauthorized virtual disks, encrypted containers (VeraCrypt), or hidden partitions."
             enabled={true}
           />
           <RuleToggle 
             label="Entropy-based exfiltration Alert" 
             description="Flags files with high Shannon entropy as likely encrypted exfiltration candidates, triggering automatic egress blocks."
             enabled={true}
           />
           <RuleToggle 
             label="DNSSEC & DANE Validation" 
             description="Enforces mandatory TLSA record matches and DNSSEC chain-of-trust for all AI agent service endpoints."
             enabled={true}
           />
             <RuleToggle 
             label="Adversarial AI Modeling" 
             description="Simulates threat actor LLM workflows to identify extortion-sensitive data fragments before they are exfiltrated."
             enabled={true}
           />
           <RuleToggle 
             label="Cross-Border Data Scrutiny" 
             description="Monitors and flags movement of sensitive PII/IP markers between different geographical SaaS regions."
             enabled={true}
           />
           <RuleToggle 
             label="Localized Sink Redirection" 
             description="Forces storage of core organizational assets into locally controlled, decentralized sinks instead of shared SaaS vaults."
             enabled={true}
           />
           <RuleToggle 
             label="Global Extraction Aligner" 
             description="Detects bulk data movement patterns that deviate from normal 'SaaS productivity' baselines."
             enabled={true}
           />
           <RuleToggle 
             label="Insider Behavioral Modeling" 
             description="Integrates with HR signals and graph data to map 'rough relationships' between employees and the organization."
             enabled={true}
           />
           <RuleToggle 
             label="Legacy Connector Sync" 
             description="Real-time visibility into exfiltration paths across the 'Conglomerate reality' of mergers and acquisitions."
             enabled={true}
           />
           <RuleToggle 
             label="Productivity vs Risk Analysis" 
             description="Innovation in differentiating 'DLP hero moments' from friction-heavy productivity blocks."
             enabled={true}
           />
           <RuleToggle 
             label="CAA Policy Enforcement" 
             description="Audits domain propagation chains to ensure certificate issuance is limited to approved CAs."
             enabled={true}
           />
           <RuleToggle 
             label="DNS Tunneling Heuristics" 
             description="Uses entropy analysis and TXT record frequency monitoring to detect covert data exfiltration."
             enabled={true}
           />
           <RuleToggle 
             label="Hagezi Filter Integration" 
             description="Synchronizes with Hagezi DNS-DOH-VPN lists to block decentralized resolvers and VPN bypasses."
             enabled={true}
           />
           <RuleToggle 
             label="Forced Browser DoH" 
             description="Pushes GPO/MDM policies to browsers to enforce specific encrypted endpoints regardless of network."
             enabled={true}
           />
           <RuleToggle 
             label="Internal Sinkhole Routing" 
             description="Automatically redirects unencrypted internal DNS traffic to a secure inspection sink for forensic auditing."
             enabled={true}
           />
           <RuleToggle 
             label="Deep PII Inspection" 
             description="Runs complex LLM-based entity recognition for subtle data leakage (e.g., patient IDs in prose)."
             enabled={true}
           />
           <RuleToggle 
             label="Corporate IP Fingerprinting" 
             description="Matches input against known internal codebases and sensitive document hashes."
             enabled={true}
           />
           <RuleToggle 
             label="Secret Scanning (VCS Sync)" 
             description="Syncs with GitHub/GitLab to identify leaked API tokens and SSH keys in real-time."
             enabled={true}
           />
           <RuleToggle 
             label="Prompt Anonymization" 
             description="Replaces PII with synthetic tokens before sending to provider (Advanced Mode)."
             enabled={false}
           />
        </div>

        <div className="pt-6 border-t border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs text-zinc-500">
             <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> Compliance Ready</span>
             <span className="flex items-center gap-1.5"><Target size={14} className="text-emerald-500" /> Zero Trust Sync</span>
          </div>
          <button className="px-6 py-2 bg-emerald-500 text-zinc-950 font-bold rounded-full text-xs hover:bg-emerald-400 transition-colors">
            DEPLOY POLICY CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({ icon, title, description, active, onClick, accent, stats }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  active: boolean, 
  accent: 'red' | 'emerald' | 'zinc'
  onClick: () => void,
  stats: { label: string, val: string }[]
}) {
  const colors = {
    red: "text-red-400 border-red-500/20 bg-red-500/10",
    emerald: "text-emerald-400 border-emerald-500/50 bg-emerald-500/10",
    zinc: "text-zinc-400 border-zinc-700 bg-zinc-800/10"
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-6 rounded-3xl border text-left transition-all relative overflow-hidden group",
        active 
          ? colors[accent] + " ring-2 ring-zinc-100 ring-offset-4 ring-offset-zinc-950 translate-y-[-4px]" 
          : "border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-zinc-700"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
        active ? "bg-zinc-100 text-zinc-950" : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
      )}>
        {icon}
      </div>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-xs leading-relaxed opacity-60 mb-6">{description}</p>
      
      <div className="flex gap-4 pt-4 border-t border-zinc-800/50">
        {stats.map((s, i) => (
          <div key={i}>
             <div className="text-[10px] uppercase font-bold opacity-40">{s.label}</div>
             <div className="text-xs font-mono font-bold mt-0.5">{s.val}</div>
          </div>
        ))}
      </div>

      {active && (
        <div className="absolute top-4 right-4">
          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
        </div>
      )}
    </button>
  );
}

function RuleToggle({ label, description, enabled }: { label: string, description: string, enabled: boolean }) {
  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-2xl border transition-colors",
      enabled ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-900 bg-zinc-950 opacity-50"
    )}>
      <button 
        className={cn(
          "shrink-0 w-10 h-5 mt-1 rounded-full relative transition-colors",
          enabled ? "bg-emerald-600" : "bg-zinc-800"
        )}
      >
        <div className={cn(
          "absolute top-1 w-3 h-3 rounded-full bg-white transition-all shadow-sm",
          enabled ? "left-6" : "left-1"
        )} />
      </button>
      <div>
        <h5 className="font-bold text-sm text-zinc-200">{label}</h5>
        <p className="text-[11px] text-zinc-500 leading-normal mt-1">{description}</p>
      </div>
    </div>
  );
}

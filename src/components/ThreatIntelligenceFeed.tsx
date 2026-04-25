import React, { useState } from 'react';
import { 
  Rss, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle,
  Flame,
  Globe,
  Database,
  Lock,
  ArrowRight,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ThreatArticle {
  id: string;
  title: string;
  source: string;
  category: 'Ransomware' | 'SaaS' | 'Supply Chain' | 'Identity' | 'Zero-Day';
  softTarget: string;
  mitigation: string;
  impactScore: number;
  status: 'Vulnerable' | 'Protected' | 'Unstable';
}

const THREAT_DATABASE: ThreatArticle[] = [
  {
    id: '1',
    title: 'Snowflake Enterprise SaaS Harvesting',
    source: 'Decryption Digest',
    category: 'SaaS',
    softTarget: 'Orphaned SaaS credentials with disabled MFA',
    mitigation: 'Force MFA on all service accounts + Identity Scrutiny',
    impactScore: 98,
    status: 'Unstable'
  },
  {
    id: '2',
    title: 'Worldleaks: Personalized Extortion Campaign',
    source: 'BreachCache',
    category: 'Ransomware',
    softTarget: 'Exposed RDP with Weak EPP/EDR',
    mitigation: 'Implement RDP Guard + Proactive EDR Kill-Monitoring',
    impactScore: 92,
    status: 'Protected'
  },
  {
    id: '3',
    title: 'France Titres (ANTS) Bulk Leak',
    source: 'Decryption Digest',
    category: 'Identity',
    softTarget: 'Unencrypted PII in government API cache',
    mitigation: 'API Gateway Encryption + Rate Limiting on ID Queries',
    impactScore: 99,
    status: 'Vulnerable'
  },
  {
    id: '4',
    title: 'Polyfill.io Supply Chain Hijack',
    source: 'The Hacker News',
    category: 'Supply Chain',
    softTarget: 'Unsigned 3rd-party CDN scripts',
    mitigation: 'Content Security Policy (CSP) + Script Subresource Integrity',
    impactScore: 85,
    status: 'Protected'
  },
  {
    id: '5',
    title: 'MoveIT Transfer Zero-Day Exploitation',
    source: 'Decryption Digest',
    category: 'Zero-Day',
    softTarget: 'Legacy file transfer appliances on public internet',
    mitigation: 'Immediate patching + Air-gapping high-value data repositories',
    impactScore: 88,
    status: 'Unstable'
  }
];

export default function ThreatIntelligenceFeed() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredThreats = THREAT_DATABASE.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Rss className="text-orange-500" />
            Threat Intelligence Briefing
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            Live analysis of latest "Soft Targets" from Decryption Digest and top security researchers.
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input 
            type="text"
            placeholder="Search threats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs text-zinc-300 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredThreats.map((threat, i) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between md:justify-start gap-3">
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                    threat.category === 'Ransomware' ? "bg-red-500/10 text-red-500" :
                    threat.category === 'SaaS' ? "bg-blue-500/10 text-blue-500" :
                    threat.category === 'Supply Chain' ? "bg-emerald-500/10 text-emerald-500" :
                    "bg-orange-500/10 text-orange-500"
                  )}>
                    {threat.category}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-mono">/ {threat.source}</span>
                  
                  <div className="flex items-center gap-1.5 md:ml-auto">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      threat.status === 'Vulnerable' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                      threat.status === 'Protected' ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                    )} />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{threat.status}</span>
                  </div>
                </div>

                <h3 className="text-zinc-100 font-bold group-hover:text-white transition-colors">{threat.title}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest flex items-center gap-2">
                       <AlertTriangle size={12} className="text-amber-500" />
                       Located Soft Target:
                    </div>
                    <div className="text-[11px] text-zinc-400 bg-zinc-950/50 p-2 rounded-lg border border-zinc-800 leading-relaxed font-mono italic">
                      {threat.softTarget}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck size={12} className="text-emerald-500" />
                       App Self-Correction Action:
                    </div>
                    <div className="text-[11px] text-zinc-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/20 leading-relaxed font-mono">
                      {threat.mitigation}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-between items-end gap-2 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6 shrink-0">
                <div className="text-center">
                  <div className="text-[10px] text-zinc-600 font-bold uppercase">Impact</div>
                  <div className={cn(
                    "text-xl font-black",
                    threat.impactScore > 90 ? "text-red-500" : "text-amber-500"
                  )}>
                    {threat.impactScore}
                  </div>
                </div>
                
                <button className="p-2 bg-zinc-950 text-zinc-600 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl text-center">
         <Flame className="w-8 h-8 text-zinc-800 mx-auto mb-3" />
         <h4 className="text-zinc-600 font-bold">Client Security Status: Warning</h4>
         <p className="text-zinc-700 text-xs mt-2 max-w-sm mx-auto">
            Our automated scanner has cross-referenced your environment with the 84 attack patterns in the Decryption Digest database. We have identified 2 unprotected soft targets matching the MoveIT exploit profile.
         </p>
         <button className="mt-4 px-4 py-2 bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all">
            Initiate Auto-Patching
         </button>
      </div>
    </div>
  );
}

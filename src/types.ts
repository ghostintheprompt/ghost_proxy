/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GhostScript {
  id: string;
  name: string;
  description: string;
  targetUrl: string;
  code: string;
  enabled: boolean;
  author: string;
  createdAt: number;
}

export interface GhostAgentMessage {
  role: 'user' | 'agent';
  content: string;
  timestamp: number;
}

export interface RiskAnalysis {
  riskScore: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectedEntities: {
    type: string;
    value: string;
    description: string;
  }[];
  policyViolation: string | null;
  coachingMessage: string;
  dataLineage: {
    source: string;
    destination: string;
    sensitivity: string;
  }[];
}

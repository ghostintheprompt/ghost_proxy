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

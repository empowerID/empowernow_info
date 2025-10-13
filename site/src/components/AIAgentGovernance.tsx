import React from 'react';

type Props = {
  caption?: string;
};

export default function AIAgentGovernance({ caption }: Props) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="w-full" style={{ minHeight: '200px' }}>
        <div className="w-full" style={{ padding: '8px', background: 'linear-gradient(135deg,#0f172a,#0b1226)' }}>
          {/* Inline SVG diagram from design spec (trimmed styling kept) */}
          <svg viewBox="0 0 1600 1420" style={{ width: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
            <title id="title">ARIA: AI Agent Governance</title>
            <desc id="desc">Identities, delegations, policy bindings, lifecycle, and runtime enforcement.</desc>
            <defs>
              <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            {/* Title */}
            <text x="800" y="80" fill="url(#titleGrad)" fontSize="40" fontWeight="900" textAnchor="middle">ARIA: AI Agent Governance</text>
            {/* Simple blocks indicating the 4 sections from the full diagram */}
            <g>
              <rect x="40" y="120" width="1520" height="220" rx="16" fill="rgba(59,130,246,0.08)" stroke="#3B82F6" strokeWidth="3" />
              <text x="60" y="160" fill="#3B82F6" fontSize="20" fontWeight="900">1. IDENTITY MODEL: First‑Class Graph Objects</text>
              <text x="60" y="185" fill="#E8EDF5" fontSize="14">Person • AIAgent • Service • Policy (YAML)</text>
            </g>
            <g>
              <rect x="40" y="360" width="1520" height="260" rx="16" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6" strokeWidth="3" />
              <text x="60" y="400" fill="#8B5CF6" fontSize="20" fontWeight="900">2. RELATIONSHIPS: Ownership + Delegation + Policy Binding</text>
              <text x="60" y="425" fill="#E8EDF5" fontSize="14">CONTROLLED_BY • DELEGATES_TO • POLICY_REF</text>
            </g>
            <g>
              <rect x="40" y="640" width="1520" height="200" rx="16" fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="3" />
              <text x="60" y="675" fill="#10B981" fontSize="20" fontWeight="900">3. LIFECYCLE: Registration → Delegation → Verification → Revocation</text>
            </g>
            <g>
              <rect x="40" y="860" width="1520" height="220" rx="16" fill="rgba(99,102,241,0.08)" stroke="#6366F1" strokeWidth="3" />
              <text x="60" y="895" fill="#6366F1" fontSize="20" fontWeight="900">4. RUNTIME: OBO Token Exchange + Policy Enforcement</text>
              <text x="60" y="920" fill="#E8EDF5" fontSize="14">PDP evaluates; PEPs enforce constraints (sync) and obligations (async)</text>
            </g>
            <text x="800" y="1120" fill="#C5D5E8" fontSize="14" textAnchor="middle">Use with AuthZEN PDP, Membership Service (Neo4j), and gateway PEPs</text>
          </svg>
        </div>
      </div>
      {caption && (
        <figcaption style={{ color: '#9ba3b7', marginTop: '8px' }}>{caption}</figcaption>
      )}
    </figure>
  );
}



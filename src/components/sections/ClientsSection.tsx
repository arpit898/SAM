'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

const W = 800;
const H = 520;
const CX = 400;
const CY = 260;

const SECTOR_NODES = [
  {
    id: 'metro', label: 'METRO RAIL', x: 400, y: 115,
    clients: [
      { label: 'DMRC', x: 318, y: 48 },
      { label: 'MMRDA', x: 400, y: 36 },
      { label: 'CMRL', x: 482, y: 48 },
    ],
  },
  {
    id: 'airports', label: 'AIRPORTS', x: 528, y: 188,
    clients: [
      { label: 'AAI', x: 612, y: 148 },
      { label: 'NIAL', x: 650, y: 204 },
    ],
  },
  {
    id: 'railways', label: 'RAILWAYS', x: 528, y: 332,
    clients: [
      { label: 'RITES', x: 650, y: 316 },
      { label: 'IRCON', x: 612, y: 372 },
    ],
  },
  {
    id: 'defence', label: 'DEFENCE', x: 400, y: 405,
    clients: [
      { label: 'MES', x: 318, y: 472 },
      { label: 'DRDO', x: 400, y: 484 },
      { label: 'BEL', x: 482, y: 472 },
    ],
  },
  {
    id: 'health', label: 'HEALTHCARE', x: 272, y: 332,
    clients: [
      { label: 'AIIMS', x: 150, y: 372 },
      { label: 'PGI', x: 188, y: 316 },
    ],
  },
  {
    id: 'industrial', label: 'INDUSTRIAL', x: 272, y: 188,
    clients: [
      { label: 'NTPC', x: 188, y: 148 },
      { label: 'BHEL', x: 150, y: 204 },
    ],
  },
];

export default function ClientsSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span
            className="uppercase text-white/30 block mb-4 font-mono"
            style={{ fontSize: '9px', letterSpacing: '0.45em' }}
          >
            Our Clients
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-black text-white leading-[1.0] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              Trusted by India&apos;s<br />
              <span style={{ color: '#FFD700' }}>Leading Institutions</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 max-w-md text-sm leading-relaxed mt-4"
          >
            From metro rail corporations and central government agencies to defence establishments and industrial leaders.
          </motion.p>
        </motion.div>

        {/* Network Constellation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full max-w-3xl mx-auto"
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </radialGradient>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Center ambient glow */}
            <circle cx={CX} cy={CY} r="90" fill="url(#hubGlow)" />

            {/* Lines: hub → sector */}
            {SECTOR_NODES.map((node, i) => (
              <motion.path
                key={`hub-${node.id}`}
                d={`M${CX},${CY} L${node.x},${node.y}`}
                stroke="#FFD700"
                strokeWidth="0.7"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.35 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: 'easeInOut' }}
              />
            ))}

            {/* Lines: sector → clients */}
            {SECTOR_NODES.flatMap((node, si) =>
              node.clients.map((client, ci) => (
                <motion.path
                  key={`sector-client-${node.id}-${ci}`}
                  d={`M${node.x},${node.y} L${client.x},${client.y}`}
                  stroke="rgba(255,255,255,1)"
                  strokeWidth="0.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.14 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.7 + si * 0.1 + ci * 0.05, ease: 'easeInOut' }}
                />
              ))
            )}

            {/* Client nodes */}
            {SECTOR_NODES.flatMap((node, si) =>
              node.clients.map((client, ci) => (
                <motion.g
                  key={`client-${node.id}-${ci}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 1.0 + si * 0.1 + ci * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ originX: client.x, originY: client.y, transformBox: 'fill-box', transformOrigin: `${client.x}px ${client.y}px` }}
                >
                  <circle cx={client.x} cy={client.y} r="11" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
                  <circle cx={client.x} cy={client.y} r="2.5" fill="rgba(255,255,255,0.55)" />
                  <text
                    x={client.x}
                    y={client.y + 21}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.32)"
                    style={{ fontSize: '8px', fontFamily: 'monospace', letterSpacing: '0.04em' }}
                  >
                    {client.label}
                  </text>
                </motion.g>
              ))
            )}

            {/* Sector nodes */}
            {SECTOR_NODES.map((node, i) => (
              <motion.g
                key={`sector-${node.id}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.09, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle cx={node.x} cy={node.y} r="22" fill="rgba(255,215,0,0.07)" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.55" />
                <circle cx={node.x} cy={node.y} r="5" fill="#FFD700" opacity="0.85" filter="url(#nodeGlow)" />
                <text
                  x={node.x}
                  y={node.y + 34}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  style={{ fontSize: '8.5px', fontFamily: 'monospace', letterSpacing: '0.1em' }}
                >
                  {node.label}
                </text>
              </motion.g>
            ))}

            {/* Central hub */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              {/* Pulsing outer ring */}
              <motion.circle
                cx={CX} cy={CY} r="46"
                fill="none"
                stroke="#FFD700"
                strokeWidth="0.5"
                strokeOpacity="0.25"
                animate={{ r: [46, 56, 46], strokeOpacity: [0.25, 0.1, 0.25] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <circle cx={CX} cy={CY} r="36" fill="rgba(255,215,0,0.09)" stroke="#FFD700" strokeWidth="1" strokeOpacity="0.7" filter="url(#nodeGlow)" />
              <circle cx={CX} cy={CY} r="9" fill="#FFD700" />
              <text
                x={CX}
                y={CY - 46}
                textAnchor="middle"
                fill="#FFD700"
                style={{ fontSize: '9.5px', fontFamily: 'monospace', letterSpacing: '0.22em', fontWeight: 'bold' }}
              >
                SAM INDIA
              </text>
            </motion.g>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-[10px] text-white/20 mt-8 italic text-center"
          style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
        >
          Client logos to be added after verification and approval.
        </motion.p>
      </Container>
    </section>
  );
}

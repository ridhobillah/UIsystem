import React, { useState } from 'react';
import {
  Power,
  Sliders,
  Activity,
  Gauge,
  Thermometer,
} from 'lucide-react';

export default function PipingDashboard() {
  const [keranKiri, setKeranKiri] = useState(false);
  const [keranKanan, setKeranKanan] = useState(false);

  const anyOpen = keranKiri || keranKanan;

  // Level Air Dynamic:
  // Jika keran buka -> Tanki Utama naik (0.75), Cooling Tangki turun (0.30)
  // Jika keran tutup -> Tanki Utama turun (0.25), Cooling Tangki naik (0.80)
  const mainTankLevel = anyOpen ? 0.75 : 0.25;
  const coolingTankLevel = anyOpen ? 0.30 : 0.80;

  const toggleAll = () => {
    if (anyOpen) {
      setKeranKiri(false);
      setKeranKanan(false);
    } else {
      setKeranKiri(true);
      setKeranKanan(true);
    }
  };

  const Stream = ({ pathId, active, count = 5, dur = 2.2, color = '#6fd1ff' }) => {
    if (!active) return null;
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <circle key={i} r="5" fill={color} opacity="0.95">
            <animateMotion
              dur={`${dur}s`}
              repeatCount="indefinite"
              begin={`${(i * dur) / count}s`}
              rotate="auto"
            >
              <mpath xlinkHref={`#${pathId}`} />
            </animateMotion>
          </circle>
        ))}
      </>
    );
  };

  return (
    <div className="flex h-screen bg-[#161616] text-slate-100 font-sans select-none">
      <style>{`
        @keyframes waterWave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        .wave-anim { animation: waterWave 1.4s linear infinite; }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .glow-pulse { animation: glowPulse 1.6s ease-in-out infinite; }
        @keyframes ledBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .led-blink { animation: ledBlink 1s ease-in-out infinite; }
        
        /* Smooth Animation untuk Ketinggian Air */
        .liquid-transition {
          transition: y 1.2s ease-in-out, height 1.2s ease-in-out;
        }
      `}</style>

      <aside className="w-80 bg-[#1d1d1d] border-r border-[#333] p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#333]">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide text-white">SmartTap</h1>
              <p className="text-[10px] text-slate-400 font-mono">Version 1.0</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Kontrol Keran
            </h2>

            <ValveButton
              label="KERAN KIRI"
              open={keranKiri}
              onClick={() => setKeranKiri(!keranKiri)}
            />
            <ValveButton
              label="KERAN KANAN"
              open={keranKanan}
              onClick={() => setKeranKanan(!keranKanan)}
            />

            <button
              onClick={toggleAll}
              className="w-full mt-2 py-3 bg-gradient-to-b from-[#3a3a3a] to-[#2b2b2b] hover:from-[#454545] hover:to-[#333] text-slate-200 font-mono text-xs font-bold rounded-xl transition border border-[#4a4a4a] flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <Power className="w-4 h-4 text-blue-400" />
              <span>{anyOpen ? 'MATIKAN SEMUA KERAN' : 'NYALAKAN SEMUA KERAN'}</span>
            </button>
          </div>
        </div>

        <div className="bg-[#141414] p-4 rounded-xl border border-[#333] space-y-3 font-mono text-[11px]">
          <div className="flex justify-between items-center text-slate-400">
            <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5" /> Status Sirkulasi:</span>
            <span className={anyOpen ? 'text-blue-400 font-bold' : 'text-slate-500'}>
              {anyOpen ? 'MENGALIR' : 'STOP'}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Jalur Aktif:</span>
            <span className="text-emerald-400 font-bold">
              {keranKiri && keranKanan ? 'Kiri & Kanan' : keranKiri ? 'Keran Kiri' : keranKanan ? 'Keran Kanan' : 'Tidak Ada'}
            </span>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-[#2a2a2a] p-8 flex flex-col justify-between relative overflow-hidden text-slate-900">
        <div className="flex justify-between items-center z-10">
          <div className="bg-[#111] text-white px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 shadow-lg border border-[#333]">
            <span className={`w-2.5 h-2.5 rounded-full ${anyOpen ? 'bg-blue-500 led-blink' : 'bg-slate-600'}`}></span>
            SCHEMATIC REAL-TIME PIPING
          </div>
          <div className="text-right">
            <h2 className="font-black text-xl text-slate-100 tracking-tight">Sistem Keran Sirkulasi Tanki</h2>
            <p className="text-xs text-slate-400 font-medium">Klik valve untuk membuka/menutup aliran</p>
          </div>
        </div>

        <div className="relative w-full h-[560px] my-auto border border-[#1a1a1a] rounded-2xl bg-[#3d3d3d] p-4 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 500">
            <defs>
              <linearGradient id="tankMetal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8a8f96" />
                <stop offset="12%" stopColor="#c7ccd1" />
                <stop offset="30%" stopColor="#eef1f3" />
                <stop offset="50%" stopColor="#b7bcc2" />
                <stop offset="70%" stopColor="#9aa0a6" />
                <stop offset="100%" stopColor="#6d7278" />
              </linearGradient>
              <linearGradient id="tankCap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dfe3e6" />
                <stop offset="100%" stopColor="#8a8f96" />
              </linearGradient>
              <linearGradient id="liquidHot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8a4c" />
                <stop offset="100%" stopColor="#c9451a" />
              </linearGradient>
              <linearGradient id="liquidCool" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5bc4ff" />
                <stop offset="100%" stopColor="#1e6fbf" />
              </linearGradient>
              <linearGradient id="pipeSteel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a4f55" />
                <stop offset="35%" stopColor="#8b9096" />
                <stop offset="55%" stopColor="#2c2f33" />
                <stop offset="100%" stopColor="#1a1c1e" />
              </linearGradient>
              <linearGradient id="pipeWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bfe9ff" />
                <stop offset="45%" stopColor="#3ba9ec" />
                <stop offset="100%" stopColor="#0f5fa8" />
              </linearGradient>
              <radialGradient id="valveBody" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#9aa1a8" />
                <stop offset="60%" stopColor="#585d63" />
                <stop offset="100%" stopColor="#2b2e31" />
              </radialGradient>
            </defs>

            <TankVessel x={40} y={40} width={230} height={420} label="Tanki Utama" liquidColor="url(#liquidCool)" level={mainTankLevel} />
            <TankVessel x={730} y={40} width={230} height={420} label="Cooling Tangki" liquidColor="url(#liquidCool)" level={coolingTankLevel} />

            <g stroke="url(#pipeSteel)" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 155 70 L 845 70 L 845 380" />
              <path d="M 845 380 L 630 380 L 630 460 L 510 460 L 510 280" />
              <path d="M 510 380 L 580 380 L 580 280 L 510 280" />
              <path d="M 510 380 L 440 380 L 440 280 L 510 280" />
              <path d="M 510 280 L 510 260 L 160 260 L 160 70" />
            </g>
            <g stroke="#c9ced3" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 155 66 L 845 66 L 845 376" />
              <path d="M 845 376 L 630 376 L 630 456 L 510 456 L 510 276" />
              <path d="M 510 376 L 580 376 L 580 276 L 510 276" />
              <path d="M 510 376 L 440 376 L 440 276 L 510 276" />
              <path d="M 510 276 L 510 256 L 160 256 L 160 66" />
            </g>

            {[[155,70],[845,70],[845,380],[630,380],[630,460],[510,460],[510,380],[510,280],[160,260],[160,70]].map(([fx,fy],i)=>(
              <circle key={i} cx={fx} cy={fy} r="10" fill="none" stroke="#111" strokeWidth="3" opacity="0.5" />
            ))}

            {anyOpen && (
              <g stroke="url(#pipeWater)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
                <path id="pTop" d="M 155 70 L 845 70 L 845 380" />
                <path id="pDown" d="M 845 380 L 630 380 L 630 460 L 510 460 L 510 380" />
                <path id="pReturn" d="M 510 280 L 510 260 L 160 260 L 160 70" />
              </g>
            )}
            {keranKanan && (
              <path id="pKanan" d="M 510 380 L 580 380 L 580 280 L 510 280" stroke="url(#pipeWater)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            )}
            {keranKiri && (
              <path id="pKiri" d="M 510 380 L 440 380 L 440 280 L 510 280" stroke="url(#pipeWater)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            )}

            {!anyOpen && (
              <g opacity="0">
                <path id="pTop" d="M 155 70 L 845 70 L 845 380" />
                <path id="pDown" d="M 845 380 L 630 380 L 630 460 L 510 460 L 510 380" />
                <path id="pReturn" d="M 510 280 L 510 260 L 160 260 L 160 70" />
              </g>
            )}
            {!keranKanan && <path id="pKanan" opacity="0" d="M 510 380 L 580 380 L 580 280 L 510 280" fill="none" />}
            {!keranKiri && <path id="pKiri" opacity="0" d="M 510 380 L 440 380 L 440 280 L 510 280" fill="none" />}

            <Stream pathId="pTop" active={anyOpen} dur={2.4} count={5} />
            <Stream pathId="pDown" active={anyOpen} dur={2.0} count={4} />
            <Stream pathId="pReturn" active={anyOpen} dur={2.4} count={5} />
            <Stream pathId="pKanan" active={keranKanan} dur={1.2} count={3} color="#8be3ff" />
            <Stream pathId="pKiri" active={keranKiri} dur={1.2} count={3} color="#8be3ff" />

            <ValveGraphic cx={440} cy={330} open={keranKiri} onClick={() => setKeranKiri(!keranKiri)} labelText="Kiri" />
            <ValveGraphic cx={580} cy={330} open={keranKanan} onClick={() => setKeranKanan(!keranKanan)} labelText="Kanan" />
          </svg>
        </div>

        <div className="flex justify-between items-center text-xs font-mono text-slate-300 font-semibold pt-2">
          <span>• TANKI KAPASITAS: 1000 L</span>
          <span>• SIRKULASI SIKLUS: {anyOpen ? 'AKTIF (LOOP CLOSED)' : 'MATI (LOOP OPEN)'}</span>
          <span>• COOLING TANGKI: READY</span>
        </div>
      </main>
    </div>
  );
}

/* ================= SIDEBAR VALVE BUTTON ================= */
function ValveButton({ label, open, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-200 ${
        open
          ? 'bg-blue-600/15 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10'
          : 'bg-[#252525] border-[#3e3e42] text-slate-400 hover:border-slate-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`relative w-3.5 h-3.5 rounded-full ${open ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500'} ${open ? 'led-blink' : ''}`}></span>
        <span className="font-bold text-xs font-mono">{label}</span>
      </div>
      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${open ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
        {open ? 'TERBUKA' : 'TERTUTUP'}
      </span>
    </button>
  );
}

/* ================= REALISTIC CYLINDRICAL TANK WITH ANIMATED LIQUID LEVEL ================= */
function TankVessel({ x, y, width, height, label, liquidColor, level }) {
  const capH = width * 0.16;
  const liquidTop = y + capH + (height - 2 * capH) * (1 - level);
  const liquidBottomY = y + height - capH;
  const liquidHeight = Math.max(0, liquidBottomY - liquidTop);
  
  // Format ID Unik untuk ClipPath SVG
  const clipId = `clip-${label.replace(/\s+/g, '')}`;

  return (
    <g>
      <text x={x + width / 2} y={y - 14} textAnchor="middle" fill="#e6e8ea" fontSize="19" fontWeight="bold" fontFamily="monospace">{label}</text>
      <rect x={x + 18} y={y + height} width="14" height="26" fill="#3a3d40" rx="2" />
      <rect x={x + width - 32} y={y + height} width="14" height="26" fill="#3a3d40" rx="2" />
      <rect x={x} y={y + capH / 2} width={width} height={height - capH} rx={width * 0.08} fill="url(#tankMetal)" stroke="#4d5257" strokeWidth="2" />
      <ellipse cx={x + width / 2} cy={y + capH / 2} rx={width / 2} ry={capH / 2} fill="url(#tankCap)" stroke="#4d5257" strokeWidth="2" />
      <ellipse cx={x + width / 2} cy={y + height - capH / 2} rx={width / 2} ry={capH / 2} fill="#6d7278" stroke="#4d5257" strokeWidth="2" />
      
      <clipPath id={clipId}>
        <rect x={x + 6} y={y + capH / 2} width={width - 12} height={height - capH} rx={width * 0.07} />
      </clipPath>
      
      <g clipPath={`url(#${clipId})`}>
        <rect
          x={x}
          y={liquidTop}
          width={width}
          height={liquidHeight}
          fill={liquidColor}
          opacity="0.88"
          className="liquid-transition"
        />
        <rect
          x={x}
          y={liquidTop}
          width={width}
          height="6"
          fill="#ffffff"
          opacity="0.25"
          className="wave-anim liquid-transition"
        />
      </g>
      <line x1={x + 4} y1={y + capH * 1.1} x2={x + width - 4} y2={y + capH * 1.1} stroke="#4d5257" strokeWidth="1.5" opacity="0.5" />
      <line x1={x + 4} y1={y + height - capH * 1.1} x2={x + width - 4} y2={y + height - capH * 1.1} stroke="#4d5257" strokeWidth="1.5" opacity="0.5" />
    </g>
  );
}

/* ================= REALISTIC BALL VALVE ================= */
function ValveGraphic({ cx, cy, open, onClick, labelText }) {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <rect x={cx - 26} y={cy - 12} width="18" height="24" fill="#2c2f33" rx="2" />
      <rect x={cx + 8} y={cy - 12} width="18" height="24" fill="#2c2f33" rx="2" />
      <circle cx={cx} cy={cy} r="22" fill="url(#valveBody)" stroke="#16181a" strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r="22" fill="none" stroke={open ? '#22c55e' : '#ef4444'} strokeWidth="2" opacity="0.9" className={open ? 'glow-pulse' : ''} />
      <g transform={`rotate(${open ? 0 : 90} ${cx} ${cy})`} style={{ transition: 'transform 300ms ease' }}>
        <rect x={cx - 32} y={cy - 4} width="64" height="8" rx="4" fill={open ? '#22c55e' : '#ef4444'} stroke="#111" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="5" fill="#111" />
      </g>
      <text x={cx} y={cy + 42} textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="bold" fill="#eaecee">{labelText}</text>
      <text x={cx} y={cy + 56} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={open ? '#4ade80' : '#f87171'}>{open ? 'OPEN' : 'CLOSED'}</text>
    </g>
  );
}
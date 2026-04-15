"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, stagger } from "animejs";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Status = "available" | "reserved" | "sold";

interface PlotCell {
  kind: "plot";
  n: number;
  row: number; // 1-indexed CSS grid row
  col: number; // 1-indexed CSS grid track (in the 9-track column template)
  status: Status;
  price: string;
}

interface FacilityCell {
  kind: "facility";
  row: number;
  colStart: number;
  colEnd: number; // exclusive
  label: string;
  emoji: string;
  tw: string;
}

/* ─── 9-track column template ────────────────────────────────────────────────
 *
 *  Track  Size   Content
 *  ─────  ─────  ────────────────────────────────────────────────────────
 *    1    1fr    Col A  — outer-left   (plots 1, 44–52)
 *    2    36px   ROAD 1 — main vertical road (west internal)
 *    3    1fr    Col B  — centre-left-A (plots 2, 28 30 32 34 36 38 40 42)
 *    4    1fr    Col C  — centre-left-B (plots 3, 29 31 33 35 37 39 41 43)
 *    5    36px   ROAD 2 — main vertical road (central)
 *    6    1fr    Col D  — centre-right-A (plots 4, 16 18 20 22 24 26)
 *    7    1fr    Col E  — centre-right-B (plots 5, 17 19 21 23 25 27)
 *    8    36px   ROAD 3 — main vertical road (east internal)
 *    9    1fr    Col F  — outer-right   (plots 6, 7–15)
 *
 *  12-track row template:
 *    Row 1   = entrance plots   (76px)
 *    Row 2   = HORIZONTAL ROAD  (36px)
 *    Row 3–11= main body rows   (76px × 9)
 *    Row 12  = civic strip      (60px)
 * ─────────────────────────────────────────────────────────────────────────*/

/* ─── Status overrides ───────────────────────────────────────────────────── */
const STATUS_OVERRIDE: Record<number, Status> = {
  6: "sold", 17: "sold", 28: "sold", 45: "sold", 49: "sold",
  2: "reserved", 9: "reserved", 16: "reserved", 25: "reserved",
  30: "reserved", 35: "reserved", 38: "reserved", 47: "reserved",
};

function p(n: number, row: number, col: number, price = "$8,500"): PlotCell {
  return { kind: "plot", n, row, col, status: STATUS_OVERRIDE[n] ?? "available", price };
}

/* ─── 53 plots ───────────────────────────────────────────────────────────── */
const PLOTS: PlotCell[] = [
  // ── Entrance row (grid-row 1) — one plot per column ──
  p(1,  1, 1, "$9,000"),  // col A
  p(2,  1, 3, "$9,000"),  // col B
  p(3,  1, 4, "$9,000"),  // col C
  p(4,  1, 6, "$9,000"),  // col D
  p(5,  1, 7, "$9,000"),  // col E
  p(6,  1, 9, "$9,000"),  // col F

  // ── Col A outer-left (track 1): grid-rows 3–11 → plots 44–52 ──
  p(44,  3, 1), p(45,  4, 1), p(46,  5, 1), p(47,  6, 1), p(48,  7, 1),
  p(49,  8, 1), p(50,  9, 1), p(51, 10, 1), p(52, 11, 1),

  // ── Col B centre-left-A (track 3): grid-rows 3–10 → plots 28 30 32 34 36 38 40 42 ──
  p(28,  3, 3), p(30,  4, 3), p(32,  5, 3), p(34,  6, 3),
  p(36,  7, 3), p(38,  8, 3), p(40,  9, 3), p(42, 10, 3),

  // ── Col C centre-left-B (track 4): grid-rows 3–10 → plots 29 31 33 35 37 39 41 43 ──
  p(29,  3, 4), p(31,  4, 4), p(33,  5, 4), p(35,  6, 4),
  p(37,  7, 4), p(39,  8, 4), p(41,  9, 4), p(43, 10, 4),

  // ── Col D centre-right-A (track 6): grid-rows 3–8 → plots 16 18 20 22 24 26 ──
  p(16,  3, 6), p(18,  4, 6), p(20,  5, 6), p(22,  6, 6),
  p(24,  7, 6), p(26,  8, 6),

  // ── Col E centre-right-B (track 7): grid-rows 3–8 → plots 17 19 21 23 25 27 ──
  p(17,  3, 7), p(19,  4, 7), p(21,  5, 7), p(23,  6, 7),
  p(25,  7, 7), p(27,  8, 7),

  // ── Col F outer-right (track 9): grid-rows 3–11 → plots 7–15 ──
  p( 7,  3, 9), p( 8,  4, 9), p( 9,  5, 9), p(10,  6, 9),
  p(11,  7, 9), p(12,  8, 9), p(13,  9, 9), p(14, 10, 9),
  p(15, 11, 9),

  // ── Plot 53 — near gate (grid-row 11, col D) ──
  p(53, 11, 6),
];

/* ─── Facilities ─────────────────────────────────────────────────────────── */
const FACILITIES: FacilityCell[] = [
  // Amenity block: rows 9–10 in the centre-right columns
  { kind:"facility", row: 9, colStart:6, colEnd:7,  label:"Pool",            emoji:"🏊", tw:"bg-sky-950    border-sky-600/40   text-sky-200"    },
  { kind:"facility", row: 9, colStart:7, colEnd:8,  label:"Children's Play", emoji:"⛹️", tw:"bg-sky-950    border-sky-600/40   text-sky-200"    },
  { kind:"facility", row:10, colStart:6, colEnd:7,  label:"Mini Mart",       emoji:"🏪", tw:"bg-amber-950  border-amber-600/40 text-amber-200"  },
  { kind:"facility", row:10, colStart:7, colEnd:8,  label:"Event Centre",    emoji:"🎭", tw:"bg-amber-950  border-amber-600/40 text-amber-200"  },
  // Row 11 — car park spans full centre-left block (cols B+C = tracks 3–4)
  { kind:"facility", row:11, colStart:3, colEnd:5,  label:"Car Park",        emoji:"🅿️", tw:"bg-zinc-900   border-zinc-600/40  text-zinc-300"   },
  // Gate (col E / track 7)
  { kind:"facility", row:11, colStart:7, colEnd:8,  label:"IN / OUT",        emoji:"⛩️", tw:"bg-green-900  border-green-600/40 text-green-200"  },
  // Row 12 civic strip
  { kind:"facility", row:12, colStart:1, colEnd:2,  label:"Mosque",          emoji:"🕌", tw:"bg-green-950  border-green-500/50 text-green-100"  },
  { kind:"facility", row:12, colStart:3, colEnd:5,  label:"Security / OUT",  emoji:"🛡️", tw:"bg-green-950  border-green-500/50 text-green-100"  },
];

/* ─── Styling ────────────────────────────────────────────────────────────── */
const PLOT_CLS: Record<Status, string> = {
  available: "bg-stone-50 border-stone-300/80 text-stone-900 hover:border-gold-400 hover:shadow-[0_0_14px_rgba(212,175,55,0.3)] cursor-pointer transition-all duration-150",
  reserved:  "bg-amber-50/90 border-amber-300/70 text-amber-900 cursor-not-allowed",
  sold:      "bg-white/[0.04] border-white/10 text-white/20 opacity-40 cursor-default",
};
const BADGE_CLS: Record<Status, string> = {
  available: "text-emerald-600",
  reserved:  "text-amber-600",
  sold:      "text-white/25",
};
const BADGE_TXT: Record<Status, string> = {
  available: "AVL",
  reserved:  "RSV",
  sold:      "SLD",
};

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const TOTAL = PLOTS.length;
const AVL   = PLOTS.filter(c => c.status === "available").length;
const RSVD  = PLOTS.filter(c => c.status === "reserved").length;
const SOLD  = PLOTS.filter(c => c.status === "sold").length;

/* ─── Road element ───────────────────────────────────────────────────────── */
function RoadV({ col, rowEnd = 13 }: { col: number; rowEnd?: number }) {
  return (
    <div
      aria-hidden
      style={{ gridColumn: col, gridRow: `1 / ${rowEnd}`, pointerEvents: "none" }}
      className="relative flex justify-center"
    >
      {/* Left curb */}
      <div className="absolute left-[6px] top-0 bottom-0 w-px bg-white/10" />
      {/* Centre dashed line */}
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 10px, transparent 10px, transparent 22px)",
        }}
      />
      {/* Right curb */}
      <div className="absolute right-[6px] top-0 bottom-0 w-px bg-white/10" />
    </div>
  );
}

function RoadH({ row, colStart = 1, colEnd = 10 }: { row: number; colStart?: number; colEnd?: number }) {
  return (
    <div
      aria-hidden
      style={{ gridRow: row, gridColumn: `${colStart} / ${colEnd}`, pointerEvents: "none" }}
      className="relative flex flex-col justify-center"
    >
      {/* Top curb */}
      <div className="absolute top-[6px] left-0 right-0 h-px bg-white/10" />
      {/* Centre dashed line */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "repeating-linear-gradient(to right, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 14px, transparent 14px, transparent 30px)",
        }}
      />
      {/* Bottom curb */}
      <div className="absolute bottom-[6px] left-0 right-0 h-px bg-white/10" />
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function UmmiSaeedaSitePlan() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return;

    animate(root.querySelectorAll<HTMLElement>(".anim-plot"), {
      opacity:  [0, 1],
      scale:    [0.82, 1],
      delay:    stagger(18, { from: "first" }),
      duration: 520,
      ease:     "outExpo",
    });

    animate(root.querySelectorAll<HTMLElement>(".anim-fac"), {
      opacity:    [0, 1],
      translateY: [10, 0],
      delay:      stagger(50, { start: 750 }),
      duration:   380,
      ease:       "outQuart",
    });
  }, []);

  return (
    <div ref={scopeRef}>

      {/* ── Stats + legend ── */}
      <div className="flex flex-wrap items-center justify-between gap-5 mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-5">
          {[
            { label: "Available", val: AVL,   cls: "text-white"     },
            { label: "Reserved",  val: RSVD,  cls: "text-amber-400" },
            { label: "Sold",      val: SOLD,  cls: "text-white/25"  },
            { label: "Total",     val: TOTAL, cls: "text-gold-400"  },
          ].map(({ label, val, cls }, i, arr) => (
            <div key={label} className="flex items-center gap-5">
              <div>
                <p className={`font-extrabold text-2xl leading-none ${cls}`}>{val}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{label}</p>
              </div>
              {i < arr.length - 1 && <div className="w-px h-7 bg-white/10" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {[
            { sw: "bg-stone-50  border border-stone-300/60",          label: "Available" },
            { sw: "bg-amber-50  border border-amber-300/60",          label: "Reserved"  },
            { sw: "bg-white/5   border border-white/10 opacity-40",   label: "Sold"      },
          ].map(({ sw, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 shrink-0 ${sw}`} />
              <span className="text-white/40 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Map canvas ── */}
      <div className="relative overflow-hidden" style={{ height: 1040 }}>

        {/* Entrance label */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none flex flex-col items-center gap-1 opacity-35">
          <span className="text-white text-[9px] font-black tracking-[0.3em] uppercase">Main Entrance</span>
          <div className="w-px h-4 bg-white" />
        </div>

        {/* Rotated estate */}
        <div
          className="absolute"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%, -48%) rotate(-17deg)",
          }}
        >
          {/* Estate boundary — background acts as road surface colour */}
          <div
            className="relative border border-white/[0.14]"
            style={{ background: "#0c1c10" }}
          >
            {/* North arrow */}
            <div
              className="absolute pointer-events-none select-none flex flex-col items-center gap-[2px] opacity-25"
              style={{ top: -30, right: 2 }}
            >
              <span className="text-white text-[10px] font-black leading-none">N</span>
              <div className="w-px h-5 bg-white" />
              <div
                style={{ marginTop: -20 }}
                className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent border-b-white"
              />
            </div>

            {/* ── THE CSS GRID ── */}
            <div
              style={{
                display: "grid",
                // 9 column tracks: plot | ROAD | plot plot | ROAD | plot plot | ROAD | plot
                gridTemplateColumns: "1fr 36px 1fr 1fr 36px 1fr 1fr 36px 1fr",
                // 12 row tracks: entrance | H-ROAD | 9×main | civic
                gridTemplateRows: "76px 36px 76px 76px 76px 76px 76px 76px 76px 76px 76px 60px",
                rowGap: 0,
                columnGap: 0,
              }}
            >
              {/* ══ ROAD ELEMENTS (rendered first — behind plots in DOM order) ══ */}

              {/* Vertical Road 1 — between col A and centre-left block */}
              <RoadV col={2} />
              {/* Vertical Road 2 — between centre-left and centre-right blocks */}
              <RoadV col={5} />
              {/* Vertical Road 3 — between centre-right block and col F */}
              <RoadV col={8} />
              {/* Horizontal Road — between entrance row and main body */}
              <RoadH row={2} colStart={1} colEnd={10} />

              {/* ══ PLOT CELLS ══ */}
              {PLOTS.map(cell => (
                <div
                  key={cell.n}
                  className={`anim-plot border flex flex-col justify-between p-[7px] ${PLOT_CLS[cell.status]}`}
                  style={{ gridRow: cell.row, gridColumn: cell.col, opacity: 0 }}
                >
                  <div className="flex items-start justify-between gap-0.5">
                    <span className="font-black text-[13px] leading-none">{cell.n}</span>
                    <span className={`text-[8px] font-extrabold leading-none ${BADGE_CLS[cell.status]}`}>
                      {BADGE_TXT[cell.status]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    {cell.status !== "sold" && (
                      <p className="text-[8px] font-semibold leading-none text-stone-500">{cell.price}</p>
                    )}
                    {cell.status === "available" && (
                      <Link
                        href="/purchase"
                        onClick={e => e.stopPropagation()}
                        className="block text-center text-[7px] font-black uppercase tracking-wide bg-gold-400 hover:bg-gold-300 text-green-950 py-[3px] leading-none transition-colors"
                      >
                        Buy
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {/* ══ FACILITY CELLS ══ */}
              {FACILITIES.map((fac, i) => (
                <div
                  key={i}
                  className={`anim-fac border flex flex-col items-center justify-center gap-[3px] ${fac.tw}`}
                  style={{
                    gridRow: fac.row,
                    gridColumn: `${fac.colStart} / ${fac.colEnd}`,
                    opacity: 0,
                  }}
                >
                  <span className="text-[13px] leading-none">{fac.emoji}</span>
                  <span className="text-[8px] font-bold uppercase tracking-wide text-center leading-tight px-1">
                    {fac.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Outer boundary road label */}
          <div
            className="absolute pointer-events-none select-none opacity-20"
            style={{ top: "40%", left: -80, transform: "rotate(-90deg) translateX(-50%)" }}
          >
            <span className="text-white text-[9px] font-black tracking-[0.25em] uppercase whitespace-nowrap">
              Boundary Road
            </span>
          </div>
        </div>

        {/* Compass — bottom-right, unrotated */}
        <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none select-none">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-px bg-white" />
            </div>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[9px] font-black">N</span>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-white text-[9px] font-black">S</span>
            <span className="absolute top-1/2 -right-3 -translate-y-1/2 text-white text-[9px] font-black">E</span>
            <span className="absolute top-1/2 -left-3 -translate-y-1/2 text-white text-[9px] font-black">W</span>
          </div>
        </div>

        {/* Estate name — bottom-left, unrotated */}
        <div className="absolute bottom-5 left-0 opacity-25 pointer-events-none select-none">
          <p className="text-white text-[10px] font-black tracking-[0.2em] uppercase">Ummi Saeeda Village</p>
          <p className="text-white/50 text-[9px] tracking-wider mt-0.5">Mankessim, Central Region</p>
        </div>

      </div>
    </div>
  );
}

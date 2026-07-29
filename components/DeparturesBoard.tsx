"use client";

import { useEffect, useState } from "react";

type Row = {
  id: string;
  time: string;
  product: string;
  dest: string;
  status: "PACKED" | "SHIPPED" | "DELIVERED";
};

const SEED: Row[] = [
  { id: "FL-1042", time: "09:14", product: "Ring Light Mini", dest: "Austin, TX", status: "SHIPPED" },
  { id: "FL-1041", time: "09:11", product: "Phone Chain — Pearl", dest: "Leeds, UK", status: "PACKED" },
  { id: "FL-1040", time: "09:07", product: "Desk Mat — Sage", dest: "Manila, PH", status: "DELIVERED" },
  { id: "FL-1039", time: "09:02", product: "Claw Clip Set", dest: "Cape Town, ZA", status: "SHIPPED" },
  { id: "FL-1038", time: "08:58", product: "LED Strip 5m", dest: "Toronto, CA", status: "SHIPPED" },
];

const POOL: Omit<Row, "id" | "time">[] = [
  { product: "Ring Light Mini", dest: "Austin, TX", status: "SHIPPED" },
  { product: "Phone Chain — Pearl", dest: "Leeds, UK", status: "PACKED" },
  { product: "Desk Mat — Sage", dest: "Manila, PH", status: "DELIVERED" },
  { product: "Claw Clip Set", dest: "Cape Town, ZA", status: "SHIPPED" },
  { product: "LED Strip 5m", dest: "Toronto, CA", status: "SHIPPED" },
  { product: "Tote Bag — Canvas", dest: "Lagos, NG", status: "PACKED" },
  { product: "Enamel Pin Pack", dest: "Sydney, AU", status: "DELIVERED" },
  { product: "Sticker Sheet Vol.2", dest: "Berlin, DE", status: "SHIPPED" },
];

function statusStyle(s: Row["status"]) {
  if (s === "DELIVERED") return "bg-volt/30 text-ink";
  if (s === "SHIPPED") return "bg-sky/20 text-sky";
  return "bg-ink/10 text-ink/70";
}

export default function DeparturesBoard() {
  const [rows, setRows] = useState<Row[]>(SEED);
  const [counter, setCounter] = useState(1043);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = POOL[Math.floor(Math.random() * POOL.length)];
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      setRows((prev) => {
        const updated: Row[] = [{ id: `FL-${counter}`, time, ...next }, ...prev.slice(0, 4)];
        return updated;
      });
      setCounter((c) => c + 1);
    }, 3400);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white/95 shadow-soft">
      <div className="flex items-center justify-between border-b border-ink/10 bg-ink px-5 py-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-paper/70">Departures</p>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-paper/50">real orders, real movement</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-volt/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-volt" />
          live
        </span>
      </div>

      <div className="flap-row !border-b-0 bg-paper/70 py-3 text-[0.7rem] uppercase tracking-wider text-slate">
        <span>Order</span>
        <span>Item</span>
        <span className="flap-dest">To</span>
        <span>Status</span>
      </div>

      <div className="px-5">
        {rows.map((r, index) => (
          <div
            key={r.id}
            className={`flap-row text-sm text-ink ${index % 2 === 0 ? "bg-white" : "bg-slate/5"}`}
          >
            <span className="text-slate">{r.id}</span>
            <span className="truncate font-medium">{r.product}</span>
            <span className="flap-dest truncate text-slate">{r.dest}</span>
            <span className={`status-pill ${statusStyle(r.status)}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

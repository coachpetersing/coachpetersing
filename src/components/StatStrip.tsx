import { stats } from "@/content/stats";
import StatCounter from "./StatCounter";

export default function StatStrip({ bordered = true }: { bordered?: boolean }) {
  return (
    <section className={`bg-ink text-white ${bordered ? "border-t border-white/10" : ""}`}>
      <div className="mx-auto grid w-full max-w-site grid-cols-2 gap-x-6 gap-y-12 px-5 py-16 md:grid-cols-4 md:px-8 md:py-24">
        {stats.map((s) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}

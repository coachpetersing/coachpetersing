/** CSS-only stagger so the headline paints before JavaScript loads. Reduced motion is handled globally in globals.css. */
export default function HeroText({ headline, sub }: { headline: string; sub: string }) {
  const words = headline.split(" ");
  return (
    <>
      <h1 className="font-display text-[40px] font-extrabold leading-[1.02] tracking-tight md:text-[72px] lg:text-[88px]">
        {words.map((w, i) => (
          <span
            key={i}
            className="hero-word inline-block"
            style={{ animationDelay: `${80 + i * 45}ms` }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
      <p
        className="hero-word mt-6 max-w-xl font-body text-lg text-white/80 md:text-xl"
        style={{ animationDelay: `${80 + words.length * 45}ms` }}
      >
        {sub}
      </p>
    </>
  );
}

/** CSS-only stagger so the headline paints before JavaScript loads. Reduced motion is handled globally in globals.css. */
export default function HeroText({ headline, sub }: { headline: string; sub: string }) {
  const words = headline.split(" ");
  return (
    <>
      <h1 className="font-display text-[38px] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-[48px] md:text-[44px] lg:text-[60px] xl:text-[68px]">
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
        className="hero-word mt-6 max-w-xl font-body text-lg text-offblack md:text-xl"
        style={{ animationDelay: `${80 + words.length * 45}ms` }}
      >
        {sub}
      </p>
    </>
  );
}

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Image constants ───────────────────────────────────────────────────────
import doctorLab from "./images/doctor-lab.jpg";
import goatVet from "./images/goat-vet.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import img6 from "./images/img6.jpg";
import img7 from "./images/img7.jpg";
import img8 from "./images/img8.jpg";

const IMG = {
  doctorHero:   doctorLab,
  doctorHero2:  doctorLab,
  vetExam:      img5,
  catPerson:    img7,
  clinic:       img6,
  surgeryRoom:  img4,
  dog1:         img8,
  dog2:         goatVet,
  dog3:         img4,
  dogCat:       img7,
  cat:          goatVet,
  instruments:  img6,
};

type Page = "home" | "about" | "services" | "gallery" | "contact";

// ─── Particle system ───────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 3}px`,
    delay: `${Math.random() * 12}s`,
    duration: `${10 + Math.random() * 14}s`,
    opacity: 0.3 + Math.random() * 0.4,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: `rgba(16,185,129,${p.opacity})`,
            animation: `particle-float ${p.duration} ${p.delay} ease-in infinite`,
            boxShadow: `0 0 6px rgba(16,185,129,${p.opacity})`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────
function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { label: string; id: Page }[] = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full glass-gold flex items-center justify-center animate-glow">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 3h2v5a4 4 0 0 0 8 0V3h2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 3v2M14 3v2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 8a4 4 0 0 0 4 4 2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-1" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="15" cy="19" r="2" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5"/>
              
            </svg>
          </div>
          <div className="text-left">
            <div className="font-display text-lg font-semibold gold-text leading-none">Dr. Okello Joseph</div>
            <div className="text-xs text-white/40 tracking-widest uppercase mt-0.5">Veterinarian · Kampala</div>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => setPage(l.id)}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                  page === l.id
                    ? "text-[#10b981]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
                {page === l.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#10b981]" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => setPage("contact")}
          className="hidden md:block btn-gold px-6 py-2.5 rounded-full text-sm"
        >
          Book Appointment
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/70 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#10b981]/20 px-6 py-4 space-y-2" style={{background:'rgba(2,5,10,0.92)',backdropFilter:'blur(40px)',WebkitBackdropFilter:'blur(40px)'}}>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                page === l.id ? "text-[#10b981] bg-[#10b981]/10" : "text-white/60"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────
// Background slideshow — pets & clinic scenes (NOT the doctor photo)
const heroSlides = [IMG.dog3, IMG.dogCat, IMG.vetExam, IMG.catPerson, IMG.clinic, IMG.dog1];

function useAutoSlide(count: number, interval = 5000) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % count), interval);
    return () => clearInterval(t);
  }, [count, interval]);
  return [idx, setIdx] as const;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = target / 60;
          const t = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(t); }
            else setCount(Math.floor(start));
          }, 24);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display text-4xl font-bold gold-text">
      {count}{suffix}
    </div>
  );
}

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const [slide, setSlide] = useAutoSlide(heroSlides.length, 5500);
  const [testimonialsSlide, setTestimonialsSlide] = useAutoSlide(3, 4000);

  const testimonials = [
    {
      text: "Dr. Okello Joseph came to our farm in Nakaseke at short notice and saved three of our in-calf cows during the outbreak. His calm expertise and genuine care made all the difference.",
      name: "Ssenyonjo Richard",
      pet: "Dairy farmer, Nakaseke",
      avatar: IMG.dog3,
    },
    {
      text: "I've never met a vet who remembers every detail about my herd — their history, their quirks, their vaccination schedule. It's like having a personal doctor for my goats.",
      name: "Nabirye Sarah",
      pet: "Goat farmer, Mukono",
      avatar: IMG.cat,
    },
    {
      text: "Dr. Okello Joseph is am amazing veterinarian. He takes his time to explain everything clearly. He also follows-up by sending text messages to check how my dog pet is recovering after the visit. Absolute professional excellence, right here in Kampala.",
      name: "Kato Emmanuel",
      pet: "Dog owner, Kampala",
      avatar: IMG.dog1,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end md:items-center overflow-hidden">

        {/* ── LAYER 1: Full-screen background slideshow ── */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((src, i) => (
            <div key={i} className={`slideshow-item ${i === slide ? "active" : ""}`}>
              <img
                src={src}
                alt=""
                aria-hidden
                className="w-full h-full object-cover object-center"
                style={{ transform: i === slide ? "scale(1.02)" : "scale(1)", transition: "transform 8s ease", objectPosition: "center 25%" }}
              />
            </div>
          ))}
          {/* Multi-layer overlay: heavy at left for text, clear at right for image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#03070f] via-[#03070f]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03070f]/60 via-transparent to-[#03070f]/30" />
        </div>

        {/* ── LAYER 2: Decorative particles + rings ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <Particles />
          <div
            className="absolute right-[8%] top-[15%] w-[520px] h-[520px] rounded-full border border-[#10b981]/10 animate-spin-slow"
            style={{ animationDuration: "40s" }}
          />
          <div
            className="absolute right-[14%] top-[21%] w-[360px] h-[360px] rounded-full border border-[#10b981]/12"
            style={{ animation: "spin-slow 26s linear infinite reverse" }}
          />
        </div>

        {/* ── LAYER 3: Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-14 md:py-0">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center min-h-screen md:min-h-0 md:h-auto">

            {/* ── Left: Headline + CTA ── */}
            <div className="order-2 md:order-1 pb-8 md:pb-0 md:pt-28">
              <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-[#10b981] mb-6 animate-fade-in mt-4 md:mt-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-glow inline-block" />
                Licensed Veterinary Doctor · Kampala
              </div>

              <h1 className="font-display font-bold leading-[0.93] mb-5 animate-fade-in-left delay-200"
                style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
                <span className="block text-white">Your Animals</span>
                <span className="block italic gold-text">Deserve</span>
                <span className="block text-white">the Best.</span>
              </h1>

              <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-md mb-8 animate-fade-in-left delay-400">
                Compassionate, precision-driven veterinary care for livestock and
                pets across Kampala and beyond — treating every animal as if it were my own.
              </p>

              <div className="flex flex-wrap gap-3 animate-fade-in-up delay-600">
                <button
                  onClick={() => setPage("contact")}
                  className="btn-gold px-7 py-3.5 rounded-full text-sm"
                >
                  Book a Consultation
                </button>
                <button
                  onClick={() => setPage("services")}
                  className="btn-outline-gold px-7 py-3.5 rounded-full text-sm"
                >
                  My Services
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10 animate-fade-in-up delay-800">
                {[
                  { n: 3, s: "+", label: "Years Exp." },
                  { n: 100, s: "+", label: "Patients" },
                  { n: 97, s: "%", label: "Satisfaction" },
                ].map((st) => (
                  <div key={st.label}>
                    <AnimatedCounter target={st.n} suffix={st.s} />
                    <div className="text-white/40 text-xs mt-1 tracking-wide">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Slide indicator dots — small, bottom-left */}
              <div className="flex items-center gap-2 mt-8">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Background slide ${i + 1}`}
                    className={`rounded-full transition-all duration-500 ${i === slide ? "w-8 h-2 bg-[#10b981]" : "w-2 h-2 bg-white/25"}`}
                  />
                ))}
              </div>
            </div>

            {/* ── Right: STATIC Doctor portrait ── */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end items-center pt-28 md:pt-0 animate-fade-in-right delay-300">
              <div className="relative" style={{ width: "min(360px, 85vw)" }}>

                {/* Rotating glow ring behind the photo */}
                <div
                  className="absolute inset-[-12px] rounded-[2.5rem] border border-[#10b981]/25"
                  style={{ animation: "spin-slow 18s linear infinite" }}
                />
                <div
                  className="absolute inset-[-24px] rounded-[3rem] border border-[#10b981]/10"
                  style={{ animation: "spin-slow 30s linear infinite reverse" }}
                />

                {/* Gold corner accents */}
                {[
                  "top-0 left-0 border-t-2 border-l-2 rounded-tl-3xl",
                  "top-0 right-0 border-t-2 border-r-2 rounded-tr-3xl",
                  "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-3xl",
                  "bottom-0 right-0 border-b-2 border-r-2 rounded-br-3xl",
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-8 h-8 border-[#10b981]/60 ${cls}`} />
                ))}

                {/* Doctor photo — perfectly static */}
                <div
                  className="relative rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_60px_rgba(16,185,129,0.12)]"
                  style={{ aspectRatio: "3/4", background: "#0e1a2e" }}
                >
                  <img
                    src={IMG.doctorHero}
                    alt="Dr. Okello Joseph, Veterinarian"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Bottom fade so name card blends */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03070f]/70 via-[#03070f]/5 to-transparent" />

                  {/* Name card inside photo */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-3">
                    <div className="glass rounded-2xl px-4 py-3">
                      <div className="font-display text-base font-semibold text-white leading-tight">Dr. Okello Joseph</div>
                      <div className="text-[#10b981] text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">Licensed Veterinarian · Kampala</div>
                      <div className="flex items-center gap-1 mt-2">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="11" height="11" viewBox="0 0 12 12" fill="#10b981"><path d="M6 0l1.5 3.5L11 4.5l-2.5 2.4.6 3.5L6 8.7 2.9 10.4l.6-3.5L1 4.5l3.5-1z"/></svg>
                        ))}
                        <span className="text-white/45 text-[10px] ml-1">5.0 · 120 reviews</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating recovered badge removed */}
              </div>
            </div>

          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float opacity-50">
          <span className="text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#10b981] to-transparent" />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="py-4 border-y border-[#10b981]/10 overflow-hidden" style={{ background: "rgba(16,185,129,0.03)" }}>
        <div className="animate-ticker flex gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
          {[...Array(2)].map((_, rep) =>
            ["Livestock Health", "Farm Visits", "Vaccination Campaigns", "Small Animal Medicine", "Emergency Services", "Preventive Care", "Artificial Insemination", "Deworming"].map((t, i) => (
              <span key={`${rep}-${i}`} className="text-[#10b981]/60 text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-4">
                {t}
                <span className="text-[#10b981]/30">◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── FEATURED SERVICES PREVIEW ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] top-[-10%] left-[-10%] bg-[#10b981]/6" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">What I Offer</div>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white">
              Comprehensive <span className="italic gold-text">Care</span>
            </h2>
            <div className="gold-line w-24 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🐄",
                title: "Livestock & Farm Care",
                desc: "On-farm visits for cattle, goats and other livestock — herd health, vaccination, and disease control across Kampala and beyond.",
                img: IMG.vetExam,
              },
              {
                icon: "💉",
                title: "Vaccination & AI Services",
                desc: "Routine vaccinations, deworming programmes, and artificial insemination services for dairy and beef farmers.",
                img: IMG.surgeryRoom,
              },
              {
                icon: "🐕",
                title: "Small Animal Care",
                desc: "Wellness exams, treatment, and preventive care for dogs, cats and other household pets.",
                img: IMG.clinic,
              },
            ].map((s) => (
              <div key={s.title} className="glass rounded-3xl overflow-hidden card-hover cursor-pointer border border-[#10b981]/40 shadow-[0_0_22px_rgba(16,185,129,0.22)]" onClick={() => setPage("services")}>
                <div className="relative h-52 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover img-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03070f]/80 to-transparent" />
                </div>
                <div className="p-7 relative">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#10b981] text-xs font-bold tracking-wide uppercase">
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 relative" style={{ background: "linear-gradient(180deg, transparent, rgba(16,185,129,0.03), transparent)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">Client Stories</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Trusted by <span className="italic gold-text">Thousands</span>
            </h2>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={`glass-dark rounded-3xl p-7 testimonial-card transition-all duration-700 border ${
                    testimonialsSlide === i ? "border-[#10b981]/60 shadow-[0_0_40px_rgba(16,185,129,0.18)]" : "border-[#10b981]/20 shadow-[0_0_12px_rgba(16,185,129,0.08)]"
                  }`}
                >
                  <div className="flex gap-0.5 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="14" height="14" viewBox="0 0 12 12" fill="#10b981"><path d="M6 0l1.5 3.5L11 4.5l-2.5 2.4.6 3.5L6 8.7 2.9 10.4l.6-3.5L1 4.5l3.5-1z"/></svg>
                    ))}
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#10b981]/30">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{t.name}</div>
                      <div className="text-[#10b981]/70 text-xs">{t.pet}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialsSlide(i)}
                  className={`rounded-full transition-all duration-400 ${
                    testimonialsSlide === i ? "w-8 h-2 bg-[#10b981]" : "w-2 h-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-gold rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="orb w-72 h-72 -top-16 -right-16 bg-[#10b981]/8" />
          <div className="orb w-48 h-48 -bottom-10 -left-10 bg-[#10b981]/5" />
          <div className="relative z-10">
            <div className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Your Animals' Health is Our <span className="italic gold-text">Priority</span>
            </div>
            <p className="text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
              Don't wait until it's urgent. Book a farm visit or wellness check today and give your animals the proactive care they deserve.
            </p>
            <button
              onClick={() => setPage("contact")}
              className="btn-gold px-10 py-4 rounded-full text-sm"
            >
              Schedule Appointment →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6 page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Hero row */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
          {/* Image col */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "3/4", background: "#0e1a2e" }}>
              <img src={IMG.doctorHero} alt="Dr. Okello Joseph" className="w-full h-full object-cover img-zoom" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03070f]/70 via-transparent to-transparent" />
            </div>

            {/* Credentials badge */}
            <div className="absolute -bottom-8 -right-6 glass-dark rounded-2xl p-6 w-52 animate-float">
              <div className="text-[#10b981] text-xs font-bold tracking-widest uppercase mb-3">Certifications</div>
              {["BVM — Makerere University", "Licensed, UVB", "UVA Member", "Continuing Vet Education"].map(c => (
                <div key={c} className="flex items-center gap-2 text-white/70 text-xs py-1">
                  <span className="w-1 h-1 rounded-full bg-[#10b981]" />{c}
                </div>
              ))}
            </div>

            {/* Decorative ring */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-[#10b981]/20 animate-spin-slow" style={{ animationDuration: "20s" }} />
          </div>

          {/* Text col */}
          <div>
            <div className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">The Doctor</div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Dr. <span className="italic gold-text">Okello Joseph</span>
            </h1>
            <div className="gold-line w-20 mb-8" />
            <div className="space-y-5 text-white/55 leading-relaxed">
              <p>
                Dr. Okello Joseph is a Ugandan veterinarian trained at Makerere University, where he earned his Bachelor of Veterinary Medicine (BVM). His interest in animal health started at home, growing up around livestock, and it grew into a full calling for treating and protecting animals across Kampala and the surrounding districts.
              </p>
              <p>
                His approach to medicine is rooted in a simple belief: every animal — whether it's a family dog or a farmer's whole herd — deserves the same standard of care. He combines hands-on diagnostics with the kind of warmth and attentiveness that makes both farmers and pet owners feel genuinely heard.
              </p>
              <p>
                Since starting practice, Dr. Okello Joseph has worked with dairy and goat farmers, attended livestock vaccination drives, and continued building a reputation not just for his clinical skill, but for showing up when animals need him most — on the farm or in the clinic.
              </p>
            </div>

            <button
              onClick={() => setPage("contact")}
              className="btn-gold mt-10 px-8 py-4 rounded-full text-sm inline-block"
            >
              Book a Consultation
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <div className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">Career Journey</div>
            <h2 className="font-display text-4xl font-bold text-white">A Path of <span className="italic gold-text">Excellence</span></h2>
            <div className="gold-line w-16 mx-auto mt-5" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#10b981]/50 via-[#10b981]/20 to-transparent" />

            {[
              { year: "2021", title: "Joined Makerere University", desc: "Began studies towards a Bachelor of Veterinary Medicine (BVM) at Makerere University." },
              { year: "2022", title: "Early Clinical Exposure", desc: "Started hands-on animal handling and basic clinical skills during early university years." },
              { year: "2023", title: "Internships & Farm Attachments", desc: "Undertook veterinary attachments on livestock farms and small animal clinics around Uganda, building real-world experience." },
              { year: "2024", title: "Advanced Rotations", desc: "Completed advanced clinical rotations in livestock health, reproduction, and small animal medicine across Kampala and nearby districts." },
              { year: "2025", title: "Final Year — Transcript Completed", desc: "Finished all coursework and examinations. Transcript in hand, awaiting the 2027 graduation ceremony at Makerere University." },
              { year: "2026", title: "In Full Practice", desc: "Actively serving farmers and pet owners across Kampala and surrounding districts while awaiting the 2027 graduation ceremony." },
              { year: "2027", title: "Graduation — BVM, Makerere University", desc: "Graduating with a Bachelor of Veterinary Medicine from Makerere University, Uganda's leading veterinary school." },
            ].map((ev, i) => (
              <div
                key={ev.year}
                className={`relative flex gap-8 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
              >
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-8" : "pl-8"}`}>
                  {i % 2 === 0 && (
                    <div className="glass-dark rounded-2xl p-5 inline-block text-left card-hover border border-white/5">
                      <div className="text-[#10b981] text-xs font-bold mb-1 tracking-widest">{ev.year}</div>
                      <div className="font-display text-lg font-semibold text-white">{ev.title}</div>
                      <p className="text-white/45 text-sm mt-1">{ev.desc}</p>
                    </div>
                  )}
                </div>

                {/* Dot on line */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="timeline-dot mt-5" />
                </div>

                <div className={`flex-1 ${i % 2 === 0 ? "pl-8 md:hidden" : "pl-8 md:pl-8"}`}>
                  <div className="glass-dark rounded-2xl p-5 inline-block card-hover border border-white/5">
                    <div className="text-[#10b981] text-xs font-bold mb-1 tracking-widest">{ev.year}</div>
                    <div className="font-display text-lg font-semibold text-white">{ev.title}</div>
                    <p className="text-white/45 text-sm mt-1">{ev.desc}</p>
                  </div>
                </div>

                {i % 2 !== 0 && (
                  <div className="hidden md:block flex-1 pr-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="glass-gold rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="orb w-96 h-96 -top-20 -left-20 bg-[#10b981]/6" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-6xl mb-6 opacity-30 font-display">"</div>
            <p className="font-display text-2xl md:text-3xl font-light italic text-white leading-relaxed mb-8">
              Medicine is a science, but healing is an art. My job isn't just to diagnose — it's to listen, to understand, and to care for the whole farm or family, not just the patient.
            </p>
            <div className="text-[#10b981] font-semibold tracking-wide text-sm">— Dr. Okello Joseph, BVM</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────────────
function ServicesPage({ setPage }: { setPage: (p: Page) => void }) {
  const [active, setActive] = useState<number | null>(null);

  const services = [
    {
      icon: "🩺",
      title: "Wellness Exams",
      tagline: "Check-ups for pets & livestock",
      desc: "Comprehensive physical examinations tailored to your animal's age, breed, and lifestyle — for household pets and farm animals alike.",
      img: IMG.vetExam,
      details: ["Full body assessment", "Vaccination review", "Parasite screening", "Nutritional advice", "General health check"],
    },
    {
      icon: "💉",
      title: "Vaccination & Deworming",
      tagline: "Protecting the whole herd",
      desc: "Routine vaccination and deworming programmes for cattle, goats, dogs and cats, including group scheduling for farms and cooperatives.",
      img: IMG.instruments,
      details: ["Cattle & goat vaccination", "Dog & cat vaccination", "Deworming programmes", "Vaccination record cards", "Farm-wide scheduling"],
    },
    {
      icon: "🐄",
      title: "Farm Calls & Herd Health",
      tagline: "We come to your farm",
      desc: "On-site visits across Kampala and nearby districts for herd health checks, calving assistance, and general livestock management.",
      img: IMG.surgeryRoom,
      details: ["On-farm visits", "Herd health monitoring", "Calving assistance", "Artificial insemination", "Disease outbreak response"],
    },
    {
      icon: "🐕",
      title: "Small Animal Care",
      tagline: "For dogs, cats & home pets",
      desc: "Diagnosis and treatment for common illnesses and injuries in household pets, with guidance on everyday care at home.",
      img: IMG.clinic,
      details: ["Illness diagnosis", "Wound treatment", "Minor procedures", "Deworming & vaccination", "Home care guidance"],
    },
    {
      icon: "🚑",
      title: "Emergency Care",
      tagline: "Here when you need us most",
      desc: "When every minute matters, Dr. Okello Joseph responds quickly to emergencies for both pets and livestock, in the clinic or out on the farm.",
      img: IMG.vetExam,
      details: ["Urgent farm visits", "Injury & trauma care", "Difficult calving/kidding", "Poisoning management", "Referral where needed"],
    },
    {
      icon: "🌿",
      title: "Breeding & Reproduction",
      tagline: "Supporting productive herds",
      desc: "Reproductive health services for farmers, including artificial insemination and fertility advice to keep herds healthy and productive.",
      img: IMG.catPerson,
      details: ["Artificial insemination", "Fertility checks", "Pregnancy diagnosis", "Breeding advice", "Record keeping support"],
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 page-enter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="orb w-80 h-80 top-[-60px] left-1/2 -translate-x-1/2 bg-[#10b981]/5" />
          <div className="relative z-10">
            <div className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">What I Offer</div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
              My <span className="italic gold-text">Services</span>
            </h1>
            <p className="text-white/45 max-w-xl mx-auto leading-relaxed">
              Every procedure, every consultation, every follow-up — performed with the same level of precision and care we'd give our own animals.
            </p>
            <div className="gold-line w-20 mx-auto mt-8" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`glass rounded-3xl overflow-hidden card-hover cursor-pointer border transition-all duration-500 ${
                active === i ? "border-[#10b981]/50 shadow-[0_0_60px_rgba(16,185,129,0.12)]" : "border-white/5"
              }`}
              onClick={() => setActive(active === i ? null : i)}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover img-zoom" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03070f]/90 to-[#03070f]/20" />
                <div className="absolute bottom-4 left-4 text-3xl">{s.icon}</div>
                <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-[10px] text-[#10b981] font-bold tracking-widest uppercase">
                  {s.tagline}
                </div>
              </div>

              <div className="p-7">
                <h3 className="font-display text-xl font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">{s.desc}</p>

                {/* Expandable details */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: active === i ? "200px" : "0" }}
                >
                  <div className="pt-4 border-t border-white/8 mt-2">
                    <div className="text-[#10b981] text-xs font-bold tracking-widest uppercase mb-3">Included</div>
                    <ul className="space-y-1.5">
                      {s.details.map(d => (
                        <li key={d} className="flex items-center gap-2 text-white/55 text-sm">
                          <span className="w-1 h-1 rounded-full bg-[#10b981] flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-[#10b981] text-xs font-bold tracking-wide uppercase">
                    {active === i ? "Close" : "Details"}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full border border-[#10b981]/40 flex items-center justify-center transition-transform duration-300"
                    style={{ transform: active === i ? "rotate(45deg)" : "none" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1v8M1 5h8" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-white/40 mb-6 text-sm">Not sure which service is right for your animal?</p>
          <button
            onClick={() => setPage("contact")}
            className="btn-gold px-10 py-4 rounded-full text-sm"
          >
            Talk to Dr. Okello Joseph
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY PAGE ──────────────────────────────────────────────────────────
const galleryImages = [
  { src: IMG.dog1, label: "Rectal Examination", caption: "Reproductive health assessment in cattle" },
  { src: IMG.dog2, label: "Goat Check-up", caption: "Stethoscope exam on a young goat" },
  { src: IMG.dog3, label: "Auscultation Exam", caption: "Stethoscope assessment on a goat" },
  { src: IMG.dogCat, label: "Herd Health Check", caption: "Two-vet cattle examination, Kampala" },
  { src: IMG.cat, label: "Goat Herd", caption: "Farm visit, herd of goats" },
  { src: IMG.vetExam, label: "In the Field", caption: "Every detail matters" },
  { src: IMG.catPerson, label: "Kraal Visit", caption: "On-site farm consultation" },
  { src: IMG.instruments, label: "Cattle Care", caption: "Routine cattle treatment" },
];

function GalleryPage() {
  const [featured, setFeatured] = useAutoSlide(galleryImages.length, 3500);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((l) => ((l ?? 0) + 1) % galleryImages.length);
      if (e.key === "ArrowLeft") setLightbox((l) => ((l ?? 0) - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 page-enter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">My Patients</div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white">
            Stories in <span className="italic gold-text">Pictures</span>
          </h1>
          <div className="gold-line w-20 mx-auto mt-6" />
        </div>

        {/* Featured slideshow */}
        <div className="relative rounded-3xl overflow-hidden mb-8" style={{ height: "460px", background: "#0e1a2e" }}>
          {galleryImages.map((img, i) => (
            <div key={i} className={`slideshow-item ${i === featured ? "active" : ""}`}>
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03070f]/80 via-transparent to-transparent" />
            </div>
          ))}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
              <div className="font-display text-3xl font-semibold text-white">{galleryImages[featured].label}</div>
              <div className="text-[#10b981] text-sm mt-1">{galleryImages[featured].caption}</div>
            </div>
            <div className="flex gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeatured(i)}
                  className={`rounded-full transition-all duration-400 ${
                    i === featured ? "w-8 h-2 bg-[#10b981]" : "w-2 h-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`gallery-item relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-400 ${
                i === featured ? "border-[#10b981]/60" : "border-transparent"
              }`}
              style={{ aspectRatio: "1" }}
              onClick={() => setLightbox(i)}
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
              <div className="overlay absolute inset-0 bg-[#10b981]/20 flex items-center justify-center">
                <div className="glass rounded-xl px-3 py-2 text-center">
                  <div className="text-white text-xs font-semibold">{img.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/25 text-xs mt-8 tracking-widest uppercase">Click any photo to enlarge · Arrow keys to navigate</p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(3,7,15,0.95)", backdropFilter: "blur(20px)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].label}
              className="w-full rounded-3xl object-contain max-h-[75vh]"
            />
            <div className="text-center mt-4">
              <div className="font-display text-2xl text-white">{galleryImages[lightbox].label}</div>
              <div className="text-[#10b981] text-sm mt-1">{galleryImages[lightbox].caption}</div>
            </div>

            {/* Nav arrows */}
            {[
              { dir: -1, label: "←", side: "left-4" },
              { dir: 1, label: "→", side: "right-4" },
            ].map(({ dir, label, side }) => (
              <button
                key={dir}
                className={`absolute ${side} top-1/2 -translate-y-1/2 glass-gold rounded-full w-12 h-12 flex items-center justify-center text-[#10b981] text-xl`}
                onClick={() => setLightbox((l) => ((l ?? 0) + dir + galleryImages.length) % galleryImages.length)}
              >
                {label}
              </button>
            ))}

            <button
              className="absolute top-4 right-4 glass rounded-full w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "256704220704";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", pet: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hello Dr. Okello Joseph, I'd like to book an appointment.`,
      ``,
      `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.pet && `Animal: ${form.pet}`,
      form.service && `Service: ${form.service}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setSent(true);
  };

  const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>;
  const WaIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
  const EmailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const IgIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
  const TtIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>;
  const ClockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

  const IconBox = ({ children }: { children: React.ReactNode }) => (
    <div className="w-9 h-9 rounded-xl bg-[#10b981]/15 flex items-center justify-center flex-shrink-0 text-[#10b981]">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 page-enter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#10b981] text-xs font-bold tracking-[0.3em] uppercase mb-4">Reach Out</div>
          <h1 className="font-display text-5xl md:text-7xl font-bold">
            <span className="text-white font-bold">Book an </span><span className="italic gold-text">Appointment</span>
          </h1>
          <div className="gold-line w-20 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Info col */}
          <div className="md:col-span-2 space-y-6">
            {/* Doctor card */}
            <div className="glass-dark rounded-3xl overflow-hidden border border-[#10b981]/15">
              <div className="relative h-56 overflow-hidden">
                <img src={IMG.doctorHero2} alt="Dr. Okello Joseph" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03070f]/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="font-display text-xl font-semibold text-white">Dr. Okello Joseph</div>
                  <div className="text-[#10b981] text-xs tracking-widest uppercase mt-0.5">BVM · Makerere University</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-3 items-start">
                  <IconBox><PhoneIcon /></IconBox>
                  <div>
                                        <a href="tel:+256775560027" className="text-white/70 text-sm hover:text-[#10b981] transition-colors block">+256 775 560027</a>
                    <a href="tel:+256775560027" className="inline-flex items-center gap-1 mt-1.5 text-[#10b981] text-xs font-bold border border-[#10b981]/40 rounded-full px-3 py-1 hover:bg-[#10b981]/10 transition-colors">Call Now →</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <IconBox><WaIcon /></IconBox>
                  <div>
                                        <div className="text-white/70 text-sm">+256 704 220704</div>
                    <a href="https://wa.me/256704220704" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-1.5 text-[#10b981] text-xs font-bold border border-[#10b981]/40 rounded-full px-3 py-1 hover:bg-[#10b981]/10 transition-colors">Message Now →</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <IconBox><EmailIcon /></IconBox>
                  <div>
                                        <a href="mailto:okellojoseph1410@gmail.com" className="text-white/70 text-sm hover:text-[#10b981] transition-colors break-all">okellojoseph1410@gmail.com</a>
                    <a href="mailto:okellojoseph1410@gmail.com" className="inline-flex items-center gap-1 mt-1.5 text-[#10b981] text-xs font-bold border border-[#10b981]/40 rounded-full px-3 py-1 hover:bg-[#10b981]/10 transition-colors">Email Me →</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <IconBox><IgIcon /></IconBox>
                  <div>
                                        <a href="https://instagram.com/oj.doc" target="_blank" rel="noreferrer" className="text-white/70 text-sm hover:text-[#10b981] transition-colors">@oj.doc</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <IconBox><TtIcon /></IconBox>
                  <div>
                                        <a href="https://tiktok.com/@oj.doc.jo" target="_blank" rel="noreferrer" className="text-white/70 text-sm hover:text-[#10b981] transition-colors">@oj.doc.jo</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <IconBox><ClockIcon /></IconBox>
                  <div>
                                        <div className="text-white/70 text-sm">Mon–Sat 8am–7pm<br/>Farm calls by appointment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="glass rounded-2xl p-6 border border-[#10b981]/20">
              <div className="flex items-center gap-2 mb-3">
                {[1,2,3,4,5].map(s => <svg key={s} width="14" height="14" viewBox="0 0 12 12" fill="#10b981"><path d="M6 0l1.5 3.5L11 4.5l-2.5 2.4.6 3.5L6 8.7 2.9 10.4l.6-3.5L1 4.5l3.5-1z"/></svg>)}
                <span className="text-white/50 text-xs ml-1">5.0 · 120 reviews</span>
              </div>
              <p className="text-white/70 text-sm italic leading-relaxed">"Getting an appointment was easy and Dr. Okello Joseph remembered every detail from our last farm visit. Absolutely reliable."</p>
              <div className="text-white/55 text-xs mt-3">— Nabirye Sarah (Goat farmer)</div>
            </div>
          </div>

          {/* Form col */}
          <div className="md:col-span-3 glass-dark rounded-3xl p-8 md:p-10 border border-[#10b981]/10">
            {sent ? (
              <div className="text-center py-16 animate-scale-in">
                <div className="text-6xl mb-4 animate-float">🐾</div>
                <h3 className="font-display text-3xl font-bold text-[#0f3d2e] mb-3">Opened in WhatsApp!</h3>
                <p className="text-[#1a3a2e]/70 leading-relaxed max-w-sm mx-auto">
                  Finish sending the message in WhatsApp and Dr. Okello Joseph will reply as soon as possible.
                </p>
                <div className="gold-line w-16 mx-auto mt-6" />
                <button className="btn-outline-gold mt-8 px-8 py-3 rounded-full text-sm" onClick={() => setSent(false)}>
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-2xl font-semibold text-white mb-6">Request an Appointment</h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[#10b981] text-xs font-bold tracking-widest uppercase block mb-2">Your Name</label>
                    <input className="form-input w-full rounded-xl px-4 py-3 text-sm" placeholder="Wamala Abdul" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-[#10b981] text-xs font-bold tracking-widest uppercase block mb-2">Email</label>
                    <input type="email" className="form-input w-full rounded-xl px-4 py-3 text-sm" placeholder="wamala@gmail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[#10b981] text-xs font-bold tracking-widest uppercase block mb-2">Animal's Name & Type</label>
                    <input className="form-input w-full rounded-xl px-4 py-3 text-sm" placeholder="Cow. Dairy cow" value={form.pet} onChange={e => setForm({ ...form, pet: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[#10b981] text-xs font-bold tracking-widest uppercase block mb-2">Service Needed</label>
                    <select className="form-input w-full rounded-xl px-4 py-3 text-sm" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="" style={{ background: "#c8f5e9" }}>Select a service</option>
                      {["Wellness Exam", "Farm Visit", "Vaccination", "Emergency", "Breeding/AI", "Other"].map(s => (
                        <option key={s} value={s} style={{ background: "#c8f5e9" }}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[#10b981] text-xs font-bold tracking-widest uppercase block mb-2">Message</label>
                  <textarea className="form-input w-full rounded-xl px-4 py-3 text-sm resize-none" rows={5} placeholder="Briefly describe your animal's condition, location, or any questions you have..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>

                <button type="submit" className="btn-gold w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2">
                  Send via WhatsApp →
                </button>

                <p className="text-white/60 text-xs text-center">
                  Opens WhatsApp with your details pre-filled · Your information is kept private
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="border-t border-[#10b981]/10 py-14 px-6" style={{ background: "rgba(3,7,15,0.95)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="font-display text-2xl font-bold text-white mb-3">Dr. Okello Joseph</div>
            <div className="text-[#10b981] text-xs tracking-widest uppercase mb-4">Veterinarian · Est. 2026</div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Precision medicine, genuine compassion. Serving Kampala City and surrounding districts.
            </p>
          </div>
          <div>
            <div className="text-[#10b981] text-xs font-bold tracking-widest uppercase mb-4">Navigate</div>
            <ul className="space-y-2.5">
              {(["home", "about", "services", "gallery", "contact"] as Page[]).map(p => (
                <li key={p}>
                  <button
                    onClick={() => { setPage(p); window.scrollTo(0,0); }}
                    className="text-white/45 text-sm capitalize hover:text-[#10b981] transition-colors"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[#10b981] text-xs font-bold tracking-widest uppercase mb-4">Contact</div>
            <div className="space-y-3">
              <a href="tel:+256775560027" className="flex items-center gap-2 text-white/45 hover:text-[#10b981] transition-colors text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg> +256 775 560027
              </a>
              <a href="https://wa.me/256704220704" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/45 hover:text-[#10b981] transition-colors text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> +256 704 220704
              </a>
              <a href="mailto:okellojoseph1410@gmail.com" className="flex items-center gap-2 text-white/45 hover:text-[#10b981] transition-colors text-sm break-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> okellojoseph1410@gmail.com
              </a>
              <a href="https://instagram.com/oj.doc" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/45 hover:text-[#10b981] transition-colors text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> @oj.doc
              </a>
              <a href="https://tiktok.com/@oj.doc.jo" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/45 hover:text-[#10b981] transition-colors text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg> @oj.doc.jo
              </a>
            </div>
          </div>
        </div>

        <div className="gold-line w-full mb-6 opacity-40" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-white/25 text-xs">
          <span>© 2026 Dr. Okello Joseph Veterinarian. All rights reserved.</span>
          <span className="tracking-widest uppercase">Crafted with care for every patient</span>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────
 export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigateTo = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState({ page: p }, "", `#${p}`);
  }, []);

  useEffect(() => {
    // Set the very first history entry so the initial page is also "back-able"
    window.history.replaceState({ page: "home" }, "", "#home");

    const handlePopState = (e: PopStateEvent) => {
      const targetPage = (e.state?.page as Page) || "home";
      setPage(targetPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <Nav page={page} setPage={navigateTo} />

      <main>
        {page === "home"     && <HomePage setPage={navigateTo} />}
        {page === "about"    && <AboutPage setPage={navigateTo} />}
        {page === "services" && <ServicesPage setPage={navigateTo} />}
        {page === "gallery"  && <GalleryPage />}
        {page === "contact"  && <ContactPage />}
      </main>

      <Footer setPage={navigateTo} />
    </div>
  );
}

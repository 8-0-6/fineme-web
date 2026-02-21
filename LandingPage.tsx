import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Color tokens (matches app) ──────────────────────────────────────────────
const C = {
  bg: '#000000',
  surface: '#09090b',
  surfaceSecondary: '#18181b',
  border: '#27272a',
  borderSecondary: '#3f3f46',
  text: '#ffffff',
  textSecondary: '#a1a1aa',
  textTertiary: '#71717a',
  accent: '#bef264',
  accentDim: '#84cc16',
  error: '#ef4444',
};

// ─── Lucide-style SVG icons (inline, no emoji) ───────────────────────────────
const Icon = {
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.error} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
};

// ─── Fade-up animation helper ─────────────────────────────────────────────────
const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = '',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─── How It Works steps ───────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    title: 'Stake your money',
    body: 'Deposit $10 to $125 daily. Held in escrow, yours to keep if you show up.',
  },
  {
    number: '02',
    title: 'Do your reps',
    body: 'Our AI Judge watches via camera and counts every rep. No shortcuts. No cheating.',
  },
  {
    number: '03',
    title: 'Midnight deadline',
    body: 'Miss your goal? Your stake is donated to your chosen charity. Zero exceptions.',
  },
  {
    number: '04',
    title: 'Streak, save, grow',
    body: 'Hit your goal and your money stays. Watch your streak and your savings climb.',
  },
];

// ─── Waitlist form ────────────────────────────────────────────────────────────
const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 900));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <div className="flex justify-center mb-2"><Icon.CheckCircle /></div>
        <div className="font-semibold" style={{ color: C.accent }}>You're on the list.</div>
        <div className="text-sm mt-1" style={{ color: C.textSecondary }}>We'll email you when FineMe launches.</div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{
          background: C.surfaceSecondary,
          border: `1px solid ${C.border}`,
          color: C.text,
          caretColor: C.accent,
        }}
        onFocus={e => (e.target.style.borderColor = C.accent)}
        onBlur={e => (e.target.style.borderColor = C.border)}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-opacity"
        style={{ background: C.accent, color: '#000', opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
      </button>
    </form>
  );
};

// ─── Logo component ───────────────────────────────────────────────────────────
const Logo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-6 h-6 rounded-full border-2 flex-shrink-0" style={{ borderColor: C.accent }} />
    <span style={{ fontSize: 18, letterSpacing: -1, lineHeight: 1 }}>
      <span style={{ fontWeight: 900, color: C.text }}>Fine</span>
      <span style={{ fontWeight: 300, color: C.text, marginLeft: '0.12em' }}>Me</span>
    </span>
  </div>
);

// ─── Main Landing Page ────────────────────────────────────────────────────────
export const LandingPage: React.FC = () => {

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }} className="min-h-screen">

      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-12 py-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}` }}
      >
        <Logo />
        <a
          href="#waitlist"
          className="px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all"
          style={{ background: C.accent, color: '#000' }}
        >
          Join Waitlist
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 text-center pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest"
            style={{ background: C.surfaceSecondary, color: C.accent, border: `1px solid ${C.border}` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
            COMING SOON
          </div>

          <h1
            className="font-black leading-tight mb-6"
            style={{
              fontSize: 'clamp(2rem, 8vw, 3.75rem)',
              letterSpacing: '0.02em',
            }}
          >
            YOUR <span style={{ color: C.accent }}>LAZINESS</span><br />
            JUST BECAME<br />
            A TAX WRITE-OFF.
          </h1>

          <div id="waitlist-hero" className="mt-10 px-2 sm:px-0">
            <WaitlistForm />
          </div>

          <p className="text-xs mt-4" style={{ color: C.textTertiary }}>
            No spam. Launch notification only.
          </p>
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)` }} />

      {/* ── The Problem ── */}
      <section className="py-20 md:py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="text-xs font-semibold tracking-widest mb-4" style={{ color: C.accent }}>THE PROBLEM</div>
            <h2
              className="font-black tracking-tight mb-12"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)' }}
            >
              Motivation lies.<br />
              <span style={{ color: C.textSecondary }}>Consequences don't.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FadeUp delay={0.1}>
              <div className="rounded-2xl p-5 sm:p-6 text-left h-full" style={{ background: C.surfaceSecondary, border: `1px solid ${C.border}` }}>
                <div className="text-xs font-semibold tracking-widest mb-4" style={{ color: C.textTertiary }}>OTHER APPS</div>
                {['Motivational notifications', 'Streak badges', 'Virtual trophies', 'No real stakes'].map(t => (
                  <div key={t} className="flex items-center gap-3 py-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <Icon.X />
                    <span className="text-sm" style={{ color: C.textSecondary }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="rounded-2xl p-5 sm:p-6 text-left h-full" style={{ background: C.surfaceSecondary, border: `1px solid ${C.accent}` }}>
                <div className="text-xs font-semibold tracking-widest mb-4" style={{ color: C.accent }}>FINEME</div>
                {['Real money on the line', 'AI rep verification', 'Charity donation on miss', 'Behavioral science-backed'].map(t => (
                  <div key={t} className="flex items-center gap-3 py-2.5" style={{ borderBottom: `1px solid ${C.border}` }}>
                    <Icon.Check />
                    <span className="text-sm" style={{ color: C.text }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)` }} />

      {/* ── How It Works ── */}
      <section className="py-20 md:py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-12 md:mb-16">
            <div className="text-xs font-semibold tracking-widest mb-4" style={{ color: C.accent }}>HOW IT WORKS</div>
            <h2
              className="font-black tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)' }}
            >
              Simple. Brutal. Effective.
            </h2>
          </FadeUp>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <FadeUp key={s.number} delay={i * 0.08}>
                <div className="flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl"
                  style={{ background: C.surfaceSecondary, border: `1px solid ${C.border}` }}>
                  <div className="text-2xl font-black flex-shrink-0 w-9 sm:w-10 leading-none" style={{ color: C.accent }}>{s.number}</div>
                  <div>
                    <div className="font-bold text-base mb-1">{s.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>{s.body}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)` }} />

      {/* ── Science ── */}
      <section className="py-20 md:py-28 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <FadeUp>
            {/* Label */}
            <div className="text-xs font-semibold tracking-widest mb-10" style={{ color: C.accent }}>SCIENCE BASED.</div>

            {/* Giant quote marks + quote */}
            <div className="relative mb-10">
              {/* Decorative quotation marks */}
              <div
                className="absolute -top-4 -left-2 select-none"
                style={{
                  fontSize: 'clamp(5rem, 16vw, 9rem)',
                  lineHeight: 1,
                  fontWeight: 900,
                  color: C.surfaceSecondary,
                  fontFamily: 'Georgia, serif',
                }}
                aria-hidden="true"
              >
                "
              </div>

              {/* Quote text */}
              <p
                className="relative font-bold leading-tight"
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
                  color: C.text,
                  paddingTop: 'clamp(2.5rem, 6vw, 4rem)',
                }}
              >
                Losses loom larger than gains... The pain of losing is psychologically about{' '}
                <span style={{ color: C.accent }}>twice as powerful</span> as the pleasure of gaining.
              </p>
            </div>

            {/* Attribution block — left-border style */}
            <div
              className="pl-5 mb-10"
              style={{ borderLeft: `3px solid ${C.accent}` }}
            >
              <div className="font-bold text-base" style={{ color: C.text }}>Prospect Theory</div>
              <div className="text-sm mt-0.5" style={{ color: C.textSecondary }}>Kahneman &amp; Tversky (1979)</div>
              <div
                className="text-xs font-semibold tracking-widest mt-1"
                style={{ color: C.textTertiary, fontFamily: 'monospace' }}
              >
                NOBEL PRIZE IN ECONOMICS
              </div>
            </div>

            {/* Fact chip */}
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{ background: C.surfaceSecondary, border: `1px solid ${C.border}` }}
            >
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: C.textSecondary }}>
                <span className="font-bold" style={{ color: C.text }}>FACT: </span>
                People are{' '}
                <span className="font-bold" style={{ color: C.accent }}>2.5x more likely</span>
                {' '}to stick to a habit when money is at risk compared to reward-based systems.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)` }} />

      {/* ── Final CTA ── */}
      <section id="waitlist" className="py-24 md:py-32 px-5 sm:px-8">
        <div className="max-w-xl mx-auto text-center">
          <FadeUp>
            <div className="text-xs font-semibold tracking-widest mb-4" style={{ color: C.accent }}>EARLY ACCESS</div>
            <h2
              className="font-black tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)' }}
            >
              Ready to start<br />showing up?
            </h2>
            <p className="text-base sm:text-lg mb-10" style={{ color: C.textSecondary }}>
              Join the waitlist. Be first to know when FineMe drops.
            </p>
            <WaitlistForm />
            <p className="text-xs mt-4" style={{ color: C.textTertiary }}>
              No spam. One email when we launch.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.border}, transparent)` }} />

      {/* ── Footer ── */}
      <footer className="px-5 sm:px-8 md:px-12 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs" style={{ color: C.textTertiary }}>
            2026 FineMe Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a
              href="#/privacy"
              className="text-xs transition-colors hover:text-white"
              style={{ color: C.textTertiary }}
            >
              Privacy Policy
            </a>
            <a
              href="#/terms"
              className="text-xs transition-colors hover:text-white"
              style={{ color: C.textTertiary }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

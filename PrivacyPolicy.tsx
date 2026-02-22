import React from 'react';

const C = {
  bg: '#000000',
  surface: '#09090b',
  surfaceSecondary: '#18181b',
  border: '#27272a',
  text: '#ffffff',
  textSecondary: '#a1a1aa',
  textTertiary: '#71717a',
  accent: '#bef264',
};

const EFFECTIVE_DATE = 'June 1, 2026';
const COMPANY = 'FineMe Inc.';
const EMAIL = 'support@fineme.io';

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ number, title, children }) => (
  <section style={{ borderBottom: `1px solid ${C.border}` }} className="py-8 sm:py-10">
    <div className="flex gap-4 sm:gap-5 mb-4">
      <span className="text-sm font-black flex-shrink-0 w-7 sm:w-8 pt-0.5" style={{ color: C.accent }}>{number}</span>
      <h2 className="text-lg sm:text-xl font-bold tracking-tight">{title}</h2>
    </div>
    <div style={{ paddingLeft: 'clamp(1.75rem, 5vw, 3.25rem)' }}>
      {children}
    </div>
  </section>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm leading-7 mb-4" style={{ color: C.textSecondary }}>{children}</p>
);

const UL: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="mb-4 space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-sm leading-6" style={{ color: C.textSecondary }}>
        <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: C.accent }} />
        {item}
      </li>
    ))}
  </ul>
);

// ─── Logo ────────────────────────────────────────────────────────────────────
const Logo: React.FC = () => (
  <div className="flex items-center gap-1.5">
    <div className="w-6 h-6 rounded-full border-2 flex-shrink-0" style={{ borderColor: C.accent }} />
    <span style={{ fontSize: 18, letterSpacing: -1, lineHeight: 1 }}>
      <span style={{ fontWeight: 900, color: C.text }}>Fine</span>
      <span style={{ fontWeight: 300, color: C.text, marginLeft: '0.12em' }}>Me</span>
    </span>
  </div>
);

export const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }} className="min-h-screen">

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center px-5 sm:px-8 md:px-12 py-4"
        style={{ background: 'rgba(0,0,0,0.90)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}` }}
      >
        <button
          onClick={() => window.location.hash = ''}
          className="flex items-center gap-1.5"
        >
          <Logo />
        </button>
      </nav>

      {/* Header */}
      <div className="pt-28 sm:pt-32 pb-10 sm:pb-12 px-5 sm:px-8 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-semibold tracking-widest mb-3" style={{ color: C.accent }}>LEGAL</div>
          <h1
            className="font-black tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 7vw, 3rem)' }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: C.textTertiary }}>
            Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; {COMPANY}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="px-5 sm:px-8 md:px-12 pt-8 sm:pt-10 pb-0">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-5 sm:p-6 mb-2" style={{ background: C.surfaceSecondary, border: `1px solid ${C.border}` }}>
            <P>
              This Privacy Policy describes how {COMPANY} ("FineMe," "we," "us," or "our") collects, uses, stores, shares, and protects information about you when you use the FineMe mobile application and related services (collectively, the "Service"). By using the Service, you agree to the practices described in this Policy. If you do not agree, do not use the Service.
            </P>
            <P>
              FineMe is a behavioral accountability fitness application that uses financial commitment devices and on-device artificial intelligence to help users achieve daily exercise goals. Because we handle both personal data and financial information, we take privacy seriously and are committed to transparency.
            </P>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 sm:px-8 md:px-12 pb-20 sm:pb-24">
        <div className="max-w-3xl mx-auto">

          <Section number="1" title="Information We Collect">
            <P>We collect the following categories of information:</P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>A. INFORMATION YOU PROVIDE DIRECTLY</p>
            <UL items={[
              'Account registration data: name, email address, and password (or OAuth token if you use Sign in with Apple or Google).',
              'Fitness protocol configuration: daily rep target, commitment period, selected beneficiary charity, and stake amount.',
              'Payment information: billing details collected and processed exclusively through Stripe, Inc. We do not store full card numbers or CVV codes on our servers.',
              'Referral source: how you heard about FineMe (optional).',
              'Feedback and support messages submitted through the in-app feedback form.',
              'Waive reason: the reason you select when exercising a weekly waive pass.',
            ]} />
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>B. INFORMATION WE COLLECT AUTOMATICALLY</p>
            <UL items={[
              'Workout session data: number of repetitions completed, session start and end times, and session duration.',
              'Daily log data: daily status (Secured, Failed, or Pending), reps completed, and stake amount at risk.',
              'Streak data: current and best consecutive-day streaks.',
              'App usage data: which features you interact with, crash reports, and diagnostic logs.',
              'Device identifiers: push notification tokens for delivery of workout reminders.',
            ]} />
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>C. CAMERA AND MOTION DATA</p>
            <P>
              The Service uses your device camera for real-time AI-powered rep counting via on-device pose estimation (TensorFlow.js, MoveNet model). <strong style={{ color: C.text }}>Camera video frames are processed entirely on your device and are never transmitted to our servers, recorded, or stored.</strong> We receive only the resulting rep count and session completion status.
            </P>
          </Section>

          <Section number="2" title="How We Use Your Information">
            <P>We use the information we collect to:</P>
            <UL items={[
              'Create and maintain your account and provide the core Service.',
              'Process, hold in escrow, and refund financial stakes via our payment processor, Stripe.',
              'Calculate and execute charitable donations when a daily goal is missed, in accordance with your selected beneficiary.',
              'Send transactional push notifications, including workout reminders (10 PM warning) and daily reset notifications at midnight.',
              'Maintain and display your workout history, streak data, and statistics.',
              'Detect and prevent fraud, unauthorized access, and abuse of the financial commitment system.',
              'Respond to support requests and feedback.',
              'Improve the Service through aggregated, de-identified analytics.',
              'Comply with applicable legal obligations.',
            ]} />
            <P>
              We do not use your personal data for advertising, sell it to data brokers, or use it to build advertising profiles.
            </P>
          </Section>

          <Section number="3" title="How We Share Your Information">
            <P>We do not sell your personal information. We share data only in the following limited circumstances:</P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>A. SERVICE PROVIDERS</p>
            <UL items={[
              'Stripe, Inc.: Payment processing, escrow management, and refund execution. Stripe operates under its own Privacy Policy and is PCI-DSS Level 1 compliant.',
              'Supabase, Inc.: Backend database infrastructure and authentication. Data is stored in encrypted form at rest.',
              'OneSignal, Inc.: Push notification delivery (if you have enabled notifications).',
            ]} />
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>B. CHARITABLE BENEFICIARIES</p>
            <P>
              When a forfeiture occurs, your stake is transferred to your selected charity. We transmit only the donation amount and our organization identifier to the charity. We do not share your name, email, or personal details with the charitable beneficiary unless you affirmatively consent.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>C. LEGAL REQUIREMENTS</p>
            <P>
              We may disclose your information if required to do so by law, regulation, court order, or governmental authority, or if we believe in good faith that disclosure is necessary to protect our rights, prevent fraud, or protect the safety of any person.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>D. BUSINESS TRANSFERS</p>
            <P>
              In the event of a merger, acquisition, or sale of all or substantially all of our assets, your information may be transferred to the successor entity. We will notify you via the email address associated with your account prior to any such transfer.
            </P>
          </Section>

          <Section number="4" title="Financial Data and Payment Processing">
            <P>
              All payment processing is handled by Stripe, Inc. When you deposit a stake or receive a refund, your payment information is transmitted directly to Stripe using their secure SDK. FineMe stores only a Stripe Payment Intent ID and transaction metadata (amount, status, date) to maintain your account ledger.
            </P>
            <P>
              Your staked funds are held in a designated account until either: (a) you successfully complete your daily goal, in which case your stake is preserved; or (b) you fail to complete your goal by midnight, in which case 90% is remitted to your designated charity and 10% is retained by FineMe as a platform fee. This fee structure is disclosed during onboarding and constitutes the entirety of FineMe's revenue model.
            </P>
            <P>
              We maintain records of all financial transactions for a minimum of seven (7) years to comply with applicable financial recordkeeping requirements.
            </P>
          </Section>

          <Section number="5" title="Data Retention">
            <UL items={[
              'Account data: Retained for the duration of your account and for 30 days following deletion, after which it is permanently purged.',
              'Workout and daily log data: Retained for the duration of your account.',
              'Payment transaction records: Retained for 7 years in compliance with financial regulations.',
              'Feedback submissions: Retained for up to 2 years.',
              'Anonymized, aggregated analytics: May be retained indefinitely as they cannot be used to identify you.',
            ]} />
          </Section>

          <Section number="6" title="Your Rights and Choices">
            <P>Depending on your jurisdiction, you may have the following rights with respect to your personal data:</P>
            <UL items={[
              'Access: Request a copy of the personal data we hold about you.',
              'Correction: Request that we correct inaccurate or incomplete data.',
              'Deletion: Request deletion of your account and associated personal data. You may initiate account deletion directly within the app via Settings. Note that financial transaction records may be retained as required by law.',
              'Portability: Request your data in a structured, machine-readable format.',
              'Objection: Object to certain processing activities.',
              'Notification opt-out: Disable push notifications at any time via your device settings or within App Settings in the app.',
            ]} />
            <P>
              To exercise any of these rights, contact us at <strong style={{ color: C.text }}>{EMAIL}</strong>. We will respond within 30 days. We may require identity verification before fulfilling requests.
            </P>
          </Section>

          <Section number="7" title="Children's Privacy">
            <P>
              The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18 without parental consent, we will take steps to delete that information promptly. If you believe we have inadvertently collected such information, contact us at {EMAIL}.
            </P>
          </Section>

          <Section number="8" title="Data Security">
            <P>
              We implement industry-standard technical and organizational security measures, including:
            </P>
            <UL items={[
              'Encryption of data in transit using TLS 1.2 or higher.',
              'Encryption of data at rest in our Supabase-hosted database.',
              'JWT-based session authentication with automatic token refresh.',
              'PCI-DSS compliant payment processing via Stripe.',
              'On-device camera processing with no server-side video storage.',
              'Row-level security policies restricting database access to authenticated owners of each record.',
            ]} />
            <P>
              No method of electronic transmission or storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security. In the event of a data breach that is likely to result in a risk to your rights and freedoms, we will notify you and applicable authorities as required by law.
            </P>
          </Section>

          <Section number="9" title="International Data Transfers">
            <P>
              FineMe is operated from the United States. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate. By using the Service, you consent to such transfer. We ensure that appropriate safeguards are in place for any international transfers, including standard contractual clauses where required.
            </P>
          </Section>

          <Section number="10" title="Third-Party Links and Services">
            <P>
              The Service may contain links to third-party websites or services (such as charitable beneficiary websites). We are not responsible for the privacy practices of those third parties. We encourage you to review the privacy policies of any third-party services you access.
            </P>
          </Section>

          <Section number="11" title="Changes to This Policy">
            <P>
              We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email to the address associated with your account and by posting the updated Policy within the app with a new effective date at least 14 days before the changes take effect. Your continued use of the Service after the effective date constitutes acceptance of the updated Policy.
            </P>
          </Section>

          <Section number="12" title="Contact Us">
            <P>If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:</P>
            <div className="rounded-xl p-4 sm:p-5 mt-2" style={{ background: C.surfaceSecondary, border: `1px solid ${C.border}` }}>
              <p className="text-sm font-bold mb-1" style={{ color: C.text }}>{COMPANY}</p>
              <p className="text-sm" style={{ color: C.textSecondary }}>Privacy Inquiries</p>
              <p className="text-sm mt-2" style={{ color: C.accent }}>{EMAIL}</p>
            </div>
          </Section>

        </div>
      </div>

      {/* Footer */}
      <footer className="px-5 sm:px-8 md:px-12 py-8" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs" style={{ color: C.textTertiary }}>
            2026 FineMe Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <button onClick={() => window.location.hash = '#/privacy'} className="text-xs" style={{ color: C.accent }}>
              Privacy Policy
            </button>
            <button onClick={() => window.location.hash = '#/terms'} className="text-xs transition-colors hover:text-white" style={{ color: C.textTertiary }}>
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

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

const UL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="mb-4 space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-sm leading-6" style={{ color: C.textSecondary }}>
        <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: C.accent }} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-xl p-4 sm:p-5 my-4" style={{ background: C.surfaceSecondary, border: `1px solid ${C.border}` }}>
    <p className="text-sm leading-7" style={{ color: C.textSecondary }}>{children}</p>
  </div>
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

export const TermsOfService: React.FC = () => {
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
            Terms of Service
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
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and {COMPANY} ("FineMe," "we," "us," or "our") governing your access to and use of the FineMe mobile application and all related services, features, and content (collectively, the "Service").
            </P>
            <P>
              <strong style={{ color: C.text }}>PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE SERVICE.</strong> By creating an account, depositing funds, or otherwise using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you must not use the Service.
            </P>
            <P>
              These Terms contain a binding arbitration agreement and class action waiver in Section 18. Please read that section carefully.
            </P>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 sm:px-8 md:px-12 pb-20 sm:pb-24">
        <div className="max-w-3xl mx-auto">

          <Section number="1" title="Eligibility">
            <P>To use the Service, you must:</P>
            <UL items={[
              'Be at least 18 years of age.',
              'Have the legal capacity to enter into a binding contract in your jurisdiction.',
              'Not be prohibited from using the Service under applicable law.',
              'Have a valid payment method capable of being charged in U.S. dollars.',
              'Reside in a jurisdiction where financial commitment devices of this nature are legally permissible.',
            ]} />
            <P>
              By using the Service, you represent and warrant that you meet all eligibility requirements. If you do not meet these requirements, you must cease using the Service immediately.
            </P>
          </Section>

          <Section number="2" title="Account Registration">
            <P>
              You must create an account to use the Service. You agree to provide accurate, current, and complete information during registration and to keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </P>
            <P>
              You must notify us immediately at {EMAIL} if you suspect any unauthorized use of your account. We will not be liable for any loss or damage arising from your failure to secure your credentials.
            </P>
            <P>
              You may not create more than one account per person. Accounts are non-transferable. We reserve the right to suspend or terminate accounts that we reasonably believe are being operated by unauthorized parties.
            </P>
          </Section>

          <Section number="3" title="The Commitment Protocol">
            <P>
              The core functionality of FineMe is a behavioral commitment mechanism. By using the Service, you understand and agree to the following:
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>A. THE DAILY COMMITMENT</p>
            <UL items={[
              'Upon setup, you elect a daily repetition goal (minimum 20 repetitions) and a stake amount (minimum $10.00 USD per day).',
              'Your selected stake amount is held in a designated account managed by our payment processor, Stripe, Inc.',
              'You must complete your elected daily rep goal, as verified by the FineMe AI Movement Judge, before 11:59:59 PM local time each day.',
              'Repetitions must be verified by the AI camera system. Manual entry is not permitted under any circumstances.',
            ]} />
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>B. SUCCESSFUL COMPLETION</p>
            <P>
              If you achieve your elected daily rep goal before the midnight deadline, your stake is preserved and rolls over to the next day. You retain full ownership of your deposited funds.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>C. FORFEITURE</p>
            <Highlight>
              IF YOU FAIL TO COMPLETE YOUR DAILY REP GOAL BEFORE THE MIDNIGHT DEADLINE, YOUR FULL DAILY STAKE WILL BE FORFEITED. YOU WILL NOT RECEIVE A REFUND OF FORFEITED AMOUNTS UNDER ANY CIRCUMSTANCES, INCLUDING TECHNICAL DIFFICULTIES, ILLNESS, TRAVEL, OR ANY OTHER REASON, EXCEPT WHERE YOU HAVE VALIDLY EXERCISED A WEEKLY WAIVE PASS AS DESCRIBED IN SECTION 4.
            </Highlight>
            <P>
              Upon forfeiture: (a) 90% of your daily stake is remitted to your designated charitable beneficiary; and (b) 10% is retained by FineMe as a platform fee. This split constitutes the entirety of FineMe's revenue model. By using the Service, you irrevocably authorize these transactions upon a forfeiture event.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>D. GOAL AND STAKE MODIFICATION</p>
            <UL items={[
              'Your daily rep goal may be modified once per rolling 30-day period. Changes take effect the following day.',
              'Your stake amount may be increased at any time by paying the difference via the in-app payment flow. Stake increases are subject to the 30-day rolling modification lock thereafter.',
              'Your stake amount may be decreased once per rolling 30-day period. A decrease triggers a refund of the difference via Stripe.',
              'Commitment periods (Forever, 1 Year, 66 Days, 30 Days), once selected, remain in effect for the elected duration. Upon expiry, the stake minimum drops to $0.00, enabling full withdrawal.',
            ]} />
          </Section>

          <Section number="4" title="Weekly Waive Pass">
            <P>
              Each user is entitled to one (1) Waive Pass per rolling seven-day period. A Waive Pass exempts you from forfeiture for a single day. To exercise a Waive Pass:
            </P>
            <UL items={[
              'Navigate to Protocol Settings and select "Waive Today."',
              'Select a valid reason from the provided options or enter a custom reason.',
              'Confirm the waive. The waived day is recorded and treated as Secured for streak and statistics purposes.',
            ]} />
            <P>
              Waive Passes are non-transferable, non-accumulating, and expire if unused within the seven-day period. You may not retroactively apply a Waive Pass to a day that has already been processed as a forfeiture.
            </P>
          </Section>

          <Section number="5" title="Payments, Refunds, and Fees">
            <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: C.textTertiary }}>A. PAYMENT PROCESSING</p>
            <P>
              All payments are processed by Stripe, Inc. By depositing funds, you agree to Stripe's Terms of Service and Privacy Policy in addition to these Terms. You authorize FineMe to instruct Stripe to hold, release, refund, or transfer funds in accordance with these Terms.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>B. DEPOSITS</p>
            <P>
              Your initial stake deposit is collected during onboarding. Subsequent stake increases are collected via the in-app payment flow. All deposits are non-refundable except in the specific circumstances described in Section 5(C) below.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>C. AUTHORIZED REFUNDS</p>
            <UL items={[
              'Stake decrease refunds: When you voluntarily decrease your stake amount within the allowed modification window, the difference is automatically refunded to your original payment method.',
              'Commitment period expiry refunds: When your elected commitment period concludes, your full remaining balance may be withdrawn by setting your stake to $0.',
              'Account deletion refunds: Upon account deletion, any remaining balance not subject to an active commitment period will be refunded. Active commitment period balances are not refundable prior to expiry.',
            ]} />
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>D. NO REFUNDS FOR FORFEITURES</p>
            <Highlight>
              FORFEITED STAKES ARE NOT REFUNDABLE UNDER ANY CIRCUMSTANCES. ONCE FUNDS HAVE BEEN REMITTED TO A CHARITABLE BENEFICIARY, THEY CANNOT BE RECALLED. BY USING THE SERVICE, YOU EXPRESSLY ACKNOWLEDGE AND ACCEPT THIS TERM.
            </Highlight>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>E. PLATFORM FEE</p>
            <P>
              FineMe retains 10% of all forfeited stakes as a platform service fee. This fee is disclosed clearly during onboarding and is non-negotiable and non-refundable.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>F. TAXES</p>
            <P>
              You are solely responsible for any taxes applicable to your use of the Service, including any taxes on forfeited funds or charitable donations. FineMe does not provide tax advice. Consult a qualified tax professional regarding the deductibility of charitable contributions made through the Service.
            </P>
          </Section>

          <Section number="6" title="AI Movement Verification">
            <P>
              The FineMe AI Movement Judge uses on-device pose estimation to count repetitions. You acknowledge and agree that:
            </P>
            <UL items={[
              'The AI system is designed to be accurate but is not infallible. Factors including lighting conditions, camera angle, device performance, and clothing may affect detection accuracy.',
              'Rep counts generated by the AI Judge are final and binding for the purposes of determining daily goal completion.',
              'You may not manipulate, deceive, or attempt to circumvent the AI verification system. Any such attempt constitutes a material breach of these Terms and may result in immediate account termination without refund.',
              'FineMe reserves the right to investigate anomalous rep count patterns and to take action, including account suspension, where manipulation is suspected.',
              'Manual rep entry is expressly prohibited. Any completion of a daily goal must be achieved through live AI verification.',
            ]} />
          </Section>

          <Section number="7" title="Charitable Beneficiaries">
            <P>
              FineMe partners with pre-verified non-profit organizations as charitable beneficiaries. We make reasonable efforts to ensure that all listed charities are legitimate, registered non-profit entities; however, we do not control their operations, programs, or use of donated funds. We are not responsible for the conduct or financial management of any charitable beneficiary.
            </P>
            <P>
              Forfeiture donations are made on your behalf but in FineMe's name. You may not direct the specific use of donated funds. You acknowledge that forfeiture donations are not deductible charitable contributions for tax purposes as they are made as a consequence of a contractual obligation, not as a voluntary gift. Please consult a tax professional for guidance specific to your situation.
            </P>
          </Section>

          <Section number="8" title="Prohibited Conduct">
            <P>You agree not to:</P>
            <UL items={[
              'Use the Service for any unlawful purpose or in violation of any applicable laws or regulations.',
              'Attempt to manipulate, spoof, or deceive the AI Movement Judge, including by using pre-recorded video, mechanical devices, or other means.',
              'Create multiple accounts to circumvent the forfeiture system or weekly waive limits.',
              'Reverse engineer, decompile, disassemble, or attempt to derive the source code of the Service.',
              'Use automated tools, bots, or scripts to interact with the Service.',
              'Interfere with or disrupt the integrity or performance of the Service or its underlying infrastructure.',
              'Attempt to gain unauthorized access to other users\' accounts or FineMe\'s systems.',
              'Upload or transmit any content that is harmful, defamatory, obscene, or otherwise objectionable.',
              'Use the Service in any manner that could impose an unreasonable or disproportionate load on our infrastructure.',
              'Circumvent, disable, or interfere with any security features of the Service.',
            ]} />
            <P>
              Violation of any prohibition in this Section may result in immediate account suspension or termination, forfeiture of any remaining balance, and, where applicable, referral to law enforcement authorities.
            </P>
          </Section>

          <Section number="9" title="Intellectual Property">
            <P>
              All content, features, functionality, software, trademarks, logos, and trade names comprising or associated with the Service are the exclusive property of {COMPANY} or its licensors and are protected by applicable intellectual property laws.
            </P>
            <P>
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Service solely for your personal, non-commercial purposes.
            </P>
            <P>
              You may not copy, modify, distribute, sell, or lease any part of the Service, or reverse engineer or attempt to extract the source code of any software component of the Service, without our express written permission.
            </P>
          </Section>

          <Section number="10" title="Disclaimers">
            <Highlight>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED OR ERROR-FREE OPERATION.
            </Highlight>
            <P>
              FineMe does not warrant that: (a) the Service will meet your requirements; (b) the Service will be uninterrupted, timely, secure, or error-free; (c) the AI Movement Judge will accurately count every repetition under all conditions; or (d) any errors in the Service will be corrected.
            </P>
            <P>
              FineMe is a fitness accountability tool, not a healthcare provider. Nothing in the Service constitutes medical advice, diagnosis, or treatment. Consult a qualified healthcare professional before beginning any exercise program. You assume all risks associated with physical exercise undertaken in connection with your use of the Service.
            </P>
          </Section>

          <Section number="11" title="Limitation of Liability">
            <Highlight>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, FINEME, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, AND SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE.
            </Highlight>
            <P>
              IN NO EVENT SHALL FINEME'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE SERVICE EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT OF FUNDS HELD IN YOUR ACCOUNT AT THE TIME THE CLAIM AROSE; OR (B) ONE HUNDRED U.S. DOLLARS ($100.00).
            </P>
            <P>
              Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. In such jurisdictions, the above limitations and exclusions apply to the fullest extent permitted by applicable law.
            </P>
          </Section>

          <Section number="12" title="Indemnification">
            <P>
              You agree to indemnify, defend, and hold harmless {COMPANY} and its officers, directors, employees, agents, licensors, and service providers from and against any and all claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; or (d) any content you submit to the Service.
            </P>
          </Section>

          <Section number="13" title="Account Termination">
            <p className="text-xs font-semibold tracking-widest mb-2" style={{ color: C.textTertiary }}>A. TERMINATION BY YOU</p>
            <P>
              You may delete your account at any time via Settings in the app. Upon account deletion, your personal data will be purged within 30 days (subject to legal retention obligations). Any remaining balance not subject to an active commitment period will be refunded to your original payment method. Active commitment period balances are governed by the terms of that commitment.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>B. TERMINATION BY FINEME</p>
            <P>
              We reserve the right to suspend or terminate your account and access to the Service at any time, with or without cause, with or without notice, including but not limited to: violation of these Terms, fraudulent or abusive behavior, non-payment, or if we determine that your continued use of the Service poses a legal, reputational, or operational risk.
            </P>
            <P>
              Upon termination for cause, we are not obligated to refund any balance. Upon termination without cause, we will refund any balance not subject to an active commitment period.
            </P>
          </Section>

          <Section number="14" title="Governing Law">
            <P>
              These Terms and any dispute arising out of or related to these Terms or the Service shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
            </P>
          </Section>

          <Section number="15" title="Dispute Resolution and Arbitration">
            <Highlight>
              PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.
            </Highlight>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>A. INFORMAL RESOLUTION</p>
            <P>
              Before initiating any formal dispute proceeding, you agree to contact us at {EMAIL} and provide a written description of the dispute, your preferred resolution, and your contact information. We will attempt to resolve the dispute within 30 days of receiving your notice.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>B. BINDING ARBITRATION</p>
            <P>
              If informal resolution fails, any dispute, claim, or controversy arising out of or relating to these Terms or the Service shall be resolved by binding arbitration administered by the American Arbitration Association ("AAA") under its Consumer Arbitration Rules. The arbitration shall be conducted in Delaware or via videoconference. The arbitrator's decision shall be final and binding.
            </P>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>C. CLASS ACTION WAIVER</p>
            <Highlight>
              YOU AND FINEME AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, REPRESENTATIVE, OR COLLECTIVE ACTION.
            </Highlight>
            <p className="text-xs font-semibold tracking-widest mb-2 mt-5" style={{ color: C.textTertiary }}>D. EXCEPTIONS</p>
            <P>
              Either party may seek emergency injunctive or other equitable relief from a court of competent jurisdiction to prevent actual or threatened infringement of intellectual property rights. This arbitration agreement does not apply to claims that may not be subject to arbitration under applicable law.
            </P>
          </Section>

          <Section number="16" title="Changes to These Terms">
            <P>
              We reserve the right to modify these Terms at any time. When we make material changes, we will notify you by email at least 14 days before the changes take effect and will post the updated Terms within the app with a revised effective date. Your continued use of the Service after the effective date constitutes acceptance of the revised Terms. If you do not agree to the revised Terms, you must cease using the Service and may delete your account.
            </P>
          </Section>

          <Section number="17" title="Miscellaneous">
            <UL items={[
              'Entire Agreement: These Terms, together with our Privacy Policy and any additional terms you agree to in connection with specific features, constitute the entire agreement between you and FineMe regarding the Service.',
              'Severability: If any provision of these Terms is found to be unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall remain in full force.',
              'No Waiver: FineMe\'s failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.',
              'Assignment: You may not assign or transfer your rights or obligations under these Terms without our prior written consent. FineMe may assign its rights without restriction.',
              'Force Majeure: FineMe shall not be liable for any failure or delay in performance caused by events beyond our reasonable control, including natural disasters, acts of government, or infrastructure failures.',
              'Notices: Legal notices to FineMe must be sent to support@fineme.io. Notices to you will be sent to the email address associated with your account.',
            ]} />
          </Section>

          <Section number="18" title="Contact Information">
            <P>For legal inquiries regarding these Terms, contact us at:</P>
            <div className="rounded-xl p-4 sm:p-5 mt-2" style={{ background: C.surfaceSecondary, border: `1px solid ${C.border}` }}>
              <p className="text-sm font-bold mb-1" style={{ color: C.text }}>{COMPANY}</p>
              <p className="text-sm" style={{ color: C.textSecondary }}>Legal Department</p>
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
            <button onClick={() => window.location.hash = '#/privacy'} className="text-xs transition-colors hover:text-white" style={{ color: C.textTertiary }}>
              Privacy Policy
            </button>
            <button onClick={() => window.location.hash = '#/terms'} className="text-xs" style={{ color: C.accent }}>
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

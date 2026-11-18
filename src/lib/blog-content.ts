// ============================================================
// PUSATPERIZINAN.COM — Blog Engine: Artikel Panduan Mendalam
// ============================================================

export type BlogCategory =
  | "Panduan"
  | "Biaya & Modal"
  | "Regulasi"
  | "Studi Kasus"
  | "Internasional"
  | "Tambang & Energi"
  | "Travel Ibadah"
  | "Pajak";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Panduan", "Biaya & Modal", "Regulasi", "Studi Kasus",
  "Internasional", "Tambang & Energi", "Travel Ibadah", "Pajak",
];

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}
export interface BlogFAQ { question: string; answer: string; }
export interface BlogArticle {
  slug: string; title: string; category: BlogCategory; excerpt: string;
  readMinutes: number; publishedAt: string; updatedAt: string;
  author: string; authorRole: string; keywords: string[];
  sections: BlogSection[]; faq: BlogFAQ[];
  relatedArticles: string[]; relatedGuides: string[];
  cta: { text: string; anchor: string };
}

const OSS_PASSWORD_GUIDE: BlogArticle = {
  slug: "oss-rba-password-reset-account-recovery",
  title: "How to Reset Your OSS RBA Password and Recover Account Access in Indonesia",
  category: "Panduan",
  excerpt: "A security-first, step-by-step guide to recovering OSS RBA access, using the official password-reset flow, handling inaccessible registered contact details, understanding selfie verification, troubleshooting login errors, and protecting business account credentials.",
  readMinutes: 12,
  publishedAt: "2026-11-18",
  updatedAt: "2026-11-18",
  author: "PusatPerizinan.com Editorial Team",
  authorRole: "Business Licensing Guidance",
  keywords: [
    "OSS RBA password reset", "how to reset OSS password",
    "OSS account recovery Indonesia", "OSS RBA login problem",
    "OSS forgot password", "OSS selfie verification",
    "OSS account owner verification", "recover OSS RBA access",
    "Online Single Submission Indonesia",
  ],
  sections: [
    {
      heading: "1. Before You Start: Protect the Account and Confirm Who Owns It",
      paragraphs: [
        "The OSS RBA account provides access to business licensing information and services. Confirm that you are the account owner or are formally authorized to assist. If an agent, consultant, employee, or another representative previously managed the account, coordinate with the owner before changing credentials.",
        "Never send your password, one-time password (OTP), recovery link, identity document, or selfie-verification image to a consultant or an unrelated person through a chat group. The account owner should complete authentication and identity checks directly on the official OSS website or application. A consultant may guide the process and help interpret a redacted error message, but must not impersonate the owner or collect authentication secrets.",
        "Use only the official portal at https://oss.go.id/. Check the domain before entering credentials. Do not follow reset links from unsolicited messages, advertisements, or unknown senders. Verify that an expected recovery message leads to an official OSS domain."
      ]
    },
    {
      heading: "2. Standard Password Reset: Use the Official Forgot Password Route",
      paragraphs: [
        "If you still know the account's registered mobile number, email address, or username but have forgotten the password, use OSS's official Forgot Password route. The current official guide places the recovery option under the login assistance menu. Screen labels may change, so follow the instructions displayed on the official portal."
      ],
      bullets: [
        "Open https://oss.go.id/ and select Masuk (Log In).",
        "On the login page, select Butuh Bantuan? (Need Help?).",
        "Choose Lupa Kata Sandi (Forgot Password).",
        "Enter the registered mobile number, email address, or username requested by the page, complete the CAPTCHA, and continue.",
        "Check the registered email inbox or WhatsApp account for the recovery instruction or link. Check Spam/Junk if using email.",
        "Open the link only after verifying the sender and destination domain. Create a new, unique password that meets the requirements shown by OSS.",
        "Return to the official login page and sign in using the registered identifier and new password."
      ]
    },
    {
      heading: "3. Does Every Password Reset Require a Selfie?",
      paragraphs: [
        "No. Do not assume that every ordinary password reset requires a selfie. OSS's standard forgotten-password guidance describes recovery through the registered contact channel. A selfie or face-verification step may appear in a separate identity-verification process, for example when the account owner must update a registered phone number or email address that is no longer accessible, or when OSS specifically requests additional identity checks.",
        "If OSS displays a selfie-verification instruction, the recognized account owner must complete it personally and follow the exact on-screen requirements. Do not use another person's face, edit the verification image, reuse an old image, or ask a consultant to submit verification on the owner's behalf. If no selfie step appears, do not invent one or use an unofficial workaround."
      ]
    },
    {
      heading: "4. If You Cannot Access the Registered Email or Phone Number",
      paragraphs: [
        "A forgotten password and an inaccessible registered contact channel are different issues. If you cannot receive a reset link because the registered email or phone number is no longer available, stop repeating the standard reset flow. Open the relevant account/contact recovery guidance in the OSS Help section or contact official OSS support and explain which registered channel is inaccessible.",
        "OSS may provide a separate identity-verification procedure for changing registered contact information. Depending on the account type and requested change, this process may request identity details and a selfie with a verification code. Follow the current instructions shown in your own OSS account; do not rely on an old video or a procedure intended for a different account type."
      ]
    },
    {
      heading: "5. Troubleshooting: 'The Account and Password Combination Does Not Match'",
      paragraphs: [
        "If OSS reports that the account and password combination does not match, first check for typing errors and confirm that you are using the correct registered identifier. Check the keyboard language, Caps Lock, extra spaces, browser autofill, and whether you entered the correct email, phone number, or username.",
        "If the error continues, use the official Forgot Password flow instead of repeatedly guessing passwords. If the account owner can sign in on another device but an authorized representative cannot, compare the identifier and the access arrangement. Do not conclude that the account was hacked or that a particular person changed the password without evidence.",
        "Record the date and time, exact error text, browser and device used, and a screenshot with personal information and authentication secrets redacted. Share only the redacted screenshot with official support or the authorized account administrator."
      ],
      bullets: [
        "Confirm the correct registered login identifier.",
        "Check that the browser is on https://oss.go.id/ and not a look-alike website.",
        "Try an updated browser or a private/incognito window; disable autofill if it inserts an old password.",
        "Avoid repeated guesses. Use the official password-reset process when the password is uncertain.",
        "If the owner can log in but a representative cannot, have the owner confirm the authorized access method without sending credentials in a group chat.",
        "Contact OSS support if the official recovery route fails or the registered contact channel is inaccessible."
      ]
    },
    {
      heading: "6. After Access Is Restored: Secure the Account",
      paragraphs: [
        "Set a unique password that is not reused for email, banking, social media, or other services. Store it in a reputable password manager. Review the registered email and mobile number and confirm that they remain under the control of the appropriate account owner.",
        "If OSS offers a formal representative or authorization feature for the relevant account type, use it instead of sharing the owner's personal login. Availability depends on account type and current platform functionality. Do not share passwords, OTPs, or recovery links with consultants.",
        "Keep a simple access log recording who performed the recovery, when it was completed, whether the owner successfully logged in, and which authorized tasks remain. Never include passwords, OTPs, recovery links, or identity images in the log."
      ]
    },
    {
      heading: "7. When to Contact Official OSS Support",
      paragraphs: [
        "Contact OSS through the support channels displayed on https://oss.go.id/ if the reset link does not arrive, the registered contact information is inaccessible, identity verification fails, the account appears locked, or the same error continues after a correctly completed reset.",
        "Prepare a redacted screenshot, the approximate time of the failed attempt, browser/device information, the type of login identifier used (email, phone, or username—not its full value in public), and a summary of the recovery steps attempted. Keep any official ticket or reference number. Never publish the NIB, NIK, password, OTP, or identity documents in public comments or social media."
      ]
    },
    {
      heading: "8. Password Recovery Is Not the Same as Changing Account Ownership",
      paragraphs: [
        "Resetting a password restores login access; it does not automatically change the account owner, company administrator, registered phone number, or registered email address. If a business needs to change its administrator or formal account contact, use the separate OSS procedure that applies to the entity and account type.",
        "For a company account, confirm who is legally or formally entitled to act for the business. A consultant may assist with preparation and navigation, but any identity verification must be truthful and completed by the person OSS recognizes for that step."
      ]
    },
    {
      heading: "9. Quick Security Checklist",
      bullets: [
        "I am the account owner or have confirmed authority to assist.",
        "I opened the official OSS portal directly.",
        "I know which registered email, phone number, or username is associated with the account.",
        "I used the official Need Help? and Forgot Password route.",
        "I checked the registered inbox or WhatsApp and verified the reset message before opening its link.",
        "I completed selfie or identity verification personally, only if OSS requested it.",
        "I did not share my password, OTP, reset link, NIK, or selfie image with a third party.",
        "I tested the new password and recorded the recovery outcome without storing secrets."
      ]
    }
  ],
  faq: [
    { question: "Does every OSS RBA password reset require a selfie?", answer: "No. The standard password-reset route may use the registered email or WhatsApp channel. Selfie verification may be required in a separate identity or contact-information recovery process when OSS instructs the account owner to complete it." },
    { question: "Can my consultant reset my OSS password for me?", answer: "A consultant can guide you, but the account owner should complete authentication, OTP entry, password creation, and any identity or selfie verification personally. Do not share passwords or OTPs in a chat." },
    { question: "What if the reset link does not arrive?", answer: "Check the registered email address, Spam/Junk folder, and registered WhatsApp account. If the message still does not arrive or the registered contact is inaccessible, follow the official account/contact recovery instructions or contact OSS support." },
    { question: "What should I do if OSS says the account and password combination does not match?", answer: "Verify the login identifier and typing, avoid repeated guesses, and use the official Forgot Password process. If the problem continues after recovery, contact OSS support with a redacted screenshot and technical details." },
    { question: "Should I send my OTP or selfie to my licensing consultant?", answer: "No. Keep passwords, OTPs, recovery links, and identity-verification images private. Complete the process on the official OSS portal yourself and share only a redacted error screenshot when technical assistance is needed." },
    { question: "Does resetting the password change the business account owner?", answer: "No. Password recovery restores login access; it does not automatically change the registered account owner, administrator, email, or phone number. Use the applicable official OSS process for those changes." }
  ],
  relatedArticles: ["panduan-nib-oss-rba", "pma-vs-pt-lokal"],
  relatedGuides: ["oss", "nib"],
  cta: { text: "Need help with OSS account access? Contact our team", anchor: "#konsultasi" }
};

const EXISTING_ARTICLES: BlogArticle[] = [
];
export const BLOG_ARTICLES: BlogArticle[] = [
  OSS_PASSWORD_GUIDE,
  ...EXISTING_ARTICLES
];

export function getArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slugs: string[]): BlogArticle[] {
  return slugs
    .map((s) => getArticle(s))
    .filter((a): a is BlogArticle => Boolean(a));
}

export function getAllBlogKeywords(): string[] {
  return Array.from(new Set(BLOG_ARTICLES.flatMap((a) => a.keywords)));
}

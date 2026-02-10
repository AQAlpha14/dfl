import { SEOAction } from "@/actions/seo-action";
import TermsOfService, { TOSItem } from "@/components/TermsOfService";
import { BASE_URL, isIndex, nocache } from "@/constants/constants";

// ----------------------------
// MAIN CONTENT (TOC + CONTENT)
// ----------------------------
export const termsOfService: TOSItem[] = [
  {
    id: 1,
    label: "1. Acceptance of Terms",
    icon: "/icons/termsofservices/1.svg",
    icon1: "/icons/termsofservices/11.svg",
    paragraph: ["By using Directfromlandloard, you acknowledge that:"],
    content: [
      "You have read, understood, and agreed to these Terms.",
      "You are at least 16 years old (or the age of majority in your jurisdiction).",
      "You will comply with all applicable laws, rules, and regulations while using our services.",
    ],
  },

  {
    id: 2,
    label: "2. Use of Services",
    icon: "/icons/termsofservices/2.svg",
    icon1: "/icons/termsofservices/12.svg",
    paragraph: [
      "Account Creation: You must provide accurate, complete, and up-to-date information.",
      "Authorized Use: Only individuals or entities authorized by the account holder may access Directfromlandloard services.",
      "Restrictions: You may not use our services to:",
    ],
    content: [
      "Violate laws or regulations",
      "Infringe intellectual property rights",
      "Upload malicious content or malware",
      "Attempt unauthorized access to other users' accounts",
    ],
  },

  {
    id: 3,
    label: "3. Service Data Ownership",
    icon: "/icons/termsofservices/3.svg",
    icon1: "/icons/termsofservices/13.svg",
    content: [
      "You retain full ownership of all data uploaded or generated in Directfromlandloard tools.",
      "We act as a processor and do not sell your Service Data.",
      "You grant Directfromlandloard a limited license to process your data solely to provide services and improve functionality.",
    ],
  },

  {
    id: 4,
    label: "4. Payment and Billing (If Applicable)",
    icon: "/icons/termsofservices/4.svg",
    icon1: "/icons/termsofservices/14.svg",
    content: [
      "Subscription fees, payment schedules, and billing methods are described during account registration.",
      "Payments are processed via secure third-party gateways; sensitive card data is not stored on our servers.",
      "Refund policies, upgrades, or cancellations are governed by the subscription agreement.",
    ],
  },

  {
    id: 5,
    label: "5. Intellectual Property Rights",
    icon: "/icons/termsofservices/5.svg",
    icon1: "/icons/termsofservices/15.svg",
    content: [
      "All platform content, software, branding, and tools are owned by Directfromlandloard or licensed to us.",
      "You may not reproduce, distribute, or modify our content without explicit permission.",
      "You retain rights to your Service Data, but Directfromlandloard retains rights to platform software and services.",
    ],
  },

  {
    id: 6,
    label: "6. Disclaimers and Limitations",
    icon: "/icons/termsofservices/6.svg",
    icon1: "/icons/termsofservices/16.svg",
    content: [
      "Services are provided 'as-is' without warranty of uninterrupted service or error-free operation.",
      "Directfromlandloard is not liable for data loss, downtime, or damages resulting from unauthorized access or misuse.",
      "Third-party integrations are subject to their respective terms; Directfromlandloard is not responsible for their content or actions.",
    ],
  },

  {
    id: 7,
    label: "7. Termination",
    icon: "/icons/termsofservices/7.svg",
    icon1: "/icons/termsofservices/17.svg",
    content: [
      "Directfromlandloard may suspend or terminate accounts for violations of these Terms, legal obligations, or security risks.",
      "Users may terminate accounts at any time.",
      "Upon termination, Service Data is deleted in accordance with the Retention & Deletion Policy, unless legally required to retain it.",
    ],
  },

  {
    id: 8,
    label: "8. Modifications",
    icon: "/icons/termsofservices/8.svg",
    icon1: "/icons/termsofservices/18.svg",
    content: [
      "Directfromlandloard may modify the Terms at any time to reflect changes in services, law, or business practices.",
      "Material changes are communicated to users via email or platform notification.",
      "Continued use of services constitutes acceptance of updated Terms.",
    ],
  },

  {
    id: 9,
    label: "9. Governing Law and Dispute Resolution",
    icon: "/icons/termsofservices/9.svg",
    icon1: "/icons/termsofservices/19.svg",
    content: [
      "These Terms are governed by the laws of [Insert Jurisdiction, e.g., UAE].",
      "Disputes should first be resolved through informal negotiation.",
      "If unresolved, disputes are subject to binding arbitration or to the courts of the designated jurisdiction.",
    ],
  },

  {
    id: 10,
    label: "10. Contact Information",
    icon: "/icons/termsofservices/10.svg",
    icon1: "/icons/termsofservices/20.svg",
    content: [
      "For questions regarding Terms of Service:",
      "Email: support@directfromlandloard.com",
    ],
  },
];

export async function generateMetadata() {
  const vMetaData = await SEOAction();
  return {
    title:
      vMetaData?.seo_title ||
      "Directfromlandloard Terms of Service – Rules & Guidelines for Use",
    description:
      vMetaData?.seo_description ||
      "Read the Terms of Service for Directfromlandloard, outlining user responsibilities, platform policies, and legal guidelines for using our products and services.",
    alternates: {
      canonical: vMetaData?.canonical_url || `${BASE_URL}/terms-of-service`,
    },
    openGraph: vMetaData?.opengraph_data || "",
    twitter: vMetaData?.twitter_tag || "",
    robots: {
      index: isIndex,
      nocache: nocache,
    },
    h1: vMetaData?.h1 || "",
    faq: vMetaData?.faq?.mainEntity || null,
  };
}

const Page = () => {
  return (
    <>
      <TermsOfService
        heading={`Terms of Service`}
        paragraph={`These Terms of Service ("Terms") govern your use of Directfromlandloard's
              products, services, websites, and tools. By accessing or using our
              services, you agree to comply with these Terms, our Privacy Policy,
              and all applicable laws.`}
        data={termsOfService}
      />
    </>
  );
};

export default Page;

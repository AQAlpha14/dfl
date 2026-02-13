import {
  FBSVG,
  ForLandloadSVG,
  ForTenantsSVG,
  GeneralsSVG,
  InstaSVG,
  LocationSVG,
  MailWhiteSVG,
  PhoneSVG,
  RefundsSVG,
  TechSupportSVG,
  XSVG,
} from "@/public/icons/SVGIcons";

export const contactDetail = {
  telNo: "+971 50 123 4567",
  email: "support@dfl.com",
  location: "Al Wasl Plaza, Dubai, UAE, 00000",
};

export const btnText = {
  log_in: "Log In",
  sign_up: "Sign Up",
  cancel: "Cancel",
  share: "Share",
  downgrade: "Downgrade",
  submit: "Submit",
  view: "View",
  view_more: "View More",
  view_less: "View Less",
  filter: "Filter",
  continue: "Continue",
  calculate: "calculate",
  back: "Back",
  save_search: "Save Search",
  reset: "Reset",
  browse_properties: "Browse Properties",
  contact_agent: "Contact Agent",
  submit_request: "Submit Request",
  update_password: "Update Password",
  view_on_map: "View on Map",
  call_us_now: "Call Us Now",
  view_subscription_plans: "View Subscription Plans",
  go_to_subscription_plans: "Go to Subscription Plans",
  continue_editing: "Continue Editing",
  upgrade_package: "Upgrade Package",
  update_profile: "Update Profile",
  choose_photo: "Choose Photo",
  free_member: "Free Member",
  add_payment_method: "Add Payment Method",
  current_package: "Current Package",
  contact_landlord: "Contact Landlord",
  email_landlord: "Email Landlord",
  chat_with_landlord: "Chat with Landlord",
  show_all_photos: "Show All Photos",
  view_all_similar_properties: "View All Similar Properties",
  subscribe_now: "Subscribe Now",
  read_more: "Read More",
  view_all: "View All",
  view_all_insights: "View All Insights",
  view_all_guides: "View All Guides",
  view_listing: "View Listing",
  find_a_room: "Find a Room",
  explore_packages: "Explore Packages",
  view_all_communities_in_dubai: "View All Communities in Dubai",
  explore_more: "Explore More",
  less_filters: "Less Filters",
  more_filters: "More Filters",
  view_details: "View Details",
  advance_filter: "Advance Filter",
  search_properties: "Search Properties",
  find_your_dream_home_now: "Find Your Dream Home Now",
  try_our_savings_calculator: "Try Our Savings Calculator",
  list_your_property: "List Your Property ",
};
// NavBar
export const navlinks = {
  en: [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    // { name: "Packages", link: "/" },
    { name: "Hotels", link: "/hotel-listing" },
    {
      name: "Services",
      link: "#",
      pageLinks: [
        { title: "Flight Booking", link: "/listing" },
        { title: "Hotel Reservations", link: "/listing" },
        { title: "Visa Assistance", link: "/listing" },
        { title: "Transfers", link: "/listing" },
        { title: "Travel Management", link: "/listing" },
      ],
    },
    {
      name: "Resources",
      link: "/",
      pageLinks: [
        { title: "Insights", link: "/blog" },
        { title: "Guides", link: "/guides" },
      ],
    },
  ],
  ar: [
    { name: "الرئيسية", link: "/" },
    { name: "من نحن", link: "/about-us" },
    { name: "الجديدة", link: "/" },
    { name: "المستعملة", link: "/" },
    {
      name: "الخدمات",
      link: "#",
      pageLinks: [
        {
          title: "الصيانة والخدمة",
          paragraph:
            "حافظ على تشغيل سيارتك بسلاسة مع الرعاية المتخصصة والفحوصات الروتينية.",
          link: "/services",
        },
        {
          title: "الغسيل والتلميع",
          paragraph: "أعد اللمعان الأصلي بسيارة نظيفة ومُعتنى بها.",
          link: "/services",
        },
        {
          title: "تأمين السيارات",
          paragraph: "احمِ سيارتك بتغطية تأمينية شاملة تناسب احتياجاتك.",
          link: "/services",
        },
        {
          title: "تقييم السيارة",
          paragraph: "احصل على تقييم دقيق وسريع لسيارتك حسب السوق.",
          link: "/services",
        },
        {
          title: "تمويل السيارات",
          paragraph: "قد السيارة الآن وادفع لاحقًا بتمويل مرن يناسب ميزانيتك.",
          link: "/services",
        },
      ],
    },
    {
      name: "الموارد",
      link: "/used",
      pageLinks: [
        {
          title: "الصيانة والخدمة",
          paragraph:
            "حافظ على سيارتك تعمل بسلاسة مع العناية المتخصصة والفحوصات الدورية.",
          link: "/services",
        },
        {
          title: "الغسيل والتلميع",
          paragraph: "أعد اللمعان الأصلي بسيارة نظيفة ومُعتنى بها.",
          link: "/services",
        },
        {
          title: "تأمين السيارات",
          paragraph: "احمِ سيارتك بتغطية تأمينية شاملة تناسب احتياجاتك.",
          link: "/services",
        },
        {
          title: "تقييم السيارة",
          paragraph: "احصل على تقييم دقيق وسريع لسيارتك حسب السوق.",
          link: "/services",
        },
      ],
    },
    { name: "العلامات التجارية", link: "/brands" },
    { name: "اتصل بنا", link: "/contact-us" },
  ],
};
export const navlinksar = {
  en: [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Packages", link: "/packages" },
    { name: "Hotels", link: "/hotels" },
    {
      name: "Services",
      link: "#",
      pageLinks: [
        { title: "Maintenance & Servicing", link: "/services" },
        { title: "Detailing & Wash", link: "/services" },
        { title: "Car Insurance", link: "/services" },
        { title: "Car Evaluation", link: "/services" },
        { title: "Car Finance", link: "/services" },
      ],
    },
    {
      name: "Resources",
      link: "/used",
      pageLinks: [
        { title: "Maintenance & Servicing", link: "/services" },
        { title: "Detailing & Wash", link: "/services" },
        { title: "Car Insurance", link: "/services" },
        { title: "Car Evaluation", link: "/services" },
      ],
    },
  ],
  ar: [
    { name: "الرئيسية", link: "/" },
    { name: "من نحن", link: "/about-us" },
    { name: "الجديدة", link: "/" },
    { name: "المستعملة", link: "/" },
    {
      name: "الخدمات",
      link: "#",
      pageLinks: [
        {
          title: "الصيانة والخدمة",
          paragraph:
            "حافظ على تشغيل سيارتك بسلاسة مع الرعاية المتخصصة والفحوصات الروتينية.",
          link: "/services",
        },
        {
          title: "الغسيل والتلميع",
          paragraph: "أعد اللمعان الأصلي بسيارة نظيفة ومُعتنى بها.",
          link: "/services",
        },
        {
          title: "تأمين السيارات",
          paragraph: "احمِ سيارتك بتغطية تأمينية شاملة تناسب احتياجاتك.",
          link: "/services",
        },
        {
          title: "تقييم السيارة",
          paragraph: "احصل على تقييم دقيق وسريع لسيارتك حسب السوق.",
          link: "/services",
        },
        {
          title: "تمويل السيارات",
          paragraph: "قد السيارة الآن وادفع لاحقًا بتمويل مرن يناسب ميزانيتك.",
          link: "/services",
        },
      ],
    },
    {
      name: "الموارد",
      link: "/used",
      pageLinks: [
        {
          title: "الصيانة والخدمة",
          paragraph:
            "حافظ على سيارتك تعمل بسلاسة مع العناية المتخصصة والفحوصات الدورية.",
          link: "/services",
        },
        {
          title: "الغسيل والتلميع",
          paragraph: "أعد اللمعان الأصلي بسيارة نظيفة ومُعتنى بها.",
          link: "/services",
        },
        {
          title: "تأمين السيارات",
          paragraph: "احمِ سيارتك بتغطية تأمينية شاملة تناسب احتياجاتك.",
          link: "/services",
        },
        {
          title: "تقييم السيارة",
          paragraph: "احصل على تقييم دقيق وسريع لسيارتك حسب السوق.",
          link: "/services",
        },
      ],
    },
    { name: "العلامات التجارية", link: "/brands" },
    { name: "اتصل بنا", link: "/contact-us" },
  ],
};
/**
|--------------------------------------------------
| Footer Sections
|--------------------------------------------------
*/
export const footerSections = [
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        link: "/about-us",
      },
      {
        name: "Contact Us",
        link: "/contact-us",
      },
      {
        name: "Meet the Team",
        link: "/meet-the-team",
      },
      {
        name: "Terms of Service",
        link: "/terms-of-service",
      },
      {
        name: "Privacy & Policy",
        link: "/privacy-policy",
      },
    ],
  },
  {
    title: "Residential",
    links: [
      {
        name: "Villas For Rent",
        link: "/villas-for-rent",
      },
      {
        name: "Houses for Rent",
        link: "/houses-for-rent",
      },
      {
        name: "Apartment For Rent",
        link: "/apartment-for-rent",
      },
      {
        name: "Townhouses For Rent",
        link: "/townhouses-for-rent",
      },
      {
        name: "Penthouse For Rent",
        link: "/penthouse-for-rent",
      },
    ],
  },
  {
    title: "Commercial",
    links: [
      {
        name: "Bulk Units For Rent",
        link: "/bulk-units-for-rent",
      },
      {
        name: "Factories For Rent",
        link: "/factories-for-rent",
      },
      {
        name: "Full Floors for Rent",
        link: "/full-floors-for-rent",
      },
      {
        name: "Half Floors for Rent",
        link: "/half-floors-for-rent",
      },
      {
        name: "Hotel Apartments",
        link: "/hotel-apartments",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        name: "Insights",
        link: "/blog",
      },
      {
        name: "Guides",
        link: "/guides",
      },
      {
        name: "Savings Calculator",
        link: "/savings-calculator",
      },
    ],
  },
];
export const contactLinks = [
  {
    icon: <MailWhiteSVG />,
    label: contactDetail.email,
    link: `mailto:${contactDetail.email}`,
  },
  {
    icon: <PhoneSVG />,
    label: contactDetail.telNo,
    link: `tel:${contactDetail.telNo}`,
  },
  {
    icon: <LocationSVG />,
    label: contactDetail.location,
    link: `tel:${contactDetail.location}`,
  },
];
export const icons = {
  facebook: "flowbite:facebook-solid",
  instagram: "lets-icons:insta-light",
  whatsapp: "ic:baseline-whatsapp",
  threeDots: "mdi:dots-vertical",
  search: "iconamoon:search",
  notification: "ion:notifications-outline",
  navMenu: "ic:round-menu",
  loading: "eos-icons:bubble-loading",
  calendar: "solar:calendar-bold",
  share: "fa-solid:share",
  print: "fa6-solid:print",
  upArrow: "ep:top",
  upArrowv2: "material-symbols:arrow-drop-up",
  arrowRight: "iconamoon:arrow-right-2-duotone",
  downArrow: "ep:bottom",
  downArrowv2: "material-symbols:arrow-drop-down",
  logout: "line-md:log-out",
  star: "mdi:star-outline",
  starFilled: "mdi:star",
  starV2: "iconoir:star-solid",
  edit: "akar-icons:edit",
  plus: "icons8:plus",
  plusv2: "icons8:plus",
  refresh: "tdesign:refresh",
  checkBox: "octicon:check-16",
  mobile: "uiw:mobile",
  laptop: "ant-design:laptop-outlined",
  accessories: "bx:headphone",
  upload: "solar:gallery-broken",
  remove: "line-md:remove",
  delete: "material-symbols-light:delete",
  restore: "fluent-mdl2:update-restore",
  add: "ri:add-box-fill",
  percent: "iconamoon:sign-percent-bold",
  cancel: "proicons:cancel",
  view: "hugeicons:view",
  ship: "hugeicons:shipping-truck-01",
  shares: "tdesign:share",
  shipmentLabel: "hugeicons:label",
  shipmentTrack: "hugeicons:van",
  doller: "mdi:currency-usd",
};
export const socialLinks = [
  { href: "https://www.facebook.com/directfromlandloard/", icon: <FBSVG /> },
  {
    href: "https://www.instagram.com/directfromlandloard/",
    icon: <InstaSVG />,
  },
  { href: "https://x.com/directfromlandloard", icon: <XSVG /> },
  // { href: "https://www.linkedin.com", icon: <INSVG /> },
  // { href: "https://www.youtube.com", icon: <YoutubeSVG /> },
];
export const faqData = [
  {
    id: 1,
    title: "For Landlords",
    tabicon: <ForLandloadSVG />,
    counter: 6,
    faqs: [
      {
        id: 1,
        question: "How does DFL help me avoid agent commissions?",
        answer:
          "By connecting you directly with tenants, DFL eliminates the need for brokers to hunt renters. This ensures you keep 100% of your rental income.",
      },
      {
        id: 2,
        question: "How can I ensure my property gets higher visibility?",
        answer:
          "DFL syncs your listing across multiple platforms to increase reach and quickly attract only tenants interested in your property.",
      },
      {
        id: 3,
        question: "Can I manage multiple properties on one account?",
        answer:
          "Yes, DFL's unified dashboard lets you manage, track, and update all listings in one place.",
      },
      {
        id: 4,
        question: "What if my property remains vacant?",
        answer:
          "DFL's smart filters and syndication reduce vacancy risks. Our immersive 3d tours and HD pictures of the property get you higher views and queries from verified, interested tenants.",
      },
      {
        id: 5,
        question: "Do I need to pay anything up front?",
        answer:
          "No, DFL follows a success-fee model — you pay only once the deal is finalized.",
      },
      {
        id: 6,
        question: "Do I need to pay anything up front?",
        answer:
          "All tenant inquiries come directly to you on DFL, ensuring no middleman interference and complete control.",
      },
    ],
  },
  {
    id: 2,
    title: "For Tenants",
    tabicon: <ForTenantsSVG />,
    counter: 6,
    faqs: [
      {
        id: 1,
        question: "How do I know listings on DFL are real?",
        answer:
          "Every property is verified and updated regularly to ensure authenticity and accuracy.",
      },
      {
        id: 2,
        question: "Do I have to pay commissions to the broker?",
        answer:
          "No, DFL connects you directly with landlords — meaning zero commission fees.",
      },
      {
        id: 3,
        question: "Can I filter properties by budget and location?",
        answer:
          "Yes, our smart filters let you search by location, rent, lifestyle match, and facilities.",
      },
      {
        id: 4,
        question: "How quickly are listings updated?",
        answer:
          "DFL refreshes listings daily to ensure tenants see the most current availability.",
      },
      {
        id: 5,
        question: "Can I schedule property viewings online?",
        answer:
          "Yes, you can explore properties through immersive 3D tours already available on the website or directly request and schedule an in-person viewing with landlords at your convenience.",
      },
      {
        id: 6,
        question: "Is communication with landlords secure?",
        answer:
          "Yes, all chats and calls are handled through DFL's secure, end-to-end encrypted communication system.",
      },
    ],
  },
  {
    id: 3,
    title: "General",
    tabicon: <GeneralsSVG />,
    counter: 5,
    faqs: [
      {
        id: 1,
        question:
          "What makes DirectFromLandlord (DFL) different from other rental platforms?",
        answer:
          "DFL connects tenants directly with landlords, cutting out agents and commissions. You get verified listings, transparent rental values, and digital tools like virtual tours, instant schedulers, and secure chat—all in one place.",
      },
      {
        id: 2,
        question: "How do you verify landlords and properties on DFL?",
        answer:
          "Landlords must complete a verification process, and properties receive a Verified Badge once documentation is confirmed. This ensures trust and reduces fraud.",
      },
      {
        id: 3,
        question: "Can both tenants and landlords use DFL for free?",
        answer:
          "Yes. Tenants can browse, schedule, and connect with landlords without any upfront cost. Landlords only pay a small success fee when a tenant signs the agreement.",
      },
      {
        id: 4,
        question: "How often are listings updated?",
        answer:
          " DFL refreshes listings hourly to ensure availability, pricing, and details are always up to date",
      },
      {
        id: 5,
        question: "Does DFL support flexible rental options?",
        answer:
          "Yes. Many landlords offer flexible payment plans, short-term contracts, and digital agreements, making it easier for tenants to rent on their terms.",
      },
    ],
  },
  {
    id: 4,
    title: "Refunds",
    tabicon: <RefundsSVG />,
    counter: 6,
    faqs: [
      {
        id: 1,
        question:
          "Am I entitled to a refund if a deal is canceled or falls through?",
        answer:
          "Yes, refundable deposits are returned if agreements are not finalized.",
      },
      {
        id: 2,
        question: "How long does it take to process a refund?",
        answer:
          "Refunds are processed within 7–10 business days; however, this timeframe may vary depending on the payment method.",
      },
      {
        id: 3,
        question:
          "Do tenants receive a refund if the landlord cancels the lease?",
        answer:
          "Yes, tenants are refunded in full if the landlord cancels after payment has been made.",
      },
      {
        id: 4,
        question: "What if I change my mind after booking?",
        answer:
          "Refund eligibility depends on the cancellation policy agreed upon in your contract.",
      },
      {
        id: 5,
        question: "Are service fees refundable?",
        answer:
          "Platform success fees are charged only after the tenant signs the contract. If the deal falls through after that, any fees paid will be refunded in full.",
      },
      {
        id: 6,
        question: "How do I request a refund?",
        answer:
          "Refunds can be requested directly through your DFL dashboard, with status tracking feature.",
      },
    ],
  },
  {
    id: 5,
    title: "Tech & Support",
    tabicon: <TechSupportSVG />,
    counter: 5,
    faqs: [
      {
        id: 1,
        question: "Do I need to download an app to use DFL?",
        answer:
          "No. DFL is fully web-based and mobile-responsive. You can access your account, listings, and tools directly from your browser on any device.",
      },
      {
        id: 2,
        question: "How does the secure chat and call feature work?",
        answer:
          "All communication happens within the platform, so your personal details remain private. Tenants and landlords can chat, call, and share documents safely without using third-party apps.",
      },
      {
        id: 3,
        question: "What if I face a technical issue while using DFL?",
        answer:
          "You can contact our support team via live chat or email. We provide quick resolutions for issues like login problems, listing errors, or scheduling glitches.",
      },
      {
        id: 4,
        question: "Can I sign and manage contracts digitally on DFL?",
        answer:
          "Yes. The platform includes digital contracts and e-signature integration, so both tenants and landlords can finalize agreements online without paperwork.",
      },
      {
        id: 5,
        question: "Is there a customer support team to guide me through setup?",
        answer:
          "Absolutely. Our support team helps new landlords create listings and assists tenants in navigating filters, scheduling, and secure communications.",
      },
    ],
  },
];
export const listingDetailData = {
  id: 1,
  title: "Luxury 2BR Apartment with Marina Views",
  price: 280000,
  location: "Dubai Marina, Dubai",
  rating: "4,8 (56 Reviews)",

  features: [
    {
      icon: "/icons/icon_74.svg",
      lable: "2 Bedrooms",
    },
    {
      icon: "/icons/icon_75.svg",
      lable: "2 Bathrooms",
    },
    {
      icon: "/icons/icon_76.svg",
      lable: "1200 sq ft Area",
    },
    {
      icon: "/icons/icon_77.svg",
      lable: "1 Parking Space",
    },
  ],
  nearbyPlaces: [
    {
      icon: "/icons/icon_81.svg",
      title: "Dubai Marina Mall",
      lable: "Shopping",
      time: "2 min walk",
    },
    {
      icon: "/icons/icon_82.svg",
      title: "Marina Beach",
      lable: "Recreation",
      time: "5 min walk",
    },
    {
      icon: "/icons/icon_83.svg",
      title: "Metro Station",
      lable: "Transport",
      time: "8 min walk",
    },
    {
      icon: "/icons/icon_84.svg",
      title: "JBR Beach",
      lable: "Recreation",
      time: "12 min walk",
    },
  ],
  propertyDetails: [
    {
      title: "City",
      lable: "Dubai",
    },
    {
      title: "Area/Community",
      lable: "Dubai Marina, Downtown",
    },
    {
      title: "Street Name",
      lable: "Marina Heights Tower",
    },
    {
      title: "Villa Number/House Number",
      lable: "1205",
    },
    {
      title: "Plot Number",
      lable: "122",
    },
    {
      title: "Unit Number",
      lable: "1502",
    },
    {
      title: "Bedrooms",
      lable: "4",
    },
    {
      title: "Bathrooms",
      lable: "4",
    },
    {
      title: "Area (sq ft)",
      lable: "1400",
    },
    {
      title: "Furnishing Status",
      lable: "Furnished",
    },
    {
      title: "Available From",
      lable: "22/12/2025",
    },
    {
      title: "Building Year",
      lable: "2022",
    },
    {
      title: "Plot/Land Area (sq ft)",
      lable: "3000",
    },
    {
      title: "Parking Spaces",
      lable: "2 Spaces",
    },
    {
      title: "View Type",
      lable: "Marina View",
    },
  ],
  amenities: [
    { label: "Maids Room" },
    { label: "Balcony" },
    { label: "Shared Pool" },
    { label: "Shared Spa" },
    { label: "Shared Gym" },
    { label: "Central A/C" },
    { label: "Concierge Service" },
    { label: "Covered Parking" },
    { label: "View of Water" },
    { label: "View of Landmark" },
    { label: "Pets Allowed" },
    { label: "Children’s Play Area" },
    { label: "Children’s Pool" },
    { label: "Barbecue Area" },
    { label: "Built-in Wardrobes" },
    { label: "Study" },
    { label: "Walk-in Closet" },
    { label: "Private Jacuzzi" },
    { label: "Garden Access" },
    { label: "Rooftop Terrace" },
    { label: "Cycling Track" },
    { label: "24/7 Security" },
    { label: "Smart Home Features" },
    { label: "Fireplace" },
    { label: "CCTV Surveillance" },
    { label: "Laundry Room" },
    { label: "Outdoor Shower" },
    { label: "Fitness Studio" },
    { label: "Game Room" },
    { label: "Sauna" },
  ],
  agent: {
    name: "Muhammad Ahmed",
    lastActive: "2 hours ago",
    memberSince: "2019",
    phone: "+971 50 123 4567",
    email: "agent@example.com",
  },
  tenantReviews: [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing apartment! The landlord was very responsive.",
      timeAgo: "2 weeks ago",
    },
    {
      name: "Mike Chen",
      rating: 4,
      comment: "Good location and amenities. The building is well-maintained.",
      timeAgo: "1 month ago",
    },
  ],
  relatedSearches: [
    "2BR Apartments in Dubai Marina",
    "Furnished Apartments in JBR",
    "Marina View Properties",
  ],
};

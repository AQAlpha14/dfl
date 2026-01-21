import { FBSVG, InstaSVG, INSVG, LocationSVG, MailSVG, MailWhiteSVG, PhoneSVG, XSVG, YoutubeSVG } from "@/public/icons/SVGIcons";

export const contactDetail = {
  telNo: "+971 50 123 4567",
  email: "support@directfromlandlords.com",
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
}
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
        name: "Careers",
        link: "/careers",
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
  threeDots: "mdi:dots-vertical",
  search: "iconamoon:search",
  notification: "ion:notifications-outline",
  navMenu: "ic:round-menu",
  loading: "eos-icons:bubble-loading",
  calendar: "solar:calendar-bold",
  share: "fa-solid:share",
  print: "fa6-solid:print",
  upArrow: "ep:top",
  'upArrowv2': "material-symbols:arrow-drop-up",
  downArrow: "ep:bottom",
  'downArrowv2': "material-symbols:arrow-drop-down",
  logout: "line-md:log-out",
  star: "mdi:star-outline",
  'starV2': "iconoir:star-solid",
  edit: "akar-icons:edit",
  plus: "icons8:plus",
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
  shipmentLabel: "hugeicons:label",
  shipmentTrack: "hugeicons:van",
}
export const socialLinks = [
  { href: "https://www.facebook.com/Buzinessify/", icon: <FBSVG /> },
  { href: "https://www.instagram.com/buzinessify/", icon: <InstaSVG /> },
  { href: "https://twitter.com", icon: <XSVG /> },
  // { href: "https://www.linkedin.com", icon: <INSVG /> },
  // { href: "https://www.youtube.com", icon: <YoutubeSVG /> },
];
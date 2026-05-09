import {
  Bot,
  BriefcaseBusiness,
  Code2,
  CreditCard,
  Database,
  Globe2,
  Mail,
  Map,
  Navigation,
  Phone,
  Smartphone,
  Zap,
} from "lucide-react";

export type ProjectCategory = "Mobile" | "Web" | "Admin Panel";

export type Project = {
  title: string;
  slug: string;
  category: ProjectCategory;
  filter: "React Native" | "Flutter" | "React.js" | "PHP";
  shortDescription: string;
  longDescription: string;
  stack: string[];
  features: string[];
  year: string;
  order: number;
  visible: boolean;
  accent: string;
  demoUrl?: string;
  githubUrl?: string;
};

export const profile = {
  name: "Sanjay Solanki",
  role: "React Native | React.js | Flutter | Node.js | PHP Developer",
  location: "Bikaner, Rajasthan",
  availability: "Available for Remote Work",
  email: "sanjay.solanki1619@gmail.com",
  phone: "+91 7231859706",
  github: "https://github.com/sanjaysolanki2000",
  linkedin: "https://linkedin.com/in/sanjay-solanki-b41040250",
  education: {
    degree: "Bachelor of Computer Applications (B.C.A.)",
    university: "Maharaja Ganga Singh University",
    year: "2021",
  },
  stats: [
    { value: "3+", label: "Years of Experience" },
    { value: "8+", label: "Apps Shipped" },
    { value: "5+", label: "Payment Gateways Integrated" },
    { value: "10+", label: "Tech Skills Mastered" },
  ],
};

export const socialLinks = [
  { label: "GitHub", href: profile.github, icon: Code2 },
  { label: "LinkedIn", href: profile.linkedin, icon: BriefcaseBusiness },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export const techStack = [
  "React Native",
  "Flutter",
  "React.js",
  "Node.js",
  "MongoDB",
  "PHP",
  "Socket.IO",
  "Firebase",
  "Google Maps",
  "Stripe",
  "Razorpay",
  "Git",
];

export const skillGroups = [
  {
    title: "Mobile Development",
    skills: ["React Native", "Flutter", "Dart"],
    icon: Smartphone,
  },
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind", "Material UI"],
    icon: Code2,
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "PHP", "CodeIgniter"],
    icon: Database,
  },
  {
    title: "State Management",
    skills: ["Redux", "Redux-Saga", "MobX", "Provider"],
    icon: Zap,
  },
  {
    title: "Databases & Tools",
    skills: ["MySQL", "MongoDB", "Git", "Jira"],
    icon: Globe2,
  },
  {
    title: "Integrations",
    skills: ["Google Maps", "Socket.IO", "Firebase", "Stripe", "Razorpay", "CCAvenue", "Cashfree"],
    icon: CreditCard,
  },
];

export const experience = {
  company: "ITech Solutions",
  role: "React Native & React.js Developer",
  period: "December 2022 - Present",
  points: [
    "Built and shipped production mobile apps across e-commerce, tracking, services, and admin workflows.",
    "Integrated payment gateways including Stripe, Razorpay, CCAvenue, and Cashfree.",
    "Delivered real-time location tracking with Google Maps and Socket.IO for field operations.",
    "Collaborated remotely on Certinate, a certificate management platform built with React.js, MobX, and Material UI.",
    "Implemented REST API integrations, push notifications, exports, and AI chatbot features.",
  ],
};

export const projects: Project[] = [
  {
    title: "EEE Teams",
    slug: "eee-teams",
    category: "Mobile",
    filter: "Flutter",
    shortDescription: "Team operations app with API-driven workflows and fast mobile screens.",
    longDescription:
      "EEE Teams helps field and internal teams coordinate day-to-day tasks through a clean Flutter experience. I focused on reliable API integration, efficient screen flows, and stable data handling for production usage. The result is a practical mobile tool that keeps team activity accessible and easy to act on.",
    stack: ["Flutter", "Dart", "REST API"],
    features: ["Structured task flows", "REST API integration", "Responsive Flutter UI", "Production-ready error states"],
    year: "2023",
    order: 1,
    visible: true,
    accent: "#6C63FF",
  },
  {
    title: "Apna Ghar Gaadi",
    slug: "apna-ghar-gaadi",
    category: "Mobile",
    filter: "Flutter",
    shortDescription: "Flutter app for vehicle and home-service discovery workflows.",
    longDescription:
      "Apna Ghar Gaadi brings service discovery and user activity into a lightweight mobile interface. I built Flutter screens, connected backend APIs, and kept the experience smooth across common Android devices. The app prioritizes simple browsing, dependable requests, and low-friction interactions.",
    stack: ["Flutter", "Dart", "REST API"],
    features: ["Service listings", "API-backed detail screens", "Mobile-first layout", "Form validation"],
    year: "2023",
    order: 2,
    visible: true,
    accent: "#00A3CC",
  },
  {
    title: "MarineConnectApp",
    slug: "marine-connect-app",
    category: "Mobile",
    filter: "Flutter",
    shortDescription: "Marine services app with payments and AI chatbot assistance.",
    longDescription:
      "MarineConnectApp combines service discovery, payment flows, and AI-powered assistance in a Flutter application. I worked on app screens, Stripe integration, REST API wiring, and chatbot interactions. The product balances transactional reliability with helpful automation for users who need quick answers.",
    stack: ["Flutter", "Dart", "Stripe", "AI Chatbot"],
    features: ["Stripe payment flow", "AI chatbot integration", "Service request lifecycle", "Clean mobile navigation"],
    year: "2024",
    order: 3,
    visible: true,
    accent: "#21C55D",
  },
  {
    title: "Touch LCD Baba",
    slug: "touch-lcd-baba",
    category: "Mobile",
    filter: "React Native",
    shortDescription: "React Native commerce app connected to WordPress APIs.",
    longDescription:
      "Touch LCD Baba is a React Native shopping experience powered by WordPress data. I implemented Redux-Saga driven async flows, product browsing, and order-related user journeys. The work centered on keeping the app predictable while interacting with a CMS-backed commerce stack.",
    stack: ["React Native", "Redux-Saga", "WordPress"],
    features: ["Product browsing", "Redux-Saga flows", "WordPress API integration", "Order journey screens"],
    year: "2024",
    order: 4,
    visible: true,
    accent: "#F59E0B",
  },
  {
    title: "Uphaar Online",
    slug: "uphaar-online",
    category: "Mobile",
    filter: "React Native",
    shortDescription: "WooCommerce-powered gifting and shopping mobile app.",
    longDescription:
      "Uphaar Online turns WooCommerce catalog and checkout flows into a polished React Native app. I worked on Redux state, cart interactions, API data shaping, and user-facing screens. The app supports a familiar shopping flow with mobile-friendly performance and feedback.",
    stack: ["React Native", "Redux", "WooCommerce"],
    features: ["Catalog browsing", "Cart state management", "WooCommerce APIs", "Checkout screens"],
    year: "2024",
    order: 5,
    visible: true,
    accent: "#EF4444",
  },
  {
    title: "Delivery Boy App",
    slug: "delivery-boy-app",
    category: "Mobile",
    filter: "React Native",
    shortDescription: "Real-time delivery tracking app using maps and sockets.",
    longDescription:
      "Delivery Boy App gives delivery staff the tools to manage assigned orders and share live movement updates. I integrated Google Maps, Socket.IO, and Redux workflows for location-aware operations. The experience is built for speed, clarity, and dependable real-time state.",
    stack: ["React Native", "Redux", "Google Maps", "Socket.IO"],
    features: ["Live location tracking", "Order assignment flow", "Socket.IO updates", "Map-based navigation"],
    year: "2024",
    order: 6,
    visible: true,
    accent: "#14B8A6",
  },
  {
    title: "Bikaner Edge",
    slug: "bikaner-edge",
    category: "Mobile",
    filter: "React Native",
    shortDescription: "Local platform app with map-based real-time workflows.",
    longDescription:
      "Bikaner Edge supports local service and operational workflows through a React Native interface. I contributed to Redux state handling, Google Maps integration, socket-based updates, and API-driven screens. The app was designed around practical field usage and clear task visibility.",
    stack: ["React Native", "Redux", "Google Maps", "Socket.IO"],
    features: ["Realtime status updates", "Google Maps views", "Redux-managed flows", "Production API integration"],
    year: "2024",
    order: 7,
    visible: true,
    accent: "#8B5CF6",
  },
  {
    title: "Certinate",
    slug: "certinate",
    category: "Web",
    filter: "React.js",
    shortDescription: "Certificate management platform built with React.js and MobX.",
    longDescription:
      "Certinate is a web platform for managing certificate workflows with a structured admin experience. I worked remotely on React.js interfaces, MobX state, Material UI components, and data-driven screens. The project strengthened my remote collaboration rhythm and sharpened my approach to maintainable web dashboards.",
    stack: ["React.js", "MobX", "Material UI"],
    features: ["Certificate management", "MobX state stores", "Material UI screens", "Remote collaboration workflow"],
    year: "2025",
    order: 8,
    visible: true,
    accent: "#0EA5E9",
  },
  {
    title: "Lotus",
    slug: "lotus",
    category: "Web",
    filter: "PHP",
    shortDescription: "PHP and CodeIgniter web system with Google Maps features.",
    longDescription:
      "Lotus is a CodeIgniter-based web application with location-aware workflows. I handled PHP development, Google Maps integration, and backend-driven interface behavior. The system focuses on dependable admin operations and straightforward data management.",
    stack: ["PHP", "CodeIgniter", "Google Maps"],
    features: ["CodeIgniter modules", "Google Maps integration", "Admin workflows", "Server-rendered PHP screens"],
    year: "2023",
    order: 9,
    visible: true,
    accent: "#A855F7",
  },
  {
    title: "Bikaner Edge Admin",
    slug: "bikaner-edge-admin",
    category: "Admin Panel",
    filter: "PHP",
    shortDescription: "Admin panel for managing Bikaner Edge operations.",
    longDescription:
      "Bikaner Edge Admin powers operational control for the Bikaner Edge platform. I built PHP and CodeIgniter screens for managing users, location data, and process visibility. The admin experience complements the mobile app with practical oversight tools.",
    stack: ["PHP", "CodeIgniter", "Google Maps"],
    features: ["Admin data tables", "Location management", "CodeIgniter backend", "Operational controls"],
    year: "2024",
    order: 10,
    visible: true,
    accent: "#06B6D4",
  },
];

export const contactMethods = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "Bikaner, Rajasthan - Open to Remote Worldwide", href: "#", icon: Navigation },
  { label: "Google Maps, Firebase, Socket.IO ready", href: "#", icon: Map },
  { label: "AI chatbot integration experience", href: "#", icon: Bot },
];

// data/caseStudies.ts
import { CaseStudies } from "@/types/caseStudy";

// data/caseStudies.ts
export const caseStudies: CaseStudies = {
  golfview_site: {
    title: "Golf View — Public Website",
    description:
      "Institutional website for Golf View Apartments in Maputo, Mozambique. Built to present the property to prospective guests with a polished visual experience, interactive maps, and a direct contact and reservation inquiry form.",
    challenge:
      "The client needed a professional online presence that could compete with established hospitality platforms. The site had to load fast, look polished on all devices, accurately represent the apartments with high-quality imagery, and convert visitors into direct reservation inquiries — reducing dependency on Airbnb and Booking.com commissions.",
    approach: [
      "Built with Next.js 15 using static rendering for maximum performance and SEO on all public pages",
      "Integrated Google Maps API for an interactive location embed showing the exact property coordinates",
      "Connected AWS S3 + IAM for structured image storage, with public read access scoped to the site's asset folders",
      "Implemented a contact and reservation inquiry form using Server Actions and Hostinger SMTP for transactional email delivery",
      "Deployed on Vercel with automatic Git-based deploys, SSL, and global edge delivery",
      "Shares the same PostgreSQL database (Supabase) as the admin dashboard — enquiry data flows directly into the management system",
    ],
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Google Maps API",
      "AWS S3",
      "Hostinger SMTP",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "Vercel",
    ],
    results: [
      "Live at golfviewapartmentsmz.com with full production deployment",
      "Reduced direct inquiry friction with an integrated contact form tied to email notifications",
      "Sub-2s page load times on mobile via static rendering and Vercel edge network",
      "Apartment gallery served from AWS S3 with IAM-controlled public access",
      "Interactive map with exact property location via Google Maps API",
      "Shared data layer with the admin dashboard — zero duplication of guest or reservation data",
    ],
    github: null,
    live: "https://golfviewapartmentsmz.com",
    image: "/golfview.png",
    dashboardImages: [
      "/dashboards/golfview-dashboard-1.png",
      "/dashboards/golfview-dashboard-2.png",
      "/dashboards/golfview-dashboard-3.png",
    ],
  },

  golfview_dashboard: {
    title: "Golf View — Admin Dashboard",
    description:
      "Internal operations dashboard for Golf View Apartments. A secure, role-based management system handling reservations, guest records, apartment availability, and multi-platform calendar synchronisation with Airbnb and Booking.com.",
    challenge:
      "The property receives bookings from multiple channels — direct, Airbnb, and Booking.com — and staff needed a single system to manage them without double-bookings or data inconsistencies. The dashboard also had to be secure enough to restrict access to authorised devices only, while remaining easy to use for non-technical reception staff.",
    approach: [
      "Built as a separate Next.js 15 application sharing the same PostgreSQL database as the public site — keeping concerns separated while maintaining a single source of truth",
      "Implemented Auth.js with credentials-based login, JWT sessions, and role-based access control (admin, receptionist, finance)",
      "Deployed a RackNerd VPS running OpenVPN to restrict dashboard access from outside the gestao@ account to office-authorised devices only",
      "Built an ICS sync service on the VPS that polls Airbnb and Booking.com every 15 minutes, preventing booking conflicts without overloading the main application",
      "Used Prisma ORM for all database operations — strongly typed, with versioned migrations to safely evolve the schema over time",
      "Scoped AWS S3 IAM permissions so the dashboard has private asset access while the public site only reads apartment photos",
    ],
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Auth.js",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "AWS S3",
      "RackNerd VPS",
      "OpenVPN",
      "Vercel",
    ],
    results: [
      "Live at dashboard.golfviewapartmentsmz.com, restricted to authorised users and devices",
      "Multi-channel calendar sync running every 15 minutes — Airbnb and Booking.com reservations appear automatically",
      "Role-based access with three permission levels: admin, receptionist, and finance",
      "Zero double-bookings since launch due to real-time availability tracking across all platforms",
      "VPN-enforced access control prevents unauthorised logins from outside the office network",
      "Billing module currently in active development",
    ],
    dashboardFeatures: [
      "Reservation management across all channels",
      "Real-time availability calendar",
      "Guest records and history",
      "Multi-role access control (admin / receptionist / finance)",
      "Airbnb & Booking.com ICS sync every 15 min",
      "Automated booking confirmation emails",
      "VPN-restricted access via OpenVPN",
      "Billing module (in development)",
    ],
    github: null,
    live: "https://dashboard.golfviewapartmentsmz.com",
    image: "/golfview.png",
    dashboardImages: [
      "/dashboards/golfview-dashboard-1.png",
      "/dashboards/golfview-dashboard-2.png",
      "/dashboards/golfview-dashboard-3.png",
    ],
  },

  infinity: {
    title: "Infinity Health Product System",
    description:
      "A healthcare product system with smart catalog, supplier management dashboard, and automated notifications.",
    challenge:
      "Healthcare suppliers needed a more efficient way to manage product catalogs and respond to quote requests. No centralized system for tracking supplier performance.",
    approach: [
      "Developed a smart catalog system with dynamic filters and optimized search",
      "Built a comprehensive supplier dashboard for product and quote management",
      "Implemented a quote request system with automated supplier notifications",
      "Created newsletter subscription for product updates and promotions",
      "Built an intuitive admin interface with analytics and reporting tools",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "TypeScript",
      "React Table",
    ],
    results: [
      "Reduced response time to quote requests by 60% through dashboard automation",
      "Improved product discoverability with advanced filtering and search analytics",
      "Increased customer engagement through newsletter updates tracked in dashboard",
      "Streamlined supplier management processes with centralized dashboard",
      "Dashboard insights helped identify top-performing products increasing sales by 20%",
    ],
    dashboardFeatures: [
      "Supplier performance analytics",
      "Quote request tracking system",
      "Product catalog management",
      "Sales performance dashboard",
      "Customer engagement metrics",
      "Inventory management views",
      "Automated reporting tools",
      "Multi-vendor dashboard",
    ],
    github: null,
    live: "https://catalogo.infinityhealth.co.mz/",
    image: "/infinity.png",
    dashboardImages: [
      "/dashboards/infinity-dashboard-1.png",
      "/dashboards/infinity-dashboard-2.png",
      "/dashboards/infinity-dashboard-3.png",
    ],
  },

  horuswave: {
    title: "Horuswave Website",
    description:
      "The official website for Horuswave, a software development agency delivering modern digital solutions.",
    challenge:
      "Create a professional and multilingual website that communicates the company's services, mission, and vision effectively while maintaining high performance and responsive design.",
    approach: [
      "Developed a static multi-language website with Next.js and Next-Intl",
      "Designed a clean and modern UI with Tailwind CSS and animations",
      "Built responsive layouts optimized for both desktop and mobile",
      "Implemented SEO best practices for better discoverability",
      "Deployed on a reliable hosting environment for performance and uptime",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Next-Intl",
      "Three.js",
    ],
    results: [
      "Launched a professional digital presence for Horuswave",
      "Improved brand visibility and credibility",
      "Delivered a scalable and easy-to-maintain website",
      "Enhanced user experience with smooth animations and responsive design",
    ],
    github: null,
    live: "https://www.horuswave.com",
    image: "/horuswave.png",
  },

  opticavisual: {
    title: "Óptica Visual Website",
    description:
      "A modern website for Óptica Visual, an optical clinic in Mozambique, showcasing their services, product catalog, clinic location, and online appointment booking.",
    challenge:
      "The client needed a professional digital presence that clearly presented their optical services and product range, allowed customers to book consultations online, and made it easy to find the clinic — all while reflecting the trust and care expected from a healthcare brand.",
    approach: [
      "Designed a clean, professional UI aligned with healthcare and optical branding standards",
      "Built a service and product showcase with clear navigation and visual hierarchy",
      "Implemented online appointment booking functionality for scheduling visits",
      "Integrated map and location details for easy clinic accessibility",
      "Applied SEO best practices to improve local discoverability",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Next-Intl",
    ],
    results: [
      "Live at opticavisual.co.mz with full production deployment",
      "Established a professional online presence for the clinic",
      "Customers can explore services, browse products, and book appointments directly online",
      "SEO-optimised pages improve discoverability in local search results",
    ],
    github: null,
    live: "https://www.opticavisual.co.mz",
    image: "/opticavisual.png",
  },
};

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const clientDist = path.join(rootDir, "client", "dist");
const rootDist = path.join(rootDir, "dist");

// Metadata map for all public indexable routes
const routesData = [
  {
    path: "/",
    title: "Taxi Service in Amb Andaura & Una | Cab Booking | Mandyal Tour & Travels",
    description:
      "Book reliable 24/7 taxi service in Amb Andaura & Una, Himachal Pradesh. Verified cabs for Amb Andaura Railway Station (AADR) Vande Bharat Express, Maa Chintpurni yatra, Dharamshala, Kangra & outstation trips with Mandyal Tour and Travels.",
  },
  {
    path: "/taxi-services",
    title: "Taxi Services in Amb Andaura & Una | Local & Outstation Taxi | Mandyal Tour & Travels",
    description:
      "Local and outstation taxi services from Amb Andaura and Una covering city rides, railway and airport transfers, and Himachal routes with Mandyal Tour & Travels.",
  },
  {
    path: "/taxi-service-una",
    title: "Taxi Service in Una Himachal Pradesh | 24/7 Cab Booking | Mandyal Tour and Travels",
    description:
      "Book 24/7 verified taxi service in Una with Mandyal Tour & Travels (Prem Nagar). Reliable cabs for Una Railway Station, Amb Andaura Vande Bharat, Devi Darshan yatra, Chandigarh Airport, & Himachal tours.",
  },
  {
    path: "/taxi-service-amb",
    title: "Taxi Service in Amb Andaura & Amb Indora | 24/7 Cab Booking | Mandyal Tour & Travels",
    description:
      "Book 24/7 verified taxi service in Amb & Amb Andaura (often searched as Amb Indora). Guaranteed platform pickups for AADR Vande Bharat Express, Maa Chintpurni yatra, Dharamshala, Kangra & outstation cabs with Mandyal Tour and Travels.",
  },
  {
    path: "/amb-andaura-railway-station-taxi",
    title: "Amb Andaura Taxi Service | Amb Indora Railway Station Cab Booking | Mandyal Tour & Travels",
    description:
      "Pre-book 24/7 verified taxi at Amb Andaura (Amb Indora) Railway Station (AADR). Meet & greet platform pickup for Vande Bharat Express & Himachal Express to Dharamshala, Maa Chintpurni, Kangra, & Manali.",
  },
  {
    path: "/outstation-taxi",
    title: "Outstation Taxi from Una & Amb | Himachal Hill Cabs | Mandyal Tour and Travels",
    description:
      "Book 24/7 outstation taxi from Una and Amb Andaura with Mandyal Tour & Travels. Verified commercial cabs for Shimla, Manali, Dharamshala, Dalhousie, Chandigarh & Delhi NCR. Best rate guarantee with expert hill chauffeurs.",
  },
  {
    path: "/airport-transfers",
    title: "Airport Taxi & Transfers from Una | Chandigarh & Delhi Airport Cabs | Mandyal Tour and Travels",
    description:
      "24/7 airport taxi service from Una and Amb. On-time doorstep pickups for Chandigarh Airport (IXC), Delhi IGI (DEL T1/T2/T3), Amritsar (ATQ), & Kangra (DHM). Flight delay monitoring, luggage support, & best rate guarantee.",
  },
  {
    path: "/fleet",
    title: "Rental Cab in Una and Amb | Taxi Fleet & Booking | Mandyal Tour & Travels",
    description:
      "Book verified rental cab in Una and Amb Andaura with Mandyal Tour & Travels. Best rates for Innova Crysta, Ertiga, Dzire, Fortuner, and Tempo Travellers.",
  },
  {
    path: "/tour-packages",
    title: "Himachal Tour Packages, 12 Jyotirlinga & 6 Devi Darshan Yatra from Una | Mandyal Tour and Travels",
    description:
      "Customized tour packages from Una and Amb. 6 Devi Darshan yatra (Baglamukhi & Naina Devi included), 12 Jyotirlinga Darshan, Spiti Valley circuit, Shimla Manali, Dalhousie, Kashmir, and Leh Ladakh with private cabs and expert mountain chauffeurs.",
  },
  {
    path: "/char-dham",
    title: "Char Dham Yatra, 12 Jyotirlinga & 6 Devi Darshan | Mandyal Tour and Travels",
    description:
      "Book sacred Char Dham Yatra (Yamunotri, Gangotri, Kedarnath, Badrinath), 12 Jyotirlinga Yatra, & Himachal 6 Devi Darshan from Una. Verified private cabs, expert hill chauffeurs, & best rate guarantee.",
  },
  {
    path: "/short-trips",
    title: "Short Trips & Weekend Getaways from Una | Day Cabs | Mandyal Tour and Travels",
    description:
      "Explore best same-day short trips & weekend getaways from Una & Amb. Cabs for Bhakra Dam, Anandpur Sahib, Chintpurni, Jwala Ji, & Dharamshala. Best rate guarantee.",
  },
  {
    path: "/destinations",
    title: "Destinations & Popular Taxi Routes from Una | Mandyal Tour & Travels",
    description:
      "Popular taxi routes and destinations from Una, Himachal Pradesh, including Shimla, Manali, Dharamshala, Dalhousie and more.",
  },
  {
    path: "/travel-guide",
    title: "Himachal Travel Guide & Road Trip Ideas | Mandyal Tour & Travels",
    description:
      "Travel guides and road trip planning tips for journeys from Una into Himachal Pradesh and neighbouring regions.",
  },
  {
    path: "/about",
    title: "About Us | Mandyal Tour & Travels Una | Govt Approved Himachal Taxi Operator",
    description:
      "Discover Mandyal Tour & Travels (Mandyal Motors) in Prem Nagar, Una, Himachal Pradesh. Founded by Manoj Mandyal with trusted mountain driving, commercial tourist fleet, 6 Devi Darshan circuits & 24/7 outstation cabs.",
  },
  {
    path: "/contact",
    title: "Contact Us & Taxi Booking Una HP | Mandyal Tour & Travels | 24/7 Cab Helpline",
    description:
      "Contact Mandyal Tour & Travels (Prem Nagar, Una HP). Call Manoj Mandyal at +91 7807481503 for instant taxi booking, Amb Andaura Vande Bharat pickup, outstation cabs & Himachal tour packages.",
  },
  // Route Taxis
  {
    path: "/una-to-shimla-taxi",
    title: "Una to Shimla Taxi Service | Best Fares & Innova Cabs | Mandyal Tour and Travels",
    description:
      "Book reliable Una to Shimla taxi service with Mandyal Tour & Travels. Best rates for Innova Crysta, Dzire, Ertiga. Covers Bilaspur, Mall Road, and Kufri.",
  },
  {
    path: "/una-to-manali-taxi",
    title: "Una to Manali Taxi Service | Atal Tunnel & Solang Cabs | Mandyal Tour and Travels",
    description:
      "Hire Una to Manali taxi at lowest per-km rates. Certified mountain chauffeurs for Kullu, Solang Valley, Rohtang Pass, and Atal Tunnel Sissu.",
  },
  {
    path: "/una-to-dharamshala-taxi",
    title: "Una to Dharamshala Taxi Service | McLeodganj Cab Booking | Mandyal Tour and Travels",
    description:
      "Punctual Una to Dharamshala and McLeodganj taxi service. Direct platform pickup from Amb Andaura Vande Bharat station to HPCA and Dalai Lama Temple.",
  },
  {
    path: "/una-to-dalhousie-taxi",
    title: "Una to Dalhousie Taxi Service | Khajjiar Sightseeing Cabs | Mandyal Tour and Travels",
    description:
      "Book comfortable Una to Dalhousie taxi for Khajjiar Switzerland of India, Dainkund Peak, and Kalatop sanctuary. Clean AC cabs and expert drivers.",
  },
  {
    path: "/una-to-kangra-taxi",
    title: "Una to Kangra Taxi Service | Brajeshwari & Chamunda Devi Cab | Mandyal Tour and Travels",
    description:
      "Affordable Una to Kangra taxi service for temple pilgrimage, Kangra Fort, and Gaggal Airport. Round-the-clock dispatch with commercial yellow plate cabs.",
  },
  {
    path: "/una-to-amritsar-taxi",
    title: "Una to Amritsar Taxi Service | Golden Temple & Wagah Border | Mandyal Tour and Travels",
    description:
      "Fast highway taxi from Una to Amritsar Golden Temple and Wagah Border parade ceremony. Same-day return and multi-day packages with transparent billing.",
  },
  {
    path: "/una-to-chandigarh-taxi",
    title: "Una to Chandigarh Taxi Service | Airport & PGI Transfer Cab | Mandyal Tour and Travels",
    description:
      "24/7 dedicated Una to Chandigarh taxi service. Guaranteed on-time flight transfers for Shaheed Bhagat Singh Airport (IXC), PGI Hospital, and Sector 17.",
  },
  {
    path: "/una-to-katra-taxi",
    title: "Una to Katra Vaishno Devi Taxi | Direct Yatra Cab Service | Mandyal Tour and Travels",
    description:
      "Book sacred Una to Katra Vaishno Devi taxi service. Reliable long-distance cabs, 2-day and 3-day waiting yatra packages including Shivkhori cave shrine.",
  },
];

function generatePreRenderedPages() {
  const baseIndexPath = path.join(clientDist, "index.html");
  if (!fs.existsSync(baseIndexPath)) {
    console.error("Base dist/index.html not found! Run vite build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseIndexPath, "utf8");
  console.log(`==> Pre-rendering SEO HTML for ${routesData.length} routes...`);

  routesData.forEach((route) => {
    if (route.path === "/") return; // Root index.html already present

    const pageCanonical = `https://mandyaltourandtravels.in${route.path}`;

    // Custom crawler SEO tags for this route
    let modifiedHtml = baseHtml;

    // Replace <title>
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/s,
      `<title>${route.title}</title>`
    );

    // Replace meta description
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/>/s,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace canonical
    modifiedHtml = modifiedHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/>/s,
      `<link rel="canonical" href="${pageCanonical}" />`
    );

    // Replace og:title & twitter:title
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/>/s,
      `<meta property="og:title" content="${route.title}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/s,
      `<meta name="twitter:title" content="${route.title}" />`
    );

    // Replace og:description & twitter:description
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/>/s,
      `<meta property="og:description" content="${route.description}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/s,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // Replace og:url
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/>/s,
      `<meta property="og:url" content="${pageCanonical}" />`
    );

    // Pre-seed crawler content inside #root
    const crawlerContent = `
      <div id="seo-prerender-stub" style="display:none;" aria-hidden="true">
        <h1>${route.title}</h1>
        <p>${route.description}</p>
        <p>Book 24/7 Verified Taxi in Una and Amb Andaura with Mandyal Tour & Travels. Call: +91 7807481503.</p>
      </div>
    `;
    modifiedHtml = modifiedHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${crawlerContent}</div>`
    );

    // Directory path in client/dist
    const routeDirName = route.path.replace(/^\//, "");
    const targetDir = path.join(clientDist, routeDirName);
    fs.mkdirSync(targetDir, { recursive: true });

    const targetFile = path.join(targetDir, "index.html");
    fs.writeFileSync(targetFile, modifiedHtml, "utf8");
  });

  console.log(`==> Successfully pre-rendered ${routesData.length - 1} sub-route HTML files!`);
}

generatePreRenderedPages();

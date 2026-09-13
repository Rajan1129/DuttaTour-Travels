import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import {
  business as initialBusiness,
  fleet as initialFleet,
  destinations as initialDestinations,
  tourPackages as initialTourPackages,
  stats as initialStats,
  testimonials as initialTestimonials,
  whatsappLink,
  saveBusiness,
  saveFleet,
  saveDestinations,
  saveTourPackages,
  saveStats,
  saveTestimonials,
  resetAllData,
} from "../../data/business";

// Preset Image Libraries for Select Dropdowns
const fleetPresets = [
  { label: "Toyota Innova Crysta (6+1 Seats)", value: "/images/fleet/innova-crysta.jpg" },
  { label: "Maruti Ertiga (6+1 Seats)", value: "/images/fleet/maruti-ertiga.jpg" },
  { label: "Swift Dzire / Sedan (4+1 Seats)", value: "/images/fleet/swift-dzire.jpg" },
  { label: "Force Urbania Luxury Van (10-14 Seats)", value: "/images/fleet/force-urbania.jpg" },
  { label: "Tempo Traveller (12-26 Seater)", value: "/images/fleet/tempo-traveller.jpg" },
  { label: "Toyota Fortuner 4x4 Luxury SUV", value: "/images/fleet/fortuner-4x4.jpg" },
];

const destinationPresets = [
  { label: "Shimla Hill Station (Mall Road / Kufri)", value: "/images/destinations/shimla.jpg" },
  { label: "Manali & Solang Valley (Atal Tunnel)", value: "/images/destinations/manali.jpg" },
  { label: "Dharamshala & McLeodganj (Dalai Lama)", value: "/images/destinations/dharamshala.jpg" },
  { label: "Dalhousie & Khajjiar (Switzerland of India)", value: "/images/destinations/dalhousie.jpg" },
  { label: "Kangra Valley & Brajeshwari Devi Temple", value: "/images/destinations/kangra.jpg" },
  { label: "Amritsar Golden Temple & Wagah Border", value: "/images/destinations/amritsar.jpg" },
  { label: "Chandigarh City & Airport (IXC)", value: "/images/destinations/chandigarh.jpg" },
  { label: "Katra Mata Vaishno Devi Shrine", value: "/images/destinations/katra.jpg" },
];

const tourPresets = [
  { label: "4 Char Devi Darshan Yatra (Chintpurni, Jwala Ji, Kangra, Chamunda)", value: "/images/tours/4-char-devi-darshan.jpg" },
  { label: "Una with Dalhousie & Dharamshala (3N/4D)", value: "/images/tours/una-dalhousie-dharamshala.jpg" },
  { label: "Una - Manali to Shimla Tour (4N/5D)", value: "/images/tours/una-manali-shimla.jpg" },
  { label: "Grand Himachal Circuit (7N/8D)", value: "/images/tours/shimla-manali-dharamshala-dalhousie.jpg" },
  { label: "Kashmir & Katra Package (7N/8D)", value: "/images/tours/kashmir-katra.jpg" },
  { label: "Leh Ladakh High Altitude Expedition (5N/6D)", value: "/images/tours/leh-ladakh.jpg" },
];

const initialArticles = [
  {
    id: "art-1",
    title: "Complete Guide to 4 Devi Darshan Yatra from Una & Amb",
    slug: "4-devi-darshan-yatra-guide",
    category: "Pilgrimage & Temples",
    h1: "Una to 4 Devi Darshan: Chintpurni, Jwala Ji, Kangra & Chamunda Yatra Guide",
    description:
      "A complete guide for devotees planning the sacred 4 Devi Darshan pilgrimage starting from Una and Amb Andaura. Temple timings, routes, VIP slips, and cab booking tips.",
    seoTitle: "4 Devi Darshan Yatra Guide from Una | Chintpurni, Jwala Ji Cab | Dutta Travels",
    seoDescription:
      "Complete pilgrimage guide for 4 Devi Darshan from Una & Amb Andaura. Covering Maa Chintpurni, Jwala Ji, Brajeshwari Kangra, and Chamunda Devi with verified hill cabs.",
    featuredImage: "/images/tours/4-char-devi-darshan.jpg",
    published: true,
    createdAt: "2026-03-10",
    contentHtml: `
      <h2>The Sacred Devi Circuit of Himachal Pradesh</h2>
      <p>Every year, lakhs of devotees travel to Una and Amb to embark on the sacred 4 Devi Darshan yatra. Situated in the Shivalik and Dhauladhar foothills, these ancient Shaktipeeths are revered for granting divine blessings.</p>
      
      <h3>1. Maa Chintpurni Devi (Una District)</h3>
      <p>Located roughly 52 km from Una and only 26 km from Amb Andaura Railway Station, Maa Chintpurni fulfills the deepest wishes of devotees. Best visited in the early morning before peak crowds gather.</p>
      
      <h3>2. Maa Jwala Ji (Kangra District)</h3>
      <p>Around 35 km ahead of Chintpurni, Jwala Ji is famous for the eternal nine sacred natural flames that burn without any fuel. It is an awe-inspiring spiritual experience for the entire family.</p>
      
      <h3>3. Maa Brajeshwari Devi (Kangra Town)</h3>
      <p>Located near the historic Kangra Fort, this ancient Shaktipeeth represents the divine maternal protection of Goddess Durga. Temple trusts provide streamlined queue facilities for elderly devotees.</p>
      
      <h3>4. Maa Chamunda Devi (Dharamshala Road)</h3>
      <p>Set along the serene Baner river against the snow-capped Dhauladhar peaks, Maa Chamunda is the fierce protector deity. The peaceful temple complex is the perfect concluding shrine of the 4 Devi darshan circuit.</p>
      
      <h3>Recommended Cab Booking & Itinerary</h3>
      <p>Dutta Tour & Travel operates specialized same-day return and 2-day relaxed Devi Darshan circuits with certified local mountain chauffeurs. Book your Innova Crysta or Ertiga directly from Prem Nagar Una or Amb Andaura station.</p>
    `,
  },
  {
    id: "art-2",
    title: "Amb Andaura Vande Bharat Express: Platform Arrival & Taxi Guide",
    slug: "amb-andaura-vande-bharat-taxi-guide",
    category: "Train & Airport Transfers",
    h1: "Amb Andaura (AADR) Vande Bharat: Arrival Timings, Platform Pickup & Taxi Guide",
    description:
      "Practical travel guide for passengers arriving on the New Delhi - Amb Andaura Vande Bharat Express (22447). Platform meet-and-greet, onward taxi options to Dharamshala, Chintpurni, and Manali.",
    seoTitle: "Amb Andaura Vande Bharat Taxi Guide | Platform Cab Booking | Dutta Travels",
    seoDescription:
      "Arriving on Vande Bharat at Amb Andaura (AADR)? Learn about platform taxi pickup, onward travel times to Dharamshala, Chintpurni, Kangra, and best cab options.",
    featuredImage: "/images/destinations/dharamshala.jpg",
    published: true,
    createdAt: "2026-03-08",
    contentHtml: `
      <h2>The Fastest Rail Link to Himachal Pradesh</h2>
      <p>The New Delhi - Amb Andaura Vande Bharat Express (Train No. 22447) has revolutionized travel to Himachal Pradesh, arriving at Amb Andaura station at 11:05 AM after a smooth 5-hour journey from the capital.</p>
      
      <h3>Onward Destinations & Drive Times from Amb Andaura:</h3>
      <ul>
        <li><strong>Maa Chintpurni Shrine:</strong> 26 km (~35 minutes via NH-503)</li>
        <li><strong>Dharamshala & McLeodganj:</strong> 115 km (~3 hours via Kangra Valley)</li>
        <li><strong>Jwala Ji Temple:</strong> 60 km (~1 hour 15 minutes)</li>
        <li><strong>Kullu-Manali:</strong> 240 km (~6.5 hours via Kiratpur-Nerchowk expressway)</li>
      </ul>
      
      <h3>Why Pre-Book Your Station Chauffeur with Dutta Travels?</h3>
      <p>Because Amb Andaura is a terminal rural railway station, local walk-up taxis can be limited during weekend peak rushes. Dutta Tour & Travel provides confirmed platform pickups with flight/train delay monitoring, sanitized yellow-plate cars, and courteous local pahadi drivers.</p>
    `,
  },
  {
    id: "art-3",
    title: "Una to Manali via Kiratpur 4-Lane: Scenic Road Trip & Ghat Advice",
    slug: "una-to-manali-road-trip-guide",
    category: "Hill Driving & Weather",
    h1: "Una to Manali Road Trip Guide: Kiratpur 4-Lane, Atal Tunnel & Mountain Driving Tips",
    description:
      "Essential guide for travelers driving from Una to Kullu, Manali, and Atal Tunnel Sissu. Route conditions, new 4-lane expressway updates, and hill safety notes.",
    seoTitle: "Una to Manali Road Trip & Taxi Guide | Kiratpur 4-Lane | Dutta Travels",
    seoDescription:
      "Plan your Una to Manali taxi journey via the new Kiratpur-Nerchowk 4-lane expressway. Learn travel times, Atal Tunnel access, and scenic stops along the Beas River.",
    featuredImage: "/images/destinations/manali.jpg",
    published: true,
    createdAt: "2026-03-05",
    contentHtml: `
      <h2>Driving the Gateway to the Himalayas</h2>
      <p>With the opening of the Kiratpur-Nerchowk 4-lane expressway, traveling from Una to Manali has become faster, smoother, and far more scenic. Travel time has been cut by nearly 2 hours.</p>
      
      <h3>Key Route Highlights</h3>
      <p>The journey takes you past Govind Sagar Lake, through modern highway tunnels, into Mandi with the roaring Beas River alongside, passing Pandoh Dam, and straight through Kullu into the Solang Valley and Atal Tunnel.</p>
    `,
  },
];

const emptyArticleForm = {
  id: "",
  title: "",
  slug: "",
  category: "Pilgrimage & Temples",
  h1: "",
  description: "",
  seoTitle: "",
  seoDescription: "",
  featuredImage: "/images/destinations/shimla.jpg",
  contentHtml: "",
  published: true,
};

// Reusable Select-or-Drop Image Picker (Theme Adaptive)
function ImagePicker({ label, value, onChange, presets = [], isDark = true }) {
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          className={`block text-xs font-bold uppercase tracking-wide ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label || "Choose or Drop Photo"}
        </label>
        <span className="text-[10px] text-orange-500 font-semibold uppercase">
          Select or Drop (No URL needed)
        </span>
      </div>

      {/* 1. SELECT DROPDOWN FROM PRESETS */}
      {presets.length > 0 && (
        <div>
          <select
            value={presets.some((p) => p.value === value) ? value : ""}
            onChange={(e) => {
              if (e.target.value) onChange(e.target.value);
            }}
            className={`w-full rounded-xl px-3.5 py-2.5 text-xs border focus:border-[#f57c00] focus:outline-none cursor-pointer ${
              isDark
                ? "bg-[#0b101b] text-white border-white/10"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <option value="" disabled>
              -- Click to Select from Available Photos --
            </option>
            {presets.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 2. DRAG & DROP OR FILE BROWSER */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer ${
          dragOver
            ? "border-[#f57c00] bg-[#f57c00]/10"
            : isDark
            ? "border-white/15 hover:border-white/30 bg-[#0b101b]/50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          title="Drop image or click to select"
        />

        <div className="flex flex-col items-center justify-center gap-1 pointer-events-none">
          <span className="material-symbols-outlined text-[24px] text-orange-500">
            cloud_upload
          </span>
          <span
            className={`text-xs font-semibold ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Drop photo here or <span className="text-orange-500 underline">Browse Device</span>
          </span>
          <span className="text-[10px] text-gray-400">JPG, PNG, WEBP</span>
        </div>
      </div>

      {/* 3. LIVE PHOTO PREVIEW */}
      {value && (
        <div
          className={`flex items-center gap-3 p-2 rounded-xl border ${
            isDark
              ? "bg-[#0b101b] border-white/10"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <img
            src={value}
            alt="Selected Preview"
            className="w-16 h-12 object-cover rounded-lg bg-black/10 border border-black/10 shrink-0"
            onError={(e) => {
              e.target.src = "/logo.png";
            }}
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              <span>Photo Attached</span>
            </span>
            <span
              className={`text-xs truncate font-mono ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {value.startsWith("data:") ? "Custom Uploaded Photo" : value}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("dutta_admin_token");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  // Theme State: "dark" | "light"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("dutta_admin_theme") || "dark";
  });

  const isDark = theme === "dark";

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("dutta_admin_theme", next);
  };

  // Theme-aware Style Tokens
  const c = {
    pageBg: isDark ? "bg-[#0b101b] text-gray-200" : "bg-[#f4f6fa] text-gray-800",
    headerBg: isDark ? "bg-[#141b2d] border-white/10" : "bg-white border-gray-200 shadow-sm",
    cardBg: isDark ? "bg-[#141b2d] border-white/10" : "bg-white border-gray-200 shadow-sm",
    cardFooter: isDark ? "bg-[#0e1424] border-white/5" : "bg-gray-50 border-gray-200",
    innerBg: isDark ? "bg-[#0b101b] border-white/5" : "bg-gray-50 border-gray-200",
    input: isDark
      ? "bg-[#0b101b] text-white border-white/10 focus:border-[#f57c00]"
      : "bg-white text-gray-900 border-gray-300 focus:border-[#f57c00]",
    textPrimary: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-400" : "text-gray-600",
    textLabel: isDark ? "text-gray-300" : "text-gray-700",
    border: isDark ? "border-white/10" : "border-gray-200",
    tabInactive: isDark
      ? "bg-[#141b2d] text-gray-400 hover:text-white hover:bg-[#1a233a] border border-white/5"
      : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200",
    modalBg: isDark
      ? "bg-[#141b2d] border-white/10 text-white"
      : "bg-white border-gray-200 text-gray-900 shadow-2xl",
  };

  // Main navigation tab
  const [activeTab, setActiveTab] = useState("overview");

  // Toast message
  const [toast, setToast] = useState("");
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  // 1. Business Profile State
  const [businessData, setBusinessData] = useState(() => ({ ...initialBusiness }));

  // 2. Fleet State
  const [fleetList, setFleetList] = useState(() => [...initialFleet]);
  const [fleetModalOpen, setFleetModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [fleetSearch, setFleetSearch] = useState("");

  // 3. Destinations State
  const [destList, setDestList] = useState(() => [...initialDestinations]);
  const [destModalOpen, setDestModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState(null);
  const [destSearch, setDestSearch] = useState("");

  // 4. Tour Packages State
  const [tourList, setTourList] = useState(() => [...initialTourPackages]);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);

  // 5. Testimonials State
  const [testList, setTestList] = useState(() => [...initialTestimonials]);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);

  // 6. Stats State
  const [statsList, setStatsList] = useState(() => [...initialStats]);

  // 7. Articles (Travel Guide CMS)
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("dutta_admin_articles");
    return saved ? JSON.parse(saved) : initialArticles;
  });
  const [articleForm, setArticleForm] = useState(emptyArticleForm);
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // 8. Inquiries / Dispatch Desk
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem("dutta_admin_inquiries");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "inq-101",
            date: "Today, 10:15 AM",
            name: "Rajesh Kumar",
            phone: "+91 98160-XXXXX",
            pickup: "Amb Andaura Vande Bharat Platform",
            drop: "Chintpurni Devi Shrine",
            car: "Toyota Innova Crysta",
            status: "Confirmed",
          },
          {
            id: "inq-102",
            date: "Yesterday",
            name: "Sunil Sharma",
            phone: "+91 94180-XXXXX",
            pickup: "Prem Nagar, Una",
            drop: "Chandigarh Airport (IXC)",
            car: "Maruti Ertiga",
            status: "Completed",
          },
        ];
  });
  const [newInqName, setNewInqName] = useState("");
  const [newInqPhone, setNewInqPhone] = useState("");
  const [newInqPickup, setNewInqPickup] = useState("Una Prem Nagar");
  const [newInqDrop, setNewInqDrop] = useState("Dharamshala / McLeodganj");
  const [newInqCar, setNewInqCar] = useState("Toyota Innova Crysta");

  // Reset confirmation modal
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Save articles and inquiries to localStorage whenever modified
  useEffect(() => {
    localStorage.setItem("dutta_admin_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("dutta_admin_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // Listen for customer bookings submitted from anywhere on the live website
  useEffect(() => {
    const handleInqUpdate = () => {
      const saved = localStorage.getItem("dutta_admin_inquiries");
      if (saved) {
        setInquiries(JSON.parse(saved));
      }
    };
    window.addEventListener("dutta_inquiries_updated", handleInqUpdate);
    return () => window.removeEventListener("dutta_inquiries_updated", handleInqUpdate);
  }, []);

  // -------------------------------------------------------------
  // BUSINESS HANDLERS
  // -------------------------------------------------------------
  const handleSaveBusiness = (e) => {
    e.preventDefault();
    saveBusiness(businessData);
    showToast("Business profile & contact info saved successfully!");
  };

  // -------------------------------------------------------------
  // FLEET CRUD HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddCar = () => {
    setEditingCar({
      slug: "",
      name: "",
      category: "SUV / MPV",
      group: "suv",
      tag: "SUV / MPV",
      tagColor: "bg-blue-50 text-blue-700",
      imageBadge: "Himachal Hill Certified",
      seats: "6+1 Seats",
      bags: "3 Bags",
      comfort: "AC Cab",
      image: "/images/fleet/innova-crysta.jpg",
      description: "",
    });
    setFleetModalOpen(true);
  };

  const handleOpenEditCar = (car) => {
    setEditingCar({ ...car });
    setFleetModalOpen(true);
  };

  const handleSaveCar = (e) => {
    e.preventDefault();
    if (!editingCar.name.trim()) return;

    let updated;
    const slug =
      editingCar.slug.trim() ||
      editingCar.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");

    const carToSave = { ...editingCar, slug };

    const index = fleetList.findIndex((c) => c.slug === carToSave.slug);
    if (index >= 0) {
      updated = [...fleetList];
      updated[index] = carToSave;
    } else {
      updated = [carToSave, ...fleetList];
    }

    setFleetList(updated);
    saveFleet(updated);
    setFleetModalOpen(false);
    showToast(`Fleet item "${carToSave.name}" updated successfully!`);
  };

  const handleDeleteCar = (slug, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the user fleet page?`)) {
      const updated = fleetList.filter((c) => c.slug !== slug);
      setFleetList(updated);
      saveFleet(updated);
      showToast(`Deleted "${name}" from fleet.`);
    }
  };

  // -------------------------------------------------------------
  // DESTINATIONS CRUD HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddDest = () => {
    setEditingDest({
      slug: "",
      name: "",
      routeTitle: "",
      distanceKm: 100,
      duration: "3 Hours",
      highway: "NH-503",
      startingFare: "Best Rate Guarantee",
      stops: "Local Halt Points",
      image: "/images/destinations/shimla.jpg",
      summary: "",
      keyPlaces: [],
      faqs: [],
    });
    setDestModalOpen(true);
  };

  const handleOpenEditDest = (dest) => {
    setEditingDest({ ...dest, keyPlacesStr: (dest.keyPlaces || []).join(", ") });
    setDestModalOpen(true);
  };

  const handleSaveDest = (e) => {
    e.preventDefault();
    if (!editingDest.name.trim()) return;

    const slug =
      editingDest.slug.trim() ||
      `una-to-${editingDest.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-")}-taxi`;

    const keyPlaces = editingDest.keyPlacesStr
      ? editingDest.keyPlacesStr.split(",").map((s) => s.trim()).filter(Boolean)
      : editingDest.keyPlaces || [];

    const destToSave = {
      ...editingDest,
      slug,
      routeTitle: editingDest.routeTitle || `Una to ${editingDest.name} Taxi Service`,
      keyPlaces,
    };
    delete destToSave.keyPlacesStr;

    let updated;
    const index = destList.findIndex((d) => d.slug === destToSave.slug);
    if (index >= 0) {
      updated = [...destList];
      updated[index] = destToSave;
    } else {
      updated = [destToSave, ...destList];
    }

    setDestList(updated);
    saveDestinations(updated);
    setDestModalOpen(false);
    showToast(`Route "${destToSave.name}" updated successfully!`);
  };

  const handleDeleteDest = (slug, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from destinations?`)) {
      const updated = destList.filter((d) => d.slug !== slug);
      setDestList(updated);
      saveDestinations(updated);
      showToast(`Deleted route "${name}".`);
    }
  };

  // -------------------------------------------------------------
  // TOUR PACKAGES CRUD HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddTour = () => {
    setEditingTour({
      slug: "",
      name: "",
      duration: "3 Nights / 4 Days",
      circuitBadge: "Himachal Tour",
      featureNote: "Innova / Ertiga / Tempo",
      whatsappNote: "Details for Tour Package",
      image: "/images/tours/una-dalhousie-dharamshala.jpg",
      summary: "",
      category: "himachal",
    });
    setTourModalOpen(true);
  };

  const handleOpenEditTour = (tour) => {
    setEditingTour({ ...tour });
    setTourModalOpen(true);
  };

  const handleSaveTour = (e) => {
    e.preventDefault();
    if (!editingTour.name.trim()) return;

    const slug =
      editingTour.slug.trim() ||
      editingTour.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");

    const tourToSave = { ...editingTour, slug };

    let updated;
    const index = tourList.findIndex((t) => t.slug === tourToSave.slug);
    if (index >= 0) {
      updated = [...tourList];
      updated[index] = tourToSave;
    } else {
      updated = [tourToSave, ...tourList];
    }

    setTourList(updated);
    saveTourPackages(updated);
    setTourModalOpen(false);
    showToast(`Tour package "${tourToSave.name}" saved!`);
  };

  const handleDeleteTour = (slug, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" package?`)) {
      const updated = tourList.filter((t) => t.slug !== slug);
      setTourList(updated);
      saveTourPackages(updated);
      showToast(`Deleted package "${name}".`);
    }
  };

  // -------------------------------------------------------------
  // TESTIMONIALS CRUD HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddTest = () => {
    setEditingTest({
      name: "",
      initials: "CU",
      color: "bg-amber-600",
      quote: "",
    });
    setTestModalOpen(true);
  };

  const handleOpenEditTest = (test, idx) => {
    setEditingTest({ ...test, _index: idx });
    setTestModalOpen(true);
  };

  const handleSaveTest = (e) => {
    e.preventDefault();
    if (!editingTest.name.trim() || !editingTest.quote.trim()) return;

    const initials =
      editingTest.initials ||
      editingTest.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const testToSave = {
      name: editingTest.name.trim(),
      initials,
      color: editingTest.color || "bg-amber-600",
      quote: editingTest.quote.trim(),
    };

    let updated;
    if (editingTest._index !== undefined) {
      updated = [...testList];
      updated[editingTest._index] = testToSave;
    } else {
      updated = [testToSave, ...testList];
    }

    setTestList(updated);
    saveTestimonials(updated);
    setTestModalOpen(false);
    showToast("Testimonial saved!");
  };

  const handleDeleteTest = (idx) => {
    if (window.confirm("Are you sure you want to delete this customer review?")) {
      const updated = testList.filter((_, i) => i !== idx);
      setTestList(updated);
      saveTestimonials(updated);
      showToast("Testimonial deleted.");
    }
  };

  // -------------------------------------------------------------
  // STATS HANDLERS
  // -------------------------------------------------------------
  const handleStatChange = (index, field, value) => {
    const updated = [...statsList];
    updated[index] = { ...updated[index], [field]: value };
    setStatsList(updated);
  };

  const handleSaveStats = (e) => {
    e.preventDefault();
    saveStats(statsList);
    showToast("Homepage statistics updated!");
  };

  // -------------------------------------------------------------
  // ARTICLES CMS HANDLERS
  // -------------------------------------------------------------
  const handleTitleChange = (val) => {
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setArticleForm((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug && !isEditingArticle ? prev.slug : autoSlug,
      h1: prev.h1 && !isEditingArticle ? prev.h1 : val,
    }));
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    if (!articleForm.title.trim() || !articleForm.slug.trim()) return;

    if (isEditingArticle) {
      setArticles((prev) =>
        prev.map((a) => (a.id === articleForm.id ? { ...articleForm, updatedAt: new Date().toISOString() } : a))
      );
      showToast("Article updated successfully!");
    } else {
      const newArticle = {
        ...articleForm,
        id: `art-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setArticles((prev) => [newArticle, ...prev]);
      showToast("Article published to guide!");
    }

    setArticleForm(emptyArticleForm);
    setIsEditingArticle(false);
  };

  const handleEditArticle = (art) => {
    setArticleForm(art);
    setIsEditingArticle(true);
    setPreviewMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm("Are you sure you want to delete this guide article?")) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      if (articleForm.id === id) {
        setArticleForm(emptyArticleForm);
        setIsEditingArticle(false);
      }
      showToast("Article deleted.");
    }
  };

  // -------------------------------------------------------------
  // INQUIRIES DESK HANDLERS
  // -------------------------------------------------------------
  const handleAddInquiry = (e) => {
    e.preventDefault();
    if (!newInqName.trim()) return;

    const inq = {
      id: `inq-${Date.now()}`,
      date: "Just now",
      name: newInqName.trim(),
      phone: newInqPhone.trim() || "Walk-in Customer",
      pickup: newInqPickup,
      drop: newInqDrop,
      car: newInqCar,
      status: "New",
    };

    setInquiries((prev) => [inq, ...prev]);
    setNewInqName("");
    setNewInqPhone("");
    showToast("Booking logged to dispatch desk!");
  };

  const handleUpdateInqStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    showToast(`Status updated to "${newStatus}"`);
  };

  const handleDeleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast("Booking removed.");
  };

  // -------------------------------------------------------------
  // FACTORY RESET HANDLER
  // -------------------------------------------------------------
  const handleConfirmReset = () => {
    resetAllData();
    setBusinessData({ ...initialBusiness });
    setFleetList([...initialFleet]);
    setDestList([...initialDestinations]);
    setTourList([...initialTourPackages]);
    setStatsList([...initialStats]);
    setTestList([...initialTestimonials]);
    setResetModalOpen(false);
    showToast("Website data successfully restored to factory defaults!");
  };

  const handleLogout = () => {
    localStorage.removeItem("dutta_admin_token");
    navigate("/admin/login");
  };

  // Filtered lists for quick search
  const displayedFleet = fleetList.filter(
    (c) =>
      c.name.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(fleetSearch.toLowerCase())
  );

  const displayedDest = destList.filter(
    (d) =>
      d.name.toLowerCase().includes(destSearch.toLowerCase()) ||
      d.highway.toLowerCase().includes(destSearch.toLowerCase())
  );

  return (
    <div className={`min-h-screen w-full overflow-y-auto ${c.pageBg} transition-colors duration-200 selection:bg-orange-500 selection:text-white`}>
      <SEO
        path="/admin/dashboard"
        title="Admin Command Center | Dutta Tour & Travel"
        description="Full CRUD Admin Management Console for Dutta Tour & Travel."
        noindex
      />

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 animate-bounce">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-semibold text-sm">{toast}</span>
        </div>
      )}

      {/* TOP ADMIN HEADER WITH LIVE WEBSITE LOGO BRANDING */}
      <header className={`${c.headerBg} px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-md transition-colors duration-200`}>
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Website Running Logo */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:opacity-95 transition-opacity"
              title="Visit Live Website"
            >
              <img
                src="/logo.png"
                alt="Dutta Tour & Travels"
                className="h-10 sm:h-11 w-auto object-contain bg-white rounded-xl p-1 shadow-md"
              />
              <div className="flex flex-col">
                <span className={`font-extrabold text-base sm:text-lg ${c.textPrimary} leading-tight tracking-tight`}>
                  Dutta Travels
                </span>
                <span className="font-bold text-[9px] sm:text-[10px] text-[#f57c00] uppercase tracking-wider">
                  DUTTA MOTORS &bull; UNA
                </span>
              </div>
            </Link>

            <span className={`hidden sm:inline-block h-6 w-px ${isDark ? "bg-white/10" : "bg-gray-200"} mx-1`} />

            <div className="hidden md:flex flex-col">
              <span className={`text-xs font-bold ${c.textLabel}`}>Admin Command Center</span>
              <span className={`text-[10px] ${c.textSecondary}`}>
                Prem Nagar HQ &bull; Lavkush Dutta (+91 8894021277)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* THEME TOGGLE BUTTON (DARK <-> LIGHT) */}
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-amber-300 border-white/10"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200 shadow-sm"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span className="material-symbols-outlined text-[17px] text-[#f57c00]">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
              <span className="font-bold">{isDark ? "Light Mode" : "Dark Mode"}</span>
            </button>

            {/* Quick Live Preview */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-white/10"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border-gray-200"
              }`}
              title="Open Public Website"
            >
              <span className="material-symbols-outlined text-[16px] text-orange-500">visibility</span>
              <span className="hidden sm:inline">Live Website</span>
            </Link>

            {/* Factory Reset */}
            <button
              onClick={() => setResetModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isDark
                  ? "bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 border-amber-800/40"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300"
              }`}
              title="Restore Factory Defaults"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span className="hidden md:inline">Reset Defaults</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isDark
                  ? "bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-white border-rose-800/40"
                  : "bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex-1">
        {/* TABS NAVIGATION */}
        <div className={`flex items-center gap-1.5 overflow-x-auto pb-4 border-b ${c.border} mb-6 scrollbar-thin`}>
          {[
            { id: "overview", label: "Overview", icon: "dashboard" },
            { id: "business", label: "Business & Contacts", icon: "store" },
            { id: "fleet", label: `Fleet (${fleetList.length})`, icon: "directions_car" },
            { id: "destinations", label: `Routes (${destList.length})`, icon: "explore" },
            { id: "tours", label: `Tour Packages (${tourList.length})`, icon: "map" },
            { id: "testimonials", label: `Testimonials (${testList.length})`, icon: "reviews" },
            { id: "stats", label: "Highlights", icon: "monitoring" },
            { id: "articles", label: `Travel Guide (${articles.length})`, icon: "article" },
            { id: "inquiries", label: `Dispatch Desk (${inquiries.length})`, icon: "call_log" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#f57c00] text-white shadow-md shadow-orange-500/20"
                  : c.tabInactive
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ===================================================================== */}
        {/* TAB 0: OVERVIEW & DASHBOARD SUMMARY */}
        {/* ===================================================================== */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div
                onClick={() => setActiveTab("fleet")}
                className={`p-4 rounded-2xl ${c.cardBg} hover:border-orange-500/40 cursor-pointer transition-all flex flex-col justify-between`}
              >
                <div className={`flex items-center justify-between ${c.textSecondary}`}>
                  <span className="text-xs font-bold uppercase tracking-wider">Fleet Cars</span>
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">directions_car</span>
                </div>
                <div className="mt-3">
                  <span className={`text-2xl font-black ${c.textPrimary}`}>{fleetList.length}</span>
                  <span className={`text-[11px] ${c.textSecondary} block`}>Vehicles active</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("destinations")}
                className={`p-4 rounded-2xl ${c.cardBg} hover:border-orange-500/40 cursor-pointer transition-all flex flex-col justify-between`}
              >
                <div className={`flex items-center justify-between ${c.textSecondary}`}>
                  <span className="text-xs font-bold uppercase tracking-wider">Routes</span>
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">explore</span>
                </div>
                <div className="mt-3">
                  <span className={`text-2xl font-black ${c.textPrimary}`}>{destList.length}</span>
                  <span className={`text-[11px] ${c.textSecondary} block`}>Outstation routes</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("tours")}
                className={`p-4 rounded-2xl ${c.cardBg} hover:border-orange-500/40 cursor-pointer transition-all flex flex-col justify-between`}
              >
                <div className={`flex items-center justify-between ${c.textSecondary}`}>
                  <span className="text-xs font-bold uppercase tracking-wider">Tours</span>
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">map</span>
                </div>
                <div className="mt-3">
                  <span className={`text-2xl font-black ${c.textPrimary}`}>{tourList.length}</span>
                  <span className={`text-[11px] ${c.textSecondary} block`}>Holiday packages</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("testimonials")}
                className={`p-4 rounded-2xl ${c.cardBg} hover:border-orange-500/40 cursor-pointer transition-all flex flex-col justify-between`}
              >
                <div className={`flex items-center justify-between ${c.textSecondary}`}>
                  <span className="text-xs font-bold uppercase tracking-wider">Reviews</span>
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">reviews</span>
                </div>
                <div className="mt-3">
                  <span className={`text-2xl font-black ${c.textPrimary}`}>{testList.length}</span>
                  <span className={`text-[11px] ${c.textSecondary} block`}>Customer feedback</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("articles")}
                className={`p-4 rounded-2xl ${c.cardBg} hover:border-orange-500/40 cursor-pointer transition-all flex flex-col justify-between`}
              >
                <div className={`flex items-center justify-between ${c.textSecondary}`}>
                  <span className="text-xs font-bold uppercase tracking-wider">Articles</span>
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">article</span>
                </div>
                <div className="mt-3">
                  <span className={`text-2xl font-black ${c.textPrimary}`}>{articles.length}</span>
                  <span className={`text-[11px] ${c.textSecondary} block`}>Guides published</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("inquiries")}
                className={`p-4 rounded-2xl ${c.cardBg} hover:border-orange-500/40 cursor-pointer transition-all flex flex-col justify-between`}
              >
                <div className={`flex items-center justify-between ${c.textSecondary}`}>
                  <span className="text-xs font-bold uppercase tracking-wider">Dispatch</span>
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">call_log</span>
                </div>
                <div className="mt-3">
                  <span className={`text-2xl font-black ${c.textPrimary}`}>{inquiries.length}</span>
                  <span className={`text-[11px] ${c.textSecondary} block`}>Log records</span>
                </div>
              </div>
            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Business Overview Card */}
              <div className={`${c.cardBg} p-6 rounded-3xl flex flex-col justify-between`}>
                <div>
                  <div className={`flex items-center justify-between mb-3 pb-2 border-b ${c.border}`}>
                    <h3 className={`font-bold text-base ${c.textPrimary} flex items-center gap-2`}>
                      <span className="material-symbols-outlined text-orange-500">business</span>
                      Business Information
                    </h3>
                    <button
                      onClick={() => setActiveTab("business")}
                      className="text-xs text-orange-500 font-bold hover:underline cursor-pointer"
                    >
                      Edit Info &rarr;
                    </button>
                  </div>
                  <div className={`flex flex-col gap-2.5 text-xs ${c.textSecondary}`}>
                    <div>
                      <span className={`${c.textSecondary} block text-[11px]`}>Company Name:</span>
                      <strong className={`${c.textPrimary} text-sm`}>{businessData.name}</strong>
                    </div>
                    <div>
                      <span className={`${c.textSecondary} block text-[11px]`}>Primary Contact:</span>
                      <span className={c.textPrimary}>{businessData.phones[0]} &bull; {businessData.phones[1]}</span>
                    </div>
                    <div>
                      <span className={`${c.textSecondary} block text-[11px]`}>WhatsApp Dispatch:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+{businessData.whatsappNumber}</span>
                    </div>
                    <div>
                      <span className={`${c.textSecondary} block text-[11px]`}>Registered Address:</span>
                      <span className={c.textPrimary}>{businessData.location.fullAddress}</span>
                    </div>
                  </div>
                </div>
                <div className={`pt-4 mt-4 border-t ${c.border} flex items-center justify-between`}>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live on Header &amp; Footer
                  </span>
                  <button
                    onClick={() => setActiveTab("business")}
                    className="px-3 py-1.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Manage
                  </button>
                </div>
              </div>

              {/* Fleet Quick Preview */}
              <div className={`${c.cardBg} p-6 rounded-3xl flex flex-col justify-between`}>
                <div>
                  <div className={`flex items-center justify-between mb-3 pb-2 border-b ${c.border}`}>
                    <h3 className={`font-bold text-base ${c.textPrimary} flex items-center gap-2`}>
                      <span className="material-symbols-outlined text-orange-500">directions_car</span>
                      Fleet Quick Controls
                    </h3>
                    <button
                      onClick={() => setActiveTab("fleet")}
                      className="text-xs text-orange-500 font-bold hover:underline cursor-pointer"
                    >
                      View All &rarr;
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {fleetList.slice(0, 3).map((car) => (
                      <div
                        key={car.slug}
                        className={`p-2.5 rounded-xl ${c.innerBg} flex items-center justify-between gap-3`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-10 h-7 object-cover rounded-md bg-black/10"
                            onError={(e) => { e.target.src = "/logo.png"; }}
                          />
                          <div>
                            <span className={`font-bold text-xs ${c.textPrimary} block`}>{car.name}</span>
                            <span className={`text-[10px] ${c.textSecondary}`}>{car.seats} &bull; {car.comfort}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => { handleOpenEditCar(car); setActiveTab("fleet"); }}
                          className={`text-[11px] text-orange-500 font-bold px-2 py-1 ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-orange-50 hover:bg-orange-100"} rounded-lg cursor-pointer`}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`pt-4 mt-4 border-t ${c.border} flex items-center justify-between`}>
                  <span className={`text-xs ${c.textSecondary}`}>{fleetList.length} models configured</span>
                  <button
                    onClick={() => { handleOpenAddCar(); setActiveTab("fleet"); }}
                    className="px-3 py-1.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    <span>Add New Cab</span>
                  </button>
                </div>
              </div>

              {/* Routes Quick Preview */}
              <div className={`${c.cardBg} p-6 rounded-3xl flex flex-col justify-between`}>
                <div>
                  <div className={`flex items-center justify-between mb-3 pb-2 border-b ${c.border}`}>
                    <h3 className={`font-bold text-base ${c.textPrimary} flex items-center gap-2`}>
                      <span className="material-symbols-outlined text-orange-500">explore</span>
                      Routes &amp; Destinations
                    </h3>
                    <button
                      onClick={() => setActiveTab("destinations")}
                      className="text-xs text-orange-500 font-bold hover:underline cursor-pointer"
                    >
                      View All &rarr;
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {destList.slice(0, 3).map((dest) => (
                      <div
                        key={dest.slug}
                        className={`p-2.5 rounded-xl ${c.innerBg} flex items-center justify-between gap-3`}
                      >
                        <div>
                          <span className={`font-bold text-xs ${c.textPrimary} block`}>{dest.name}</span>
                          <span className={`text-[10px] ${c.textSecondary}`}>{dest.distanceKm} KM &bull; {dest.duration}</span>
                        </div>
                        <button
                          onClick={() => { handleOpenEditDest(dest); setActiveTab("destinations"); }}
                          className={`text-[11px] text-orange-500 font-bold px-2 py-1 ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-orange-50 hover:bg-orange-100"} rounded-lg cursor-pointer`}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`pt-4 mt-4 border-t ${c.border} flex items-center justify-between`}>
                  <span className={`text-xs ${c.textSecondary}`}>{destList.length} destinations linked</span>
                  <button
                    onClick={() => { handleOpenAddDest(); setActiveTab("destinations"); }}
                    className="px-3 py-1.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    <span>Add Route</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 1: BUSINESS PROFILE & CONTACTS */}
        {/* ===================================================================== */}
        {activeTab === "business" && (
          <div className={`${c.cardBg} p-6 sm:p-8 rounded-3xl max-w-4xl`}>
            <div className={`flex items-center justify-between pb-4 mb-6 border-b ${c.border}`}>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold ${c.textPrimary} flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-orange-500">store</span>
                  Business Profile &amp; Contact Details
                </h2>
                <p className={`text-xs ${c.textSecondary} mt-1`}>
                  Updates made here will reflect across the Website Header, Footer, Contact Page, About Page, and Schema.
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded-lg border border-emerald-500/20">
                Live Data Sync
              </span>
            </div>

            <form onSubmit={handleSaveBusiness} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessData.name}
                    onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Business Tagline
                  </label>
                  <input
                    type="text"
                    value={businessData.tagline}
                    onChange={(e) => setBusinessData({ ...businessData, tagline: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none ${c.input}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Primary Phone (Lavkush Dutta) *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessData.phones[0]}
                    onChange={(e) => {
                      const newPhones = [...businessData.phones];
                      newPhones[0] = e.target.value;
                      setBusinessData({ ...businessData, phones: newPhones });
                    }}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none font-mono ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Secondary Helpline
                  </label>
                  <input
                    type="text"
                    value={businessData.phones[1] || ""}
                    onChange={(e) => {
                      const newPhones = [...businessData.phones];
                      newPhones[1] = e.target.value;
                      setBusinessData({ ...businessData, phones: newPhones });
                    }}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none font-mono ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    WhatsApp Number (without +) *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessData.whatsappNumber}
                    onChange={(e) => setBusinessData({ ...businessData, whatsappNumber: e.target.value.replace(/[^\d]/g, "") })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none font-mono text-emerald-600 dark:text-emerald-400 font-bold ${c.input}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={businessData.email}
                    onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={businessData.location?.postalCode || "174303"}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        location: { ...businessData.location, postalCode: e.target.value },
                      })
                    }
                    className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none font-mono ${c.input}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Full Registered Address (Prem Nagar HQ) *
                </label>
                <input
                  type="text"
                  required
                  value={businessData.location?.fullAddress || ""}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      location: { ...businessData.location, fullAddress: e.target.value },
                    })
                  }
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none ${c.input}`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Business Description / Overview
                </label>
                <textarea
                  rows={3}
                  value={businessData.description}
                  onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none ${c.input}`}
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Save Business Details</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 2: FLEET MANAGER (CRUD) */}
        {/* ===================================================================== */}
        {activeTab === "fleet" && (
          <div className="flex flex-col gap-6">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${c.cardBg} p-5 rounded-3xl`}>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold ${c.textPrimary} flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-orange-500">directions_car</span>
                  Fleet Manager (User UI Vehicles)
                </h2>
                <p className={`text-xs ${c.textSecondary} mt-0.5`}>
                  Add, edit specifications, or delete vehicles shown on the public Fleet and Booking pages.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search vehicles…"
                  value={fleetSearch}
                  onChange={(e) => setFleetSearch(e.target.value)}
                  className={`rounded-xl px-3.5 py-2 text-xs focus:border-orange-500 focus:outline-none border ${c.input}`}
                />

                <button
                  onClick={handleOpenAddCar}
                  className="px-4 py-2.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Add New Car</span>
                </button>
              </div>
            </div>

            {/* Fleet Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedFleet.map((car) => (
                <div
                  key={car.slug}
                  className={`${c.cardBg} rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="relative h-44 bg-black/10 overflow-hidden">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "/logo.png"; }}
                      />
                      <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white border border-white/10">
                        {car.category}
                      </span>
                      {car.imageBadge && (
                        <span className="absolute bottom-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {car.imageBadge}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col gap-3">
                      <div>
                        <h3 className={`text-base font-bold ${c.textPrimary}`}>{car.name}</h3>
                        <p className={`text-xs ${c.textSecondary} line-clamp-2 mt-1`}>{car.description}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                        <div className={`${c.innerBg} p-2 rounded-xl`}>
                          <span className={`${c.textSecondary} block text-[10px]`}>Seats</span>
                          <strong className={c.textPrimary}>{car.seats}</strong>
                        </div>
                        <div className={`${c.innerBg} p-2 rounded-xl`}>
                          <span className={`${c.textSecondary} block text-[10px]`}>Luggage</span>
                          <strong className={c.textPrimary}>{car.bags}</strong>
                        </div>
                        <div className={`${c.innerBg} p-2 rounded-xl`}>
                          <span className={`${c.textSecondary} block text-[10px]`}>Comfort</span>
                          <strong className={`${c.textPrimary} truncate block`}>{car.comfort}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 ${c.cardFooter} flex items-center justify-between gap-2`}>
                    <Link
                      to="/fleet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-600 font-semibold inline-flex items-center gap-1"
                    >
                      <span>Public View</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditCar(car)}
                        className={`px-3 py-1.5 font-bold text-xs rounded-xl transition-colors cursor-pointer ${
                          isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car.slug, car.name)}
                        className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer border border-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 3: DESTINATIONS & OUTSTATION ROUTES (CRUD) */}
        {/* ===================================================================== */}
        {activeTab === "destinations" && (
          <div className="flex flex-col gap-6">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${c.cardBg} p-5 rounded-3xl`}>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold ${c.textPrimary} flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-orange-500">explore</span>
                  Destinations &amp; Outstation Routes
                </h2>
                <p className={`text-xs ${c.textSecondary} mt-0.5`}>
                  Manage highway routes, driving times, distances in KM, and sightseeing highlights.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search routes…"
                  value={destSearch}
                  onChange={(e) => setDestSearch(e.target.value)}
                  className={`rounded-xl px-3.5 py-2 text-xs focus:border-orange-500 focus:outline-none border ${c.input}`}
                />

                <button
                  onClick={handleOpenAddDest}
                  className="px-4 py-2.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Add New Route</span>
                </button>
              </div>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedDest.map((dest) => (
                <div
                  key={dest.slug}
                  className={`${c.cardBg} rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="relative h-44 bg-black/10 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "/logo.png"; }}
                      />
                      <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-white border border-white/10">
                        {dest.distanceKm} KM &bull; {dest.duration}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col gap-3">
                      <div>
                        <h3 className={`text-base font-bold ${c.textPrimary}`}>{dest.name}</h3>
                        <span className="text-[11px] text-[#f57c00] font-semibold block mt-0.5">
                          {dest.highway}
                        </span>
                        <p className={`text-xs ${c.textSecondary} line-clamp-2 mt-1`}>{dest.summary}</p>
                      </div>

                      {dest.stops && (
                        <div className={`text-[11px] ${c.innerBg} p-2 rounded-xl`}>
                          <span className={`${c.textSecondary} block text-[10px] uppercase font-bold`}>Key Stops</span>
                          <span className={c.textPrimary}>{dest.stops}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`p-4 ${c.cardFooter} flex items-center justify-between gap-2`}>
                    <Link
                      to={`/${dest.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-600 font-semibold inline-flex items-center gap-1"
                    >
                      <span>Public Route</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditDest(dest)}
                        className={`px-3 py-1.5 font-bold text-xs rounded-xl transition-colors cursor-pointer ${
                          isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDest(dest.slug, dest.name)}
                        className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer border border-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 4: TOUR PACKAGES & YATRAS (CRUD) */}
        {/* ===================================================================== */}
        {activeTab === "tours" && (
          <div className="flex flex-col gap-6">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${c.cardBg} p-5 rounded-3xl`}>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold ${c.textPrimary} flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-orange-500">map</span>
                  Tour Packages &amp; Yatra Circuits
                </h2>
                <p className={`text-xs ${c.textSecondary} mt-0.5`}>
                  Manage Devi Darshan yatras, Himachal hill holidays, Char Dham and Kashmir packages.
                </p>
              </div>

              <button
                onClick={handleOpenAddTour}
                className="px-4 py-2.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Add Tour Package</span>
              </button>
            </div>

            {/* Tour Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tourList.map((tour) => (
                <div
                  key={tour.slug}
                  className={`${c.cardBg} rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="relative h-44 bg-black/10 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "/logo.png"; }}
                      />
                      <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-orange-400 border border-orange-500/30">
                        {tour.duration}
                      </span>
                      {tour.circuitBadge && (
                        <span className="absolute bottom-3 left-3 bg-[#f57c00] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {tour.circuitBadge}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col gap-3">
                      <div>
                        <h3 className={`text-base font-bold ${c.textPrimary}`}>{tour.name}</h3>
                        <span className={`text-[11px] ${c.textSecondary} block mt-0.5`}>
                          {tour.featureNote}
                        </span>
                        <p className={`text-xs ${c.textSecondary} line-clamp-2 mt-2`}>{tour.summary}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 ${c.cardFooter} flex items-center justify-between gap-2`}>
                    <Link
                      to="/tour-packages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-600 font-semibold inline-flex items-center gap-1"
                    >
                      <span>Public Tours</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditTour(tour)}
                        className={`px-3 py-1.5 font-bold text-xs rounded-xl transition-colors cursor-pointer ${
                          isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTour(tour.slug, tour.name)}
                        className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer border border-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 5: TESTIMONIALS (CRUD) */}
        {/* ===================================================================== */}
        {activeTab === "testimonials" && (
          <div className="flex flex-col gap-6">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${c.cardBg} p-5 rounded-3xl`}>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold ${c.textPrimary} flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-orange-500">reviews</span>
                  Customer Testimonials &amp; Reviews
                </h2>
                <p className={`text-xs ${c.textSecondary} mt-0.5`}>
                  Quotes and reviews displayed on the Home and About pages.
                </p>
              </div>

              <button
                onClick={handleOpenAddTest}
                className="px-4 py-2.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Add Testimonial</span>
              </button>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {testList.map((t, idx) => (
                <div
                  key={idx}
                  className={`${c.cardBg} p-6 rounded-2xl flex flex-col justify-between`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${t.color || "bg-amber-600"} text-white font-bold flex items-center justify-center text-sm shadow`}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${c.textPrimary}`}>{t.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500 text-xs">
                          {"★".repeat(5)}
                          <span className={`text-[10px] ${c.textSecondary} ml-1`}>Verified Traveler</span>
                        </div>
                      </div>
                    </div>
                    <p className={`text-xs ${c.textSecondary} italic leading-relaxed`}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className={`pt-4 mt-4 border-t ${c.border} flex items-center justify-end gap-2`}>
                    <button
                      onClick={() => handleOpenEditTest(t, idx)}
                      className={`px-3 py-1.5 font-bold text-xs rounded-xl transition-colors cursor-pointer ${
                        isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTest(idx)}
                      className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer border border-rose-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 6: HIGHLIGHTS & STATS */}
        {/* ===================================================================== */}
        {activeTab === "stats" && (
          <div className={`${c.cardBg} p-6 sm:p-8 rounded-3xl max-w-3xl`}>
            <div className={`pb-4 mb-6 border-b ${c.border}`}>
              <h2 className={`text-lg sm:text-xl font-bold ${c.textPrimary} flex items-center gap-2`}>
                <span className="material-symbols-outlined text-orange-500">monitoring</span>
                Homepage Highlights &amp; Statistics
              </h2>
              <p className={`text-xs ${c.textSecondary} mt-1`}>
                Customize the 4 key stat milestones presented on the homepage counter ribbon.
              </p>
            </div>

            <form onSubmit={handleSaveStats} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statsList.map((st, i) => (
                  <div key={i} className={`p-4 rounded-2xl ${c.innerBg}`}>
                    <label className={`block text-[11px] font-bold ${c.textSecondary} uppercase tracking-wide mb-1`}>
                      Metric #{i + 1} Label
                    </label>
                    <input
                      type="text"
                      required
                      value={st.label}
                      onChange={(e) => handleStatChange(i, "label", e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-xs border mb-2 focus:border-orange-500 focus:outline-none ${c.input}`}
                    />

                    <label className={`block text-[11px] font-bold ${c.textSecondary} uppercase tracking-wide mb-1`}>
                      Display Value
                    </label>
                    <input
                      type="text"
                      required
                      value={st.value}
                      onChange={(e) => handleStatChange(i, "value", e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-sm text-[#f57c00] font-black border focus:border-orange-500 focus:outline-none ${c.input}`}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Save Statistics</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 7: TRAVEL GUIDE CMS */}
        {/* ===================================================================== */}
        {activeTab === "articles" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ARTICLE FORM (Left Column) */}
            <div className={`lg:col-span-7 ${c.cardBg} p-6 rounded-3xl`}>
              <div className={`flex items-center justify-between pb-4 mb-4 border-b ${c.border}`}>
                <div>
                  <h2 className={`text-lg font-bold ${c.textPrimary}`}>
                    {isEditingArticle ? "Edit Article" : "Create Travel Guide Article"}
                  </h2>
                  <p className={`text-xs ${c.textSecondary} mt-0.5`}>
                    Published articles appear on <code>/travel-guide</code> and Google Search index.
                  </p>
                </div>
                {isEditingArticle && (
                  <button
                    type="button"
                    onClick={() => {
                      setArticleForm(emptyArticleForm);
                      setIsEditingArticle(false);
                    }}
                    className="text-xs text-orange-500 hover:underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleArticleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Una to 4 Devi Darshan Yatra Guide"
                      value={articleForm.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none ${c.input}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. una-4-devi-darshan-guide"
                      value={articleForm.slug}
                      onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs border focus:outline-none font-mono ${c.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Category / Topic
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border focus:outline-none ${c.input}`}
                  >
                    <option value="Pilgrimage & Temples">Pilgrimage &amp; Temples</option>
                    <option value="Train & Airport Transfers">Train &amp; Airport Transfers</option>
                    <option value="Hill Driving & Weather">Hill Driving &amp; Weather</option>
                    <option value="Sightseeing & Getaways">Sightseeing &amp; Getaways</option>
                  </select>
                </div>

                {/* SELECT OR DROP PHOTO FOR ARTICLE */}
                <ImagePicker
                  label="Featured Article Photo"
                  value={articleForm.featuredImage}
                  onChange={(img) => setArticleForm({ ...articleForm, featuredImage: img })}
                  presets={[...tourPresets, ...destinationPresets]}
                  isDark={isDark}
                />

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    H1 Main Heading
                  </label>
                  <input
                    type="text"
                    value={articleForm.h1}
                    onChange={(e) => setArticleForm({ ...articleForm, h1: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs sm:text-sm border focus:outline-none ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Summary / Meta Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief 1-2 sentence overview for previews and search engine snippets…"
                    value={articleForm.description}
                    onChange={(e) => setArticleForm({ ...articleForm, description: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={`text-xs font-bold ${c.textLabel} uppercase tracking-wide`}>
                      Article Body (HTML / Formatted Content) *
                    </label>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="text-[11px] text-[#f57c00] font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {previewMode ? "edit" : "visibility"}
                      </span>
                      <span>{previewMode ? "Switch to Code" : "Live Preview"}</span>
                    </button>
                  </div>

                  {previewMode ? (
                    <div
                      className={`w-full rounded-xl p-4 text-xs border max-h-72 overflow-y-auto prose ${
                        isDark ? "bg-[#0b101b] text-gray-200 border-white/10 prose-invert" : "bg-gray-50 text-gray-800 border-gray-200"
                      }`}
                      dangerouslySetInnerHTML={{ __html: articleForm.contentHtml || "<p>No content entered.</p>" }}
                    />
                  ) : (
                    <textarea
                      rows={8}
                      required
                      placeholder="Use standard HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>…"
                      value={articleForm.contentHtml}
                      onChange={(e) => setArticleForm({ ...articleForm, contentHtml: e.target.value })}
                      className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none font-mono ${c.input}`}
                    />
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="published"
                    checked={articleForm.published}
                    onChange={(e) => setArticleForm({ ...articleForm, published: e.target.checked })}
                    className="w-4 h-4 text-[#f57c00] rounded focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="published" className={`text-xs font-semibold ${c.textLabel} cursor-pointer`}>
                    Publish Immediately (Visible to website visitors)
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    {isEditingArticle ? "Update Article" : "Publish Article to Guide"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setArticleForm(emptyArticleForm);
                      setIsEditingArticle(false);
                    }}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* PUBLISHED ARTICLES LIST (Right Column) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className={`${c.cardBg} p-6 rounded-3xl flex flex-col gap-4`}>
                <div className={`flex items-center justify-between pb-3 border-b ${c.border}`}>
                  <h3 className={`font-bold text-base ${c.textPrimary}`}>
                    Published Guides ({articles.length})
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Live CMS
                  </span>
                </div>

                <div className="flex flex-col gap-3 max-h-[750px] overflow-y-auto pr-1">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      className={`p-4 rounded-2xl ${c.innerBg} hover:border-orange-500/40 transition-all flex flex-col gap-2`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-500">
                          {art.category || "Guide"}
                        </span>
                        <span className={`text-[10px] ${c.textSecondary} font-mono`}>
                          {art.createdAt || "Active"}
                        </span>
                      </div>

                      <h4 className={`font-bold text-sm ${c.textPrimary} leading-snug`}>
                        {art.title}
                      </h4>

                      <span className={`text-[11px] ${c.textSecondary} font-mono truncate`}>
                        /travel-guide/{art.slug}
                      </span>

                      <div className={`flex items-center justify-between pt-2 border-t ${c.border} mt-1`}>
                        <Link
                          to={`/travel-guide/${art.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-600 font-semibold inline-flex items-center gap-1"
                        >
                          <span>Preview</span>
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                        </Link>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditArticle(art)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                              isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                            }`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white font-medium cursor-pointer transition-colors border border-rose-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 8: BOOKING & DISPATCH DESK */}
        {/* ===================================================================== */}
        {activeTab === "inquiries" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Log Offline Booking Form */}
            <div className={`lg:col-span-5 ${c.cardBg} p-6 rounded-3xl`}>
              <h2 className={`text-base font-bold ${c.textPrimary} mb-1`}>
                Log Walk-In / Phone Booking
              </h2>
              <p className={`text-xs ${c.textSecondary} mb-4`}>
                Record phone calls received at Prem Nagar HQ (+91 8894021277) for driver dispatch.
              </p>

              <form onSubmit={handleAddInquiry} className="flex flex-col gap-3.5">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} mb-1`}>Caller / Passenger Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Captain Sharma"
                    value={newInqName}
                    onChange={(e) => setNewInqName(e.target.value)}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs sm:text-sm border focus:outline-none ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} mb-1`}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 98160-12345"
                    value={newInqPhone}
                    onChange={(e) => setNewInqPhone(e.target.value)}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs sm:text-sm border focus:outline-none font-mono ${c.input}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-bold ${c.textLabel} mb-1`}>Pickup Location</label>
                    <input
                      type="text"
                      value={newInqPickup}
                      onChange={(e) => setNewInqPickup(e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none ${c.input}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold ${c.textLabel} mb-1`}>Drop Location</label>
                    <input
                      type="text"
                      value={newInqDrop}
                      onChange={(e) => setNewInqDrop(e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none ${c.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} mb-1`}>Assigned Vehicle</label>
                  <select
                    value={newInqCar}
                    onChange={(e) => setNewInqCar(e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none ${c.input}`}
                  >
                    {fleetList.map((car) => (
                      <option key={car.slug} value={car.name}>
                        {car.name} ({car.seats})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 py-2.5 px-4 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Save to Dispatch Log
                </button>
              </form>
            </div>

            {/* Right: Inquiries Table */}
            <div className={`lg:col-span-7 ${c.cardBg} p-6 rounded-3xl`}>
              <h3 className={`font-bold text-base ${c.textPrimary} mb-4`}>
                Active Bookings &amp; Inquiries ({inquiries.length})
              </h3>

              <div className="flex flex-col gap-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-4 rounded-2xl ${c.innerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <strong className={`text-sm ${c.textPrimary}`}>{inq.name}</strong>
                        {inq.date && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                            📅 {inq.date}
                          </span>
                        )}
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInqStatus(inq.id, e.target.value)}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold border cursor-pointer ${
                            inq.status === "Confirmed"
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                              : inq.status === "Completed"
                              ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
                              : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                          } focus:outline-none ${isDark ? "bg-[#141b2d]" : "bg-white"}`}
                        >
                          <option value="New" className={isDark ? "bg-[#141b2d] text-white" : "bg-white text-gray-900"}>New</option>
                          <option value="Confirmed" className={isDark ? "bg-[#141b2d] text-white" : "bg-white text-gray-900"}>Confirmed</option>
                          <option value="Dispatched" className={isDark ? "bg-[#141b2d] text-white" : "bg-white text-gray-900"}>Dispatched</option>
                          <option value="Completed" className={isDark ? "bg-[#141b2d] text-white" : "bg-white text-gray-900"}>Completed</option>
                        </select>
                      </div>
                      <p className={`text-xs ${c.textSecondary} font-medium`}>
                        <span className="text-emerald-500 font-bold">From:</span> {inq.pickup} &rarr; <span className="text-orange-500 font-bold">To:</span> {inq.drop}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] mt-1 flex-wrap">
                        <span className="text-[#f57c00] font-bold">
                          🚗 {inq.car}
                        </span>
                        <a href={`tel:${inq.phone}`} className="text-blue-500 hover:underline font-semibold">
                          📞 {inq.phone}
                        </a>
                      </div>
                      {inq.notes && (
                        <div className={`mt-1.5 p-2 rounded-lg text-[11px] font-medium leading-relaxed border ${
                          isDark ? "bg-white/5 border-white/10 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"
                        }`}>
                          <span className="font-bold text-[#f57c00]">Trip Details: </span>{inq.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <a
                        href={whatsappLink(`Hello ${inq.name}, regarding your trip from ${inq.pickup} to ${inq.drop} with Dutta Travels:`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[15px]">chat</span>
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                          isDark ? "bg-white/5 hover:bg-rose-900/40 text-gray-400 hover:text-rose-300" : "bg-gray-200 hover:bg-rose-100 text-gray-600 hover:text-rose-700"
                        }`}
                        title="Remove entry"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* MODAL: ADD / EDIT VEHICLE */}
      {/* ===================================================================== */}
      {fleetModalOpen && editingCar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${c.modalBg} rounded-3xl w-full max-w-xl my-auto max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border`}>
            <div className={`flex items-center justify-between pb-3 mb-4 border-b ${c.border}`}>
              <h3 className={`font-bold text-lg ${c.textPrimary} flex items-center gap-2`}>
                <span className="material-symbols-outlined text-orange-500">directions_car</span>
                {editingCar.slug ? `Edit "${editingCar.name}"` : "Add New Cab to Fleet"}
              </h3>
              <button
                onClick={() => setFleetModalOpen(false)}
                className={`${c.textSecondary} hover:${c.textPrimary} cursor-pointer`}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveCar} className="flex flex-col gap-4">
              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Vehicle Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Toyota Innova Hycross"
                  value={editingCar.name}
                  onChange={(e) => setEditingCar({ ...editingCar, name: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none ${c.input}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Category
                  </label>
                  <select
                    value={editingCar.category}
                    onChange={(e) => setEditingCar({ ...editingCar, category: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs border focus:outline-none ${c.input}`}
                  >
                    <option value="SUV / MPV">SUV / MPV</option>
                    <option value="Compact MPV">Compact MPV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Luxury Van">Luxury Van</option>
                    <option value="Mini Coach">Mini Coach</option>
                    <option value="Luxury SUV">Luxury SUV</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Passenger Seats
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6+1 Seats"
                    value={editingCar.seats}
                    onChange={(e) => setEditingCar({ ...editingCar, seats: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Luggage Capacity
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 Bags"
                    value={editingCar.bags}
                    onChange={(e) => setEditingCar({ ...editingCar, bags: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Comfort &amp; AC
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dual AC / Pushback"
                    value={editingCar.comfort}
                    onChange={(e) => setEditingCar({ ...editingCar, comfort: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Image Badge / Ribbon Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amb Andaura to Dharamshala Taxi"
                  value={editingCar.imageBadge || ""}
                  onChange={(e) => setEditingCar({ ...editingCar, imageBadge: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                />
              </div>

              {/* SELECT OR DROP PHOTO (NO URL NEEDED) */}
              <ImagePicker
                label="Vehicle Photo"
                value={editingCar.image}
                onChange={(img) => setEditingCar({ ...editingCar, image: img })}
                presets={fleetPresets}
                isDark={isDark}
              />

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Vehicle Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe comfort, hill road reliability, suspension, and luggage boot…"
                  value={editingCar.description}
                  onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                />
              </div>

              <div className={`flex items-center justify-end gap-3 pt-3 border-t ${c.border}`}>
                <button
                  type="button"
                  onClick={() => setFleetModalOpen(false)}
                  className={`px-4 py-2.5 font-semibold text-xs rounded-xl cursor-pointer ${
                    isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: ADD / EDIT DESTINATION ROUTE */}
      {/* ===================================================================== */}
      {destModalOpen && editingDest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${c.modalBg} rounded-3xl w-full max-w-xl my-auto max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border`}>
            <div className={`flex items-center justify-between pb-3 mb-4 border-b ${c.border}`}>
              <h3 className={`font-bold text-lg ${c.textPrimary} flex items-center gap-2`}>
                <span className="material-symbols-outlined text-orange-500">explore</span>
                {editingDest.slug ? `Edit Route: "${editingDest.name}"` : "Add New Route"}
              </h3>
              <button
                onClick={() => setDestModalOpen(false)}
                className={`${c.textSecondary} hover:${c.textPrimary} cursor-pointer`}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveDest} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasol Parvati Valley"
                    value={editingDest.name}
                    onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs sm:text-sm border focus:outline-none ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Route Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Una to Kasol Taxi Service"
                    value={editingDest.routeTitle || ""}
                    onChange={(e) => setEditingDest({ ...editingDest, routeTitle: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Distance (in KM) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingDest.distanceKm}
                    onChange={(e) => setEditingDest({ ...editingDest, distanceKm: Number(e.target.value) })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none font-mono ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Travel Duration *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5.5 Hours"
                    value={editingDest.duration}
                    onChange={(e) => setEditingDest({ ...editingDest, duration: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Highway / Road Path
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NH-503 via Mandi & Bhuntar"
                  value={editingDest.highway}
                  onChange={(e) => setEditingDest({ ...editingDest, highway: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Key Halts / Stops
                </label>
                <input
                  type="text"
                  placeholder="e.g. Manikaran Sahib • Chalal • Tosh"
                  value={editingDest.stops || ""}
                  onChange={(e) => setEditingDest({ ...editingDest, stops: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                />
              </div>

              {/* SELECT OR DROP PHOTO FOR DESTINATIONS */}
              <ImagePicker
                label="Destination Scenic Photo"
                value={editingDest.image}
                onChange={(img) => setEditingDest({ ...editingDest, image: img })}
                presets={destinationPresets}
                isDark={isDark}
              />

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Key Places (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Manikaran Gurudwara, Hot Springs, Chalal Trail"
                  value={editingDest.keyPlacesStr || ""}
                  onChange={(e) => setEditingDest({ ...editingDest, keyPlacesStr: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Route Summary
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Scenic highlights, road conditions, and chauffeur benefits…"
                  value={editingDest.summary}
                  onChange={(e) => setEditingDest({ ...editingDest, summary: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                />
              </div>

              <div className={`flex items-center justify-end gap-3 pt-3 border-t ${c.border}`}>
                <button
                  type="button"
                  onClick={() => setDestModalOpen(false)}
                  className={`px-4 py-2.5 font-semibold text-xs rounded-xl cursor-pointer ${
                    isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Save Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: ADD / EDIT TOUR PACKAGE */}
      {/* ===================================================================== */}
      {tourModalOpen && editingTour && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${c.modalBg} rounded-3xl w-full max-w-xl my-auto max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border`}>
            <div className={`flex items-center justify-between pb-3 mb-4 border-b ${c.border}`}>
              <h3 className={`font-bold text-lg ${c.textPrimary} flex items-center gap-2`}>
                <span className="material-symbols-outlined text-orange-500">map</span>
                {editingTour.slug ? `Edit Package: "${editingTour.name}"` : "Add Tour Package"}
              </h3>
              <button
                onClick={() => setTourModalOpen(false)}
                className={`${c.textSecondary} hover:${c.textPrimary} cursor-pointer`}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveTour} className="flex flex-col gap-4">
              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kinnaur & Spiti Valley Expedition"
                  value={editingTour.name}
                  onChange={(e) => setEditingTour({ ...editingTour, name: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs sm:text-sm border focus:outline-none ${c.input}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Duration (Nights / Days) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Nights / 6 Days"
                    value={editingTour.duration}
                    onChange={(e) => setEditingTour({ ...editingTour, duration: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Circuit Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Adventure & 4x4"
                    value={editingTour.circuitBadge || ""}
                    onChange={(e) => setEditingTour({ ...editingTour, circuitBadge: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Category Filter
                  </label>
                  <select
                    value={editingTour.category}
                    onChange={(e) => setEditingTour({ ...editingTour, category: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                  >
                    <option value="himachal">Himachal Leisure</option>
                    <option value="yatra">Pilgrimage / Yatra</option>
                    <option value="kashmir">Kashmir</option>
                    <option value="ladakh">Ladakh &amp; High Altitude</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Vehicle Highlight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Innova / Fortuner / Tempo"
                    value={editingTour.featureNote || ""}
                    onChange={(e) => setEditingTour({ ...editingTour, featureNote: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                  />
                </div>
              </div>

              {/* SELECT OR DROP PHOTO FOR TOURS */}
              <ImagePicker
                label="Package Photo"
                value={editingTour.image}
                onChange={(img) => setEditingTour({ ...editingTour, image: img })}
                presets={tourPresets}
                isDark={isDark}
              />

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Tour Summary &amp; Itinerary Highlights
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Temple stops, passes crossed, sightseeing halts, and inclusions…"
                  value={editingTour.summary}
                  onChange={(e) => setEditingTour({ ...editingTour, summary: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                />
              </div>

              <div className={`flex items-center justify-end gap-3 pt-3 border-t ${c.border}`}>
                <button
                  type="button"
                  onClick={() => setTourModalOpen(false)}
                  className={`px-4 py-2.5 font-semibold text-xs rounded-xl cursor-pointer ${
                    isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: ADD / EDIT TESTIMONIAL */}
      {/* ===================================================================== */}
      {testModalOpen && editingTest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${c.modalBg} rounded-3xl w-full max-w-lg my-auto max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border`}>
            <div className={`flex items-center justify-between pb-3 mb-4 border-b ${c.border}`}>
              <h3 className={`font-bold text-lg ${c.textPrimary} flex items-center gap-2`}>
                <span className="material-symbols-outlined text-orange-500">reviews</span>
                {editingTest._index !== undefined ? "Edit Customer Review" : "Add Testimonial"}
              </h3>
              <button
                onClick={() => setTestModalOpen(false)}
                className={`${c.textSecondary} hover:${c.textPrimary} cursor-pointer`}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveTest} className="flex flex-col gap-4">
              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={editingTest.name}
                  onChange={(e) => setEditingTest({ ...editingTest, name: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs sm:text-sm border focus:outline-none ${c.input}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Initials (2 letters)
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="e.g. RC"
                    value={editingTest.initials}
                    onChange={(e) => setEditingTest({ ...editingTest, initials: e.target.value.toUpperCase() })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none font-mono ${c.input}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                    Avatar Color
                  </label>
                  <select
                    value={editingTest.color}
                    onChange={(e) => setEditingTest({ ...editingTest, color: e.target.value })}
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                  >
                    <option value="bg-amber-600">Amber Gold</option>
                    <option value="bg-blue-600">Navy Blue</option>
                    <option value="bg-rose-600">Rose Red</option>
                    <option value="bg-orange-600">Mountain Orange</option>
                    <option value="bg-emerald-600">Emerald Green</option>
                    <option value="bg-purple-600">Royal Purple</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold ${c.textLabel} uppercase tracking-wide mb-1`}>
                  Customer Review / Feedback *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write the customer experience, punctuality, chauffeur behavior, or trip highlights…"
                  value={editingTest.quote}
                  onChange={(e) => setEditingTest({ ...editingTest, quote: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none ${c.input}`}
                />
              </div>

              <div className={`flex items-center justify-end gap-3 pt-3 border-t ${c.border}`}>
                <button
                  type="button"
                  onClick={() => setTestModalOpen(false)}
                  className={`px-4 py-2.5 font-semibold text-xs rounded-xl cursor-pointer ${
                    isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: FACTORY RESET CONFIRMATION */}
      {/* ===================================================================== */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${c.modalBg} rounded-3xl w-full max-w-md my-auto p-6 sm:p-7 shadow-2xl text-center border`}>
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <span className="material-symbols-outlined text-[32px]">warning</span>
            </div>

            <h3 className={`font-extrabold text-lg ${c.textPrimary} mb-2`}>
              Restore Factory Defaults?
            </h3>

            <p className={`text-xs ${c.textSecondary} mb-6 leading-relaxed`}>
              This will restore all default fleet vehicles, destinations, tour packages, business contact info, and testimonials to the original verified Dutta Tour &amp; Travel configuration.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setResetModalOpen(false)}
                className={`px-4 py-2.5 font-semibold text-xs rounded-xl cursor-pointer ${
                  isDark ? "bg-white/5 hover:bg-white/10 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Confirm Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

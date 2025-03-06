import React from "react";
import {
  Leaf,
  LineChart,
  Activity,
  BarChart2,
  ShoppingBag,
} from "lucide-react";

const AIAgricultureIcon = () => (
  <svg
    viewBox="0 0 400 400"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Circuit board background pattern */}
    <path
      d="M50 200 H350 M200 50 V350"
      stroke="#4ade80"
      strokeWidth="2"
      strokeOpacity="0.2"
    />
    <circle
      cx="200"
      cy="200"
      r="150"
      stroke="#4ade80"
      strokeWidth="2"
      strokeOpacity="0.1"
    />

    {/* Plant elements */}
    <path
      d="M180 250 Q200 200 220 250 M200 250 V350"
      stroke="#4ade80"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M160 230 Q200 180 240 230"
      stroke="#4ade80"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />

    {/* AI nodes */}
    <circle cx="200" cy="150" r="30" fill="#4ade80" fillOpacity="0.2" />
    <circle cx="150" cy="200" r="20" fill="#4ade80" fillOpacity="0.2" />
    <circle cx="250" cy="200" r="20" fill="#4ade80" fillOpacity="0.2" />

    {/* Connection lines */}
    <path
      d="M170 150 L150 180 M230 150 L250 180"
      stroke="#4ade80"
      strokeWidth="2"
    />

    {/* Data points */}
    <circle cx="200" cy="150" r="4" fill="#4ade80" />
    <circle cx="150" cy="200" r="4" fill="#4ade80" />
    <circle cx="250" cy="200" r="4" fill="#4ade80" />

    {/* Scanning effect */}
    <rect
      x="100"
      y="100"
      width="200"
      height="200"
      stroke="#4ade80"
      strokeWidth="2"
      strokeDasharray="5,5"
      fill="none"
    />

    {/* Binary data */}
    <text x="160" y="140" fill="#4ade80" fontSize="8">
      1010
    </text>
    <text x="230" y="140" fill="#4ade80" fontSize="8">
      0101
    </text>
    <text x="190" y="240" fill="#4ade80" fontSize="8">
      1100
    </text>
  </svg>
);

const categories = [
  {
    href: "http://127.0.0.1:8080",
    name: "Yield Prediction",
    description:
      "Our advanced AI models analyze historical data, weather patterns, and soil conditions to provide accurate crop yield predictions. Make informed decisions about planting, resource allocation, and harvest timing.",
    icon: LineChart,
  },
  {
    href: "/disease-prediction",
    name: "Crop Disease Prediction",
    description:
      "Early detection of crop diseases is crucial for maintaining healthy yields. Our AI-powered system can identify various plant diseases through image analysis, helping you take preventive measures before diseases spread.",
    icon: Activity,
  },
  {
    href: "/crop-recommendation",
    name: "Crop Recommendation",
    description:
      "AI powered system will suggest you , which crop to start farming as per various parameter.",
    icon: Leaf,
  },
  {
    href: "http://127.0.0.1:7000",
    name: "Vegetation Index",
    description:
      "Access detailed vegetation indices to understand your crop's health status. Our tools provide NDVI, EVI, and other crucial metrics to help you optimize irrigation and fertilization strategies.",
    icon: BarChart2,
  },
  {
    href: "/marketplace",
    name: "Marketplace",
    description:
      "Connect directly with buyers and sellers in our agricultural marketplace. Find the best deals on seeds, equipment, and sell your produce at competitive prices. Build lasting relationships in the farming community.",
    icon: ShoppingBag,
  },
];

const MainPage = () => {
  const handleNavigate = (href) => {
    window.location.href = href;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Welcome to AgriVision
            </h1>
            <p className="text-xl text-gray-200">
              Empowering farmers with cutting-edge AI technology for smarter
              agriculture. Transform your farming practices with our
              comprehensive suite of digital tools designed to optimize yield
              and maximize efficiency.
            </p>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg p-8">
            <AIAgricultureIcon />
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-xl p-8 mb-20 bg-white/10 backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            About AgriVision
          </h2>
          <p className="text-gray-200 text-lg">
            AgriVision stands at the forefront of agricultural innovation,
            bringing together artificial intelligence and farming expertise.
            Founded with a mission to revolutionize traditional farming
            practices, we provide farmers with data-driven insights and tools
            that enhance productivity while promoting sustainable agriculture.
            Our platform serves as a bridge between time-tested farming wisdom
            and cutting-edge technology.
          </p>
        </div>

        {/* Categories Section */}
        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
                onClick={() => handleNavigate(category.href)}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-green-400/20 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
                  <IconComponent className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-green-300 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-200">{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

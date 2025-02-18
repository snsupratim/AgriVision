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
    href: "/yield-prediction",
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
    href: "/crop-detection",
    name: "Crop Detection",
    description:
      "Monitor your crops throughout their growth cycle with our automated detection system. Using satellite imagery and AI, we help you track crop health, growth stages, and potential issues in real-time.",
    icon: Leaf,
  },
  {
    href: "/vegetation-index",
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
            <h1 className="text-5xl sm:text-6xl font-bold text-green-400 mb-6">
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
        <div className=" rounded-xl p-8 mb-20">
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
        <div className="space-y-16">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="grid md:grid-cols-5 gap-8 items-center group cursor-pointer"
                onClick={() => handleNavigate(category.href)}
              >
                <div className="md:col-span-1 flex justify-center">
                  <div
                    className="w-24 h-24 rounded-full bg-green-400/20 flex items-center justify-center
                                group-hover:bg-green-400/30 transition-all"
                  >
                    <IconComponent className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-semibold text-green-400 mb-3 group-hover:text-green-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 text-lg">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

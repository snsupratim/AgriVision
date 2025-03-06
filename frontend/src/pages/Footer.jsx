import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-transparent backdrop-blur-lg text-gray-200 py-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left Section - About */}
        <div>
          <h2 className="text-2xl font-bold text-green-400">AgriVision</h2>
          <p className="mt-2 text-gray-300">
            Empowering farmers with AI-driven insights to optimize yield and
            sustainability.
          </p>
        </div>

        {/* Middle Section - Navigation */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-green-400">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="/yield-prediction"
                className="hover:text-green-300 transition"
              >
                Yield Prediction
              </a>
            </li>
            <li>
              <a
                href="/disease-prediction"
                className="hover:text-green-300 transition"
              >
                Disease Detection
              </a>
            </li>
            <li>
              <a
                href="/crop-detection"
                className="hover:text-green-300 transition"
              >
                Crop Monitoring
              </a>
            </li>
            <li>
              <a
                href="/vegetation-index"
                className="hover:text-green-300 transition"
              >
                Vegetation Index
              </a>
            </li>
            <li>
              <a
                href="/marketplace"
                className="hover:text-green-300 transition"
              >
                Marketplace
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-green-400">Contact Us</h3>
          <div className="mt-2 space-y-2 text-gray-300">
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" /> Kolkata, India
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-400" /> contact@agrivision.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-400" /> +91 12345 67890
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="mt-4 flex gap-4">
            <a href="#" className="hover:text-green-400 transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} AgriVision. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

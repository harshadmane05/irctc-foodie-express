
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Train } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Train size={28} className="text-irctc-orange mr-2" />
              <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
            </Link>
            <p className="text-gray-400 mb-4">
              Delivering delicious meals directly to your train seat. Enjoy quality food during your journey with IRCTC Foodie Express.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/restaurants" className="text-gray-400 hover:text-white transition-colors">Restaurants</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: support@irctcfoodie.com</li>
              <li className="text-gray-400">Phone: 1800-XXXX-XXXX</li>
              <li className="text-gray-400">
                Address: IRCTC Food Plaza, New Delhi Railway Station, New Delhi, 110006
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} IRCTC Foodie Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Train, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center mb-4 group">
              <Train size={28} className="text-irctc-orange mr-2 transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Delivering delicious meals directly to your train seat. Enjoy quality food during your journey with IRCTC Foodie Express.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-irctc-orange hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-irctc-orange hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-irctc-orange hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-400 hover:text-irctc-orange transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2.5"></span>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-400">
                <Mail size={18} className="mr-3 mt-1 text-irctc-orange" />
                <span>support@irctcfoodie.com</span>
              </li>
              <li className="flex items-start text-gray-400">
                <Phone size={18} className="mr-3 mt-1 text-irctc-orange" />
                <span>1800-XXXX-XXXX</span>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin size={18} className="mr-3 mt-1 text-irctc-orange" />
                <span>IRCTC Food Plaza, New Delhi Railway Station, New Delhi, 110006</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} IRCTC Foodie Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

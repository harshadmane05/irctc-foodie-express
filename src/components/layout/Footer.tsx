
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Train, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-irctc-charcoal to-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Premium Banner */}
        <div className="bg-gradient-gold text-irctc-charcoal rounded-xl p-8 mb-12 shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Upgrade to Premium Experience</h3>
            <p className="text-gray-800">Get exclusive access to gourmet meals and priority delivery.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/premium" className="bg-irctc-charcoal text-white px-6 py-3 rounded-lg font-medium hover:shadow-xl transition-all duration-300 inline-block">
              Explore Premium
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center mb-4 group">
              <div className="bg-gradient-premium p-2 rounded-lg mr-3 group-hover:shadow-lg transition-all duration-300">
                <Train size={28} className="text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="font-bold text-xl">IRCTC <span className="text-irctc-orange">Foodie</span></span>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Delivering premium quality meals directly to your train seat. Experience gourmet dining during your journey with IRCTC Foodie Express.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-irctc-orange hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-irctc-orange hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-irctc-orange hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white gold-border pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white gold-border pb-2 inline-block">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-300 hover:text-irctc-gold transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 bg-irctc-gold rounded-full mr-2.5"></span>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-white gold-border pb-2 inline-block">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-300">
                <Mail size={18} className="mr-3 mt-1 text-irctc-gold" />
                <span>support@irctcfoodie.com</span>
              </li>
              <li className="flex items-start text-gray-300">
                <Phone size={18} className="mr-3 mt-1 text-irctc-gold" />
                <span>1800-XXXX-XXXX</span>
              </li>
              <li className="flex items-start text-gray-300">
                <MapPin size={18} className="mr-3 mt-1 text-irctc-gold" />
                <span>IRCTC Food Plaza, New Delhi Railway Station, New Delhi, 110006</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} IRCTC Foodie Express. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <img src="https://placehold.co/200x30/1A202C/FFFFFF?text=Payment+Partners" alt="Payment Partners" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

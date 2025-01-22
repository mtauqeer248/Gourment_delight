import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Gourmet Delights</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                123 Foodie Street, Cuisine City
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                info@gourmetdelights.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="hover:text-indigo-400">Menu</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400">About Us</Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-indigo-400">Reviews</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-indigo-400">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
              <li>Saturday: 10:00 AM - 11:00 PM</li>
              <li>Sunday: 10:00 AM - 9:00 PM</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-400">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-indigo-400">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-indigo-400">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Gourmet Delights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
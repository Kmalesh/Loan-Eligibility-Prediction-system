'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
                RK
              </div>
              <span className="text-xl font-bold">RK Foundation</span>
            </div>
            <p className="text-background/70 text-sm">
              Providing fast, transparent, and AI-powered loan solutions for your financial needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-accent transition-colors">
                  Loan Products
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-accent transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-accent transition-colors">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#faq" className="hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:info@rkfoundation.com" className="hover:text-accent transition-colors">
                  info@rkfoundation.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>123 Business St, City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>&copy; {currentYear} RK Foundation. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client"

import { motion } from "framer-motion"
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Blogs", href: "#blogs" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Franchise", href: "#franchise" },
]

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-black)]/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">GETS Abacus</h3>
                  <p className="text-gray-400 text-sm">Education Excellence</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Transforming young minds through the revolutionary Rhythmic Abacus Method™. Join thousands of students
                who have discovered their mathematical potential with GETS Abacus.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-[var(--primary-red)]">
                  <Phone className="w-4 h-4 text-[var(--primary-white)]" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-[var(--primary-red)]">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span>info@getsabacus.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-[var(--primary-red)]">
                  <MapPin className="w-4 h-4 text-[var(--primary-white)]" />
                  <span>Mumbai, Maharashtra</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3 ">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-[var(--primary-red)] transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[var(--primary-red)] transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Programs & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Programs</h4>
              <ul className="space-y-3 mb-8">
                <li>
                  <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                    Rhythmic Abacus Method
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                    Brain Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                    Mental Math Mastery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                    Championship Training
                  </a>
                </li>
              </ul>

              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2024 GETS Abacus Education. All rights reserved.</div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-4 lg:gap-6">
            <a href="tel:+918977911599" className="hover:text-blue-400 transition flex items-center gap-1">
              <span>📞</span> <span className="hidden lg:inline">+91-8977911599</span>
            </a>
            <a href="tel:+918332092059" className="hover:text-blue-400 transition hidden lg:inline">
              +91-8332092059
            </a>
            <a href="tel:+918341146226" className="hover:text-blue-400 transition hidden lg:inline">
              +91-8341146226
            </a>
          </div>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-white sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white text-xl lg:text-2xl">🏝️</span>
              </div>
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-gray-800 leading-tight">Vizag Araku</h1>
                <p className="text-xs lg:text-sm text-gray-500 leading-tight">TOURISM</p>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About Us</Link>
              
              {/* Services Dropdown */}
              <div className="relative" onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
                <button className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1">
                  Services
                  <svg className={`w-4 h-4 transition-transform ${showServices ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showServices && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white shadow-2xl rounded-lg py-2 animate-fadeIn">
                    <Link href="/services/car-booking" className="block px-4 py-3 hover:bg-blue-50 transition">🚗 Car Booking</Link>
                    <Link href="/services/tempo-booking" className="block px-4 py-3 hover:bg-blue-50 transition">🚐 Tempo Booking</Link>
                    <Link href="/services/bus-booking" className="block px-4 py-3 hover:bg-blue-50 transition">🚌 Bus Booking</Link>
                    <Link href="/services/hotel-booking" className="block px-4 py-3 hover:bg-blue-50 transition">🏨 Hotel Booking</Link>
                  </div>
                )}
              </div>
              
              {/* Packages Dropdown */}
              <div className="relative" onMouseEnter={() => setShowPackages(true)} onMouseLeave={() => setShowPackages(false)}>
                <button className="text-blue-600 hover:text-blue-700 font-bold transition flex items-center gap-1">
                  Packages
                  <svg className={`w-4 h-4 transition-transform ${showPackages ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showPackages && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-2xl rounded-lg py-3 max-h-96 overflow-y-auto animate-fadeIn">
                    <Link href="/packages?filter=araku-valley" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">Araku Valley</Link>
                    <Link href="/packages?filter=lambasingi" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">Lambasingi Day Trip</Link>
                    <Link href="/packages?filter=2n3d" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">2N 3D Vizag, Araku</Link>
                    <Link href="/packages?filter=3n4d" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">3N 4D Vizag, Araku, Lambasingi</Link>
                    <Link href="/packages?filter=4n5d" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">4N 5D Complete Package</Link>
                    <Link href="/packages?filter=vanjangi" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 transition">Vanjangi Day Trip</Link>
                    <Link href="/packages" className="block px-4 py-2 bg-blue-50 text-blue-600 font-semibold mt-2">View All Packages →</Link>
                  </div>
                )}
              </div>
              
              <Link href="/taxi-services" className="text-gray-700 hover:text-blue-600 font-medium transition">Taxi Services</Link>
              <Link href="/temple-packages" className="text-gray-700 hover:text-blue-600 font-medium transition">Temple Packages</Link>
              <Link href="/gallery" className="text-gray-700 hover:text-blue-600 font-medium transition">Gallery</Link>
              <Link href="/contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t animate-slideDown">
            <div className="px-4 py-3 space-y-1 max-h-96 overflow-y-auto">
              <Link href="/" className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/about" className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link href="/packages" className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition font-bold text-blue-600" onClick={() => setIsOpen(false)}>Packages</Link>
              <Link href="/taxi-services" className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition" onClick={() => setIsOpen(false)}>Taxi Services</Link>
              <Link href="/temple-packages" className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition" onClick={() => setIsOpen(false)}>Temple Packages</Link>
              <Link href="/gallery" className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition" onClick={() => setIsOpen(false)}>Gallery</Link>
              <Link href="/contact" className="block py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-medium" onClick={() => setIsOpen(false)}>Contact Us</Link>
              
              {/* Mobile Contact Numbers */}
              <div className="pt-4 mt-4 border-t space-y-2">
                <a href="tel:+918977911599" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 transition">📞 +91-8977911599</a>
                <a href="tel:+918332092059" className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 transition">📞 +91-8332092059</a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

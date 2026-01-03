import Link from 'next/link';

async function getFeaturedPackages() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/admin/packages`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return data.success ? data.data.filter(p => p.featured).slice(0, 6) : [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

export default async function Home() {
  const packages = await getFeaturedPackages();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[700px] bg-cover bg-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')"}}>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 uppercase tracking-wide">ARAKU Valley</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Visit the hilly destination Araku which has the most scenic views along the way. 
            Book tour packages for Araku and enjoy a delightful stay!
          </p>
          <Link href="/packages" className="bg-blue-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition transform hover:scale-105">
            Book a Tour Now
          </Link>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 uppercase">Popular Packages</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Explore our best tour packages</p>
        
        {packages.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-10">
              {packages.map((pkg) => (
                <div key={pkg._id} className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                  {pkg.images?.[0] && (
                    <div className="relative h-64">
                      <img src={pkg.images[0]} alt={pkg.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{pkg.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">📍 {pkg.location}</span>
                      <span className="text-sm text-gray-500">⏱️ {pkg.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-blue-600">₹{pkg.price}</span>
                      <Link href={`/packages/${pkg._id}`} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/packages" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                View All Packages
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6">No packages available yet. Please check back later!</p>
            <Link href="/admin" className="text-blue-600 hover:underline">Admin Login</Link>
          </div>
        )}
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 uppercase">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">We provide complete travel solutions</p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-bold mb-2">Car Booking</h3>
              <p className="text-gray-600">Comfortable and safe car rental services</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-xl font-bold mb-2">Hotel Booking</h3>
              <p className="text-gray-600">Best hotels at affordable prices</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🚌</div>
              <h3 className="text-xl font-bold mb-2">Bus Booking</h3>
              <p className="text-gray-600">Convenient bus services for groups</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🚐</div>
              <h3 className="text-xl font-bold mb-2">Tempo Booking</h3>
              <p className="text-gray-600">Spacious tempo for family trips</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 uppercase">Why Choose Us</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Your trusted travel partner</p>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center p-6">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-bold mb-3">Expert Guides</h3>
            <p className="text-gray-600">Professional guides with deep local knowledge</p>
          </div>
          <div className="text-center p-6">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-2xl font-bold mb-3">Best Prices</h3>
            <p className="text-gray-600">Competitive pricing with no hidden charges</p>
          </div>
          <div className="text-center p-6">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold mb-3">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock assistance for all your needs</p>
          </div>
        </div>
      </section>

      {/* WhatsApp & Call Buttons */}
      <a href="https://wa.me/917995157753" target="_blank" rel="noopener noreferrer" className="fixed bottom-24 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition transform hover:scale-110">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <a href="tel:+917995157753" className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition transform hover:scale-110">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
        </svg>
      </a>
    </main>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function PackageDetail() {
  const params = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', travelers: 1, travelDate: '', message: ''
  });
  const [showBooking, setShowBooking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPackage();
  }, [params.id]);

  const fetchPackage = async () => {
    try {
      const res = await fetch('/api/admin/packages');
      const data = await res.json();
      if (data.success) {
        const foundPkg = data.data.find(p => p._id === params.id);
        setPkg(foundPkg);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookingForm, packageId: params.id }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSubmitted(true);
        setBookingForm({ name: '', email: '', phone: '', travelers: 1, travelDate: '', message: '' });
        setTimeout(() => {
          setShowBooking(false);
          setSubmitted(false);
        }, 5000);
      } else {
        alert(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
        <p className="text-gray-600 mb-8">The package you're looking for doesn't exist.</p>
        <Link href="/packages" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
          View All Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          {pkg.images?.[0] && (
            <img src={pkg.images[0]} alt={pkg.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
          )}
          {pkg.images && pkg.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {pkg.images.slice(1, 4).map((img, idx) => (
                <img key={idx} src={img} alt={`${pkg.title} ${idx + 2}`} className="w-full h-24 object-cover rounded-lg" />
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-4">{pkg.title}</h1>
          <p className="text-gray-600 mb-6 text-lg">{pkg.description}</p>
          
          <div className="space-y-3 mb-6">
            <p className="text-lg flex items-center gap-2">
              <span>📍</span> <span className="font-semibold">Location:</span> {pkg.location}
            </p>
            <p className="text-lg flex items-center gap-2">
              <span>⏱️</span> <span className="font-semibold">Duration:</span> {pkg.duration}
            </p>
            <p className="text-4xl font-bold text-blue-600">₹{pkg.price} <span className="text-lg text-gray-500">per person</span></p>
          </div>
          
          <button 
            onClick={() => setShowBooking(!showBooking)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition w-full"
          >
            {showBooking ? 'Hide Booking Form' : 'Book Now'}
          </button>
        </div>
      </div>

      {pkg.highlights && pkg.highlights.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Highlights</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {pkg.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start bg-white p-4 rounded-lg shadow">
                <span className="text-blue-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {pkg.inclusions && pkg.inclusions.length > 0 && (
        <div className="mb-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Inclusions</h2>
            <ul className="space-y-3">
              {pkg.inclusions.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {pkg.exclusions && pkg.exclusions.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Exclusions</h2>
              <ul className="space-y-3">
                {pkg.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-3">✗</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {showBooking && (
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold mb-6">Book This Package</h2>
          
          {submitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
              <p className="font-semibold text-lg mb-2">🎉 Booking Successful!</p>
              <p>We've sent a confirmation email. We'll contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
              />
              <input
                type="number"
                min="1"
                placeholder="Number of Travelers"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.travelers}
                onChange={(e) => setBookingForm({...bookingForm, travelers: e.target.value})}
              />
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.travelDate}
                onChange={(e) => setBookingForm({...bookingForm, travelDate: e.target.value})}
              />
              <textarea
                placeholder="Special Requests (Optional)"
                className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.message}
                onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
              />
              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

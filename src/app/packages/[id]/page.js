'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function PackageDetail() {
  const params = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', travelers: 1, travelDate: '', message: ''
  });
  const [showBooking, setShowBooking] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchPackage();
  }, []);

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
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookingForm, packageId: params.id }),
      });
      
      if (res.ok) {
        setSubmitted(true);
        setBookingForm({ name: '', email: '', phone: '', travelers: 1, travelDate: '', message: '' });
      }
    } catch (error) {
      alert('Booking failed. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!pkg) return <div className="text-center py-20">Package not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          {pkg.images?.[0] && (
            <img src={pkg.images[0]} alt={pkg.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
          )}
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-4">{pkg.title}</h1>
          <p className="text-gray-600 mb-6 text-lg">{pkg.description}</p>
          
          <div className="space-y-3 mb-6">
            <p className="text-lg"><span className="font-semibold">Duration:</span> {pkg.duration}</p>
            <p className="text-lg"><span className="font-semibold">Location:</span> {pkg.location}</p>
            <p className="text-4xl font-bold text-blue-600">₹{pkg.price}</p>
          </div>
          
          <button 
            onClick={() => setShowBooking(!showBooking)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition w-full"
          >
            Book Now
          </button>
        </div>
      </div>

      {pkg.highlights && pkg.highlights.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Highlights</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {pkg.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showBooking && (
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold mb-6">Book This Package</h2>
          
          {submitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p className="font-semibold">Booking Successful!</p>
              <p>We've sent a confirmation email. We'll contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-3 border rounded-lg"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 border rounded-lg"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full p-3 border rounded-lg"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
              />
              <input
                type="number"
                min="1"
                placeholder="Number of Travelers"
                required
                className="w-full p-3 border rounded-lg"
                value={bookingForm.travelers}
                onChange={(e) => setBookingForm({...bookingForm, travelers: e.target.value})}
              />
              <input
                type="date"
                required
                className="w-full p-3 border rounded-lg"
                value={bookingForm.travelDate}
                onChange={(e) => setBookingForm({...bookingForm, travelDate: e.target.value})}
              />
              <textarea
                placeholder="Special Requests (Optional)"
                className="w-full p-3 border rounded-lg h-24"
                value={bookingForm.message}
                onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
              />
              <button 
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (filter && packages.length > 0) {
      const filtered = packages.filter(pkg => 
        pkg.title.toLowerCase().includes(filter.replace(/-/g, ' '))
      );
      setFilteredPackages(filtered);
    } else {
      setFilteredPackages(packages);
    }
  }, [filter, packages]);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/admin/packages');
      const data = await res.json();
      if (data.success) {
        setPackages(data.data);
        setFilteredPackages(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading packages...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold text-center mb-4 uppercase">Tour Packages</h1>
      <p className="text-center text-gray-600 mb-12 text-lg">Explore our carefully curated tour packages</p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div key={pkg._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
            {pkg.images?.[0] && (
              <div className="relative h-64">
                <img src={pkg.images[0]} alt={pkg.title} className="w-full h-full object-cover" />
                {pkg.featured && (
                  <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ Featured
                  </span>
                )}
              </div>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">{pkg.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{pkg.description}</p>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span>📍</span> <span className="font-semibold">Location:</span> {pkg.location}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span>⏱️</span> <span className="font-semibold">Duration:</span> {pkg.duration}
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-3xl font-bold text-blue-600">₹{pkg.price}</span>
                <Link 
                  href={`/packages/${pkg._id}`} 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPackages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl mb-4">No packages found matching your criteria.</p>
          <Link href="/packages" className="text-blue-600 hover:underline">View all packages</Link>
        </div>
      )}
    </div>
  );
}

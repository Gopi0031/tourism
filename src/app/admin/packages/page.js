'use client';
import { useState, useEffect } from 'react';

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', duration: '', location: '', images: [], highlights: []
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await fetch('/api/admin/packages');
    const data = await res.json();
    if (data.success) setPackages(data.data);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.success) {
      setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setShowForm(false);
      fetchPackages();
      setFormData({ title: '', description: '', price: '', duration: '', location: '', images: [], highlights: [] });
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/admin/packages?id=${id}`, { method: 'DELETE' });
      fetchPackages();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Packages</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {showForm ? 'Close' : 'Add Package'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded shadow mb-6">
          <input type="text" placeholder="Title" required className="w-full mb-4 p-3 border rounded"
            value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          <textarea placeholder="Description" required className="w-full mb-4 p-3 border rounded"
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          <input type="number" placeholder="Price" required className="w-full mb-4 p-3 border rounded"
            value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          <input type="text" placeholder="Duration" required className="w-full mb-4 p-3 border rounded"
            value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
          <input type="text" placeholder="Location" required className="w-full mb-4 p-3 border rounded"
            value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full mb-4 p-3 border rounded" />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Create Package
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
            <p className="text-gray-600 mb-2">{pkg.location} - {pkg.duration}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">₹{pkg.price}</p>
            <button onClick={() => handleDelete(pkg._id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

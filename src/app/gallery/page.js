'use client';
import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample images - replace with your actual images
  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      title: 'Araku Valley',
      category: 'Nature'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      title: 'Beach View',
      category: 'Beach'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      title: 'Mountain Sunrise',
      category: 'Nature'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      title: 'Temple Architecture',
      category: 'Culture'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
      title: 'Scenic Railway',
      category: 'Travel'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop',
      title: 'Coffee Plantations',
      category: 'Nature'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop',
      title: 'Waterfalls',
      category: 'Nature'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop',
      title: 'Tribal Culture',
      category: 'Culture'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
      title: 'City Skyline',
      category: 'Urban'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 uppercase">Photo Gallery</h1>
        <p className="text-gray-600 text-lg">Explore the beauty of Visakhapatnam and Araku Valley</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-xl mb-1">{image.title}</h3>
                <span className="text-blue-300 text-sm">{image.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="max-w-5xl w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Nature', 'Beach', 'Culture', 'Travel'].map((category) => (
            <div
              key={category}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center hover:shadow-xl transition cursor-pointer transform hover:scale-105"
            >
              <h3 className="font-bold text-xl">{category}</h3>
              <p className="text-sm mt-2 opacity-90">
                {galleryImages.filter(img => img.category === category).length} Photos
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 mb-6">
          Welcome to Vizag Tours & Travels, your trusted partner in exploring the beautiful city of Visakhapatnam and its surrounding attractions. With years of experience in the tourism industry, we are committed to providing unforgettable travel experiences.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          To showcase the natural beauty, rich culture, and vibrant heritage of Visakhapatnam through carefully curated tour packages that cater to every traveler's needs.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Expert local guides with extensive knowledge</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Customizable tour packages</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Competitive pricing and transparent policies</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>24/7 customer support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

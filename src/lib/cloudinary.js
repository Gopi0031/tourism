import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Validate Cloudinary credentials
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.warn(
    '⚠️  Cloudinary credentials not configured properly.\n' +
    'Image upload will not work. Please configure in .env.local:\n' +
    '- CLOUDINARY_CLOUD_NAME\n' +
    '- CLOUDINARY_API_KEY\n' +
    '- CLOUDINARY_API_SECRET'
  );
}

// Only configure if credentials are present
if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary Configured Successfully');
}

export default cloudinary;

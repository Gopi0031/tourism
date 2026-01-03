import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vizag Araku Tourism - Best Tour Packages',
  description: 'Explore Visakhapatnam and Araku Valley with our best tour packages. Book car rentals, hotels, and complete travel solutions.',
  keywords: 'Vizag tours, Araku valley, Visakhapatnam tourism, tour packages, car booking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

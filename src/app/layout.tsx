import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'rPeptide | Recombinant Peptides, Proteins & Antibodies Biotech Supplier USA',
  description: 'Buy high-quality research Peptides, Proteins, Antibodies, and Fibrils online from rPeptide. Shipping to USA and worldwide for Alzheimer’s and neurodegenerative research.',
  icons: {
    icon: '/assets/images/favicon-32x32.png',
    apple: '/assets/images/apple-touch-icon.png',
  },
  openGraph: {
    title: 'rPeptide | Research Peptides & Recombinant Proteins',
    description: 'Leading biotech supplier of research peptides and custom recombinant proteins.',
    url: 'https://www.rpeptide.com',
    siteName: 'rPeptide',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'rPeptide',
    url: 'https://www.rpeptide.com',
    logo: 'https://www.rpeptide.com/wp-content/themes/rpeptide-aktivstudios/assets/images/logo-rpeptide.png',
    telephone: '+3122862032',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+3122862032',
      contactType: 'Customer Service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.linkedin.com/company/rpeptide',
      'https://twitter.com/rPeptideLLC',
      'https://bsky.app/profile/rpeptide.bsky.social',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

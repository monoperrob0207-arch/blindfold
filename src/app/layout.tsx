import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blindfold - Mission Control',
  description: 'Multi-Agent Orchestration System',
  keywords: ['AI', 'Agents', 'Mission Control', 'Automation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-onix-950 text-white antialiased`}>
        <div className="grid-bg fixed inset-0 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

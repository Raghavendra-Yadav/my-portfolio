import React from "react";
import Hero from "../home/Hero";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Golla Raghavendra Yadav</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

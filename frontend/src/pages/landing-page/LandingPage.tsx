import { EmailSignup } from "./components/EmailSignup";
import { FeatureCard } from "./components/FeatureCard";
import Logo from "./assets/ArbreLogo.svg";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
// import "./styles/tailwind.css";
// import * as React from 'react';
// import { useNavigate } from "react-router-dom";
// import { Router, Link as RouterLink} from 'react-router-dom';
// import { ImageWithFallback } from "./components/ImageWithFallback";
import { Network, Search, Download, Zap, BarChart3, FileSpreadsheet,} from "lucide-react";

export default function App() {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (inProgress !== "none") {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/org-chart" replace />;
  }

  const handleSignIn = () => {
    instance.loginRedirect({
      scopes: ["openid", "profile", "email"],
      authority: import.meta.env.VITE_MSAL_AUTHORITY + "/" + import.meta.env.VITE_MSAL_TENANT_ID,
    });
    // No code after this will execute!
  };

  return (
    <div className="min-h-screen bg-linear-to-b bg-white-500">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Arbre Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-['Inter']">Arbre Org Chart</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </a>
            
            
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="mt-5 mb-6 text-5xl md:text-6xl pb-2.5 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transform Spreadsheets into Interactive Org Charts
          </h1>
          <p className="mb-12 text-xl text-gray-600 max-w-2xl mx-auto">
            A dynamic, full-stack data visualization platform
            that transforms complex organizational hierarchies
            from static spreadsheets into interactive,
            searchable, and exportable organizational charts.
          </p>
          <EmailSignup 
              onClick={handleSignIn}
          />
        </div>

        {/* Hero Image */}
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to visualize and manage your
              organizational structure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              icon={Network}
              title="Interactive Charts"
              description="Navigate through your organization with intuitive drag, zoom, and expand/collapse functionality"
            />
            <FeatureCard
              icon={Search}
              title="Advanced Search"
              description="Quickly find any employee, department, or role with powerful search and filtering capabilities"
            />
            <FeatureCard
              icon={Download}
              title="Export Anywhere"
              description="Export your org charts in multiple formats: PDF, PNG, SVG, or back to spreadsheet"
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Updates"
              description="See changes reflected instantly as your team structure evolves and grows"
            />
            <FeatureCard
              icon={FileSpreadsheet}
              title="Spreadsheet Import"
              description="Upload your existing Excel or CSV files and watch them transform into beautiful charts"
            />
            <FeatureCard
              icon={BarChart3}
              title="Analytics & Insights"
              description="Gain valuable insights into team structure, reporting lines, and organizational depth"
            />
          </div>
        </div>
      </section>
      
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="border-t pt-8 text-center text-gray-600">
            <p>
              &copy; 2026 Arbre Org Chart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
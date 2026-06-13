import React from 'react';
import { Zap } from 'lucide-react';

export default function Navbar({ onBuildClick }) {
  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <Zap className="logo-icon" size={20} style={{ color: 'var(--accent-purple)', fill: 'var(--accent-purple)' }} />
          <span>Resume<span className="logo-ai">Forge</span></span>
        </a>
        <div className="nav-links">
          <a href="#templates" className="nav-link">Templates</a>
          <a href="#builder" className="nav-link">Builder</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="https://madcoder.in" target="_blank" rel="noopener noreferrer" className="nav-link nav-portfolio">
            madcoder.in
          </a>
        </div>
        <button className="nav-cta" onClick={onBuildClick}>Build Resume →</button>
      </div>
    </nav>
  );
}

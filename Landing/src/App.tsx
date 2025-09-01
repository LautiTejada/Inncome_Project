import { useState } from "react";
import Hero from "./components/sections/Hero";
import WhatIsInncome from "./components/sections/WhatIsInncome";
import Services from "./components/sections/Services";
import Implementation from "./components/sections/Implementation";
import Contact from "./components/sections/Contact";
import Navigation from "./components/Navigation";
import AuthModal from "./components/ui/AuthModal/AuthModal";

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  const openAuthModal = () => setAuthOpen(true);
  const closeAuthModal = () => setAuthOpen(false);

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: "linear-gradient(135deg, #161617 0%, #1e2746 100%)",
        minHeight: "100vh",
      }}
    >
      <Navigation onLoginClick={openAuthModal} />
      <Hero onLoginClick={openAuthModal} />
      <WhatIsInncome />
      <Services />
      <Implementation />
      <Contact />
      <AuthModal open={authOpen} onClose={closeAuthModal} />
    </div>
  );
}

export default App;

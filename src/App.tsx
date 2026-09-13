import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { ExperimentProvider } from "./context/ExperimentContext";
import { Footer } from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ExperimentProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ExperimentProvider>
  );
}

export default App;

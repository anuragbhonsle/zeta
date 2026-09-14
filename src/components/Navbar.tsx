import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { IconBrandX } from "@tabler/icons-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="sticky top-0 z-50 w-full pt-3 bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-3 sm:px-6">
        {/* Floating Navbar Pill */}
        <div className="relative flex h-14 sm:h-16 w-full max-w-4xl items-center justify-between gap-2 rounded-full border border-neutral-200/80 bg-white/80 px-3 shadow-sm backdrop-blur-md md:max-w-5xl dark:border-neutral-800/80 dark:bg-black/90">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 pl-2 sm:pl-4 pr-4">
            <div className="flex h-8 w-8 items-center justify-center text-neutral-900 dark:text-emerald-500">
              <img src="/favicon.svg" alt="Zeta" className="size-6" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
              Zeta
            </span>
          </Link>

          {/* Desktop Navigation — centered in pill */}
          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            ref={dropdownRef}
          >
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  to="/"
                  className="flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action Icons & Mobile Trigger Section */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              <a
                href="https://github.com/anuragbhonsle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
              >
                <FaGithub className="size-5" />
              </a>
              <a
                href="https://x.com/Anuraaaag7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Profile"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
              >
                <IconBrandX className="size-5" />
              </a>
            </div>

            <Link
              to="/contact"
              className="hidden rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 sm:block dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Contact
            </Link>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col justify-between bg-white p-6 shadow-2xl transition-transform dark:bg-neutral-950">
            <div className="flex flex-col gap-8">
              {/* Drawer Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center text-neutral-900 dark:text-emerald-500">
                    <img src="/favicon.svg" alt="Zeta" className="size-6" />
                  </div>
                  <span className="text-lg font-bold text-neutral-900 dark:text-white">
                    Zeta
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-900"
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-900"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-900">
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://github.com/anuragbhonsle"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <FaGithub className="size-5" />
                </a>
                <a
                  href="https://x.com/Anuraaaag7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <IconBrandX className="size-5" />
                </a>
              </div>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

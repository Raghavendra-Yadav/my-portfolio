'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HomeIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const navigation = [
  { name: 'Profile', href: '#Profile' },
  { name: 'Education', href: '#Education' },
  { name: 'Abilities', href: '#Abilities' },
  { name: 'Projects', href: '#Projects' },
  { name: 'Blog', href: '#Blog' },
  { name: 'Contact', href: '#Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scroll state for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Active section tracking
  useEffect(() => {
    const sectionOffsets = navigation.map((nav) => {
      const el = document.querySelector(nav.href) as HTMLElement;
      if (!el) return { name: nav.name, offset: Infinity }; // Handle missing elements
      return { name: nav.name, offset: el.offsetTop - 100 }; // Adjust offset for better accuracy
    });

    const onScroll = () => {
      const scrollPos = window.scrollY + 100; // Adjust for header height or offset
      const current = sectionOffsets
        .filter((sec) => scrollPos >= sec.offset)
        .pop();
      if (current?.name !== activeSection) {
        setActiveSection(current?.name || null);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeSection]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur shadow-sm dark:bg-gray-900/90'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="flex items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Global"
      >
        {/* Left: Home */}
        <div className="flex lg:flex-1 items-center gap-4">
          <a
            href="#home"
            className="-m-1.5 p-1.5 ml-10 mr-4 text-gray-700 hover:text-indigo-600 dark:text-white"
          >
            <span className="sr-only">Home</span>
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        {/* Center: Navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 px-3 py-1 rounded-full transition ${
                activeSection === item.name
                  ? 'bg-gradient-to-r from-purple-400/80 via-purple-500/80 to-purple-600/80 text-white shadow-lg'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right: Dark mode toggle */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mr-10 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile: Menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 text-gray-700 dark:text-white">
              <span className="sr-only">Home</span>
              <HomeIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700/50">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block rounded-full px-3 py-2 text-base font-semibold transition ${
                      activeSection === item.name
                        ? 'bg-gradient-to-r from-purple-400/80 via-purple-500/80 to-purple-600/80 text-white shadow-lg'
                        : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg"
                >
                  {darkMode ? (
                    <>
                      <SunIcon className="h-5 w-5" aria-hidden="true" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <MoonIcon className="h-5 w-5" aria-hidden="true" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

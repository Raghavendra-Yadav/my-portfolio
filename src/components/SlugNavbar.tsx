import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const SlugNavbar = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
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
          {/* Back Button */}
          <div className="flex lg:flex-1 items-center gap-4">
            <button
              onClick={() => router.back()}
              className="-m-1.5 p-1.5 ml-10 mr-4 text-gray-700 hover:text-indigo-600 dark:text-white flex items-center"
            >
              <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span className="ml-2 text-sm font-semibold">Back</span>
            </button>
          </div>

          {/* Only dark mode toggle on right */}
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

          {/* Mobile: Menu button (only toggle) */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </nav>

        {/* Mobile menu: only toggle */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="-m-1.5 p-1.5 text-gray-700 dark:text-white flex items-center"
              >
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                <span className="ml-2 text-sm font-semibold">Back</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
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
          </DialogPanel>
        </Dialog>
      </header>

      {/* Page content with animation */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default SlugNavbar;

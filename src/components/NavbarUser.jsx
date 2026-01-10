import { useState, useRef, useEffect } from 'react';
import { Moon, Sun, LogIn, User, LogOut, Clock, Settings, ChevronDown, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { toggleTheme } from '../store/uiSlice';
import { logout } from '../store/authSlice';
import LoginModal from './user/LoginModal';

const NavbarUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.ui.theme);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  const handleMenuClick = (menu) => {
    setIsDropdownOpen(false);
    if (menu === 'konsultasi-aktif') {
      navigate('/konsultasi-aktif');
    } else if (menu === 'riwayat') {
      navigate('/riwayat');
    } else if (menu === 'akun') {
      // Navigate to account page
      console.log('Navigate to account page');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-brand-surface/90 backdrop-blur border-b border-brand-muted/30 dark:bg-brand-dark/90 dark:border-brand-light/10">
        <div className="mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-12 py-3">
          <Link to="/" className="text-lg font-bold text-brand-primary dark:text-brand-light">
            NotaryID
          </Link>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Konsultasi Aktif Button */}
                <button
                  type="button"
                  onClick={() => handleMenuClick('konsultasi-aktif')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 hover:bg-brand-primary/20 dark:hover:bg-brand-primary/30 text-brand-primary transition"
                >
                  <MessageCircle size={18} />
                  <span className="hidden sm:inline text-sm font-semibold">Konsultasi</span>
                </button>

                <div className="relative" ref={dropdownRef}>
                {/* User Profile Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 dark:bg-brand-primary/30 flex items-center justify-center">
                    <User size={18} className="text-brand-primary" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-brand-dark dark:text-brand-light">
                    {user?.name || user?.phone || 'User'}
                  </span>
                  <Settings size={16} className="hidden sm:inline text-brand-muted dark:text-brand-light/70" />
                  <ChevronDown 
                    size={16} 
                    className={`text-brand-muted dark:text-brand-light/70 transition-transform ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-brand-dark rounded-xl shadow-lg border border-brand-muted/20 dark:border-brand-light/10 overflow-hidden z-50">
                    {/* Menu Items */}
                    <button
                      type="button"
                      onClick={() => handleMenuClick('riwayat')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition"
                    >
                      <Clock size={18} className="text-brand-muted dark:text-brand-light/70" />
                      <span className="text-sm font-medium text-brand-dark dark:text-brand-light">
                        Riwayat
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMenuClick('akun')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition"
                    >
                      <Settings size={18} className="text-brand-muted dark:text-brand-light/70" />
                      <span className="text-sm font-medium text-brand-dark dark:text-brand-light">
                        Akun
                      </span>
                    </button>

                    <div className="border-t border-brand-muted/20 dark:border-brand-light/10"></div>

                    <button
                      type="button"
                      onClick={() => {
                        dispatch(toggleTheme());
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition"
                    >
                      {theme === 'light' ? (
                        <Moon size={18} className="text-brand-muted dark:text-brand-light/70" />
                      ) : (
                        <Sun size={18} className="text-brand-muted dark:text-brand-light/70" />
                      )}
                      <span className="text-sm font-medium text-brand-dark dark:text-brand-light">
                        {theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
                      </span>
                    </button>

                    <div className="border-t border-brand-muted/20 dark:border-brand-light/10"></div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition text-status-danger"
                    >
                      <LogOut size={18} />
                      <span className="text-sm font-medium">Keluar</span>
                    </button>
                  </div>
                )}
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-semibold transition shadow-sm hover:shadow-md"
              >
                <LogIn size={16} />
                <span>Masuk</span>
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default NavbarUser;


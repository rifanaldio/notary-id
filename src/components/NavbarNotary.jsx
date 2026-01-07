import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { toggleTheme } from '../store/uiSlice';

const NavbarNotary = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <header className="sticky top-0 z-30 bg-brand-surface/90 backdrop-blur border-b border-brand-muted/30 dark:bg-brand-dark/90 dark:border-brand-light/10">
      <div className="mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/notary/login" className="text-lg font-bold text-brand-primary dark:text-brand-light">
          Notary Portal
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-brand-muted dark:text-brand-light hidden sm:inline">
            Notaris
          </span>
          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark text-brand-muted dark:text-brand-light hover:bg-brand-light dark:hover:bg-brand-dark/70"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavbarNotary;


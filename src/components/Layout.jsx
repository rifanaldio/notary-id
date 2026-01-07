import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelector';

const Layout = ({ children, NavbarComponent }) => {
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark dark:bg-brand-dark dark:text-brand-light transition-colors relative">
      {NavbarComponent ? <NavbarComponent /> : null}
      <main className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 lg:py-12 relative z-0">{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  NavbarComponent: PropTypes.elementType
};

export default Layout;


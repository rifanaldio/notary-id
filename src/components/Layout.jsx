import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelector';

const Layout = ({ children, NavbarComponent, FooterComponent }) => {
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark dark:bg-brand-dark dark:text-brand-light transition-colors relative flex flex-col">
      {NavbarComponent ? <NavbarComponent /> : null}
      <main className="flex-1 mx-auto w-full max-w-[1920px] sm:px-6 lg:px-0 py-1 sm:py-8 lg:py-10 relative z-0">{children}</main>
      {FooterComponent ? <FooterComponent /> : null}
      {/* <main className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 lg:py-12 relative z-0">{children}</main> */}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  NavbarComponent: PropTypes.elementType,
  FooterComponent: PropTypes.elementType
};

export default Layout;


// Nav.tsx
import React from 'react';
import { Navbar, Nav as BootstrapNav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../CurrentUser';
import '../../dist/Nav.css';
import { useTranslation } from 'react-i18next';

interface NavItem {
  text: string;
  path: string;
}

interface NavProps {
  brandName: string;
  imageSrcPath: string;
  navItems: NavItem[];
}

const Nav: React.FC<NavProps> = ({ brandName, imageSrcPath, navItems }) => {
  const { currentUser } = useAuth();
  const { t, i18n } = useTranslation('common');

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const filteredNavItems = navItems.filter((item) => {
    if (item.text === 'Login' || item.text === 'Sign Up'|| item.text === 'உள்நுழைய' || item.text === 'பதிவு செய்யுங்கள்' ) {
      return !currentUser;
    } else if (item.text === 'Logout' || item.text === 'வெளியேறு' ) {
      return currentUser;
    }
    return true;
  });

  let rightNavItems = filteredNavItems.slice(-2);
  let leftNavItems = filteredNavItems.slice(0, -2);

  if (currentUser) {
    rightNavItems = [filteredNavItems.slice(-1)[0]];
    leftNavItems = filteredNavItems.slice(0, -1);
  }

  return (
    <Navbar bg="light" expand="md" className="custom-navbar-bg d-flex justify-content-center ">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand as={NavLink} to="/">
        <img src={imageSrcPath} alt={brandName} className="brandlogo" />
        <span className="brand-name">{brandName}</span>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <BootstrapNav className="mr-auto">
          {leftNavItems.map((item) => (
            <BootstrapNav.Link as={NavLink} to={item.path} key={item.text}>
              {item.text}
            </BootstrapNav.Link>
          ))}
        </BootstrapNav>

        <BootstrapNav>
          <NavDropdown title={t('English/தமிழ்')} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => handleLanguageChange('en')}>English</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleLanguageChange('ta')}>தமிழ்</NavDropdown.Item>
          </NavDropdown>
          {rightNavItems.map((item) => (
            <BootstrapNav.Link as={NavLink} to={item.path} key={item.text}>
              {item.text}
            </BootstrapNav.Link>
          ))}
        </BootstrapNav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;

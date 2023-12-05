import { useState } from 'react';
import './Nav.scss';

const NAV_HEADERS = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Recipes',
    url: '/recipes',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Contact us',
    url: '/contact-us',
  },
];

const Nav = () => {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  return (
    <>
      <div className="Nav">
        <nav className="Nav__desktop">
          <ul>
            {NAV_HEADERS.map((navHeader) => (
              <li key={navHeader.name}>
                <a href="#">{navHeader.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="Nav__mobile">
          <button onClick={() => setToggleMobileNav(!toggleMobileNav)}>
            ☰
          </button>
          {toggleMobileNav && (
            <ul>
              {NAV_HEADERS.map((navHeader) => (
                <li key={navHeader.name}>
                  <a href="#">{navHeader.name}</a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default Nav;

import './App.scss';
import heroBanner from './assets/hero-banner-desktop.jpeg';

function App() {
  const navHeaders = [
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

  return (
    <div>
      <header>
        {/* hero banner */}
        <div className="Hero">
          <img className="Hero--img" src={heroBanner} alt="just cook banner" />
        </div>
        {/* nav */}
        <div className="Nav">
          <nav>
            <ul className="Nav--ul">
              {navHeaders.map((navHeader) => (
                <li key={navHeader.name}>{navHeader.name}</li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      {/* content */}
      <main>
        <div></div>
      </main>
      {/* footer */}
      <footer>
        <div></div>
      </footer>
    </div>
  );
}

export default App;

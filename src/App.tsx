import { useEffect, useState } from 'react';
import './App.scss';
import heroBanner from './assets/hero-banner-desktop.jpeg';

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

function App() {
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getRecipes = async () => {
    setIsLoading(true);
    try {
      const data = await fetch('http://localhost:3001/recipes');
      const recipes = await data.json();
      setFoodRecipes(recipes);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="App">
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
                <li key={navHeader.name}>
                  <a href="#">{navHeader.name}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      {/* content */}
      <main>
        <div className="Content">
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <div className="Recipes">
              {foodRecipes.map((food) => (
                <div className="RecipeCard" key={food.uuid}>
                  <img src={`src/assets/${food.images.medium}`} />
                  <div className="RecipeCard__description">
                    <h3>{food.title}</h3>
                    <p>{food.description}</p>
                    <button>View recipe</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {/* footer */}
      <footer>
        <div className="Footer">
          <p>Just Cook | The Best Recipe &copy; and &#169; 2012 - 2022</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

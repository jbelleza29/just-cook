import './App.scss';

import { useEffect, useState } from 'react';
import Modal from './Modal';

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
  const [specials, setSpecials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const getRecipes = async () => {
    setIsLoading(true);
    try {
      const data = await fetch('http://localhost:3001/recipes');
      const recipes = await data.json();
      setFoodRecipes(recipes);
      getSpecials();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getSpecials = async () => {
    try {
      const data = await fetch('http://localhost:3001/specials');
      const specials = await data.json();
      setSpecials(specials);
      console.log(specials);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickViewRecipe = (event, foodId) => {
    console.log(event.target, foodId);
    const currentRecipe = foodRecipes.find((recipe) => recipe.uuid === foodId);
    console.log(currentRecipe);
    setSelectedRecipe(currentRecipe);
    setIsModalOpen(true);
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
                    <button onClick={(e) => onClickViewRecipe(e, food.uuid)}>
                      View recipe
                    </button>
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
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
            <div className="RecipeModal">
              <div className="RecipeCard">
                <img src={`src/assets/${selectedRecipe.images.medium}`} />
                <div className="RecipeCard__description">
                  <h3>{selectedRecipe.title}</h3>
                  <p>{selectedRecipe.description}</p>
                  <div className="RecipeCard__description__prep">
                    <span>
                      <span>Cooking time:</span>{' '}
                      <span>{selectedRecipe.cookTime}</span>
                    </span>
                    <span>
                      <span>Prep time:</span>{' '}
                      <span>{selectedRecipe.prepTime}</span>
                    </span>
                    <span>
                      <span>Servings:</span>{' '}
                      <span>{selectedRecipe.servings}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="RecipeModal__instructions">
                <div>
                  <h4>Ingredients</h4>
                  <ul className="RecipeModal__instructions__list">
                    {selectedRecipe.ingredients.map((ingredient) => {
                      const specialRecipe = specials.find(
                        (special) => special.ingredientId == ingredient.uuid
                      );
                      console.log(specialRecipe);
                      return (
                        <li key={ingredient.uuid}>
                          <span>{ingredient.name}</span>
                          {specialRecipe && (
                            <ul>
                              <li>
                                <span>{specialRecipe.text}</span>
                              </li>
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h4>Directions</h4>
                  <ul className="RecipeModal__instructions__list">
                    {selectedRecipe.directions.map((direction, index) => (
                      <li key={index}>
                        <span>{direction.instructions}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="RecipeModal__footer">
                <span>
                  <span>Post Date: </span>
                  {selectedRecipe.postDate}
                </span>
                <span>
                  <span>Edit Date: </span>
                  {selectedRecipe.editDate}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;

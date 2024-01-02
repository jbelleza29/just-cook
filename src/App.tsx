import './App.scss';

import { useEffect, useState } from 'react';
import Modal from './Modal';
import RecipeCard from './RecipeCard';
import Nav from './Nav';

import heroBanner from './assets/hero-banner-desktop.jpeg';
import heroBannerMobile from './assets/hero-banner-mobile.jpeg';

type Recipe = {
  uuid: string;
  title: string;
  description: string;
  images: {
    full: string;
    medium: string;
    small: string;
  };
  servings: number;
  prepTime: number;
  cookTime: number;
  postDate: string;
  editDate: string;
  ingredients: {
    uuid: string;
    amount: number;
    measurement: string;
    name: string;
  }[];
  directions: {
    instructions: string;
    optional: boolean;
  }[];
};

type Special = {
  uuid: string;
  ingredientId: string;
  type: 'event' | 'local' | 'promocode' | 'sale';
  title: string;
  geo?: string;
  code?: string;
  text: string;
};

function App() {
  const defaultSelectedRecipe = {} as Recipe;
  const [foodRecipes, setFoodRecipes] = useState<Recipe[]>([]);
  const [specials, setSpecials] = useState<Special[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(
    defaultSelectedRecipe
  );

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
    } catch (e) {
      console.log(e);
    }
  };

  const onClickViewRecipe = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    foodId: string | undefined
  ) => {
    // @ts-expect-error recipe might be null
    const currentRecipe: Recipe = foodRecipes.find(
      (recipe) => recipe.uuid === foodId
    );
    setSelectedRecipe(currentRecipe);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="App">
      <header>
        <div className="Hero">
          <picture>
            <source media="(max-width: 800px)" srcSet={heroBannerMobile} />
            <source media="(min-width: 801px)" srcSet={heroBanner} />
            <img src={heroBannerMobile} width={800} alt="just cook banner" />
          </picture>
        </div>
        <Nav />
      </header>
      {/* content */}
      <main>
        <div className="Content">
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <div className="Recipes">
              {foodRecipes.map((food) => (
                <RecipeCard
                  key={food.uuid}
                  id={food.uuid}
                  src={`src/assets/${food.images.medium}`}
                  title={food.title}
                  description={food.description}
                  onClickView={onClickViewRecipe}
                  withButton
                />
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
        <Modal onClose={() => setIsModalOpen(false)}>
          <div>
            <div className="RecipeModal">
              <RecipeCard
                src={`src/assets/${selectedRecipe.images.medium}`}
                title={selectedRecipe.title}
                description={selectedRecipe.description}
                cookTime={selectedRecipe.cookTime}
                prepTime={selectedRecipe.prepTime}
                servings={selectedRecipe.servings}
              />
              <div className="RecipeModal__instructions">
                <div>
                  <h4>Ingredients</h4>
                  <ul className="RecipeModal__instructions__list">
                    {selectedRecipe.ingredients.map((ingredient) => {
                      const specialRecipe: Special = specials.find(
                        (special) => special.ingredientId == ingredient.uuid
                      )!;
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

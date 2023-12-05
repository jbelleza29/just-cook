import './RecipeCard.scss';

type Props = {
  src: string;
  title: string;
  description: string;
  onClickView?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string | undefined
  ) => void;
  id?: string;
  withButton?: boolean;
  cookTime?: number;
  prepTime?: number;
  servings?: number;
};

const RecipeCard = ({
  src,
  title,
  description,
  onClickView,
  id,
  withButton,
  cookTime,
  prepTime,
  servings,
}: Props) => {
  const deferOnClickView = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClickView && onClickView(e, id);
  };

  return (
    <div className="RecipeCard">
      <img src={src} />
      <div className="RecipeCard__description">
        <h3>{title}</h3>
        <p>{description}</p>
        {withButton ? (
          <button onClick={deferOnClickView}>View recipe</button>
        ) : (
          <div className="RecipeCard__description__prep">
            <span>
              <span>Cooking time:</span> <span>{cookTime}</span>
            </span>
            <span>
              <span>Prep time:</span> <span>{prepTime}</span>
            </span>
            <span>
              <span>Servings:</span> <span>{servings}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;

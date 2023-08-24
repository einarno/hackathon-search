import { useHits } from "react-instantsearch";
import { recipesSchema } from "../helpers";
import { Hit } from "./Hit";

export const Hits = () => {
  const { hits } = useHits();
  return (
    <ol>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        hits.map((hit) => {
          const recipe = recipesSchema.parse(hit);
          return <Hit key={recipe.id} recipe={recipe} />;
        })
      }
    </ol>
  );
};

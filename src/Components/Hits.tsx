import { useHits } from "react-instantsearch";
import { recipesSchema } from "../helpers";
import { Hit } from "./Hit";
import { List } from "@mui/material";

export const Hits = () => {
  const { hits } = useHits();
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        hits.map((hit) => {
          const recipe = recipesSchema.parse(hit);
          return <Hit key={recipe.id} recipe={recipe} />;
        })
      }
    </List>
  );
};

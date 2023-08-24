import { useHits } from "react-instantsearch";
import { recipesSchema } from "../helpers";
import { Hit } from "./Hit";
import { Stack } from "@mui/material";
import { useState } from "react";

type Props = {
  selected: number;
  onSelected: (index: number) => void;
};

export const Hits = ({ selected, onSelected }: Props) => {
  const { hits } = useHits();
  return (
    <Stack gap={2} py={2}>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        hits.map((hit, index) => {
          const recipe = recipesSchema.parse(hit);
          return (
            <Hit
              selected={index === selected}
              onClick={onSelected}
              key={recipe.id}
              recipe={recipe}
            />
          );
        })
      }
    </Stack>
  );
};

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  Index,
  useSearchBox,
  useHits,
} from "react-instantsearch";
import { Hits } from "./Hits";
import { Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { recipesSchema } from "../helpers";
import { useNavigate } from "@tanstack/react-router";

const MEILI_HOST = "http://0.0.0.0:7700";

export const meilisearchClient = instantMeiliSearch(MEILI_HOST, "test_key");

const CustomSearch = () => {
  const { refine } = useSearchBox();
  const inputRef = useRef<HTMLInputElement>(null);
  function setQuery(newQuery: string) {
    refine(newQuery);
  }
  return (
    <TextField
      border={0}
      autoFocus
      fullWidth
      placeholder="What do you crave?"
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      sx={{
        // focus: ring around the search bar is gray

        position: "sticky",
        top: 16,
        zIndex: 100,
        backgroundColor: "white",
      }}
      ref={inputRef}
    />
  );
};

export const Search = () => {
  const [selected, setSelected] = useState<number>(0);
  const navigate = useNavigate();
  function onKeyboardEvent(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      setSelected((prev) => prev + 1);
      const selectedElement = document.querySelector(`[data-selected="1"]`);
      selectedElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (event.key === "ArrowUp") {
      setSelected((prev) => prev - 1);
    }
    if (event.key === "Enter") {
      // search for component with data-selected == "1"
      const selectedElement = document.querySelector(`[data-selected="1"]`);
      // get data-hit-id from this
      const hitId = selectedElement?.getAttribute("data-hit-id");
      if (hitId) {
        const asInt = parseInt(hitId);
        navigate({ to: `/recipes/${asInt}` });
      }
      console.log(hitId, typeof hitId);
    }
    // if a-z or 0-9 then set index 0
    if (event.key.match(/^[a-z0-9]$/)) {
      setSelected(0);
    }
  }

  return (
    <Stack
      onKeyDown={onKeyboardEvent}
      gap={1}
      alignItems="center"
      maxHeight="calc(max(60vh, 600px))"
      sx={{
        postiion: "relative",
      }}
    >
      <InstantSearch searchClient={meilisearchClient}>
        <CustomSearch />
        <Stack
          maxHeight="100%"
          sx={{
            overflowY: "scroll",
          }}
        >
          <Index indexName="recipes">
            <Hits selected={selected} onSelected={(id) => setSelected(id)} />
          </Index>
        </Stack>
      </InstantSearch>
    </Stack>
  );
};

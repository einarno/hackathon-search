import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  InstantSearch,
  Index,
  useSearchBox,
} from "react-instantsearch";
import { Hits } from "./Hits";
import { Stack, TextField } from "@mui/material";
import { useRef, } from "react";

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

export const Search = () => (
  <Stack
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
          <Hits />
        </Index>
      </Stack>
    </InstantSearch>
  </Stack>
);

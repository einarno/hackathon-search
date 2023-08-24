import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearch, SearchBox, Index } from "react-instantsearch";
import { Hits } from "./Hits";

const MEILI_HOST = "http://0.0.0.0:7700";

const meilisearchClient = instantMeiliSearch(MEILI_HOST, "test_key");

export const Search = () => (
  <div>
    <h1> Hello igniter</h1>
    <InstantSearch searchClient={meilisearchClient}>
      <SearchBox />
      <h2>Results</h2>
      <Index indexName="recipes">
        <Hits />
      </Index>
    </InstantSearch>
  </div>
);

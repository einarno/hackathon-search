import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { InstantSearch, SearchBox, Index } from "react-instantsearch";
import { Hits } from "./Hits";

const MEILI_HOST = "http://0.0.0.0:7700";

export const meilisearchClient = instantMeiliSearch(MEILI_HOST, "test_key");

export const Search = () => (
    <InstantSearch searchClient={meilisearchClient}>
        <SearchBox />
        <Index indexName="recipes">
            <Hits />
        </Index>
    </InstantSearch>);

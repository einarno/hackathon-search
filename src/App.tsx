import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"
import { InstantSearch, SearchBox, Hits, Index } from "react-instantsearch";

const MEILI_HOST = "http://0.0.0.0:7700"

const meilisearchClient = instantMeiliSearch(MEILI_HOST, "test_key")

const App = () => (
  <div>
    <h1>Hello React</h1>
    <InstantSearch searchClient={meilisearchClient}>
      <SearchBox />
      <h2>Results</h2>
      <Index indexName="employees">
        <Hits />
      </Index>
    </InstantSearch>
  </div>
);

export default App;

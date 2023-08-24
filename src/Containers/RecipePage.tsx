import { InstantSearch, Index } from "react-instantsearch";
import { meilisearchClient } from "../Components/Search";
import { RecipeList } from "../Components/RecipeList";

export const RecipePage = () => (
    <InstantSearch searchClient={meilisearchClient}>
        <Index indexName="recipes">
            <RecipeList />
        </Index>
    </InstantSearch>);

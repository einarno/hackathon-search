// data/setup.js

import { MeiliSearch } from "meilisearch"

// Load the datasets
import recipes from "./recipes.json" assert { type: "json" }
// Load credentials from environment
const credentials = {
  host: "localhost:7700",
  apiKey: "test_key"
}

// Configuration
const INDEX_NAME = "recipes"

const searchableAttributes = ["Name", "Ingredients"]
const displayedAttributes = ["Name", "url", "Description"]

const setup = async () => {
	console.log("🚀 Seeding your Meilisearch instance with recipes", recipes.length)
	
	const client = new MeiliSearch(credentials)
	
	// Adding searchable attributes to employees index
    client.index(INDEX_NAME).updateSearchableAttributes(searchableAttributes)	

	client
		.index(INDEX_NAME)
		.updateDisplayedAttributes(displayedAttributes)

	
	// Adding documents
	await client.index(INDEX_NAME).addDocuments(recipes)
	
}



await setup()

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

const searchableAttributes = ["Name", "Ingredients",  "url", "Author", "Description",  "Method", ]
const displayedAttributes = ["id", "Name",  "Ingredients", "url", "Author","Description", "Method",  ]

const setup = async () => {
	console.log("🚀 Seeding your Meilisearch instance with recipes", recipes.length)
	
	const client = new MeiliSearch(credentials)
	
	// Adding searchable attributes to employees index
    client.index(INDEX_NAME).updateSearchableAttributes(searchableAttributes)	

	client
		.index(INDEX_NAME)
		.updateDisplayedAttributes(displayedAttributes)

	
	// Adding documents
    const recipesWithId = recipes.map((recipe, index) => ({ ...recipe, id: index }))
	await client.index(INDEX_NAME).addDocuments(recipesWithId)
	
}



await setup()

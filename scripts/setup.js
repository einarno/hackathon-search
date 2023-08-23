// data/setup.js

import { MeiliSearch } from "meilisearch"

// Load the datasets
import employees from "./employees.json" assert { type: "json" }
// Load credentials from environment
const credentials = {
  host: "localhost:7700",
  apiKey: "test_key"
}

// Configuration
const INDEX_NAME = "employees"

const searchableAttributes = ["role", "name", "description", ]
const displayedAttributes = ["id", "role", "name", "description", "picture",]

const setup = async () => {
	console.log("🚀 Seeding your Meilisearch instance")
	
	const client = new MeiliSearch(credentials)
	
	// Adding searchable attributes to employees index
    client.index(INDEX_NAME).updateSearchableAttributes(searchableAttributes)	

	client
		.index(INDEX_NAME)
		.updateDisplayedAttributes(displayedAttributes)

	
	// Adding documents
	await client.index(INDEX_NAME).addDocuments(employees)
	
}



await setup()

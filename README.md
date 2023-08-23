# React and Mellisearch

This is a sample project that demonstrates how to use [meilisearch](https://www.meilisearch.com/) with React

## Requirements

- Docker
- Node.js (18)

## Setup

### Start search engine

Set up Mellisearch locally with the following commands:

```bash
docker pull getmeili/meilisearch:v1.3

docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_ENV='development' \
    -e MEILI_MASTER_KEY='test_key'\
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.3
```

[installation guide](https://www.meilisearch.com/docs/learn/getting_started/installation#local-installation)

### Add data to search engine

```bash
npm i
npm run seed
```

### Start React app

```bash
npm run dev
```

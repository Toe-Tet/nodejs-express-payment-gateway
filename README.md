# Node.js Express Payment Gateway

## Requirements

**Minimum NodeJs Version:** ^16.0.0

**Minimum Npm Version:** ^8.0.0

## Project setup

Copy the `.env.example` file to `.env` and fill in the required values

```
cp .env.example .env
```

Copy the database.example.json file to database.json and update the configuration:

```
cp database.example.json database.json
```

Installing Dependencies

```
npm install
```

Run Migration

```
npm run migration:run
```

## Run the Application

```
npm run start
```

## Migration

```
// migration create
npm run migration:create

// migration run
npm run migration:run
```

## Test

```
npm run test
```

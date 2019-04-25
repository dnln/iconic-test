# iconic-test

Technical test done for Iconic

# Challenge

Implement a full stack signup/login system and components

# Running the app

The app is made up of a UI, API and DB

### DB

The API requires a MySQL DB. The structure of the DB is managed by Knex. To set up the DB, follow the following steps:

1. Create a new DB
2. Install the Knex CLI globally (`yarn global add knex`)
3. Run the following commands:

```bash
cd api
cp env.example .env
```

At this point you'll need up update your new `.env` file with the correct DB details

```bash
cd migrations
knex migrate:latest
```

Your DB should now have a 'Users' table with the correct columns

### API

Once the DB is up and running:

```bash
cd api
yarn install
yarn start
```

The server should then be available on http://localhost:3002

The API has some tests which can be run with `yarn test`

### UI

```bash
cd ui
yarn install
yarn start
```

Then navigate to http://localhost:3001/welcome. This will point to your local version of the API.

# Notes

I really enjoyed this test, especially having so much free rein to implement it as I wanted. Given the chance to do it again, there are definitely things I would do differently. Here are a few notes on how I approached the problem, what I'd do differently next time and some other thoughts:

### Approach

Before writing any code, I chose the technologies I was going use. I settled on the follow:

#### UI

- React
- Typescript
- formik
- react-bootstrap

#### API

- Node.js
- Typescript
- Knex
- Koa
- Supertest

#### DB

- MySQL

I wanted to implement a lot within the 5 hours so chose technologies I was at least relatively familiar with.

I decided to use JWTs to authenticate users as this is an approach I'm familiar with. These were signed, issued and verified server side and stored on the client.

Basic user info such as username, password and email address were persisted in a MySQL DB.

#### Regrets

I tried to do too many different things, rather than really perfect a handful of things. Storing user details in memory on the API would have saved some time around the DB set up, etc. I also spent about half an hour trying to get everything working with docker, but quickly has some issues with running tests in that environment, so backed that out.

### If i had more time...

If I had more time there are a few things I'd have done:

- More test! - Testing is currently woeful in the UI and pretty bad in the API. I'd have really liked to get Cypress e2e tests working in the app.
- Dockerise everything so it can easily be run
- Lots of tidying up (some of the types could be better and bits of the code are very rushed)
- Form validation
- Merge SignUp and Login components in the UI as they're pretty much the same thing
- Created a simple API client in the UI so that all requests to the API pass through a single function making it easier to change things like API endpoint details

### Note about the auth approach

I chose to issue JWTs and store them client side as this was quick to implemented, but storing JWTs client side in local storage isn't a good idea. If I had more time I'd have tried to implement this in a more secure way.

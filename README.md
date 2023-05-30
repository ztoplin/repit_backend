# Rep-it NYC! --- A Municipal Civic Education App

Rep-it NYC! is a civic education and accessibility application that returns a list of all of a user-specific elected representatives, complete with descriptions of their respective responsibilities, contact information, and links to their websites, social media, community board sites and various demographic and health report data.

Backend written using Node.js, employing Google Civic information API, NYC Geoclient API, and PostgreSQL

Link for the frontend repository: https://github.com/ztoplin/repit_frontend

## Installation/Startup

Your .env file should contain the following:

TOKEN_KEY

DB_USER

DB_PASSWORD

DB_PORT

OCP_KEY
(Subscription key from NYC Geoclient API)

GOOGLE_API_KEY
(Subscription key from Google Civic information API)

Run npm install in your terminal for all dependencies.

```bash
npm install
```

Then run npm start to run the backend server.
```bash
npm start
```

## Usage

Once Postgres and the server are running, refer to the README.md file in the frontend directory for further instructions.
  

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## License

No License

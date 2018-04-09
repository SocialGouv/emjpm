# Get Started

git clone git@github.com:SocialGouv/eMJPM-api.git

cd eMJPM-api

npm install

# Run the Database
docker-compose up

# Create Database

database development
connect on psql:
psql -p 5434 -U postgres -h localhost

CREATE DATABASE backendlebontuteur_db_1;

ON cd eMJPM-api:
knex migrate:latest --env development
knex seed:run --env development

# Run
npm start

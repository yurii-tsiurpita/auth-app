# Auth App

#### To run the app without cloning the source code, just execute the `docker-compose.yml` with command:
```
docker compose up -d
```
#### If you decide to clone the source code, you can still use the approach described above to run the app, but now you have more convenient options:
- to run production setup (equivalent to `docker compose up -d`):
```
npm start
```
- to run server in development setup:
```
npm run server:start:dev
```
- to run client in development setup:
```
npm run client:start:dev
```
#### The app page will be at `http://localhost:8080`.
#### The API will be available at `http://localhost:3000`.
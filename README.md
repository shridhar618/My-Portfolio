# My Portfolio

A full-stack personal portfolio website with user signup and login, a project showcase and a contact form backed by SQLite.

## Features

- Signup and login with bcrypt password hashing and session-based authentication
- Project showcase: Navonmesh 2024, FitClub, fitness chatbot, Site Crafters, Note Keeper and To-Do app
- Contact form whose messages are stored in SQLite
- Downloadable resume

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express, express-session, bcryptjs |
| Database | SQLite |
| Frontend | HTML, CSS, JavaScript, Boxicons |

## Getting started

```bash
npm install
node setup.js      # create the users table
node setup2.js     # create the contact table
npm start
```

## Project structure

```
server.js       Express server: auth, contact and page routes
setup.js        Database setup scripts
public/         Pages: index, login, signup, projects
database/       SQLite databases
```

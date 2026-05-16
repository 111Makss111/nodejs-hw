# Node.js HW 02 MongoDB

Express API for notes with MongoDB, Mongoose, pino-http logging, and CRUD routes.

## Scripts

```bash
npm install
npm run dev
```

For production:

```bash
npm start
```

## Environment Variables

Create `.env` locally and add:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

On Render, add the same variables in the service environment settings.

## Routes

- `GET /notes`
- `GET /notes/:noteId`
- `POST /notes`
- `PATCH /notes/:noteId`
- `DELETE /notes/:noteId`

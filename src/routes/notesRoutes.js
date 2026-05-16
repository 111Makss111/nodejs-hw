import { Router } from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const notesRoutes = Router();

const ctrlWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

notesRoutes.get('/notes', ctrlWrapper(getAllNotes));
notesRoutes.get('/notes/:noteId', ctrlWrapper(getNoteById));
notesRoutes.post('/notes', ctrlWrapper(createNote));
notesRoutes.patch('/notes/:noteId', ctrlWrapper(updateNote));
notesRoutes.delete('/notes/:noteId', ctrlWrapper(deleteNote));

export default notesRoutes;

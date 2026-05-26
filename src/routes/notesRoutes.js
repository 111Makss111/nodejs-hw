import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRoutes = Router();

const ctrlWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

notesRoutes.use('/notes', authenticate);

notesRoutes.get('/notes', celebrate(getAllNotesSchema), ctrlWrapper(getAllNotes));
notesRoutes.get('/notes/:noteId', celebrate(noteIdSchema), ctrlWrapper(getNoteById));
notesRoutes.post('/notes', celebrate(createNoteSchema), ctrlWrapper(createNote));
notesRoutes.patch('/notes/:noteId', celebrate(updateNoteSchema), ctrlWrapper(updateNote));
notesRoutes.delete('/notes/:noteId', celebrate(noteIdSchema), ctrlWrapper(deleteNote));

export default notesRoutes;

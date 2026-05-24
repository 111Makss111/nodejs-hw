import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getAllNotes = async (req, res) => {
  const { page, perPage, tag, search } = req.query;
  const skip = (page - 1) * perPage;
  const notesQuery = Note.find();
  const countQuery = Note.countDocuments();

  if (tag) {
    notesQuery.where('tag').equals(tag);
    countQuery.where('tag').equals(tag);
  }

  if (search) {
    const searchPattern = escapeRegExp(search);
    const searchFilter = [
      { title: { $regex: searchPattern, $options: 'i' } },
      { content: { $regex: searchPattern, $options: 'i' } },
    ];

    notesQuery.or(searchFilter);
    countQuery.or(searchFilter);
  }

  const [totalNotes, notes] = await Promise.all([
    countQuery,
    notesQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

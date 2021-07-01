import express from 'express';
import NotesService from '../services/notes.service';
const router = express.Router();

router.get('/', function (req, res, next) {
  const notesService = new NotesService();
  res.send(notesService.allNotes());
});

router.get('/:id', function (req, res, next) {
  const notesService = new NotesService();
  const { id } = req.params;
  res.send(notesService.noteById(id));
});

router.delete('/:id', function (req, res, next) {
  const notesService = new NotesService();
  const { id } = req.params;
  res.send(notesService.deleteById(id));
});

export default router;

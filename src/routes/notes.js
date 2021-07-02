import express from 'express';
import NotesController from '../controllers/notes.controller';
const router = express.Router();

router.get('/stats/', NotesController.stats);

router.get('/', NotesController.allNotes);

router.get('/:id', NotesController.noteById);

router.post('/', NotesController.addNote);

router.delete('/:id', NotesController.deleteById);

router.patch('/:id', NotesController.patchNoteById);

export default router;

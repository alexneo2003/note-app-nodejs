import NotesService from '../services/notes.service';
import Joi from 'joi';

class NotesController {
  allNotes(req, res) {
    res.status(200).send(NotesService.allNotes());
  }

  noteById(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(404).send('ID param required');
      return;
    }

    const note = NotesService.noteById(id);

    if (note.hasOwnProperty('error')) {
      res.status(404).send(note);
    } else {
      res.status(200).send(note);
    }
  }

  addNote(req, res) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      category: Joi.string().min(3).required(),
      content: Joi.string().min(3).required(),
    });

    const isValid = schema.validate(req.body);
    if (isValid.error) {
      res.status(404).send({ error: isValid.error.details[0].message });
      return;
    }
    res.status(200).send(NotesService.addNote(req.body));
  }

  deleteById(req, res) {
    const { id } = req.params;
    res.status(200).send(NotesService.deleteById(id));
  }

  patchNoteById(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(404).send({ error: 'ID param required' });
      return;
    }

    const schema = Joi.object({
      name: Joi.string().min(3),
      category: Joi.string().min(3),
      content: Joi.string().min(3),
      archived: Joi.boolean().strict(),
    });

    const isValid = schema.validate(req.body);
    if (isValid.error) {
      res.status(404).send({ error: isValid.error.details[0].message });
      return;
    }
    const patchedNote = NotesService.patchNoteById(id, req.body);
    if (patchedNote.hasOwnProperty('error')) {
      res.status(404).send(patchedNote);
    } else {
      res.status(200).send(patchedNote);
    }
  }

  stats(req, res) {
    res.status(200).send(NotesService.stats());
  }
}

export default new NotesController();

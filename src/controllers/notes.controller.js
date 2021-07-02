import NotesService from '../services/notes.service';

class NotesController {
  allNotes(req, res) {
    res.status(200).send(NotesService.allNotes());
  }

  noteById(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(404).send('ID param required');
    }
    res.status(200).send(NotesService.noteById(id));
  }

  addNote(req, res) {
    const { name, category, content } = req.body;
    if (!name) {
      res.status(404).send({ error: 'name param required' });
    } else if (!category) {
      res.status(404).send({ error: 'category param required' });
    } else if (!content) {
      res.status(404).send({ error: 'content param required' });
    } else {
      res.status(200).send(NotesService.addNote({ name, category, content }));
    }
  }

  deleteById(req, res) {
    const { id } = req.params;
    res.status(200).send(NotesService.deleteById(id));
  }

  patchNoteById(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(404).send({ error: 'ID param required' });
    }
    const { name, category, content, archived } = req.body;
    console.log('id, name, category, content ', id, name, category, content);
    const patchedNote = NotesService.patchNoteById(id, {
      name,
      category,
      content,
      archived,
    });
    if (patchedNote.hasOwnProperty('error')) {
      res.status(404).send(patchedNote);
    } else {
      res.status(200).send(patchedNote);
    }
  }
}

export default new NotesController();

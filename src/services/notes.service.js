const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getDatesTextFromContent = (contentText) => {
  const matcher = /\d\/\d\/\d*/gm;
  let found = contentText.match(matcher);
  let dates = '';
  if (found && found.length) {
    dates = found.join(', ');
  }
  return dates;
};

class NotesService {
  notes = [
    {
      id: '4962cb19-cc47-9623-9621-012958773ebf',
      name: 'Shoping list',
      created: '20/04/2021',
      category: 'Task',
      content: 'Tomatoes, Bread',
      dates: '',
      archived: false,
    },
    {
      id: 'bb256d1e-1f77-f052-b199-057b55a03bc5',
      name: 'The theory of evolution',
      created: '27/04/2021',
      category: 'Random Thought',
      content: 'The evolution...',
      dates: '',
      archived: false,
    },
    {
      id: 'bda82282-33f8-f49d-83b1-3bac3ca09345',
      name: 'New Feature',
      created: '05/05/2021',
      category: 'Idea',
      content: 'Implement new...',
      dates: '5/3/2021, 5/5/2021',
      archived: false,
    },
    {
      id: '1b21caf2-e4ac-cec0-a6df-228e6d7291b3',
      name: 'William Gaddis',
      created: '07/05/2021',
      category: 'Quote',
      content: "Power doesn't....",
      dates: '',
      archived: false,
    },
    {
      id: '9e5f9d62-9050-ca01-938d-0f9860bc9b22',
      name: 'Books',
      created: '15/05/2021',
      category: 'Task',
      content: 'The Lean Startup',
      dates: '',
      archived: false,
    },
    {
      id: '03e78a24-c49d-2cec-9eb0-cd3dd530f7f1',
      name: 'Books',
      created: '15/05/2021',
      category: 'Task',
      content:
        'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
      dates: '',
      archived: true,
    },
  ];

  allNotes() {
    return this.notes;
  }

  noteById(id) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      return { error: 'Note not found' };
    }
    return note;
  }

  addNote(note) {
    let d = new Date();
    let currDate = d.getDate();
    let currMonth = d.getMonth() + 1;
    let currYear = d.getFullYear();
    const formatedNow = `${currDate}/${currMonth}/${currYear}`;

    const newNote = {
      ...note,
      id: uuidv4(),
      dates: getDatesTextFromContent(note.content),
      created: formatedNow,
      archived: false,
    };

    this.notes.push(newNote);
    return newNote;
  }

  deleteById(id) {
    const note = this.notes.find((note) => note.id === id);
    const deletedNote = this.notes.splice(note, 1);
    console.log('this.notes', this.notes);
    return deletedNote;
  }

  patchNoteById(id, note) {
    const objIndex = this.notes.findIndex((obj) => obj.id === id);
    if (objIndex < 0) {
      return { error: 'Note not found' };
    }
    let currentNote = this.notes[objIndex];
    const allowedPatchFields = ['name', 'category', 'content', 'archived'];

    for (let field of allowedPatchFields) {
      if (field in note) {
        currentNote[field] = note[field];
        if (field === 'content') {
          currentNote.dates = getDatesTextFromContent(note[field]);
        }
      }
    }
    this.notes.splice(objIndex, 1, currentNote);
    return currentNote;
  }

  stats() {
    const categories = Array.from(
      new Set(this.notes.map((note) => note.category))
    ).sort();

    return categories.map((category) => {
      return {
        category,
        active: this.notes.filter(
          (note) => note.category === category && !note.archived
        ).length,
        archived: this.notes.filter(
          (note) => note.category === category && note.archived
        ).length,
      };
    });
  }
}

export default new NotesService();

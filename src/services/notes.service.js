const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default class NotesService {
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
    return this.notes.filter((note) => note.id === id);
  }

  deleteById(id) {
    const newNotes = this.notes.filter((note) => note.id !== id);
    const deletedNote = this.notes.filter((note) => note.id === id);
    this.notes = newNotes.slice();
    return deletedNote;
  }
}

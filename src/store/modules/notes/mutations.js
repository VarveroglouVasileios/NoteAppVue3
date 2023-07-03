export default {
  addNote(state, payload) {
    state.notes.push(payload);
  },
  deleteNote(state, payload) {
    state.notes = state.notes.filter((note) => note.id !== payload);
  },
  updateNote(state, updatedNote) {
    const index = state.notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      state.notes.splice(index, 1, updatedNote);
    }
  },
  setNote(state, payload) {
    state.notes = payload;
  },
};

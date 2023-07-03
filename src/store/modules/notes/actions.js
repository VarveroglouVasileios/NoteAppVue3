export default {
  async addNote(context, payload) {
    const token = context.rootGetters.token;
    const id = context.rootGetters.userId;

    const data = {
      id: id,
      title: payload.title,
      content: payload.content,
      createdAt: payload.date,
    };

    await fetch(
      `https://noteapp-b821a-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json?auth=` +
        token,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    context.commit("addNote", {
      id: id,
      ...data,
    });
  },
  async updateNote(context, updatedNote) {
    const token = context.rootGetters.token;
    const userId = context.rootGetters.userId;

    // send the PATCH request to Firebase to update the note
    await fetch(
      `https://noteapp-b821a-default-rtdb.europe-west1.firebasedatabase.app/notes/${userId}/${updatedNote.id}.json?auth=${token}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedNote),
      }
    );

    // commit the update to Vuex store
    context.commit("updateNote", updatedNote);
  },

  async loadData(context) {
    const userId = context.rootGetters.userId;
    const res = await fetch(
      `https://noteapp-b821a-default-rtdb.europe-west1.firebasedatabase.app/notes/${userId}.json`
    );
    const data = await res.json();
    const notes = [];

    for (const key in data) {
      const note = {
        id: key,
        title: data[key].title,
        content: data[key].content,
        createdAt: data[key].createdAt,
      };
      notes.push(note);
    }

    context.commit("setNote", notes);
  },

  async deleteItem(context, itemId) {
    const token = context.rootGetters.token;
    const userId = context.rootGetters.userId;
    const response = await fetch(
      `https://noteapp-b821a-default-rtdb.europe-west1.firebasedatabase.app/notes/${userId}/${itemId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    // Error handling
    if (!response.ok) {
      const responseData = await response.json();
      const error = new Error(responseData.message || "Failed to delete item");
      throw error;
    }

    // If successful, commit mutation to remove item from state
    context.commit("deleteNote", itemId);
  },
};

<template>
  <div>
    <!-- Add Modal -->
    <div class="modal" v-if="editing" @mousedown="handleOutsideClick">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <input type="text" v-model="editingNote.title" />
        <textarea v-model="editingNote.content"></textarea>
        <button class="save" @click="updateNote(editingNote)">Save</button>
        <button class="cancel" @click="closeModal">Cancel</button>
      </div>
    </div>

    <!-- Existing list -->
    <ul class="list">
      <li class="list__notes" v-for="note in paginatedNotes" :key="note.id">
        <div class="list__items">
          <p class="title">{{ note.title }}</p>
          <p class="content">{{ note.truncatedContent }}</p>
          <div>
            <button class="delete" @click="deleteNote(note.id)">Delete</button>
          </div>
          <button class="edit" @click="editNote(note.id)">Edit</button>
          <router-link class="redirect" :to="detailsLink(note.id)"
            >Note Details</router-link
          >
        </div>
      </li>
      <router-link class="redirect" to="/addNote">Add Note</router-link>
    </ul>

    <!-- Pagination -->
    <div class="pagination">
      <button
        class="prev-button"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Previous
      </button>
      <button class="next-button" :disabled="isLastPage" @click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxLenght: 10,
      editing: null,
      editingNote: { title: "", content: "" },
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  methods: {
    deleteNote(id) {
      this.$store.dispatch("notes/deleteItem", id);
    },
    updateNote(note) {
      this.$store.dispatch("notes/updateNote", note);
      this.closeModal();
    },
    editNote(id) {
      let note = this.notes.find((note) => note.id === id);
      this.editingNote = { ...note };
      this.editing = true;
    },
    detailsLink(id) {
      return this.$route.path + "/" + id;
    },
    closeModal() {
      this.editing = false;
    },
    handleOutsideClick(event) {
      if (!event.target.closest(".modal-content")) {
        this.closeModal();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (!this.isLastPage) {
        this.currentPage++;
      }
    },
  },
  created() {
    this.$store.dispatch("notes/loadData");
  },
  computed: {
    notes() {
      return this.$store.getters["notes/getNotes"];
    },
    truncatedNotes() {
      return this.notes.map((note) => {
        let truncatedContent = note.content;
        if (note.content.length > this.maxLenght) {
          truncatedContent = note.content.slice(0, this.maxLenght) + "...";
        }
        return { ...note, truncatedContent };
      });
    },
    paginatedNotes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.truncatedNotes.slice(startIndex, endIndex);
    },
    isLastPage() {
      const totalPages = Math.ceil(
        this.truncatedNotes.length / this.itemsPerPage
      );
      return this.currentPage === totalPages;
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.prev-button,
.next-button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: none;
  color: red;
}

.prev-button:disabled,
.next-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
}

.close-button {
  font-size: 2.5rem;
  color: red;
  align-self: flex-end;
  cursor: pointer;
}
.redirect {
  text-decoration: none;
  font-size: 2rem;
  text-align: center;
  margin: 2rem 0;
  color: blue;
  transition: all 0.7s ease-in-out;
  cursor: pointer;
}

.redirect:hover {
  color: cadetblue;
  transform: scale(1.2);
}
input[type="text"],
input[type="date"],
textarea {
  color: black;
  outline: none;
  border: 0.2rem solid rgb(58, 46, 16);
}

input[type="text"] {
  padding: 0 1.9rem;
}
textarea {
  padding: 0 1.9rem;
}
input[type="date"] {
  padding: 0 3rem;
}
.editing {
  display: flex;
  gap: 1.2rem;
}
.list__items {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 2rem;
  border: 0.2rem solid rosybrown;
  padding: 1rem 2rem;
}
.list__notes {
  list-style: none;
  margin: 20px;
  width: 80%;
  min-height: 100px;
  padding: 20px;
}
.title {
  font-size: 1.4rem;
  font-weight: 600;
  border-right: 0.2rem solid gold;
  padding: 0 1rem 0 0;
}

.content {
  font-size: 1.4rem;
  font-weight: 400;
  border-right: 0.2rem solid gold;
  padding: 0 1rem 0 0;
}

.delete {
  background: none;
  border: none;
  color: red;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.7s ease;
  border-right: 0.2rem solid gold;
  padding: 0 1rem 0 0;
}

.delete:hover {
  color: rgb(123, 1, 1);
  transform: scale(1.2);
}

.save {
  background: none;
  border: none;
  color: green;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.7s ease;
  padding: 0 1rem 0 0;
}

.save:hover {
  color: darkgreen;
  transform: scale(1.2);
}

.cancel {
  background: none;
  border: none;
  color: red;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.7s ease;
  padding: 0 1rem 0 0;
}

.cancel:hover {
  color: rgb(123, 1, 1);
  transform: scale(1.2);
}

.edit {
  background: none;
  border: none;
  color: seagreen;
  transition: all 0.7s ease;
  cursor: pointer;
  font-size: 1.5rem;
}

.edit:hover {
  color: green;
  transform: scale(1.2);
}
.list {
  gap: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15rem;
}
</style>

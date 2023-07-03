<template>
  <div class="container">
    <div class="form-container">
      <keep-alive>
        <notes-form @save-data="saveData" v-if="showNoteForm"></notes-form>
      </keep-alive>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 200px; /* Set a fixed height for the container */
}

.form-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px; /* Adjust bottom value to leave space for the button */
}

.button-container {
  position: absolute;
  bottom: 0;
  left: 50rem;
  right: 0;
  height: 50px; /* Set a fixed height for the button container */
  display: flex;
  align-items: center;
  justify-content: center;
  top: 30rem;
}
</style>

<script>
import NotesForm from "./NotesForm.vue";
export default {
  components: {
    NotesForm,
  },
  data() {
    return {
      showNoteForm: true,
    };
  },
  methods: {
    showForm() {
      this.showNoteForm = !this.showNoteForm;
    },
    saveData(data) {
      console.log("displatch", data);
      this.$store.dispatch("notes/addNote", data);
    },
  },
};
</script>

<style scoped>
.form__field {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0rem 3rem 0;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.form__control {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.title__text,
.content__text,
.date__text {
  font-size: 1.8rem;
  font-weight: 400;
  font-family: "Times New Roman", Times, serif;
  color: goldenrod;
}

.form__button {
  padding: 0.6rem 1.2rem;
  border: none;
  background: none;
  color: green;
  cursor: pointer;
  transition: all 0.4s ease-in;
}

.form__button:hover {
  cursor: pointer;
  color: darkgreen;
  transform: scale(1.2);
}
input[type="text"],
input[type="date"],
textarea {
  color: black;
  outline: none;
  border: 0.2rem solid goldenrod;
}

input[type="text"] {
  padding: 0 1.9rem;
}
input[type="date"] {
  padding: 0 3rem;
}
.redirect {
  text-decoration: none;
  text-align: center;
  font-size: 2.5rem;
  color: orange;
  cursor: pointer;
  transition: all 0.4s ease;
}

.redirect:hover {
  color: orangered;
  transform: scale(1.2);
}
</style>
<template>
  <div class="form__field">
    <form @submit.prevent="sendData" class="form">
      <div class="form__control">
        <label class="title__text" for="title">Title</label>
        <input
          type="text"
          name="title"
          v-model.trim="enteredTitle.val"
          @blur="clearValidity('enteredTitle')"
        />
      </div>
      <div class="form__control">
        <label class="content__text" for="content">Content</label>
        <textarea
          type="textarea"
          name="content"
          v-model.trim="enteredContent.val"
          @blur="clearValidity('enteredContent')"
        />
      </div>
      <div class="form__control">
        <label class="date__text" for="date">Date</label>
        <input
          type="date"
          name="date"
          v-model="enteredDate.val"
          @blur="clearValidity('enteredDate')"
        />
      </div>
      <div class="form__control">
        <button class="form__button">Submit</button>
      </div>
      <router-link class="redirect" to="/notes">Go to Notes</router-link>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      formIsValid: true,
      enteredTitle: {
        val: "",
        valid: true,
      },
      enteredContent: {
        val: "",
        valid: true,
      },
      enteredDate: {
        val: "",
        valid: true,
      },
    };
  },

  methods: {
    clearValidity(input) {
      this[input].valid = true;
    },
    validateForm() {
      if (this.enteredTitle.val === "" && this.enteredTitle.val.length < 4) {
        (this.formIsValid = false), (this.enteredTitle.valid = false);
      }

      if (
        this.enteredContent.val === "" &&
        this.enteredContent.val.length < 8
      ) {
        (this.formIsValid = false), (this.enteredContent.valid = false);
      }

      if (this.enteredDate.val === "") {
        this.formIsValid = false;
        this.enteredDate.valid = false;
      }
    },
    sendData() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const data = {
        id: new Date().getMinutes(),
        title: this.enteredTitle.val,
        content: this.enteredContent.val,
        date: new Date(this.enteredDate.val),
      };
      this.enteredTitle.val = "";
      this.enteredContent.val = "";
      this.enteredDate.val = "";
      this.$emit("save-data", data);
      this.$router.replace("/notes");
    },
  },
};
</script>

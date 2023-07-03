<style scoped>
.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.title,
.content,
.date {
  font-size: 1.5rem;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.title__sub,
.content__sub,
.date__sub {
  font-size: 2rem;
  color: gold;
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

div {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>

<template>
  <div>
    <base-card>
      <div class="items">
        <p class="title">
          <span class="title__sub"> Title: </span> {{ title }}
        </p>
        <p class="content">
          <span class="content__sub">Content:</span> {{ content }}
        </p>
        <p class="date">
          <span class="date__sub">Date:</span> {{ formattedDate }}
        </p>
      </div>
    </base-card>
    <router-link class="redirect" to="/notes">Go to Notes</router-link>
  </div>
</template>

<script>
import { format } from "date-fns";
import BaseCard from "../../ui/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
  props: ["id"],
  data() {
    return {
      note: null,
    };
  },
  computed: {
    formattedDate() {
      if (this.note ? this.note.createdAt : "") {
        return this.note ? this.formatDate(this.note.createdAt) : "";
      }
      return "";
    },
    title() {
      return this.note ? this.note.title : "";
    },
    content() {
      return this.note ? this.note.content : "";
    },
  },

  methods: {
    formatDate(timestamp) {
      return format(new Date(timestamp), "yyyy-MM-dd");
    },
  },

  async created() {
    await this.$store.dispatch("notes/loadData");
    this.note = this.$store.getters["notes/getNotes"].find(
      (note) => note.id === this.id
    );
  },
};
</script>

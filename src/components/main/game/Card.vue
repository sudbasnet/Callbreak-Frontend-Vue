<template>
  <div class="card">
    <span>{{ cardVal(this.cardvalue) }}</span>
    <img v-if="this.cardsuit === 'clubs'" src="../../../assets/clubs.png" />
    <img v-if="this.cardsuit === 'diamonds'" src="../../../assets/diamonds.png" />
    <img v-if="this.cardsuit === 'hearts'" src="../../../assets/hearts.png" />
    <img v-if="this.cardsuit === 'spades'" src="../../../assets/spades.png" />
  </div>
</template>

<script>
export default {
  props: ["cardvalue", "cardsuit"],
  methods: {
    cardVal(val) {
      if (val === "jack") {
        return "J";
      } else if (val === "queen") {
        return "Q";
      } else if (val === "king") {
        return "K";
      } else if (val === "ace") {
        return "A";
      }
      return val;
    },
  },
};
</script>

<style scoped>
.card {
  display: grid;
  justify-content: center;
  align-content: space-between;
  border: 2px solid;
  min-width: 1em;
  min-height: 2.5em;
  padding: 0.1em;
  background-color: ivory;
}

.card:hover {
  align-self: flex-start;
}
</style>
<template>
  <div class="card" :class="`card-on-table-${position}`">
    <span>{{ cardVal(card.value) }}</span>
    <img v-if="card.suit === 'clubs'" src="/img/suits/clubs.png" />
    <img v-if="card.suit === 'diamonds'" src="/img/suits/diamonds.png" />
    <img v-if="card.suit === 'hearts'" src="/img/suits/hearts.png" />
    <img v-if="card.suit === 'spades'" src="/img/suits/spades.png" />
  </div>
</template>

<script>
export default {
  props: ["card", "position"],
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
  width: 25px;
  height: 48px;
  padding: 0.1em;
  background-color: ivory;
}

@media only screen and (max-width: 510px) {
  .card {
    width: 18px;
    height: 38px;
  }
}
</style>
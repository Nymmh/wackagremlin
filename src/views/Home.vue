<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref } from "vue";

import hole from "../assets/hole.png";

defineComponent({
  name: "Home",
});

const columnLimit = ref<number>(4);
const rowLimit = ref<number>(4);
const holeLimit = ref<number>(0);
const gremlinLocation = ref<number>(-1);

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleClick = (i: number) => {
  if (i === gremlinLocation.value) {
    let randomNum = randomNumber(1, holeLimit.value);
    if (randomNum !== gremlinLocation.value) {
      gremlinLocation.value = randomNum;
    } else {
      handleClick(i);
    }
  }
};

onMounted(() => {
  holeLimit.value = columnLimit.value * rowLimit.value;
  gremlinLocation.value = randomNumber(1, holeLimit.value);
});
</script>

<template>
  <div class="home__wrapper">
    <div class="home">
      <div v-for="i in holeLimit" :key="i" class="home__hit-box-wrapper">
        <div class="home__hit-box" @click="handleClick(i)">
          <div v-if="gremlinLocation === i" class="home__gremlin-wrapper"></div>
          <img :src="hole" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/scss/breakpoint.scss";
.home {
  display: grid;
  grid-template-columns: repeat(v-bind(columnLimit), 1fr);
  width: 100%;

  &__wrapper {
    display: flex;
    height: calc(100vh - 20px);
  }

  &__hit-box-wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }

  &__hit-box {
    height: 50px;
    width: 50px;

    @include breakpoint.min-width(breakpoint.$breakpoint--5) {
      height: 100px;
      width: 100px;
    }
  }

  &__gremlin-wrapper {
    background: red;
    position: absolute;
    height: 50px;
    width: 50px;
  }
}
</style>

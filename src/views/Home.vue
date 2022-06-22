<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref } from "vue";

import hole from "../assets/hole.png";

import dead1 from "../assets/dead1.png";
import dead2 from "../assets/dead2.png";

import wait1 from "../assets/wait1.png";
import wait2 from "../assets/wait2.png";

defineComponent({
  name: "Home",
});

const clickEnabled = ref<boolean>(false);

const columnLimit = ref<number>(4);
const rowLimit = ref<number>(4);
const holeLimit = ref<number>(0);
const gremlinLocation = ref<number>(-1);
const waitSrc = ref<string>(wait1);
const whacks = ref<number>(0);

const deadImages = [dead1, dead2];
const waitImages = [wait1, wait2];

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleClick = (i: number) => {
  if (!clickEnabled.value) {
    return;
  }

  if (i === gremlinLocation.value) {
    clickEnabled.value = false;
    let deadImageIndex = randomNumber(0, deadImages.length - 1);
    whacks.value++;
    waitSrc.value = deadImages[deadImageIndex];

    setTimeout(() => {
      let randomNum = randomNumber(1, holeLimit.value);
      setRandomWaitImage();
      gremlinLocation.value = randomNum;
      clickEnabled.value = true;
    }, 500);
  }
};

const setRandomWaitImage = () => {
  let waitIndex = randomNumber(0, waitImages.length - 1);
  waitSrc.value = waitImages[waitIndex];
};

onMounted(() => {
  holeLimit.value = columnLimit.value * rowLimit.value;
  setRandomWaitImage();
  gremlinLocation.value = randomNumber(1, holeLimit.value);
  clickEnabled.value = true;
});
</script>

<template>
  <div class="home__wrapper">
    <div class="home">
      <p class="home__whacks">whacks: {{ whacks }}</p>
      <div v-for="i in holeLimit" :key="i" class="home__hit-box-wrapper">
        <div class="home__hit-box" @click="handleClick(i)">
          <div v-if="gremlinLocation === i" class="home__gremlin-wrapper">
            <img :src="waitSrc" alt="" />
          </div>
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
  position: relative;
  width: 100%;

  &__wrapper {
    display: flex;
    height: calc(100vh - 20px);
    margin-left: auto;
    margin-right: auto;
    max-width: 1366px;
  }

  &__whacks {
    position: absolute;
    text-align: center;
    width: 100%;
  }

  &__hit-box-wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }

  &__hit-box {
    height: 50px;
    position: relative;
    width: 50px;

    @include breakpoint.min-width(breakpoint.$breakpoint--5) {
      height: 100px;
      width: 100px;
    }
  }

  &__gremlin-wrapper {
    position: absolute;
    height: 50px;
    width: 50px;

    @include breakpoint.min-width(breakpoint.$breakpoint--5) {
      height: 100px;
      width: 100px;
    }
  }
}
</style>

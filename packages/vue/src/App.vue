<script setup lang="ts">
import { ref } from 'vue';
import StepsGuide, { type StepsGuideIns, type Step, StepsGuideDirective as VStepsGuideDirective } from '../lib';
import '../lib/style.css'
// @ts-ingnore
const VStepsGuide = VStepsGuideDirective;

const positionSteps: Step[] = [
  { title: '弹出位置 top-left', content: 'Steps Guide', element: '.top-left', position: 'top-left' },
  { title: '弹出位置 top', content: 'Steps Guide', element: '.top', position: 'top' },
  { title: '弹出位置 top-right', content: 'Steps Guide', element: '.top-right', position: 'top-right' },
  { title: '弹出位置 right', content: 'Steps Guide', element: '.right', position: 'right' },
  { title: '弹出位置 bottom-right', content: 'Steps Guide', element: '.bottom-right', position: 'bottom-right' },
  { title: '弹出位置 bottom', content: 'Steps Guide', element: '.bottom', position: 'bottom' },
  { title: '弹出位置 bottom-left', content: 'Steps Guide', element: '.bottom-left', position: 'bottom-left' },
  { title: '弹出位置 left', content: 'Steps Guide', element: '.left', position: 'left' },
]
let steps = ref(positionSteps);
const stepRef = ref<StepsGuideIns | null>(null);
const handleClick = (index: number) => {
  stepRef.value?.showGuide(index);
  // console.log(stepRef.value?.showClose)
};
const handleStepChange = (index: number, prevIndex: number) => {
  console.log(index, prevIndex)
  /* code */
  return true;
};

console.log()

</script>

<template>
  <div class="flex mb-s justify-center">
    <button class="top-left ml-s" @click="handleClick(0)">Top-left 1</button>
    <button class="top ml-s" @click="handleClick(1)">Top 2</button>
    <button class="top-right ml-s" @click="handleClick(2)">Top-right 3</button>
  </div>
  <div class="flex mb-s justify-center">
    <button class="left ml-s" @click="handleClick(7)">Left 8</button>
    <button class="right ml-s" @click="handleClick(3)">Right 4</button>
  </div>
  <div class="flex mb-s justify-center">
    <button class="bottom-left ml-s" @click="handleClick(6)">Bottom-left 7</button>
    <button class="bottom ml-s" @click="handleClick(5)">Bottom 6</button>
    <button class="bottom-right ml-s" @click="handleClick(4)">Bottom-right 5</button>
  </div>
  <StepsGuide ref="stepRef" :steps="steps" :step-change="handleStepChange"></StepsGuide>

  <hr />

  <div class="flex mb-s justify-center">
    <button class="top-left ml-s" v-steps-guide:default.1="'指令一'">指令 1</button>
    <button class="top ml-s" v-StepsGuide.2="'指令 2'">指令 2</button>
    <button class="top-right ml-s" v-StepsGuide.3="'指令 3'">指令 3</button>
  </div>
  <div class="flex mb-s justify-center">
    <button class="left ml-s" v-StepsGuide.8="'指令 8'">指令 8</button>
    <button class="right ml-s" v-StepsGuide.4="'指令 4'">指令 4</button>
  </div>
  <div class="flex mb-s justify-center">
    <button class="bottom-left ml-s" v-StepsGuide.7="'指令 7'">指令 7</button>
    <button class="bottom ml-s" v-StepsGuide.6="'指令 6'">指令 6</button>
    <button class="bottom-right ml-s" v-StepsGuide.5="'指令 5'">指令 5</button>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  font-size: 14px;
}

.mb-s {
  margin-bottom: 20px;
}

.ml-s {
  margin-left: 20px;
}

button {
  width: 180px;
  height: 60px;
}

.justify-center {
  justify-content: center;
}
</style>

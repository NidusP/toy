<script setup lang="ts">
import { stepsGuideProps } from './utils';
import { useStepsGuide } from './hooks';

const props = defineProps(stepsGuideProps)
const { stepsRef, stepIndex, currentStep, stepsCount, showGuide, closeGuide } = useStepsGuide(props)

const bgColor = '#5e7ce0'
defineExpose({
  stepIndex,
  closeGuide,
  showGuide
})

</script>

<template>
  <Teleport to="body">
    <div ref="stepsRef" class="steps-guide" v-show="currentStep">
      <div class="steps-guide__shining-dot"></div>
      <div class="steps-guide__shining-plus"></div>
      <div class="steps-guide__arrow"></div>
      <div class="steps-guide__container" v-if="currentStep">
        <p class="steps-guide__title">{{ currentStep.title }}</p>
        <div v-if="props.showClose" class="steps-guideicon icon-close" @click="closeGuide"></div>
        <div>{{ currentStep.content }}</div>
        <div class="steps-guide__ctrl">
          <div v-if="props.showDots" class="steps-guide__dots">
            <em v-for="(_item, index) in  props.steps " :key="index" :class="['steps-guide__dots--dot',
                index === stepIndex ? 'active' : '']"></em>
          </div>
          <div class="steps-guide__btn">
            <div v-show="stepIndex > 0" class="steps-guide__prev-step" @click="showGuide(stepIndex - 1)">
              上一步
            </div>
            <div v-if="stepIndex === stepsCount - 1" @click="closeGuide">我知道啦</div>
            <div v-else @click="showGuide(stepIndex + 1)">下一步</div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
:root {
  --toy-global-bg: #f6f6f8;
  --toy-glass-morphism-bg: rgba(245, 246, 248, 0.9);
  --toy-global-bg-normal: #ffffff;
  --toy-base-bg: #ffffff;
  --toy-base-bg-dark: #252b3a;
  --toy-brand: #5e7ce0;
  --toy-brand-foil: #f2f2f3;
  --toy-brand-hover: #7693f5;
  --toy-brand-active: #526ecc;
  --toy-brand-active-focus: #344899;
  --toy-contrast: #c7000b;
  --toy-text: #252b3a;
  --toy-text-weak: #575d6c;
  --toy-light-text: #ffffff;
  --toy-dark-text: #252b3a;
  --toy-line: #d7d8da;
  --toy-dividing-line: #f2f2f3;
  --toy-block: #ffffff;
  --toy-area: #f5f5f5;
  --toy-danger: #f66f6a;
  --toy-warning: #fac20a;
  --toy-waiting: #beccfa;
  --toy-success: #50d4ab;
  --toy-info: #5e7ce0;
  --toy-initial: #e9edfa;
  --toy-label-bg: #e9edfa;
  --toy-connected-overlay-bg: #ffffff;
  --toy-connected-overlay-line: #526ecc;
  --toy-fullscreen-overlay-bg: #ffffff;
  --toy-feedback-overlay-bg: #464d6e;
  --toy-feedback-overlay-text: #dfe1e6;
  --toy-embed-search-bg: #f2f2f3;
  --toy-embed-search-bg-hover: #eef0f5;
  --toy-highlight-overlay: rgba(255, 255, 255, 0.8);
  --toy-range-item-hover-bg: #e9edfa;
  --toy-contrast-hover: #d64a52;
  --toy-contrast-active: #b12220;
  --toy-shadow-length-feedback-overlay: 0 8px 16px 0;
  --toy-border-radius: 4px;
  --toy-border-radius-feedback: 4px;
  --toy-font-size: 14px;
  --toy-font-size-page-title: 16px;
}

$toy-prefix: '';

.#{$toy-prefix}steps-guide {
  width: 400px;
  min-height: 160px;
  background: var(--toy-brand);
  box-shadow: var(--toy-shadow-length-feedback-overlay) rgba(81, 112, 255, 0.3);
  border-radius: var(--toy-border-radius-feedback);
  font-size: var(--toy-font-size);
  color: var(--toy-light-text);
  padding: 20px;
  // absolute
  position: fixed;

  .#{$toy-prefix}steps-guide__title {
    font-size: var(--toy-font-size-page-title);
    opacity: 1;
    margin: 0 0 20px 0;
    padding: 0;
  }

  >.#{$toy-prefix}steps-guide__arrow,
  >.#{$toy-prefix}steps-guide__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  >.#{$toy-prefix}steps-guide__arrow {
    border-width: 8px;
  }

  &.left>.#{$toy-prefix}steps-guide__arrow {
    top: 23px;
    right: -6px;
    margin-top: -3px;
    border-right-width: 0;
    transform: rotate(-135deg);
    border-left-color: var(--toy-brand);
  }

  &.top>.#{$toy-prefix}steps-guide__arrow,
  &.top-left>.#{$toy-prefix}steps-guide__arrow,
  &.top-right>.#{$toy-prefix}steps-guide__arrow {
    bottom: -6px;
    border-bottom-width: 0;
    border-top-color: var(--toy-brand);
    transform: rotate(135deg);
  }

  &.top>.#{$toy-prefix}steps-guide__arrow {
    left: calc(50% - 4px);
  }

  &.top-left>.#{$toy-prefix}steps-guide__arrow {
    left: 23px;
  }

  &.top-right>.#{$toy-prefix}steps-guide__arrow {
    right: 23px;
    transform: rotate(-135deg);
  }

  &.right>.#{$toy-prefix}steps-guide__arrow {
    top: 23px;
    left: -6px;
    margin-top: -3px;
    border-left-width: 0;
    transform: rotate(135deg);
    border-right-color: var(--toy-brand);
  }

  &.bottom>.#{$toy-prefix}steps-guide__arrow,
  &.bottom-left>.#{$toy-prefix}steps-guide__arrow,
  &.bottom-right>.#{$toy-prefix}steps-guide__arrow {
    top: -6px;
    margin-left: 3px;
    border-top-width: 0;
    border-bottom-color: var(--toy-brand);
  }

  &.bottom>.#{$toy-prefix}steps-guide__arrow {
    left: calc(50% - 4px);
    transform: rotate(-135deg);
  }

  &.bottom-right>.#{$toy-prefix}steps-guide__arrow {
    right: 23px;
    transform: rotate(135deg);
  }

  &.bottom-left>.#{$toy-prefix}steps-guide__arrow {
    left: 23px;
    transform: rotate(-135deg);
  }

  >.#{$toy-prefix}steps-guide__shining-dot,
  .#{$toy-prefix}steps-guide__shining-plus {
    position: absolute;
    background: var(--toy-brand);
    width: 6px;
    height: 6px;
    border-radius: var(--toy-border-radius-feedback);
  }

  &.left>.#{$toy-prefix}steps-guide__shining-dot,
  &.left>.#{$toy-prefix}steps-guide__shining-plus {
    top: 25px;
    right: -30px;
  }

  &.right>.#{$toy-prefix}steps-guide__shining-dot,
  &.right>.#{$toy-prefix}steps-guide__shining-plus {
    top: 25px;
    left: -30px;
  }

  &.top>.#{$toy-prefix}steps-guide__shining-dot,
  &.top>.#{$toy-prefix}steps-guide__shining-plus {
    left: calc(50% - 3px);
    bottom: -30px;
  }

  &.top-left>.#{$toy-prefix}steps-guide__shining-dot,
  &.top-left>.#{$toy-prefix}steps-guide__shining-plus {
    left: 25px;
    bottom: -30px;
  }

  &.top-right>.#{$toy-prefix}steps-guide__shining-dot,
  &.top-right>.#{$toy-prefix}steps-guide__shining-plus {
    right: 25px;
    bottom: -30px;
  }

  &.bottom>.#{$toy-prefix}steps-guide__shining-dot,
  &.bottom>.#{$toy-prefix}steps-guide__shining-plus {
    left: calc(50% - 3px);
    top: -30px;
  }

  &.bottom-right>.#{$toy-prefix}steps-guide__shining-dot,
  &.bottom-right>.#{$toy-prefix}steps-guide__shining-plus {
    top: -30px;
    right: 21px;
  }

  &.bottom-left>.#{$toy-prefix}steps-guide__shining-dot,
  &.bottom-left>.#{$toy-prefix}steps-guide__shining-plus {
    top: -30px;
    left: 21px;
  }

  .#{$toy-prefix}steps-guide__shining-plus {
    animation: devui-glow 2s 0s infinite;
  }

  .#{$toy-prefix}steps-guide__container {
    position: relative;

    >.icon-close {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }

    .#{$toy-prefix}steps-guide__ctrl {
      display: flex;
      flex-wrap: wrap;

      .#{$toy-prefix}steps-guide__dots {
        color: var(--toy-light-text);
        position: relative;
        top: 25px;
        font-size: var(--toy-font-size);
        height: 30px;

        >.#{$toy-prefix}steps-guide__dots--dot {
          display: inline-block;
          margin: 0 5px 0 2px;
          width: 10px;
          height: 10px;
          opacity: 0.2;
          background-color: #ffffff;
          border-radius: 50%;

          &.active {
            opacity: 1;
          }
        }
      }

      .#{$toy-prefix}steps-guide__btn {
        display: flex;
        flex-flow: row nowrap;
        flex-grow: 1;
        justify-content: flex-end;
        padding: 20px 0 0 0;
        white-space: nowrap;

        >div {
          color: var(--toy-light-text);
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--toy-border-radius);
          padding: 5px 15px;
          cursor: pointer;
          margin-left: 10px;

          &.#{$toy-prefix}steps-guide__prev-step {
            background: none;
            border: solid 1px rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }
}

/* 以下定义动画帧 */
@keyframes devui-glow {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }

  25% {
    transform: scale(2);
    opacity: 0.3;
  }

  50% {
    transform: scale(3);
    opacity: 0.1;
  }

  75% {
    transform: scale(2);
    opacity: 0.3;
  }

  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}
</style>

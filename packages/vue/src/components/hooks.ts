import { StepsGuide } from '@toy/core';
import { computed, nextTick, onMounted, ref } from 'vue';
import type { StepsGuideProps } from './utils';

export function useStepsGuide(props: StepsGuideProps, emit: (arg0: 'closeGuide') => void) {
  const stepIndex = ref(0);
  const isShow = ref(false);
  const currentStep = computed(() => props.steps[stepIndex.value]);
  const stepsCount = computed(() => props.steps.length);
  const stepsRef = ref<HTMLDivElement | null>(null);
  let stepsGuide: StepsGuide;

  onMounted(() => {
    stepsGuide = new StepsGuide(props.steps, stepsRef.value!);
    stepsGuide.on('step', (index) => {
      stepIndex.value = index;
    });

    stepsGuide.on('error', (info) => {
      console.log('info', info);
    });
  });
  function showGuide(index = 0) {
    stepsGuide.setCurrent(index);
  }

  function closeGuide() {
    emit('closeGuide');
    stepsGuide.setCurrent(-1);
  }

  return {
    stepsRef,
    stepIndex,
    currentStep,
    stepsCount,
    isShow,
    showGuide,
    closeGuide,
  } as const;
}

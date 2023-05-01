import type { Step } from '@toy/core';
import type { ExtractPropTypes, PropType } from 'vue';

type positionType = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';
export type positionConf =
  | {
      left: number;
      top: number;
      type: string;
    }
  | positionType;

export const stepsGuideProps = {
  steps: {
    type: Array as PropType<Step[]>,
    required: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showDots: {
    type: Boolean,
    default: true,
  },
  scrollToTargetSwitch: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 1100,
  },
  stepChange: {
    type: Function,
    default() {
      return true;
    },
  },
} as const;

export type StepsGuideProps = ExtractPropTypes<typeof stepsGuideProps>;

import type { Step } from '@toy/core';
import type { ExtractPropTypes, PropType } from 'vue';
type positionType = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';
export type positionConf = {
    left: number;
    top: number;
    type: string;
} | positionType;
export declare const stepsGuideProps: {
    readonly steps: {
        readonly type: PropType<Step[]>;
        readonly required: true;
    };
    readonly showClose: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showDots: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollToTargetSwitch: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 1100;
    };
    readonly stepChange: {
        readonly type: FunctionConstructor;
        readonly default: () => boolean;
    };
};
export type StepsGuideProps = ExtractPropTypes<typeof stepsGuideProps>;
export {};

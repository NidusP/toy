import type { StepsGuideProps } from './typing';
export declare function useStepsGuide(props: StepsGuideProps, emit: (arg0: 'closeGuide') => void): {
    readonly stepsRef: import("vue").Ref<HTMLDivElement | null>;
    readonly stepIndex: import("vue").Ref<number>;
    readonly currentStep: import("vue").ComputedRef<import("@toy/core").Step>;
    readonly stepsCount: import("vue").ComputedRef<number>;
    readonly isShow: import("vue").Ref<boolean>;
    readonly showGuide: (index?: number) => void;
    readonly closeGuide: () => void;
};

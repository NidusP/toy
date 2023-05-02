declare const _sfc_main: import("vue").DefineComponent<{
    readonly steps: {
        readonly type: import("vue").PropType<import("@toy/core").Step[]>;
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
}, {
    stepIndex: import("vue").Ref<number>;
    closeGuide: () => void;
    showGuide: (index?: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "closeGuide"[], "closeGuide", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly steps: {
        readonly type: import("vue").PropType<import("@toy/core").Step[]>;
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
}>> & {
    onCloseGuide?: ((...args: any[]) => any) | undefined;
}, {
    readonly showClose: boolean;
    readonly showDots: boolean;
    readonly scrollToTargetSwitch: boolean;
    readonly zIndex: number;
    readonly stepChange: Function;
}>;
export default _sfc_main;

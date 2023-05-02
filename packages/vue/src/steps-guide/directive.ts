import type { Step } from '@toy/core';
import { ref, createVNode, render, type Directive, type Ref, type App } from 'vue';
// import { StepsGuideController } from './utils';
import StepsGuide from './index';

const guideMaps = new Map<string, Ref<Step[]>>();
let mask: null | HTMLDivElement = document.createElement('div');

function assemble(name: string, index: number, step: Step) {
  if (!guideMaps.has(name)) {
    const steps = ref<Step[]>([]);
    steps.value[index] = step;
    guideMaps.set(name, steps);
    render(
      createVNode(StepsGuide, {
        steps: steps.value,
        onCloseGuide() {
          render(null, mask!);
          mask = null;
        },
      }),
      mask!
    );
  } else {
    guideMaps.get(name)!.value[index] = step;
  }
}

const StepsGuideDirective: Directive<HTMLElement, string> = {
  mounted(el, binding, _vNode) {
    const { arg, modifiers, value } = binding;
    const name = arg || 'default';
    const [indexStr] = Object.keys(modifiers);
    const index = Number.parseInt(indexStr);

    assemble(name, index - 1, { title: value, element: el });
    // render(createVNode(Input, { steps: [] }), el);
    // StepsGuideController.createStepGuide(binding.arg || 'default', binding.value);
  },
  // updated(el: HTMLElement, binding) {},
};
export default StepsGuideDirective;
export { StepsGuideDirective };
// export default {
//   install(app: App): void {
//     app.directive('stepsGuide', StepsGuideDirective);
//     // app.config.globalProperties.$loadingService = LoadingService;
//   },
// };


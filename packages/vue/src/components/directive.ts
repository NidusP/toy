import { type Directive, createVNode, render } from 'vue';
// import { StepsGuideController } from './utils';

const stepsGuideDirective: Directive<HTMLElement, string> = {
  mounted(el, binding, vNode) {
    console.log('mounted', el, binding);

    // render(createVNode(Input, { steps: [] }), el);
    // StepsGuideController.createStepGuide(binding.arg || 'default', binding.value);
  },
  updated(el: HTMLElement, binding) {},
};
export default stepsGuideDirective;

// export function useVStepsGuide(){
//   defineDirective
// }

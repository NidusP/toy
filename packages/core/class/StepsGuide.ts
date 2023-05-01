import { isString } from '../utils';
import { baseTopLeft } from '../utils/window';
import Observer from './Observer';

export type positionType = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';

export type StepContent = {
  title: string;
  content: string;
  position?: positionType;
};
export type Step = {
  element: string | HTMLElement;
} & StepContent;

export class StepsGuide extends Observer {
  steps: Step[];
  private ele: HTMLDivElement | null = null;
  private stepIndex = 0;
  private currentStepPosition: positionType = 'top';
  public destory: null | (() => void) = null;
  constructor(steps: Step[], ele?: HTMLDivElement) {
    super();
    this.steps = steps;

    if (ele) {
      this.ele = ele;
      this.init();
    }
  }

  private init() {
    this.setCurrent(0);

    const fn = this.updateGuidePosition.bind(this);
    window.addEventListener('resize', fn);

    this.destory = () => {
      window.removeEventListener('resize', fn);
      this.ele = null;
      this.steps = [];
      this.stepIndex = 0;
      this.destory = null;
    };
  }

  private emitStep() {
    this.emit('step', this.stepIndex);
  }

  public onceEle(ele: HTMLDivElement) {
    if (this.destory) return;
    this.ele = ele;
    this.init();
  }

  public setCurrent(index = 0) {
    this.stepIndex = index;
    this.emitStep();
    this.updateGuidePosition();
  }
  public next() {
    this.stepIndex++;
    this.emitStep();
  }

  public prev() {
    this.stepIndex--;
    this.emitStep();
  }

  public updateGuidePosition(): boolean {
    const stepGuideElement = this.ele;
    this.currentStepPosition && stepGuideElement.classList.remove(this.currentStepPosition);

    const currentStep = this.steps[this.stepIndex];
    if (!currentStep) {
      return false;
    }

    const [baseTop, baseLeft] = baseTopLeft();

    this.currentStepPosition = currentStep.position ?? this.currentStepPosition;
    let _left, _top;

    stepGuideElement.classList.add(this.currentStepPosition);

    let triggerElement = currentStep.element;
    if (isString(triggerElement)) {
      triggerElement = document.querySelector(triggerElement) as HTMLElement;
    }
    if (!triggerElement) {
      console.warn(`${triggerElement} 不存在!`);
      return false;
    }
    const targetRect = triggerElement.getBoundingClientRect();

    _left = targetRect.left + triggerElement.clientWidth / 2 - stepGuideElement.clientWidth / 2 + baseLeft;
    _top = targetRect.top + triggerElement.clientHeight / 2 - stepGuideElement.clientHeight / 2 + baseTop;

    const [y, x] = this.currentStepPosition.split('-');
    switch (y) {
      case 'top':
        _top += -stepGuideElement.clientHeight / 2 - triggerElement.clientHeight + 15;
        break;
      case 'bottom':
        _top += stepGuideElement.clientHeight / 2 + triggerElement.clientHeight - 15;
        break;
      case 'left':
        _top += stepGuideElement.clientHeight / 2 - triggerElement.clientHeight / 2;
        _left += -stepGuideElement.clientWidth / 2 - triggerElement.clientWidth / 2 - 15;
        break;
      case 'right':
        _top += stepGuideElement.clientHeight / 2 - triggerElement.clientHeight / 2;
        _left += stepGuideElement.clientWidth / 2 + triggerElement.clientWidth / 2 + 15;
        break;
    }
    switch (x) {
      case 'left':
        _left += stepGuideElement.clientWidth / 2 - triggerElement.clientWidth / 2;
        break;
      case 'right':
        _left += -stepGuideElement.clientWidth / 2 + triggerElement.clientWidth / 2;
        break;
    }
    stepGuideElement.style.left = _left + 'px';
    stepGuideElement.style.top = _top + 'px';

    // 位置更新后滚动视图
    stepGuideElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    return true;
  }
}

export default StepsGuide;

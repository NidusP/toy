import { ref, computed, onMounted, defineComponent, openBlock, createBlock, Teleport, withDirectives, createElementVNode, unref, createElementBlock, toDisplayString, createCommentVNode, Fragment, renderList, normalizeClass, vShow, render, createVNode } from "vue";
const stepsGuideProps = {
  steps: {
    type: Array,
    required: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  showDots: {
    type: Boolean,
    default: true
  },
  scrollToTargetSwitch: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 1100
  },
  stepChange: {
    type: Function,
    default() {
      return true;
    }
  }
};
function isString(s) {
  return typeof s === "string" || Object.prototype.toString.call(s) === "[object String]";
}
function baseTopLeft() {
  const baseTop = window.pageYOffset - document.documentElement.clientTop;
  const baseLeft = window.pageXOffset - document.documentElement.clientLeft;
  return [baseTop, baseLeft];
}
class Observer {
  constructor() {
    this.handlers = /* @__PURE__ */ new Map();
  }
  on(eventName, handler) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName).push(handler);
  }
  remove(eventName, handlerToRemove) {
    if (!this.handlers.has(eventName))
      return;
    const handlers = this.handlers.get(eventName);
    const index = handlers.indexOf(handlerToRemove);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }
  emit(eventName, ...args) {
    if (!this.handlers.has(eventName))
      return;
    this.handlers.get(eventName).forEach((handler) => handler(...args));
  }
}
class StepsGuide extends Observer {
  constructor(steps, ele) {
    super();
    this.ele = null;
    this.stepIndex = -1;
    this.currentStepPosition = "top";
    this.destory = null;
    this.steps = steps;
    if (ele) {
      this.ele = ele;
      this.init();
    }
  }
  init() {
    this.setCurrent(0);
    const fn = this.updateGuidePosition.bind(this);
    window.addEventListener("resize", fn);
    this.destory = () => {
      window.removeEventListener("resize", fn);
      this.setCurrent(-1);
    };
  }
  emitStep() {
    this.emit("step", this.stepIndex);
  }
  onceEle(ele) {
    if (this.destory)
      return;
    this.ele = ele;
    this.init();
  }
  setCurrent(index = 0) {
    this.stepIndex = index;
    this.emitStep();
    this.updateGuidePosition();
  }
  updateGuidePosition() {
    const stepGuideElement = this.ele;
    if (!stepGuideElement)
      return false;
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
      triggerElement = document.querySelector(triggerElement);
    }
    if (!triggerElement) {
      console.warn(`${triggerElement} 不存在!`);
      return false;
    }
    const targetRect = triggerElement.getBoundingClientRect();
    _left = targetRect.left + triggerElement.clientWidth / 2 - stepGuideElement.clientWidth / 2 + baseLeft;
    _top = targetRect.top + triggerElement.clientHeight / 2 - stepGuideElement.clientHeight / 2 + baseTop;
    const [y, x] = this.currentStepPosition.split("-");
    switch (y) {
      case "top":
        _top += -stepGuideElement.clientHeight / 2 - triggerElement.clientHeight + 15;
        break;
      case "bottom":
        _top += stepGuideElement.clientHeight / 2 + triggerElement.clientHeight - 15;
        break;
      case "left":
        _top += stepGuideElement.clientHeight / 2 - triggerElement.clientHeight / 2;
        _left += -stepGuideElement.clientWidth / 2 - triggerElement.clientWidth / 2 - 15;
        break;
      case "right":
        _top += stepGuideElement.clientHeight / 2 - triggerElement.clientHeight / 2;
        _left += stepGuideElement.clientWidth / 2 + triggerElement.clientWidth / 2 + 15;
        break;
    }
    switch (x) {
      case "left":
        _left += stepGuideElement.clientWidth / 2 - triggerElement.clientWidth / 2;
        break;
      case "right":
        _left += -stepGuideElement.clientWidth / 2 + triggerElement.clientWidth / 2;
        break;
    }
    stepGuideElement.style.left = _left + "px";
    stepGuideElement.style.top = _top + "px";
    stepGuideElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
    return true;
  }
}
function useStepsGuide(props, emit) {
  const stepIndex = ref(0);
  const isShow = ref(false);
  const currentStep = computed(() => props.steps[stepIndex.value]);
  const stepsCount = computed(() => props.steps.length);
  const stepsRef = ref(null);
  let stepsGuide;
  onMounted(() => {
    stepsGuide = new StepsGuide(props.steps, stepsRef.value);
    stepsGuide.on("step", (index) => {
      stepIndex.value = index;
    });
    stepsGuide.on("error", (info) => {
      console.log("info", info);
    });
  });
  function showGuide(index = 0) {
    stepsGuide.setCurrent(index);
  }
  function closeGuide() {
    emit("closeGuide");
    stepsGuide.setCurrent(-1);
  }
  return {
    stepsRef,
    stepIndex,
    currentStep,
    stepsCount,
    isShow,
    showGuide,
    closeGuide
  };
}
const _hoisted_1 = /* @__PURE__ */ createElementVNode("div", { class: "steps-guide__shining-dot" }, null, -1);
const _hoisted_2 = /* @__PURE__ */ createElementVNode("div", { class: "steps-guide__shining-plus" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("div", { class: "steps-guide__arrow" }, null, -1);
const _hoisted_4 = {
  key: 0,
  class: "steps-guide__container"
};
const _hoisted_5 = { class: "steps-guide__title" };
const _hoisted_6 = { class: "steps-guide__ctrl" };
const _hoisted_7 = {
  key: 0,
  class: "steps-guide__dots"
};
const _hoisted_8 = { class: "steps-guide__btn" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StepsGuide",
  props: stepsGuideProps,
  emits: ["closeGuide"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const { stepsRef, stepIndex, currentStep, stepsCount, showGuide, closeGuide } = useStepsGuide(props, emit);
    expose({
      stepIndex,
      closeGuide,
      showGuide
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        withDirectives(createElementVNode("div", {
          ref_key: "stepsRef",
          ref: stepsRef,
          class: "steps-guide"
        }, [
          _hoisted_1,
          _hoisted_2,
          _hoisted_3,
          unref(currentStep) ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createElementVNode("p", _hoisted_5, toDisplayString(unref(currentStep).title), 1),
            props.showClose ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "steps-guideicon icon-close",
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(closeGuide) && unref(closeGuide)(...args))
            })) : createCommentVNode("", true),
            createElementVNode("div", null, toDisplayString(unref(currentStep).content), 1),
            createElementVNode("div", _hoisted_6, [
              props.showDots ? (openBlock(), createElementBlock("div", _hoisted_7, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(props.steps, (_item, index) => {
                  return openBlock(), createElementBlock("em", {
                    key: index,
                    class: normalizeClass([
                      "steps-guide__dots--dot",
                      index === unref(stepIndex) ? "active" : ""
                    ])
                  }, null, 2);
                }), 128))
              ])) : createCommentVNode("", true),
              createElementVNode("div", _hoisted_8, [
                withDirectives(createElementVNode("div", {
                  class: "steps-guide__prev-step",
                  onClick: _cache[1] || (_cache[1] = ($event) => unref(showGuide)(unref(stepIndex) - 1))
                }, " 上一步 ", 512), [
                  [vShow, unref(stepIndex) > 0]
                ]),
                unref(stepIndex) === unref(stepsCount) - 1 ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  onClick: _cache[2] || (_cache[2] = //@ts-ignore
                  (...args) => unref(closeGuide) && unref(closeGuide)(...args))
                }, "我知道啦")) : (openBlock(), createElementBlock("div", {
                  key: 1,
                  onClick: _cache[3] || (_cache[3] = ($event) => unref(showGuide)(unref(stepIndex) + 1))
                }, "下一步"))
              ])
            ])
          ])) : createCommentVNode("", true)
        ], 512), [
          [vShow, unref(currentStep)]
        ])
      ]);
    };
  }
});
const StepsGuide_vue_vue_type_style_index_0_lang = "";
const guideMaps = /* @__PURE__ */ new Map();
let mask = document.createElement("div");
function assemble(name, index, step) {
  if (!guideMaps.has(name)) {
    const steps = ref([]);
    steps.value[index] = step;
    guideMaps.set(name, steps);
    render(
      createVNode(_sfc_main, {
        steps: steps.value,
        onCloseGuide() {
          render(null, mask);
          mask = null;
        }
      }),
      mask
    );
  } else {
    guideMaps.get(name).value[index] = step;
  }
}
const StepsGuideDirective = {
  mounted(el, binding, _vNode) {
    const { arg, modifiers, value } = binding;
    const name = arg || "default";
    const [indexStr] = Object.keys(modifiers);
    const index = Number.parseInt(indexStr);
    assemble(name, index - 1, { title: value, element: el });
  }
  // updated(el: HTMLElement, binding) {},
};
export {
  StepsGuideDirective,
  _sfc_main as default
};

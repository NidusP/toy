import { StepsGuide as StepsGuideClass } from '@toy/core';
import { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

import './steps-guide.scss';

const StepsGuide = forwardRef(({ steps, showClose, showDots }: { steps: []; showClose: true; showDots: true }, ref) => {
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = useMemo(() => steps[stepIndex], [stepIndex]);
  const stepsCount = useMemo(() => steps.length, [steps]);

  const stepsGuide = useMemo(() => new StepsGuideClass(steps, stepsRef.current!), []);

  useEffect(() => {
    stepsGuide.onceEle(stepsRef.current!);
    stepsGuide.on('step', (index) => {
      setStepIndex(index);
    });
  }, []);

  function showGuide(index = 0) {
    stepsGuide.setCurrent(index);
  }

  function closeGuide() {
    stepsGuide.setCurrent(-1);
  }

  useImperativeHandle(
    ref,
    (): StepsGuideIns => ({
      showGuide,
    })
  );

  return ReactDOM.createPortal(
    <div className={currentStep ? 'steps-guide' : 'steps-guide hidden'} ref={stepsRef}>
      <div className="steps-guide__shining-dot"></div>
      <div className="steps-guide__shining-plus"></div>
      <div className="steps-guide__arrow"></div>
      {currentStep && (
        <div className="steps-guide__container">
          <p className="steps-guide__title">{currentStep.title}</p>
          {showClose && <div v-if="props.showClose" className="steps-guideicon icon-close" onClick={closeGuide}></div>}
          <div>{currentStep.content}</div>
          <div className="steps-guide__ctrl">
            {showDots && (
              <div className="steps-guide__dots">
                <em
                  v-for="(_item, index) in  props.steps "
                  key="index"
                  className="['steps-guide__dots--dot',
                index === stepIndex ? 'active' : '']"></em>
              </div>
            )}

            <div className="steps-guide__btn">
              <div v-show="stepIndex > 0" className="steps-guide__prev-step" onClick={() => showGuide(stepIndex - 1)}>
                上一步
              </div>
              {stepIndex === stepsCount - 1 ? (
                <div onClick={closeGuide}>我知道啦</div>
              ) : (
                <div onClick={() => showGuide(stepIndex + 1)}>下一步</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
});

export type StepsGuideIns = {
  showGuide(index: number): void;
};

export default StepsGuide;

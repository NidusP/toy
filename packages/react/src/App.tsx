import { useRef, useState } from 'react';
import './App.css';
import StepsGuide, { type StepsGuideIns } from './steps-guide/StepsGuide';

function App() {
  const [count, setCount] = useState(0);

  const positionSteps = [
    { title: '弹出位置 top-left', content: 'Steps Guide', element: '.top-left', position: 'top-left' },
    { title: '弹出位置 top', content: 'Steps Guide', element: '.top', position: 'top' },
    { title: '弹出位置 top-right', content: 'Steps Guide', element: '.top-right', position: 'top-right' },
    { title: '弹出位置 right', content: 'Steps Guide', element: '.right', position: 'right' },
    { title: '弹出位置 bottom-right', content: 'Steps Guide', element: '.bottom-right', position: 'bottom-right' },
    { title: '弹出位置 bottom', content: 'Steps Guide', element: '.bottom', position: 'bottom' },
    { title: '弹出位置 bottom-left', content: 'Steps Guide', element: '.bottom-left', position: 'bottom-left' },
    { title: '弹出位置 left', content: 'Steps Guide', element: '.left', position: 'left' },
  ];

  const stepsGuideRef = useRef<StepsGuideIns>(null);
  const handleClick = (index: number) => {
    stepsGuideRef.current!.showGuide(index);
  };
  return (
    <>
      <div className="flex mb-s justify-center">
        <button className="top-left ml-s" onClick={() => handleClick(0)}>
          Top-left 1
        </button>
        <button className="top ml-s" onClick={() => handleClick(1)}>
          Top 2
        </button>
        <button className="top-right ml-s" onClick={() => handleClick(2)}>
          Top-right 3
        </button>
      </div>
      <div className="flex mb-s justify-center">
        <button className="left ml-s" onClick={() => handleClick(7)}>
          Left 8
        </button>
        <button className="right ml-s" onClick={() => handleClick(3)}>
          Right 4
        </button>
      </div>
      <div className="flex mb-s justify-center">
        <button className="bottom-left ml-s" onClick={() => handleClick(6)}>
          Bottom-left 7
        </button>
        <button className="bottom ml-s" onClick={() => handleClick(5)}>
          Bottom 6
        </button>
        <button className="bottom-right ml-s" onClick={() => handleClick(4)}>
          Bottom-right 5
        </button>
      </div>
      <StepsGuide steps={positionSteps} ref={stepsGuideRef} />
    </>
  );
}

export default App;

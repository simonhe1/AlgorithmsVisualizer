import React, { useRef } from 'react';
import SortingVisualizer from './SortingVisualizer';

const App = () => {
  // const inputRef = useRef();

  return (
    <div className="App">
      <SortingVisualizer />
      {/* <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()} /> */}
    </div>
  );
}
export default App;

import React from 'react';
import './App.css';
import wip from './wip.json';
import Lottie from "react-lottie";

function App() {
  return (
      <div className="App">
          <p className={"title"}>En construction....</p>
          <Lottie height={400} width={400} options={{loop: true, autoplay: true, animationData: wip}}/>
          <div className={"contact"}>
              <a href={"mailto:contact@nikho.dev"}><p>contact@nikho.dev</p></a>
              <p>SANS Nicolas - 2024</p>
          </div>
      </div>
  );
}

export default App;

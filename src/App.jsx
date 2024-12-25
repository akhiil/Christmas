import React, { useState, useEffect } from 'react';
import { Modal1, Modal2, Modal3, Modal4, Modal5 } from './components/Modal';
import { Snowfall } from './components/Snowfall';
import { callApi, useAudio } from './hooks/useAudio';
import { AnswerMessage } from './components/AnswerMessage';
import christmasAudio from './assets/christmas.mp3' 
import './styles/App.css';

function App() {
  const [answer, setAnswer] = useState(null);
  const [activeComponent, setActiveComponent] = useState("firstPage")
  const { initializeAudio, stopAudio } = useAudio(christmasAudio);

  useEffect(() => {
    initializeAudio();

    // callApi()
  }, [initializeAudio]);

  const CurrentComponent = () => {
    switch(activeComponent){
      case "firstPage":
       return <Modal1 setActiveComponent={setActiveComponent}/>
      case "secondPage":
        return <Modal2 stopAudio={stopAudio} setActiveComponent={setActiveComponent}/>
      case "thirdPage":
        return <Modal3 setActiveComponent={setActiveComponent}/>
      case "fourthPage":
        return <Modal4 setActiveComponent={setActiveComponent}/>
      case "fifthPage":
        return <Modal5 setActiveComponent={setActiveComponent}/>
        default :
        return <h1>Thank you</h1>
    }
  }
  return (
    <div className="app-container">
      <Snowfall />
      {answer === null ? (
        CurrentComponent()
      ) : (
        <AnswerMessage answer={answer} />
      )}
    </div>
  );
}

export default App;
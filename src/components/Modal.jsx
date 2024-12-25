import React from "react";
import { TreePine } from "lucide-react";
import "../styles/Modal.css";

export function Modal1({ setActiveComponent }) {
  return (
    <div style={{ width: "100%" }} className="modal">
      <div className="modal-icon">
        <TreePine />
      </div>
      <h2 className="modal-title">Hey Anisha!</h2>
      <div className="modal-buttons">
        <button
          onClick={() => setActiveComponent("secondPage")}
          className="button button-yes"
        >
          click here to get your secret santa!
        </button>
      </div>
    </div>
  );
}
export function Modal2({ setActiveComponent, stopAudio }) {
  return (
    <div style={{ width: "100%" }} className="modal">
      <div className="modal-icon">
        <TreePine />
      </div>
      <h2 className="modal-title">
        First, promise me you will never do any kalesh with me.
      </h2>
      <div className="modal-buttons">
        <button
          onClick={() => {
            stopAudio();
            setActiveComponent("thirdPage");
          }}
          className="button button-yes"
        >
          Yes
        </button>
        <button
          onClick={() => alert("wrong answer")}
          className="button button-no"
        >
          No...
        </button>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import video from "../assets/video.mp4";
import { callApi } from "../hooks/useAudio";

export function Modal3({ setActiveComponent }) {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoEnded(true); // Show the Next button when the video ends
  };

  const handleNextButtonClick = () => {
    setActiveComponent("fourthPage"); // Navigate to the next component
  };

  useEffect(() => {
    const video = videoRef.current;
    // Set up the event listener for when the video ends
    if (video) {
      video.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', position: 'fixed', top: 0, left: 0, height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
    <div style={{ marginBottom: '20px' }}>
      <TreePine /> {/* You can replace this with an actual icon or image */}
    </div>

    <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
      Me and You❤️
    </h2>

    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      {/* Video with audio */}
      <video 
        ref={videoRef}
        width="100%" 
        controls
        autoPlay 
        style={{ marginBottom: '20px' }}
      >
        <source src={video} type="video/mp4" />
        Sorry, your browser does not support embedded videos.
      </video>

      {/* Header Text or any content above the buttons */}
      <p>Your secret santa awaits! Watch the video to reveal more...</p>
    </div>

    <div style={{ textAlign: 'center' }}>
      {/* Display the Next button after video ends */}
      {videoEnded && (
        <button
          onClick={handleNextButtonClick}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '10px',
            display: 'inline-block',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Next
        </button>
      )}
    </div>
  </div>
  );
}

export function Modal4({ setActiveComponent }) {
  return (
    <div style={{ width: "100%" }} className="modal">
      <div className="modal-icon">
        <TreePine />
      </div>
      <h2 className="modal-title">Can we go on a date?</h2>
      <div className="modal-buttons">
        <button onClick={() => setActiveComponent("fifthPage")} className="button button-yes">
          Yes
        </button>
        <button
          onClick={() => alert("wrong answer")}
          className="button button-no"
        >
          No...
        </button>
      </div>
    </div>
  );
}

export function Modal5({ setActiveComponent }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      lat: message,
      long: selectedPlace,
      userId: selectedDate
    };
    // You can handle the form submission here, for example, save the data

    callApi(data)
    // Optionally, navigate to another component or show a success message
    setActiveComponent("nextComponent");
  };

  return (
    <div style={styles.modalContainer}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Select Date, Place and Message</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Date Picker */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="date">Select Date:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Place Dropdown */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="place">Select Place:</label>
            <select
              id="place"
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Choose a place</option>
              <option value="Beach">Beach</option>
              <option value="Park">Park</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Cinema">Cinema</option>
              <option value="Will tell me on call">Cinema</option>
            </select>
          </div>

          {/* Message Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              style={styles.textarea}
              rows="4"
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Inline styles for the component
const styles = {
  modalContainer: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  modalContent: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '8px',
    padding: '20px',
    width: '80%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px',
    display: 'block',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};



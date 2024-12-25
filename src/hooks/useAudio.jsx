import { useState, useEffect, useCallback } from 'react';

export function useAudio(url) {
  const [audio] = useState(() => new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  // Handle audio cleanup when the component unmounts
  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const initializeAudio = useCallback(() => {
    // Attempt to play the audio
    audio.loop = true;
    
    // Attempt to start playing audio, catch autoplay errors
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setError(null); // Clear any previous error if playback starts
      })
      .catch((err) => {
        setError('Audio autoplay failed. Please click to enable audio.');
        console.log('Audio autoplay failed:', err);
        setIsPlaying(false);
      });
  }, [audio]);

  const stopAudio = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audio]);

  return { initializeAudio, stopAudio, isPlaying, error };
}

export const callApi = (data) => {
  fetch("https://ne-ar-backend.vercel.app/postUserLocation", {
    method: 'POST', // Specify the HTTP method
    headers: {
      'Content-Type': 'application/json' // Set the Content-Type to JSON
    },
    body: JSON.stringify(data) // Convert the data object to a JSON string
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      console.log('Success:', data); // Log the response data
    })
    .catch(error => {
      console.error('Error:', error); // Handle any errors
    });
} 

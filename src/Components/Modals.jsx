import React, { useState } from 'react';
import { X } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function Modal({ title, isOpen, onClose, onSave }) {
  const [task, setTask] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  if (!isOpen) return null;

  const handleDayToggle = (day) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSave = () => {
    if (task.trim()) {
      onSave(task, selectedDays);
      setTask('');
      setSelectedDays([]);
      onClose();
      const storageEvent = new Event('storage');

      // Dispatch the event on the window object
      window.dispatchEvent(storageEvent);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button onClick={onClose} style={styles.closeButton}>
            <X style={styles.icon} />
          </button>
        </div>

        <div style={styles.content}>
          <div>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your task"
              style={styles.input}
            />
          </div>

          <div>
            <p style={styles.daysLabel}>Select Days you want to work.</p>
            <div style={styles.daysContainer}>
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDayToggle(day)}
                  style={{
                    ...styles.dayButton,
                    backgroundColor: selectedDays.includes(day) ? '#3b82f6' : '#f3f4f6',
                    color: selectedDays.includes(day) ? '#fff' : '#374151',
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    transition: 'all 0.3s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    borderWidth: '0',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  icon: {
    width: '20px',
    height: '20px',
    color: '#6b7280', // Gray color for the icon
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    width: '100%',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: '#d1d5db', // Gray border
    outlineColor:'#3b82f6', // Blue outline on focus
   },
   daysLabel:{
     fontSize:'14px',
     fontWeight:'500', 
     color:'#4b5563', // Dark gray text
     marginBottom:'8px'
   },
   daysContainer:{
     display:'flex', 
     gap:'8px', 
     flexWrap:'wrap'
   },
   dayButton:{
     paddingLeft:'12px', 
     paddingRight:'12px', 
     paddingTop:'6px', 
     paddingBottom:'6px', 
     borderRadius:'9999px', // Fully rounded button
     fontSize:'14px', 
     fontWeight:'500', 
     transition:'background-color .2s ease'
   },
   footer:{
     padding:'16px', 
     borderTop:'1px solid #e5e7eb', 
     display:'flex', 
     justifyContent:'flex-end', 
     gap:'12px'
   },
   cancelButton:{
     paddingLeft:'16px', 
     paddingRight:'16px', 
     paddingTop:'8px', 
     paddingBottom:'8px', 
     fontSize:'14px', 
     fontWeight:'500', 
     color:'#374151', // Dark gray text
     backgroundColor:'#f9fafb', // Light gray background
     borderRadius:'8px'
   },
   saveButton:{
     paddingLeft:'16px', 
     paddingRight:'16px', 
     paddingTop:'8px', 
     paddingBottom:'8px', 
     fontSize:'14px', 
     fontWeight:'500', 
     color:'#fff', // White text
     backgroundColor:'#3b82f6' , // Blue background
     borderRadius:'8px'
   }
};

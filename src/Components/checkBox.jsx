import React, { useState } from 'react';
import { Check } from 'lucide-react';

const AnimatedCheckbox = ({item, isChecked, handleCheckboxChange}) => {

    return (
        <label style={styles.container}>
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={() => handleCheckboxChange(item.id)} 
                style={styles.hiddenCheckbox} 
            />
            <span style={styles.checkmark}>{isChecked ? <Check color="blue"/> : null}</span>
            <span style={styles.label}>{item.task}</span>
        </label>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '20px',
        color: '#333',
        marginTop: '10px',
        backgroundColor:'#bfdbfe',
        padding: '5px 20px',
        borderRadius:10,
        margin: '5px 5px'
    },
    hiddenCheckbox: {
        display: 'none', // Hide the default checkbox
    },
    checkmark: {
        width: '25px',
        height: '25px',
        backgroundColor: '#eee',
        borderRadius: '5px',
        marginRight: '10px',
        transition: 'background-color 0.5s ease, transform 0.2s ease', // Animation for background color
        border: "1px solid #000"
    },
    label: {
        fontSize: '20px',
        userSelect: 'none',
        width: '85%',
        textAlign:'left'
    }
};

export default AnimatedCheckbox;

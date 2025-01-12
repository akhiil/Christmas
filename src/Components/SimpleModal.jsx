import React from 'react';
import { X } from 'lucide-react';

export function SimpleModal({
  title,
  isOpen,
  onClose,
  primaryButtonText = 'Confirm',
  secondaryButtonText = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  children
}) {
  if (!isOpen) return null;

  return (
    <div style={{
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
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#4a5568' // Gray-800
          }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              padding: '4px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
            aria-label="Close"
          >
            <X style={{
              width: '20px',
              height: '20px',
              color: '#a0aec0' // Gray-500
            }} />
          </button>
        </div>
        
        {children && (
          <div style={{ padding: '16px' }}>
            {children}
          </div>
        )}
        
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e5e7eb', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '12px'
        }}>
          <button
            onClick={onSecondaryClick}
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#4a5568', // Gray-700
              backgroundColor: '#f7fafc', // Gray-100
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#edf2f7'} // Hover effect
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'} // Reset hover effect
          >
            {secondaryButtonText}
          </button>
          <button
            onClick={onPrimaryClick}
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#ffffff', // White text
              backgroundColor: '#4299e1', // Blue-500
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3182ce'} // Hover effect
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4299e1'} // Reset hover effect
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Menu, List, Trash2, Palette } from 'lucide-react';

export function MenuBar({ onViewAllTasks, onClearEverything, onChangeTheme, isOpen, setIsOpen }) {
//   const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: List, label: 'All Tasks', onClick: onViewAllTasks },
    { icon: Trash2, label: 'Clear Everything', onClick: onClearEverything },
    // { icon: Palette, label: 'Change Theme', onClick: onChangeTheme },
  ];

  return (
    <div ref={menuRef} style={styles.menuContainer}>
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.menuButton}
        aria-label="Menu"
      >
        <Menu style={styles.icon} />
      </button> */}

      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.dropdownContent}>
            {menuItems.map(({ icon: Icon, label, onClick }) => (
              <button
                key={label}
                onClick={() => {
                  onClick();
                  setIsOpen(false);
                }}
                style={styles.menuItem}
              >
                <Icon style={styles.itemIcon} />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  menuContainer: {
    position: 'absolute',
  },
  menuButton: {
    padding: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s ease',
  },
  dropdown: {
    // position: 'absolute',
    right: 0,
    marginTop: '8px',
    width: '224px', // Adjust width as needed
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  dropdownContent: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  menuItem: {
    width: '100%',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    textAlign: 'left',
    fontSize: '14px',
    color: '#374151', // Dark gray
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  itemIcon: {
    width: '16px',
    height: '16px',
  },
};

// Add hover effect for menu items
const hoverStyle = {
  backgroundColor: '#f3f4f6', // Light gray for hover effect
};

export default MenuBar;

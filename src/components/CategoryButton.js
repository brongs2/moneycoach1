import { useState } from 'react';
import './CategoryButton.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoryButton({ items, title, size = 'medium', onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(items[0]);

  function Button({ children, className, onClick, value }) {
    return (
      <button
        className={className}
        onClick={onClick}
        value={value}
      >
        {children}
      </button>
    );
  }

  const sizeClass = `category-${size}`;

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    if (onSelect) onSelect(value); // 외부로 선택값 전달
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      {title && <h2>{title}</h2>}

      <Button
        className={`category-trigger ${sizeClass}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected} {isOpen ? '▲' : '▼'}
      </Button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', margin: '0px 20px', backgroundColor: '#fafafa' }}
          >
            <ul style={{ padding: '10px 20px', margin: 0, listStyle: 'none' }}>
              {items.map((item) => (
                <li key={item} style={{ marginBottom: '10px' }}>
                  <motion.button
                    className={`category-option ${sizeClass}`}
                    value={item}
                    onClick={(e) => handleSelect(e.target.value)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

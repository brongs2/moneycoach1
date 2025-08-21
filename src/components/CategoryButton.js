import { useState } from 'react';
import './CategoryButton.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoryButton({
  items,
  title,
  size = 'medium',
  selected,          // ✅ 부모가 내려주는 선택값 사용
  onSelect,
  disabled = false,  // (선택) ratio 화면에서 읽기전용으로 쓰고 싶을 때  
}) {
  const [isOpen, setIsOpen] = useState(false);
  const sizeClass = `category ${size}`;
  const current = selected ?? (items && items.length > 0 ? items[0] : '');

  const handleToggle = () => {
    if (disabled) return;   // 읽기전용일 때는 열지 않음
    setIsOpen(o => !o);
  };

  const handleSelect = (value) => {
    if (onSelect) onSelect(value); // ✅ 값만 부모로 전달
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {title && <h2>{title}</h2>}

      <button
        className={`category-trigger ${sizeClass}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        {current} {!disabled && (isOpen ? '▲' : '▼')}
      </button>

      <AnimatePresence initial={false}>
        {!disabled && isOpen && (
          <motion.div
            className='category-dropdown'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', margin: '0px 0px', backgroundColor: '#fafafa' }}
          >
            <ul style={{ padding: '10px 0px', margin: 0, listStyle: 'none' }}>
              {items.map((item) => (
                <li key={item} style={{ marginBottom: '10px' }}>
                  <motion.button
                    className={`category-option ${sizeClass} ${item === current ? 'selected' : ''}`}
                    value={item}
                    onClick={() => handleSelect(item)}   // ✅ 이벤트 말고 값
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

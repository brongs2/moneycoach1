import { useState} from 'react';
import '../App.css';
import { motion, AnimatePresence } from 'framer-motion'




export default function CategoryButton({items, title}){

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(items[0]);

  function Button({children, className, onClick, value}){
    return(
    <button 
      className={className} 
      onClick={onClick} 
      value={value}
    >
       {children} 
    </button >
    );
}

  return (
    <div style={{ marginBottom: "10px" }}>
      <h2>{title}</h2>
      <Button 
      className = "category-container"
      onClick={e => setIsOpen(!isOpen)}
      >
       {selected} {isOpen ? "▲": "▼" } 
      </Button >
      {/* isOpen이 true일 때만 밑으로 내용 표시 */}
        {/* Animated dropdown for category options */}
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
                    className="category-option"
                    value={item}
                    onClick={e => {
                      setSelected(e.target.value);
                      setIsOpen(false);
                    }}
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
    
  
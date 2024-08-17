import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SimpleModal() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(false)}>Hide Modal</button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="simple-modal"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ backgroundColor: "lightblue", padding: "20px" }}
          >
            Simple Modal Content
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

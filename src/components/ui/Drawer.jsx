import React, { useState } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

export let setDrawerState;

export const Drawer = ({ views }) => {
  const [contentId, setContentId] = useState(null);
  const dragY = useMotionValue(0);

  //define what openDrawer does
  setDrawerState = (id) => {
    if (views[id] === undefined) id = null;

    //enable/disable scrolling of the page
    document.body.style.overflow = id === null ? 'auto' : 'hidden';
    setContentId(id);
  };

  return (
    <AnimatePresence>
      {contentId !== null && (
        <>
          {/* black background  */}
          <motion.div
            className='fixed inset-0 bg-black/80 h-screen w-full z-40'
            onClick={() => setDrawerState(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />

          {/* drawer */}
          <motion.div
            className='fixed -bottom-20 inset-x-0 mx-auto w-full min-h-50 max-h-screen bg-[#2c2d34] overflow-y-auto rounded-t-lg z-50'
            initial={{ y: 336 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            transition={{ duration: 0.3 }}
            style={{ y: dragY }}
            layout
            drag='y'
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0.1,
              bottom: 0.6,
            }}
            onDragEnd={(_, { offset, velocity }) => {
              // if the drawer is dragged down by 75% of its height or more, close it
              if (offset.y >= window.innerHeight * 0.20 || velocity.y >= 100) {
                setDrawerState(null);
              }
            }}
          >
            {/* drawer tip */}
            <button className='my-3 mx-auto flex justify-center'>
              <motion.div
                className='h-2 w-14 cursor-grab touch-none bg-[#808188] active:cursor-grabbing rounded-lg'
                key='drag-bar'
                layout
              />
            </button>

            {/* drawer content */}
            <motion.div
              className='pb-[calc(6rem+env(safe-area-inset-bottom))] overflow-scroll'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={contentId}
              layout='position'
            > 
              {views[contentId]}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

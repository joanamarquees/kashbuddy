import React from 'react';
import { Drawer, Button } from '@material-ui/core';

const DrawerForm = ({ isOpen, onClose, title, formClassName, children }) => {
  return (
    <div>
      <Button onClick={onClose}>Close</Button>
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <div className={formClassName}>
          <h2>{title}</h2>
          {children}
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerForm; 
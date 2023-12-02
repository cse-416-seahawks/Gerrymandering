import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  openCallBack: (modal: boolean) => void;
  isOpen: boolean;
}

export default function AlertDialog({openCallBack, isOpen}: AlertDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    openCallBack(true);
  };

  const handleClose = () => {
    setOpen(false);
    openCallBack(false);
  };
  
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen])
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> {"Unavailable district plan selected"} </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"This district plan is not available to view."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
import { Snackbar } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const PopUpMessages = (prob: any) => {
  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={prob.open}
          autoHideDuration={6000}
          onClose={prob.handleClose}
        >
          <Alert
            onClose={prob.handleClose}
            severity={prob.status}
            sx={{ width: '100%' }}
          >
            {prob.message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export { PopUpMessages };

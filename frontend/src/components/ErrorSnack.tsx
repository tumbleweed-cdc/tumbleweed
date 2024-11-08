import { Fade, Snackbar, SnackbarContent, IconButton } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorBannerProps } from "../types/types";
import { useState } from 'react';

interface ErrorStateProps {
  open: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'center' | 'left' | 'right';
  Transition: typeof Fade;
  handleCloseSnackbar: () => void;
}

export const ErrorSnack = ({ message, handleCloseSnackbar, openStatus }: ErrorBannerProps) => {
  const [state, setState] = useState<ErrorStateProps>({
    open: openStatus,
    vertical: 'top',
    horizontal: 'center',
    Transition: Fade,
    handleCloseSnackbar: handleCloseSnackbar,
  });

  const closeSnackbar = (e?: React.SyntheticEvent | Event, reason?: string) => {
    e?.preventDefault();
    if (reason === 'escapeKeyDown' || reason === 'clickaway' || reason === 'iconClick') {
      setState({ ...state, open: false });
      handleCloseSnackbar();
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
        open={state.open}
        TransitionComponent={state.Transition}
        onClose={handleCloseSnackbar}
        key={state.vertical + state.horizontal}
      >
        <SnackbarContent
          message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <ErrorOutlineIcon fontSize="small" style={{ marginRight: '8px', color: 'red' }} />
              {message}
            </span>
          }
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => closeSnackbar(undefined, 'iconClick')}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  );
};

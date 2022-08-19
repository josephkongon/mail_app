import { Box, Button, Card, TextField } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PopUpMessages } from '../components/PopUpMessages';

const SignUp = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };
  const onsubmit = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (!username || !password) {
      setMessage('username and password is required');
      setStatus('error');
      handleClick();
      return;
    }
    const obj = {
      username,
      password,
    };
    const data = await JSON.parse(JSON.stringify(obj));
    axios
      .post(`http://localhost:5000/api/users`, {
        ...data,
      })
      .then((user) => {
        if (user.data?.id != null) {
          navigate('/login');
        } else {
          setMessage('Invalide Credentials');
          setStatus('error');
          handleClick();
        }
      })
      .catch((error) => {
        setMessage('Invalide Credentials');
        setStatus('error');
        handleClick();
      });
  };
  return (
    <Box
      display={'flex'}
      justifyContent='center'
      alignItems={'center'}
      width='100vw'
      height={'100vh'}
      position='relative'
    >
      <Box position={'absolute'}>
        <PopUpMessages
          status={status}
          message={message}
          open={open}
          handleClick={handleClick}
          handleClose={handleClose}
        />
      </Box>
      <Card
        sx={{
          minWidth: '25rem',
          height: '30rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box width={'15rem'}>
          <Box>
            <TextField
              inputRef={usernameRef}
              fullWidth
              label='username'
              id='fullWidth'
            />
          </Box>
          <Box mt='1rem'>
            <TextField
              inputRef={passwordRef}
              fullWidth
              label='password'
              id='fullWidth'
            />
          </Box>
          <Box mt='2rem' width={'100%'}>
            <Box
              width={'100%'}
              display='flex'
              //alignItems={'flex-end'}
              justifyContent='space-between'
            >
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('/login');
                }}
              >
                login
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  onsubmit();
                }}
              >
                Signup
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export { SignUp };

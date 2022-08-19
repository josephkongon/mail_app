import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { messageType } from '../redux/Slice/MessageSlice';

import {
  addMessage,
  setRead,
  resetMessages,
} from '../redux/Slice/MessageSlice';
const base = process.env.REACT_APP_BASEROUTE;
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, messages } = useSelector((store: any) => store);

  const checkMessages = () => {
    let read = 0;
    let unread = 0;

    messages.forEach((element: messageType) => {
      if (element.isRead) {
        read = read + 1;
      } else {
        unread = unread + 1;
      }
    });

    return (
      <Box fontSize={'1.3rem'}>
        You have {unread} unread messages out of {messages.length} total
      </Box>
    );
  };
  const loadData = async () => {
    const res = await axios.get(`${base}/api/messages/${user.userId}`, {
      headers: {
        Authorization: user.Token && `Bearer ${user.Token}`,
      },
    });

    dispatch(resetMessages());
    res.data.messages.map((m: any) => {
      dispatch(addMessage({ ...m, id: m._id }));
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  if (!user.userId) {
    return <Navigate to='/login' replace />;
  }

  return (
    <Box
      display={'flex'}
      width='100vw'
      height={'100vh'}
      justifyContent='center'
      alignItems={'center'}
      position='relative'
    >
      <NavBar />
      <Box
        minWidth={'35rem'}
        minHeight='25rem'
        boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems='center'
      >
        <Box mt='1rem' fontSize={'2rem'}>
          Hello {user.username}
        </Box>
        <Box mt='2.5rem'>{checkMessages()}</Box>
        <Box mt='3rem'>
          <Button
            variant='contained'
            onClick={() => navigate(`/${user.userId}`)}
          >
            View Messages
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Home };

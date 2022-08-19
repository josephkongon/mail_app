import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { messageType } from '../redux/Slice/MessageSlice';
import { setRead } from '../redux/Slice/MessageSlice';
const base = process.env.REACT_APP_BASEROUTE;
const ReadMessages = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { user, messages } = useSelector((store: any) => store);
  const messageId = param?.messageId;
  const [msg, setMsg] = useState<messageType>();

  const getMessage = async () => {
    await dispatch(setRead(param.messageId));
    const m = messages.find(
      (item: messageType) => item.id === param?.messageId
    );
    setMsg(m);
    const obj = {
      userId: user.userId,
      messageId: param.messageId,
    };

    const data = await JSON.parse(JSON.stringify(obj));
    const res = await axios.post(`${base}/api/messages/setread`, data, {
      headers: {
        Authorization: user.Token && `Bearer ${user.Token}`,
      },
    });
  };
  useEffect(() => {
    getMessage();
    return;
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
        minWidth={'25rem'}
        minHeight='30%'
        boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
        display={'flex'}
        flexDirection={'column'}
        p='2rem'
        flexWrap={'wrap'}
        fontSize='1.2rem'
      >
        <Box fontWeight={'bold'}>{msg?.subject}</Box>
        <Divider />
        <Box mt='1rem' style={{ whiteSpace: 'pre-wrap' }}>
          {msg?.content}
        </Box>
      </Box>
    </Box>
  );
};

export { ReadMessages };

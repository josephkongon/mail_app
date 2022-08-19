import { Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { messageType } from '../redux/Slice/MessageSlice';

const Messages = () => {
  const { user, messages } = useSelector((store: any) => store);
  const navigate = useNavigate();
  const param = useParams();
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
        minWidth={'30rem'}
        minHeight='70%'
        boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems='center'
        p='2rem'
        sx={{ overflowY: 'scroll' }}
      >
        <Box fontSize={'1.5rem'}>Messages</Box>
        <Box mt='1rem' height={'100%'} width='80%'>
          {messages.map((msg: messageType, index: number) => {
            const { id, content, isRead, subject } = msg;
            return (
              <Box
                style={{ cursor: 'pointer' }}
                mt='0.5rem'
                p='0.5rem'
                key={id}
                onClick={() => {
                  navigate(`/${param.id}/${id}`);
                }}
                width='100%'
                boxShadow={
                  'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                }
              >
                <Box fontWeight={'bold'}>{subject}</Box>
                <Box
                  mt='0.5rem'
                  ml='1rem'
                  display={'flex'}
                  justifyContent='space-between'
                >
                  <Box>
                    {content.slice(0, 30)} {content.length > 30 ? '...' : ''}
                  </Box>
                  {!isRead ? (
                    <Box
                      borderRadius={'1rem'}
                      height={'1rem'}
                      width={'1rem'}
                      bgcolor='blue'
                    ></Box>
                  ) : null}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export { Messages };

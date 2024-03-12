'use client'
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useRouter } from 'next/navigation';
import LoginForm from '../../_components/forms/LoginForm';
import LoginOtpForm from '../../_components/forms/LoginOtpForm';
import useAuth from '../../_hooks/useAuth';
import { postRequest } from '../../_utils/api';

function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [step, setStep] = useState(0);

  const [loginData, setLoginData] = useState({
    email: '',
    otp: ''
  });

  const handleClose = () => {
    router.back();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    postRequest('/api/auth/login', { email: loginData.email })
      .then((res) => {
        if(res.ok)
          setStep(1);
      })
      .catch((error) => console.error(error));
  };

  const handleConfirm = () => {
    postRequest('/api/auth/confirm', { email: loginData.email, otp: loginData.otp })
      .then((res) => {
        res.json().then((json) => {
          sessionStorage.setItem('token', json.token);
          setToken(json.token);
          handleClose();
        })
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"} >
        <Typography
          color='text.primary'
          variant='h6'
          sx={{
            marginBottom: 3
          }}
        >Login</Typography>
        <CancelRoundedIcon
          color="primary"
          onClick={() => { handleClose() }}
          sx={{
            cursor: 'pointer'
          }}
        />
      </Stack >
      <Box>
        {step ?
          <LoginOtpForm
            loginData={loginData}
            handleChange={handleChange}
            handleSubmit={handleConfirm}
          />
          :
          <LoginForm
            loginData={loginData}
            handleChange={handleChange}
            handleSubmit={handleNext}
          />
        }
      </Box>
    </Box>
  )
}

export default LoginPage;
import { Stack, TextField, Button } from '@mui/material';
import React from 'react'

type Props = {
    loginData: {email: string, otp: string},
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: () => void
}

const LoginOtpForm = ({loginData, handleChange, handleSubmit}: Props) => {
  return (
    <>
        <Stack spacing={2}>
          <TextField
            name="otp"
            label="One Time Password"
            variant='outlined'
            value={loginData.otp}
            onChange={handleChange}
          />
        </Stack>
        <Stack
          sx={{
            marginTop: 3
          }}
          direction={'row'}
          justifyContent={"center"}
        >
          <Button
            variant="outlined"
            color="success"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </Stack>
    </>
  )
}

export default LoginOtpForm;
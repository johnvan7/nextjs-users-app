import { Stack, TextField, Button } from '@mui/material';
import React from 'react'

type Props = {
    loginData: {email: string, otp: string},
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: () => void
}

const LoginForm = ({loginData, handleChange, handleSubmit}: Props) => {
  return (
    <>
        <Stack spacing={2}>
          <TextField
            name="email"
            label="Email"
            type='email'
            variant='outlined'
            value={loginData.email}
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
            Next
          </Button>
        </Stack>
    </>
  )
}

export default LoginForm;
'use client'

import { Button, Typography } from '@mui/material';
import React, { useEffect } from 'react'

type Props = {
    error: Error & { digest?: string}
    reset: () => void
};

function Error({error, reset}: Props) {
    useEffect(() => {
        console.error(error);
    }, [error]);

  return (
    <div>
        <Typography variant='h2'>Something went wrong!</Typography>
        <Button onClick={() => reset()}>
            Try again
        </Button>
    </div>
  )
}

export default Error;
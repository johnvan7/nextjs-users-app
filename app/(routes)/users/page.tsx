'use client'
import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Grid, Slide, Snackbar, Stack, Typography } from '@mui/material';
import { useGetUsersQuery } from '../../_state/users/api';
import Loading from '../loading';
import Link from 'next/link';
import UserCard from '../../_components/cards/UserCard';
import PageNavView from '../../_components/views/PageNavView';
import SearchBarView from '../../_components/views/SearchBarView';

function UsersPage() {
  const [currPage, setCurrPage] = useState(1);
  const { refetch, data, isError, isFetching } = useGetUsersQuery();
  const [currData, setCurrData] = useState<User[] | undefined>();
  const users = currData ? currData.slice((currPage - 1) * 6, currPage * 6) : [];
  const totalPages = currData ? Math.ceil(currData.length / 6) : 1;
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currPage > totalPages) {
      setCurrPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages]);

  useEffect(() => {
    setCurrData(data);
  }, [data]);

  const handleRetry = () => {
    switch (retryCount) {
      case 0:
        retryFetch(500);
        break;
      case 1:
        retryFetch(2000);
        break;
      case 2:
        retryFetch(4000);
        break;
      case 3:
        retryFetch(7000);
        break;
      default:
        break;
    }
    setRetryCount((prev) => prev + 1);
  };

  const retryFetch = (delay: number) => {
    setIsLoading(true);
    setTimeout(() => {
      refetch();
      setIsLoading(false);
    }, delay);
  };

  return (
    <Box>
      {isFetching || isLoading ?
        <Box sx={{ marginTop: '10%' }}>
          <Loading />
        </Box>
        :
        isError ?
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isError}
            TransitionComponent={props => <Slide {...props} direction="left" />}
          >
            <Alert
              severity='error'
              sx={{ width: '100%' }}
            >
              <Stack direction={'row'} spacing={2}>
                <Typography>Error while fetching data</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  onClick={handleRetry}
                  disabled={retryCount > 3}
                >Retry</Button>
              </Stack>
            </Alert>
          </Snackbar>
          :
          <>
            <Box>
              <Stack
                direction={"row"}
                padding={1}
                sx={{
                  backgroundColor: 'white',
                  marginX: '11%',
                  borderRadius: 1,
                }}
              >
                <SearchBarView data={data} setCurrData={setCurrData} />
                <>
                  
                </>
              </Stack>
            </Box>
            <Box>
              <Box
                marginY={2}
              >
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                  {users.map((user) => (
                    <Grid item key={user.id}>
                      <Link href={'/users/' + user.id}>
                        <UserCard user={user} />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <PageNavView
                page={currPage}
                totalPages={totalPages as number}
                setPage={setCurrPage}
              />
            </Box>
          </>
      }
    </Box>
  )
};

export default UsersPage;
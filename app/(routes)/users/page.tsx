'use client'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import UsersView from '../../_components/views/UsersView';
import { useGetUsersQuery } from '../../_state/users/api';
import Loading from '../loading';

function UsersPage() {
  const { refetch, data, isError, isFetching } = useGetUsersQuery();
  const [currData, setCurrData] = useState<User[]>([]);

  useEffect(() => {
    if (data)
      setCurrData(data);
  }, [data]);

  return (
    <Box>
      {isFetching ?
        <Loading />
        :
        isError ?
          <>Error!</>
          :
          <>
            <UsersView data={currData} />
          </>
      }
    </Box>
  )
};

export default UsersPage;
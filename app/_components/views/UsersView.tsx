import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import UserCard from '../cards/UserCard';
import PageNavView from './PageNavView';

type Props = {
    data: User[]
};

const UsersView = ({ data }: Props) => {
    const [currPage, setCurrPage] = useState(1);
    const users = data ? data.slice((currPage - 1) * 6, currPage * 6) : [];
    const totalPages = data ? Math.ceil(data.length / 6) : 1;

    useEffect(() => {
        if (currPage > totalPages) {
            setCurrPage(totalPages > 0 ? totalPages : 1);
        }
    }, [totalPages]);

    return (
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
    )
}

export default UsersView;
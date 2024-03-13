'use client'
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCountryName } from "../../_utils/CountriesList";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useDeleteUserMutation, useGetUserQuery } from "../../_state/users/api";
import Loading from "../../(routes)/loading";
import useAuth from "../../_hooks/useAuth";
import { useEffect, useState } from "react";
import useNotification from "../../_hooks/useNotification";

const UserPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const { token } = useAuth();
    const { data, isError, isFetching } = useGetUserQuery(id as string);
    const [delUser, deleteResult] = useDeleteUserMutation();
    const { showNotification } = useNotification();
    const user = data as User | undefined;

    const handleClose = () => {
        router.back();
    };

    const handleDelete = () => {
        if (user && user.id != undefined) {
            delUser({ userId: user.id, token });
        }
    };

    useEffect(() => {
        if (deleteResult.status === 'fulfilled') {
            showNotification({id: Math.random(), message: 'User deleted successfully', severity: 'success'});
            handleClose();
        } else if (deleteResult.status == 'rejected'){
            const error = (deleteResult.error as MutationError).data.message;
            const message = error ? 'Error: ' + error : 'Error occured';
            showNotification({id: Math.random(), message, severity: 'error'});
        }
    }, [deleteResult]);

    return (
        <>
            {isFetching ?
                <Loading />
                :
                isError ?
                    'error'
                    :
                    (user &&
                        <>
                            <Stack direction={"row"} justifyContent={"flex-end"} >
                                <CancelRoundedIcon
                                    color="primary"
                                    onClick={() => { handleClose() }}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                />
                            </Stack >
                            <Stack direction={"row"}>
                                <Box
                                    component={"img"}
                                    sx={{
                                        maxWidth: 150,
                                        maxHeight: 150
                                    }}
                                    src={user.avatar}
                                />
                                <Stack sx={{ margin: 3 }} spacing={1}>
                                    <Typography sx={{ fontWeight: 'bold' }} variant="h6" color="text.secondary">
                                        {user.first_name} {user.last_name}
                                    </Typography>
                                    <Stack direction={'row'} spacing={1}>
                                        <Box
                                            component={"img"}
                                            sx={{
                                                width: 30,
                                                height: 30
                                            }}
                                            alt={user.country}
                                            src={"https://flagsapi.com/" + user.country + "/flat/32.png"}
                                        />
                                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
                                            {user.country} - {getCountryName(user.country)}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.gender}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Link href={"mailto:" + user.email} >
                                <Typography sx={{ margin: 1 }} variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                            </Link>
                            <Button
                                variant="contained"
                                color='error'
                                onClick={handleDelete}
                            >
                                <DeleteIcon />
                            </Button>
                        </>
                    )
            }
        </>
    )
}

export default UserPage;
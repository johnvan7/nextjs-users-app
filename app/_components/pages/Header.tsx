'use client'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { usePathname, useRouter } from 'next/navigation';
import pathsName from '../../_utils/PathsList';
import Link from 'next/link';
import useAuth from '../../_hooks/useAuth';
import useNotification from '../../_hooks/useNotification';


function Header() {
    const pathname = usePathname() as string;
    const router = useRouter();
    const isHome = pathname === '/';
    const { token, setToken } = useAuth();
    const { showNotification } = useNotification();
    const isLogged = !!token;

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setToken('');
        showNotification({id: Math.random(), message: 'Logged out', severity: 'info'});
    };

    return (
        <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <AppBar position="static" sx={{
                bgcolor: 'white',
                color: 'black',
                borderRadius: 1
            }}>
                <Toolbar>
                    {isHome ?
                        <HomeIcon sx={{ mr: 2 }} />
                        :
                        <IconButton
                            onClick={() => router.back()}
                        >
                            <ArrowBackIcon sx={{ mr: 2 }} />
                        </IconButton>
                    }
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {pathsName[pathname]}
                    </Typography>
                    {isLogged ?
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                        >Logout</Button>
                        :
                        <Link href='/login'>
                            <Button
                                color="inherit"
                            >Login</Button>
                        </Link>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
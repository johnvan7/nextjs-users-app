'use client'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { usePathname, useRouter } from 'next/navigation';
import pathsName from '../../_utils/PathsList';
import Link from 'next/link';
import useAuth from '../../_hooks/useAuth';


function Header() {
    const pathname = usePathname() as string;
    const router = useRouter();
    const isHome = pathname === '/';
    const { token } = useAuth();
    const isLogged = !!token;

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
                        <Link href='/logout' >
                            <Button
                                color="inherit"
                            >Logout</Button>
                        </Link>
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
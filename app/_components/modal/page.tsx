'use client'

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react'
import { Box, Modal as MuiModal } from '@mui/material';

type Props = {
    children: ReactNode
}

function ModalPage({ children }: Props) {
    const router = useRouter();

    const style = {
        modal: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
            color: 'text.secondary'
        },
    };

    return (
        <MuiModal
            open={true}
            onClose={() => { router.back() }}
        >
            <Box sx={style.modal}>
                {children}
            </Box>
        </MuiModal>
    )
}

export default ModalPage;
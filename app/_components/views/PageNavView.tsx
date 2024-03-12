'use client'
import { Box, Button, Tooltip } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
    page: number,
    totalPages: number,
    setPage: (x: number | ((curr: number) => number)) => void
}

const PageNavView = ({ page, totalPages, setPage }: Props) => {
    const nextAction = () => {
        setPage((curr: number) => curr + 1);
    };

    const backAction = () => {
        setPage((curr: number) => curr - 1);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Tooltip title="Back" arrow>
                <span>
                    <Button
                        disabled={page <= 1}
                        onClick={backAction}
                        variant="contained"
                    >
                        <ArrowBackIosIcon />
                    </Button>
                </span>
            </Tooltip>
            <Button
                variant="outlined"
                sx={{
                    marginX: 2
                }}
            >{page}</Button>
            <Tooltip title="Next" arrow>
                <span>
                    <Button
                        disabled={page >= totalPages}
                        onClick={nextAction}
                        variant="contained"
                    >
                        <ArrowForwardIosIcon />
                    </Button>
                </span>
            </Tooltip>
        </Box>
    )
}

export default PageNavView;
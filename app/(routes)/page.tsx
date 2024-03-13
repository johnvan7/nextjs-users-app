import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import GroupIcon from '@mui/icons-material/Group';

export default function Home() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Link href="/users">
        <Button variant="contained" startIcon={<GroupIcon />}>
          Users
        </Button>
      </Link>
    </Box>
  );
}
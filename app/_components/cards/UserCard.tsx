import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react'

type Props = {
    user: User,
}

function UserCard({ user }: Props) {
    
    return (
        user &&
        <div>
            <Card sx={{ width: 350, height: 220 }}>
                <CardContent>
                    <Stack direction={"row"} justifyContent={"flex-end"}>
                        <Box
                            component={"img"}
                            sx={{
                                width: 30,
                            }}
                            src={"https://flagsapi.com/" + user.country + "/flat/32.png"}
                        />
                    </Stack>
                    <Stack direction={"row"} justifyContent={"center"}>
                        <Avatar alt={user.first_name + " " + user.last_name} src={user.avatar} />
                        <Typography sx={{ fontWeight: 'bold', margin: 3 }} color="text.secondary" variant="h6">
                            {user.first_name} {user.last_name}
                        </Typography>
                    </Stack>
                    <Typography sx={{ margin: 3 }} color="text.secondary" variant="body2">
                        {user.email}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserCard;
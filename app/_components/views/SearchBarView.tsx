import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

type Props = {
    data: User[] | undefined,
    setCurrData: (x: User[] | undefined) => void
};

const SearchBarView = ({ data, setCurrData }: Props) => {
    const [text, setText] = useState('');
    const originalData = data?.slice();

    useEffect(() => {
        if (!text) {
            setCurrData(originalData);
            return;
        }
        if (text.length < 3) {
            return;
        }
        let newData: User[] | undefined = [];
        newData = originalData?.filter((user) => {
            return user.id.toString() === text ||
                user.first_name.toLowerCase().includes(text.toLowerCase()) ||
                user.last_name.toLowerCase().includes(text.toLowerCase()) ||
                user.email.toLowerCase().includes(text.toLowerCase());
        });
        setCurrData(newData);
    }, [text]);

    return (
        <TextField
            onChange={(e) => setTimeout(() => setText(e.target.value), 1000)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
            }}
            sx={{
                width: '100%',
            }}
            size="small"
            id="searchkey"
        />
    );
};

export default SearchBarView;
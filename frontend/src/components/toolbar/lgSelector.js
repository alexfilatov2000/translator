import React from 'react'
import i18next from 'i18next'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {languages} from "../../config/trOptions";
import * as r from "react";

export default function lg() {
    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en'

    const [lg, setLg] = r.useState(currentLanguageCode);

    const handleChange = (event) => {
        setLg(event.target.value);
        i18next.changeLanguage(event.target.value)
    };

    return (
        <div className="container">
            <FormControl variant="standard" sx={{ m: 1}} >
                <Select
                    style={{color: "#cbac4a"}}
                    value={lg}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {languages.map(e => (
                        <MenuItem value={e.code} key={e.code}>
                            {e.name} {e.country_flag}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

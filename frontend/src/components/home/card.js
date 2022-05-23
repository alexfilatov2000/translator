import React, {useEffect, useState} from "react";
import moment from 'moment';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
    ButtonBase,
} from "@mui/material";

export default function CardProduct ({advert}) {

    return (
        <Card sx={{ width: 300, display: 'inline-block', float: 'left', margin: 2}} key={advert.id}>
            <Box style={{position: 'relative'}}>
                <ButtonBase style={{width:"100%"}} onClick={()=>{window.open(advert.url, "_blank")}}>
                    <CardMedia
                        component="img"
                        height="180"
                        image={advert.image}
                        alt="green iguana"
                    />

                    <div style={{position: 'absolute', top: 5, right: 5, width: '20%'}}>
                        <img src={advert.sourceURL} alt="" style={{width: '100%'}}/>
                    </div>
                </ButtonBase>
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {advert.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                    Source: {advert.source}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                    Prise: {advert.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                    status: {advert.status}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{textAlign:"left", color: "green"}}>
                    Creation Date: {moment(advert.createdAt).format('L')}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{textAlign:"left", color: "red"}}>
                    Expiration Date: {moment(advert.expireDate).format('L')}
                </Typography>
                <Box style={{backgroundColor: '#e6e4e5', display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row", lineHeight: 2}}>
                    <span style={{verticalAlign: "middle", marginRight: 20}}>Statistics</span>
                    <span style={{ marginRight: 5}}><RemoveRedEyeOutlinedIcon/>{advert.statistics.advert_views}</span>
                    <span style={{ marginRight: 5}}><FavoriteBorderOutlinedIcon/>{advert.statistics.users_observing}</span>
                    <span style={{ marginRight: 5}}><LocalPhoneOutlinedIcon/>{advert.statistics.phone_views}</span>
                </Box>
            </CardContent>
            <CardActions style={{float: "right"}}>
                <Button onClick={()=>{window.open(advert.url, "_blank")}} size="small" >GO to source</Button>
            </CardActions>
        </Card>
    )

}
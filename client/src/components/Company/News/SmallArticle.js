import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

//Calculate font size depending on length of text
const calculateFontSize = (textLength) => {
    const baseVH = 1 + (0.23 * window.innerHeight / 100); // Convert vh to pixels
    const baseVW = 1 + (0.23 * window.innerWidth / 100); // Convert vw to pixels
    const base = baseVH * baseVW;
    
    const minSize = 1 + (0.20 * window.innerHeight / 100) * (0.20 * window.innerWidth / 100); 
    const maxLength = 60;
    const scaleFactor = 0.1;
    
    let fontSize = base - (textLength - maxLength) * scaleFactor;
    return Math.max(fontSize, minSize);
}

function SmallArticle(props) {
    const data = props.data;
    const backgroundColor = '#c5cad7';
    const borderRadius = "10px";

    try {
        //Data
        const headline = data.headline;
        const url = data.url;
        const source = data.source;
        const date = data.date;
        const image = data.image;
        var summary = data.summary;

        //Styling
        const headline_style = {
            fontFamily : 'Palatino',
            fontSize: `${calculateFontSize(headline.length)}px`,
            fontWeight: 900,
            top: "5px"
        };
        const date_style = {
            fontFamily: 'Times New Roman',
            fontSize: 'calc(8px + 0.5vh)',
            position: 'absolute',
            bottom: '0',
            left: '0.7vw',
        };

        return (
            <a href={url} target="_blank" rel="noopener noreferrer">
                <Card className="news-small-size" style={{ backgroundColor: backgroundColor, borderRadius: borderRadius}}>
                    <CardActionArea style={{ height: "100%", display: "grid", gridTemplateColumns: "60% 40%" }}>
                        <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px", marginTop: "-15%" }}>
                            <Typography style={headline_style}>
                                {headline}
                            </Typography>
                            <Typography style={date_style} color="text.secondary">
                                {date}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "5px" }}
                            image={image}
                            alt="Oops!"
                        />
                    </CardActionArea>
                </Card>
            </a>
        );
    }
    catch {
        return (
            <a href={"https://google.com"} target="_blank" rel="noopener noreferrer">
                <Card className="news-small-size" style={{ backgroundColor: backgroundColor, borderRadius: borderRadius}}>
                    <CardActionArea style={{ height: "100%", display: "grid", gridTemplateColumns: "60% 40%" }}>
                        <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px", marginTop: "-15%" }}>
                            <Typography>
                                SOMETHING WENT WRONG
                            </Typography>
                            <Typography color="text.secondary">
                                xx/xx/xxxx
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </a>
        );
    }
    
}

export default SmallArticle;
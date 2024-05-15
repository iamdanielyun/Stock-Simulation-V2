import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

//Calculate font size depending on length of text
const calculateFontSize = (textLength) => {
    const baseVH = 1 + (0.25 * window.innerHeight / 100); // Convert vh to pixels
    const baseVW = 1 + (0.25 * window.innerWidth / 100); // Convert vw to pixels
    const base = baseVH * baseVW;

    const minSize = 1 + (0.25 * window.innerHeight / 100) * (0.25 * window.innerWidth / 100); 
    const maxLength = 60;
    const scaleFactor = 0.1;
    
    let fontSize = base - (textLength - maxLength) * scaleFactor;
    return base;
    // return Math.max(fontSize, minSize);
}

function BigArticle(props) {
    const data = props.data;
    const backgroundColor = '#c5cad7';
    const borderRadius = "10px";

    try {
        //Data
        var headline = data.headline;
        const url = data.url;
        const source = data.source;
        const date = data.date;
        const image = data.image;
        var summary = data.summary;

        //Styling
        const headline_style = {
            fontFamily : 'Courier New',
            fontSize: `${calculateFontSize(headline.length)}px`,
            fontWeight: 900
        };
        const date_style = {
            fontFamily: 'Times New Roman',
            fontSize: 'calc(8px + 0.5vh)',
            position: 'absolute',
            bottom: '0',
            left: '0.7vw',
            padding: '2px',
        };
        
        if(headline && headline.length > 90)
            headline = headline.substring(0,90) + "...";

        return (
            <a href={url} target="_blank" rel="noopener noreferrer">
                <Card className="news-big-size" style={{ backgroundColor: backgroundColor, borderRadius: borderRadius}}>
                    <CardActionArea style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <CardMedia
                            style = {{height: "100vh", maxHeight: "70%"}}
                            className="news-big-image"
                            component = "img"
                            image = {image}
                            alt = "Oops!"
                        />
                        <CardContent className="news-big-content">
                            <Typography style={headline_style} variant="h5" component="div">
                                {headline}
                            </Typography>
                            {/* <hr style={{ position: "absolute", bottom: "20px", left: 0, right: 0, borderBottom: "0.1px solid grey", width: "100%", margin: "0 auto" }}  />   */}
                        </CardContent>
                        <Typography style={date_style} color="text.secondary">
                            {date}
                        </Typography>
                    </CardActionArea>
                </Card>
            </a>
        );
    }
    catch {
        return (
            <a href={"https://google.com"} target="_blank" rel="noopener noreferrer">
                <Card className="news-big-size" style={{ backgroundColor: backgroundColor, borderRadius: borderRadius}}>
                    <CardActionArea style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <CardContent className="news-big-content">
                            <Typography variant="h5" component="div">
                                SOMETHING WENT WRONG
                            </Typography>
                        </CardContent>
                        <Typography color="text.secondary">
                            xx/xx/xxxx
                        </Typography>
                    </CardActionArea>
                </Card>
            </a>
        );
    }
    
}

export default BigArticle;
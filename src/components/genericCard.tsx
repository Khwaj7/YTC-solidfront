import Card from "@suid/material/Card";
import CardContent from "@suid/material/CardContent";
import CardMedia from "@suid/material/CardMedia";
import Typography from "@suid/material/Typography";
import { CardActionArea } from "@suid/material";

export enum EElementType {
    CHANNEL = "channel", 
    VIDEO = "video",
}

interface IProps {
    backgroundImageUrl: string;
    name: string;
    elementType: EElementType;
}

export function GenericCard(props: IProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.backgroundImageUrl}
                    alt={`${props.name} thumbnail`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click to check this {props.elementType}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

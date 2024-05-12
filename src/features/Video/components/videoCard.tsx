import Card from "@suid/material/Card";
import CardMedia from "@suid/material/CardMedia";
import CardContent from "@suid/material/CardContent";
import Typography from "@suid/material/Typography";
import IconButton from "@suid/material/IconButton";
import VisibilityIcon from '@suid/icons-material/Visibility';
import ThumbUpIcon from '@suid/icons-material/ThumbUp';
import globegoldenhour from '/assets/globegoldenhour.jpg';

function VideoCard({ video }) {
  console.log(video);
  return (
    <Card style={{height: "auto", "margin-top": "0.5rem"}}>
      <CardMedia
        component="img"
        height="100"
        image={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
        alt="Video thumbnail"
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {video.title}
        </Typography>
        <div style={{ display: "flex", "align-items": "center", gap: "10px" }}>
          <IconButton aria-label="views">
            <VisibilityIcon />
            <Typography variant="body2" component="span">
              150k
            </Typography>
          </IconButton>
          <IconButton aria-label="likes">
            <ThumbUpIcon />
            <Typography variant="body2" component="span">
              150k
            </Typography>
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default VideoCard;

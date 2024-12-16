import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Anime } from "../../types/Anime";

const AnimeCard: React.FC<{ anime: Anime }> = ({anime}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        maxWidth: isSmallScreen ? "100%" : 600,
        textAlign: "center",
        boxShadow: 3,
        margin: "auto",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: isSmallScreen ? 200 : 400,
          objectFit: "cover",
        }}
        image={anime.imageUrl}
        alt={anime.title}
      />
      <CardContent>
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          component="h2"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          {anime.title}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {anime.synopsis}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Episodes: {anime.episodes}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="secondary"
          href={anime.url}
          target="_blank"
          rel="noopener noreferrer"
          size={isSmallScreen ? "small" : "medium"}
        >
          More details on MyAnimeList
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnimeCard;
import React, { useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Anime } from "../../../types/Anime";

const AnimeSlideshow: React.FC<{ animeData: Anime[] }> = ({ animeData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextAnime = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animeData.length);
  };

  const handlePreviousAnime = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + animeData.length) % animeData.length);
  };

  /*
    TODO: Re-do design, it's bland. 
  */ 
  return (
    <Card className="anime-card">
      <CardMedia
        component="img"
        className="anime-image"
        image={animeData[currentIndex].imageUrl}
        alt={animeData[currentIndex].title}
      />
      <CardContent>
        <Typography variant="h5" component="h2" className="anime-title">
          {animeData[currentIndex].title}
        </Typography>
        <Typography variant="body1">
          {animeData[currentIndex].synopsis}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Episodes: {animeData[currentIndex].episodes}
        </Typography>
      </CardContent>
      <CardActions className="anime-actions">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={handlePreviousAnime}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          href={animeData[currentIndex].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          More details on MyAnimeList
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForward />}
          onClick={handleNextAnime}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnimeSlideshow;
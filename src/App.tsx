import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Container
} from "@mui/material";
import AnimeSlideshow from "./components/Slideshow/Anime/AnimeSlideshow.tsx";
import { Anime } from "./types/Anime";

const App: React.FC = () => {
  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    axios
      .get("http://localhost:8080/api/v1/favourites/anime")
      .then((response) => {
        setAnimeData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime data: ", error);
        setLoading(false);
      });
  }, []);

  if(loading) {
    return(
      <Box id="loading-container">
        <CircularProgress/>
      </Box>
    );
  }

  return(
    <Container id="app-container">
      {animeData.length > 0 ? (
        <AnimeSlideshow animeData={animeData}/>
      ) : (
        <Typography variant="h6" color="error" className="error-message">
          No data retrieved
        </Typography>
      )}
    </Container>
  );
};

export default App;
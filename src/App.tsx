import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AnimeSlideshow from "./components/Slideshow/Anime/AnimeSlideshow";
import Loader from "./components/Loader/Loader";
import { Anime } from "./types/Anime";

const App: React.FC = () => {
  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect (() => {
    axios
      .get("http://localhost:8080/api/v1/favourites/anime")
      .then((response) => {
        setAnimeData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime data: ", error);
        setLoading(false);
      });
  }, []);

  if(loading) {
    return(
      <Loader />
    );
  }

  return(
    <Container id="app-container">
      {animeData.length > 0 ? (
        <>
          <Typography
            variant={isSmallScreen ? "h4" : "h3"}
            id="site-title"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            Kumakun's Favourites
          </Typography>
          <AnimeSlideshow animeData={animeData} />
        </>
      ) : (
        <Typography
          variant="h6"
          color="error"
          id="error-message"
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          No data retrieved
        </Typography>
      )}
    </Container>
  );
};

export default App;
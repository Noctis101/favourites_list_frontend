import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  useMediaQuery,
  useTheme,
  Box,
  ThemeProvider,
  createTheme
} from "@mui/material";
import AnimeSlideshow from "./components/Slideshow/Anime/AnimeSlideshow";
import Loader from "./components/Loader/Loader";
import { Anime } from "./types/Anime";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#90caf9',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    subtitle1: {
      fontSize: '1.1rem',
      color: '#999',
      marginBottom: '2rem',
    }
  },
});

const App: React.FC = () => {
  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
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

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
          paddingY: 4,
        }}
      >
        <Container id="app-container" maxWidth="lg">
          {animeData.length > 0 ? (
            <>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant={isSmallScreen ? "h4" : "h3"}
                  id="site-title"
                  sx={{
                    color: "#fff",
                    marginBottom: 1,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: "60px",
                      height: "3px",
                      background: "linear-gradient(45deg, #2196f3 30%, #90caf9 90%)",
                      borderRadius: "2px",
                    }
                  }}
                >
                  My Anime Collection
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                  Discover and track your favorite anime series
                </Typography>
              </Box>
              
              <Box sx={{ mb: 8 }}>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  sx={{
                    color: "#fff",
                    marginBottom: 2,
                    fontWeight: 600
                  }}
                >
                  Featured Favorites
                </Typography>
                <AnimeSlideshow animeData={animeData} />
              </Box>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: '#2196f3',
                textAlign: "center",
                padding: 4,
                background: "rgba(0,0,0,0.6)",
                borderRadius: 2,
                backdropFilter: "blur(10px)",
              }}
            >
              No anime found in your favorites
            </Typography>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
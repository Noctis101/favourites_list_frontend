import React, { useState } from "react";
import {
  Box,
  Slide,
  IconButton,
  useMediaQuery,
  useTheme,
  alpha
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Anime } from "../../../types/Anime";
import AnimeCard from '../../AnimeCard/Card';

const AnimeSlideshow: React.FC<{ animeData: Anime[] }> = ({animeData}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNextAnime = () => {
    setSlideDirection("left");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animeData.length);
  };

  const handlePreviousAnime = () => {
    setSlideDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex - 1 + animeData.length) % animeData.length);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Navigation buttons with hover effects */}
      <IconButton
        onClick={handlePreviousAnime}
        disabled={currentIndex === 0}
        sx={{
          position: "absolute",
          left: isSmallScreen ? -16 : -28,
          zIndex: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(4px)",
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
          width: isSmallScreen ? 40 : 56,
          height: isSmallScreen ? 40 : 56,
          transition: "all 0.3s ease",
        }}
      >
        <NavigateBeforeIcon 
          sx={{ 
            fontSize: isSmallScreen ? 24 : 32,
            color: "white",
          }} 
        />
      </IconButton>

      {/* Card container with transition effects */}
      <Box
        sx={{
          width: "100%",
          maxWidth: isSmallScreen ? "100%" : "90%",
          margin: "auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {animeData.map((anime, index) => (
          <Box
            key={index}
            sx={{
              display: currentIndex === index ? "block" : "none",
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <Slide 
              direction={slideDirection} 
              in={currentIndex === index}
              timeout={500}
            >
              <Box>
                <AnimeCard anime={anime} />
              </Box>
            </Slide>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handleNextAnime}
        disabled={currentIndex === animeData.length - 1}
        sx={{
          position: "absolute",
          right: isSmallScreen ? -16 : -28,
          zIndex: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(4px)",
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
          width: isSmallScreen ? 40 : 56,
          height: isSmallScreen ? 40 : 56,
          transition: "all 0.3s ease",
        }}
      >
        <NavigateNextIcon 
          sx={{ 
            fontSize: isSmallScreen ? 24 : 32,
            color: "white",
          }} 
        />
      </IconButton>
    </Box>
  );
};

export default AnimeSlideshow;
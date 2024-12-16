import React, { useState } from "react";
import {
  Box,
  Slide,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Anime } from "../../../types/Anime";
import AnimeCard from '../../AnimeCard/Card'

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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        padding: 2
      }}
    >
      {/* Previous button */}
      <IconButton
        onClick={handlePreviousAnime}
        sx={{ margin: 1 }}
        disabled={currentIndex === 0}
      >
        <NavigateBeforeIcon fontSize={isSmallScreen ? "small" : "large"} />
      </IconButton>
      
        {/* AnimeCard container */}
        <Box
          sx={{
            width: isSmallScreen ? "90%" : "50%",
            height: "100%",
            overflow: "hidden"
          }}
        >
          {/* Render the current anime card */}
          {animeData.map((anime, index) => (
            <Box
              key={index}
              sx={{
                display: currentIndex === index ? "block" : "none"
              }}
            >
              <Slide direction={slideDirection} in={currentIndex === index}>
                <Stack
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: "100%"
                  }}
                >
                  {/* Pass the current anime data to the AnimeCard component */}
                  <AnimeCard anime={anime} />
                </Stack>
              </Slide>
            </Box>
          ))}
        </Box>

      {/* Next button */} 
      <IconButton
        onClick={handleNextAnime}
        sx={{ margin: 1 }}
        disabled={currentIndex === animeData.length - 1}
      >
        <NavigateNextIcon fontSize={isSmallScreen ? "small" : "large"} />
      </IconButton>
    </Box>
  );
};

export default AnimeSlideshow;
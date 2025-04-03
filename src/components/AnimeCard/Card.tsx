import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Chip
} from "@mui/material";
import { Anime } from "../../types/Anime";

const AnimeCard: React.FC<{ anime: Anime }> = ({anime}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        maxWidth: isSmallScreen ? "100%" : 800,
        background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
        color: "#fff",
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          "& .media-overlay": {
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)",
          }
        }
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: isSmallScreen ? 300 : 450,
            objectFit: "cover",
          }}
          image={anime.imageUrl}
          alt={anime.title}
        />
        <Box
          className="media-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)",
            transition: "background 0.3s ease-in-out",
          }}
        />
        
        {/* Metadata chips */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            gap: 1,
          }}
        >
          <Chip
            label="Sub | Dub"
            size="small"
            sx={{
              backgroundColor: "rgba(33, 150, 243, 0.9)",
              color: "white",
              fontWeight: 600,
              backdropFilter: "blur(4px)",
            }}
          />
          {anime.episodes && (
            <Chip
              label={`${anime.episodes} Episodes`}
              size="small"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                backdropFilter: "blur(4px)",
              }}
            />
          )}
        </Box>

        {/* Title and synopsis overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 3,
            zIndex: 1,
          }}
        >
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            component="h2"
            sx={{
              fontWeight: 700,
              marginBottom: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              fontFamily: "'Roboto', sans-serif",
              letterSpacing: "0.5px"
            }}
          >
            {anime.title}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "#e0e0e0",
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.6,
              fontSize: isSmallScreen ? "0.9rem" : "1rem",
              marginBottom: 2
            }}
          >
            {anime.synopsis}
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #2196f3 30%, #90caf9 90%)",
              color: "white",
              fontWeight: "bold",
              padding: "8px 24px",
              "&:hover": {
                background: "linear-gradient(45deg, #1976d2 30%, #64b5f6 90%)",
              }
            }}
            href={anime.url}
            target="_blank"
            rel="noopener noreferrer"
            size={isSmallScreen ? "small" : "medium"}
          >
            View Details
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default AnimeCard;
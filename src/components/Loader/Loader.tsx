import React from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme
} from "@mui/material";

const Loader: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return(
    <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 1300,
        }}
      >
        <CircularProgress
          size={isSmallScreen ? 40 : 60}
        />
      </Box>
  );
};

export default Loader;
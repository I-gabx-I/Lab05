import React from "react";
import { LinearProgress, Typography, Box } from "@mui/material";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="body2" align="center">
        Progreso: {progress}%
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default ProgressBar;

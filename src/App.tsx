import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import SurveyForm from "./components/SurveyForm";

const App: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          📋 Encuesta Interactiva
        </Typography>
        <SurveyForm />
      </Paper>
    </Container>
  );
};

export default App;

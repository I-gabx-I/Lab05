import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import ProgressBar from "./ProgressBar";
import SuccessMessage from "./SuccessMessage";

type FormData = {
  name: string;
  email: string;
  age: string;
};

const SurveyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [progress, setProgress] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validateField(name, value);
    updateProgress();
  };

  // Validar inputs en tiempo real
  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    if (!value) {
      errorMsg = "Este campo es requerido.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMsg = "Ingresa un email válido.";
    }
    setErrors({ ...errors, [name]: errorMsg });
  };

  // Calcular progreso
  const updateProgress = () => {
    const filledFields = Object.values(formData).filter((val) => val !== "");
    const progressPercentage = (filledFields.length / 3) * 100;
    setProgress(progressPercentage);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((err) => err);
    if (!hasErrors && progress === 100) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: "", email: "", age: "" });
      setProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Correo Electrónico"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal" error={!!errors.age}>
        <InputLabel>Edad</InputLabel>
        <Select name="age" value={formData.age} onChange={handleChange}>
          <MenuItem value="">
            <em>Seleccione</em>
          </MenuItem>
          <MenuItem value="Menos de 18">Menos de 18</MenuItem>
          <MenuItem value="18-25">18-25</MenuItem>
          <MenuItem value="26-40">26-40</MenuItem>
          <MenuItem value="Más de 40">Más de 40</MenuItem>
        </Select>
        <FormHelperText>{errors.age}</FormHelperText>
      </FormControl>

      <ProgressBar progress={progress} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={progress !== 100}
      >
        Enviar Encuesta
      </Button>

      {submitted && <SuccessMessage />}
    </form>
  );
};

export default SurveyForm;

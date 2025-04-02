import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const UploadContainer = styled(Box)({
  maxWidth: "400px",
  margin: "auto",
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
});

const Header = styled(Box)({
  background: "linear-gradient(90deg, #FF7F1E 0%, #FF5C00 100%)",
  color: "#fff",
  padding: "15px",
  borderRadius: "10px 10px 0 0",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "18px",
});

const StyledButton = styled(Button)({
  background: "linear-gradient(90deg, #FF7F1E 0%, #FF5C00 100%)",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  fontWeight: "bold",
  marginTop: "20px",
  "&:hover": {
    background: "linear-gradient(90deg, #FF5C00 0%, #FF7F1E 100%)",
  },
});

const ImageUpload: React.FC = () => {
    const navigate = useNavigate(); // Hook for navigation
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<{ name?: string; description?: string; file?: string }>({});

  const validateForm = () => {
    let newErrors: { name?: string; description?: string; file?: string } = {};
    
    if (!name.trim()) newErrors.name = "Image name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!file) newErrors.file = "Please upload an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrors((prev) => ({ ...prev, file: "" })); // Clear file error on selection
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", file as File);

    try {
      await axios.post("http://localhost:5000/upload", formData);
      alert("Image uploaded successfully!");

      // Reset form on successful upload
      setName("");
      setDescription("");
      setFile(null);
      // Navigate back to the previous page
      navigate(-1);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed!");
    }
  };

  return (
    <Container maxWidth="sm">
      <UploadContainer>
        <Header>
          <Typography variant="h6"> Upload Image</Typography>
          <Typography variant="body2">Add an image with details</Typography>
        </Header>
        <Box component="form" mt={2} onSubmit={handleSubmit}>
          <Typography align="left" fontWeight="bold" mb={1}>
            Image Name
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter image name"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" })); // Clear error on input
            }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <Typography align="left" fontWeight="bold" mt={2} mb={1}>
            Description
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter description"
            variant="outlined"
            size="small"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" })); // Clear error on input
            }}
            error={!!errors.description}
            helperText={errors.description}
          />
          <Typography align="left" fontWeight="bold" mt={2} mb={1}>
            Upload Image
          </Typography>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ width: "100%" }} />
          {errors.file && (
            <Typography color="error" fontSize="0.85rem" mt={1} textAlign="left">
              {errors.file}
            </Typography>
          )}
          <StyledButton fullWidth variant="contained" type="submit">
            Upload
          </StyledButton>
        </Box>
      </UploadContainer>
    </Container>
  );
};

export default ImageUpload;

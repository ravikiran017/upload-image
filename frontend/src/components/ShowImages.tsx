import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface Image {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

const GalleryContainer = styled(Container)({
  marginTop: "20px",
  width:"100vh",
  textAlign: "center",
});

const Header = styled(Box)({
    display:"flex",
    justifyContent:"space-between",
    background: "linear-gradient(90deg, #FF7F1E 0%, #FF5C00 100%)",
    color: "#fff",
    padding: "15px",
    borderRadius: "10px 10px 0 0",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
  });
  
const StyledCard = styled(Card)({
  maxWidth:270,
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});
const StyledButton = styled(Button)({
    background: "linear-gradient(90deg, #FF7F1E 0%, #FF5C00 100%)",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "bold",
    width:"150px",
    "&:hover": {
      background: "linear-gradient(90deg, #FF5C00 0%, #FF7F1E 100%)",
    },
  });

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/images")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <GalleryContainer>
      <Header >
        <Typography variant="h4" fontWeight="bold" mb={3} ml={10}>
            Image Gallery
        </Typography>
        <StyledButton  variant="contained" onClick={() => navigate("/upload-image")}>
            Upload
        </StyledButton>
      </Header>
      <Grid container spacing={4}>
        {images.map((img) => (
            <StyledCard>
              <CardMedia component="img" height="350" image={img.image_url} alt={img.name} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {img.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {img.description}
                </Typography>
              </CardContent>
            </StyledCard>
        ))}
      </Grid>
    </GalleryContainer>
  );
};

export default ImageGallery;

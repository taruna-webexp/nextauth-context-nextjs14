import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <>
      <Container>
        <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h3" gutterBottom>
              Welcome to the Home Page
            </Typography>
            <Typography variant="body1" paragraph>
              This is the starting point of our amazing app. Here you can find
              information about our features and how to get started.
            </Typography>
            <Typography variant="h3" gutterBottom>
              Features
            </Typography>
            <Typography variant="body1" paragraph>
              - Feature 1: Description of the first feature.
            </Typography>
            <Typography variant="body1" paragraph>
              - Feature 2: Description of the second feature.
            </Typography>
            <Typography variant="body1" paragraph>
              - Feature 3: Description of the third feature.
            </Typography>
            <Typography variant="body1" paragraph>
              - Feature 4: Description of the fourth feature.
            </Typography>
            <Typography variant="body1" paragraph>
              - Feature 5: Description of the fivth feature.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary">
                Learn More
              </Button>
            </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;

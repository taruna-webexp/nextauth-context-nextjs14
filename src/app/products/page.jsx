"use client";
import UserContext from "@/context/UserContext";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";
const Page = () => {
  const { apiData } = useContext(UserContext);  // get api data form Context api

  return (
    <div>
      <Typography variant="h4" gutterBottom
        className="mt-3 mb-8 text-center">
        Products:
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 3, md: 4 }}
      >
        {apiData.map((item) => (
          <Grid item xs={6} key={item.id}>
            <Box border={1} margin={1} padding={1} borderRadius={1}>
              <div><b>Movie: </b>{item.movie}</div>
              <div><b>Rating: </b>{item.rating}</div>
              <Link href={item.imdb_url} className=" text-sm text-blue-700 hover:underline">Get Here</Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Page;

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { FC, useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";

export default function About() {
  return (
    <Box height="100vh">
      <Navbar aboutPage={true} />

      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        sx={{ marginTop: "1rem" }}
      >
        Team Seahawks
      </Typography>
      <Grid container spacing={0.3}>
        <Grid item xs={3}>
          <Card sx={{ margin: "1rem" }}>
            <CardMedia
              sx={{ height: 250 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Safwan Kader
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Front-End Engineer
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">GitHub</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ margin: "1rem" }}>
            <CardMedia
              sx={{ height: 250 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Michelle Zhao
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Software Development Engineer
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">GitHub</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ margin: "1rem" }}>
            <CardMedia
              sx={{ height: 250 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Leila Pan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Software Development Engineer
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">GitHub</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ margin: "1rem" }}>
            <CardMedia
              sx={{ height: 250 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ailun Yu
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Back-End Engineer
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">GitHub</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box display="flex">
        <Card sx={{ margin: "1rem", width: "50vw" }}>
          <CardContent>
            <Typography
              variant="h4"
              fontWeight={"bold"}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Project Details
            </Typography>

            <Typography variant="body1" align="left">
              The project aims to conduct cluster analysis on various sets of
              random district plans, focusing on several objectives. These
              include examining clustering effects within ensembles of random
              district plans, understanding cluster patterns, assessing the
              effectiveness of distance measures between pairs of district
              plans, determining the minimum number of plans in an ensemble
              required to identify almost all clusters, and visualizing these
              clusters. Additionally, the project aims to visualize thousands of
              random plans to facilitate the selection of individual plans. The
              terminology used involves defining "population" as the total
              population of a region, and "ensemble" as a collection of random
              district plans, with an ideal size of 10,000 plans, though a
              minimum of 500 plans is suggested due to computational
              constraints.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card sx={{ margin: "1rem", width: "50vw" }}>
          
        </Card>
      </Box>
    </Box>
  );
}

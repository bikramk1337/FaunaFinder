import { Box, Card, Grid } from "@mui/material";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Card variant="outlined" sx={{ height: 300, textAlign: "center" }}>
            dashboard item 1
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ height: 300, textAlign: "center" }}>
            dashboard item 2
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ height: 300, textAlign: "center" }}>
            dashboard item 3
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card variant="outlined" sx={{ height: 300, textAlign: "center" }}>
            dashboard item 4
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

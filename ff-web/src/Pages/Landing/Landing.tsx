import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import React from "react";
import { Logo } from "../../Components/Logo";
import {
  AccountCircle,
  Android,
  Apple,
  Forest,
  GitHub,
  Nature,
  NaturePeople,
  Spa,
  WaterDrop,
  Yard,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {};

const Landing = (props: Props) => {
  const navigate = useNavigate();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });

  return (
    <Box minHeight="100vh" bgcolor="#dfdfdf">
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          bgcolor: "none",
          // backdropFilter: "blur(20px)",
        }}
        style={{
          backgroundColor: "transparent",
          // color: trigger ? "white" : "black",
          transition: trigger ? "0.3s" : "0.5s",
          boxShadow: "none",
          padding: "10px 0px",
        }}
      >
        <Toolbar>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box>
              <Logo size={40} />
            </Box>

            <Box>
              <Tooltip title="Github repository">
                <IconButton
                  aria-label="github"
                  size="large"
                  onClick={() => {
                    window.open(
                      "https://github.com/bikramk1337/FaunaFinder",
                      "_blank",
                      "noreferrer"
                    );
                  }}
                >
                  <GitHub color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Login">
                <IconButton
                  aria-label="user"
                  size="large"
                  onClick={() => {
                    navigate("auth/login");
                  }}
                >
                  <AccountCircle color="primary" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} lg={7}>
          <Box
            height="100vh"
            display={"flex"}
            flexDirection={"column"}
            justifyContent="center"
            // alignItems="center"
            sx={{
              padding: {
                xs: 10,
                md: 16,
                lg: 20,
              },
            }}
            paddingTop={20}
          >
            <Typography
              variant="h2"
              // component="h1"
              gutterBottom
              // textAlign={"center"}
              fontFamily={"Madimi One"}
            >
              Fauna Finder
            </Typography>

            <Typography variant="subtitle1" gutterBottom mb={10}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            </Typography>
            <Box>
              {/* <Typography variant="h5" component="h5" gutterBottom>
                Available on
              </Typography> */}
              <Box>
                <Grid container spacing={4}>
                  <Grid item xs={12} lg={6}>
                    <Button
                      sx={{ height: 54 }}
                      variant="contained"
                      disableElevation
                      color="secondary"
                      size="large"
                      fullWidth
                      startIcon={<Apple />}
                    >
                      App Store
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Button
                      sx={{ height: 54 }}
                      variant="contained"
                      disableElevation
                      color="secondary"
                      size="large"
                      fullWidth
                      startIcon={<Android />}
                    >
                      Play store
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Box
            sx={{
              bgcolor: "secondary.main",
              padding: {
                xs: 10,
                md: 16,
                xl: 20,
              },
            }}
            paddingTop={10}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} lg={12}>
                <Paper elevation={0} sx={{ padding: 4, bgcolor: "#8989FF" }}>
                  <Nature fontSize="large" />
                  <Typography variant="h5" gutterBottom>
                    Feature 1
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Paper elevation={0} sx={{ padding: 4, bgcolor: "#8989FF" }}>
                  <NaturePeople fontSize="large" />
                  <Typography variant="h5" gutterBottom>
                    Feature 2
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Paper elevation={0} sx={{ padding: 4, bgcolor: "#8989FF" }}>
                  <Forest fontSize="large" />
                  <Typography variant="h5" gutterBottom>
                    Feature 3
                  </Typography>
                </Paper>
              </Grid>
              {/* <Grid item xs={12} lg={6}>
                <Paper elevation={0} sx={{ padding: 4, bgcolor: "#8989FF" }}>
                  <Spa fontSize="large" />
                  <Typography variant="h5" gutterBottom>
                    Feature 2
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Paper elevation={0} sx={{ padding: 4, bgcolor: "#8989FF" }}>
                  <WaterDrop fontSize="large" />
                  <Typography variant="h5" gutterBottom>
                    Feature 3
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Paper elevation={0} sx={{ padding: 4, bgcolor: "#8989FF" }}>
                  <Yard fontSize="large" />
                  <Typography variant="h5" gutterBottom>
                    Feature 4
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ padding: 4, bgcolor: "#8989FF" }}>
                  <Typography variant="h5" gutterBottom>
                    Feature 5
                  </Typography>
                  <Typography variant="h5">
                    This is the description of feature 5.
                  </Typography>
                </Paper>
              </Grid> */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;

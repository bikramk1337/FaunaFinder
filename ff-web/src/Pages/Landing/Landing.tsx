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
import { AccountCircle, GitHub } from "@mui/icons-material";
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
    <Box minHeight="100vh">
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ bgcolor: "none", backdropFilter: "blur(20px)" }}
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
                  <GitHub />
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
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Container maxWidth={false}> */}
      {/* <Grid container>
        <Grid item container xs={12} md={6} bgcolor="#f7f7f7" height="100vh">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Fauna Finder
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Releasing in{" "}
            {Math.round(
              (new Date("2024-05-17").getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24 * 7)
            )}{" "}
            weeks
          </Typography>
          <Typography>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet
          </Typography>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Download Fauna Finder on
            </Typography>
            <Box>
              <Box sx={{ mb: 2 }}>
                <Button
                  sx={{ height: 54 }}
                  variant="outlined"
                  size="large"
                  fullWidth
                >
                  App St0re
                </Button>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Button
                  sx={{ height: 54 }}
                  variant="outlined"
                  size="large"
                  fullWidth
                >
                  Play store
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          spacing={4}
          bgcolor="#121212"
          height="100vh"
        >
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom>
                Feature 1
              </Typography>
              <Typography variant="body1">
                This is the description of feature 1.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom>
                Feature 2
              </Typography>
              <Typography variant="body1">
                This is the description of feature 2.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom>
                Feature 3
              </Typography>
              <Typography variant="body1">
                This is the description of feature 3.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom>
                Feature 4
              </Typography>
              <Typography variant="body1">
                This is the description of feature 4.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom>
                Feature 5
              </Typography>
              <Typography variant="body1">
                This is the description of feature 5.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid> */}
      {/* </Container> */}
      <Box
        height="70vh"
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          textAlign={"center"}
          fontFamily={"Madimi One"}
        >
          Fauna Finder
        </Typography>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          textAlign="center"
        >
          {Math.round(
            (new Date("2024-05-17").getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24 * 7)
          )}{" "}
          weeks to go
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;

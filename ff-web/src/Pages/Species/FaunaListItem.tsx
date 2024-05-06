import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ISpecies } from "../../Types";
import { MoreVert, ScienceOutlined } from "@mui/icons-material";
import FaunaDetailsModal from "./FaunaDetailsModal";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = {
  fauna: ISpecies;
};

const FaunaListItem = (props: Props) => {
  const { fauna } = props;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Grid item sm={12} lg={12}>
      <Card sx={{ display: "flex" }} variant="outlined">
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image="https://www.aces.edu/wp-content/uploads/2023/04/iStock-1232014586.jpg"
          alt={fauna.common_name}
        />
        <Box width={"100%"}>
          <CardContent>
            <Link
              key={fauna.id}
              to={`/admin/species/${fauna.id}`}
              // This is the trick! Set the `backgroundLocation` in location state
              // so that when we open the modal we still see the current page in
              // the background.
              state={{ backgroundLocation: location }}
              // sx={{ ml: -1 }}
              // onClick={() => {
              //   navigate(`/admin/species/${fauna.id}`, {});
              // }}
            >
              <Typography component="div" variant="h6">
                {fauna.common_name}
              </Typography>
            </Link>

            <Box display={"flex"} alignItems={"center"} gap={1}>
              <ScienceOutlined color="secondary" fontSize="small" />
              <Typography
                component="div"
                variant="body1"
                color="text.secondary"
              >
                {fauna.scientific_name}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {fauna.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default FaunaListItem;

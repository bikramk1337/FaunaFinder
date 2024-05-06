import React from "react";
import {
  useGetFaunaByParametersQuery,
  useGetFaunaQuery,
} from "../../Redux/Services/speciesService";
import { Box, Grid, Typography } from "@mui/material";
import FaunaListItem from "./FaunaListItem";
import FaunaSidebar from "./FaunaSidebar";
import { useSelector } from "react-redux";
import { selectFaunaFilterData } from "../../Redux/Slices/speciesSlice";
import { RootState } from "../../Redux/store";

type Props = {};

const FaunaList = (props: Props) => {
  // const { data, isLoading, isError } = useGetFaunaQuery();
  const filterValues = useSelector((state: RootState) =>
    selectFaunaFilterData(state)
  );

  const { data, isLoading, isError } = useGetFaunaByParametersQuery({
    label: filterValues.label,
    scientific_name: filterValues.scientific_name,
    common_name: filterValues.common_name,
  });
  return (
    <Box>
      <Box
        component="nav"
        sx={{ width: { lg: 400 }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <FaunaSidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${400}px )` },
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={4}
        >
          <Typography variant="h5" flex={2}>
            Species
          </Typography>
          <Box flex={1}></Box>
        </Box>

        {data && data.length === 0 ? <Box>No match found</Box> : <></>}

        <Box sx={{ mt: 2 }} style={{ width: "100%" }}>
          {isError ? (
            <Box>Error</Box>
          ) : isLoading ? (
            <Box>Loading...</Box>
          ) : (
            <Grid container spacing={2}>
              {data &&
                data.map((fauna) => {
                  return <FaunaListItem fauna={fauna} key={fauna.id} />;
                })}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FaunaList;

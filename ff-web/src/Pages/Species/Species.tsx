import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import React from "react";
import { useGetFaunaQuery } from "../../Redux/Services/speciesService";
import { FFTable } from "../../Components/FFTable";
import { SpeciesTableColumns } from "./SpeciesTableColumns";

type Props = {};

const Species = (props: Props) => {
  const { data, isLoading, isError } = useGetFaunaQuery();

  const handleEditClick = (id: GridRowId) => {};

  const handleDeleteClick = (id: GridRowId) => {};

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h5" mb={4}>
          Species
        </Typography>
        <ButtonGroup
          variant="outlined"
          color="secondary"
          aria-label="list grid view"
        >
          <Button>List view</Button>
          <Button>Grid view</Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ mt: 2 }} style={{ width: "100%" }}>
        {isError ? (
          <Box>Error</Box>
        ) : (
          <FFTable
            data={data?.data || []}
            columns={SpeciesTableColumns({
              handleEditClick,
              handleDeleteClick,
            })}
            page={1}
            pageSize={10}
            isLoading={isLoading}
          />
        )}
      </Box>
    </Box>
  );
};

export default Species;

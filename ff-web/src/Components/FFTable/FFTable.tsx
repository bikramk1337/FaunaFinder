import { Equalizer } from "@mui/icons-material";
import { Box, LinearProgress } from "@mui/material";
import { DataGrid, GridColDef, GridSlots } from "@mui/x-data-grid";
import React from "react";

type Props = {
  data: any[] | undefined;
  columns: GridColDef<any>[];
  page: number;
  pageSize: number;
  isLoading: boolean;
};

const FFTable = (props: Props) => {
  const { data, columns, page, pageSize, isLoading } = props;
  return (
    <DataGrid
      autoHeight
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: page, pageSize: pageSize },
        },
      }}
      pageSizeOptions={[10, 50, 100]}
      rowSelection={false}
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
      }}
      slots={{
        loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
        noRowsOverlay: () => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Equalizer />
            <Box sx={{ mt: 1 }}>No data</Box>
          </Box>
        ),
      }}
      loading={isLoading}
      disableColumnMenu
    />
  );
};

export default FFTable;

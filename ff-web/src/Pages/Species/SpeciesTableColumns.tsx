import React from "react";
import { GridActionsCellItem, GridColDef, GridRowId } from "@mui/x-data-grid";

export const SpeciesTableColumns = ({
  handleEditClick,
  handleDeleteClick,
}: {
  handleEditClick: (id: GridRowId) => void;
  handleDeleteClick: (id: GridRowId) => void;
}) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: true,
    },
    {
      field: "image_label",
      headerName: "Image label",
      flex: 1,
      sortable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      sortable: true,
    },
    {
      field: "common_name",
      headerName: "Common name",
      flex: 1,
      sortable: true,
    },
    {
      field: "scientific_name",
      headerName: "Scientific name",
      flex: 1,
      sortable: true,
    },
    {
      field: "family",
      headerName: "Family",
      flex: 1,
      sortable: true,
    },
    {
      field: "fauna_class",
      headerName: "Family class",
      flex: 1,
      sortable: true,
    },
    {
      field: "fauna_infra_class",
      headerName: "Fauna infra class",
      flex: 1,
      sortable: true,
    },
    {
      field: "conservation_status",
      headerName: "Conservation status",
      flex: 1,
      sortable: true,
    },
    {
      field: "habitat",
      headerName: "Habitat",
      flex: 1,
      sortable: true,
    },
    {
      field: "diet",
      headerName: "Diet",
      flex: 1,
      sortable: true,
    },
    {
      field: "lifespan",
      headerName: "Lifespan",
      flex: 1,
      sortable: true,
    },
    {
      field: "geographic_range",
      headerName: "Geographic range",
      flex: 1,
      sortable: true,
    },
    {
      field: "fun_fact",
      headerName: "Fun fact",
      flex: 1,
      sortable: true,
    },

    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          onClick={() => handleEditClick(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          label="Delete"
          onClick={() => handleDeleteClick(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  return columns;
};

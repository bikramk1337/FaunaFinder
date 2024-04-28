import {
  Box,
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
import { MoreVert } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteFaunaMutation,
  useGetFaunaByIdQuery,
} from "../../Redux/Services/speciesService";
import { skipToken } from "@reduxjs/toolkit/query";
import DeleteSpeciesDialog from "./DeleteSpeciesDialog";

type Props = {
  //   showModal: boolean;
  //   setShowModal: (showModal: boolean) => void;
  //   fauna: ISpecies;
};

const InfoPairContainer = ({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) => {
  return (
    <Box mb={1} px={4}>
      <Typography variant="body1" fontWeight={"bold"}>
        {name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {value}
      </Typography>
    </Box>
  );
};

const FaunaDetailsModal = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useGetFaunaByIdQuery(id ?? skipToken);
  const [
    deleteFauna,
    { isLoading: isDeleteFaunaLoading, isError: isDeleteFaunaError },
  ] = useDeleteFaunaMutation();

  const open = Boolean(anchorEl);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMoreClose();
    navigate(`/admin/species/${id}/edit`);
  };

  const handleDeleteClick = () => {
    handleMoreClose();
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    id &&
      deleteFauna(id)
        .unwrap()
        .then(() => {
          setShowDeleteModal(false);
          navigate("/admin/species");
        })
        .catch((error) => {
          console.log("login eror", error);
        });
  };

  if (!id) return null;

  return (
    <>
      <Dialog
        open={true}
        onClose={() => {
          navigate(-1);
        }}
        fullWidth
        maxWidth="md"
        scroll="paper"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isLoading ? (
          <Box>Loading...</Box>
        ) : isError ? (
          <Box>Error</Box>
        ) : (
          <>
            <DialogTitle
              id="alert-dialog-title"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>{data?.common_name || "-"}</Box>
              <IconButton
                id="fauna-actions"
                color="secondary"
                onClick={handleMoreClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="fauna-actions"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMoreClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
              </Menu>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ px: 0 }}>
              <Grid container>
                <Grid item sm={12} md={6}>
                  <InfoPairContainer
                    name="Scientific name"
                    value={data?.scientific_name || "-"}
                  />
                  <InfoPairContainer
                    name="Family"
                    value={data?.family || "-"}
                  />
                  <InfoPairContainer
                    name="Class"
                    value={data?.fauna_class || "-"}
                  />
                  <InfoPairContainer
                    name="Infraclass"
                    value={data?.fauna_infra_class || "-"}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <InfoPairContainer
                    name="Habitat"
                    value={data?.habitat || "-"}
                  />
                  <InfoPairContainer
                    name="Geographic range"
                    value={data?.geographic_range || "-"}
                  />
                  <InfoPairContainer name="Diet" value={data?.diet || "-"} />
                  <InfoPairContainer
                    name="Lifespan"
                    value={data?.lifespan ? data?.lifespan + " years" : "-"}
                  />
                </Grid>
              </Grid>
              <Divider variant="middle" sx={{ my: 2 }} />
              <InfoPairContainer
                name="Conservation status"
                value={data?.conservation_status || "-"}
              />
              <Divider variant="middle" sx={{ my: 2 }} />
              <InfoPairContainer
                name="Description"
                value={data?.description || "-"}
              />
              <InfoPairContainer
                name="Fun fact"
                value={data?.fun_fact || "-"}
              />
            </DialogContent>
          </>
        )}
      </Dialog>
      {showDeleteModal && (
        <DeleteSpeciesDialog
          open={showDeleteModal}
          handleClose={() => {
            setShowDeleteModal(false);
          }}
          handleDelete={handleDelete}
          isLoading={isDeleteFaunaLoading}
          isError={isDeleteFaunaError}
        />
      )}
    </>
  );
};

export default FaunaDetailsModal;

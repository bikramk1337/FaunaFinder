import React, { FormEvent, useEffect, useState } from "react";
import {
  useGetFaunaByIdQuery,
  useUpdateFaunaMutation,
} from "../../Redux/Services/speciesService";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { Box, Grid, Typography } from "@mui/material";
import FFButton from "../../Components/FFButton/FFButton";
import { ISpecies } from "../../Types";
import FFTextInput from "../../Components/FFTextInput/FFTextInput";

type Props = {};

const EditFauna = (props: Props) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetFaunaByIdQuery(id ?? skipToken);

  const [
    updateFauna,
    { isLoading: isEditFaunaLoading, isError: isEditFaunaError },
  ] = useUpdateFaunaMutation();

  const initialEditData: ISpecies = {
    label: "",
    common_name: "",
    other_names: "",
    description: "",
    scientific_name: "",
    class_name: "",
    order: "",
    family: "",
    size: "",
    habitat: "",
    diet: "",
    breeding: "",
    geographic_range: "",
    other_info: "",
    id: 0,
  };

  const [editData, setEditData] = useState<ISpecies>(initialEditData);

  useEffect(() => {
    if (id && data && data.hasOwnProperty("id") && data.id === parseInt(id)) {
      setEditData(data);
    }
  }, [id, data]);

  const goBack = () => {
    navigate(-1);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFauna(editData)
      .unwrap()
      .then(() => {
        setEditData(initialEditData);
        goBack();
      })
      .catch((error) => {
        console.log("add user eror", error);
      });
  };

  if (isError) {
    return <Box>Error</Box>;
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={4}
      >
        <Typography variant="h5">Edit fauna</Typography>
        <FFButton
          name="Cancel"
          color="secondary"
          onClick={() => {
            goBack();
          }}
        />
      </Box>
      <Box>
        <form onSubmit={handleSave}>
          <Grid container xs={12} lg={8} spacing={2}>
            <Grid item xs={12} lg={6}>
              <Box mt={4}>
                <FFTextInput
                  formLabel="Common name"
                  id="common_name"
                  placeholder="Enter common name"
                  type="text"
                  value={editData.common_name}
                  onChange={(e) =>
                    setEditData({ ...editData, common_name: e.target.value })
                  }
                  required
                  autoFocus
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box mt={4}>
                <FFTextInput
                  formLabel="Scientific name"
                  id="scientific_name"
                  placeholder="Enter scientific name"
                  type="text"
                  value={editData.scientific_name}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      scientific_name: e.target.value,
                    })
                  }
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={4}>
              <FFTextInput
                formLabel="Family"
                id="family"
                placeholder="Enter family"
                type="text"
                value={editData.family}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    family: e.target.value,
                  })
                }
                required
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <FFTextInput
                formLabel="Class"
                id="fauna_class"
                placeholder="Enter Class"
                type="text"
                value={editData.class_name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    class_name: e.target.value,
                  })
                }
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FFTextInput
                formLabel="Order"
                id="order"
                placeholder="Enter order"
                type="text"
                value={editData.order}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    order: e.target.value,
                  })
                }
                required
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <FFTextInput
                formLabel="Diet"
                id="diet"
                placeholder="Enter diet"
                type="text"
                value={editData.diet}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    diet: e.target.value,
                  })
                }
                required
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <FFTextInput
                formLabel="Size"
                id="size"
                placeholder="Enter size"
                type="text"
                value={editData.size}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    size: e.target.value,
                  })
                }
                required
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <Grid item xs={12} lg={6}>
                <FFTextInput
                  formLabel="Habitat"
                  id="habitat"
                  placeholder="Enter habitat"
                  type="text"
                  value={editData.habitat}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      habitat: e.target.value,
                    })
                  }
                  required
                />
              </Grid>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Grid item xs={12} lg={6}>
                <FFTextInput
                  formLabel="Breeding"
                  id="breeding"
                  placeholder="Enter breeding"
                  type="text"
                  value={editData.breeding}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      breeding: e.target.value,
                    })
                  }
                  required
                />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Grid item xs={12} lg={6}>
                <FFTextInput
                  formLabel="Geographic range"
                  id="geographic_range"
                  placeholder="Enter geographic range"
                  type="text"
                  value={editData.geographic_range}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      geographic_range: e.target.value,
                    })
                  }
                  required
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FFTextInput
                multiline
                rows={4}
                formLabel="Description"
                id="description"
                placeholder="Enter description"
                type="text"
                value={editData.description}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    description: e.target.value,
                  })
                }
                required
              />
            </Grid>
          </Grid>
          <Box display={"flex"} justifyContent={"end"} mt={4}>
            <FFButton
              name="Cancel"
              color="secondary"
              type="button"
              sx={{ mr: 1 }}
              disabled={isEditFaunaLoading}
              onClick={() => {
                goBack();
              }}
            />

            <FFButton
              name="Save"
              type="submit"
              isLoading={isEditFaunaLoading}
              disabled={isEditFaunaLoading}
              onClick={() => {
                goBack();
              }}
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditFauna;

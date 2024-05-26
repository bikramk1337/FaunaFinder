import { Box, Card, Grid, Typography } from "@mui/material";
import {
  BarChart,
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  GaugeValueText,
  PieChart,
  ScatterChart,
  axisClasses,
  cheerfulFiestaPalette,
  useGaugeState,
} from "@mui/x-charts";
import React from "react";
import { themeLight } from "../../Themes";
import { useGetUsersQuery } from "../../Redux/Services/userService";
import { useGetFaunaQuery } from "../../Redux/Services/speciesService";
import { useGetClassificationHistoryQuery } from "../../Redux/Services/classifierService";
import { IClassificationHistory } from "../../Types/ClassificationHistory";

const palette = [
  "#03c98a",
  "#f14704",
  "#023eca",
  "#e90391",
  "#89db06",
  "#ffd102",
  "#e48901",
  "#c40303",
];

type Props = {};

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={"#ffbe6f"} />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke={"#ffbe6f"}
        strokeWidth={3}
      />
    </g>
  );
}

const Dashboard = (props: Props) => {
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useGetUsersQuery({});

  const {
    data: faunaData,
    isLoading: faunaIsLoading,
    isError: faunaIsError,
  } = useGetFaunaQuery();

  const {
    data: classifierData,
    isLoading: classifierIsLoading,
    isError: classifierIsError,
  } = useGetClassificationHistoryQuery();

  const findTopFaunas = (arr: any) => {
    if (arr.length > 0) {
      // Step 1: Count the occurrences of each string
      const countMap: any = {};
      arr.forEach((item: any) => {
        countMap[item.prediction] = (countMap[item.prediction] || 0) + 1;
      });

      // Step 2: Convert the object to an array of [string, count] pairs
      const countArray = Object.entries(countMap);

      // Step 3: Sort the array by count in descending order
      // @ts-ignore
      countArray.sort((a, b) => b[1] - a[1]);

      // Step 4: Extract the top 3 items
      const topFive = countArray.slice(0, 5).map((item) => {
        return {
          prediction: item[0],
          count: item[1],
        };
      });

      console.log("top5", topFive);

      return topFive;
    } else {
      return [];
    }
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={6} lg={3}>
          <Card variant="outlined" sx={{ height: 200, p: 2 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Total faunas
            </Typography>
            {faunaIsLoading ? <Typography>Loading...</Typography> : <></>}
            {faunaIsError ? <Typography>Error!</Typography> : <></>}
            {!faunaIsLoading && faunaData && faunaData.count ? (
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "#cac000" }}
              >
                {faunaData.count}
              </Typography>
            ) : (
              <></>
            )}
          </Card>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Card variant="outlined" sx={{ height: 200, p: 2 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Total faunas identified
            </Typography>
            {classifierIsLoading ? <Typography>Loading...</Typography> : <></>}
            {classifierIsError ? <Typography>Error!</Typography> : <></>}
            {!classifierIsLoading && classifierData && classifierData.data ? (
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "#9d005e" }}
              >
                {classifierData.count}
              </Typography>
            ) : (
              <></>
            )}
          </Card>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Card variant="outlined" sx={{ height: 200, p: 2 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Admin users
            </Typography>
            {userIsLoading ? <Typography>Loading...</Typography> : <></>}
            {userIsError ? <Typography>Error!</Typography> : <></>}
            {!userIsLoading && userData && userData.data ? (
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "#00869d" }}
              >
                {
                  userData.data.filter((item) =>
                    ["superuser", "dashboard"].includes(item.user_type)
                  ).length
                }
              </Typography>
            ) : (
              <></>
            )}
          </Card>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Card variant="outlined" sx={{ height: 200, p: 2 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Mobile app users
            </Typography>
            {userIsLoading ? <Typography>Loading...</Typography> : <></>}
            {userIsError ? <Typography>Error!</Typography> : <></>}
            {!userIsLoading && userData && userData.data ? (
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "#00619d" }}
              >
                {
                  userData.data.filter((item) =>
                    ["regular"].includes(item.user_type)
                  ).length
                }
              </Typography>
            ) : (
              <></>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card
            variant="outlined"
            sx={{
              height: 250,
              p: 2,
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Classifier accuracy
            </Typography>
            <Box
              sx={{
                // height: 200,

                display: "flex",
                // justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h1"
                component="div"
                sx={{ color: "#2f9d00" }}
              >
                93%
              </Typography>
              <GaugeContainer
                // width={150}
                height={150}
                startAngle={-110}
                endAngle={110}
                value={90}
                // sx={{ bgcolor: "red" }}
              >
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugePointer />
              </GaugeContainer>
            </Box>
          </Card>
        </Grid>
        {/* <Grid item xs={12} lg={6}>
          <Card
            variant="outlined"
            sx={{
              // height: 250,
              p: 2,
              gap: 6,
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Top 3 Classified Faunas
            </Typography>

            <Card
              variant="outlined"
              sx={{
                // height: 200,

                display: "flex",
                gap: 6,
                // justifyContent: "space-around",
                // alignItems: "center",
                bgcolor: "#07a3f072",
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Typography>1.</Typography>
              <Typography>
                {classifierData &&
                  (findTopFaunas(
                    classifierData.data?.map((item) => item.prediction)
                  )[0]?.prediction ||
                    "N/A")}
              </Typography>
            </Card>
            <Card
              variant="outlined"
              sx={{
                // height: 200,

                display: "flex",
                gap: 6,
                // justifyContent: "space-around",
                // alignItems: "center",
                bgcolor: "#071ef071",
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Typography>2.</Typography>
              <Typography>
                {classifierData &&
                  (findTopFaunas(
                    classifierData.data?.map((item) => item.prediction)
                  )[1]?.prediction ||
                    "N/A")}
              </Typography>
            </Card>
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                gap: 6,
                bgcolor: "#6007f071",
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Typography>3.</Typography>
              <Typography>
                {classifierData &&
                  (findTopFaunas(
                    classifierData.data?.map((item) => item.prediction)
                  )[2]?.prediction ||
                    "N/A")}
              </Typography>
            </Card>
          </Card>
        </Grid> */}
        {classifierData &&
          classifierData.data &&
          classifierData.data.length > 0 && (
            <Grid item xs={12} lg={8}>
              <Card variant="outlined" sx={{ height: 400, p: 2 }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Classifier accuracy
                </Typography>
                {/* <Box> */}
                <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: findTopFaunas(classifierData.data).map(
                        (item) => item.prediction
                      ),
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    {
                      // @ts-ignore
                      data: findTopFaunas(classifierData.data)?.map(
                        (item) => item.count
                      ),
                    },
                  ]}
                  colors={palette}
                />
                {/* </Box> */}
              </Card>
            </Grid>
          )}

        {/* <Grid item xs={12} lg={4}>
          <Card variant="outlined" sx={{ height: 400, p: 2 }}>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: ["bar A", "bar B", "bar C"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: [2, 5, 3],
                },
              ]}
              colors={palette}
            />
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Dashboard;

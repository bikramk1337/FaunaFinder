import { Box, Card, Tab, Tabs } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IRoute } from "../../Types";

type Props = {
  navList: IRoute[];
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FFTopNav = (props: Props) => {
  const { navList } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, value: number) => {
    navigate(navList[value].path);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card variant="outlined">
        <Tabs
          value={
            navList.findIndex((item) => item.path === location.pathname) === -1
              ? 0
              : navList.findIndex((item) => item.path === location.pathname)
          }
          textColor="secondary"
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="tab-navigation"
          variant="scrollable"
          scrollButtons="auto"
        >
          {navList.map((item) => (
            <Tab label={item.name} key={item.path} {...a11yProps(0)} />
          ))}
        </Tabs>
      </Card>
    </Box>
  );
};

export default FFTopNav;

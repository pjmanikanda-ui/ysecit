import * as React from "react";
import PropTypes from "prop-types";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, IconButton, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "./redux/actions";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Food = ({ categories }) => {
  const selectedCategory = useSelector((state) => state.selectCategory);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "30%" }}>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: { xs: 320, sm: 480 },
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
          ScrollButtonComponent={(props) => {
            const isLeft = props.direction === "left";
            const isRight = props.direction === "right";
            return (
              <IconButton
                {...props}
                sx={{
                  backgroundColor: "gray",
                  "&.Mui-disabled": {
                    backgroundColor: "red",
                  },
                  ...(isLeft && {
                    backgroundColor: "gray",
                  }),
                  ...(isRight && {
                    backgroundColor: "gray",
                  }),
                }}
              >
                {isLeft ? "L" : isRight ? "R" : null}
              </IconButton>
            );
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              label={category.category_name}
              onClick={() => dispatch(selectCategory(category.category_name))}
              {...a11yProps(index)}
            />
          ))}
          {/* <Tab label="Item One" {...a11yProps(0)} /> */}
        </Tabs>
      </Box>
      {categories.map(
        (category, index) =>
          selectedCategory === category.category_name && (
            <CustomTabPanel
              value={value}
              index={0}
              key={category.category_name}
            >
              {category.items.map((item, index) => (
                <Paper key={index} elevation={3} style={{ margin: "20px" }}>
                  <Grid container>
                    <Grid item xs={4}>
                      <img
                        src={item.image}
                        alt={item.food_name}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6" mt={2}>
                        {item.food_name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {item.description}
                      </Typography>
                      <Typography variant="subtitle1" mt={1}>
                        Price: {item.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </CustomTabPanel>
          )
      )}
    </Box>
  );
};
export default Food;

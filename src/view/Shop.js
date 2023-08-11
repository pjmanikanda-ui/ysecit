import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Tab,
  Tabs,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  tabsClasses,
  Box,
  Divider,
  ButtonGroup,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { selectCategory } from "../redux/actions";
import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { myTheme } from "../theme";

const Shop = () => {
  const categories = useSelector((state) => state.categories);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //   const handleAddToCart = (item) => {
  //     setCart((prevCart) => ({
  //       ...prevCart,
  //       [item.food_name]: (prevCart[item.food_name] || 0) + 1,
  //     }));
  //   };

  const handleAddToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item.food_name });
  };

  const handleIncrement = (itemName) => {
    dispatch({ type: "INCREMENT_CART_ITEM", payload: itemName });
  };

  const handleDecrement = (itemName) => {
    dispatch({ type: "DECREMENT_CART_ITEM", payload: itemName });
  };

  const handleTabChange = (event, newValue) => {
    dispatch(selectCategory(newValue));
  };

  const filteredItems =
    selectedCategory === "All"
      ? categories.flatMap((category) => category.items)
      : categories.find(
          (category) => category.category_name === selectedCategory
        )?.items || [];

  return (
    <Container maxWidth={false}>
      <Tabs
        value={selectedCategory}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          paddingTop: "50px",
          marginTop: "10px",
          marginBottom: "20px",
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
          position: "relative",
          "& button.MuiTab-labelIcon": {
            backgroundColor: "#fff",
            color: myTheme.palette.primary.dark,
            border: "2px solid",
            borderColor: myTheme.palette.primary.contrastText,
            borderRadius: "5px",
            marginRight: "20px",
          },
          "& button.Mui-selected": {
            backgroundColor: myTheme.palette.primary.light,
            color: myTheme.palette.primary.main,
            border: "2px solid",
            borderColor: myTheme.palette.primary.main,
            borderRadius: "5px",
          },
          "& button:hover": {
            backgroundColor: myTheme.palette.primary.light,
            color: myTheme.palette.primary.main,
            border: "2px solid",
            borderColor: myTheme.palette.primary.main,
            borderRadius: "5px",
          },
          "& button:focus": {
            backgroundColor: myTheme.palette.primary.light,
            color: myTheme.palette.primary.main,
            border: "2px solid",
            borderColor: myTheme.palette.primary.main,
            borderRadius: "5px",
          },
          "& button:active": {
            backgroundColor: myTheme.palette.primary.light,
            color: myTheme.palette.primary.main,
            border: "2px solid",
            borderColor: myTheme.palette.primary.main,
            borderRadius: "5px",
          },
        }}
        TabIndicatorProps={{
          hidden: true,
        }}
        ScrollButtonComponent={(props) => {
          const isLeft = props.direction === "left";
          const isRight = props.direction === "right";
          return (
            <IconButton
              {...props}
              sx={{
                backgroundColor: myTheme.palette.primary.light,
                color: myTheme.palette.primary.main,
                border: "2px solid",
                borderColor: myTheme.palette.primary.main,
                borderRadius: "5px",
                position: "absolute",
                top: "0",
                width: "30px",
                height: "30px",
                "&.Mui-disabled": {
                  backgroundColor: myTheme.palette.primary.light,
                  color: myTheme.palette.primary.main,
                },
                ...(isLeft && {
                  right: "40px",
                }),
                ...(isRight && {
                  right: "0",
                }),
              }}
            >
              {isLeft ? (
                <KeyboardArrowLeftTwoToneIcon />
              ) : isRight ? (
                <KeyboardArrowRightTwoToneIcon />
              ) : null}
            </IconButton>
          );
        }}
      >
        <Tab
          label="All Menu"
          value="All"
          icon={
            <Box
              component="img"
              src="../assets/c.png"
              sx={{ width: "90px", height: "90px" }}
            ></Box>
          }
        />
        {categories.map((category) => (
          <Tab
            key={category.category_name}
            label={category.category_name}
            value={category.category_name}
            icon={
              <Box
                component="img"
                alt={category.category_name}
                src={category.category_image}
                sx={{ width: "90px", height: "90px" }}
              ></Box>
            }
          ></Tab>
        ))}
      </Tabs>
      <Divider sx={{ marginBottom: "30px" }} />
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Special menu for you
        </Typography>
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.food_name}>
              <Card sx={{ borderRadius: "10px" }}>
                <Box sx={{ position: "relative", p: 2, pb: 0 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.food_name}
                    sx={{ borderRadius: "8px" }}
                  />
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      p: "2px 8px",
                      borderRadius: "5px",
                      position: "absolute",
                      bottom: "10px",
                      right: "25px",
                    }}
                  >
                    <StarIcon fontSize="small" color="primary" />
                    <Typography variant="body1" color="textPrimary">
                      4.5
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ pb: 0 }}>
                  <Typography variant="h5">{item.food_name}</Typography>
                  <Typography variant="h6">{item.price}</Typography>
                  <Typography
                    variant="p"
                    color="textSecondary"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 2 }}>
                  {cart[item.food_name] ? (
                    <ButtonGroup
                      variant="contained"
                      size="small"
                      aria-label="count"
                    >
                      <Button
                        color="primary"
                        sx={{
                          color: myTheme.palette.primary.main,
                          bgcolor: "#fff",
                          fontWeight: 700,
                          py: "5px",
                          border: "0 !important",
                        }}
                        onClick={() => handleDecrement(item.food_name)}
                      >
                        <RemoveIcon />
                      </Button>
                      <Button
                        color="primary"
                        sx={{
                          color: myTheme.palette.primary.main,
                          bgcolor: "#fff",
                          fontWeight: 700,
                          py: "5px",
                          border: "0 !important",
                        }}
                        disabled
                      >
                        {cart[item.food_name]}
                      </Button>
                      <Button
                        color="primary"
                        sx={{
                          color: myTheme.palette.primary.main,
                          bgcolor: "#fff",
                          fontWeight: 700,
                          py: "5px",
                          border: "0 !important",
                        }}
                        onClick={() => handleIncrement(item.food_name)}
                      >
                        <AddIcon />
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        color: myTheme.palette.primary.main,
                        bgcolor: "#fff",
                        fontWeight: 700,
                        px: "30px",
                        py: "5px",
                      }}
                      onClick={() => handleAddToCart(item)}
                    >
                      ADD
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Shop;

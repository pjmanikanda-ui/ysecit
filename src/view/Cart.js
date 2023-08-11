import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Container,
  Button,
  Divider,
  Box,
  Card,
  CardMedia,
  CardContent,
  ButtonGroup,
  Chip,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
} from "../redux/actions";
import { myTheme } from "../theme";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const getItemDetails = (itemName) => {
    for (const category of categories) {
      for (const item of category.items) {
        if (item.food_name === itemName) {
          return item;
        }
      }
    }
    return null;
  };

  const handleIncrement = (itemName) => {
    dispatch(incrementCartItem(itemName));
  };

  const handleDecrement = (itemName) => {
    if (cart[itemName] === 1) {
      dispatch(removeCartItem(itemName));
    } else {
      dispatch(decrementCartItem(itemName));
    }
  };

  // const handleAddToCart = (item) => {
  //   dispatch(incrementCartItem(item.food_name));
  // };

  const handleRemove = (itemName) => {
    dispatch(removeCartItem(itemName));
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    Object.keys(cart).forEach((itemName) => {
      const item = getItemDetails(itemName);
      if (item) {
        subtotal += parseFloat(item.price.slice(1)) * cart[itemName];
      }
    });
    return subtotal;
  };

  const calculateTax = () => {
    const TAX_RATE = 0.1;
    return calculateSubtotal() * TAX_RATE;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <Container>
      <Typography variant="h4" align="center" mt={2}>
        Cart
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" align="center">
          Current Order
        </Typography>
        <Chip
          label={`Table ${Object.keys(cart).length || 0}`}
          sx={{
            backgroundColor: myTheme.palette.primary.light,
            color: myTheme.palette.primary.main,
            fontWeight: "700",
            borderRadius: 0,
          }}
        />
      </Box>
      {Object.keys(cart).length === 0 ? (
        <Typography variant="subtitle1" align="center" mt={2}>
          Your cart is empty.
        </Typography>
      ) : (
        <Box>
          {Object.keys(cart).map((itemName, index) => {
            const item = getItemDetails(itemName);
            if (item) {
              return (
                <Card
                  sx={{
                    display: "flex",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    borderWidth: "0 0 1px 0",
                    borderColor: "#E3E3E3",
                    borderStyle: "solid",
                    paddingBottom: "20px",
                    "&:not(:first-child)": {},
                    "&:not(:last-child)": {
                      marginBottom: "20px",
                    },
                  }}
                  key={itemName}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 70, height: 70, borderRadius: "10px" }}
                    image={item.image}
                    alt={item.food_name}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: "1 0 auto",
                        gap: 1,
                        padding: "0 15px",
                      }}
                    >
                      <Typography variant="h6">{item.food_name}</Typography>
                      <ButtonGroup
                        variant="contained"
                        size="small"
                        aria-label="count"
                        sx={{
                          width: "max-content",
                          borderRadius: "20px",
                          alignItems: "center",
                          p: "5px",
                        }}
                      >
                        <RemoveIcon
                          sx={{
                            color: "white",
                            backgroundColor: "#FFCA00",
                            borderRadius: "50%",
                            "&:hover": { cursor: "pointer" },
                          }}
                          size="small"
                          disabled={cart[itemName] === 0}
                          onClick={() => handleDecrement(itemName)}
                        ></RemoveIcon>
                        <Typography sx={{ padding: "0 10px" }}>
                          {cart[itemName]}
                        </Typography>
                        <AddIcon
                          sx={{
                            color: "white",
                            backgroundColor: "#FFCA00",
                            borderRadius: "50%",
                            "&:hover": { cursor: "pointer" },
                          }}
                          size="small"
                          onClick={() => handleIncrement(itemName)}
                        ></AddIcon>
                      </ButtonGroup>
                    </CardContent>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 1,
                        padding: "0 !important",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color={myTheme.palette.secondary.contrastText}
                      >
                        {item.price}
                      </Typography>
                      <DeleteOutlineIcon
                        color="error"
                        onClick={() => handleRemove(itemName)}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      ></DeleteOutlineIcon>
                    </CardContent>
                  </Box>
                </Card>
              );
            } else {
              return null;
            }
          })}
        </Box>
      )}

      {Object.keys(cart).length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" align="right">
            Subtotal: ${calculateSubtotal().toFixed(2)}
          </Typography>
          <Typography variant="subtitle1" align="right">
            Tax: ${calculateTax().toFixed(2)}
          </Typography>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="h6" align="right">
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px", fontWeight: 700, color: "#fff" }}
          >
            ORDER NOW
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;

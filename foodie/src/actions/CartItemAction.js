import {
  DEC_QUANTITY,
  FETCH_CART,
  SET_LOADING,
  OFFSET_LOADING
} from "../constant/CartItemsConstant";
import axios from "axios";
let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}
if (typeof window !== 'undefined' && localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

}

export const fetchData = () => async (dispatch) => {
  console.log('hiii')
  const promise = await axios
    .get("https://food-app-timesinternet.herokuapp.com/api/customer/cart")
    .then((res) => {
      const data = res.data
      return dispatch(cartData(data))
    })
    .catch((err) => console.log(err))
};

const cartData = (data) => {
  return {
    type: FETCH_CART,
    payload: data
  }
}
const setLoadingTrue = () => {
  return {
    type : SET_LOADING,
    payload : true
  }
}

const setLoadingFalse = () => {
  return {
    type : OFFSET_LOADING,
    payload : false
  }
}
export const addToCart = (data) => async (dispatch) => {
  await axios.put(`https://food-app-timesinternet.herokuapp.com/api/customer/cart/cart_item/${data}`,{})
    .then(() => {dispatch(fetchData())})
    .catch((err) => {
      console.error(err)
    });
};

export const incItemCount = (data) => async (dispatch) => {
  dispatch(setLoadingTrue())
  console.log("increment", data.id)
  await axios.put('https://food-app-timesinternet.herokuapp.com/api/customer/cart/cart_item', {
    "quantity": data.quantity + 1,
    "cartItemId": data.id
  }).then( () => {
    dispatch(setLoadingFalse())
    return dispatch(fetchData())
  }).catch(err => {
    console.error(err)
  });
 
};

export const decItemCount = (data) => async (dispatch) => {
  dispatch(setLoadingTrue())
  console.log("decrement", data.id)
  await axios.put('https://food-app-timesinternet.herokuapp.com/api/customer/cart/cart_item', {
    "quantity": data.quantity - 1,
    "cartItemId": data.id
  }).then( () => {
    dispatch(setLoadingFalse())
    return dispatch(fetchData())
  }).catch(err => {
    console.error(err)
  });

};
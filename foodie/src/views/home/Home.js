import React, { useRef ,useEffect} from "react";
import Carousels from "../../components/carousel/Carousel";
import FooterPagePro from "../../components/footer/Footer";
import Navb from "../../components/header/Navbar";
import "./Home.css";
import CardsScroll from "../../components/card/CardsScroll";
import Search from "../../components/search/Search";
import CartMain from "../../components/cart/CartMain";
import DisplaySearchItems from "../../components/displaysearchitems/DisplaySearchItems";
import CardHeading from "../../components/card/CardHeading";
import HeadingText from "../../components/textEffect/HeadingText";
import TrendingDrinks from "../../components/card/drinkCards/TrendingDrinks";
import Testimonicals from "../../components/testimonicals/Testimonicals";
import KitchenExperts from "../../components/kitchenExperts/KitchenExperts";
import ShowKitchenExperts from "../../components/kitchenExperts/ShowKitchenExperts";
import Coupons from "../../components/cardForCoupons/Coupons";
import { CartPopUp } from "../../components/cart/CartPopUp";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}
export default function Home() {
  useEffect(() => {
    axios.put("/api/customer/cart/status", { status: "MUTABLE" }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {console.log(res)}).catch(err => {console.log(err)})
})
  const myItems = useSelector((state) => state.cartReducer);
  if (myItems.addedToCart) {
    toast.success("Item Added to cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (myItems.removedFromCart?.type) {
    toast.warn(myItems?.removedFromCart?.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <>
      <div>
        <Navb cartPopUp={true} searchModal={true} menu={true} />
        <Carousels/>
        <CardHeading data={["Coupons"]} />
        <div className="couponFlex">
          <Coupons />
        </div>

        <CardHeading data={["Menu at a glance"]} />
        <CardsScroll />
        <br />
        <ShowKitchenExperts />
        <Testimonicals />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <br />
        <FooterPagePro />
      </div>
    </>
  );
}

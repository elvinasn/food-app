import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(`${process.env.REACT_APP_DATABASE_URL}orders.json`, {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems ? (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      ) : null}
    </div>
  );
  const cartModalContent = (
    <>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{"$" + cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout ? (
        <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler} />
      ) : (
        modalActions
      )}
    </>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <>
      <p>Succesfully sent the order!</p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;

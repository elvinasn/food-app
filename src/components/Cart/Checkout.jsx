import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isPostalCode = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [fieldsValidity, setFieldsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isPostalCode(postal);
    const cityIsValid = !isEmpty(city);

    setFieldsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });
    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    if (!formIsValid) {
      return;
    }
    props.onSubmit({
      name,
      street,
      postalCode: postal,
      city,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          fieldsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!fieldsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          fieldsValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!fieldsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          fieldsValidity.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!fieldsValidity.postal && <p>Please enter a valid postal code!</p>}
      </div>
      <div
        className={`${classes.control} ${
          fieldsValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!fieldsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

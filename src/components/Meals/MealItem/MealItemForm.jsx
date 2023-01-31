import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 0 ||
      enteredAmountNum > 5
    ) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    props.onAddToCart(enteredAmountNum);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isFormValid ? <p>Please enter a valid amount (1-5)</p> : null}
    </form>
  );
};
export default MealItemForm;

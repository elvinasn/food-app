import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}meals.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          ...data[key],
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((e) => {
      setLoading(false);
      setError(e.message);
    });
  }, []);
  if (loading) {
    return (
      <section>
        <p className={classes["meals-loading"]}>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <p className={classes["meals-error"]}>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        {" "}
        <ul>
          {meals.map((meal) => (
            <MealItem
              name={meal.name}
              price={meal.price}
              description={meal.description}
              key={meal.id}
              id={meal.id}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

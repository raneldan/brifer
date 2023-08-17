import { useState } from "react";
import { formatRecipe } from "../services/RecipeFormaterService";
import "./Qform.module.css";

const QForm = (props) => {
  const [type, setType] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [style, setStyle] = useState("");
  const [isVegetrian, setIsVeggie] = useState("");
  const [isAllergy, setIsAllergy] = useState("");
  const [allergies, setAllergies] = useState("");

  const { setIsSpinnerDisplayed, setResult } = props;

  async function onSubmit(event) {
    event.preventDefault();
    setIsSpinnerDisplayed(true);
    setResult("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { type, numOfPeople, style, isVegetrian, isAllergy, allergies },
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        setIsSpinnerDisplayed(false);
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const recipeResult = formatRecipe(data.result);

      setResult(recipeResult);
      setType("");
      setNumOfPeople("");
      setStyle("");
      setIsVeggie("");
      setIsAllergy("");
      setAllergies("");
      setIsSpinnerDisplayed(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="type"
        placeholder="Breakfast / launch / dinner"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        name="numOfPoeple"
        placeholder="how many people"
        value={numOfPeople}
        onChange={(e) => setNumOfPeople(e.target.value)}
      />
      <input
        type="text"
        name="occesion"
        placeholder="Enter the style of the meal"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      />
      <input
        type="text"
        name="gender"
        placeholder="is it veggie"
        value={isVegetrian}
        onChange={(e) => setIsVeggie(e.target.value)}
      />
      <input
        type="text"
        name="hobbies"
        placeholder="do you have any alergies?"
        value={isAllergy}
        onChange={(e) => setIsAllergy(e.target.value)}
      />
      <input
        type="text"
        name="allergy"
        placeholder="Enter allergies if any"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
      />
      <input type="submit" value="Create recipe" />
    </form>
  );
};

export default QForm;

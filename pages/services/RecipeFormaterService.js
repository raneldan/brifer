export const formatRecipe = (rawData) => {
  const name = rawData.substring(
    rawData.indexOf("Name:") + 5,
    rawData.lastIndexOf("Ingredients:")
  );

  const ingredientsStr = rawData.substring(
    rawData.indexOf("Ingredients:") + 12,
    rawData.lastIndexOf("Instructions:")
  );

  const instructionStr = rawData.substring(
    rawData.indexOf("Instructions:") + 13
  );

  const ingredients = ingredientsStr
    .split(/\r?\n/)
    .map((ing) => {
      return ing.charAt(0) === "-" ? ing.substring(1) : ing;
    })
    .filter((ing) => {
      return ing.length > 0;
    });

  const instruction = instructionStr
    .split(/\r?\n/)
    .map((ing) => {
      return ing.substring(0);
    })
    .filter((ing) => {
      return ing.length > 0;
    });

  return { name, ingredients, instruction };
};

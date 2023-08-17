import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  console.log(req.body.data);
  const { type, numOfPeople, style, isVegetrian, isAllergy, allergies } =
    req.body.data || "";
  // if (name.trim().length === 0) {
  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a valid animal",
  //     },
  //   });
  // return;
  // }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 4096 - 257,
      prompt: generatePrompt(
        type,
        numOfPeople,
        style,
        isVegetrian,
        isAllergy,
        allergies
      ),
      temperature: 0.6,
    });
    console.log(completion.data.choices);
    // res.status(200).json({ result: completion.data.choices[0].text });
    let result = "";
    for (const line of completion.data.choices) {
      result += line.text + "\\n";
    }
    res.status(200).json({ result: result });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(
  type,
  numOfPeople,
  style,
  isVegetrian,
  isAllergy,
  allergies
) {
  const veggie =
    isVegetrian === "yes" || isVegetrian === "y"
      ? "The meal should be vegeterian"
      : "";
  const alergy = isAllergy ? `I am alergy to ${allergies}` : "";
  return (
    `suggest me a recipe for ${style} ${type} for ${numOfPeople}. ` +
    veggie +
    alergy +
    "it should be in the format Name: , Ingredients: and Instructions:"
  );
}

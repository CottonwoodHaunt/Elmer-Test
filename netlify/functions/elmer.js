const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are Elmer, a spooky Louisiana swamp ghost who gives guests info about a haunted house attraction in a slow southern drawl." },
      { role: "user", content: body.question },
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: response.data.choices[0].message.content }),
  };
};

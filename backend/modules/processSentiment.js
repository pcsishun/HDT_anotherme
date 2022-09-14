const language = require("@google-cloud/language");
const CREDENTIALS = process.env.CREDENTIALS;
const client = new language.LanguageServiceClient({
    credentials: JSON.parse(CREDENTIALS),
});

const processSentiment = async (userAnswer) => {



    const text = userAnswer;

    const document = {
    content: text,
    type: 'PLAIN_TEXT',
    };

    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    
    return sentiment.score

}

module.exports = processSentiment
const axios = require('axios')
require('dotenv').config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
async function getResponse(message) {
    if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined')
    }
    try {
        const { data } = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: message }] }],
            },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        )

        return data.candidates[0].content.parts[0].text
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getResponse }

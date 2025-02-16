const axios = require('axios')
require('dotenv').config()
const validator = require('validator')

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

/**
 * Valida e sanitiza a mensagem recebida.
 * @param {string} message: A mensagem a ser validada e sanitizada.
 * @returns {string} A mensagem sanitizada.
 */
function sanitizeMessage(message) {
    let sanitized = validator.escape(message)
    sanitized = sanitized.replace(/[^a-zA-Z0-9\s]/g, '')
    return sanitized
}

/**
 * Envia uma mensagem para a API da Google e retorna a resposta gerada.
 * @param {string} message - A mensagem a ser enviada para a API.
 * @returns {Promise<string>} - A resposta gerada pela API.
 */
async function getResponse(message) {
    if (!GEMINI_API_KEY) {
        throw new Error('A API KEY não foi definida.')
    }

    try {
        const { data } = await axios.post(
            GEMINI_API_URL,
            {
                contents: [{ parts: [{ text: message }] }],
            },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        )

        const response = data.candidates[0].content.parts[0].text
        if (!response) {
            throw new Error('No response from Gemini API')
        }

        return response
    } catch (error) {
        console.error(`Erro ao consultar a API do Gemini: ${error}`)
        throw error
    }
}

module.exports = { getResponse, sanitizeMessage }

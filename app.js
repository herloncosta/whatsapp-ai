const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const { getResponse, sanitizeMessage } = require('./src/ia')
const logger = require('./src/logger')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
})

client.on('qr', qr => {
    logger.info('Escaneie o QR Code abaixo:')
    qrcode.generate(qr, { small: true })
})

client.on('authenticated', () => {
    logger.info('Cliente autenticado!')
})

client.on('message', async data => {
    const message = sanitizeMessage(data.body)
    const prompt = `Você é um assistente pessoal amigável e prestativo. Responda à seguinte mensagem de forma natural e útil:\n\nUsuário: ${message}\nAssistente:`
    logger.info(`Mensagem recebida: ${message}`)

    try {
        const response = await getResponse(prompt)

        if (response) {
            await data.reply(response)
            logger.info(`Resposta enviada: ${response}`)
        } else {
            await data.reply('Não foi possível gerar uma resposta.')
            logger.warn('Não foi possível obter uma resposta da API.')
        }
    } catch (error) {
        logger.error('Erro ao processar a mensagem', error)
        await msg.reply('Ocorreu um erro ao processar sua mensagem.')
    }
})

client.initialize()

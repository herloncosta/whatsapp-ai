const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const { getResponse, sanitizeMessage } = require('./ia')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
})

client.on('qr', qr => {
    console.log('Escaneie o QR Code abaixo:')
    qrcode.generate(qr, { small: true })
})

client.on('authenticated', () => {
    console.log('Cliente autenticado!')
})

client.on('message', async data => {
    const message = sanitizeMessage(data.body)
    const prompt = `Você é um assistente pessoal amigável e prestativo. Responda à seguinte mensagem de forma natural e útil:\n\nUsuário: ${message}\nAssistente:`

    try {
        const response = await getResponse(prompt)

        if (response) {
            await data.reply(response)
        } else {
            await data.reply('Não foi possível gerar uma resposta.')
        }
    } catch (error) {
        console.error(error)
        await msg.reply('Ocorreu um erro ao processar sua mensagem.')
    }
})

client.initialize()

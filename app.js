const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const { getResponse } = require('./ia')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
})

client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
})

client.on('authenticated', () => {
    console.log('Cliente autenticado!')
})

client.on('message', async data => {
    const message = data.body
    try {
        const response = await getResponse(message)
        data.reply(response)
    } catch (error) {
        console.error(error)
    }
})

client.initialize()

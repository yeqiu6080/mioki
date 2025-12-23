import { NapCat } from 'napcat-sdk'

const napcat = new NapCat({
  protocol: 'ws',
  host: '127.0.0.1',
  port: 3001,
  token: '',
})

napcat.on('message.group', async (e) => {
  if (e.raw_message === 'test') {
    const data = await napcat.api<any>('get_cookies', { domain: 'qzone.qq.com' })
    console.log('API get_cookies result:', data)
  }
})

await napcat.run()

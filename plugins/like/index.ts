import { definePlugin } from 'mioki'

export default definePlugin({
  name: 'like',
  version: '1.0.0',
  description: '名片赞插件',
  setup: (ctx) => {
    ctx.handle('message.group', async (e) => {
      ctx.match(e, {
        赞我: async () => {
          let count = 0
          while (await ctx.bot.sendLike(e.sender.user_id, 10)) count += 10
          await e.addReaction(count > 0 ? '66' : '67')
          // return count > 0 ? `赞了你 ${count} 下` : '今天点过了，明天再来'
        },
      })
    })
  },
})

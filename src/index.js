import { token } from './token'
import actions from './actions/actions'
import Discord from 'discord.js'
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('voiceStateUpdate', (oldMember, newMember) => {
  console.log(oldMember.user.username)
  console.log(newMember.user.username)
})

client.on('message', msg => {
  msg.reply(actions.setupGuild(msg.guild.me.permissions.serialize()))
})

client.login(token)

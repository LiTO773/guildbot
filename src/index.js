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
  // Initial setup
  // Triggered by: yo!
  if (msg.content === '!hi') {
    const permissions = msg.guild.me.permissions.serialize()
    actions.setupGuild(msg, permissions)
  }
})

client.login(token)

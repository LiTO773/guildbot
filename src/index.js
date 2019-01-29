import { token } from './token'
import actions from './actions/actions'
import Discord from 'discord.js'
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === '!hi') {
    const permissions = msg.guild.me.permissions.serialize()
    actions.setupGuild(msg, permissions)
  }
})

client.on('voiceStateUpdate', (oldMember, newMember) => {
  actions.manageRooms(oldMember.voiceChannel, newMember.voiceChannel)
})

client.login(token)

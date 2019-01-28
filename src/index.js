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
    const permissions = actions.setupGuild(msg.guild.me.permissions.serialize())
    if (permissions) {
      msg.channel.send('Sup! Everything looks alright, I\'m ready to rock 🤘')
    } else {
      msg.channel.send('Sup! It seems like I have a few permissions missing 😕, please check if all permissions were set correctly.')
    }
  }
})

client.login(token)

import { token } from './token'
import Discord from 'discord.js'
import actions from './actions/actions'
import states from './states/states'
const client = new Discord.Client()

// Permission check
const defaultCheck = (guild, firstTime) => {
  const permissions = guild.me.permissions.serialize()
  const channel = guild.defaultChannel
  actions.setupGuild(channel, permissions, firstTime)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  // Check permissions [SO FAR IT IS ONLY EXPECTING ONE GUILD]
  client.guilds.forEach(guild => {
    defaultCheck(guild, true)
  })
})

client.on('roleUpdate', (oldR, newR) => defaultCheck(oldR.guild, false))
client.on('guildMemberUpdate', (oldU, newU) => defaultCheck(oldU.guild, false))

// Creates and deletes text rooms for voice channels
client.on('voiceStateUpdate', (oldMember, newMember) => {
  if (!states.ready) return
  actions.manageRooms(oldMember.voiceChannel, newMember.voiceChannel)
})

client.on('message', msg => {
  if (!states.ready) return
  const command = msg.content.split(' ')[0].toLowerCase()
  if (command === '\\changename') {
    actions.createRoomPoll(msg)
  }
})

// client.on('messageReactionAdd', (msgReaction, user) => {
//   console.log(msgReaction)
//   console.log('=============')
//   console.log(user)
// })

client.login(token)

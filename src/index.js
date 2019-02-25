import { token } from './token'
import Discord from 'discord.js'
import actions from './functions/functions'
import store from './reducers/store'
const client = new Discord.Client()

var ready = true

// Permission check
const defaultCheck = firstTime => {
  const guild = client.guilds.first()
  const permissions = guild.me.permissions.serialize()
  const owner = guild.owner
  ready = actions.setupGuild(owner, permissions, firstTime)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  defaultCheck(true)
})

client.on('roleUpdate', () => defaultCheck(false))
client.on('guildMemberUpdate', () => defaultCheck(false))

// Creates and deletes text rooms for voice channels
client.on('voiceStateUpdate', (oldMember, newMember) => {
  if (!ready) return
  actions.manageRooms(oldMember.voiceChannel, newMember.voiceChannel)
})

client.on('message', msg => {
  if (!ready) return
  const command = msg.content.split(' ')[0].toLowerCase()
  if (command === '\\changename') {
    actions.createRoomNameChangePoll(msg)
  }
})

client.on('messageReactionAdd', (msgReaction, user) => {
  if (user.id !== client.user.id) { // Checks if it wasn't a bot reaction
    // TODO
  }
})

// Subscriptions
store.subscribe(() => {
  console.log(store.getState())
})

client.login(token)

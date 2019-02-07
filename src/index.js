import { token } from './token'
import actions from './actions/actions'
import Discord from 'discord.js'
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

client.on('message', msg => {
  if (!states.ready) return
  if (msg.content === '!hi') {
    const permissions = msg.guild.me.permissions.serialize()
    actions.setupGuild(msg.channel, permissions)
  }
})

client.on('voiceStateUpdate', (oldMember, newMember) => {
  if (!states.state) return
  actions.manageRooms(oldMember.voiceChannel, newMember.voiceChannel)
})

client.login(token)
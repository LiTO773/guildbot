import { token } from './token'
import Discord from 'discord.js'
const client = new Discord.Client()

client.login(token)

export default client
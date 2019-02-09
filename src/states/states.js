// Rooms are organized by their room id
// and contain information about their original name, current name and the according text room
// Ready stores if the bot is correctly set up

export default {
  ready: false,
  rooms: new Map(), // What rooms are being used
  polls: new Map() // Stores messages that relate to a poll
}

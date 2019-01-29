// Rooms are organized by their room id
// and contain information about their original name, current name and the according text room
// Category hosts the category where the rooms are created, but will likely be deprecated!

export default {
  category: '',
  rooms: new Map() // What rooms are being used
}

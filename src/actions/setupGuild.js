// Checks if the bot has all the permissions it needs to function properly
export default (permissions) => (
  permissions.MANAGE_CHANNELS &&
  permissions.MANAGE_GUILD &&
  permissions.MANAGE_MESSAGES &&
  permissions.MANAGE_NICKNAMES &&
  permissions.MANAGE_ROLES &&
  permissions.MANAGE_ROLES_OR_PERMISSIONS &&
  permissions.VIEW_CHANNEL &&
  permissions.READ_MESSAGES &&
  permissions.SEND_MESSAGES &&
  permissions.EMBED_LINKS &&
  permissions.READ_MESSAGE_HISTORY
)

const { Client, Intents } = require('discord.js');

const token = 'INSERT_TOKEN'; // Replace with your bot token

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  try {
    const commands = await client.api
      .applications(client.user.id)
      .commands.get();

    for (const command of commands) {
      await client.api
        .applications(client.user.id)
        .commands(command.id)
        .delete();
      console.log(`Deleted command: ${command.name}`);
    }
  } catch (error) {
    console.error('Error deleting commands:', error);
  }
});

client.login(token);

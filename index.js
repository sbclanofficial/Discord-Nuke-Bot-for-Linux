const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const token = process.argv[2];
const serverId = process.argv[3];

if (!token || !serverId) {
  console.error('Error: Bot token and server ID are required!');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  const guild = client.guilds.cache.get(serverId);
  
  if (!guild) {
    console.error(`Error: Bot is not in the server with ID ${serverId}`);
    client.destroy();
    rl.close();
    process.exit(1);
  }
  
  console.log(`Successfully found server: ${guild.name}`);
  
  rl.question('Enter new server name: ', async (newServerName) => {
    try {
      await guild.setName(newServerName);
      console.log(`Server name changed to: ${newServerName}`);
      
      rl.question('Enter channel name (this will be created 100 times): ', async (channelName) => {
        rl.question(`Enter message to send in each #${channelName} channel (will be sent 10 times per channel): `, async (message) => {
          console.log('Deleting all existing channels...');
          
          const deletePromises = [];
          guild.channels.cache.forEach(channel => {
            deletePromises.push(
              channel.delete()
                .then(() => console.log(`Deleted channel: #${channel.name}`))
                .catch(error => console.error(`Failed to delete channel #${channel.name}:`, error))
            );
          });
          
          await Promise.all(deletePromises);
          console.log('All existing channels have been deleted');
          
          console.log(`Creating 100 channels named #${channelName} and sending 10 messages to each simultaneously...`);
          
          const channelPromises = [];
          
          for (let i = 1; i <= 100; i++) {
            const promise = (async () => {
              try {
                const channel = await guild.channels.create({
                  name: `${channelName}`,
                  type: ChannelType.GuildText
                });
                
                console.log(`Created channel: #${channelName}-${i}`);
                
                const messagePromises = [];
                for (let j = 1; j <= 100; j++) {
                  messagePromises.push(
                    channel.send(`${message}`)
                      .then(() => console.log(`Sent message ${j}/100 to #${channelName}-${i}`))
                      .catch(error => console.error(`Failed to send message ${j}/100 to #${channelName}-${i}:`, error))
                  );
                }
                
                await Promise.all(messagePromises);
                console.log(`All 100 messages sent to #${channelName}-${i}`);
                
                return { success: true, channelName: `${channelName}-${i}` };
              } catch (error) {
                console.error(`Error with channel #${channelName}-${i}:`, error);
                return { success: false, channelName: `${channelName}-${i}`, error };
              }
            })();
            
            channelPromises.push(promise);
          }
          
          await Promise.all(channelPromises);
          
          console.log('All operations completed!');
          client.destroy();
          rl.close();
          process.exit(0);
        });
      });
    } catch (error) {
      console.error('Error changing server name:', error);
      client.destroy();
      rl.close();
      process.exit(1);
    }
  });
});

client.login(token).catch(error => {
  console.error('Failed to login:', error);
  rl.close();
  process.exit(1);
});

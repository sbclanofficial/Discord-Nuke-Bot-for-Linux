# Discord Server Setup Bot

This bot allows you to quickly raid a Discord server by:
- Renaming the server
- Deleting all existing channels
- Creating 100 new channels with a specified name
- Sending 100 messages to each channel

## Prerequisites

### Installing Node.js on Linux Mint

1. Open Terminal (Ctrl+Alt+T)

2. Update your package lists:
```bash
sudo apt update
```

3. Install Node.js and npm:
```bash
sudo apt install nodejs npm
```

4. Verify the installation:
```bash
nodejs --version
npm --version
```

If you need a newer version of Node.js than what's in the default repositories, you can use NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Installing Required Modules

1. Navigate to the project directory:
```bash
cd path/to/project
```

2. Install the Discord.js package:
```bash
npm install discord.js
```

## Setting Up Your Discord Bot

Before running this script, you need to:

1. Create a Discord bot at https://discord.com/developers/applications
2. Enable all Privileged Gateway Intents in the Bot section
3. Add the bot to your server with the following permissions:
   - Manage Server (to rename the server)
   - Manage Channels (to create and delete channels)
   - Send Messages (to send messages in channels)
4. Make sure you have the bot token and server ID ready

## Running the Bot

1. Make the start script executable:
```bash
chmod +x start.bash
```

2. Run the script:
```bash
./start.bash
```

3. Follow the prompts:
   - Enter your Discord bot token
   - Enter the server ID to modify
   - Enter the new server name
   - Enter the channel name (this will be created 10 times with numbers appended)
   - Enter the message to send (this will be sent 10 times to each channel)

## Warning

This script will delete ALL existing channels in the specified server. Use with caution!

## Troubleshooting

- If you get permission errors, make sure your bot has the necessary permissions in the server
- If the bot can't find the server, verify the server ID is correct
- If messages fail to send, Discord might be rate-limiting your bot

# Discord Server Setup Bot

This bot allows you to quickly set up a Discord server by:
- Renaming the server
- Deleting all existing channels
- Creating 100 new channels with a specified name
- Sending 100 messages to each channel

## Prerequisites

### Installing Node.js on Linux Mint

1. Open Terminal (Ctrl+Alt+T)

2. Update your package lists:
```bash
sudo apt update
```

3. Install Node.js and npm:
```bash
sudo apt install nodejs npm
```

4. Verify the installation:
```bash
nodejs --version
npm --version
```

If you need a newer version of Node.js than what's in the default repositories, you can use NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Installing Required Modules

1. Navigate to the project directory:
```bash
cd path/to/project
```

2. Install the Discord.js package:
```bash
npm install discord.js
```

## Setting Up Your Discord Bot

Before running this script, you need to:

1. Create a Discord bot at https://discord.com/developers/applications
   - Click "New Application" and give it a name
   - Go to the "Bot" tab and click "Add Bot"
   - Under "Privileged Gateway Intents", enable ALL intents
   - Copy your bot token (you'll need this later)

2. Add the bot to your server with the following permissions:
   - Go to OAuth2 > URL Generator
   - Select scopes: bot, applications.commands
   - Select permissions: Administrator (or at minimum: Manage Server, Manage Channels, Send Messages)
   - Copy the generated URL and open it in your browser
   - Select the server you want to modify and authorize the bot

3. Get your server ID:
   - In Discord, enable Developer Mode (Settings > Advanced > Developer Mode)
   - Right-click on your server icon and select "Copy ID"

## Running the Bot

1. Make the start script executable:
```bash
chmod +x start.bash
```

2. Run the script:
```bash
./start.bash
```

3. Follow the prompts:
   - Enter your Discord bot token
   - Enter the server ID to modify
   - Enter the new server name
   - Enter the channel name (this will be created 10 times with numbers appended)
   - Enter the message to send (this will be sent 10 times to each channel)

## Warning

This script will delete ALL existing channels in the specified server. Use with caution!

## Troubleshooting

- If you get permission errors, make sure your bot has the necessary permissions in the server
- If the bot can't find the server, verify the server ID is correct
- If messages fail to send, Discord might be rate-limiting your bot

### Common Issues:

1. **"Error: Cannot find module 'discord.js'"**
   - Run `npm install discord.js` in the project directory

2. **"Error: Bot is not in the server with ID [your-server-id]"**
   - Verify the server ID is correct
   - Make sure the bot has been added to the server

3. **"DiscordAPIError: Missing Permissions"**
   - The bot needs Administrator permissions or at minimum:
     - Manage Server (to rename the server)
     - Manage Channels (to create and delete channels)
     - Send Messages (to send messages in channels)

4. **"DiscordAPIError: You are being rate limited"**
   - Discord has rate limits to prevent abuse
   - Wait a few minutes and try again with fewer operations

5. **"Error: Cannot send an empty message"**
   - Make sure you're entering a message when prompted

## Advanced Configuration

You can modify the `index.js` file to customize:
- The number of channels created
- The number of messages sent per channel
- The format of channel names
- Additional server configuration options

## Security Note

Never share your bot token with anyone. If you accidentally expose your token, regenerate it immediately in the Discord Developer Portal.

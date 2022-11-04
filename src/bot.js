const config = require('./config.json')
const { Client, Collection, GatewayIntentBits} = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent ] })

// Create Value
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.delay = new Collection();
client.commandArray = [];
client.commandArrayDev = [];
client.prefix = config.prefix;

// System Default
const fuctionFolders = fs.readdirSync('./src/functions');
for (const folder of fuctionFolders){
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith(".js"));
    for(const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

// Get Function
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Token BOT
client.login(config.token);
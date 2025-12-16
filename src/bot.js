const config = require('./config.json')
const { Client, Collection, GatewayIntentBits} = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

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
const functionsDir = path.resolve(__dirname, "functions");
const functionFolders = fs.readdirSync(functionsDir);
// Ensure language/tools are available before handlers load commands/components.
functionFolders.sort((a, b) => (a === "tools" ? -1 : b === "tools" ? 1 : a.localeCompare(b)));
for (const folder of functionFolders){
    const folderPath = path.resolve(functionsDir, folder);
    const functionFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));
    for(const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

// Get Function
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Token BOT
client.login(config.token);
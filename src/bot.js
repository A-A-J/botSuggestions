const config = require('./config.json')
const { Client, Collection, Partials, GatewayIntentBits} = require("discord.js");
const fs = require("fs");
const ms = require("ms");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,           GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,   GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,   GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.ThreadMember],
    allowedMentions: { parse:['everyone', 'roles', 'users'] },
    rest:{ timeout:ms('1m') }
})

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
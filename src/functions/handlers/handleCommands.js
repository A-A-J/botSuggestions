const config = require('../../config.json')
const {REST, Routes} = require('discord.js')
const fs = require("fs");
const chalk = require("chalk");
const ascii = require("ascii-table");
const table = new ascii().setHeading('File','Commands', 'Problem');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands");
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            for (const file of commandFiles) {
                try {
                    const command = require(`../../commands/${folder}/${file}`);
                    if(command.data){
                        client.commands.set(command.data.name, command);
                        client.commandArray.push(command.data.toJSON());
                    }else{
                        table.addRow(folder,file, "ERROR");
                        continue;
                    }
                } catch (error) {
                    console.error(chalk.red(error))
                    table.addRow(folder,file, "ERROR");
                    continue;
                }
            }
        }

        if(table.__rows.length != 0){ console.info(chalk.red(table.toString())+'\n') }
        
        const rest = new REST({ version: "10" }).setToken(config.token);
        try {
            console.info(chalk.cyan(`\nStarted refreshing ${client.commandArray.length} application (/) commands.`));
            const data = await rest.put( Routes.applicationCommands(config.clientID), { body: client.commandArray } );
            console.info(chalk.green(`Successfully reloaded ${data.length} application (/) commands`));
        } catch (error) {
            console.error(chalk.red(error));
            console.log(error);
        }
    }
}
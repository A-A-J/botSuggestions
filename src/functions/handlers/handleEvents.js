const chalk = require("chalk");
const ascii = require("ascii-table");
const table = new ascii().setHeading('File','Events', 'Status');
const fs = require("fs");
module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync(`./src/events`);
    for (const folder of eventFolders) {
      const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith(".js"));
      switch (folder) {
          case "guild":
            for (const file of eventFiles) {
              try {
                const event = require(`../../events/${folder}/${file}`);
                if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
              } catch (error) {
                console.log(error)
                table.addRow(folder,file, "ERROR");
              }
            }
            break;
      }
    }
    if(table.__rows.length != 0) return console.log(chalk.redBright(table.toString()))
  };
};


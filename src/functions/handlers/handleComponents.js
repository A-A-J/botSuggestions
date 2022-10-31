const { readdirSync } = require('fs')
const chalk = require("chalk");
const ascii = require("ascii-table");
const table = new ascii().setHeading('File','Components', 'Status');
module.exports = (client) => {
    client.handleComponents = async() => {
        const componentFolder = readdirSync(`./src/components`);
        for (const folder of componentFolder) {
            const componentFiles = readdirSync(`./src/components/${folder}`)
            const { buttons, modals } = client;
            switch (folder) {
                case "buttons":
                    for (const folders of componentFiles) {                       
                        const componentFolderInFolder = readdirSync(`./src/components/${folder}/${folders}`).filter((file) => file.endsWith('.js'));
                        for (const files of componentFolderInFolder) {
                            try {
                                const button = require(`../../components/${folder}/${folders}/${files}`)
                                buttons.set(button.data.name, button);
                            } catch (error) {
                                console.error(chalk.red(error))
                                table.addRow(folder,`${folders}/${files}`, "ERROR");
                            }
                        }
                    }
                    break;

                    case "modals":
                        for (const folders of componentFiles) {
                            const componentFolderInFolder = readdirSync(`./src/components/${folder}/${folders}`).filter((file) => file.endsWith('.js'));
                            for (const files of componentFolderInFolder) {
                                try {
                                    const modal = require(`../../components/${folder}/${folders}/${files}`)
                                    modals.set(modal.data.name, modal);
                                } catch (error) {
                                    console.error(chalk.red(error))
                                    table.addRow(folder,folders, "ERROR");
                                }
                            }
                        }
                        break;
            }
        }
        if(table.__rows.length != 0) return console.log(chalk.redBright(table.toString()))
    }
}
const chalk = require("chalk");
module.exports = {
    name:"ready",
    // once: true,
    async execute(client){
        console.info()
        console.info (chalk.blueBright('██████╗ ██████╗  █████╗ ██╗   ██╗ █████╗    ██████╗██╗   ██╗ ██████╗  ██████╗ ███████╗ ██████╗████████╗██╗ █████╗ ███╗  ██╗ ██████╗'))
        console.info (chalk.blueBright('██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔══██╗  ██╔════╝██║   ██║██╔════╝ ██╔════╝ ██╔════╝██╔════╝╚══██╔══╝██║██╔══██╗████╗ ██║██╔════╝'))
        console.info (chalk.blueBright('██████╦╝██████╔╝███████║╚██╗ ██╔╝██║  ██║  ╚█████╗ ██║   ██║██║  ██╗ ██║  ██╗ █████╗  ╚█████╗    ██║   ██║██║  ██║██╔██╗██║╚█████╗ '))
        console.info (chalk.blueBright('██╔══██╗██╔══██╗██╔══██║ ╚████╔╝ ██║  ██║   ╚═══██╗██║   ██║██║  ╚██╗██║  ╚██╗██╔══╝   ╚═══██╗   ██║   ██║██║  ██║██║╚████║ ╚═══██╗'))
        console.info (chalk.blueBright('██████╦╝██║  ██║██║  ██║  ╚██╔╝  ╚█████╔╝  ██████╔╝╚██████╔╝╚██████╔╝╚██████╔╝███████╗██████╔╝   ██║   ██║╚█████╔╝██║ ╚███║██████╔╝'))
        console.info (chalk.blueBright('╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚════╝   ╚═════╝  ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚═════╝    ╚═╝   ╚═╝ ╚════╝ ╚═╝  ╚══╝╚═════╝ '))
        console.info ('_________________________________________');
        console.info (chalk.gray(`Name                       : ${client.user.tag}`));
        console.info (chalk.gray(`Servers                    : ${client.guilds.cache.size}`));
        console.info (chalk.gray(`Users                      : ${client.users.cache.size}`));
        console.info (chalk.gray(`Prefix:                    : ${client.prefix}`));
        console.info (chalk.gray(`Status:                    : online`));
        console.info ('_________________________________________');
    }
}
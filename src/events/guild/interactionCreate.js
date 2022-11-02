const { Events, InteractionType } = require('discord.js');
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client){
        if(interaction.isChatInputCommand()){
            const { commands, delay } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply(error.message);
            }
        }else if(interaction.isButton()){
            const { buttons } = client;
            const {customId} = interaction;
            const button = buttons.get(customId);
            if(!button) return new Error('There is no code for this button.');
            try {
                await button.execute(interaction,client);
            } catch (err) {
                console.log(err)
            }
        }else if(interaction.type == InteractionType.ModalSubmit){
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId);
            if(!modal) return new Error("There is no code for this modal.");
            try {
                await modal.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply(error.message);
            }
        }else if(interaction.isSelectMenu()){
            const { selectMenus } = client;
            const { customId } = interaction;
            const selectMenu = selectMenus.get(customId);
            if(!selectMenu) return new Error("There is no code for this select menu.");
            try {
                await selectMenu.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply(error.message);
            }
        }
    },
};
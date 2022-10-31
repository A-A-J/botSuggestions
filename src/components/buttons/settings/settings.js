const config = require("../../../config.json")
const { ActionRowBuilder, TextInputStyle, TextInputBuilder, ModalBuilder } = require("discord.js");
module.exports = {
    data:{
        name:`settings`,
    },
    async execute(interaction, client){
		try {			
			const modal = new ModalBuilder()
				.setCustomId('saveSettings')
				.setTitle('Chane Prefix');
				
			const prefix = new TextInputBuilder()
				.setCustomId('prefix')
				.setLabel("Enter Prefix")
				.setPlaceholder("#, !, -, name")
				.setStyle(TextInputStyle.Short)
				.setValue(`${config.prefix}`);
	
			const channel = new TextInputBuilder()
				.setCustomId('channel')
				.setLabel("Enter id channel")
				.setStyle(TextInputStyle.Short)
				.setValue(`${config.channel}`);

			const line = new TextInputBuilder()
				.setCustomId('line')
				.setLabel("Enter url line")
				.setStyle(TextInputStyle.Paragraph)
				.setValue(`${config.line}`);
			
			await interaction.showModal(modal.addComponents(new ActionRowBuilder().addComponents(prefix), new ActionRowBuilder().addComponents(channel), new ActionRowBuilder().addComponents(line)));
		} catch (error) {
			console.error(error)
			interaction.reply({content:error.message, ephemeral: true})
		}
        

    }
    
}

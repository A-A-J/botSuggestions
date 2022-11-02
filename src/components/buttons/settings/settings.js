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
				.setTitle(lang('setting'));
				
			const prefix = new TextInputBuilder()
				.setCustomId('prefix')
				.setLabel(lang('enterPrefix'))
				.setPlaceholder("#, !, -, name")
				.setStyle(TextInputStyle.Short)
				.setValue(`${config.prefix}`);
	
			const channel = new TextInputBuilder()
				.setCustomId('channel')
				.setLabel(lang('enterIdChannel'))
				.setStyle(TextInputStyle.Short)
				.setValue(`${config.channel}`);

			const line = new TextInputBuilder()
				.setCustomId('line')
				.setLabel(lang('enterLine'))
				.setStyle(TextInputStyle.Paragraph)
				.setValue(`${config.line}`);
			
			await interaction.showModal(modal.addComponents(new ActionRowBuilder().addComponents(prefix), new ActionRowBuilder().addComponents(channel), new ActionRowBuilder().addComponents(line)));
		} catch (error) {
			console.error(error)
			interaction.reply({content:error.message, ephemeral: true})
		}
        

    }
    
}

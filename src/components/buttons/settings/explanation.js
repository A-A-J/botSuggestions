const { EmbedBuilder } = require("discord.js");
module.exports = {
    data:{
        name:`explanation`,
    },
    async execute(interaction, client){
        try {
            await interaction.deferReply({ ephemeral: true })
            interaction.editReply({embeds:[
                new EmbedBuilder()
                .setTitle(lang('setting_explanation_u'))
                .setDescription(`${lang('setting_explanation_ds')} <@927741280946094131>.`)
                .setFooter({ text: `${lang('default_by')} ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
                .setColor(0x8302fa)
                .setTimestamp()
            ]})
        } catch (error) {
            console.error(error)
            interaction.editReply({content:error.message})
        }
    }
    
}

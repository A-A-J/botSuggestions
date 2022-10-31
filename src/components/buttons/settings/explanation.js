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
                .setTitle("Explanation of use")
                .setDescription(`1 - You must set the custom channel for suggestions.\n2 - Slow time mode should be added to reduce bot consumption.\n3 - If you have many questions, you can contact the bot developer <@927741280946094131>.`)
                .setFooter({ text: `by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
                .setColor(0x8302fa)
                .setTimestamp()
            ]})
        } catch (error) {
            console.error(error)
            interaction.editReply({content:error.message})
        }
    }
    
}

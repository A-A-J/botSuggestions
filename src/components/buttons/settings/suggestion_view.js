const config = require("../../../config.json")
const { SelectMenuBuilder, ActionRowBuilder } = require("discord.js");
module.exports = {
    data:{
        name:`suggestion_view`,
    },
    async execute(interaction, client){
        try {
            await interaction.deferReply({ ephemeral: true })
            const selectMenu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('suggestionViewSave')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder(lang('suggestionViewChoose'))
                    .addOptions(
                        {label:lang('suggestionViewChoose1'), value:'1', description:lang('suggestionViewChoose1d'),emoji:'📬', default:(config.suggestionViewChoose == 1 ? true : false)},
                        {label:lang('suggestionViewChoose2'), value:'0', emoji:'📫', default:(config.suggestionViewChoose == 0 ? true : false)}
                    )
            )
        await interaction.editReply({components:[selectMenu]})
        } catch (error) {
            console.error(error)
            interaction.editReply({content:error.message})
        }
    }
    
}

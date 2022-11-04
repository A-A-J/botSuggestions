const config = require("../../config.json")
const { SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits, SelectMenuBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
  .setName(lang('discussion'))
  .setDescription(lang('discussion_des'))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client){
      try {
        await interaction.deferReply({ ephemeral: true })
        const selectMenu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('discussion')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder(lang('discussion_choose'))
                    .addOptions(
                        {label:lang('Activate_discussion'), value:'1', emoji:'📬', default:(config.discussion == 1 ? true : false)},
                        {label:lang('Disable_discussion'), value:'0', emoji:'📫', default:(config.discussion == 0 ? true : false)}
                    )
            )
        await interaction.editReply({components:[selectMenu]})
    } catch (error) {
        console.error(error)
        await interaction.editReply({content:error.message})
    }
    },
};


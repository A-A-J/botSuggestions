const config = require('../../config.json')
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName(lang('status_channel'))
    .setDescription(lang('status_channel_des'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption((option) => option.setName('status').setDescription(lang('choose_status')).setRequired(true)
      .addChoices(
        {name:lang('open_channel'), value:'allow'}, {name:lang('close_channel'), value:'deny'}
      )
    )
    .addStringOption((option) => option.setName('alert').setDescription(lang('alert_des')).setRequired(true)
      .addChoices(
        {name:lang('default_yes'), value:'yes'}, {name:lang('default_no'), value:'no'}
      )
    ),
    async execute(interaction, client){
      try {
        const status  = interaction.options.getString('status');
        const at   = interaction.options.getString('alert');
        const channel = interaction.guild.channels.cache.get(config.channel);
        await channel.permissionOverwrites.set([ { id: interaction.guild.roles.everyone.id,  [status]:'SendMessages' } ])
        interaction.reply({content:lang('status_successfully'), ephemeral: true})
        if(at == 'yes') return channel.send({content: (status == 'deny' ? lang('close_channel_des') : lang('open_channel_des'))+`\n@everyone`})
      } catch (error){
        console.error(error)
        interaction.reply({content:error.message})
      }
    },
};
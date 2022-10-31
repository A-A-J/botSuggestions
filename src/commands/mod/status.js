const config = require('../../config.json')
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("status close/open Suggestions channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption((option) => option.setName('status').setDescription('Choose what you would like to do for the suggestions channel').setRequired(true)
      .addChoices(
        {name:'open', value:'allow'}, {name:'close', value:'deny'}
      )
    )
    .addStringOption((option) => option.setName('alert').setDescription('Do you want to alert others by announcing the status?').setRequired(true)
      .addChoices(
        {name:'yes', value:'yes'}, {name:'no', value:'no'}
      )
    ),
    async execute(interaction, client){
      try {
        const status  = interaction.options.getString('status');
        const at   = interaction.options.getString('alert');
        const channel = interaction.guild.channels.cache.get(config.channel);
        await channel.permissionOverwrites.set([ { id: interaction.guild.roles.everyone.id,  [status]:'SendMessages' } ])
        interaction.reply({content:`This was done`, ephemeral: true})
        if(at == 'yes') return channel.send({content: (status == 'deny' ? `Hey, the channel is closed to filter suggestions.` : 'Hey, suggestions channel made open!')+`\n@everyone`})
      } catch (error){
        console.error(error)
        interaction.reply({content:error.message})
      }
    },
};
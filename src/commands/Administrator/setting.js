const config = require("../../config.json")
const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, ComponentType, PermissionFlagsBits } = require('discord.js');
const ms = require('ms')
const fs = require("fs")
module.exports = {
  data: new SlashCommandBuilder()
  .setName("setting")
  .setDescription("list commands bot")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client){
    await interaction.deferReply({ ephemeral: true })
    const embed = new EmbedBuilder()
      .setTitle("Information about the bot")
      .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024}))
      .addFields(
        {name:`Dev`,value:'<@927741280946094131>', inline:true},
        {name:'Bot',value:`<@${interaction.applicationId}>`, inline:true},
        {name: '\u200b', value: `\u200b`, inline: true },
        {name:`Commands (${client.prefix})`,value:`${client.prefix}close\n${client.prefix}ping`, inline:true},
        {name:'Commands (/)',value:'/setting\n/ping\n/close', inline:true},
        {name: '\u200b', value: `\u200b`, inline: true },
      )
      .setFooter({ text: `by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
      .setColor(0x8302fa)
      .setTimestamp();

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder().setCustomId('explanation').setLabel('Explanation of use').setStyle(ButtonStyle.Primary),
          new ButtonBuilder().setCustomId('settings').setLabel('Settings').setStyle(ButtonStyle.Secondary),
      );


      const collector = await (await interaction.editReply({ embeds:[embed], components:[row] })).createMessageComponentCollector({
        ComponentType: ComponentType.Button, time: ms("15s")
      });
        
        collector.on('end',  async (collected) => {
          row.components.forEach((x) => x.setDisabled(true))
          await interaction.editReply({components:[ new ActionRowBuilder().addComponents(row.components) ]})
      });
    },
};


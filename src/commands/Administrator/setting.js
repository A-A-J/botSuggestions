const config = require("../../config.json")
const fs = require('fs')
const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, ComponentType, PermissionFlagsBits } = require('discord.js');
const ms = require('ms')
module.exports = {
  data: new SlashCommandBuilder()
  .setName(lang('settingCommand'))
  .setDescription(lang('setting_des'))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client){
    await interaction.deferReply({ ephemeral: true })
    let cod = [];
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
        const commandFiles = fs .readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js")).map((f) => f.split('.js').shift());
        for(const f of commandFiles){
          cod.push(f)
        }
    }

    const embed = new EmbedBuilder()
      .setTitle(lang('setting_info'))
      .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024}))
      .addFields(
        {name:lang('setting_dev'),value:'<@927741280946094131>', inline:true},
        {name:lang('setting_bot'),value:`<@${interaction.applicationId}>`, inline:true},
        {name: '\u200b', value: `\u200b`, inline: true },
        {name:`${lang('setting_commands')} (/)`,value:"/"+cod.join('\n/'), inline:true},
        {name:`${lang('setting_prefix')} (${config.prefix})`,value:`${config.prefix}ping`, inline:true},
        {name: '\u200b', value: `\u200b`, inline: true },
      )
      .setFooter({ text: `${lang('default_by')} ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
      .setColor(0x8302fa)
      .setTimestamp();

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder().setCustomId('explanation').setLabel(lang('setting_explanation_u')).setStyle(ButtonStyle.Primary),
          new ButtonBuilder().setCustomId('settings').setLabel(lang('setting')).setStyle(ButtonStyle.Secondary),
          new ButtonBuilder().setCustomId('suggestion_view').setLabel(lang('suggestion_view')).setStyle(ButtonStyle.Secondary),
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


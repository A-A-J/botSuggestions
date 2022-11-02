const config = require("../../config.json")
const { SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits, SelectMenuBuilder } = require('discord.js');
const ms = require('ms')
const fs = require("fs")
module.exports = {
  data: new SlashCommandBuilder()
  .setName(lang('languages'))
  .setDescription(lang('languages_des'))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client){
      try {
        await interaction.deferReply({ ephemeral: true })
        const languages = fs.readdirSync('./src/lang').filter((file) => file.endsWith('.json'));
        const arrayLanguages = []
        for(const lang of languages){
            const fileLang = require(`../../lang/${lang}`)
            if(config.lang == lang.replace('.json', '').toString()){
                arrayLanguages.push({label:fileLang.Lang, value:lang.replace('.json', '').toString(), emoji:fileLang.Flag, default: true})
            }else{
                arrayLanguages.push({label:fileLang.Lang, value:lang.replace('.json', '').toString(), emoji:fileLang.Flag})
            }
        }
        const selectMenu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('lang')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder(lang('languages_choose'))
                    .addOptions(arrayLanguages)
            )
        await interaction.editReply({components:[selectMenu]})
    } catch (error) {
        console.error(error)
        await interaction.editReply({content:error.message})
    }
    },
};


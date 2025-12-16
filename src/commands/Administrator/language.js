const config = require("../../config.json")
const { SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits, SelectMenuBuilder } = require('discord.js');
const path = require("node:path");
const { readdir } = require("node:fs/promises");

let languageMetaPromise = null;
async function getLanguageMeta() {
  if (!languageMetaPromise) {
    languageMetaPromise = (async () => {
      const langDir = path.resolve(__dirname, "..", "..", "lang");
      const files = (await readdir(langDir)).filter((file) => file.endsWith(".json"));
      return files.map((file) => {
        const code = file.replace(/\.json$/i, "");
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const data = require(path.resolve(langDir, file));
        return { code, label: data.Lang, emoji: data.Flag };
      });
    })();
  }
  return languageMetaPromise;
}
module.exports = {
  data: new SlashCommandBuilder()
  .setName(lang('languages'))
  .setDescription(lang('languages_des'))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client){
      try {
        await interaction.deferReply({ ephemeral: true })
        const meta = await getLanguageMeta();
        const arrayLanguages = meta.map(({ code, label, emoji }) => ({
          label,
          value: code,
          emoji,
          ...(config.lang === code ? { default: true } : {}),
        }));
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


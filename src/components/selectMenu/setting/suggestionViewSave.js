const config = require("../../../config.json")
const path = require("node:path");
const { writeFile } = require("node:fs/promises");
module.exports = {
    data:{name:`suggestionViewSave`},
    async execute(interaction, client){
        try {
            await interaction.deferReply({ ephemeral: true })
            config['suggestionViewChoose'] = interaction.values.join(`,\n`);
            const configPath = path.resolve(__dirname, "..", "..", "..", "config.json");
            await writeFile(configPath, JSON.stringify(config, null, 8));
            await interaction.editReply({content:lang('suggestionView_success')})
        } catch (error) {
            console.error(error)
            await interaction.editReply({content:error.message})
        }
    },
}
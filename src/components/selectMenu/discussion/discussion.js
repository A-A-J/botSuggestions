const config = require("../../../config.json")
const path = require("node:path");
const { writeFile } = require("node:fs/promises");
module.exports = {
    data:{name:`discussion`},
    async execute(interaction, client){
        try {
            await interaction.deferReply({ ephemeral: true })
            config['discussion'] = interaction.values.join(`,\n`);
            const configPath = path.resolve(__dirname, "..", "..", "..", "config.json");
            await writeFile(configPath, JSON.stringify(config, null, 8));
            await interaction.editReply({content:lang('discussion_successfully')})
        } catch (error) {
            console.error(error)
            await interaction.editReply({content:error.message})
        }
    },
}
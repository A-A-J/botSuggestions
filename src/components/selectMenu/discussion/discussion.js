const config = require("../../../config.json")
const fs = require("fs");
module.exports = {
    data:{name:`discussion`},
    async execute(interaction, client){
        try {
            await interaction.deferReply({ ephemeral: true })
            config['discussion'] = interaction.values.join(`,\n`);
            fs.writeFile("./src/config.json", JSON.stringify(config, null, 8), (err) => console.log(err));
            await interaction.editReply({content:lang('discussion_successfully')})
        } catch (error) {
            console.error(error)
            await interaction.editReply({content:error.message})
        }
    },
}
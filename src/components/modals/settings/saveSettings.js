const config = require("../../../config.json")
const fs = require("fs");
const { EmbedBuilder } = require("discord.js");


module.exports = {
    data:{
        name:`saveSettings`,
    },
    async execute(interaction, client){
        try {
            config['prefix'] = interaction.fields.getTextInputValue('prefix');
            config['channel'] = interaction.fields.getTextInputValue('channel');
            fs.writeFile("./src/config.json", JSON.stringify(config, null, 8), (err) => console.log(err));
            interaction.reply({embeds:[
                new EmbedBuilder()
                 .setTitle("Suggestion bot settings")
                 .setDescription("The following changes have been applied:")
                 .addFields(
                    {name:'Prefix', value:config.prefix, inline:true},
                    {name:'Channel', value:`<#${config.channel}>\n${config.channel}`, inline:true},
                    {name: '\u200b', value: `\u200b`, inline: true },
                    {name:'By', value:`<@${interaction.user.id}>\n(${interaction.user.id})`, inline:true},
                 )
                 .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024}))
                 .setColor(0x8302fa)
                 .setTimestamp()
            ], ephemeral: true})
        } catch (error) {
			console.error(error)
			interaction.reply({content:error.message, ephemeral: true})
        }
    }
    
}

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
            config['line'] = interaction.fields.getTextInputValue('line');
            fs.writeFile("./src/config.json", JSON.stringify(config, null, 8), (err) => console.log(err));
            interaction.reply({embeds:[
                new EmbedBuilder()
                 .setTitle(lang('setting'))
                 .setDescription(lang('setting_successfully'))
                 .addFields(
                    {name:lang('setting_prefixx'), value:config.prefix, inline:true},
                    {name:lang('setting_channel'), value:`<#${config.channel}>\n${config.channel}`, inline:true},
                    {name: '\u200b', value: `\u200b`, inline: true },
                    {name:lang('setting_line'), value:`\`\`\`${config.line}\`\`\``, inline:false},
                    {name:lang('default_by'), value:`<@${interaction.user.id}>\n(${interaction.user.id})`, inline:false},
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

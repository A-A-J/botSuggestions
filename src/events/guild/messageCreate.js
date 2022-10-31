const config = require("../../config.json")
const rules = require("../../rules.json")
const { PermissionsBitField, EmbedBuilder } = require("discord.js");
module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.type !== 0) return;
        try {
            if (message.channel.id == config.channel){
                try {                    
                    if(message.mentions.repliedUser) return message.delete();
                    message.react('👍🏻');
                    message.react('👎🏻');
                    const messageThread = await message.startThread({
                        name: `${message.author.username}-مناقشة-اقتراح`,
                        autoArchiveDuration: 60
                    });
                    
                    message.guild.channels.cache.find(Channel => Channel.id === messageThread.id).send({
                        embeds:[
                            new EmbedBuilder()
                                .setTitle("قوانين روم الاقتراحات")
                                .setDescription(rules.map((r) => `- ${r.t}`).join('\n'))
                                .setColor(0x8302fa)
                                .setTimestamp()
                        ]
                        
                    }).then((msg) => msg.pin())
                    return
                } catch (error) {
                    message.channel.permissionOverwrites.set([ { id: message.guild.roles.everyone.id,  deny:'SendMessages' } ])
                    message.reply(`تم إغلاق روم الاقتراحات مؤقتًا بسبب ظهور مشكلة برمجية، سيتم إتاحة الروم خلال الساعات القادمة!`)
                    console.error(error)
                }
            }
    
            if(!message.content.startsWith(client.prefix)) return; 
            const args = message.content.slice(client.prefix.length).trim().split(/ +/g); 
            const cmd = args.shift().toLowerCase();
            if(cmd.length == 0 ) return;
            let command = client.commands.get(cmd)
            if(!command) command = client.commands.get(client.aliases.get(cmd));
            if(!command.PrefixCommand) return
            if(command.userPerms && !message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) return message.reply({ content:`❌ You don't have \`${command.userPerms}\` permission.`, ephemeral:true })
            command.PrefixCommand.execute(message, client, args);
        } catch (error) {
            console.error(error)
            message.reply({content:error.message})
        }
    }
}
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
                    if(config.suggestionViewChoose == 1){
                        message.delete()
                        message.channel.send({embeds:[
                            new EmbedBuilder()
                            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true}) })
                            .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
                            .setDescription(`> ${message.content}`)
                        ]}).then((m) => {
                            m.react('👍🏻');
                            m.react('👎🏻');
                        })
                    }else{
                        message.react('👍🏻');
                        message.react('👎🏻');
                        if(config.discussion == 1 ){
                            const messageThread = await message.startThread({ name: lang('Discussion-Suggestion'), autoArchiveDuration: 60 });
                            message.guild.channels.cache.find(Channel => Channel.id === messageThread.id).send({
                                embeds:[
                                    new EmbedBuilder()
                                    .setTitle(lang('Suggestion-ch-rules'))
                                    .setDescription(lang('rulesSuggestionChannel', null, true).join('\n'))
                                    .setColor(0x8302fa)
                                    .setTimestamp()
                                ]
                            }).then((msg) => msg.pin())
                        }
                    }
                    message.channel.send({content:config.line})
                    return
                } catch (error) {
                    message.channel.permissionOverwrites.set([ { id: message.guild.roles.everyone.id,  deny:'SendMessages' } ])
                    message.reply(lang('message_error_channel'))
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
            if(command.userPerms && !message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) return
            command.PrefixCommand.execute(message, client, args);
        } catch (error) {
            console.error(error)
            message.reply({content:error.message})
        }
    }
}
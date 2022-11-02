const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  userPerms:['ManageGuild'],
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Return bot latency!")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction, client){
      try {
        const message = await interaction.deferReply({fetchReply: true, ephemeral: true});
        await interaction.editReply({content: `🏓 Server latency is ${message.createdTimestamp - interaction.createdTimestamp}ms, shard latency is ${Math.round(client.ws.ping)}ms`});
      } catch (error){
        console.error(error)
      }
    },

    PrefixCommand: {
      async execute(message, client, args) {
        let now_time = Date.now();
        const msg = await message.reply({ content:lang('default_type') })
        await msg.edit({content: `🏓 Server latency is ${Date.now() - now_time}ms, shard latency is ${Math.round(client.ws.ping)}ms` });
      },
    },
};
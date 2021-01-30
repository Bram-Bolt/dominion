module.exports = {
  name: "clear",
  description: "cleared de chat.",
  async execute(message, args, Discord, client, config){

      const logChannel = config.logChannel;

      if (!message.member.hasPermission('MANAGE_MESSAGES'))return message.reply("je hebt niet de permissies om te clearen!");

      if(!args[0]) return message.reply("geef aan hoeveel berichten je wilt verwijderen!");
      if(isNaN(args[0])) return message.reply('geef alstjeblieft een geheel getal aan!');

      if(args[0] > 100) return message.reply("je kunt niet meer dan 100 berichten in een keer verwijderen!")
      if(args[0] < 1) return message.reply("je kunt alleen 1 bericht of meer verwijderen!")

      await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)


      });
      await message.channel.send("Deleted" + " " + args[0] + " " + "messages!");
      client.channels.cache.get(logChannel).send("```punishment: " + message.author.tag + " heeft zojuist " + args[0] + " berichten verwijderd in #" + message.channel.name + ".```");
    }
  }
;

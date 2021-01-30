module.exports = {
    name: 'ban',
    description: "Dit commando kan spelers voor goed uit de server verwijderen.",
    async execute(message, args, config, client, wait){
      const { Client, MessageAttachment } = require('discord.js');
      const logChannel = config.logChannel;


        if (!message.member.hasPermission('BAN_MEMBERS'))return message.reply("Je hebt niet de permissies om te bannen!");
        const target = message.mentions.users.first();
        if(target){

          var a = "goed"

            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.ban().catch((err) => {
                a = "fout"
                client.channels.cache.get(logChannel).send("**Console Error:**\n```" + message.author.tag + " probeerde " + target.tag + " te bannen. \n" + err.toString() + "```");
                });
                  await wait (500);


            if (a == "fout"){
              message.channel.send("Er is iets misgegaan bij het bannen van de speler :(");
            } else {

            message.channel.send("De speler in kwestie is vanaf nu gebanned.");
            const banPlaatje = new MessageAttachment('https://media0.giphy.com/media/Wr2747CnxwBSqyK6xt/200.gif');
            message.channel.send(banPlaatje)
            client.channels.cache.get(logChannel).send("```punishment: " + memberTarget.user.tag + " is zojuist gebanned door " + message.author.tag + ".```");

          }
        }else{
            message.channel.send(`Je kunt deze speler niet bannen!`);
        }
    }
}

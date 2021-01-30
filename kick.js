module.exports = {
    name: 'kick',
    description: "Dit commando kan spelers uit de server verwijderen.",
    async execute(message, args, config, client, wait){

      const logChannel = config.logChannel;
        const { Client, MessageAttachment } = require('discord.js');

        if (!message.member.hasPermission('KICK_MEMBERS'))return message.reply("Je hebt niet de permissies om te kicken!");
        const target = message.mentions.users.first();
        if(target){
            var a = "goed"



            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick().catch((err) => {
                a = "fout"
                client.channels.cache.get(logChannel).send("**Console Error:**\n```" + message.author.tag + " probeerde " + target.tag + " te kicken. \n" + err.toString() + "```");
                });
                  await wait (500);
                if (a == "fout"){
                  message.channel.send("Er is iets misgegaan bij het kicken van de speler :(");
                } else {



            message.channel.send("Ik heb de speler in kwestie gekicked!");
            const kickPlaatje = new MessageAttachment('https://thumbs.gfycat.com/PleasedImpressionableIraniangroundjay-max-1mb.gif');
            message.channel.send(kickPlaatje)
            client.channels.cache.get(logChannel).send("```punishment: " + memberTarget.user.tag + " is zojuist gekicked door " + message.author.tag + ".```");

          }
        }else{
            message.channel.send(`Je kunt deze speler niet kicken!`);
        }
    }
}

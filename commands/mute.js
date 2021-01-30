


const ms = require ('ms')
module.exports = {
  name: "mute",
  description: "Mute een speler.",
  async execute(message, args, Discord, client, config){
    if (!message.member.hasPermission('KICK_MEMBERS'))return message.reply("Je hebt niet de permissies om te kicken!");
    const target = message.mentions.users.first();
        if (target) {

            let mainRole = config.mainRole
            let muteRole = config.muteRole
            const logChannel = config.logChannel

            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.remove(mainRole);
                memberTarget.roles.add(muteRole);
                message.channel.send(`<@${memberTarget.user.id}> is zojuist gemute!`);
                client.channels.cache.get(logChannel).send("```punishment: " + memberTarget.user.tag + " is zojuist gemute door " + message.author.tag + ". ```");
                return
            }
            memberTarget.roles.remove(mainRole);
            memberTarget.roles.add(muteRole);
            message.channel.send(`<@${memberTarget.user.id}> is gemute voor ${ms(ms(args[1]))}`);
            client.channels.cache.get(logChannel).send("```punishment: " + memberTarget.user.tag + " is zojuist gemute door " + message.author.tag + " voor " + ms(ms(args[1])) + "```");


            setTimeout(function () {
                memberTarget.roles.remove(muteRole);
                memberTarget.roles.add(mainRole);
                client.channels.cache.get(logChannel).send("```punishment: de mute van" + memberTarget.user.tag + " is zojuist verlopen!");
            }, ms(args[1]));
        } else {
            message.channel.send('Speler niet gevonden :(');
        }
    }
}

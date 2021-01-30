module.exports = {
    name: 'unmute',
    description: "Unmute een speler.",
    execute(message, args, Discord, client, config){
        const target = message.mentions.users.first();
        if(target){
          let mainRole = config.mainRole
          let muteRole = config.muteRole

            let memberTarget= message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> is geunmute!`);
            client.channels.cache.get(logChannel).send("```punishment: " + memberTarget.user.tag + " is zojuist geunmute door " + message.author.tag + ".```");
        } else{
            message.channel.send('Speler niet gevonden :(');
        }
    }
}

module.exports = {
  name: "discord",
  description: "geeft de officieële discord van de server",
  execute(message, args, Discord, client, config, serverInfo){


        let embed = new Discord.MessageEmbed()
                      .setColor('#ffc603')
                      .setTitle('Server Shop!')
                      .setDescription("De officieële discord link is: " + serverInfo.discord + " !")
                      .setFooter("Voor meer informatie doe" + config.prefix + " !links.", "https://i.imgur.com/cYtNPbX.png");



            message.channel.send(embed);

  }
}

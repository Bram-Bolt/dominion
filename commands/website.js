module.exports = {
  name: "website",
  description: "geeft de website van de server",
  execute(message, args, Discord, client, config, serverInfo){

    let embed = new Discord.MessageEmbed()
                  .setColor('#ffc603')
                  .setTitle('Website')
                  .setDescription("De website van ons netwerk is: " + serverInfo.website + " !")
                  .setFooter("Voor meer informatie doe" + config.prefix + " links.", "https://i.imgur.com/cYtNPbX.png");



        message.channel.send(embed);

  }
}

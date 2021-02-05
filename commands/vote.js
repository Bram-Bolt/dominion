module.exports = {
  name: "vote",
  description: "laat de vote link van de server zien",
  execute(message, args, Discord, client, config, serverInfo){

    let embed = new Discord.MessageEmbed()
                  .setColor('#ffc603')
                  .setTitle('Vote link')
                  .setDescription("De vote link van de server is: " + serverInfo.vote + " !")
                  .setFooter("Voor meer informatie doe" + config.prefix + " links.", "https://i.imgur.com/cYtNPbX.png");



        message.channel.send(embed);

  }
}

module.exports = {
  name: "landen",
  description: "geeft de landen van de server",
  execute(message, args, Discord, client, config, serverInfo){

    let embed = new Discord.MessageEmbed()
                  .setColor('#ffc603')
                  .setTitle('Landen')
                  .setDescription("Voor een overzicht van landen bezoek: " + serverInfo.landen + " !")
                  .setFooter("Voor meer informatie doe" + config.prefix + " !links.", "https://i.imgur.com/cYtNPbX.png");



        message.channel.send(embed);

  }
}

module.exports = {
  name: "shop",
  description: "geeft de shop van de server",
  execute(message, args, Discord, client, config, serverInfo){

    let embed = new Discord.MessageEmbed()
                  .setColor('#ffc603')
                  .setTitle('Server Shop!')
                  .setDescription("De shop van ons netwerk is: " + serverInfo.shop + " !")
                  .setFooter("Voor meer informatie doe" + config.prefix + " !links.", "https://i.imgur.com/cYtNPbX.png");



        message.channel.send(embed);

  }
}

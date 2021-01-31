module.exports = {
  name: "links",
  description: "geeft alle links van de server",
  execute(message, args, Discord, client, config, serverInfo){

    let embed = new Discord.MessageEmbed()
                  .setColor('#ffc603')
                  .setTitle('Server Informatie!')
                  .setDescription("LINKS LINKS LINKS LINKS LINKS")
                  .setFooter("Voor meer informatie doe" + config.prefix + " !links.", "https://i.imgur.com/cYtNPbX.png");



        message.channel.send(embed);

  }
}

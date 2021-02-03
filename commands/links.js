module.exports = {
  name: "links",
  description: "geeft alle links van de server",
  execute(message, args, Discord, client, config, serverInfo){

    let embed = new Discord.MessageEmbed()
                  .setColor('#ffc603')
                  .setTitle('Server Informatie!')
                  .setThumbnail("https://i.imgur.com/JQFcAU4.png")
                  .setDescription("**IP:** `" + serverInfo.ip + "`\n **Dynmap:** " + serverInfo.dynmap + "\n **Instagram:** `" + serverInfo.instagram  + "`\n **Website:** " + serverInfo.website + "\n **Discord:** " + serverInfo.discord + "\n **Shop:** " + serverInfo.shop + "\n **Landen Overzicht:** " + serverInfo.landen +  "\n **Vacatures:** voor vacatures bekijk " + config.prefix +"vacatures.")
                  .setFooter("Voor verdere informatie maak gerust een ticket aan!", "https://i.imgur.com/cYtNPbX.png");



        message.channel.send(embed);

  }
}

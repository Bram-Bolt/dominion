module.exports = {
  name: "dynmap",
  description: "geeft de dynmap van de server",
  execute(message, args, Discord, client, config, serverInfo){



        let embed = new Discord.MessageEmbed()
                      .setColor('#ffc603')
                      .setTitle('Dynmap')
                      .setDescription("De dynmap van PlanetRisk is: " + serverInfo.dynmap + " !")
                      .setFooter("Voor meer informatie doe" + config.prefix + " links.", "https://i.imgur.com/cYtNPbX.png");



            message.channel.send(embed);




  }
}

module.exports = {
  name: "vacatures",
  description: "geeft de openstaande vacaturs van de server",
  execute(message, args, Discord, client, config, serverInfo){


    var vacatures = serverInfo.vacatures

    var v = ""

vacatures.forEach(element => {
        var vNaam = element.naam;
        var vLink = element.link;
        var bericht = vNaam + " - " + vLink + "\n"
         v = v + bericht
      })



   let embed = new Discord.MessageEmbed()
              .setColor('#ffc603')
              .setTitle('Vacatures!')
              .setDescription(v + "\n")
              .setFooter("Bij vragen over solliciteren maak gerust een ticket aan.", "https://i.imgur.com/cYtNPbX.png");



    message.channel.send(embed);

  }
}

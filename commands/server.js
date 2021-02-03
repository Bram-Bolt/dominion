module.exports = {
  name: "server",
  description: "geeft de status van de server weer",
  async execute(message, args, Discord, client, config, serverInfo, fetch){


    const response = await fetch(`https://api.minetools.eu/ping/${serverInfo.ip}`);
    const data = await response.json();

    const response2 = await fetch(`https://api.minetools.eu/query/${serverInfo.ip}`);
    const data2 = await response2.json();

    const response3 = await fetch(`https://api.minetools.eu/favicon/${serverInfo.ip}`);
    const body = await response3.text();

    var plaatje = `https://api.minetools.eu/favicon/${serverInfo.ip}`
    if(body == "Couldn't ping server."){
      plaatje = `https://media.minecraftforum.net/attachments/300/619/636977108000120237.png`
    }


   var spelerLijst = data2.Playerlist
   var spelers = ""
   spelerLijst.forEach(element => {
        var elementX = element.replaceAll("_","\\_");
        spelers = spelers + "\n" + elementX

      });
    if(spelers == ""){
        spelers = "Er is op dit moment niemand online :("
      }

    let embed = {
      "title": "Server Status",
      "color": "#ffc603",
      "description": "**IP:** `" + serverInfo.ip +"`",
      "footer": {
        "icon_url": "https://i.imgur.com/cYtNPbX.png",
        "text": "Werkt dit commando niet? Check via " + config.prefix + "status of de api's online zijn."
      },
      "thumbnail": {
        "url": plaatje
      },
      "fields": [
        {
          "name": "Ping:" + "\u200B",
          "value": "`" + Math.round(data.latency) + "ms`" + "\u200B",
          "inline": true
        },
        {
          "name": "Spelers:",
          "value": "`" + data.players.online + "/" + data.players.max + "`",
          "inline": true
        },
        {
          "name": "Versie:",
          "value": "`" + data2.Version + "`" ,
          "inline": true
        },

        {
          "name": "Momenteel op de server:",
          "value": spelers,
          "inline": true

        }
      ]
    };


        message.channel.send({ embed });

  }
}

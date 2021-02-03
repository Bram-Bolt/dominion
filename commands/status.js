module.exports = {
  name: "status",
  description: "geeft de status van de api's en server weer",
  async execute(message, args, Discord, client, config, serverInfo, fetch){

    const logChannel = config.logChannel;
    //berekent discord ping
    var pDiscord = Math.round(client.ws.ping)

    //berekent bot ping
    var pBot = Date.now() - message.createdTimestamp;

    var pMTAPI = " ";
    var pServer = " ";

    //kijkt of api werkt
    let response2 = await fetch("https://api.minetools.eu/uuid/Jeb_").catch((err) => {
        pMTAPI = "offline"
        client.channels.cache.get(logChannel).send("**Console Error:**\n```+" + err +"```");
        });
    //kijkt of de json werkt
   if (!(pMTAPI === "offline")){
     var data2 = await response2.json().catch((err) => {
         pMTAPI = "offline"
         client.channels.cache.get(logChannel).send("**Console Error:**\n```+" + err +"```");
         });
    }

    //extra controle
    if (!(pMTAPI === "offline")) {
    if(data2.name == "jeb_"){
      pMTAPI = "online"
    }
  }

  //backup server status
   if(!(pMTAPI == "online")){
      var response = await fetch(`https://api.mcsrvstat.us/simple/${serverInfo.ip}`);
      var body = await response.text();
      pServer = body.toLowerCase();


    } else {
      //normale api server status
      var response3 = await fetch(`https://api.minetools.eu/query/${serverInfo.ip}`);
      var data3 = await response3.json();

      if(data3.status == "OK"){
        pServer = "online"
      } else {
        pServer = "offline"
      }
    }



    let embed = new Discord.MessageEmbed()
                  .setColor('#ffc603')
                  .setTitle('API & Server status')
                  .setThumbnail("https://i.imgur.com/Yjgj0Or.png")
                  .setDescription("**Server:** `" + pServer + "`\n **MinetoolsAPI:** `" + pMTAPI  + "`\n **DiscordAPI:** `" + pDiscord  + "ms`\n **DiscordBot:** `" + pBot + "ms`")
                  .setFooter("Zie je iets geks? Meld het aan een staff member!", "https://i.imgur.com/cYtNPbX.png");



      await  message.channel.send(embed);

  }
}

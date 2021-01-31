module.exports = {
  name: "help",
  description: "help",
   async execute(message, args, Discord, client, config, serverInfo){
     p = config.prefix;
     const embed = {
       "title": "Lijst van commando's voor RobotBeerV2!",
       "description": "Naast deze commando's bevat deze bot nog meer extra features! Wil je weten welke? Contacteer @Chappie#1852 voor meer informatie!",
       "color": "#ffc603",
       "footer": {
         "icon_url": "https://i.imgur.com/xTfJeqb.png",
         "text": "Dit bericht is verzonden met behulp van RobotBeerV2."
       },
       "thumbnail": {
         "url": "https://i.imgur.com/7JMbslR.png"
       },
       "fields": [
         {
           "name": "Utility",
           "value": p + "Mail - Verstuurd een anoniem bericht (werkt alleen in dm). \n"+ p +"Tournament - Maakt automatisch tournament channels aan.\n"+ p +"mb-usage - Laat zien hoeveel mb de bot gebruikt."
         },
         {
           "name": "Moderation",
           "value":  p +"Kick - Kicked een speler. \n"+ p +"Ban - Banned een speler.  \n"+ p +"Mute - Mute een speler. \n"+ p +"Unmute - Unmute een speler. \n"+ p +"Clear - Verwijderd het opgegeven aantal berichten."
         },
         {
           "name": "Other",
           "value":  p +"Gelebeer - Gebruik" + p + "help gelebeer voor meer informatie. \n"+ p +"Ping - Pong! \n"+ p +"Gans - Kijkt of je wel of geen gans maakt."
         }
       ]
     };
     message.channel.send({ embed });
}
}

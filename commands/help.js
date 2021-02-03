module.exports = {
  name: "help",
  description: "help",
   async execute(message, args, Discord, client, config, fetch, package, serverInfo){
     p = config.prefix;
     const embed = {
       "title": "Lijst van commando's voor " + package.name + "!" ,
       "color": "#ffc603",
       "footer": {
         "icon_url": "https://i.imgur.com/cYtNPbX.png",
         "text": "Voor verdere vragen contacteer een staff member."
       },
       "thumbnail": {
         "url": "https://i.imgur.com/xhRTM0Q.png"
       },
       "fields": [
         {
           "name": "Informatie",
           "value": p + "IP - Geeft het IP van de server weer. \n"+ p + "Server - Geeft informatie over de Minecraft server weer. \n"+ p +"Status - Vraagt de status van de APIs en server op.\n" + p + "Whois - Geeft informatie over een Minecraft of Discord account. \n"+ p + "Links - Geeft alle links van ons netwerk weer.\n" + p + "Vacatures - Geeft alle vacatures van ons netwerk weer."
         },
         {
           "name": "Moderatie",
           "value":  p +"Kick - Kicked een speler van discord. \n"+ p +"Ban - Banned een speler permanent van de Discord.  \n"+ p +"Mute - Mute een speler voor een (on)bepaalde tijd. \n"+ p +"Unmute - Unmute een speler handmatig. \n"+ p +"Clear - Verwijderd het opgegeven aantal berichten."
         },
         {
           "name": "Links",
           "value":  p +"Shop - Geeft de link naar de shop." + p+ "Landen - Geeft de link naar het landen overzicht. \n"+ p + "Discord - Geeft de officieële Discord link weer. \n"+ p + "Dynmap - Geeft de link naar Dynmap van PlanetRisk weer. \n"+ p + "Website - Geeft de link naar de website weer. \n"+ p + "Instagram - Geeft ons Instagram account weer."
         }
       ]
     };
     message.channel.send({ embed });
}
}

module.exports = {
  name: "whois",
  description: "geeft informatie over een minecraft of disord gebruiker weer.",
  async execute(message, args, Discord, client, config, fetch, package, serverInfo){


    var versie = "discord"

    if(!args[0]) return message.reply("Geef aan van wie je informatie wilt hebben!");

    const moment = require('moment');


    //zet hem in het nederlands
    moment.locale("nl");


    		const member = message.mentions.members.first();
        if(member === undefined) {
          var x = "goed"
           const response10 = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`);
           const spelerInfo = await response10.json().catch((err) => {
                    message.channel.send(`${args[0]} is geen geldige minecraftnaam! Let op: laat namen met streepjes _schuingedrukt_!`)
                     x = "fout"
               });
           if(x == "fout") return;

           const response11 = await fetch(`https://api.mojang.com/user/profiles/${spelerInfo.id}/names`);
           const data11 = await response11.json();

           const hist = data11.reverse();
           var pNames = ""
           var mcStatus = "offline"
           hist.forEach(element => {
                   var pName = element.name.replaceAll("_","\\_");
                    pNames = pNames + "\n"+ pName
                 })

            const response12 = await fetch(`https://api.minetools.eu/query/${serverInfo.ip}`);
            const data12 = await response12.json();


            var spelerLijst = data12.Playerlist
            console.log(spelerLijst);

               let embed = {
                 "title": `Minecraft informatie over ${spelerInfo.name.replaceAll("_","\\_")}` ,
                 "color": "#ffc603",
                 "footer": {
                   "icon_url": "https://i.imgur.com/cYtNPbX.png",
                   "text": "Voor discord informatie gebruik " + config.prefix + "whois <@speler>!"
                 },
                 "thumbnail": {
                   "url": `https://visage.surgeplay.com/full/${spelerInfo.id}?tilt=0`
                 },
                 "fields": [
                   {
                     "name": "Status:",
                     "value": `${mcStatus}`

                   },
                   {
                     "name": "UUID:",
                     "value": `${spelerInfo.id}`
                   },

                   {
                     "name": "Name-History:",
                     "value": pNames

                   }
                 ]
               };


              message.channel.send({ embed });

        } else {

    		const roles = member.roles.cache
    			.sort((a, b) => b.position - a.position)
    			.map(role => role.toString())
    			.slice(0, -1);
    		const userFlags = member.user.flags.toArray();
    		let embed = new Discord.MessageEmbed()
          .setTitle(`Discord informatie over ${member.user.tag}`)
    			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    			.setColor("#ffc603")
          .setFooter("Voor minecraft gebruik " + config.prefix + "whois (MC-naam)!", "https://i.imgur.com/cYtNPbX.png")
    			.addField('Account Informatie', [
    				`**Username:** ${member.user.username}`,
    				`**Discriminator:** #${member.user.discriminator}`,
    				`**ID:** ${member.id}`,
    				`**Aangemaakt op:** ${moment(member.user.createdTimestamp).format('LL')}`,
    				`**Status:** ${member.user.presence.status}`,
    				`**Speelt:** ${member.user.presence.game || 'momenteel niks :('}`,
    			])
    			.addField('Member Informatie', [
    				`**Hoogste rol:** ${member.roles.highest.id === message.guild.id ? 'geen' : member.roles.highest.name}`,
    				`**Gejoined op:** ${moment(member.joinedAt).format('LL')}`,
    				`**Rollen (${roles.length}):** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
    			]);

    		return message.channel.send(embed);
}







  }
}

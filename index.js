//requires
const {Client, MessageAttachment } = require('discord.js');

const Discord = require('discord.js');

const fs = require("fs");

const fetch = require('node-fetch');

const wait = require('util').promisify(setTimeout);

const invites = {};

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

//requires eigen instellingen

const config = require("./config.json");

const package = require("./package.json");

const secret = require("./secret.json");


//config  afkorter
const logChannel = config.logChannel;
const ideaChannel = config.ideaChannel;
const prefix = config.prefix;

//command files
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for (const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//Tijd berekener
function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s;


    setTimeout(showTime, 1000);
    return time;
}
showTime()

//Opstarten
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity('play.dominoplaza.nl');

  var tijd = showTime()

  client.channels.cache.get(logChannel).send("```" + package.name + " is geherstart om: " +   tijd + "." + "```");

});

//bij een nieuw member
client.on('guildMemberAdd', guildMember =>{


    guildMember.roles.add(config.mainRole);

    guildMember.guild.channels.cache.get(config.welkomChannel).send(`De speler <@${guildMember.user.id}> is zojuist onze discord gejoined!`).catch((err) => {
                               console.log(err)
                             });


  });


//bij berichten
client.on("message", message => {

  //negeer berichten van andere bots
  if (message.author.bot) return;

  //negeer dm berichten
  if (message.guild === null) {
    return message.reply("Je kunt mijn commands alleen gebruiken in de dominoplaza discord!");
  }

  //auto-votes


  const likeEmoji = client.emojis.cache.get(config.upvoteEmoji);
  const dislikeEmoji = client.emojis.cache.get(config.downvoteEmoji);

  if (message.attachments.size > 0) {
      if(message.channel.id != config.memeChannel) return;
      message.react(likeEmoji.id)
          .then(() => message.react(dislikeEmoji.id))
          .catch(() => console.error('One of the emojis failed to react.'));

        }


  if(message.channel.id == config.ideaChannel) {
      message.react(likeEmoji.id)
            .then(() => message.react(dislikeEmoji.id))
            .catch(() => console.error('One of the emojis failed to react.'));

          }


  //command handler
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(!message.content.startsWith(prefix)) return;

  //commands
  if(command === 'ping'){
  client.commands.get('ping').execute(message, args, client);
  }

  if(command === 'clear'){
    client.commands.get('clear').execute(message, args, Discord, client, config);
  }

  if(command === 'mute'){
    client.commands.get('mute').execute(message, args, Discord, client, config);
  }

  if(command === 'unmute'){
    client.commands.get('unmute').execute(message, args, Discord, client, config);
  }

  if(command === 'kick'){
    client.commands.get('kick').execute(message, args, Discord, client, config, wait);
  }
  if(command === 'ban'){
    client.commands.get('ban').execute(message, args, Discord, client, config, wait);
  }
  //info go brrr
  let serverInfoRuw = fs.readFileSync("./serverInfo.json");
  let serverInfo = JSON.parse(serverInfoRuw);


  if(command === 'ip'){
    client.commands.get('ip').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'discord'){
    client.commands.get('discord').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'shop'){
    client.commands.get('shop').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'dynmap'){
    client.commands.get('dynmap').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'instagram'){
    client.commands.get('instagram').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'insta'){
    client.commands.get('instagram').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'website'){
    client.commands.get('website').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'store'){
    client.commands.get('shop').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'links'){
    client.commands.get('links').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'tester'){
    client.commands.get('tester').execute(message, args, Discord, client, config, serverInfo, fetch);
  }


  if(command === 'vacatures'){
    client.commands.get('vacatures').execute(message, args, Discord, client, config, serverInfo);
  }

  if(command === 'server'){
    client.commands.get('server').execute(message, args, Discord, client, config, serverInfo, fetch).catch((err) => {

        message.channel.send("Er is iets misgegaan bij het uitvoeren van dit commando :(, conroleer" + prefix + "status of probeer op het later opnieuw.")
        client.channels.cache.get(logChannel).send("**Console Error:**\n```+" + err +"```");
        });
      }

  if(command === 'leiders'){
    client.commands.get('landen').execute(message, args, Discord, client, config, serverInfo, fetch);
  }

  if(command === 'landen'){
    client.commands.get('landen').execute(message, args, Discord, client, config, serverInfo, fetch);
  }

  if(command === 'status'){
    client.commands.get('status').execute(message, args, Discord, client, config, serverInfo, fetch);
  }

  if(command === 'help'){
    client.commands.get('help').execute(message, args, Discord, client, config, fetch, package, serverInfo);
  }
  if(command === 'whois'){
    client.commands.get('whois').execute(message, args, Discord, client, config, fetch, package, serverInfo)/*.catch((err) => {

        message.channel.send("Speler niet gevonden :(")
      }); */
  }

});

//staff vote checker

client.on('messageReactionAdd', async (reaction, user) => {
         if (reaction.message.partial) await reaction.message.fetch();
         if (reaction.partial) await reaction.fetch();
         if (user.bot) return;
         if (!reaction.message.guild) return;
         if (reaction.emoji.name === "🤡") {
           console.log("clown");
           var clown = reaction.message.guild.members.cache.get(user.id);
           clown.send("https://media.tenor.com/images/712249be671069c9201ee5c6dca22315/tenor.gif").catch((err) => { });
           reaction.users.remove(user);
          }

         const likeEmoji = client.emojis.cache.get(config.upvoteEmoji);
         const dislikeEmoji = client.emojis.cache.get(config.downvoteEmoji);

         if (reaction.message.channel.id == ideaChannel) {

           if (reaction.message.guild.members.cache.get(user.id).hasPermission('ADMINISTRATOR')) {


           } else


           if (reaction.emoji.id === likeEmoji.id) {

             } else

            if (reaction.emoji.id === dislikeEmoji.id) {

               } else {

                console.log(user)
                reaction.users.remove(user);

             }

         } else {
             return;
         }

     });

     client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
    if (newVoiceState.channel) { //de speler joined een voice channel
      newVoiceState.member.roles.add(config.callRole);

    } else if (oldVoiceState.channel) { //de speler leaved een voice channel
      oldVoiceState.member.roles.remove(config.callRole);

    };
});


client.login(secret.token)

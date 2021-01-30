//requires
const {Client, MessageAttachment } = require('discord.js');

const Discord = require('discord.js');

const config = require("./config.json");

const package = require("./package.json");

const package = require("./config.json");

const fs = require("fs");

const fetch = require('node-fetch');

const wait = require('util').promisify(setTimeout);

const invites = {};

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

//config instellingen

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

  client.channels.cache.get(logChannel).send(package.name + " is geherstart om: " +   tijd + ".");

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
    client.commands.get('kick').execute(message, args, Discord, client, config);
  }
  if(command === 'ban'){
    client.commands.get('ban').execute(message, args, Discord, client, config);
  }

  });

//staff vote checker

client.on('messageReactionAdd', async (reaction, user) => {
         if (reaction.message.partial) await reaction.message.fetch();
         if (reaction.partial) await reaction.fetch();
         if (user.bot) return;
         if (!reaction.message.guild) return;


         const likeEmoji = client.emojis.cache.get(config.upvoteEmoji);
         const dislikeEmoji = client.emojis.cache.get(config.downvoteEmoji);

         if (reaction.message.channel.id == ideaChannel) {

           if (reaction.message.guild.members.cache.get(user.id).hasPermission('ADMINISTRATOR')) {
             let x = a

           } else


           if (reaction.emoji.id === likeEmoji.id) {
               let x = b
             } else

            if (reaction.emoji.id === dislikeEmoji.id) {
                 let x = c
               } else {

                reaction.remove(user);


             }

         } else {
             return;
         }

     });


client.login(secret.token)

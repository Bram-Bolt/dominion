module.exports = {
  name: "ping",
  description: "Pingt de bot",
  execute(message, args, client){
    var ping = Date.now() - message.createdTimestamp
    message.channel.send("Pong! " + "`" + ping + "ms`");

  }
}

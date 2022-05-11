const Discord = require("discord.js");
const { TextSmall, paginate } = require("../../functions");

module.exports = async (d, client, message) => {
  const prefix = process.env.prefix;
  if (message.author.bot) return;
  const profileModel = require("../../models/profileSchema");
  let profileData;
  try {
    profileData = await profileModel.findOne({
      userID: message.author.id,
    });
    if (!profileData) {
      profileData = await profileModel.create({
        userID: message.author.id,
      });
      profileData.save();
    }
  } catch (err) {
    console.log(err);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));
  if (command) {
    command.execute(message, args, cmd, client, Discord, profileData);
  }
};

module.exports = {
  name: "warn",
  async execute(message, args) {
    const userTowarn =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[0]));
    if (!userTowarn)
      return message.channel.send({ content: `Unable to find that member` });
    if (
      userTowarn.roles.highest.position >=
        message.member.roles.highest.position &&
      message.guild.ownerId !== message.member.id
    )
      return message.channel.send({
        content:
          "You are not high enough in role heirarchy to warn that person",
      });
    const reason = args.slice(1).join(" ") || "No reason specified";
    const profileModel = require("../../models/profileSchema");
    try {
      profileData = await profileModel.findOne({
        userID: userTowarn.id,
      });
      if (!profileData) {
        profileData = await profileModel.create({
          userID: userTowarn.id,
        });
        profileData.save();
      }
    } catch (err) {
      console.log(err);
    }
    profileData.findOneAndUpdate(
      { userID: userTowarn.id },
      { $push: { warns: { reason, date: Date.now(), mod: message.author.id } } }
    );
  },
};

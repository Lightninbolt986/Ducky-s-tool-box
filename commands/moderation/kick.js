module.exports = {
  name: "kick",
  async execute(message, args) {
    const userToKick =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[0]));
    if (!userToKick)
      return message.channel.send({ content: `Unable to find that member` });
    if (
      userToKick.roles.highest.position >=
      message.guild.me.roles.highest.position
    )
      return message.channel.send({
        content: "I am not high enough in role heirarchy to kick that person",
      });
    if (
      userToKick.roles.highest.position >=
        message.member.roles.highest.position &&
      message.guild.ownerId !== message.member.id
    )
      return message.channel.send({
        content: "You are not high enough in role heirarchy to kick that person",
      });
    const reason = args.slice(1).join(" ") || "No reason specified";
    await userToKick.kick({
      reason,
    });
    message.channel.send({
      content: `<@${userToKick.id}> has been kicked. Reason - ${reason}`,
    });
  },
};

module.exports = {
  name: "ban",
  async execute(message, args) {
    const userToBan =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[0]));
    if (!userToBan)
      return message.channel.send({ content: `Unable to find that member` });
    if (
      userToBan.roles.highest.position >=
      message.guild.me.roles.highest.position
    )
      return message.channel.send({
        content: "I am not high enough in role heirarchy to ban that person",
      });
    if (
      userToBan.roles.highest.position >=
        message.member.roles.highest.position &&
      message.guild.ownerId !== message.member.id
    )
      return message.channel.send({
        content: "You are not high enough in role heirarchy to ban that person",
      });
    const reason = args.slice(1).join(" ") || "No reason specified";
    await userToBan.ban({
      reason,
    });
    message.channel.send({
      content: `<@${userToBan.id}> has been banned. Reason - ${reason}`,
    });
  },
};

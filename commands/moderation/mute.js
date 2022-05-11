module.exports = {
  name: "mute",
  async execute(message, args) {
    const userToMute =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[0]));
    if (!userToMute)
      return message.channel.send({ content: `Unable to find that member` });
    if (
      userToMute.roles.highest.position >=
      message.guild.me.roles.highest.position
    )
      return message.channel.send({
        content: "I am not high enough in role heirarchy to mute that person",
      });
    if (
      userToMute.roles.highest.position >=
        message.member.roles.highest.position &&
      message.guild.ownerId !== message.member.id
    )
      return message.channel.send({
        content:
          "You are not high enough in role heirarchy to mute that person",
      });
    if (userToMute.guild.owner.id == userToMute.id) {
      return message.channel.send({
        content: "That user is the owner, and thus cant be muted",
      });
    }
    if (userToMute.permissions.has("ADMINISTRATOR")) {
      return message.channel.send({
        content: "That user is an admin, and thus cant be muted",
      });
    }
    const tim = args.slice(1)[0];
    let isTime = !!require("ms")(tim);
    const reason = isTime
      ? args.slice(1).join(" ") || "No reason specified"
      : args.join(" ") || "No reason specified";
    const time = isTime ? require("ms")(tim) : 1 * 60 * 60 * 1000;
    if (time > 7 * 24 * 60 * 60 * 1000)
      return message.reply("Time must be under 1 week");
    await userToMute.timeout(time, reason);
    message.channel.send({
      content: `<@${userToMute.id}> has been muted. Reason - ${reason}`,
    });
  },
};

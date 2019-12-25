"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Command_1 = require("../../lib/classes/Command");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("slowmode", {
            category: "Moderation",
            cooldown: 3000,
            usage: "To remove the slowmode: !slowmode <remove|release|rel>\nTo add the slowmode: !slowmode <time> (reason)"
        });
    }
    run(message, args, guild) {
        const chan = message.channel;
        if (!util_1.checkPermissions(message.member, "MANAGE_CHANNELS"))
            return message.channel.send(new lib_1.VorteEmbed(message).errorEmbed("Missing Permissions!"));
        if (!args[0])
            return new lib_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a valid number");
        if (args[0].toLowerCase() === "remove" || "release" || "rel") {
            message.channel.send("Succesffully removed the slowmode");
            return chan.edit({
                rateLimitPerUser: 0
            });
        }
        else {
            ;
            const sec = parseInt(args[0]);
            const reason = args.slice(1).join(" ") || "No reason provided";
            chan.edit({
                rateLimitPerUser: sec
            });
            const { channel, enabled } = guild.getLog("slowmode");
            if (!enabled)
                return;
            guild.increaseCase();
            const cha = message.guild.channels.get(channel.id);
            cha.send(new lib_1.VorteEmbed(message)
                .baseEmbed()
                .setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})\n**>** Channel: ${chan.name} (${chan.id})\n**>** Reason: ${reason}`)
                .setTimestamp());
            if (reason) {
                message.channel.send(`This channel is in slowmode due to: ${reason}`);
            }
        }
    }
}
exports.default = default_1;
;
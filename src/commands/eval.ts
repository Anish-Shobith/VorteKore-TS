import { Command } from "../structures/Command";
import { VorteClient } from "../structures/VorteClient";
import { Message, TextChannel, Guild } from "discord.js";
import VorteEmbed from "../structures/VorteEmbed";
import { VorteGuild } from "../structures/VorteGuild";
export class Cmd extends Command {
  constructor(bot: VorteClient) {
    super(bot, {
      name: "eval",
      category: "Developer",
      cooldown: 0,
      description: "Nothing lol",
      example: "!eval <code>",
      usage: "!ban <code>"

    })
  }
  async run(message: Message, args: string[], guild: VorteGuild) {
    let embed;
    if (!["464499620093886486", "413620315508178955"].includes(message.author.id)) return;
    try {
      const codein = args.join(" ");
      let code = await eval(codein);
      const ctype = typeof code;
      if (typeof code !== "string") {
        code = require("util").inspect(code, {
          depth: 0,
        });
      }
      embed = new VorteEmbed(message)
        .baseEmbed()
        .setTitle("Evaluation")
        .addField("Input", `\`\`\`js\n${codein}\`\`\``)
        .addField("Output", `\`\`\`js\n${code}\`\`\``)
        .addField("Type", `\`\`\`js\n${ctype}\`\`\``);
    }
    catch (e) {
      embed = new VorteEmbed(message)
        .baseEmbed()
        .setTitle("Error")
        .setColor("#ff0000")
        .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``);
    }
    message.channel.send(embed);
  }
};
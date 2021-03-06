import { Command, VortePlayer } from "../../lib";
import { VorteMessage } from "../../lib/classes/Message";

export default class extends Command {
  public constructor() {
    super("join", {
      category: "Music",
      cooldown: 2000,
      description: "Joins your voice channel.",
      channel: "guild"
    })
  }

  public async run(message: VorteMessage, _a: string[]) {
		if (message.player) return message.sem(`Use \`${this.handler.prefix(message)}play\` to queue a song.`, { type: "music" });
    if (!message.member!.voice.channel) return message.sem("Please join a voice channel.", { type: "error" });

    this.bot.andesite.nodes.ideal.first()!.join<VortePlayer>({
      channelId: message.member!.voice.channelID!,
      guildId: message.guild!.id
		}).useMessage(message);
		
		return message.sem(`Successfully joined **<#${message.member!.voice.channelID}>** 🎵`, { type: "music" })
  };
}
import { VorteGuild, VorteEmbed, VorteClient } from "../structures";
import { Guild } from "discord.js";

export = async (bot: VorteClient, guild: Guild) => {
  await new VorteGuild(guild!);
};
import config from './config';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import * as commandModules from './commands';

const token = config.DISCORD_TOKEN;
const clientId = config.CLIENT_ID;
const guildId = config.GUIlD_ID;

const commands = [];
interface Command {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
}
for (const module of Object.values<Command>(commandModules)) {
    commands.push(module.data);
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

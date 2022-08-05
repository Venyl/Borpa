import { Client, CommandInteraction, GatewayIntentBits } from 'discord.js';
import config from './config';
import * as commandModules from './commands';
import { InteractionType } from 'discord-api-types/v10';
import addUser from './firebase-functions/addUser';
import updateUser from './firebase-functions/updateUser';

interface Command {
    execute: (interaction: CommandInteraction, client: Client) => Promise<void> | unknown;
}

interface Commands {
    commandName: Command;
}

const commands: Commands = Object(commandModules);

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    const okChannel = client.channels.cache.get('763382459504132136')!;
    if (okChannel.isTextBased()) okChannel.send('Bot restarted');
    console.log('Bot ON');
});

client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;
    const { commandName } = interaction;
    commands[commandName as keyof Commands].execute(interaction, client);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    await addUser(message.author.id);
    await updateUser(message.author.id, message.content);
    // for await (const id of [
    //     '219102395752382465',
    //     '229592167285391360',
    //     '257122181962661888',
    //     '273830402022572032',
    //     '338768062415372291',
    //     '344897472927105025',
    //     '596820414110629911',
    //     '621015093815148550',
    //     '802660323911401482',
    //     '846478860157190176',
    // ]) {
    //     await updateUser(id, 'a');
    // }
});

client.login(config.DISCORD_TOKEN);

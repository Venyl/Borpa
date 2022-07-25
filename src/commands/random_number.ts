import {
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    SlashCommandIntegerOption,
} from 'discord.js';

const min = 1;
const max = 5;

export const data = new SlashCommandBuilder()
    .setName('random_number')
    .setDescription(`Try and guess the number the random number between ${min} and ${max}`)
    .addIntegerOption((option: SlashCommandIntegerOption) => {
        return option
            .setName('number')
            .setDescription(`Write a number between ${min} and ${max}`)
            .setRequired(true)
            .setMinValue(min)
            .setMaxValue(max);
    });

export async function execute(interaction: CommandInteraction, client: Client) {
    if (!interaction.channelId) return;
    if (!interaction.isChatInputCommand()) return;
    const userNumber: number = interaction.options.getInteger('number')!;
    const randomNumber: number = Math.round(Math.random() * max + min);
    const guessText: string =
        userNumber === randomNumber ? 'Your guess was right' : 'Your guess was wrong';
    const replyMessage = await interaction.reply(guessText);
    setTimeout(() => {
        interaction.deleteReply();
    }, 3000);
}

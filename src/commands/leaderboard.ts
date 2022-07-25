import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import { AttachmentBuilder, Client, CommandInteraction } from 'discord.js';
import fetchAllUsers from '../firebase-functions/fetchAllUsers';
import { createCanvas, GlobalFonts, Image } from '@napi-rs/canvas';
import { readFile } from 'fs/promises';

export const data = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription("Displays this server's XP leaderboard");

export async function execute(interaction: CommandInteraction, client: Client) {
    if (!interaction.channelId) return;
    if (!interaction.isChatInputCommand()) return;

    const canvas = createCanvas(1080, 1080);
    GlobalFonts.registerFromPath('src/assets/fonts/NotoSans-CondensedLight.ttf', 'Noto Sans');
    const ctx = canvas.getContext('2d');

    ctx.font = '46px Noto Sans';
    ctx.fillStyle = '#ffffff';

    const backgroundFile = await readFile('src/assets/images/table.png');
    const background = new Image();

    background.src = backgroundFile;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const dbUsers = await fetchAllUsers();
    dbUsers?.sort((a, b) => Number(b.get('xp')) - Number(a.get('xp')));
    let yOffset = 115;
    for await (const user of dbUsers!) {
        const dcUser = await client.users.fetch(user.get('userId'));
        const xp: number = user.get('xp');
        const overallNeededXp: number = user.get('overallNeededXp');
        ctx.textAlign = 'left';
        ctx.fillText(dcUser.username, 130, yOffset);
        ctx.textAlign = 'right';
        ctx.fillText(String(user.get('level')), 580, yOffset);
        ctx.fillText(`${xp} / ${overallNeededXp}`, 885, yOffset);
        ctx.fillText(`${Math.floor((xp / overallNeededXp) * 100)}%`, 1000, yOffset);
        yOffset += 50;
    }

    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'table.png' });
    const exampleEmbed = new EmbedBuilder()
        .setColor(0x22aa4d)
        .setTitle("Your server's leaderboard")
        .setTimestamp()
        .setImage(`attachment://table.png`)
        .setFooter({
            text: 'Get on Aim Lab',
            iconURL:
                'https://cdn.discordapp.com/avatars/997843453662736444/777ee7499d7345378b464a1c18d3739e.webp?size=80',
        });

    return interaction.reply({ embeds: [exampleEmbed], files: [attachment] });
}

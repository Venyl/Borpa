import dotenv from 'dotenv';
dotenv.config();
const { DISCORD_TOKEN, CLIENT_ID, GUIlD_ID: GUILD_ID } = process.env;
if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID || !process.env.GUIlD_ID)
    throw new Error(
        `Missing environment variable, env: ${DISCORD_TOKEN}, ${CLIENT_ID}, ${GUILD_ID}`
    );

const config: Record<string, string> = {
    DISCORD_TOKEN: DISCORD_TOKEN!,
    CLIENT_ID: CLIENT_ID!,
    GUIlD_ID: GUILD_ID!,
};

export default config;

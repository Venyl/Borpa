import dotenv from 'dotenv';
dotenv.config();
const { DISCORD_TOKEN, CLIENT_ID, GUIlD_ID } = process.env;
if (!DISCORD_TOKEN || !CLIENT_ID || !GUIlD_ID)
    throw new Error(
        `Missing environment variable, env: ${process.env.DISCORD_TOKEN}, ${process.env.CLIENT_ID}, ${process.env.GUILD_ID}`
    );

const config: Record<string, string> = {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUIlD_ID,
};

export default config;

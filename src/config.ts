import dotenv from 'dotenv';
dotenv.config();
const { DISCORD_TOKEN, CLIENT_ID, GUIlD_ID: GUILD_ID } = process.env;

const config: Record<string, string> = {
    DISCORD_TOKEN: DISCORD_TOKEN!,
    CLIENT_ID: CLIENT_ID!,
    GUIlD_ID: GUILD_ID!,
};

export default config;

import dotenv from 'dotenv';
dotenv.config();
const { DISCORD_TOKEN, CLIENT_ID, GUIlD_ID } = process.env;
console.log(process.env);
if (!DISCORD_TOKEN || !CLIENT_ID || !GUIlD_ID) throw new Error('Missing environment variable');

const config: Record<string, string> = {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUIlD_ID,
};

export default config;

import {Client} from "tmi.js";
import * as dotenv from "dotenv";
import {CommandFactory} from "./models/command";
import {COMMAND_REGEX, FULL_COMMAND_REGEX} from "./constants";

dotenv.config({path: `${__dirname}/.env`});

const client = new Client({
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    channels: [
        process.env.CHANNEL
    ]
});

client.on('message', async (target, ctx, msg, self) => {
    if (self)
        return;

    msg = msg.trim();

    const cmd = COMMAND_REGEX.exec(msg).find(() => true);
    if (!cmd)
        return;

    const command = CommandFactory.get(cmd)
    if (!command)
        return;

    const message = msg.replace(FULL_COMMAND_REGEX, '')?.trim();

    await command.execute({client, context: ctx, target, message})
});

await client.connect();
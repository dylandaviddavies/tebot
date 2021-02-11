import {ChatUserstate, Client} from "tmi.js";

type Command = (args: CommandArgs) => Promise<void>;

export interface CommandArgs {
    context: ChatUserstate;
    client: Client;
    target: string;
    message: string;
}

const commands: Command[] = [
    async function dice(args) {
        const {client, target} = args;
        const sides = 6;
        const num = Math.floor(Math.random() * sides) + 1;
        await client.say(target, `You rolled a ${num}`);
    }
];

const commandsMap = new Map(commands.map(obj => [obj.name, obj]));

export class CommandFactory {
    public static get(cmd: string): (args: CommandArgs) => Promise<void> {
        return commandsMap.get(cmd);
    }
}
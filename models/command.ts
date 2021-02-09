import {ChatUserstate, Client} from "tmi.js";

export interface CommandArgs {
    context: ChatUserstate;
    client: Client;
    target: string;
    message: string;
}

export abstract class Command {
    name: string;
    abstract execute(args: CommandArgs): Promise<void>;
}

const commands: Command[] = [{
    name: 'dice',
    async execute(args) {
        const {client, target} = args;
        const sides = 6;
        const num = Math.floor(Math.random() * sides) + 1;
        await client.say(target, `You rolled a ${num}`);
    }
}];

const commandsMap = new Map(commands.map(obj => [obj.name, obj]));

export class CommandFactory {
    public static get(cmd: string): Command {
        return commandsMap.get(cmd);
    }
}
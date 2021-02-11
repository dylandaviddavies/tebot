import {CommandFactory} from "./command";

jest.mock('tmi.js');

describe('CommandFactory', () => {
    test('should return command based on name', () => {
        expect(CommandFactory.get('dice')).toBeTruthy();
    })

    test('should return null for invalid name', () => {
        expect(CommandFactory.get('I AM NOT A REAL COMMAND')).toBeFalsy();
    })
});
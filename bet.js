const readline = require('readline');

const { printResults, calculateStakes, orderItems } = require('./utils');

class Bet {
    constructor() {
        this.data = [];
    }

    async start() {
        await this.readContents();
        const { pools, result } = orderItems(this.data);
        const race = this.calculateResults(pools, result);
        printResults({ ...race, result });
    }

    async readContents() {
        return await new Promise((resolve, reject) =>  {
            const rl = readline.createInterface({
                terminal: true,
                output: process.stdout,
                input: process.stdin,
            });
    
            rl.on('line', async (line) => this.data.push(line));
            rl.on('close', () => resolve(this.data));
        });
    }

    calculateResults(pools, result) {
        const win = calculateStakes('w', result.first, pools);
        const p1 = calculateStakes('p', result.first, pools);
        const p2 = calculateStakes('p', result.second, pools);
        const p3 = calculateStakes('p', result.third, pools);
        const exacta = calculateStakes('e', [result.first, result.second], pools);
        return { 
            win,
            p1,
            p2,
            p3,
            exacta,
        };
    }
}

module.exports = Bet;

const COMMISSION = {
    win: 0.15,
    place: 0.12,
    exacta: 0.18
};

function numberToDecimal(x) {
    return Number.parseFloat(x).toFixed(2);
}

function orderItems(data) {
    let pools = {
        w : [],
        p: [],
        e: [],
    }
    data.forEach((item) => {
        if (item.includes('Result')) {
            const [ _, first, second, third ] = item.split(':');
            result = {
                first,
                second,
                third
            };
            return;
        }
        const [ _, product, selections, stake ] = item.split(':');
        pools[product.toLowerCase()].push({
            stake: +stake,
            selections,
        });
    });
    return { pools, result };
}

function calculateStakes(dividend, result, pools) {
    let stakes = {
        stakesPool: 0,
        totalBetStakes: 0,
        count: 0,
    };
    if (Array.isArray(result)) {
        result = result.toString();
    }
    pools[dividend].forEach((item, index) => {
        stakes.stakesPool += item.stake;
        if (item.selections === result) {
            stakes.count++;
            stakes.totalBetStakes += item.stake;
        }
    });
    return calculateDividends()[dividend](stakes);
}

function calculateDividends() {
    return {
        w: ({stakesPool, totalBetStakes}) => 
            numberToDecimal((stakesPool - (stakesPool * COMMISSION.win)) / totalBetStakes),
        p: ({stakesPool, totalBetStakes, count}) => 
            numberToDecimal((stakesPool - (stakesPool * COMMISSION.place)) / totalBetStakes / count),
        e: ({stakesPool, totalBetStakes}) => 
            numberToDecimal((stakesPool - (stakesPool * COMMISSION.exacta)) / totalBetStakes),
    }
}

function printResults ({ result, win, p1, p2, p3, exacta }) {
    console.log('');
    console.log(`Win:${result.first}:$${win}`);
    console.log(`Place:${result.first}:$${p1}`);
    console.log(`Place:${result.second}:$${p2}`);
    console.log(`Place:${result.third}:$${p3}`);
    console.log(`Exacta:${result.first},${result.second}:$${exacta}`);
}

module.exports = {
    numberToDecimal,
    calculateStakes,
    orderItems,
    printResults,
};

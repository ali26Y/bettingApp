const expect = require('chai').expect;
const Bet = require('./bet');
const mock = require('./mock');
const { orderItems } = require('./utils');

describe('Mock Bet Class', function () {
    it('should calculate the correct odds', function () {
        const UserBet = new Bet();
        const { pools, result } = orderItems(mock);

        expect(UserBet.calculateResults(pools, result)).to.deep.include({
            win: '2.22',
            p1: '1.83',
            p2: '4.92',
            p3: '2.59',
            exacta: '5.62'
        });

    });
});

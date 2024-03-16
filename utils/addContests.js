const Contest = require("../models/contest");
const Match = require("../models/match");
const { contestPrices } = require("./contestsPrices");
//console.log(contestPrices, 'prices')
module.exports.addContests = async function (matchId) {
    console.log('after match', matchId);
    const contestIds = []
    for (let j = 0; j < contestPrices.length; j++) {
        const contest1 = new Contest();
        contest1.price = contestPrices[j].totalTeams * contestPrices[j].entryPrice;
        contest1.entryPrice = contestPrices[j].entryPrice;
        contest1.totalSpots = contestPrices[j].totalTeams;
        contest1.spotsLeft = contestPrices[j].totalTeams;
        contest1.matchId = matchId;
        const prizeDetails = [
            {
                prize: contestPrices[j].winPrice,
            }
        ];
        contest1.prizeDetails = prizeDetails;
        contest1.numWinners = 1;
        try {
            const contest2 = await Contest.create(contest1);
            if (contest2) {
                contestIds.push(contest2?._id.toString());
            }
        } catch (err) {
            console.log(`Error : ${err}`);
        }
    }
    return contestIds
};

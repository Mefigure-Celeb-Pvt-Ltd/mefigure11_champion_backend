const Contest = require("../models/contest");
const Match = require("../models/match");
const { contestPrices } = require("./contestsPrices");
//console.log(contestPrices, 'prices')
addContests = async function () {
    console.log('before match');
    const matches = await Match.find();
    console.log('after match');
    for (let i = 0; i < matches.length; i++) {
        console.log(matches[i]?.matchId, 'matchId')
        let contestIds = [];
        for (let j = 0; j < contestPrices.length; j++) {
            const contest1 = new Contest();
            contest1.price = contestPrices[j].totalTeams * contestPrices[j].entryPrice;
            contest1.entryPrice = contestPrices[j].entryPrice;
            contest1.totalSpots = contestPrices[j].totalTeams;
            contest1.spotsLeft = contestPrices[j].totalTeams;
            contest1.matchId = matches[i].matchId;
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
        matches[i].contestId.push(...contestIds);
        console.log(matches[i].matchId, 'matchid')
        await matches[i].save();
    }
};
addContests()
import {
    RANK_GM,
    RANK_OFFICER,
    RANK_VETERAN,
    RANK_RAIDER,
    RANK_MEMBER
} from '../constants/users';

const ranks = {
    0: RANK_GM,
    1: RANK_OFFICER,
    2: RANK_VETERAN,
    3: RANK_RAIDER,
    4: RANK_MEMBER
};

const findRank = function findRank(value) {
    let foundVal = 10; // larger number than any of the ranks so it will also return as last

    Object.keys(ranks).forEach(rankVal => {
        if (ranks[rankVal] === value) {
            foundVal = rankVal;
        }
    });

    return foundVal;
};

export default (playerA, playerB) => {
    const playerARankVal = findRank(playerA.rank);
    const playerBRankVal = findRank(playerB.rank);

    return playerARankVal - playerBRankVal;
};

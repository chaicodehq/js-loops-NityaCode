/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length === 0){
    return [];
  }

  const teamStatsObj = matches.reduce((teamAccumulator, match) => {
    function calculateTeamDada(teamName, matchStats){
      let team = {
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0
      }

      if (teamAccumulator.hasOwnProperty(teamName)){
        team = {...teamAccumulator[teamName]}
      }

      for (const [key, value] of Object.entries(matchStats)){
        team[key] = team[key] + value;
      }

      teamAccumulator[teamName] = team;
    }

    switch (match.result){
      case "win":
        let winnerTeam = match.winner;
        let lostTeam = match.winner === match.team1 ? match.team2 : match.team1;

        calculateTeamDada(winnerTeam, {played: 1, won: 1, points: 2});
        calculateTeamDada(lostTeam, {played: 1, lost: 1})
      break;

      case "tie":
        calculateTeamDada(match.team1, {played: 1, tied: 1, points: 1});
        calculateTeamDada(match.team2, {played: 1, tied: 1, points: 1})
      break;

      case "no_result":
        calculateTeamDada(match.team1, {played: 1, noResult: 1, points: 1});
        calculateTeamDada(match.team2, {played: 1, noResult: 1, points: 1})
      break;
    };

    return teamAccumulator;
      
  }, {});

  // Convert team data to list
  let genTeamInfoList = [];

  for (const teamName in teamStatsObj){
    let teamInfo = {team: teamName, ...teamStatsObj[teamName]}

    genTeamInfoList.push(teamInfo);
  };

  // Sort the list
  genTeamInfoList.sort((a, b) => {
    const pointsCompare = b.points - a.points;

    if (pointsCompare !== 0){
      return pointsCompare
    }

    return a.team.localeCompare(b.team);
  });

  return genTeamInfoList;
}


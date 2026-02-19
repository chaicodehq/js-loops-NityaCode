/**
 * 🏏 Gully Cricket Scoreboard
 *
 * Mohalle ke bacche gully cricket khel rahe hain. Tu scorekeeper hai bhai!
 * Har ball ka outcome ek array mein diya gaya hai. Tujhe scoreboard banana hai.
 *
 * Ball outcomes:
 *   - 0 = dot ball (no run)
 *   - 1 to 6 = runs scored on that ball
 *   - -1 = WICKET! Batsman out ho gaya
 *
 * Rules:
 *   - Loop through each ball in the array using a for loop
 *   - Track: totalRuns, totalBalls (all balls including wickets),
 *     wickets, fours (ball === 4), sixes (ball === 6)
 *   - IMPORTANT: Agar 10 wickets ho gaye, toh STOP! (use break)
 *     Innings khatam. Remaining balls are not counted.
 *
 * Validation:
 *   - Agar balls ek array nahi hai ya empty array hai,
 *     return karo: { totalRuns: 0, totalBalls: 0, wickets: 0, fours: 0, sixes: 0 }
 *
 * @param {number[]} balls - Array of ball outcomes
 * @returns {{ totalRuns: number, totalBalls: number, wickets: number, fours: number, sixes: number }}
 *
 * @example
 *   cricketScoreboard([4, 0, 6, -1, 2, 1])
 *   // => { totalRuns: 13, totalBalls: 6, wickets: 1, fours: 1, sixes: 1 }
 *
 *   cricketScoreboard([])
 *   // => { totalRuns: 0, totalBalls: 0, wickets: 0, fours: 0, sixes: 0 }
 */
export function cricketScoreboard(balls) {
  if (!Array.isArray(balls) || balls.length === 0){
    return {
      totalRuns: 0,
      totalBalls: 0,
      wickets: 0,
      fours: 0,
      sixes: 0
    }
  }

  let countRuns = 0;
  let countBalls = 0;
  let countWickets = 0;
  let countFours = 0;
  let countSixes = 0;

  for (let ball of balls){

    if (countWickets > 9) {
      break;
    }

    switch (ball) {
      case -1:
        countWickets++;
        break;
      
      case 4:
        countRuns += ball;
        countFours++;
        break;

      case 6:
        countRuns += ball;
        countSixes++;
        break;

      default:
        countRuns += ball;
        break;
    }
    countBalls++;
  }

  return {
    totalRuns: countRuns,
    totalBalls: countBalls,
    wickets: countWickets,
    fours: countFours,
    sixes: countSixes
  }
}

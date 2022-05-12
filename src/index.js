import './style.css';
import LeaderBoard from './leaderScores.js';

const leaderB = new LeaderBoard();
leaderB.displayData();
// refresh btn
document.querySelector('.refresh').addEventListener('click', () => {
  leaderB.displayData();
});
// submit data
const scoreForm = document.querySelector('.add-score');
scoreForm.addEventListener('submit', (ex) => {
  ex.preventDefault();
  const username = scoreForm.elements.name.value;
  const score = scoreForm.elements.score.value;
  leaderB.postData(username, score).then((res) => {
    if (!res.error) {
      scoreForm.reset();
    }
  });
});
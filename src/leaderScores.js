export default class LeaderBoard {
  constructor() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    this.id = '46TANuqp4TocEYMLV1Ht';
    this.participators = [];
  }

  // retrieve participant scores
  async retrieveScores() {
    const response = await fetch(`${this.url + this.id}/scores/`)
      .then((res) => res.json())
      .then((data) => ({ error: false, participators: data.result }))
      .catch(() => ({ error: true, participators: this.participators }));
    return response;
  }

  // Post data
  async postData(username, score) {
    if (username && score && typeof username === 'string') {
      const response = await fetch(`${this.url + this.id}/scores/`, {
        method: 'POST',
        body: JSON.stringify({
          user: username,
          score,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((msg) => ({ error: false, msg }))
        .catch(() => ({ error: true, msg: 'Participator could mot be added!' }));
      return response;
    }
    return ({ error: true, msg: 'Invalid participator name or score value' });
  }

  // Display participator name and Score data
  displayData() {
    this.retrieveScores()
      .then((res) => {
        if (!res.error) {
          this.participators = res.participators;
          this.participators.sort((x, y) => y.score - x.score);
          const scoresList = document.querySelector('.scores-list');
          scoresList.innerHTML = '';
          this.participators.forEach((participator) => {
            scoresList.innerHTML += `<li class="s-between">${participator.user}: ${participator.score}</li>`;
          });
        }
      });
  }
}
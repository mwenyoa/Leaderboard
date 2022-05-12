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
}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import 'babel-polyfill';
import Promise from 'bluebird';

const API_ENDPOINT = 'https://graph.facebook.com/v2.8/';
const API_TOKEN = window.API_TOKEN;
const REACTION_TYPES = [
  ['LIKE', 'likes'],
  ['LOVE', 'loves'],
  ['WOW', 'wows'],
  ['HAHA', 'hahas']
]

class Reactions extends Component {
  constructor(props) {
    super(props);
    this.state = REACTION_TYPES.reduce((obj, type) => ({
      ...obj,
      [type[1]]: 0
    }), {});
    this.fetchStats = this.fetchStats.bind(this);
  }

  componentDidMount() {
    this.fetchStats();
    setInterval(this.fetchStats, 10000);
  }

  fetchStats() {
    const postId = window.POST_ID;
    const requests = REACTION_TYPES.reduce((obj, type) => ({
      ...obj,
      [type[1]]: fetch(`${API_ENDPOINT}/${postId}/reactions` +
        `?type=${type[0]}&summary=total_count&access_token=${API_TOKEN}`)
        .then(response => response.json())
        .then(data => data.summary.total_count)
    }), {});
    Promise.props(requests)
      .then(results => {
        this.setState(results);
      });
  }

  render() {
    const { likes, loves, wows, hahas } = this.state;

    return (
      <div className="g-container">
          <div className="g-choices">
              <div className="g-choice">
                  <div className="g-choice--photo">
                      <img src="static/img/miranda_frost.png"/>
                  </div>
                  <div className="g-choice--reaction">
                      <img src="static/img/reaction_like.png"/>
                  </div>
                  <div className="g-choice--count">
                    {likes}
                  </div>
              </div>

              <div className="g-choice">
                  <div className="g-choice--photo">
                      <img src="static/img/vesper_lynd.png"/>
                  </div>
                  <div className="g-choice--reaction">
                      <img src="static/img/reaction_love.png"/>
                  </div>
                  <div className="g-choice--count">
                    {loves}
                  </div>
              </div>

              <div className="g-choice">
                  <div className="g-choice--photo">
                      <img src="static/img/severine.png"/>
                  </div>
                  <div className="g-choice--reaction">
                      <img src="static/img/reaction_wow.png"/>
                  </div>
                  <div className="g-choice--count">
                    {wows}
                  </div>
              </div>

              <div className="g-choice">
                  <div className="g-choice--photo">
                      <img src="static/img/madeleine_swann.png"/>
                  </div>
                  <div className="g-choice--reaction">
                      <img src="static/img/reaction_haha.png"/>
                  </div>
                  <div className="g-choice--count">
                    {hahas}
                  </div>
              </div>
          </div>

          <div className="g-gala">
              <h1>Rendez-vous le 3 Février 2017 ! </h1>
              <h2>www.gala-isen.fr</h2>
          </div>
      </div>
    );
  }
}

const root = document.getElementById('root');
ReactDOM.render(<Reactions />, root);

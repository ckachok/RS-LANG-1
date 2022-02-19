import HomePage from 'pages/home/home';
import TextbookPage from 'pages/textbook/textbook';
import AudioCallPage from 'pages/audio-call/audio-call';
import SprintPage from 'pages/sprint/sprint';
import StatisticsPage from 'pages/statistics/statistics';
import AboutTeamPage from 'pages/about-team/about-team';
import PAGE_INFO from 'pages/_constants';

class App {
  container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  router(): void {
    if (this.container.innerHTML) {
      this.container.innerHTML = '';
    }

    const routes = [
      { hash: PAGE_INFO.home.hash, id: PAGE_INFO.home.id, View: HomePage },
      { hash: PAGE_INFO.textbook.hash, id: PAGE_INFO.textbook.id, View: TextbookPage },
      { hash: PAGE_INFO.audioCall.hash, id: PAGE_INFO.audioCall.id, View: AudioCallPage },
      { hash: PAGE_INFO.sprint.hash, id: PAGE_INFO.sprint.id, View: SprintPage },
      { hash: PAGE_INFO.statistics.hash, id: PAGE_INFO.statistics.id, View: StatisticsPage },
      { hash: PAGE_INFO.aboutTeam.hash, id: PAGE_INFO.aboutTeam.id, View: AboutTeamPage }
    ];

    const defaultRoute = routes[0];
    const currDefinedRoute = routes.find(route => window.location.hash.includes(route.hash));
    const currRoute = currDefinedRoute || defaultRoute;

    const currPage = new currRoute.View(this.container, currRoute.id);
  }
}

export default App;

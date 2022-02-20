import BaseComponent from 'common-components/base-component';
import Page from 'pages/page';
import 'pages/statistics/statistics.scss';

class StatisticsPage extends Page {
  constructor(parentNode: HTMLElement, id: string) {
    super(parentNode, id);
  }

  protected createMain(): void {
    const main = new BaseComponent(this.parentNode, 'main', 'main');
    const mainContainer = new BaseComponent(main.node, 'div', 'container main__container home-container').node;
  }
}

export default StatisticsPage;

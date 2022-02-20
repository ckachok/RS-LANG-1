import BaseComponent from 'common-components/base-component';
import Page from 'pages/page';
import AppFeature from 'pages/home/components/app-feature/app-feature';
import { FEATURE_DESC, FEATURE_NAMES } from 'pages/home/components/app-feature/_constants';
import Api from 'services/api';
import 'pages/home/home.scss';

class HomePage extends Page {
  constructor(parentNode: HTMLElement, id: string) {
    super(parentNode, id);
  }

  private createAppFeatures(parentNode: HTMLElement): void {
    FEATURE_NAMES.forEach((name, index) => {
      const feature = new AppFeature(parentNode, 'div', 'feature', name, FEATURE_DESC[index]);
    });
  }

  private createDecorativeCircles(parentNode: HTMLElement): void {
    const decorativeSmallCircle = new BaseComponent(parentNode, 'div', 'decorative-circle decorative-circle_small');
    const decorativeBigCircle = new BaseComponent(parentNode, 'div', 'decorative-circle decorative-circle_big');
  }

  protected async createMain() {
    const main = new BaseComponent(this.parentNode, 'main', 'main');
    const mainContainer = new BaseComponent(main.node, 'div', 'container main__container home-container').node;
    this.createAppFeatures(mainContainer);
    this.createDecorativeCircles(mainContainer);

    const words = await new Api().getWords(2, 1);
    const word = await new Api().getWord('5e9f5ee35eb9e72bc21af972');
    const aaa = await new Api().registerNewUser({ name: 'Cron', email: 'cron@mail.ru', password: '11091989' });
    const authorize = await new Api().authorizeUser({ email: 'cron@mail.ru', password: '11091989' });
    console.log(words, word, aaa);
    
    if (authorize.error) {
       console.log(authorize.error)
    } else {
      localStorage.setItem('authToken', authorize.success.token);
      localStorage.setItem('authRefreshToken', authorize.success.refreshToken);
      console.log(authorize.success);
    }

    const user = await new Api().getUser(authorize.success.userId);
    console.log(user);

    const wordData = { difficulty: 'easy', optional: { isLearned: true } };
    const userWord = await new Api().saveUserWord(authorize.success.userId, word.id, wordData);
    console.log(userWord);

    const userWordData = await new Api().getUserWord(authorize.success.userId, word.id);
    console.log('userWordData = ', userWordData);

    const allUserWords = await new Api().getAllUserWords(authorize.success.userId);
    console.log('allUserWords = ', allUserWords)
    
  }
}

export default HomePage;

import 'normalize.css';
import './styles.scss';
import App from './app';

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
  app.router();
});

window.addEventListener('hashchange', () => {
  app.router();
});

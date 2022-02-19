import PAGE_INFO from 'pages/_constants';
import { IMenuData } from 'types/interfaces';

const MENU_DATA: IMenuData = {
  home: {
    name: 'Главная',
    href: PAGE_INFO.home.hash
  },
  textbook: {
    name: 'Электронный учебник',
    href: PAGE_INFO.textbook.hash
  },
  audioCall: {
    name: 'Аудиовызов',
    href: PAGE_INFO.audioCall.hash
  },
  sprint: {
    name: 'Спринт',
    href: PAGE_INFO.sprint.hash
  },
  statistics: {
    name: 'Статистика',
    href: PAGE_INFO.statistics.hash
  },
  aboutTeam: {
    name: 'О команде',
    href: PAGE_INFO.aboutTeam.hash
  }
};

export default MENU_DATA;

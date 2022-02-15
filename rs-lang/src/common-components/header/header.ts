import BaseComponent from 'common-components/base-component';
import Logo from 'common-components/logo-app/logo-app';
import MENU_DATA from 'common-components/header/_constants';
import { makeActive, makeInactive } from 'utils/secondary-functions';
import 'common-components/header/header.scss';

class Header extends BaseComponent {
  public menu: HTMLElement;
  public burgerMenu: HTMLElement;
  public onBurgerMenu: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string, userName = '') {
    super(parentNode, tagName, className);
    this.createHeader(userName);
  }

  private createUser(parentNode: HTMLElement, userName: string): void {
    const user = new BaseComponent(parentNode, 'div', 'user');
    const userWelcome = new BaseComponent(user.node, 'span', 'user__welcome', `Привет, ${userName} ;)`);
    const userLogInButton = new BaseComponent(user.node, 'button', 'user__log-in-button');
    const userLogOutButton = new BaseComponent(user.node, 'button', 'user__log-out-button', 'Выйти');
  }

  private handleBurgerMenuClick(): void {
    this.burgerMenu.addEventListener('click', () => {
      if (this.burgerMenu.classList.contains('active')) {
        makeInactive(this.burgerMenu, this.menu);
      } else {
        makeActive(this.burgerMenu, this.menu);
      }
      this.onBurgerMenu();
    });
  }

  private createBurgerMenu(parentNode: HTMLElement): void {
    this.burgerMenu = new BaseComponent(parentNode, 'button', 'burger-menu').node;
    const burgerMenuLine = new BaseComponent(this.burgerMenu, 'span', 'burger-menu__line');
    this.handleBurgerMenuClick();
  }

  private createMenuList(parentNode: HTMLElement, userName: string): void {
    const currPageHash = document.location.hash;
    const menuList = new BaseComponent(parentNode, 'ul', 'menu__list').node;
    const menuData = Object.values(MENU_DATA);
    menuData.forEach(menuItemData => {
      const menuItem = new BaseComponent(menuList, 'li', 'menu__item').node;
      const menuLink = new BaseComponent<HTMLAnchorElement>(menuItem, 'a', 'menu__link', menuItemData.name).node;
      menuLink.href = menuItemData.href;

      if (currPageHash === menuLink.hash) {
        makeActive(menuLink);
      } else if (!currPageHash && menuItemData.name === MENU_DATA.home.name) {
        makeActive(menuLink);
      }

      if (userName && menuItemData.name === MENU_DATA.statistics.name) {
        makeActive(menuLink);
      }
    });
  }

  private createMenu(parentNode: HTMLElement, userName: string): void {
    this.menu = new BaseComponent(parentNode, 'nav', 'menu').node;
    this.createMenuList(this.menu, userName);
  }

  private createHeader(userName: string): void {
    const headerContainer = new BaseComponent(this.node, 'div', 'container header__container').node;
    const logo = new Logo(headerContainer, 'a', 'logo-app');
    this.createUser(headerContainer, userName);
    this.createBurgerMenu(headerContainer);
    this.createMenu(headerContainer, userName);
  }
}

export default Header;

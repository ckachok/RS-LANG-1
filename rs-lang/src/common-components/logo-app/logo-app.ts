import BaseComponent from 'common-components/base-component';
import PAGE_INFO from 'pages/_constants';
import 'common-components/logo-app/logo-app.scss';

class Logo extends BaseComponent<HTMLAnchorElement> {
  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createLogo();
    this.node.href = PAGE_INFO.home.hash;
  }

  private createLogo(): void {
    const logoImage = new BaseComponent<HTMLImageElement>(this.node, 'div', 'logo-app__image');
    const logoText = new BaseComponent<HTMLElement>(this.node, 'span', 'logo-app__text', 'RS Lang');
  }
}

export default Logo;

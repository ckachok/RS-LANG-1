import BaseComponent from 'common-components/base-component';
import LogoRsschool from 'common-components/logo-rsschool/logo-rsschool';
import { GITHUB_HREF, GITHUB_NAMES } from 'common-components/footer/_constants';
import 'common-components/footer/footer.scss';

class Footer extends BaseComponent {
  private footerContainer: BaseComponent<HTMLElement>;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createFooter();
  }

  private createDevInfo(parentNode: HTMLElement): void {
    const devInfo = new BaseComponent(parentNode, 'div', 'dev-info').node;
    const year = new BaseComponent(devInfo, 'span', 'dev-info__year', '2022');
    const githubIcon = new BaseComponent(devInfo, 'div', 'dev-info__github-icon');
    const developers = new BaseComponent(devInfo, 'div', 'dev-info__developers').node;

    GITHUB_NAMES.forEach(name => {
      const developerName = new BaseComponent<HTMLAnchorElement>(developers, 'a', 'dev-info__developer', name);
      developerName.node.href = GITHUB_HREF + name;
      developerName.node.target = '_blank';
    });
  }

  private createFooter(): void {
    this.footerContainer = new BaseComponent(this.node, 'div', 'container footer__container');
    const logoRsschool = new LogoRsschool(this.footerContainer.node, 'a', 'logo-rsschool');
    this.createDevInfo(this.footerContainer.node);
  }
}

export default Footer;

import BaseComponent from 'common-components/base-component';
import LOGO_RSSCHOOL_HREF from 'common-components/logo-rsschool/_constants';
import 'common-components/logo-rsschool/logo-rsschool.scss';

class LogoRsschool extends BaseComponent<HTMLAnchorElement> {
  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.node.href = LOGO_RSSCHOOL_HREF;
    this.node.target = '_blank';
  }
}

export default LogoRsschool;

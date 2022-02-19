import BaseComponent from 'common-components/base-component';
import 'pages/home/components/app-feature/app-feature.scss';

class AppFeature extends BaseComponent {
  constructor(parentNode: HTMLElement, tagName: string, className: string, name: string, desc: string) {
    super(parentNode, tagName, className);
    this.createFeatureApp(name, desc);
  }

  private createFeatureApp(name: string, desc: string): void {
    const featureNameContainer = new BaseComponent(this.node, 'div', 'feature__name').node;
    const featureNameText = new BaseComponent(featureNameContainer, 'span', 'feature__name-text', name);
    const featureDesc = new BaseComponent(this.node, 'div', 'feature__desc').node;
    const featureDescText = new BaseComponent(featureDesc, 'span', 'feature__desc-text', desc);
  }
}

export default AppFeature;

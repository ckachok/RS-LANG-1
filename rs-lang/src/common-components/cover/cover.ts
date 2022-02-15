import BaseComponent from 'common-components/base-component';
import 'common-components/cover/cover.scss';

class Cover extends BaseComponent {
  public onCover: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.handleCoverClick();
  }

  private handleCoverClick(): void {
    this.node.addEventListener('click', () => {
      this.node.classList.remove('active');
      this.onCover();
    });
  }
}

export default Cover;

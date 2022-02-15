class BaseComponent <NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = content;

    if (parentNode) {
      parentNode.append(element);
    }

    this.node = element as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
}

export default BaseComponent;

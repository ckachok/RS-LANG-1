export const makeActive = (...elements: HTMLElement[]): void => {
  elements.forEach(elem => {
    elem.classList.add('active');
  });
};

export const makeInactive = (...elements: HTMLElement[]): void => {
  elements.forEach(elem => {
    elem.classList.remove('active');
  });
};

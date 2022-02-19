import BaseComponent from 'common-components/base-component';
import { makeActive, makeInactive } from 'utils/secondary-functions';
import { CONTROL_NAMES, FIELD_DATA, SUBMIT_BUTTON_NAMES } from 'common-components/authorization/_constants';
import { IUserData } from 'types/interfaces';
import 'common-components/authorization/authorization.scss';

class Authorization extends BaseComponent {
  public menu: HTMLElement;
  public burgerMenu: HTMLElement;
  public onBurgerMenu: () => void;
  inputUserName: HTMLInputElement;
  inputEmail: HTMLInputElement;
  inputPassword: HTMLInputElement;
  authorizationButton: HTMLElement;
  registrationButton: HTMLElement;
  loginButton: HTMLElement;
  registerButton: HTMLElement;
  userData: IUserData;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createAuthorization();
  }

  handleAuthorizationButtonClick() {
    this.authorizationButton.addEventListener('click', () => {
      makeActive(this.authorizationButton, this.loginButton);
      makeInactive(this.registrationButton, this.inputUserName.parentElement, this.registerButton);
    });
  }

  handleRegistrationButtonClick() {
    this.registrationButton.addEventListener('click', () => {
      makeActive(this.registrationButton, this.inputUserName.parentElement, this.registerButton);
      makeInactive(this.authorizationButton, this.loginButton);
    });
  }

  createAuthorizationControls() {
    const controls = new BaseComponent(this.node, 'div', 'authorization__controls').node;
    this.authorizationButton = new BaseComponent(controls, 'button', 'authorization__button active', CONTROL_NAMES.authorization).node;
    this.registrationButton = new BaseComponent(controls, 'button', 'authorization__button', CONTROL_NAMES.registration).node;

    this.handleAuthorizationButtonClick();
    this.handleRegistrationButtonClick();
  }

  createFormField(parentNode: HTMLElement) {
    [this.inputUserName, this.inputEmail, this.inputPassword] = FIELD_DATA.map(data => {
      const field = new BaseComponent(parentNode, 'div', 'authorization-form__field active').node;
      const fieldName = new BaseComponent(field, 'p', 'authorization-form__field-name', data.name);
      const input = new BaseComponent<HTMLInputElement>(field, 'input', 'authorization-form__input').node;
      input.type = data.type;
      input.required = true;
      return input;
    });
    makeInactive(this.inputUserName.parentElement);
  }

  getFormFieldValues(): IUserData {
    const [name, email, password] = [this.inputUserName.value, this.inputEmail.value, this.inputPassword.value];
    return { name, email, password };
  }

  handleRegisterButtonClick() {
    this.registerButton.addEventListener('click', () => {
      const isValidUserName = this.inputUserName.validity.valid;
      const isValidEmail = this.inputEmail.validity.valid;
      const isValidPassword = this.inputPassword.validity.valid;

      if (isValidUserName && isValidEmail && isValidPassword) {
        this.userData = this.getFormFieldValues();
      } else {
        return;
      }

      const dataAllUsers: IUserData[] = JSON.parse(localStorage.getItem('dataAllUsers')) || [];
      const isUserExist = () => dataAllUsers.find(user => user.email === this.userData.email);

      if (isUserExist()) {
        console.log('Пользователь существует');
      } else {
        dataAllUsers.push(this.userData);
        localStorage.setItem('dataAllUsers', JSON.stringify(dataAllUsers));
      }
    });
  }

  createAuthorizationForm() {
    const form = new BaseComponent<HTMLFormElement>(this.node, 'form', 'authorization-form').node;
    this.createFormField(form);
    this.loginButton = new BaseComponent(form, 'button', 'authorization-form__login-button active', SUBMIT_BUTTON_NAMES.login).node;
    this.registerButton = new BaseComponent(form, 'button', 'authorization-form__register-button', SUBMIT_BUTTON_NAMES.register).node;
    this.handleRegisterButtonClick();
  }

  createAuthorization() {
    const authorizationLogo = new BaseComponent(this.node, 'div', 'authorization__logo');
    this.createAuthorizationControls();
    this.createAuthorizationForm();
  }
}

export default Authorization;

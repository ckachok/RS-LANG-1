import { INewTokens, IUserRegRequest, IUserAuthRequest, IUserData, IUserRegData, IUserWordData, IUserWordRequest, IWordData } from "types/interfaces";

const BASE = 'http://localhost:5000';
const ENDPOINT = {
  WORDS: '/words',
  USERS: '/users',
  SIGNIN: '/signin',
  TOKENS: '/tokens'
}

const NEW_USER_ERROR = 'Пользователь с таким адресом электронной почты уже существует';
const AUTH_USER_ERROR = 'Пользователя с таким адресом электронной почты не существует';
const USER_WORD_ERROR = 'Такого пользовательского слова не существует';

class Api {
  token: string;
  refreshToken: string

  constructor() {
    this.token = localStorage.getItem('authToken');
    this.refreshToken = localStorage.getItem('authRefreshToken');
  }

  // !Получение слов без регистрации
  async getWords(group: number, page: number): Promise<IWordData[]> {
    const resp = await fetch(`${BASE}${ENDPOINT.WORDS}?group=${group}&page=${page}`);
    return await resp.json();
  }

  async getWord(id: string): Promise<IWordData> {
    const resp = await fetch(`${BASE}${ENDPOINT.WORDS}/${id}`);
    return await resp.json();
  }

  // !Создание пользователя
  async registerNewUser(user: IUserData): Promise<IUserRegRequest> {
    const resp = await fetch(`${BASE}${ENDPOINT.USERS}`, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
     });
    
    return resp.status === 417 ? { error: NEW_USER_ERROR} : { success: await resp.json() };
  }

  // !Авторизация пользователя
  async authorizeUser(user: IUserData): Promise<IUserAuthRequest> {
    const resp = await fetch(`${BASE}${ENDPOINT.SIGNIN}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    return resp.status === 404 ? { error: AUTH_USER_ERROR } : { success: await resp.json() };
  }

  // !Получение нового токена
  async getNewUserToken(userId: string): Promise<void> {
    const resp = await fetch(`${BASE}${ENDPOINT.USERS}/${userId}${ENDPOINT.TOKENS}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.refreshToken}`,
        'Accept': 'application/json',
      }
    });
    const newTokens: INewTokens = await resp.json();
    localStorage.setItem('authToken', newTokens.token);
    localStorage.setItem('authRefreshToken', newTokens.refreshToken);
  }
  

  async getUser(userId: string): Promise<IUserRegData> {
    const resp = await fetch(`${BASE}${ENDPOINT.USERS}/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json',
      }
    });

    if (resp.status === 401) {
      await this.getNewUserToken(userId);
      await new Api().getUser(userId);
    }

    return await resp.json();
  }

  // !Работа с пользовательскими словами USER WORD
  async createUserWord(userId: string, wordId: string, wordData: IUserWordData): Promise<void> {
    const resp = await fetch(`${BASE}${ENDPOINT.USERS}/${userId}${ENDPOINT.WORDS}/${wordId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wordData)
    });

    if (resp.status === 401) {
      await this.getNewUserToken(userId);
      await new Api().createUserWord(userId, wordId, wordData);
    }
  }

  async getUserWord(userId: string, wordId: string): Promise<IUserWordRequest> {
    const resp = await fetch(`${BASE}${ENDPOINT.USERS}/${userId}${ENDPOINT.WORDS}/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json'
      }
    });

    if (resp.status === 401) {
      await this.getNewUserToken(userId);
      await new Api().getUserWord(userId, wordId);
    }

    if (resp.status === 404) {
      return { error: USER_WORD_ERROR };
    } else {
      const data: IUserWordData = await resp.json();
      return { success: { difficulty: data.difficulty, optional: data.optional } }
    }
  }

  async updateUserWord(userId: string, wordId: string, wordData: IUserWordData): Promise<void> {
    const resp = await fetch(`${BASE}${ENDPOINT.USERS}/${userId}${ENDPOINT.WORDS}/${wordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wordData)
    });

    if (resp.status === 401) {
      await this.getNewUserToken(userId);
      await new Api().updateUserWord(userId, wordId, wordData);
    }
  }

  async deleteUserWord(userId: string, wordId: string): Promise<void> {
    const resp = await fetch(`${BASE}${ENDPOINT.USERS}/${userId}${ENDPOINT.WORDS}/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json',
      },
    });

    if (resp.status === 401) {
      await this.getNewUserToken(userId);
      await new Api().deleteUserWord(userId, wordId);
    }
  }

  updateUserWordData(userWordData: IUserWordData, wordData: IUserWordData): void {
    userWordData.difficulty = wordData.difficulty || userWordData.difficulty;
    userWordData.optional.isLearned = wordData.optional.isLearned || userWordData.optional.isLearned;
    userWordData.optional.isNew = wordData.optional.isNew || userWordData.optional.isNew;
  }

  async saveUserWord(userId: string, wordId: string, wordData: IUserWordData): Promise<void> {
    let userWordData = (await this.getUserWord(userId, wordId)).success;
    if (userWordData) {
      this.updateUserWordData(userWordData, wordData);
      await this.updateUserWord(userId, wordId, userWordData)
    } else {
      userWordData = { difficulty: 'easy', optional: { isLearned: false, isNew: false} };
      this.updateUserWordData(userWordData, wordData);
      await this.createUserWord(userId, wordId, userWordData);
    }
  }

  async getAllUserWords(userId: string) {
    const resp = await fetch(`${BASE}${ENDPOINT.USERS}/${userId}${ENDPOINT.WORDS}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json',
      },
    });

    if (resp.status === 401 || resp.status === 402) {
      await this.getNewUserToken(userId);
      await new Api().getAllUserWords(userId);
    }

    return await resp.json();
  }


}

export default Api;
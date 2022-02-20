export interface IMenuData {
  [item: string]: {
    name: string,
    href: string
  }
}

export interface IWordData {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IUserData {
  name?: string;
  email: string;
  password: string;
}

export interface IUserRegData {
  id: string;
  name: string;
  email: string;
}

export interface  IUserRegRequest {
  success?: IUserRegData;
  error?: string;
}

export interface IUserAuthData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IUserAuthRequest {
  success?: IUserAuthData;
  error?: string;
}

export interface INewTokens {
  token: string;
  refreshToken: string;
}

export interface IUserWordData {
  difficulty?: string;
  optional?: {
    isLearned?: boolean;
    isNew?: boolean;
  }
}

// export interface IUserWord {
//   difficulty: string,
//   optional?: {
//     isLearned?: boolean,
//     isNew?: boolean
//   }
//   id?: string;
//   wordId?: string;
// }

export interface IUserWordRequest {
  success?: IUserWordData;
  error?: string;
}

interface Ihistory {
  navigate: any
}

interface ILoginMethod {
  googleAuth: any
}

export const history: Ihistory = {
  navigate: null,
}

export const loginMethod: ILoginMethod = {
  googleAuth: null,
}

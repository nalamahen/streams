export interface IState {
  auth: {
    isSignedIn: boolean;
    userId: string;
  };
  streams: Array<IStream>;
}

export interface IAuthAction {
  type: string;
  payload: string;
}

export interface IStreamAction {
  type: string;
  payload: any;
}

export interface IStream {
  id: string;
  title: string;
  description: string;
  userId: string;
}

import { Machine, assign } from 'xstate';

enum State {
  starting = 'starting',
  loggedOut = 'loggedOut',
  loggedIn = 'loggedIn',
  receivingAuthRedirect = 'receivingAuthRedirect',
}

enum Event {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
  AUTHENTICATE = 'AUTHENTICATE',
  REDIRECT_AUTH = 'REDIRECT_AUTH',
}

enum Action {
  logIn = 'logIn',
  logOut = 'logOut',
  checkAuth = 'checkAuth',
}

enum Service {
  authRedirectHandler = 'authRedirectHandler',
}

interface StateSchema {
  states: {
    [State.starting]: {};
    [State.receivingAuthRedirect]: {};
    [State.loggedOut]: {};
    [State.loggedIn]: {};
  };
}

export interface AuthData {
  userId: string;
  token: string;
}

type EventSchema =
  | { type: Event.LOG_OUT }
  | { type: Event.LOG_IN }
  | { type: Event.AUTHENTICATE; auth: AuthData }
  | { type: Event.REDIRECT_AUTH };

interface ContextSchema {
  auth: AuthData | null;
}

const appMachine = Machine<ContextSchema, StateSchema, EventSchema>({
  id: 'app',
  initial: State.starting,
  strict: true,
  context: {
    auth: null,
  },
  states: {
    [State.starting]: {
      entry: Action.checkAuth,
      on: {
        [Event.LOG_OUT]: State.loggedOut,
        [Event.AUTHENTICATE]: {
          target: State.loggedIn,
          actions: assign({ auth: (_, event) => event.auth }),
        },
        [Event.REDIRECT_AUTH]: State.receivingAuthRedirect,
      },
    },
    [State.receivingAuthRedirect]: {
      invoke: {
        id: 'authRedirectHandler',
        src: Service.authRedirectHandler,
        onDone: {
          target: State.loggedIn,
          actions: assign({ auth: (_, event) => event.data }),
        },
        onError: {
          target: State.loggedOut,
        },
      },
    },
    [State.loggedOut]: {
      on: {
        [Event.LOG_IN]: {
          actions: Action.logIn,
        },
      },
    },
    [State.loggedIn]: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore: Incorrect compiler error
      on: {
        [Event.LOG_OUT]: {
          target: [State.loggedOut],
          actions: [Action.logOut, assign({ auth: null })],
        },
      },
    },
  },
});

export default appMachine;
export type AppMachineContextSchema = ContextSchema;
export type AppMachineEvent = EventSchema;
export type AppMachineStateSchema = StateSchema;
export const AppMachineService = Service;
export const AppMachineAction = Action;
export const AppMachineEvent = Event;
export const AppMachineState = State;

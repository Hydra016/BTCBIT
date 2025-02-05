import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";

export interface UserContextInterface {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  loggedIn: false,
  setLoggedIn: () => {},
} as UserContextInterface;

export const UserContext = createContext<UserContextInterface>(defaultState);

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(defaultState.loggedIn);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true" || loggedIn) {
      router.push("/currencies");
    } else {
      router.push("/");
    }
  }, [loggedIn]);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

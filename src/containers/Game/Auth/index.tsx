import React, { ReactElement, ReactNode } from "react";

type AuthContext = {
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticationLoading: boolean;
  setAuthenticationLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// @ts-ignore
export type AuthContextAuthenticated = (boolean) => void;

export const AuthContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  isAuthenticationLoading: false,
  setAuthenticationLoading: () => {},
});

/**
 * The initial value of `isAuthenticated` comes from the `authenticated`
 * prop which gets set by _app. We store that value in state and ignore
 * the prop from then on. The value can be changed by calling the
 * `setAuthenticated()` method in the context.
 */
export const AuthProvider = ({
  children,
  authenticated,
}: {
  children: ReactNode;
  authenticated: boolean;
}): ReactElement => {
  const [isAuthenticated, setAuthenticated] =
    React.useState<boolean>(authenticated);
  const [isAuthenticationLoading, setAuthenticationLoading] =
    React.useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        isAuthenticationLoading,
        setAuthenticationLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}

export function useAuthenticationLoading() {
  const context = useAuth();
  return context.isAuthenticationLoading;
}

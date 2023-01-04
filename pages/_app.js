import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} /> // this condition will satisfy the onUnauthenticated function
        )}
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true, //only logged in user can access
    onUnauthenticated() {
      router.push("/unauthorized?message=login requried"); // if auth is false then it treat as unauth and for unAuthenticated users we are redirecting and setting the message to login required
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  //if not loading then return children (Children is the Component)
  return children;
}

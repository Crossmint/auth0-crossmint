import Login from "./components/Login";
import Profile from "./components/Profile";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }) {
    const { user, isLoading } = useUser();

    return <div className="container">{(!isLoading && user) ? <Profile /> : <Login />}</div>;
}

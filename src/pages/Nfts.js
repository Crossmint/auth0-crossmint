import Link from "next/link";
import Login from "./components/Login";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CrossmintNFTCollectionView } from "@crossmint/client-sdk-react-ui";

export default function App({ Component, pageProps }) {
    const { user, error, isLoading } = useUser();

    if (!user) return <Login />;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const wallets = [
        {
            chain: "ethereum",
            publicKey: user.wallet.ethereum,
        },
    ];

    return (
        user && (
            <div>
                <div className={"header"}>
                    <div className={"btn-left"}>
                        <Link href="/">
                            <button>Panel</button>
                        </Link>
                        <Link href="/Nfts">
                            <button>NFTs</button>
                        </Link>
                    </div>

                    <Link href="/api/auth/logout">
                        <button className="btn-logout">Log out</button>
                    </Link>
                </div>

                <div style={{ height: "100vh" }}>
                    <CrossmintNFTCollectionView wallets={wallets}/>
                </div>
            </div>
        )
    );
}

import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    let content;
    if (user.wallet == null) {
        content = "Loading...";
    }
    else if (user.wallet.error) {
        content = "Error: " + user.wallet.message;
    }
    else {
        content = JSON.stringify({ ...user.wallet }, null, 2);
    }
    
    return (
        user && (
            <div>
                <div className={"header"}>
                    <Link href="/api/auth/logout">
                        <button className="btn-logout">Log out</button>
                    </Link>
                </div>
                <h2>{user.email}</h2>
                <p>{"Email verified: " + user.email_verified}</p>
                <p>{content}</p>
            </div>
        )
    );
};
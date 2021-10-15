import Head from "next/head";
import { useSession, getSession } from "next-auth/client";
import Header from "../components/Header";

export default function accountSettings({ session }) {
    return (
        <>
            <Head>
                <title>Account settings</title>
            </Head>

            <Header />

            <main>
                <section>
                    <h1>Authenticated</h1>
                </section>
            </main>
        </>
    );
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });

    console.log(session);
    if (session) {
        return {
            props: {
                session,
            },
        };    
    }

    const redirect_url = encodeURIComponent("/account-settings");
    return {
        redirect: {
            destination: `/login?redirect_url=${redirect_url}`,
            permanent: false,
        },
    };
}

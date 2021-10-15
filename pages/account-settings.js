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

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    console.log(session);
    return {
        props: {
            session,
        },
    };
}

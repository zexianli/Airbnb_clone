import Head from "next/head";
import { useSession, getSession } from "next-auth/client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function accountSettings({ session }) {
    return (
        <>
            <Head>
                <title>Account settings</title>
            </Head>

            <Header showSearchBar={"hidden"} />

            <main className="max-w-6xl mx-auto px-8 sm:px-16">
                <section className="pt-10">
                    <h1 className="text-3xl font-bold">Account</h1>
                    <div className="flex flex-row ">
                        <div className="text-lg font-semibold text-gray-900">
                            {session.user.name},
                        </div>
                        <div className="pl-1 font-light text-lg">
                            {session.user.email}
                        </div>
                    </div>
                    

                </section>
            </main>

            <Footer />
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

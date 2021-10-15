import Header from "../components/Header"
import ModalPrompt from "../components/ModalPrompt"
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router"

export default function login() {
    const router = useRouter();
    const { redirect_url } = router.query;

    const url = decodeURIComponent(redirect_url);
    console.log("Login page got the redirect query: ",url);

    return (
        <>
            <Header showSearchBar={"hidden"} ignoreOpenModal={true} />
            <main>
                <section>
                    <ModalPrompt 
                        isOpen={true} 
                        onClose={() => void 0} 
                        hideCloseBtn={true} 
                        bgColor={"bg-white"}
                        hideShadow={true}
                        redirectUrl={url}
                    />
                </section>
            </main>            
        </>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session
        }
    }
}
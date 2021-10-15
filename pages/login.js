import Header from "../components/Header"
import ModalPrompt from "../components/ModalPrompt"
import { useSession, getSession } from "next-auth/client";

export default function login() {
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
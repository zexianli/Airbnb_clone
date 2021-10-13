import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { signIn } from "next-auth/client";
import { useForm } from "react-hook-form";
import Image from "next/image";

function ModalPrompt({ isOpen, onClose }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("The email is: ", data);
    };

    return (
        <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            open={isOpen}
            onClose={onClose}
        >
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div className="text-lg font-medium leading-6 text-gray-900 text-center px-6 py-4 align-middle">
                        <XIcon
                            className="absolute h-6 w-6 m-1 p-1 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer"
                            onClick={onClose}
                        />
                        <Dialog.Title as="h3" className="">
                            Log in or sign up
                        </Dialog.Title>
                    </div>

                    {/* Email and other login methods goes inside this div */}
                    <div className="pt-1 p-6 border-t">
                        <div className="text-lg font-semibold mt-5 mb-4">
                            Welcome to Airbnb
                        </div>

                        <form
                            className="w-full bg-white"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                className={`w-full border rounded-lg p-3 pl-2 
                                        ${
                                            errors.email
                                                ? "outline-none border-red-500 bg-red-50 focus:bg-white focus:border-2"
                                                : ""
                                        }`}
                                type="text"
                                placeholder="Email"
                                {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    },
                                })}
                            />
                            <button className="w-full continue-btn-bg opacity-90 text-white font-semibold rounded-md my-4 py-3">
                                Continue
                            </button>
                        </form>

                        <div className="w-full text-center leading-[0.2rem] mt-[10px] mb-[26px] mx-0 border-b">
                            <span className="bg-white px-6 text-gray-500">
                                or
                            </span>
                        </div>

                        <button
                            onClick={() => signIn("google")}
                            className="w-full border-2 rounded-lg hover:border-black"
                        >
                            <div className="flex w-full p-3 pl-2">
                                <Image
                                    src="/google.svg"
                                    width={24}
                                    height={24}
                                    className="flex-initial"
                                />
                                <p className="flex-1 text-center font-medium text-gray-600">
                                    Continue with Google
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default ModalPrompt;

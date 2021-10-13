import Image from "next/image";
import {
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
    XIcon,
} from "@heroicons/react/solid";
import React, { useState, Fragment } from "react";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/client";
import { signOut } from "next-auth/client";
import { useIsMounted } from "./useIsMounted";
import ModalPrompt from "./ModalPrompt";

function Header({ placeHolder }) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();
    const [session, loading] = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMounted = useIsMounted();
    const [datePickerClosed, setDatePickerClosed] = useState(true);

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    const resetInput = () => {
        setSearchInput("");
    };

    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            },
        });
        setSearchInput("");
    };

    const onSubmit = (data) => {
        console.log("The state is: ", isModalOpen);
    };

    return (
        <header
            className="sticky top-0 z-50 
            grid grid-cols-3 bg-white shadow-md 
            p-5 md:px-10 lg:px-24 xl:px-96"
        >
            {/* Left */}
            <div
                onClick={() => router.push("/")}
                className="relative flex items-center h-10 cursor-pointer my-auto"
            >
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                    href="/"
                />
            </div>

            {/* Middle */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onClick={() => setDatePickerClosed(false)}
                    className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
                    type="text"
                    placeholder={placeHolder || "Start your search"}
                />

                <SearchIcon
                    className="hidden md:inline-flex h-8 
                bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
                />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500 hover:cursor-pointer">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button 
                            className="relative flex items-center space-x-2 border-2 p-2 rounded-full" 
                            onMouseDown={() => setDatePickerClosed(true)}
                        >
                            <MenuIcon className="h-6 cursor-pointer" />
                            {session ? (
                                <div className="h-6 ml-2">
                                    <Image
                                        src={session.user.image}
                                        height={24}
                                        width={24}
                                        className="rounded-full"
                                    />
                                </div>
                            ) : (
                                <UserCircleIcon className="h-6 cursor-pointer" />
                            )}
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-50"
                        enterFrom="transform opacity-0 scale-100"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-25"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-100"
                    >
                        <Menu.Items
                            className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg text-black
                            bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                        >
                            <div className="py-1">
                                {!session ? (
                                    <>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200": ""} 
                                                        menu-item font-semibold`}
                                                    onClick={() => {
                                                        setIsModalOpen(true); 
                                                        setDatePickerClosed(true);
                                                    }}
                                                >
                                                    Log In
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200": ""} 
                                                        menu-item`}
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setDatePickerClosed(true);
                                                    }}
                                                >
                                                    Sign up
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </>
                                ) : (
                                    <>
                                        <Menu.Item disabled>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200" : ""} 
                                                        menu-item font-semibold`}
                                                >
                                                    Messages
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item disabled>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200" : ""} 
                                                        menu-item font-semibold`}
                                                >
                                                    Notifications
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item disabled>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200" : ""} 
                                                        menu-item font-semibold`}
                                                >
                                                    Trips
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item disabled>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200" : ""} 
                                                        menu-item font-semibold`}
                                                >
                                                    Wishlists
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </>
                                )}
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            className={`
                                                ${active ? "bg-gray-200" : ""} 
                                                menu-item font-light`}
                                        >
                                            Host your home
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            className={`
                                                ${active ? "bg-gray-200" : ""} 
                                                menu-item`}
                                        >
                                            Host an experience
                                        </a>
                                    )}
                                </Menu.Item>
                                {!session ? (
                                    <>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200" : ""} 
                                                        menu-item`}
                                                >
                                                    Help
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </>
                                ) : (
                                    <>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200" : ""} 
                                                        menu-item`}
                                                >
                                                    Refer a Host
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    className={`
                                                        ${active ? "bg-gray-200" : ""} 
                                                        menu-item`}
                                                >
                                                    Account
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </>
                                )}
                            </div>
                            {session && (
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                className={`
                                                    ${active ? "bg-gray-200" : ""} 
                                                    menu-item`}
                                            >
                                                Help
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <p
                                                className={`
                                                    ${session ? "" : "hidden"}
                                                    ${active ? "bg-gray-200" : ""} 
                                                    menu-item`}
                                                onClick={signOut}
                                            >
                                                Log out
                                            </p>
                                        )}
                                    </Menu.Item>
                                </div>
                            )}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>

            {(searchInput && !isModalOpen && !datePickerClosed) && (
                <div className="flex flex-col col-span-3 mx-auto mt-3">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                        staticRanges={[]}
                        inputRanges={[]}
                        months={2}
                        direction="horizontal"
                    />

                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">
                            Number of Guests
                        </h2>

                        <UsersIcon className="h-5" />

                        <input
                            value={noOfGuests}
                            onChange={(e) => setNoOfGuests(e.target.value)}
                            type="number"
                            min={1}
                            className="w-12 pl-2 text-lg outline-none text-red-400"
                        />
                    </div>

                    <div className="flex">
                        <button
                            onClick={resetInput}
                            className="flex-grow text-gray-500"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={search}
                            className="flex-grow text-red-400"
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}

            {isMounted() && (
                <ModalPrompt isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
            
        </header>
    );
}

export default Header;

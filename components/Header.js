import Image from "next/image";
import { 
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
    XIcon
} from '@heroicons/react/solid';
import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";
import { Dialog, Menu, Transition } from "@headlessui/react";


function Header({placeHolder}) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }

    const resetInput = () => {
        setSearchInput("");
    }

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
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <header className="sticky top-0 z-50 
            grid grid-cols-3 bg-white shadow-md 
            p-5 md:px-10 lg:px-24 xl:px-96">
            {/* Left */}
            <div onClick={() => router.push("/")} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Middle */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400" 
                    type="text" 
                    placeholder={placeHolder || "Start your search"}
                />
                
                <SearchIcon className="hidden md:inline-flex h-8 
                bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500 hover:cursor-pointer">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="relative flex items-center space-x-2 border-2 p-2 rounded-full">
                            <MenuIcon className="h-6 cursor-pointer"/>
                            <UserCircleIcon className="h-6 cursor-pointer"/>
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
                            bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <p 
                                            className={`${
                                                active ? "bg-gray-200" : ""
                                                } block px-4 py-2 text-m font-semibold`}
                                            onClick={() => {setIsModalOpen(!isModalOpen); console.log("Log in clicked")}}
                                        >
                                            Sign up
                                        </p>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a 
                                            href=""
                                            className={`${
                                                active ? "bg-gray-200" : ""
                                                } block px-4 py-2 text-m`}
                                        >
                                            Log in
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a 
                                            href=""
                                            className={`${
                                                active ? "bg-gray-200" : ""
                                                } block px-4 py-2 text-m`}
                                        >
                                            Host your home
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a 
                                            href=""
                                            className={`${
                                                active ? "bg-gray-200" : ""
                                                } block px-4 py-2 text-m`}
                                        >
                                            Host an experience
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a 
                                            href=""
                                            className={`${
                                                active ? "bg-gray-200" : ""
                                                } block px-4 py-2 text-sm`}
                                        >
                                            Help
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>

            {searchInput && (
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
                        <button onClick={resetInput} className="flex-grow text-gray-500">
                            Cancel
                        </button>
                        
                        <button onClick={search} className="flex-grow text-red-400">
                            Search
                        </button>
                    </div>
                </div>
            )}

            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
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
                                onClick={() => setIsModalOpen(false)}
                            />
                            <Dialog.Title
                                as="h3"
                                className=""
                            >
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
                                    className={`w-full border rounded-md p-3 pl-2 
                                        ${errors.email ? "outline-none border-red-500 bg-red-50 focus:bg-white focus:border-2" : ""}`}
                                    type="text" 
                                    placeholder="Email"
                                    {...register("email", { 
                                        required: true, 
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                        }
                                    })}
                                />
                                <button className="w-full continue-btn-bg opacity-90 text-white font-semibold rounded-md my-4 py-3">
                                    Continue
                                </button>
                            </form>

                            <div className="horizontal-line-parent border-b">
                                <span className="bg-white px-6 text-gray-500">or</span>
                            </div>

                            <div className="">
                                <div>continue with google</div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            
        </header>
    )
}

export default Header

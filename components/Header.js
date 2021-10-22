import Image from 'next/image';
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/solid';
import React, { useState, Fragment } from 'react';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';
import { Menu, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/client';
import { signOut } from 'next-auth/client';
import { useIsMounted } from './useIsMounted';
import ModalPrompt from './ModalPrompt';

function Header({ placeHolder, showSearchBar, ignoreOpenModal }) {
  const [searchInput, setSearchInput] = useState('');
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
    key: 'selection',
  };

  const resetInput = () => {
    setSearchInput('');
  };

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
    setSearchInput('');
  };

  const onSubmit = (data) => {
    console.log('The state is: ', isModalOpen);
  };

  return (
    <header
      className="sticky top-0 z-50 
            grid grid-cols-3 bg-white shadow-md 
            p-5 sm:px-6 md:px-8 lg:px-12 xl:px-72 h-24"
    >
      {/* Left */}
      <div
        className="relative flex items-center h-10 my-auto"
        draggable="false"
      >
        <a
          className="relative flex-initial cursor-pointer w-full h-full text-[0px]"
          onClick={() => router.push('/')}
          href="/"
        >
          Airbnb
          <img
            src="/airbnb.svg"
            alt="airbnb logo"
            draggable="false"
            className="h-full w-full object-contain object-left"
          />
        </a>
      </div>

      {/* Middle */}
      <div
        className={
          showSearchBar ||
          'flex items-center md:border-2 rounded-full py-2 md:shadow-sm'
        }
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onClick={() => setDatePickerClosed(false)}
          className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeHolder || 'Start your search'}
        />

        <SearchIcon
          className="hidden md:inline-flex h-8 
                    bg-[#FF5A5F] text-white rounded-full p-2 cursor-pointer md:mx-2"
        />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500 hover:cursor-pointer col-start-3">
        <button
          className="hidden md:inline cursor-pointer"
          onClick={() => console.log('Become a host')}
        >
          <a href="/become-a-host/intro">Become a host</a>
        </button>
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
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item font-semibold`}
                          onClick={() => {
                            ignoreOpenModal ? void 0 : setIsModalOpen(true);
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
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item`}
                          onClick={() => {
                            ignoreOpenModal ? void 0 : setIsModalOpen(true);
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
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item-login`}
                        >
                          Messages
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item disabled>
                      {({ active }) => (
                        <a
                          className={`
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item-login`}
                        >
                          Notifications
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item disabled>
                      {({ active }) => (
                        <a
                          className={`
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item-login`}
                        >
                          Trips
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item disabled>
                      {({ active }) => (
                        <a
                          className={`
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item-login`}
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
                        ${active ? 'bg-gray-200' : ''} 
                        menu-item`}
                      href="/become-a-host/intro"
                    >
                      Host your home
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`
                        ${active ? 'bg-gray-200' : ''} 
                        menu-item hover:cursor-not-allowed`}
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
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item hover:cursor-not-allowed`}
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
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item hover:cursor-not-allowed`}
                        >
                          Refer a Host
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item`}
                          onClick={() => router.push('/account-settings')}
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
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item hover:cursor-not-allowed`}
                      >
                        Help
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        className={`
                            ${session ? '' : 'hidden'}
                            ${active ? 'bg-gray-200' : ''} 
                            menu-item`}
                        onClick={() =>
                          signOut({ callbackUrl: `${window.location.origin}` })
                        }
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

      {searchInput && !isModalOpen && !datePickerClosed && (
        <div className="flex flex-col col-span-3 mx-auto mt-3 bg-white">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
            staticRanges={[]}
            inputRanges={[]}
            months={2}
            direction="horizontal"
          />

          <div className="flex items-center border-b mb-2">
            <h2 className="text-2xl flex-grow font-semibold ml-2">
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

          <div className="flex mb-2">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>

            <button onClick={search} className="flex-grow text-red-400 mb-2">
              Search
            </button>
          </div>
        </div>
      )}

      {isMounted() && (
        <ModalPrompt
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;

import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect, useState } from "react";
import useStore from "@/store";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const authContext = useContext(AuthContext);

  const [name, setName] = useState("");

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");

    authContext.setAuthState({
      access_token: "",
    });

    router.push("/login");
  }
  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  const [searchedUser, updateSearchedUser] = useStore((state) => [
    state.searchedUser,
    state.updateSearchedUser,
  ]);

  const searchUser = useStore((state) => state.searchUser);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await searchUser(searchedUser);
      router.push(`/search`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24">
      <div class="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
        <ul class="flex items-center hidden space-x-8 lg:flex">
          <li>
            <a
              href="/home"
              aria-label="Our product"
              title="Our product"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/listrooms"
              aria-label="Our product"
              title="Our product"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Trip List
            </a>
          </li>
          <li>
            <a
              href="/friends"
              aria-label="Product pricing"
              title="Product pricing"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Friends
            </a>
          </li>
          <li>
            <form class="flex items-center" onSubmit={handleSubmit}>
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search friends"
                  onChange={(e)=>{
                    updateSearchedUser(e.currentTarget.value)
                  }}
                  value={searchedUser}
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </li>
        </ul>
        <a
          href="/home"
          aria-label="Company"
          title="Company"
          class="inline-flex items-center lg:mx-auto"
        >
          <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            IMPROMPTU
          </span>
        </a>
        <ul class="flex items-center hidden ml-auto space-x-8 lg:flex">
          <li>
            <Link
              href="#"
              aria-label="Product pricing"
              title="Product pricing"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-300"
            >
              Hi, {name}
            </Link>
          </li>
          <li>
            <a
              href="/"
              class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </a>
          </li>
        </ul>
        <div class="ml-auto lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-50">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href="/home"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <svg
                        className="w-8 text-teal-300"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                      >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                      </svg>
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Company
                      </span>
                    </Link>
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                      <li>
                        <Link
                          href="/home"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-300"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/listrooms"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-300"
                        >
                          My Room
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/friends"
                          aria-label="Product pricing"
                          title="Product pricing"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-300"
                        >
                          Friends
                        </Link>
                      </li>
                    </ul>
                    <div className="w-[25%]">
                      <form onSubmit={handleSubmit()}>
                        <label
                          for="default-search"
                          class="mb-2 text-sm font-medium text-gray-900 sr-only"
                        >
                          Search
                        </label>
                        <div class="relative">
                          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              aria-hidden="true"
                              class="w-5 h-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              ></path>
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="default-search"
                            class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                            placeholder="Find Your Friends"
                            name="searchedUser"
                            value={searchedUser}
                            onChange={(e) => {
                              updateSearchedUser(e.currentTarget.value);
                            }}
                          />
                          <button
                            type="submit"
                            class="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                      <li>
                        <Link
                          href="/friends"
                          aria-label="Product pricing"
                          title="Product pricing"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-300"
                        >
                          Hi, {name}
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-300 hover:bg-teal-500 focus:shadow-outline focus:outline-none"
                          aria-label="Sign up"
                          title="Sign up"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                    <div className="lg:hidden">
                      <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        onClick={() => setIsMenuOpen(true)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                          />
                          <path
                            fill="currentColor"
                            d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                          />
                          <path
                            fill="currentColor"
                            d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                          />
                        </svg>
                      </button>
                      {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full z-50">
                          <div className="p-5 bg-white border rounded shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <Link
                                  href="/home"
                                  aria-label="Company"
                                  title="Company"
                                  className="inline-flex items-center"
                                >
                                  <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                                    IMPROMPTU
                                  </span>
                                </Link>
                              </div>
                              <div>
                                <button
                                  aria-label="Close Menu"
                                  title="Close Menu"
                                  className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <svg
                                    className="w-5 text-gray-600"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <nav>
                              <ul className="space-y-4">
                                <li>
                                  <Link
                                    href="/home"
                                    aria-label="Our product"
                                    title="Our product"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-300"
                                  >
                                    Home
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/listrooms"
                                    aria-label="Our product"
                                    title="Our product"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-300"
                                  >
                                    My Room
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/friends"
                                    aria-label="Product pricing"
                                    title="Product pricing"
                                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-teal-300"
                                  >
                                    Friends
                                  </Link>
                                </li>
                                <li>
                                  <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                    aria-label="Sign up"
                                    title="Sign up"
                                  >
                                    Log out
                                  </button>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

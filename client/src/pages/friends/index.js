import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavbarLogin";
import ListFriends from "@/components/ListFriends";
import useStore from "@/store";

export default function index() {
    return (
        <div>
            <Navbar />
            {/* <div className=" absolute z-20">
                <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 p-4">
                        <Typography variant="h5" color="blue-gray">
                            Sidebar
                        </Typography>
                    </div>
                    <List>
                        <ListItem>
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            E-Commerce
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <InboxIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Inbox
                            <ListItemSuffix>
                                <Chip
                                    value="14"
                                    size="sm"
                                    variant="ghost"
                                    color="blue-gray"
                                    className="rounded-full"
                                />
                            </ListItemSuffix>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Card>
            </div> */}

            <div className="flex justify-between mx-32">
                <div>
                    <h1 className="text-start mb-2 font-bold text-xl mt-2">
                        Your Friends
                    </h1>
                </div>
            </div>
            {/* <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                <div className="flex flex-col  sm:text-center sm:mb-0">
                    <div className="max-w-xl mb-10 md:mx-auto sm:items-center sm:text-center lg:max-w-2xl md:mb-12">
                        <h2 className="max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto text-center">
                            Add friend
                        </h2>
                    </div>
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16 p-10 md:p-0"
                        >
                            <input
                                placeholder="wika silo"
                                required
                                type="text"
                                name="tripName"
                                value={friend}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto hover:text-deep-purple-900 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700  focus:shadow-outline focus:outline-none"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div> */}
            <ListFriends />
        </div>
    );
}

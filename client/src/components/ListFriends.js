import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
} from "@material-tailwind/react";
import useStore from "@/store";
import { useRouter } from "next/router";

export default function ListFriends() {
    const router = useRouter();
    const path = router.pathname;

    // const { friends, updateFriends } = useStore();
    const { friends, updateFriends } = useStore();
    const removeFriend = useStore((state) => state.removeFriend);
    const fetchFriends = useStore((state) => state.fetchFriends);
    // const friends = useStore((state) => state.friends)
    useEffect(() => {
        fetchFriends()
        const fetchData = async () => {
            try {
                const fetchResult = await fetchFriends();
                updateFriends(fetchResult);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="m-16 flex justify-center items-center gap-20">
                {friends ? (
                    friends.map((friend) => (
                        <Card className="w-72" key={friend.id}>
                            <CardHeader floated={false} className="h-56">
                                <img
                                    src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${friend.name}`}
                                    alt="profile-picture"
                                />
                            </CardHeader>
                            <CardBody className="text-center px-20">
                                <Typography
                                    variant="h4"
                                    color="blue-gray"
                                    className="mb-2"
                                >
                                    {friend.name}
                                </Typography>
                                <Typography
                                    color="blue"
                                    className="font-medium"
                                    textGradient
                                >
                                    {friend.address}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        removeFriend(`${friend._id}`);
                                        fetchFriends()
                                    }}
                                >
                                    Unfriend
                                </Button>
                            </CardBody>
                            <CardFooter className="flex justify-center gap-7 pt-2">
                                <Tooltip content="Like">
                                    <Typography
                                        as="a"
                                        href="#facebook"
                                        variant="lead"
                                        color="blue"
                                        textGradient
                                    >
                                        <i className="fab fa-facebook" />
                                    </Typography>
                                </Tooltip>
                                <Tooltip content="Follow">
                                    <Typography
                                        as="a"
                                        href="#twitter"
                                        variant="lead"
                                        color="light-blue"
                                        textGradient
                                    >
                                        <i className="fab fa-twitter" />
                                    </Typography>
                                </Tooltip>
                                <Tooltip content="Follow">
                                    <Typography
                                        as="a"
                                        href="#instagram"
                                        variant="lead"
                                        color="purple"
                                        textGradient
                                    >
                                        <i className="fab fa-instagram" />
                                    </Typography>
                                </Tooltip>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p>Loading friends...</p>
                )}
            </div>
        </>
    );
}

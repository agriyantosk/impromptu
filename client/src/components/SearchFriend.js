import useStore from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";

export default function SearchFriend() {
  const [searchResult] = useStore((state) => [state.searchResult]);
  const addFriend = useStore((state) => state.addFriend);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (searchResult) {
      setLoading(false);
    }
    console.log(searchResult);
  }, [searchResult]);
  return (
    <>
      <div className="m-16 flex justify-center items-center gap-20">
        {searchResult.length > 0 && !loading ? (
          searchResult.map((searchResult, index) => (
            <Card className="w-72" key={searchResult._id}>
              <CardHeader floated={false} className="h-56">
                <img src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${searchResult.name}`} />
              </CardHeader>
              <CardBody className="text-center px-20">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {searchResult.name}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {searchResult.address}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    addFriend(`${searchResult._id}`);
                  }}
                >
                  Add Friend
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
        ) : loading ? (
          <p>Loading friends...</p>
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </>
  );
}

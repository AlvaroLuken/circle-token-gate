import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function HasNotPaid() {
  const router = useRouter();
  const [route, setRoute] = useState();
  const { address, isConnected, isDisconnected } = useAccount();
  // useEffect(() => {
  //   if (isConnected) {
  //     router.push("/secretrecipe");
  //   } else {
  //     console.log("hello?");
  //     router.push("/");
  //   }
  // }, []);
  return (
    <>
      <Heading color="white"> YOU HAVE TO PAY 10 $USDC! </Heading>
    </>
  );
}

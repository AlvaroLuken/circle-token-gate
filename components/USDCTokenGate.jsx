import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function USDCTokenGate() {
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
      {/* {isConnected ? <SecretComponent /> : <PublicComponent />} */}
      {/* <Input placeholder="Basic usage" /> */}
      {/* <Heading color="white">{address}</Heading> */}
      {/* <SecretRecipe /> */}
    </>
  );
}

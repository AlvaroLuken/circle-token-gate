const { Alchemy, Network, AssetTransfersCategory } = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your desired network.
};

const alchemy = new Alchemy(settings);

export default async function handler(req, res) {
  const requestMethod = req.method;
  const body = JSON.parse(req.body);
  const { userAddress } = body;
  console.log(userAddress);
  const totalTokensSent = await getAmountTokensSent(userAddress);
  switch (requestMethod) {
    case "POST":
      if (totalTokensSent >= 1) {
        res.status(200).json({ message: "Krabby Patty Secret Formula! 🍔" });
      } else {
        res
          .status(200)
          .json({ message: "Please pay $10 USDC to see this content!" });
      }
  }
}

async function getAmountTokensSent(userAddress) {
  const getTransfers = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: "latest",
    fromAddress: userAddress,
    toAddress: "0x2c8645BFE28BEEb6E19843eE9573b7539DD5B530",
    excludeZeroValue: true,
    category: [AssetTransfersCategory.ERC20],
  });
  let totalTransferValue = 0;
  getTransfers["transfers"].forEach((tx) => {
    totalTransferValue += tx.value;
  });
  return totalTransferValue;
}

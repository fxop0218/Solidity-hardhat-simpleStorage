require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */
const goerli_url_network = process.env.GOERLI_RPC_URL
const private_key = process.env.PRIVATE_KEY
const ethscan_api_key = process.env.ETHERSCAN_API_KEY

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: goerli_url_network,
            accounts: [private_key],
            chainId: 5, // https://goerli.net/ to check
        },
    },
    etherscan: {
        apiKey: ethscan_api_key,
    },
    solidity: "0.8.17",
    // The default network is hardhad
}

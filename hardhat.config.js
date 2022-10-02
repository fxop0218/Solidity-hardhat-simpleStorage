require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block_number")
require("hardhat-gas-reporter")
require("solidity-coverage") // yarn hardhat coverage to run the code

/** @type import('hardhat/config').HardhatUserConfig */
const goerli_url_network =
    process.env.GOERLI_RPC_URL || "https://eth-goerli/exemple"
const private_key = process.env.PRIVATE_KEY || "0xkey"
const ethscan_api_key = process.env.ETHERSCAN_API_KEY | "key"
const coinmarketcap_api_key = process.env.COINMARKETCAP_API_KEY | "key"

module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.17",
    networks: {
        goerli: {
            url: goerli_url_network,
            accounts: [private_key],
            chainId: 5, // https://goerli.net/ to check
        },
        // yarn hardhat node ==> this is hardhat localnet but its not the same as the default herdhat localnet
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
            // acounts ==> puted automatically
        },
    },
    etherscan: {
        apiKey: ethscan_api_key,
    },
    // The default network is hardhad
    gasReporter: {
        enabled: true, // Show gas reporter dt when run test
        outputFile: "gas-reporter.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: coinmarketcap_api_key,
    },
}

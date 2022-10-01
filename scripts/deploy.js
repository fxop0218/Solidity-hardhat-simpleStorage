const { ethers, run, network } = require("hardhat")

// async Main function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`Deployed contract to : ${simpleStorage.address}`)
    // Don't verify if it is localnetwork
    console.log(network.config.chainId)
    if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(5)
        await verify(simpleStorage.address, [])
    }
    const currentVal = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentVal}`)

    // Update current val

    const transactionResponse = await simpleStorage.store(10)
    await transactionResponse.wait(1)
    const updatedVal = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedVal}`)
}

// Auto verificate contracts when they are deployed
async function verify(contractAddress, args) {
    console.log("Verifying contract")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        }) // Do the same has the yarn hardhat --verify
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

// Main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

//https://api-goerli.etherscan.io/

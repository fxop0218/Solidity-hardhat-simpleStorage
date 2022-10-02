const { assert } = require("chai")
const { ethers } = require("hardhat")

// The same
//describe("SimpleStorage",  () => {})

describe("SimpleStorage", function () {
    let simpleStorage, simpleStorageFac
    beforeEach(async function () {
        simpleStorageFac = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFac.deploy()
    })

    it("Should start with favorite number = 0", async function () {
        const expectedVal = "0"
        const currentValue = await simpleStorage.retrieve()
        // Asset asset and expect do the same but the syntax its diferent
        assert.equal(expectedVal, currentValue.toString())
        //expect(currentValue.toString().to.equal(expectedVal))
    })

    it("should change the value to 10", async function () {
        const expectedVal2 = "10"
        const tranasactionResponse = await simpleStorage.store(10)
        tranasactionResponse.wait(1)

        const currentVal2 = await simpleStorage.retrieve()
        assert.equal(expectedVal2, currentVal2.toString())
    })
})

const {ehters} = require("hardhat")
const {expect , assert} = require("chai")
// mocha 가 recognize하는 용도
describe("SimpleStorage", function(){
    let simpleStorageFactory, simpleStorage
    // beforeEach & it 는 pair
    beforeEach(async function(){
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
        
    })
    it("Should start with a favorite number of 0", async function(){
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Sould Update when we call store", async function(){
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
        
    })
})
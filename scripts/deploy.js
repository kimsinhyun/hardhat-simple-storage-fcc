//imports
const { ethers } = require("hardhat")

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract")
  const simpleStorage = SimpleStorageFactory.deploy()
  await (await simpleStorage).deployed()
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

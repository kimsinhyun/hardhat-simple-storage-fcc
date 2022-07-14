//imports
const { ethers, run, network } = require("hardhat")
// require("dotenv").config()
// require("@nomiclabs/hardhat-etherscan")

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log(`SimpleStorageFactory is ${SimpleStorageFactory}`)
  console.log("Deploying contract")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`simpleStorage address is ${simpleStorage.address}`)
  //hardhat network(local)에는 etherscan이 없으므로 local에서는 verify하지 않도록
  if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
    //etherscan에서 6개의 block이 mining된 후 검증되도록 delay
    // await simpleStorage.deployTransaction.wait(6)
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }
  const currenValue = await simpleStorage.retrieve()
  console.log(`CurrenValue is ${currenValue}`)

  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is ${updatedValue}`)
}

async function verify(contractAddress, args){
  console.log("Verifying contract...")
  // 이미 verify됐을 경우 에러
  try{
    await run("verify:verify",{
      address: contractAddress,
      constructArguments: args
    })
  } catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Already verified!")
    }
    else{
      console.log(e)
    }
  }
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

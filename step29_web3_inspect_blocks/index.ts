import { InspectBlocks } from './inspectBlocks';

const blocks : InspectBlocks = new InspectBlocks();

// get latest block number
blocks.getBlockNumber().then((res)=>console.log('latest Block Number -------',res))

// you can also write the block number or hash of the block to get info about a block

// I am only logging the block hash here. Feel free to log other info about the block
blocks.fetchBlock('latest').then((res)=>console.log('Block hash -------',res.hash))

// get latest 10 blocks
blocks.getBlockNumber().then((latest)=>{
    for (let i=0; i< 10; i++){
        blocks.fetchBlock(latest-i).then((block)=>console.log(block.number))
    }
})


// number of transaction in a block
blocks.getBlockTransactionCount('latest').then((res)=>console.log('Block transaction count -------',res))

// get a particular transaction from a block. In this case we are getting the 3rd transaction from the latest block (transactions' index start from 0)
blocks.getTransactionFromBlock('latest',2).then((res)=>console.log('Transaction info -------',res))

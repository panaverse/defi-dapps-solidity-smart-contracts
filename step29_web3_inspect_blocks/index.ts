import { EthNetwork } from "./EthNetwork";

(async () => {
  const network = new EthNetwork();

  console.log("Latest Block Number:", await network.getLatestBlockNumber());

  const blockNumber = 13101095;
  const block = await network.getBlock(blockNumber);
  // I am only logging the block hash here.
  // Feel free to log other info about the block
  console.log(`Block Hash of Block #${blockNumber}:`, block.hash);

  console.log(
    `Number of Txns in Block #${blockNumber}:`,
    await network.getBlockTransactionCount(blockNumber)
  );

  console.log(
    `First Transaction in Block #${blockNumber}:`,
    (await network.getTransactionFromBlock(0, blockNumber)).hash
  );

  console.log("Number of Transactions in 10 Latest Blocks:");
  (await network.getLatestXBlocks()).forEach(block => {
    console.log(`Block Number ${block.number} ==>`, block.transactions.length);
  });
})();

const LearningSolidity = artifacts.require("LearningSolidity.sol");

contract("LearningSolidity", ()=> {
    it("Should Return Result", async () => {
        const contract = await LearningSolidity.new();
        const data = await contract.getResult();
        assert(data.toString() === "24");
    });
    it("Should Return a Block Number", async () => {
        const contract = await LearningSolidity.new();
        const data = await contract.getBlockNumber();
        assert(Number.isInteger(data.toNumber()));
    });

});
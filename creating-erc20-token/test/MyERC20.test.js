const MyERC20 = artifacts.require("MyERC20");

contract("MyERC20", ()=> {
    it("Should have 1million tokens in totalsupply", async () => {
        const contract = await MyERC20.new();
        const data = await contract.totalSupply();
        assert(data.toString() === "1000000");
    });
    // it("Should Return a Block Number", async () => {
    //     const contract = await LearningSolidity.new();
    //     const data = await contract.getBlockNumber();
    //     assert(Number.isInteger(data.toNumber()));
    // });

});
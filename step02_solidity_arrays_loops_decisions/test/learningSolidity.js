const LearningSolidity = artifacts.require("LearningSolidity.sol");

contract("LearningSolidity", ()=> {
    it("Should Return Result", async () => {
        const contract = await LearningSolidity.new();
        const data = await contract.sum();
        assert(data.toString() === "9");
    });
    it("Test Array", async () => {
        const contract = await LearningSolidity.new();
        const data = await contract.testArray();
        assert(data);
    });

});
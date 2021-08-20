const DataLocationTest = artifacts.require("DataLocationTest.sol");

contract("DataLocationTest", ()=> {
    it("Should Run", async () => {
        const contract = await DataLocationTest.new();
        await contract.foo();
        //assert(data.toString() === "24");
    });
    

});
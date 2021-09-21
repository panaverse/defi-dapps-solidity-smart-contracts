const LearningSolidity = artifacts.require("LearningSolidity.sol");

contract("LearningSolidity", ()=> {
    it("Should Return name empty string initially", async () => {
        const contract = await LearningSolidity.new();
        const data = await contract.getName();
        assert(data.toString() === "");
    });
    it("Should Return name Mateen Mustafa if setName is called with isAdmin=true", async () => {
        const contract = await LearningSolidity.new();
        await contract.setName("Mateen Mustafa",true);
        const data = await contract.getName();
        assert(data.toString() === "Mateen Mustafa");
    });

    it("Should Return old name if setName is called with isAdmin=false", async () => {
        const contract = await LearningSolidity.new();
        await contract.setName("Mateen Mustafa",true);
        await contract.setName("Sameer Mustafa",false);
        const data = await contract.getName();
        assert(data.toString() === "Mateen Mustafa");
    });

});
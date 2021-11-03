# Gnosis Safe and Mutisig Authorization

The [amount secured by Gnosis Safe](https://gnosis-safe.io/security/)

This is a security design pattern. 

[Tutorial: How to create a Gnosis Safe](https://rabbithole.mirror.xyz/mYzUhywjEIN_vr0kklEdi2w2WJrkhciuAPE5Dgqt_DE)

[Multisig transactions with Gnosis Safe](https://medium.com/gauntlet-networks/multisig-transactions-with-gnosis-safe-f5dbe67c1c2d)


[Read the Multi Authorization Discussion from this article](https://hackernoon.com/solidity-tutorial-understanding-design-patterns-part-1)

[Also review this code](https://github.com/christianlundkvist/simple-multisig/blob/master/contracts/SimpleMultiSig.sol)


[Read this documentation](https://docs.gnosis-safe.io/introduction/the-programmable-account/assets-on-ethereum)

Gnosis Safe has also become the de facto standard for DAO treasury management, as it combines the security of a multisig with easy access to DeFi applications. 

As these communities grow in membership, their treasuries expand as well. The ten largest DeFi protocol DAOs manage $15B in assets! Leaving this capital locked in a vault to collect dust is far from optimal so DAOs have been exploring options to earn yield on their idle assets. Gnosis Safe has emerged as the go-to multisig wallet for DAOs because of its security and how seamlessly it can connect protocols to DeFi yield opportunities.

Once we have learned to make DAO's we will also learn how to integrate DAO management with Mutisig technology.

Snapshot was launched with the intention to replace on-chain governance voting due to Ethereum’s excessive gas fees, which deterred governance token holders from casting their votes. Since then, Snapshot voting became the standard for most of the leading DeFi projects.

Together, Snapshot and Gnosis have developed the SafeSnap tool, which, in their words, turned the Gnosis Safe multisig wallet into an “operating system for DAOs”. Several high-profile DeFi protocols including Yearn, SushiSwap, Synthetix, and Balancer have already announced to adopt the SafeSnap tool.

[Introducing SafeSnap: The first in a decentralized governance tool suite for the Gnosis Safe](https://blog.gnosis.pm/introducing-safesnap-the-first-in-a-decentralized-governance-tool-suite-for-the-gnosis-safe-ea67eb95c34f)


[DAO management with a MultiSig](https://help.aragon.org/article/100-dao-management-with-multisig)


[Integrate Gnosis Safe into a DAO framework](https://github.com/gnosis/zodiac/issues/6)


[Utopia Labs is building an operating system for DAOs](https://techcrunch.com/2021/10/01/utopia-labs-is-building-an-operating-system-for-daos/)


Some people are suggesting that we can start a DAO in four steps:

1. Create a token using a Mirror crowdfund.
2. Store funds in a Gnosis Safe multi-sig.
3. Setup a Snapshot space for governance.
4. Make a Discord with token-gated access.

All of which is free to use (minus gas).



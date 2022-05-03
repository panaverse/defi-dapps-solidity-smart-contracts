# Project 05 Create 1155 NFT Project and Deploy on OpenSea


We will follow below steps:

1) Provide INFURA Key and RINKEBY key in .env file
2) Create your art images and place them in `assets` folder
3) Create Account on Pinata
4) Upload your NFT images or Art work on Pinata
5) Add metadata json files in metadata folder, json file names should be like 0.json, 1.json, 2.json
6) Upload complete matadata folder on Pinata
7) Update script/deploy.ts
8) Compile and Deploy NFT Contract
9) Mint NFT
10) Add your NFT on Opensea Testnet


### 1) Provide INFURA Key and RINKEBY key in .env file
Provide values to following keys<br>
INFURA_KEY<br>
RINKEBY_PRIVATE_KEY<br>

### 2) Create your art images and place them in `assets` folder
Create yoru art images with unique featuers and place them in `assets` folder. Name of image file is important as we will use these name in our metadata. Therefore in our example we are using pattern like `01_triangle_light_yellow.png`, `01` to keep files in sequence and any name after that. <br/>
You can also use names like '0.png', '1.png', '2.png'

### 3) Create Account on Pinata
We will use [Pinata](https://www.pinata.cloud/) to upload images on IPFS

### 4) Upload your NFT images or Art work on Pinata
Once you upload your complete folder in Pinata it will give CID/Hash. And you can access your file like `ipfs://Hash/File Name in your folder`<br>
In our case `ipfs://QmfFDBWoVQc1X5Lzdqv9XsbzdrHtvp4uAHNjqJq1gPqcNV/01_triangle_light_yellow.png`<br>
We will need this CID/hash in `Step 5` <br/>
For more deatil review readme of [03 NFT Project](https://github.com/zeeshanhanif/defi-projects/tree/main/03_NFT_Project)

### 5) Add metadata json files in metadata folder
In metadata folder and json files like 0.json, 1.json, 2.json <br/>
Each file contains following properties
```JS
{
    "name": "Triangle",
    "description": "Triangle Shape with Light Yellow color",
    "image": "ipfs://QmfFDBWoVQc1X5Lzdqv9XsbzdrHtvp4uAHNjqJq1gPqcNV/01_triangle_light_yellow.png",
    "attributes": [
        {
            "trait_type": "Name",
            "value": "Triangle"
        },
        {
            "trait_type": "Color",
            "value": "Light Yellow"
        }
    ]
}
```

### 6) Upload complete matadata folder on Pinata
Upload complete folder of metadata on Pinata.<br>
It will give use URL like https://gateway.pinata.cloud/ipfs/Qmd8grfncQt8oynkXTqyRohYDppsjpdagfY4MDQBr3aEdk <br>

### 7) Update script/deploy.ts
In script/deploy.ts file replace the URI with URI received after uploading metadata folder on Pinata<br/>
URI we will provide will be like this `https://gateway.pinata.cloud/ipfs/Qmd8grfncQt8oynkXTqyRohYDppsjpdagfY4MDQBr3aEdk/` <br/>
But in contract when someone or opensea try to access URI it will call `uri(tokenId)` function of contract and it will return `https://gateway.pinata.cloud/ipfs/Qmd8grfncQt8oynkXTqyRohYDppsjpdagfY4MDQBr3aEdk/0.json`


### 8) Compile and Deploy
```shell
npx hardhat compile
npx hardhat run scripts/deploy.js --network rinkeby
```

### 9) Mint NFT
Go to script/mint-token.ts, update the value in `tokenId` and `numberOfTokens` to your required token id and amount of tokens <br/>
Run below command to mint token
```shell
npx hardhat run scripts/mint-token.js --network rinkeby
```

### 10) Add your NFT on Opensea Testnet
For Mainnet go to this [link](https://opensea.io/get-listed/step-two)<br>
To add your NFT on Opensea Testnet go to this [link](https://testnets.opensea.io/get-listed/step-two)<br>
Select Rinkeby Network and Provide your contract address generated in `Step 1`<br>
Once done you will see your NFT collection on Opnesea.io like [this](https://testnets.opensea.io/collection/shapenft)


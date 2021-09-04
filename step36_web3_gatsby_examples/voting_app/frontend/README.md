# Gatsby Typescript Minimal

## Quick start

1.  **Create a Gatsby site using this template**

    Use the Gatsby CLI to create a new site, specifying `gatsby-typescript-minimal` as the starter.

    ```sh
    gatsby new my-site-name https://github.com/benbarber/gatsby-typescript-minimal
    ```

2.  ** To Connect Metamask to our Ganache personal blockchain instance intall web3 npm package and import Web3 from 'web3' instantiates web3.

    ```sh
    npm i web3
    ```

3.  **For adding types to our contract instance, install npm install typechain and Add scripts generate-types and postinstall in package.json**
  
    ```sh
    npm install --save-dev typechain @typechain/web3-v1 @types/bn.js
    ```
  

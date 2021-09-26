# How to creating ERC20 token

In recent years, the ERC20 token specification has become the defacto standard for Ethereum tokens. In other words, most Ethereum contracts out there today are ERC20-compliant. In this example you will learn how you can create your own Ethereum token by using [Truffle](https://www.trufflesuite.com/), [Ganache](https://www.trufflesuite.com/ganache) and [Openzeppelin](https://openzeppelin.com/) library.

<br>

### Step 1: Step The Project Directory
First of all we'll create a new project directory. Inside the root directory run the following commands:
```sh 
npm init -y
```
```sh 
npm i -g truffle
```
```sh 
npm i @openzeppelin/contracts
```

and then install [Ganache](https://www.trufflesuite.com/ganache) UI tool.

<br>

### Step 2: Initialize a Truffle Project
```sh 
truffle init
```


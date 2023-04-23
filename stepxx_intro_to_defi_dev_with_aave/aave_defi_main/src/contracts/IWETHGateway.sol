// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.4;

interface IWETHGateway {

  function depositETH(
    address lendingPool,
    address onBehalfOf,
    uint16 referralCode
  ) external payable;
}
// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.5.0;

/* t0d0:
  [x] swap USDC to WETH on Uni
  [x] swap WETH to USDT on Uni
  [x] swap USDT to USDC on Curve
  [x] repay the loan to dYdX
  [ ] send USDC/profit to user (!h0m3w0rk)
*/
import "@studydefi/money-legos/dydx/contracts/DydxFlashloanBase.sol";
import "@studydefi/money-legos/curvefi/contracts/ICurveFiCurve.sol";
import "@studydefi/money-legos/dydx/contracts/ICallee.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

interface IUniswapV2Router02 {
  function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}

contract Arb is ICallee, DydxFlashloanBase {

  using SafeERC20 for IERC20; //for USDT (require special approve)
  address payable owner;

  address usdcAddress = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
  IERC20 usdc = IERC20(usdcAddress);

  address usdtAddress = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
  IERC20 usdt = IERC20(usdtAddress);

  address wethAddress = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

  address soloMarginAddress = 0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e;
  ISoloMargin solo = ISoloMargin(soloMarginAddress);

  address curveFi_curve_yDai_yUsdc_yUsdt_ytUsd = 0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51;
  ICurveFiCurve curve = ICurveFiCurve(curveFi_curve_yDai_yUsdc_yUsdt_ytUsd);

  address uniAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  IUniswapV2Router02 uni = IUniswapV2Router02(uniAddress);

  address[] public swapPath = [usdcAddress, wethAddress, usdtAddress]; //for uniswap

  int128 constant usdcIndex = 1; //for curvefi swap
  int128 constant usdtIndex = 2; //for curvefi swap

  struct MyCustomData {
    uint256 amount;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "caller is not the owner!");
    _;
  }

  constructor () public {
    owner = msg.sender;
  }

  // Don't allow contract to receive Ether by mistake
  function() external payable {
  }

  //start here
  function startArb(uint256 _amount) public payable onlyOwner {
    // Get marketId from token address
    uint256 marketId = _getMarketIdFromTokenAddress(soloMarginAddress, usdcAddress);

    // Calculate repay amount (_amount + (2 wei))
    uint256 repayAmount = _getRepaymentAmountInternal(_amount);
    usdc.approve(soloMarginAddress, repayAmount);

    // 1. Withdraw $
    // 2. Call callFunction(...)
    // 3. Deposit back $
    Actions.ActionArgs[] memory operations = new Actions.ActionArgs[](3);

    operations[0] = _getWithdrawAction(marketId, _amount);
    operations[1] = _getCallAction(abi.encode(MyCustomData({amount: repayAmount})));
    operations[2] = _getDepositAction(marketId, repayAmount);

    Account.Info[] memory accountInfos = new Account.Info[](1);
    accountInfos[0] = _getAccountInfo();

    solo.operate(accountInfos, operations);
  }

  // dYdX calls this
  function callFunction(address sender, Account.Info memory account, bytes memory data) public {
    MyCustomData memory mcd = abi.decode(data, (MyCustomData));
    uint256 balOfLoanedToken = usdc.balanceOf(address(this));

    require(balOfLoanedToken >= mcd.amount, "Not enough funds to repay dYdX loan!");
    _finishArb();
  }

  function _finishArb() internal {
    uint usdcBalance = usdc.balanceOf(address(this))-2; //minus fee
    usdc.safeApprove(uniAddress, usdcBalance);
    
    //swap USDC => WETH => USDT on Uni
    uni.swapExactTokensForTokens(usdcBalance, 1, swapPath, address(this), 2533388343);

    uint usdtBalanceBefore = usdt.balanceOf(address(this));
    usdt.safeApprove(curveFi_curve_yDai_yUsdc_yUsdt_ytUsd, usdtBalanceBefore);

    //swap usdt for usdc on curvefi
    curve.exchange_underlying(usdtIndex, usdcIndex, usdtBalanceBefore, 1);

    //repay the loan to dYdX
    /*!h0m3w0rk: send USDC back to the user */
  }
}
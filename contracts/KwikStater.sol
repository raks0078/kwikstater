// SPDX-License-Identifier: MIT;

pragma solidity ^0.7.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./libraries/Address.sol";
import "./bep20/BEP20Upgradeable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract KwikStater is BEP20Upgradeable, OwnableUpgradeable {
    // using safe math for `uint256`
    using SafeMath for uint256;
    // using Address for `address`
    using Address for address;
    
    uint256 public _launchBlock;
    uint256 public _launchTimestamp;

    uint256 public _whiteListSeconds;

    mapping (address => uint256) public _whiteListAmounts;
    
    mapping (address => uint256) public _whiteListPurchases;

    mapping (address => bool) public _isExchanger;

    function initialize (uint256 _totalSupply) public initializer {
         __ERC20_init("KwikStater", "Kwik");
         __Ownable_init(); 

         _whiteListSeconds = 300; // 5min
         // mint total supply to owner address
          _mint(_msgSender(), _totalSupply);  
    }
    
    // set Exchanger
    function setExchanger(address account, bool exchanger) public onlyOwner {
        _isExchanger[account] = exchanger;
    }

    
    function setLaunchWhiteList(uint256 whiteListSeconds, address[] calldata whiteListAddresses, uint256[] calldata whiteListAmounts) external onlyOwner() {
        require(whiteListAddresses.length == whiteListAmounts.length, "Invalid whitelist");
        
        _whiteListSeconds = whiteListSeconds;
        
        for (uint256 i = 0; i < whiteListAddresses.length; i++) {
            _whiteListAmounts[whiteListAddresses[i]] = whiteListAmounts[i];
        }
    }

    function _beforeTokenTransfer(address sender, address recipient, uint256 amount) internal override {
        
        if(_launchBlock == 0 && !_isExchanger[sender] && _isExchanger[recipient]) {
            _launchBlock = block.number;
            _launchTimestamp = block.timestamp;
        }
        
        if(_isExchanger[sender] && !_isExchanger[recipient]) {
            //buying
            if(block.timestamp - _launchTimestamp <= _whiteListSeconds) {
                
                uint256 whiteListRemaining = 0;
                if(_whiteListPurchases[recipient] < _whiteListAmounts[recipient])
                    whiteListRemaining = _whiteListAmounts[recipient].sub(_whiteListPurchases[recipient]);
                    
                require(amount <= whiteListRemaining, "Initial launch is whitelisted, please check if eligible or try after initial period");
                _whiteListPurchases[recipient] = _whiteListPurchases[recipient].add(amount);
            }
        }
        
    }


}
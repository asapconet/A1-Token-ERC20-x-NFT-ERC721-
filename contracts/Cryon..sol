//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//predefinded contracts from openzeppelin library
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Cryon is ERC20{
    // ERC20 is the construtor in the zeppelin library: was reassigned to Cryon(my prefference)

    uint public totalTokenValueInCRN;

    event Recieved(address sender, uint amount);
    event Sent(address recipient, uint amount, address sender);

    constructor()ERC20("Cryon", "CRN"){

        //token allocation to the owner(me)
        _mint(msg.sender, 1000000 *(10 * 18));

        // allocating 1m token to CRN
        totalTokenValueInCRN = (totalSupply()/(10 ** 18));
    }

    function buyToken (address recipient) public payable returns(uint) {
        uint amount;
        amount= msg.value;
        emit Recieved(msg.sender, amount);

        // logic to incress token to the the recipients account
        uint tokenAmount = (amount / (10**18));

        _mint(recipient, tokenAmount *(10 ** 18));
        emit Sent(recipient, tokenAmount *(10 ** 18), msg.sender);

        //the total new token value.
        totalTokenValueInCRN = (totalSupply()/(10 ** 18));

        return totalTokenValueInCRN;
    }

    // the function to get the available balance in the CRN account
    function getBalanceInCRN(address accountAddress) public view returns(uint){
        uint balance = (balanceOf(accountAddress)/(10 ** 18));
        return balance;
    }
}
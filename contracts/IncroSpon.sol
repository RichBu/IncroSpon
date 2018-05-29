pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract IncroSpon is ERC721Token, Ownable{ //is ERC721Token, Ownable {
    Dogg[] doggs;

    struct Dogg {
        string image_url;
        string name;
        uint8 age;
    }

    //I had to do this or it'll give me this error
    /*
        Error encountered, bailing. Network state unknown. Review successful transactions manually.
        Error: The contract code couldn't be stored, please check your gas amount.
    */
    function IncroSpon(string _name, string _symbol) ERC721Token(_name, _symbol) Ownable() public{ }

    function getDogsLen() view external returns(uint256){
        return doggs.length;
    }

    function mint(string _image_url, string _name, uint8 _age) external onlyOwner{
        //First we define an in memory dogg variable. In memory means that lifespan of this variable will be limited by the execution scope (it lives just inside this function)
        Dogg memory dogg = Dogg({ image_url: _image_url, name: _name, age: _age });
        uint doggId = doggs.push(dogg) - 1; //the push method returns the new length

        //Checks that the recipient address is valid (not 0), otherwize throws an error
        //Creates a token and assigns it an owner
        //Fires Transfer event.
        _mint(msg.sender, doggId);
    }

    function getDog( uint _doggId ) public view returns(string image_url, string name, uint8 age){
        Dogg memory dogg = doggs[_doggId];

        image_url = dogg.image_url;
        name = dogg.name;
        age = dogg.age;
    }
}

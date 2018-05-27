pragma solidity ^0.4.17;

//Here we imported an ERC721 token interface
//We need to have a reference to the non-fungible token contract to be able to call it's methods, like transfer.
import 'zeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import 'zeppelin-solidity/contracts/token/ERC721/ERC721BasicToken.sol';

contract Sale is ERC721BasicToken{
	//We need to have a reference to the non-fungible token contract to be able to call it’s methods, like transfer
	ERC721 public nonFungibleContract;

	//We need to be able to create new auctions using tokenId and price so we make a struct Auction and the mapping tokenIdToAuction
	struct Auction {
	  address seller;
	  uint256 price;
	}

	//Every auction should be associated with specific token, define a mapping:
	//We made it public so Solidity will automatically generate getter for it.
	mapping (uint256 => Auction) public tokenIdToAuction;

	function Sale(address _nftAddress) public {
		nonFungibleContract = ERC721(_nftAddress);
	}

	//Now we can define a function that will take ownership of the token and create an associated auction:
	function createAuction(uint256 _tokenId, uint256 _price) public {
		//make sure that the person making the auction is the owner of the nft
		require(msg.sender == ownerOf(_tokenId));

		//Then we create a new instance of our Auction and assign it to a temporary in-memory variable auction.
		Auction memory auction = Auction({
		 seller: msg.sender,
		 price: uint256(_price)
		});

		//And finally, we make a mapping of this auction to our _tokenId.
		tokenIdToAuction[_tokenId] = auction;
	}

	//This method should check if bid value is bigger or equal to auction price and if yes – transfer token to new owner and remove auction.
	//Our function has payable modifier that allows this function to receive money. The received amount can be accessed through msg.value
	function bid( uint256 _tokenId ) public payable {
		//First, we get the auction representation from our tokenIdToAuction map
		Auction memory auction = tokenIdToAuction[_tokenId];

		//Then we check that auction seller is non-zero address.
		require(auction.seller != address(0));

		//we check if msg.value is bigger or equal to the auction.price
		require(msg.value >= auction.price);

		//we temporarily save seller address and price
		address seller = auction.seller;
		uint256 price = auction.price;

		//remove the auction, preventing further bids to it
		delete tokenIdToAuction[_tokenId];

		//we transfer money to the seller 
		seller.transfer(price);

		//transfer the non fungible token to the bidder
		nonFungibleContract.transferFrom(address(this), msg.sender, _tokenId);
	}

	function cancel( uint256 _tokenId ) public {
		//load the auction in
		Auction memory auction = tokenIdToAuction[_tokenId];

		//we don't need to check that auction.seller is non-zero because we check if it's equal to msg.sender anyway. 
		//We want only auction creator to be able to cancel auctions.
		require(auction.seller == msg.sender);

		//we delete the auction
		delete tokenIdToAuction[_tokenId];

		//send the token back to the seller (which is msg.sender)
		nonFungibleContract.transferFrom(address(this), msg.sender, _tokenId);

	}
}
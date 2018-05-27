var Dog = artifacts.require("Dog");

module.exports = function(deployer) {
	deployer.deploy(Dog, "DogToken", "DOG");
};
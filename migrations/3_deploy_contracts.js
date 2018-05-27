var Sale = artifacts.require("Sale");

module.exports = function(deployer) {
	deployer.deploy(Sale, '0x4b9dF80E5646813A08fb10aA171007A7d3354eAd');
};
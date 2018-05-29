var IncroSpon = artifacts.require("IncroSpon");

module.exports = function(deployer) {
	deployer.deploy(IncroSpon, "IncroSpon" );
};
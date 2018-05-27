var $errors_DIV = $('#errors');
var $dogs_DIV = $('#dogs');
var $ownerSees_DIV = $('#ownerSees');
var $transactions_DIV = $('#transactions');
var $transferToAddress_INPUT = $('#transferToAddress');
var $ownerAddress_SPAN = $('#ownerAddress');
var $ownerSeesAdditionalInfo_DIV = $('#ownerSeesAdditionalInfo');
var $yourAddress_SPAN = $('#yourAddress');
var $yourETHAmount_SPAN = $('#yourETHAmount');
var $dog_name_INPUT = $('#dog_name');
var $dog_age_INPUT = $('#dog_age');
var $dog_image_url_INPUT = $('#dog_image_url');

/*  
    //https://etherconverter.online/
    
    1 ether equals 10^18 wei. 
    
    //https://github.com/ethereum/web3.js/blob/0.15.0/lib/utils/utils.js#L40

    var unitMap = {
        'wei':          '1',
        'kwei':         '1000',
        'ada':          '1000',
        'femtoether':   '1000',
        'mwei':         '1000000',
        'babbage':      '1000000',
        'picoether':    '1000000',
        'gwei':         '1000000000',
        'shannon':      '1000000000',
        'nanoether':    '1000000000',
        'nano':         '1000000000',
        'szabo':        '1000000000000',
        'microether':   '1000000000000',
        'micro':        '1000000000000',
        'finney':       '1000000000000000',
        'milliether':   '1000000000000000',
        'milli':        '1000000000000000',
        'ether':        '1000000000000000000',
        'kether':       '1000000000000000000000',
        'grand':        '1000000000000000000000',
        'einstein':     '1000000000000000000000',
        'mether':       '1000000000000000000000000',
        'gether':       '1000000000000000000000000000',
        'tether':       '1000000000000000000000000000000'
    };
*/
function balanceConvert(bal, from, to){
    //https://github.com/ethereum/wiki/wiki/JavaScript-API#web3towei
    if (from == 'wei') return web3.fromWei(bal, to);
}

function liGen(val){
    var li = $('<li>');
    li.text(val);
    return li;
}

function addLisToPage(list, $id){

    var liTag;

    $id.empty();

    for (var i=0; i<list.length; i++){
        liTag = liGen(list[i]);

        $id.append(liTag);
    }
}

function addTransactionToDOM(ob, transactionsDiv) {
    //start a virtual unordered list (list with bullets - no numbers)
    var ul = $('<ul>');

    //the tx is in a key in ob, so we get to it directly
    var firstLi = $('<li>');
    var txTerm = $('<span>').html('<strong>tx</strong>').addClass('right-margin-5');
    var txVal = $('<span>').html(ob.tx);
    firstLi.append(txTerm);
    firstLi.append(txVal);

    ul.append(firstLi);

    //the rest of the data are grand childs of ob in ob.receipt

    var li, term, val;

    for (key in ob.receipt) {
        li = $('<li>');
        term = $('<span>').html(`<strong>${key}</strong>`).addClass('right-margin-5');
        val = $('<span>').html(ob.receipt[key]);

        li.append(term)
        li.append(val);

        ul.append(li);
    }

    //we add the virtual unordered list onto the html
    transactionsDiv.append(ul);
}

App = {
    web3Provider: null,
    contracts: {},

    init: function() {
        return App.initWeb3();
    },

    initWeb3: function() {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('Dog.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var DogArtifact = data;
            App.contracts.Dog = TruffleContract(DogArtifact);

            // Set the provider for our contract.
            App.contracts.Dog.setProvider(App.web3Provider);

            return App.bindEvents();

        });
    },
    bindEvents: function() {
        $(document).on('click', '#transferOwnership', App.transferOwnership);
        $(document).on('click', '#mintDog', App.mintDog);

        //add your address to the page
            var account = web3.eth.accounts[0];

            $yourAddress_SPAN.text(account);

        var balance;

        web3.eth.getBalance(account, function(err, bal){
            balance = web3.fromWei(bal.toNumber());
            //add how much you have to the page
            $yourETHAmount_SPAN.text(balance);
        });

        var accountInterval = setInterval(function() {

            //if the account changes then re-run App.init
                var acc = web3.eth.accounts[0];

                if (account !== acc) {
                    account = web3.eth.accounts[0];

                    //reset elements on the page
                    $errors_DIV.empty();
                    $transactions_DIV.empty();
                    $donationInfo.empty();
                    $ownerSees_DIV.addClass('hide');
                    $ownerSeesAdditionalInfo_DIV.empty();
                    $donationAmount.val('');
                    $transferToAddress_INPUT.val('');

                    App.init();
                }

            //if the balance changed of the account then update the page with the new balance of the account
                web3.eth.getBalance(account, function(err, bal){
                    if (balance !== web3.fromWei(bal.toNumber())){
                        balance = web3.fromWei(bal.toNumber());
                        //add how much you have to the page
                        $yourETHAmount_SPAN.text(balance);
                    }
                });
        }, 100);

        return App.grabState();
    },
    grabState: function() {
        var DogInstance;

        App.contracts.Dog.deployed().then(function(instance) {
            DogInstance = instance;

            return DogInstance.getDogsLen.call();

        }).then(function(result){
            var dogListLen = result.toNumber();

            var promises = [];

            promises.push(DogInstance.owner.call());

            for (var i = 0; i < dogListLen; i++) {
                promises.push(DogInstance.doggs.call(i));
            }

            return Promise.all(promises);

        }).then(function(result) {

            //show the owner admin section if the person here is the owner
            if (web3.eth.accounts[0] == result[0]) $ownerSees_DIV.removeClass('hide');

            $ownerAddress_SPAN.text(result[0]);

            addLisToPage(result.slice(2), $dogs_DIV)

            //we'll set up watching events here

            //watch for a new owner from the ownable contract
                var DogInstance;

                //watch for a solidity event
                App.contracts.Dog.deployed().then(function(instance) {
                    DogInstance = instance;

                    return DogInstance.OwnershipTransferred().watch(function(err, res){
                        if (err) console.log(err);
                        console.log(res.args.newOwner, res.args.previousOwner);
                        $('#ownerAddress').text(res.args.newOwner);
                    });

                }).catch(function(err) {
                    $errors_DIV.prepend(err.message);
                });

        }).catch(function(err) {
            $errors_DIV.prepend(err.message);
        });
    },
    mintDog: function(event) {
        event.preventDefault();
        
        console.log($dog_image_url_INPUT.val(), $dog_name_INPUT.val(), $dog_age_INPUT.val());

        App.contracts.Dog.deployed().then(function(instance) {
            dogInstance = instance;

            return dogInstance.mint($dog_image_url_INPUT.val(), $dog_name_INPUT.val(), $dog_age_INPUT.val());
        }).then(function(result) {
            alert('Minting Successful!');
        }).catch(function(err) {
            console.log(err.message);
        });
        
    },
    transferOwnership: function(event) {
        event.preventDefault();

        var DogInstance;

        App.contracts.Dog.deployed().then(function(instance) {
            DogInstance = instance;

            var tAddressVal = $transferToAddress_INPUT.val();

            return DogInstance.transferOwnership(tAddressVal);
        }).then(function(result) {
          addTransactionToDOM(result, $transactions_DIV);

          $ownerSeesAdditionalInfo_DIV.append($('<p>').text('ownership has been transferred to address provided.'));

        }).catch(function(err) {
            $errors_DIV.prepend(err.message);
        });
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    });
});
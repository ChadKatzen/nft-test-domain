
let $connectWallet = $('#connectWallet');


function doSomething(){
    window.alert("vagina");
}
function doSomethingElse(){
  window.alert("penis");
}



$connectWallet.on('click', doSomething)


$connectWallet.on('click', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3js = new Web3(web3.currentProvider);
      doSomething();
    } else {
      // Handle the case where the user doesn't have Metamask installed
      // Probably show them a message prompting them to install Metamask
      doSomethingElse();
    }

    // Now you can start your app & access web3 freely:
    //startApp()

  })
  




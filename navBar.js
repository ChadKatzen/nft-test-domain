
let $connectWallet = $('#connectWallet');
let MetaMaskEnabled = false;

async function walletConnector(){
  return await ethereum.request({ method: 'eth_requestAccounts'});
}

function connected(acc){
  $connectWallet.html(acc[0]);
}

window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3js = new Web3(web3.currentProvider);
      $connectWallet.html("Connect Wallet");
      MetaMaskEnabled = true;
    } else {
      // Handle the case where the user doesn't have Metamask installed
      // Probably show them a message prompting them to install Metamask
      MetaMaskEnabled = false;
    }

    // Now you can start your app & access web3 freely:
    //startApp()

  })
  
$connectWallet.on('click', () => {
  if (MetaMaskEnabled === true){
    walletConnector().then((accounts) => {
      
      if(accounts && accounts[0] > 0){
        connected(accounts)
      } else {
        window.alert((accounts[0]));
      }
    })
  }
})

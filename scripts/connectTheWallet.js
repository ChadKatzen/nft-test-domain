
let NFTcontract;
let $connectWallet = $('#connectWallet');
let MetaMaskEnabled = false;

async function walletConnector(){
  return await ethereum.request({ method: 'eth_requestAccounts'});
}

function displayWallet(acc){
  let text = acc[0];
  let textStart = text.substring(0,5);
  let textEnd = text.substring(text.length - 5)
  $connectWallet.html(`${textStart}...${textEnd}`);
}


 function startApp(){
  let NFTAddress = "0x7DAfAC25D7FF95f878B9bb08E9bA3fAEd5f72418";
   NFTcontract = new web3js.eth.Contract(NFTABI, NFTAddress);
}




window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      web3js = new Web3(web3.currentProvider);
      $connectWallet.html("Connect Wallet");
      MetaMaskEnabled = true;
      startApp();
    } else {
      // Handle the case where the user doesn't have Metamask installed
      // Probably show them a message prompting them to install Metamask
      MetaMaskEnabled = false;
    }
  })
let activeAccount;
$connectWallet.on('click', () => {
  if (MetaMaskEnabled === true){
    walletConnector().then((accounts) => {
      if(accounts && accounts[0] > 0){
        displayWallet(accounts)
        activeAccount = accounts[0];
      }
    })
  }
})

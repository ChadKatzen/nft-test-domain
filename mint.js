async function mint(){
    await NFTcontract.methods.mintTo(activeAccount).send({ from: activeAccount, value: web3js.utils.toWei("0.08", "ether") })
    $('#success').show();
    
}

$mintButton=$("#mint");

$mintButton.on('click', mint)
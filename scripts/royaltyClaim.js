async function getNFTimageURL(id){
    let tokenURI = await NFTcontract.methods.tokenURI(id).call();
    let imageURL;
    await $.getJSON(tokenURI, function(data) {
        imageURL = data.image;
    });
    return imageURL;
}

async function getRoyaltyWithdrawable(id){
    let amount = await NFTcontract.methods.royaltyClaimable(id).call();
    return amount * (10**(-18));
}

//async function claimDividend(amount, id){
//    let amountWei = amount * (10**18)
//    await NFTcontract.methods.withdrawRoyalty(amountWei, id).send();
//}


async function displayNFTs(){
    let NFTsOwnedByAddress =[];
    let i = 1;
    let mintSupply = await NFTcontract.methods.TOTAL_SUPPLY().call();
    for (i =1; i <= 4; i++){
        try{
        let NFTaccount = await NFTcontract.methods.ownerOf(i).call();
        var NFTaccounthex = parseInt(NFTaccount.replace(/^#/, ''), 16);
        let activeAccounthex = parseInt(activeAccount.replace(/^#/, ''), 16);
        if (NFTaccounthex == activeAccounthex){
            NFTsOwnedByAddress.push(i);
        }
        } catch (err) {
            let debugme =0;
        }
    }

    counter = 0;
    for (counter = 0; counter < NFTsOwnedByAddress.length; counter++){
        let URL = await getNFTimageURL(NFTsOwnedByAddress[counter]);
        let withdrawAmountPossible = await getRoyaltyWithdrawable(NFTsOwnedByAddress[counter]);

        $("#getNFTimage").append(`<div class="picture">
        <img src="${URL}">
        <h1>Dividend Claimable: ${withdrawAmountPossible} eth</h1>
        <button id='#${NFTsOwnedByAddress[counter]}claimDividend'>Claim Dividend</button>
        </div>`)
    }  
   

}
let $getNFTs = $('#getNFTs');
$getNFTs.on('click', displayNFTs);
$('#1claimDividend').on('click', claimDividend(2000000,1));
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

        $("#getNFTimage").append(
            `<div id="about" class="about">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="about_border">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="titlepage text_align_left">
                                            <h2>NFT # ${NFTsOwnedByAddress[counter]}</h2>
                                        </div>
                                        <div class="about_text">
                                            <p>Dividend Claimable: ${withdrawAmountPossible} eth </p>
                                            <a class="read_more" href="claim.html">Claim Dividend</a>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="about_img">
                                            <figure><img class="img_responsive" src="${URL}" alt="#" /></figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            
            
            )
    }  
   

}
let $getNFTs = $('#getNFTs');
$getNFTs.on('click', displayNFTs);
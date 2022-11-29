async function getNFTimageURL(id){
    let tokenURI = await NFTcontract.methods.tokenURI(id).call();
    let imageURL;
    await $.getJSON(tokenURI, function(data) {
        imageURL = data.image;
    });
    return imageURL;
}

async function getRoyaltyWithdrawable(id){
    try{
    let amount = await NFTcontract.methods.royaltyClaimable(id).call();
    return amount * (10**(-18));
    }
    catch (err){
        return 0;
    }
}

async function claimDividend(event){
   let amount = event.data.key1;
   let id = event.data.key2;
   await NFTcontract.methods.withdrawRoyalty(web3js.utils.toWei(amount), id).send({from: activeAccount});
}


async function displayNFTs(){
    let NFTsOwnedByAddress =[];
    let i = 1;
    let mintSupply = await NFTcontract.methods.TOTAL_SUPPLY().call();
    for (i =1; i <= 10; i++){
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
                                            <p class="read_more" id="${NFTsOwnedByAddress[counter]}claim">Claim Dividend</a>
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
            );
            $("#royaltyclaimscript").append(`<script>$('#${NFTsOwnedByAddress[counter]}claim').bind('click', {key1: '0.01', key2: 1}, claimDividend); </script>`)
    }  
   

}
let $getNFTs = $('#getNFTs');
$getNFTs.on('click', displayNFTs);

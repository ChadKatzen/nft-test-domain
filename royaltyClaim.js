async function getNFTimageURL(id){
    let tokenURI = await NFTcontract.methods.tokenURI(id).call();
    let imageURL;
    $.getJSON(tokenURI, function(data) {
        imageURL = data.image;
    });
    return imageURL;
}


async function displayNFTs(){
    let NFTsOwnedByAddress =[];
    let i = 1;
    let mintSupply = await NFTcontract.methods.TOTAL_SUPPLY().call();
    for (i =1; i <= mintSupply; i++){
        try{
        let NFTaccount = await NFTcontract.methods.ownerOf(i).call();
        let activeAccountString = string(activeAccount).toLowerCase();
        if (activeAccountString == string(NFTaccount).toLowerCase()){
            NFTsOwnedByAddress.push(i);
        }
        } catch (err) {
        }
    }

    counter = 1;
    for (counter = 1; counter <= NFTsOwnedByAddress.length; counter++){
        let URL = await getNFTimageURL(NFTsOwnedByAddress[counter]);
        $("#getNFTimage").append(`<div class="picture">
        <img src="${URL}">
        </div>`)
    }  
   

}
let $getNFTs = $('#getNFTs');
$getNFTs.on('click', displayNFTs);
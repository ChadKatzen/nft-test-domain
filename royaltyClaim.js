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
        if (address == await NFTcontract.methods.ownerOf(i).call()){
            NFTsOwnedByAddress.push(i);
        }
        } catch (err) {
        }
    }
    NFTsOwnedByAddress.forEach(getNFTimageURL).then(function (URL) {
        $("#getNFTimage").append(`<div class="picture">
        <img src="${URL}">
      </div>`)
    })
}
let $getNFTs = $('#getNFTs');
$getNFTs.on('click', displayNFTs);
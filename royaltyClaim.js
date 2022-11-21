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
    alert(mintSupply);
    for (i =1; i <= mintSupply; i++){
        try{
        if (address == await NFTcontract.methods.ownerOf(i).call()){
            NFTsOwnedByAddress.push(i);
            alert(i);
        }
        } catch (err) {
        }
    }

    counter = 1;
    for (counter = 1; counter <= NFTsOwnedByAddress.length; counter++){
        let URL = await getNFTimageURL(NFTsOwnedByAddress[counter]);
        alert(URL);
        $("#getNFTimage").append(`<div class="picture">
        <img src="${URL}">
        </div>`)
    }  
   

}
let $getNFTs = $('#getNFTs');
$getNFTs.on('click', displayNFTs);
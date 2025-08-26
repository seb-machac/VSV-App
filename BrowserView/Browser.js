//Create async function to replace the default item data
async function thingiverseinit() {
    //Fetch the API data
    let response = await fetch("https://api.thingiverse.com/featured?access_token=6d4de6aafc46e965dafcb4e56b18a251");
    //Parse API data
    let data = await response.json();

    //Start for loop to loop through all Items
    for (let i = 1; i < 7; i++) {
        //Find current Card Image Element
        const Card_i_Image = document.getElementById("Card_"+i+"_Image");
        //Find current Card Title Element
        const Card_i_Title = document.getElementById("Card_"+i+"_Title");
        //Find current Card Parent Element
        const Card_i = document.getElementById("Card_"+i);

        //Replace current Card Image
        Card_i_Image.src = data[i-1].thumbnail;
        //Replace current Card Title
        Card_i_Title.innerText = data[i-1].name;
        //Replace current Card URL
        Card_i.href = data[i-1].public_url;
    };
};
//Call the function
thingiverseinit();

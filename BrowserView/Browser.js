//Create async function to replace the default item data
async function thingiverseinit() {
    //Fetch the API data
    let response = await fetch("https://api.thingiverse.com/popular?access_token=6d4de6aafc46e965dafcb4e56b18a251");
    //Parse API data
    let data = await response.json();

    //Start for loop to loop through all Items
    for (let i = 0; i < 6; i++) {
        //Find current Card Image Element
        const Card_i_Image = document.getElementById("Card_"+i+"_Image");
        //Find current Card Title Element
        const Card_i_Title = document.getElementById("Card_"+i+"_Title");
        //Find current Card Parent Element
        const Card_i = document.getElementById("Card_"+i);

        //Replace current Card Image
        Card_i_Image.src = data[i].thumbnail;
        //Replace current Card Title
        Card_i_Title.innerText = data[i].name;
        //Replace current Card URL
        Card_i.href = data[i].public_url;
    };
};
//Call the function
thingiverseinit();

async function Search(query) {
    let response = await fetch("https://api.thingiverse.com/search/"+String(query)+"/?access_token=6d4de6aafc46e965dafcb4e56b18a251&type=thing&per_page=6");
    let data = await response.json();
    console.log(data);
    if (data.total > 6) {
    for (let i = 0; i < 6; i++) {
        let Card_i_Image = await document.getElementById("Card_"+i+"_Image");
        let Card_i_Title = document.getElementById("Card_"+i+"_Title");
        let Card_i = document.getElementById("Card_"+i);

        Card_i_Image.src = data.hits[i].thumbnail;
        Card_i_Title.innerText = data.hits[i].name;
        Card_i.href = data.hits[i].public_url;
    }
} else {
    window.alert("No Results Found! \nDefaulting to Most Popular");
    thingiverseinit();
};
};
const query = document.getElementById("Search-Query");

query.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (query.value == "") {
                thingiverseinit();
            }
            Search(query.value);
        }
    });

// class Card {
//     constructor(id) {
//         this.id = id
//     }
//     get ID() {
//         return this.id;
//     };

//     get src() {
//         return document.getElementById(String(this.id)).src;
//     }
// };
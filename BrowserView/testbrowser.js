async function thingiverseinit() {
    let response = await fetch("https://api.thingiverse.com/featured?access_token=6d4de6aafc46e965dafcb4e56b18a251");
    let data = await response.json();

    for (let i = 1; i < 7; i++) {
        const Card_i_Image = document.getElementById("Card_"+i+"_Image");
        const Card_i_Title = document.getElementById("Card_"+i+"_Title");
        const Card_i = document.getElementById("Card_"+i);

        Card_i_Image.src = data[i-1].thumbnail;
        Card_i_Title.innerText = data[i-1].name;
        Card_i.href = data[i-1].public_url;
    };
};
thingiverseinit();

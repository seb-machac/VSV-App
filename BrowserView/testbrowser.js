async function thingiverseinit() {
    let response = await fetch("https://api.thingiverse.com/featured?access_token=6d4de6aafc46e965dafcb4e56b18a251");
    let data = await response.json();
    console.log(data);
    const Card_1_Image = document.getElementById("Card_1_Image");
    const Card_1_Source = document.getElementById("Card_1_Source");
    const Card_1_Title = document.getElementById("Card_1_Title");
    const Card_1 = document.getElementById("Card_1");

    Card_1_Image.src = data[0].thumbnail;
    Card_1_Title.innerText = data[0].name;
    Card_1.href = data[0].public_url

    const Card_2_Image = document.getElementById("Card_2_Image");
    const Card_2_Source = document.getElementById("Card_2_Source");
    const Card_2_Title = document.getElementById("Card_2_Title");

    Card_2_Image.src = data[1].thumbnail;
    Card_2_Title.innerText = data[1].name;
};
thingiverseinit();

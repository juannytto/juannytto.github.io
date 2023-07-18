//function isCategory returns bool: true if the current page is category.html, false otherwise
function isPage(page_name) {
    var pathn = window.location.pathname;
    var locat = pathn.split('/');
    var locatL = locat.length - 1;
    var filename = locat[locatL];
    return filename == page_name;
}
//return the url of the the 'page.html' without parameters
function getPageUrl(page_name) {
    var pathn = window.location.href;
    var locat = pathn.split('/');
    var locatL = locat.length - 1;
    locat[locatL] = page_name;
    filename = locat.join('/');
    return filename;

}
//load a page with the category and game id's as arguments to display the correct page
function loadCategoryPage(categoryId, gameId) {
    if (!isPage("category.html"))   //when you load from a page different than category.html
        var url = new URL(getPageUrl("category.html")); //get the category.html
    else 
        var url = new URL(window.location.href); //important to redirect into the new category page (important when u clic outside category.html page)
        //console.log(window.location.assign("category.html"));
        
        url.searchParams.set('cID', categoryId);//add the parameters
        url.searchParams.set('gID', gameId);
        console.log(url);
        window.location.replace(url); //laod the page WITH the parameters
    
}
function loadGamePage(categoryId, gameId)     //loads the new page only with the game's id to stay in the same category
{
    var url = new URL(window.location.href); //important to redirect into the new category page (important when u clic outside category.html page)
    url.searchParams.set('cID', categoryId);//add the parameters
    url.searchParams.set('gID', gameId);
    console.log(url);
    window.location.replace(url);//laod the page WITH the parameters

}
function getPageData()  //retrieve the argument transmitted through the url 
{
    let url = window.location.href;
    let paramaters = (new URL(url)).searchParams;
    console.log('parameters : ' + paramaters);
    if (isPage("category.html")) {
        if (paramaters == '') { ///DO SOMETHING WHEN THE PAGE DOESNT HAVE ARGUMENTS IN URL
            var categoryId = 0;
            var gameId = -1;
            loadCategoryPage(categoryId, gameId);
        } else {
            var categoryId = paramaters.get("cID");
            var gameId = paramaters.get("gID");
        }
    } else {
        var categoryId = 0;
        var gameId = -1;
    }
    datas = [categoryId, gameId] //use of an array to return both id's at once 
    
    //specificly add to data the productId for the product page
    if (isPage("product.html")){
        var productId= paramaters.get("pID");
        datas.push(productId);
    }
    return datas;
}

//selects a list and 2 keys (category and game id) and return a list of the products that matches with the ids
function loadCurrentItems(list, categoryId, gameId) {
    var products = [];
    if (gameId!=-1){
        for (i = 0; i < list.length; i++) {
            if (list[i].categoryId == categoryId && list[i].gameId == gameId) {
                products.push(list[i]);
            }
        }
    } else {
        for (i = 0; i < list.length; i++) {
            if (list[i].categoryId == categoryId) {
                products.push(list[i]);
            }
        }
    }
    return products;
}

//redirect the product page with the product's id
function loadProductPage(pID) 
{
    var url = new URL(getPageUrl("product.html"));
    url.searchParams.set('pID', pID);
    window.location.href = url;
}

function funCall() {
    var category = [
        { id: 0, name: "Transportation" },
        { id: 1, name: "Weapon" },
        { id: 2, name: "Tool" },
        { id: 3, name: "Construction" },
        { id: 4, name: "Consumables" },
        { id: 5, name: "Wearables" },
    ]
    var game = [
        { id: 0, name: "Mario", License: "Nitendo" },
        { id: 1, name: "Minecraft", License: "Mojang" },
        { id: 2, name: "GTA", License: "Rockstar Games" },
        { id: 3, name: "Pokemon", License: "Nintendo" },
        { id: 4, name: "Sims", License: "Maxis, Edge of Reality" },
        { id: 5, name: "Fortnite", License: "Epic Games" },
        { id: 6, name: "TeamFortress2", License: "Valve" },
        { id: 7, name: "Zelda", License: "Nintendo" },
        { id: 8, name: "Skyrim", License: "Bethesda Game Studios"},
        { id: 9, name: "Portal", License: "Valve"},
    ]
    var productobject = [
        { id: 0, categoryId: 3, gameId: 1, name: 'Minecraft - ShulkerBox', euroPrice: '408', centPrice: '33', stock: '20', taille: "Large", rate: 4, imgLink: '../img/minecraft-shulkerbox.png', description: "A shulker box is a type of storage block that can be found in the game Minecraft. It is known for its ability to hold a large number of items, and for its ability to retain its contents even when broken. In real life, a shulker box would be useful for organizing and storing items in a compact and portable way. It could be used to store tools, supplies, or other items that need to be kept organized and easily accessible. Additionally, its durability and protective properties make it a good option for storing valuable or fragile items. Overall, a shulker box would be a useful and practical item to have in real life." },
        { id: 1, categoryId: 2, gameId: 1, name: 'Minecraft - Netherite Hoe', euroPrice: '9 999', centPrice: '99', stock: '45', taille: "Medium", rate: 5, imgLink: '../img/minecraft-netheritehoe.png', description: "The perfect flex." },
        { id: 2, categoryId: 2, gameId: 1, name: 'Minecraft - Diamond Pickaxe', euroPrice: '3 007', centPrice: '50', stock: '28', taille: "Medium", rate: 4.5, imgLink: '../img/minecraft-diamondpick.png', description: "A diamond pickaxe would be useful in real life because it is one of the strongest and most durable tools in Minecraft. In the game, it is able to break almost any block quickly and efficiently. In real life, a diamond pickaxe could be used for mining, construction, or other tasks that require a strong and durable tool. It would be especially useful in situations where other tools, such as a regular pickaxe or a shovel, might not be sufficient." },
        { id: 3, categoryId: 3, gameId: 1, name: 'Minecraft - EnderChest', euroPrice: '499', centPrice: '99', stock: '5', taille: "Medium", rate: 3, imgLink: '../img/minecraft-enderchest.png', description: "An Ender Chest is a block from the game Minecraft that is used to store items. In the game, it functions as a portable version of a player's chest, allowing them to access their items from anywhere. In real life, an Ender Chest could potentially be useful for storing and transporting items. It could be designed as a decorative item for a gamer's home or as a functional storage solution for camping or other outdoor activities. It could also be used as a fun, unique gift for a Minecraft fan." },
        { id: 4, categoryId: 2, gameId: 1, name: 'Minecraft - Water Bucket', euroPrice: '69', centPrice: '99', stock: '33', taille: "Medium", rate: 4, imgLink: '../img/minecraft-waterbucket.png', description: "Profitez d'un seau d'eau venu tout droit de l'univers de Minecraft rien que pour vous !" },
        { id: 5, categoryId: 2, gameId: 1, name: 'Minecraft - Lava Bucket', euroPrice: '450', centPrice: '99', stock: '41', taille: "Medium", rate: 4, imgLink: '../img/minecraft-lavabucket.png', description: "Profitez d'un seau de lave venu tout droit de l'univers de Minecraft rien que pour vous !" },
        { id: 6, categoryId: 0, gameId: 0, name: 'Mario\'s Kart', euroPrice: '4 003', centPrice: '33', stock: '27', taille: "Medium", rate: 3, imgLink: '../img/mario-kart1.png', description: "The Mario Kart is a fun and exciting way to race around with friends and compete for the top spot. In real life, it could be a great way to exercise and have fun at the same time. The Kart itself is compact and easy to store, making it perfect for use in a variety of settings. Plus, its colorful design and iconic characters make it a great conversation starter and a must-have for any Mario fan." },
        { id: 7, categoryId: 4, gameId: 0, name: 'Mario - 1 Upshroom', euroPrice: '8 999', centPrice: '99', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/mario-1upshroom.png', description: "The 1up mushroom from the Mario series is a power-up that allows the player to gain an extra life in the game. Who would pass out on that in the real life?" },
        { id: 8, categoryId: 1, gameId: 0, name: 'Mario - Blue Shell', euroPrice: '499', centPrice: '99', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/mario-blueshell.png', description: "A blue shell is an item from the Mario Kart series of video games. In the game, it can be used to attack other players and knock them out of the race. In real life, a blue shell could be useful as a protective device or a tool for self-defense. For example, it could be used to block attacks or to stun an attacker long enough for the user to escape. Additionally, the blue shell's aerodynamic design could make it useful for throwing at long distances." },
        { id: 9, categoryId: 4, gameId: 0, name: 'Mario - Star', euroPrice: '233', centPrice: '33', stock: '27', taille: "Medium", rate: 3, imgLink: '../img/mario-star.png', description: "A Mario star would give the user temporary invincibility and increased speed, which could be useful in real life for quickly escaping dangerous situations or for achieving personal goals more efficiently. However, it is important to note that the effects of a Mario star would likely not be as exaggerated in real life as they are in the game, and using one would likely not be without consequences." },
        { id: 10, categoryId: 5, gameId: 6, name: 'Team Fortress 2 - Cloak and Dagger', euroPrice: '4 499', centPrice: '99', stock: '27', taille: "Medium", rate: 4, imgLink: '../img/teamfortress-Cloak_and_Dagger.png', description: "The cloak and dagger is a stealth weapon used by the Spy class in the game Team Fortress 2. In real life, it could be used as a tool for covert operations or espionage. The cloak allows the user to become invisible, while the dagger can be used for silent takedowns. It would be useful for individuals or organizations that require stealth and secrecy in their operations." },
        { id: 11, categoryId: 1, gameId: 6, name: 'Team Fortress 2 - DeadRinger', euroPrice: '4 499', centPrice: '98', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/teamfortress-deadringer.png', description: "A deadringer is a type of weapon in the game Team Fortress 2. In the game, it functions as a spy knife that allows the player to feign death and hide from enemies. In real life, it could potentially be useful as a tool for deception and evasion. For example, if you were being pursued by someone, you could use the deadringer to fake your own death and potentially throw off your pursuer. However, please note that using deception and evasion in real life can be dangerous and should only be done in extreme circumstances." },
        { id: 12, categoryId: 5, gameId: 6, name: 'Team Fortress 2 - Invisibility Watch', euroPrice: '3499', centPrice: '99', stock: '27', taille: "Medium", rate: 3, imgLink: '../img/teamfortress-invisibilitywatch.png', description: "A Team Fortress 2 invisibility watch would allow the wearer to become invisible for a short period of time, similar to how it works in the game. This could be useful in real life for activities such as spying or espionage, or for making a quick escape in emergency situations." },
        { id: 13, categoryId: 1, gameId: 6, name: 'Team Fortress 2 - MediGun', euroPrice: '6 349', centPrice: '58', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/teamfortress-medigun.png', description: "The Medigun is a healing tool from the game Team Fortress 2. In the game, it allows players to heal their allies by shooting a healing beam at them. In real life, a Medigun could be useful for providing quick and efficient medical care in emergency situations. The ability to quickly and easily heal someone from a distance could be invaluable in a crisis. Additionally, the Medigun's ability to continuously heal a target over time could make it useful for treating long-term injuries or illnesses." },
        { id: 14, categoryId: 1, gameId: 6, name: 'Team Fortress 2 - Rain Blower', euroPrice: '50', centPrice: '00', stock: '27', taille: "Medium", rate: 3, imgLink: '../img/teamfortress-rainblower.png', description: "The Rainblower is a weapon from the game Team Fortress 2. In the game, it is a special type of flamethrower that shoots out rainbows instead of flames. In real life, a Rainblower could be useful for creating a festive atmosphere at parties or events. It could also be used as a prop for cosplay or costume parties. Additionally, the bright colors and playful design of the Rainblower could be a fun and unique way to add some visual interest to any setting." },
        { id: 15, categoryId: 1, gameId: 7, name: 'Zelda - Master Sword', euroPrice: '97', centPrice: '58', stock: '333', taille: "Medium", rate: 5, imgLink: '../img/zelda-mastersword.png', description: "The Master Sword from the Legend of Zelda series is a powerful and legendary weapon. In the game, it is able to defeat evil and protect the land of Hyrule. In real life, it could potentially be a useful tool for self-defense or protection. Its mythical properties and legendary reputation could also make it a sought-after item for collectors or fans of the series." },
        { id: 16, categoryId: 2, gameId: 7, name: 'Zelda - TriForce', euroPrice: '1 999', centPrice: '99', stock: '999', taille: "Medium", rate: 3, imgLink: '../img/zelda-triforce.png', description: "The Triforce is a powerful and mythical relic from the Legend of Zelda series of video games. In the game, it is a golden triangle divided into three smaller triangles, each representing the three virtues of power, wisdom, and courage. In real life, a Triforce could be useful as a symbol of these virtues, serving as a reminder to strive for balance and strength in all aspects of life. It could also be used as a talisman, providing its bearer with strength and protection in times of need." },
        { id: 17, categoryId: 0, gameId: 5, name: 'Fortnite - Battle Bus', euroPrice: '14 499', centPrice: '99', stock: '1993', taille: "Medium", rate: 5, imgLink: '../img/fortnite-battlebus.png', description: "A fortnite battle bus would be useful in real life if it works like in the game because it could serve as a reliable and efficient form of transportation. It could carry a large number of people and be used to quickly and easily travel long distances. Additionally, the battle bus would provide protection from the elements and other dangers, making it ideal for use in various scenarios. Plus this will be the coolest way to drop to school/Uni/Work!" },
        { id: 18, categoryId: 2, gameId: 5, name: 'Fortnite - Pickaxe', euroPrice: '99', centPrice: '99', stock: '27', taille: "Medium", rate: 3, imgLink: '../img/fortnite-pickaxe.png', description: "A Fortnite pickaxe is a tool that allows players to mine resources and break objects in the game. In real life, it could be used as a multi-purpose tool for tasks such as camping, gardening, or DIY projects. Its durability and versatile design make it a useful addition to any toolbox." },
        { id: 19, categoryId: 0, gameId: 5, name: 'Fortnite - Umbrella', euroPrice: '98', centPrice: '58', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/fortnite-umbrella.png', description: "The fortnite umbrella, also known as a glider, would be a useful item to have in real life because it allows the user to glide through the air. This could be useful for a variety of purposes, such as traveling long distances quickly or reaching otherwise inaccessible areas. In addition, the fortnite umbrella is also equipped with a built-in parachute, allowing the user to safely descend from great heights. Overall, the fortnite umbrella would be a versatile and useful tool to have in real life." },
        { id: 20, categoryId: 0, gameId: 2, name: 'GTA - JetPack', euroPrice: '450', centPrice: '00', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/gtasanandreas-jetpack.png', description: "A GTA jetpack would be a device that allows the user to fly through the air like in the game. It would be useful in real life for situations where a person needs to quickly and easily navigate through difficult terrain or obstacles. For example, a jetpack could be used by emergency responders to quickly reach the scene of an accident, or by military personnel to quickly move through urban environments. It could also be used for recreational purposes, such as sightseeing or exploring remote areas." },
        { id: 21, categoryId: 5, gameId: 7, name: 'Zelda - Bunny Hood', euroPrice: '60', centPrice: '04', stock: '27', taille: "Medium", rate: 3, imgLink: '../img/zelda-bunnyhood.png', description: "A Zelda Bunny Hood would be a useful item in real life because it would allow the wearer to run at high speeds, just like in the game. This could be useful for people who need to quickly get from one place to another, or for those who want to participate in sports or other physical activities that require speed and agility. Additionally, the Bunny Hood would likely be a popular item among fans of the Zelda series, as it is a recognizable and iconic item from the games." },
        { id: 22, categoryId: 2, gameId: 4, name: 'Sims - Money Tree', euroPrice: '100 000', centPrice: '69', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/sims-moneytree.png', description: "A Sims money tree is a virtual item in the game that allows players to grow and harvest money. In real life, having a money tree would be useful as it would provide a steady source of income without having to work for it. " },
        { id: 23, categoryId: 2, gameId: 3, name: 'Pokemon - Pokeball', euroPrice: '20', centPrice: '22', stock: '27', taille: "Medium", rate: 3, imgLink: '../img/pokemon-pokeball.png', description: "A Pokeball is a spherical device used to capture and contain wild Pokemon. In the game, trainers use these devices to capture and train Pokemon to battle each other. In real life, a Pokeball could be useful as a tool for wildlife conservation and research, allowing researchers to safely capture and study wild animals without harming them. Additionally, the compact size and portability of the Pokeball make it an ideal tool for exploring remote and difficult-to-reach areas." },
        { id: 24, categoryId: 4, gameId: 8, name: 'Skyrim - Potion of Healing', euroPrice: '219', centPrice: '58', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/skyrim-potionofhealing.png', description: "" },
        { id: 25, categoryId: 1, gameId: 8, name: 'Skyrim - Ebony Blade', euroPrice: '578', centPrice: '55', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/skyrim-ebonyblade.png', description: "The Ebony Blade is a weapon found in the game Skyrim. In the game, it is a powerful two-handed sword that absorbs the health of the enemies it strikes. In real life, it could potentially be useful as a self-defense weapon, as its ability to absorb health could give the wielder a physical advantage in a fight." },
        { id: 26, categoryId: 1, gameId: 9, name: 'Portal - Portal Gun', euroPrice: '50 420', centPrice: '67', stock: '27', taille: "Medium", rate: 5, imgLink: '../img/portal-portalgun.png', description: "The portal gun from the game Portal would be a very useful tool to have in real life. It would allow the user to create two linked portals, which they could use to quickly and easily travel through space. This would be especially useful in large buildings or outdoor areas, where it would be impractical to walk from one place to another. Additionally, the ability to create and manipulate portals would open up many possibilities for creative problem-solving, such as using portals to bypass obstacles or reach otherwise inaccessible areas." },

    ]
    ///variables qui chargent des objets ou listes
    var produit = "" //affiche chaque objet dans la fenetre category 
    var jeu = "" //affiche le nom du jeu dans la liste de la fenetre category
    var categorie = '<a id="category" onclick="window.location.replace(\'index.html\')"></a>' //affiche le nom de chaque category dans la bar de navigation
    var infoProduit ="" //affiche toutes les infos specifiques d'un produit
    
    ///variables qui affichent l'objet(s) en fonciton d'une page specifique 
    var idsData = getPageData();
    if (isPage("product.html")){ var produitKey=productobject[idsData[2]].id} //the condition prevent from out of range error
    else{var produitKey=0};
    var cateKey = category[idsData[0]].id;
    var jeuKey = game[idsData[1]].id;
    console.log('typeof(cateKey) : ' + typeof (cateKey)) //very important !! the type of the variable returned by the function is a string, 
    //so I find an error when I look for category[idsData[x]] because i give a string instead of 
    // a number. So I make sure that my key element is a number by giving it the id of the category object
    var pCategorie = "" //affiche la categorie dans laquelle on se trouve

    //on appelle la fonction qui va nous retourner la liste des produits a afficher
    var page_productobject = loadCurrentItems(productobject, cateKey, jeuKey);

    setTimeout(() => {
        for (var i = 0; i < page_productobject.length; i++) {
            produit += '<div class="productItem">';
            produit += '<div class="imgBox">';
            produit += '<img src="' + page_productobject[i].imgLink + '" alt="mouse corsair" class="mouse">';
            produit += '</div>';
            produit += '<div class="contentBox">';
            produit += '<h3>' + page_productobject[i].name + '</h3>';
            produit += '<h2 class="price">' + page_productobject[i].euroPrice + '.<small>' + page_productobject[i].centPrice + '</small> €</h2>';
            produit += '<a href="#" class="buy" onclick="loadProductPage('+ page_productobject[i].id +')" >Buy Now</a>';
            produit += '</div>';
            produit += '</div>';
        }



        for (var i = 0; i < game.length; i++) {
            jeu += '<li><a id="game' + game[i].id + '" onclick="loadGamePage(' + cateKey +','+ game[i].id + ')" href="#"> ' + game[i].name + '</a></li>';
        }

        for (var i = 0; i < category.length; i++) {
            categorie += '<a id="category' + category[i].id + '" onclick="loadCategoryPage(' + category[i].id + ',' + 1 + ')" href="#"> ' + category[i].name + ' </a>';
        }
        //write the title of the category depending on the id of the page
        pCategorie += '<h1>' + category[cateKey].name + '</h1>'; //we have to increment the index because the 1st id at the 0th position 

        //addid the products info <- to be loaded in product.html
        infoProduit+='<div class="productPreview">';
        infoProduit+='    <div class="imgBox">';
        infoProduit+='      <img src="'+productobject[produitKey].imgLink+'" alt="mouse corsair" class="mouse">';
        infoProduit+='    </div>';
        infoProduit+='</div>';
        infoProduit+='<div class="productInfo" id="productInfo">';
        infoProduit+='    <div class="contentBox">';
        infoProduit+='      <h3>'+productobject[produitKey].name+'</h3>';
        infoProduit+='      <div class="infoWrapper">';
        infoProduit+='        <div><span>Categorie</span><span>'+category[productobject[produitKey].categoryId].name+'</span></div>';
        infoProduit+='        <div><span>License Officielle</span><span>'+game[productobject[produitKey].gameId].License+'</span></div>';
        infoProduit+='        <div><span>Stock</span><span>'+productobject[produitKey].stock+'</span></div>';
        infoProduit+='        <div><span>Tailles</span><span>'+productobject[produitKey].taille+'</span></div>';
        infoProduit+='      </div>';
        infoProduit+='      <div class="priceWrapper">';
        infoProduit+='        <span><h2 class="price">'+productobject[produitKey].euroPrice+'.<small>'+productobject[produitKey].centPrice+'</small> €</h2></span>';
        infoProduit+='        <span><button class="button-21" role="button">+ Add to cart</button></span>';
        infoProduit+='      </div>';
        infoProduit+='      <p class="description">'+productobject[produitKey].description+'</p>';
        infoProduit+='      <div class="ratingWrapper">';
        infoProduit+='        <fieldset class="rating">';
        infoProduit+='          <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>';
        infoProduit+='          <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>';
        infoProduit+='          <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>';
        infoProduit+='          <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>';
        infoProduit+='          <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>';
        infoProduit+='          <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>';
        infoProduit+='          <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>';
        infoProduit+='          <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>';
        infoProduit+='          <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>';
        infoProduit+='          <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>';
        infoProduit+='        </fieldset>';
        infoProduit+='        <span>'+productobject[produitKey].rate+' star.s</span>';
        infoProduit+='      </div>';
        infoProduit+='    </div>';
        infoProduit+='    </div>';
        

        if (document.getElementById("productsList") !== null) {
            document.getElementById("productsList").innerHTML = produit
            document.getElementById("nbArticles").innerHTML = page_productobject.length
                }
        if (document.getElementById("listBody") !== null) {
            document.getElementById("listBody").innerHTML = jeu
        }
        if (document.getElementById("navMenu") !== null) {
            document.getElementById("navMenu").innerHTML = categorie
        }
        if (document.getElementById("categoryNameById") != null) {
            document.getElementById("categoryNameById").innerHTML = pCategorie
        }
        if (document.getElementById("bodyWrapper") != null) {
            document.getElementById("bodyWrapper").innerHTML = infoProduit
        }

    }, 500);
}

funCall()
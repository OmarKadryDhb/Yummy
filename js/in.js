$(function(){
    //loading 
    function startloading(){
        $(".sk-chase").fadeOut(1500,function(){ 
            $("#loading").fadeOut(1000,function(){
                $("body").css("overflow",'auto');
                $("#loading").remove();
            });})
    }
    startloading();
    
    // get&display Meals
    async function getMeals(){
        let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=
        `)
        let finalRes=await myHttp.json();
        displayMeals(finalRes.meals)
        
        // console.log(finalRes.meals);
    }
    getMeals();
    function displayMeals(finalRes){
    let box=``;
    for(let i=0 ;i<finalRes.length;i++){
        box +=`
        <div class="col-md-6 col-lg-3">
        <div class="card mealCard border-0 shadow-sm rounded-1" id="${finalRes[i].idMeal}"> 
          <div class="card-img  overflow-hidden position-relative">
          <img src=${finalRes[i].strMealThumb} class="card-img-top" alt="...">
          <div class="layer bg-white bg-opacity-75 position-absolute d-flex align-items-center justify-content-start ">
           <div class="layer-content d-flex flex-column align-items-start justify-content-center">
            <span class="h2 ms-3">${finalRes[i].strMeal}</span> 
           </div>
          </div>
          </div>
        </div>
        </div>`
    }
    $("#meals").html(box);
    $(".mealCard").click(function(e){
        let mealId=($(e.target).parents(".mealCard")).attr("id");
        getDetails(mealId);
        $("#mealDetails").css("display","block")
        $("#backbtn").css("display","block");
        $("#mealsCon").css("display","none")
    })
}
    
    //get&set details
    async function getDetails(idMeal){
        let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}
        `)
        let finalRes=await myHttp.json();
        setDetails(finalRes.meals[0])
    }
    function setDetails(details){
        let box=``
        for (let i = 1; i<=20;i++) {
            let strI="strIngredient"+i;
            let strM="strMeasure"+i
                box +=`
                <h6 class=" bg-info text-white m-2 w-25 rounded-2 fs-6">${details[strI]+details[strM]}</h6>
              `
        }
        $("#mealDetails").html(`
        <div class="container mt-5">
        <div class="row">
          <div class="col-md-6" id="mealImg">
              <img src=${details.strMealThumb} alt="" class="img-fluid">
              <span class="h1">${details.strMeal}</span>
          </div>
          <div class="col-md-6" id="mealInstructions">
          <H1>Instructions</H1>
          <p>${details.strInstructions}</p>
                  <h2>Area : <span>${details.strArea}</span></h2>
                  <h2>Category : <span>${details.strCategory}</span></h2>
                  <h2 class="mb-3">Recipes :</h2>
                  <div class="container">
                <div class="row">
                    ${box}
                </div>
                </div>
                    <h2 class="mt-3">Tags :</h2>
                    <h6 class=" bg-warning text-white mt-2 mb-2 p-2 w-25 rounded-2 fs-6">${details.strTags}</h6>
                  <div class="buttuns d-flex">
                    <a href="${details.strSource}" target="_blank" class="btn bg-success text-white m-1 text-decoration-none text-white">Source</a>
                    <a href="${details.strYoutube}" target="_blank" class="btn bg-danger text-white m-1" text-decoration-none text-white">Youtube</a>
                  </div>
          </div>
        
        </div>  
      </div>
      `)
    }

    // get&display Categories
    async function getCategories(){
        let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php
        `)
        let finalRes=await myHttp.json();
        displayCategories(finalRes.categories)
    }
    getCategories();
    function displayCategories(finalRes){
    let box=``;
    for(let i=0 ;i<finalRes.length;i++){
        box +=`
        <div class="col-md-6 col-lg-3">
        <div class="card categoryCard border-0 shadow-sm rounded-1 bg-black" id="${finalRes[i].strCategory}"> 
          <div class="card-img  overflow-hidden position-relative ">
          <img src=${finalRes[i].strCategoryThumb} class="card-img-top" alt="...">
          <div class="layer bg-white bg-opacity-75 position-absolute d-flex align-items-center justify-content-start ">
           <div class="layer-content d-flex flex-column align-items-start justify-content-center">
            <span class="h2 ms-3 text-center">${finalRes[i].strCategory}</span>
            <p class="w-100 text-center">${finalRes[i].strCategoryDescription}</p>
           </div>
          </div>
          </div>
        </div>
        </div>`
    }
    $("#categories").html(box);
    $(".categoryCard").click(function(e){
        let CategoryId=($(e.target).parents(".categoryCard")).attr("id");
        getFilterCategory(CategoryId);
    })
}

    // get&set Area
    async function getArea(){
        let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list
        `)
        let finalRes=await myHttp.json();
        displayArea(finalRes.meals)
    }
    getArea();
    function displayArea(finalRes){
    let box=``;
    for(let i=0 ;i<finalRes.length;i++){
        box +=`
        <div class="col-md-6 col-lg-3">
        <div class="card areaCard border-0 shadow-sm rounded-1 bg-black" id=${finalRes[i].strArea}> 
            <i class="fa-solid fa-house text-center fs-1 text-white mb-2"></i>
            <h1 class="text-center text-white">${finalRes[i].strArea}</h1>
        </div>
        </div>`
    }
    $("#area").html(box);
    $(".areaCard").click(function(e){
        let areaId=($(e.target).parents(".areaCard")).attr("id");
        getFilterArea(areaId);
    })
}
    // get$set Ingredients
    async function getIngredients(){
        let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list
        `)
        let finalRes=await myHttp.json();
        displayIngredients(finalRes.meals)
    }
    getIngredients();
    function displayIngredients(finalRes){
    let box=``;
    for(let i=0 ;i<finalRes.length;i++){
        box +=`
        <div class="col-md-6 col-lg-3">
        <div class="card IngredientsCard border-0 shadow-sm rounded-1 bg-black" id="${finalRes[i].strIngredient}"> 
        <i class="fa-solid fa-drumstick-bite text-center fs-1 text-white"></i>
        <h1 class="text-center text-white">${finalRes[i].strIngredient}</h1>
        <p class="text-white text-center ">${finalRes[i].strDescription}</p>
        </div>
        </div>`
    }
    $("#Ingredients").html(box);
    $(".IngredientsCard").click(function(e){
        let IngredientId=($(e.target).parents(".IngredientsCard")).attr("id");
        getFilterIngredients(IngredientId);
    })
}    
    //git&set filterCategory 
    async function getFilterCategory(category){
    let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}
    `)
    let finalRes=await myHttp.json();
    displayMeals(finalRes.meals)
    $("#categoriesCon").css("display","none")
    $("#mealsCon").css("display","block")
}   

    //git&set filterIngredients 
    async function getFilterIngredients(Ingredients){
        let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}
        `)
        let finalRes=await myHttp.json();
        displayMeals(finalRes.meals)
        $("#IngredientsCon").css("display","none")
        $("#mealsCon").css("display","block")
    }   
    
    //git&set filterArea 
    async function getFilterArea(Area){
        let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}
        `)
        let finalRes=await myHttp.json();
        displayMeals(finalRes.meals)
        $("#areaCon").css("display","none")
        $("#mealsCon").css("display","block")
}   
    // search By Name&firstLetter
    let searchName=$("#searchName");
    let searchLetter=$("#searchLetter");
    searchName.keyup(function(){
        searchByName(searchName.val())
    })
    searchLetter.keyup(function(){
        searchByLetter(searchLetter.val())
    })
        // Name
    async function searchByName(name){
        let myHttp= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}
        `)
        let finalRes=await myHttp.json();
        if (finalRes.meals!=null) {
            displayMeals(finalRes.meals)
            $("#mealsCon").css("display","block")
        }
    }
        // firstLetter
    async function searchByLetter(letter){
        let myHttp= await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?f=${letter}
        `)
        let finalRes=await myHttp.json();
        if (finalRes.meals!=null) {
            displayMeals(finalRes.meals)
            $("#mealsCon").css("display","block")
        }
    }
    
    function run() {
        // meals functions
        $("#mealDetails").css("display","none")
        $("#backbtn").css("display","none")
        $("#backbtn").click(function(){
            $("#mealDetails").css("display","none");
            $("#backbtn").css("display","none");
            $("#mealsCon").css("display","block");
           
        });
        // category functions
        $("#categoriesCon").css("display","none")
        $("#Categories-btn").click(function () {
            $("#categoriesCon").css("display","block")
            $("#mealsCon").css("display","none")
            $("#contactCon").css("display","none");
            $("#areaCon").css("display","none")
            $("#IngredientsCon").css("display","none")
            $("#searchCon").css("display","none");
            $("#mealDetails").css("display","none")
            $("#backbtn").css("display","none")
        })
        // area functions
        $("#areaCon").css("display","none")
        $("#Area-btn").click(function () {
            $("#areaCon").css("display","block")
            $("#categoriesCon").css("display","none")
            $("#mealsCon").css("display","none")
            $("#contactCon").css("display","none");
            $("#IngredientsCon").css("display","none")
            $("#searchCon").css("display","none");
            $("#mealDetails").css("display","none")
            $("#backbtn").css("display","none")
        })
        // Ingredients functions
        $("#IngredientsCon").css("display","none")
        $("#Ingredients-btn").click(function () {
            $("#IngredientsCon").css("display","block")
            $("#mealsCon").css("display","none")
            $("#areaCon").css("display","none")
            $("#categoriesCon").css("display","none")
            $("#contactCon").css("display","none");
            $("#searchCon").css("display","none");
            $("#mealDetails").css("display","none")
            $("#backbtn").css("display","none")
        })
        // contact
        $("#contactCon").css("display","none");
        $("#contact-btn").click(function () {
            $("#contactCon").css("display","block")
            $("#IngredientsCon").css("display","none")
            $("#mealsCon").css("display","none")
            $("#areaCon").css("display","none")
            $("#categoriesCon").css("display","none")
            $("#searchCon").css("display","none");
            $("#mealDetails").css("display","none")
            $("#backbtn").css("display","none")
        })
        //Serach   
        $("#searchCon").css("display","none");
        $("#search-btn").click(function () {
            $("#searchCon").css("display","block")
            $("#IngredientsCon").css("display","none")
            $("#mealsCon").css("display","none")
            $("#areaCon").css("display","none")
            $("#categoriesCon").css("display","none")
            $("#contactCon").css("display","none");
            $("#mealDetails").css("display","none")
            $("#backbtn").css("display","none")
        })
    }
    run();

    //SideBar 
    let sideBarineerWidth=$(".sideBar-ineer").innerWidth();
    $("#sideBar").css('left',-sideBarineerWidth);
    $("#close").css("display","none")
    //Open 
    $("#open").click(function () {
            $("#sideBar").animate({left:"0px"},500, function(){
                $(".options .to-top1").css({transform:"translateY(-20px)"})
                $(".options .to-top2").css({transform:"translateY(-20px)"})
                $(".options .to-top3").css({transform:"translateY(-20px)"})
                $(".options .to-top4").css({transform:"translateY(-20px)"})
                $(".options .to-top5").css({transform:"translateY(-20px)"})
            })
            $("#open").css("display","none")
            $("#close").css("display","block")
        })
    //close
        $("#close").click(function () {
        $("#sideBar").animate({left:-sideBarineerWidth},500,function(){           
            $(".options .to-top1").css("transform","translateY(0px)") 
            $(".options .to-top2").css("transform","translateY(0px)") 
            $(".options .to-top3").css("transform","translateY(0px)") 
            $(".options .to-top4").css("transform","translateY(0px)") 
            $(".options .to-top5").css({transform:"translateY(0px)"})
        })
        $("#open").css("display","block");
        $("#close").css("display","none")
    })
})
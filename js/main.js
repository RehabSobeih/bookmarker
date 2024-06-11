// ^ html variable
let siteName = document.querySelector("#siteName");
let siteURL = document.querySelector("#siteURL");
let btn = document.querySelector("#btn");



// ^ app variable
let row = document.querySelector("#demo");
let  dataList;


if ( localStorage.getItem("data") == null){
     dataList=[];
   
}else {
     dataList =  JSON.parse(localStorage.getItem("data"));
    displayData(dataList);    
}


// ^ functions

// * get data
function getData(){
    if(isNameValid() && isURLValid()){
        let data ={
            name: siteName.value,
            url: siteURL.value
        }
        dataList.push(data);
        // console.log(dataList);
        setToLocalStorage()
        displayData(dataList);
        clearInputs()
    }
    else{
       console.log("error")
    }
    
}



// * display data
function displayData(list){
  let cartona ="";
    for(let i=0 ; i<list.length ;i++){
      cartona +=`<tr> <td>${i+1}</td>
      <td>${list[i].name}</td>
      <td><button class="btn btn-success"><a href="${list[i].url}"><i class="px-2 fa-solid fa-eye"></i>Visit</a></button></td>
      <td><button onClick="deleteData(${i})" class="btn btn-danger"><i class="px-2 fa-solid fa-trash-can"></i>Delete</button></td>
      </tr>`
    }
    row.innerHTML = cartona;
    // console.log(cartona);
}


// * clear inputs
function clearInputs(){
    siteName.value = "";
    siteURL.value = "" ;
}


// * delete data
function   deleteData(index){
    dataList.splice(index,1);
    setToLocalStorage();
    displayData(dataList);
}

// * setToLocalStorage
function  setToLocalStorage(){
    localStorage.setItem("data" , JSON.stringify(dataList));
}


// * validation function
function isNameValid(){
    let  regexName = /^[A-Za-z ]{4,15}$/;
    if(regexName.test(siteName.value)){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        return true
    }else{
        console.log("name error")
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        return false
    }
}



function isURLValid(){
    let regexUrl = /^(https:\/\/)?(www\.)?[A-Za-z_ ]{4,15}.com$/;
    if(regexUrl.test(siteURL.value)){
     siteURL.classList.add("is-valid");
     siteURL.classList.remove("is-invalid");
        return true
    }else{
        console.log("url error")
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid");
        return false
    }
}



// ^ event
btn.addEventListener("click",getData);
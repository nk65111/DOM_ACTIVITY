let menu =document.querySelector(".menu");
let fileMenuOption=document.querySelector(".file-option");
let homeMenuOption=document.querySelector(".home-option")
let bold=document.querySelector(".bold");
let underline=document.querySelector(".underline");
let italic=document.querySelector(".italic");

menu.addEventListener("click",function(e){
   if(e.target.classList.contains("menu")){
       return;
   }
   let selectedMenu=e.target;
   if(selectedMenu.classList.contains("active-menu")){
       return;
   }

   document.querySelector(".active-menu").classList.remove("active-menu");
   selectedMenu.classList.add("active-menu");

   let menuName=selectedMenu.classList[0];
   if(menuName=="home"){
       homeMenuOption.classList.remove("hide");
       fileMenuOption.classList.add("hide");
   }else{
    fileMenuOption.classList.remove("hide");
    homeMenuOption.classList.add("hide");
   }
})

bold.addEventListener("click",function(e){
    setfontStyle("bold",bold);
});
underline.addEventListener("click",function(e){
    setfontStyle("underline",underline);
});
italic.addEventListener("click",function(e){
    setfontStyle("italic",italic);
});

function setfontStyle(StyleName,element){
    if(lastSelectedTag){
       let {rowid,colid}=getrowColIdFromElement(lastSelectedTag);
       let cellObject=db[rowid][colid];
       if(cellObject.fontStyle[StyleName]){
          if(StyleName=="bold"){
            lastSelectedTag.style.fontWeight="normal";
          }else if(StyleName=="underline"){
            lastSelectedTag.style.textDecoration ="none";
          }else if(StyleName=="italic"){
            lastSelectedTag.style.fontStyle ="normal";
          }
          element.classList.remove("active-style");
       }else{
           if(StyleName=="bold"){
            lastSelectedTag.style.fontWeight="bold";
           }else if(StyleName=="underline"){
            lastSelectedTag.style.textDecoration ="underline";
           }else if(StyleName=="italic"){
            lastSelectedTag.style.fontStyle ="italic";
           }
           element.classList.add("active-style");
       }
       cellObject.fontStyle[StyleName]=!cellObject.fontStyle[StyleName];
    }
}


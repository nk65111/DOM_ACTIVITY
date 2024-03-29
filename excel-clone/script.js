let topLeftContent=document.querySelector(".top-left-content");
let topContent=document.querySelector(".top-content");
let leftContent=document.querySelector(".left-content");
let allCells=document.querySelectorAll(".col");
let formulaTag=document.querySelector("#formulaid");
let addressTag=document.querySelector("#addressid");
let lastSelectedTag;
cellContent.addEventListener("scroll",function(e){
   let left=e.target.scrollLeft;
   let top=e.target.scrollTop;

   topLeftContent.style.top=top+"px";
   topLeftContent.style.left=left+"px";
   topContent.style.top=top+"px";
   leftContent.style.left=left+"px";
   
});
for(let i=0;i<allCells.length;i++){
   allCells[i].addEventListener("click",function(e){
       let rowid=Number(e.target.getAttribute("rowid"));
       let colid=Number(e.target.getAttribute("colid"));
       let cellObject=db[rowid][colid];
       let address= String.fromCharCode(65+colid)+(rowid+1)+"";
       addressTag.value=address;
       formulaTag.value=cellObject.formula;

       cellObject.fontStyle.bold 
       ? document.querySelector(".bold").classList.add("active-style")
       :document.querySelector(".bold").classList.remove("active-style");

       cellObject.fontStyle.underline 
       ? document.querySelector(".underline").classList.add("active-style")
       :document.querySelector(".underline").classList.remove("active-style");

       cellObject.fontStyle.italic 
       ? document.querySelector(".italic").classList.add("active-style")
       :document.querySelector(".italic").classList.remove("active-style");

   });

   allCells[i].addEventListener("blur",function(e){
      lastSelectedTag=e.target;
      let cellValue=e.target.textContent;
      let rowid=e.target.getAttribute("rowid");
      let colid=e.target.getAttribute("colid");
      let cellDB=db[rowid][colid];
      if(cellDB.value==cellValue){
         return;
      }
      if(cellDB.formula){
         removeFormula(cellDB);
         formulaid.value="";

      }
      cellDB.value=cellValue;

      updateChildren(cellDB);
      if(cellDB.visited){
         return;
      }
      cellDB.visited=true;
      visitedCells.push({rowId:rowid,colId:colid});
   });

   allCells[i].addEventListener("keydown",function(e){
      if(e.key=="Backspace"){
         let cell=e.target;
         let {rowid,colid}=getrowColIdFromElement(cell);
         let cellObject=db[rowid][colid];
         if(cellObject.formula){
            removeFormula(cellObject);
            formulaid.value="";
            cell.textContent="";
         }
      }
   })
}

formulaTag.addEventListener("blur",function(e){
    let formula=e.target.value;
    if(formula){
        let {rowid,colid}=getrowColIdFromElement(lastSelectedTag);
        let cellObject=db[rowid][colid];
        if(cellObject.formula){
           removeFormula(cellObject);
        }
        let value=solveFormula(formula,cellObject);
        cellObject.value=value;
        cellObject.formula=formula;
        lastSelectedTag.textContent=value;
        updateChildren(cellObject);
        if(cellObject.visited){
         return;
         }
        cellObject.visited=true;
        visitedCells.push({rowId:rowid,colId:colid});
    }
});
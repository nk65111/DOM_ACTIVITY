let todoInput=document.querySelector(".todo-input");
let addBtn=document.querySelector(".add-todo");
let tododLists=document.querySelector(".todos-list");

function addTodos(){
    let todo=todoInput.value;
    if(todo){
 
     let listItem=document.createElement("li");
     listItem.classList.add("todo-item");
 
     let pTag=document.createElement("p");
     pTag.classList.add("todo");
     pTag.innerHTML=todo;
 
     let deletBtn=document.createElement("button");
     deletBtn.classList.add("delete-todo");
     deletBtn.innerHTML="Delete";
     
     deletBtn.addEventListener("click",function(e){
         e.target.parentNode.remove();
     })
 
 
     listItem.append(pTag);
     listItem.append(deletBtn);
     // console.log(listItem);
     tododLists.append(listItem);
     todoInput.value="";
    }
}
addBtn.addEventListener("click",function(){
   addTodos();
    
})

todoInput.addEventListener("keypress",function(e){
    if(e.key=="Enter"){
        addTodos();
    }
})


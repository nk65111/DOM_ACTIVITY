let FilterCodes={
    "pink":"#ff6b81",
    "blue":"#1e90ff",
    "green":"#2ed573",
    "black":"#3d3d3d"
}
let selectedFilter="black";
let TicketContainer=document.querySelector(".ticket-container");
let allDivs=document.querySelectorAll(".filter-container div");
let OpenModal=document.querySelector(".open-modal");
let closeModal=document.querySelector(".close-modal");


OpenModal.addEventListener("click",OpenModalBox);

function putLocalStorage(){
    if(localStorage.getItem("AllItem")){
        TicketContainer.innerHTML="";
        let AllItem=JSON.parse(localStorage.getItem("AllItem"));
        for(let i=0;i<AllItem.length;i++){
           let {ticketFilter,ticketid,ticketContent}= AllItem[i];

        let TicketDiv=document.createElement("div");
        TicketDiv.classList.add("ticket");
        TicketDiv.innerHTML=` <div class="ticket-filter ${ticketFilter}"></div>
        <div class="ticket-info">
        <div class="ticket-id">#${ticketid}</div>
        <div class="delete-ticket">
        <i class="far fa-trash-alt" id=${ticketid}></i>
        </div>
        </div>
        <div class="ticket-content">${ticketContent}</div>`
        TicketContainer.append(TicketDiv);
        TicketDiv.querySelector(".delete-ticket i").addEventListener("click",deleteTicket);
        TicketDiv.querySelector(".ticket-filter").addEventListener("click",toggleTicketFilter);
        }
    }
}

putLocalStorage();
function OpenModalBox(e){
    let modal=document.querySelector(".modal");
    if(modal){
        return ;
    }
     let ModalDiv=document.createElement("div");
     ModalDiv.classList.add("modal");
     ModalDiv.innerHTML=`
     <div class="modal-textBox" data-type="false" contenteditable="true">
            Enter your task here
          </div>
          <div class="modal-filter-option">
              <div class="modal-filter pink"></div>
              <div class="modal-filter blue"></div>
              <div class="modal-filter green"></div>
              <div class="modal-filter black active-filter"></div>
          </div>`;

          ModalDiv.querySelector(".modal-textBox").addEventListener("click",clearReamainData);
          ModalDiv.querySelector(".modal-textBox").addEventListener("keypress",addTicket);
          let AllModalFilter=ModalDiv.querySelectorAll(".modal-filter");
          for(let i=0;i<AllModalFilter.length;i++){
              AllModalFilter[i].addEventListener("click",ChooseTicketFilter);
          }
          TicketContainer.append(ModalDiv);
     
}

function ChooseTicketFilter(e){
    let currentSelectedFilter=e.target.classList[1];
    selectedFilter=currentSelectedFilter;
    document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
    e.target.classList.add("active-filter");
}
function addTicket(e){
    if(e.key=="Enter"){
        let ticktData= e.target.textContent;
        let ticketId=uid();
        if(ticktData.length!=0){
        let TicketDiv=document.createElement("div");
        TicketDiv.classList.add("ticket");
        TicketDiv.innerHTML=` <div class="ticket-filter ${selectedFilter}"></div>
        <div class="ticket-info">
        <div class="ticket-id">#${ticketId}</div>
        <div class="delete-ticket">
        <i class="far fa-trash-alt" id=${ticketId}></i>
        </div>
        </div>
        <div class="ticket-content">${ticktData}</div>`
        TicketContainer.append(TicketDiv);
        TicketDiv.querySelector(".delete-ticket i").addEventListener("click",deleteTicket);
        TicketDiv.querySelector(".ticket-filter").addEventListener("click",toggleTicketFilter);
        }
        e.target.parentNode.remove();
        if(!localStorage.getItem("AllItem")){
            let AllItem=[];
            let ItemObject={};
               ItemObject.ticketFilter=selectedFilter;
               ItemObject.ticketid=ticketId;
               ItemObject.ticketContent=ticktData;
           
            AllItem.push(ItemObject);
            localStorage.setItem("AllItem",JSON.stringify(AllItem));
        }
        else{
            let AllItem=JSON.parse(localStorage.getItem("AllItem"));
            let ItemObject={};
               ItemObject.ticketFilter=selectedFilter;
               ItemObject.ticketid=ticketId;
               ItemObject.ticketContent=ticktData;
           
            AllItem.push(ItemObject);
            localStorage.setItem("AllItem",JSON.stringify(AllItem));
        }
        selectedFilter="black";
    }
    
    
}
closeModal.addEventListener("click",ClosetheModal);
function ClosetheModal(e){
    if(document.querySelector(".modal")){
        document.querySelector(".modal").remove();
    }
}

function clearReamainData(e){
    if(e.target.getAttribute("data-type")=="true"){
        return;
    }
    e.target.innerHTML="";
    e.target.setAttribute("data-type","true");
}
for(let i=0;i<allDivs.length;i++){
   allDivs[i].addEventListener("click",chooseFilter);
}

function chooseFilter(e){
    if(e.target.classList.contains("active-filter")){
        e.target.classList.remove("active-filter");
        TicketContainer.innerHTML="";
        putLocalStorage()
        return;
      }

    if(document.querySelector(".filter.active-filter")){
        document.querySelector(".filter.active-filter").classList.remove("active-filter");
    }
    e.target.classList.add("active-filter");
    let filterColor=e.target.classList[1];
    loadSelectedFilter(filterColor);

}

function loadSelectedFilter(filterColor){
    if(localStorage.getItem("AllItem")){
        let AllItem=JSON.parse(localStorage.getItem("AllItem"));
        let filterTicket=AllItem.filter(function(filterObject){
            return filterObject.ticketFilter==filterColor;
        });
        // console.log(filterTicket);
        TicketContainer.innerHTML="";
        for(let i=0;i<filterTicket.length;i++){
            let {ticketFilter,ticketid,ticketContent}= filterTicket[i];
 
         let TicketDiv=document.createElement("div");
         TicketDiv.classList.add("ticket");
         TicketDiv.innerHTML=` <div class="ticket-filter ${ticketFilter}"></div>
         <div class="ticket-info">
        <div class="ticket-id">#${ticketid}</div>
        <div class="delete-ticket">
        <i class="far fa-trash-alt" id=${ticketid}></i>
        </div>
        </div>
         <div class="ticket-content">${ticketContent}</div>`
         TicketContainer.append(TicketDiv);
         TicketDiv.querySelector(".delete-ticket i").addEventListener("click",deleteTicket);
         TicketDiv.querySelector(".ticket-filter").addEventListener("click",toggleTicketFilter);
         }
    }
}

function deleteTicket(e){
    let deleteTicketId=e.target.id;
    let getItem=JSON.parse(localStorage.getItem("AllItem"));
    let AfterDeleteTicket=getItem.filter(function(filterObject){
        return filterObject.ticketid!=deleteTicketId;
    });
    localStorage.setItem("AllItem",JSON.stringify(AfterDeleteTicket));
    let AllItem=JSON.parse(localStorage.getItem("AllItem"));
    putLocalStorage();

}

function toggleTicketFilter(e){
    let filterColors=["pink","blue","green","black"];
    let currentFilter=e.target.classList[1];
    let idx=filterColors.indexOf(currentFilter);
    idx++;
    idx=idx%filterColors.length;
    let currentTicket=e.target;
    currentTicket.classList.remove(currentFilter);
    currentTicket.classList.add(filterColors[idx]);
    let AllItem=JSON.parse(localStorage.getItem("AllItem"));
    let id=currentTicket.nextElementSibling.children[0].textContent.split("#")[1];
    console.log(id);
    for(let i=0;i<AllItem.length;i++){
        if(AllItem[i].ticketid==id){
            AllItem[i].ticketFilter=filterColors[idx];
            break;
        }
    }
    localStorage.setItem("AllItem",JSON.stringify(AllItem));
}
// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);
// clear items
clearBtn.addEventListener('click', clearItems);
// load items

// ****** FUNCTIONS **********
function addItem (e){
     e.preventDefault();
     const value = grocery.value;
     const id = new Date().getTime().toString();
     if(value !== '' && editFlag === false){
          const element = document.createElement('article');
          // add class
          element.classList.add('grocery-item');
          // add id
          const attr = document.createAttribute('data-id');
          attr.value = id;
          element.setAttributeNode(attr);
          element.innerHTML = `<p class="title">${value}</p>
          <div class="btn-container">
            <button type="button" class="edit-btn">
              <i class="fa fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
              <i class="fa fa-trash"></i>
            </button>
          </div>`;
     const deleteBtn = element.querySelector(".delete-btn");
     const editBtn = element.querySelector(".edit-btn");
     deleteBtn.addEventListener('click', deleteItem);
     editBtn.addEventListener('click', editItem);
          // append child listItems
          list.appendChild(element);
          // display alert
          displayAlert("item added to the list", "success");
          // show container
          container.classList.add("show-container");
          // add to local storage
          addToLocalStorage(id, value);
          // set back to default
          setBackToDefault();
     }else if(value !== '' && editFlag === true){
          editElement.innerHTML = value;
          displayAlert('value added', 'success');
          // edit local storage
          editLocalStorage(editID, value);
          setBackToDefault();
     }else{
          displayAlert("please enter a value", "danger")
     }
};
// display alert
function displayAlert(text, action) {
     alert.textContent = text;
     alert.classList.add(`alert-${action}`);
     // remove alert
     setTimeout(function () {
       alert.textContent = "";
       alert.classList.remove(`alert-${action}`);
     }, 1000);
   }
// clear Items
function clearItems(){
   const items = document.querySelectorAll(".grocery-item");
   if(items.lenght > 0){
     items.forEach(function(item){
          list.removeChild(item);
     });
   }
   container.classList.remove("show-container");
   displayAlert("empty list", "danger");
   setBackToDefault();
   localStorage.removeItem('list');
}
// edit function
function editItem(e){
     const element = e.currentTarget.parentElement.parentElement;
     // set edit item
     editElement = e.currentTarget.parentElement.previousElementSibling;
     // set form value
     grocery.value = editElement.innerHTML;
     editFlag = true;
     editID = element.dataset.id;
     submitBtn.textContent = "edit";
}
// delete function
function deleteItem(e){
     const element = e.currentTarget.parentElement.parentElement;
     const id = element.dataset.id;
     list.removeChild(element);
     if(list.children.length === 0){
          container.classList.remove("show-container");
     }
     displayAlert('item removed', 'danger');
     setBackToDefault();
     // remove from local storage
     removeFromLocalStorage(id);
}

// set back to default
function setBackToDefault () {
     grocery.value = "";
     editFlag = false;
     editID = "";
     submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = {id, value};
    let items = getLocalStorage();
    localStorage.setItem('list',JSON.stringify(items));
}
function removeFromLocalStorage(id){
     let items = getLocalStorage();
     items = items.filter(function(item){
          if(item.id !== id){
               return item;
          }
     });
     localStorage.setItem('list',JSON.stringify(items));
}
function editLocalStorage(id, value){
     let items = getLocalStorage();
     items = items.map(function(item){
          if(item.id === id){
               item.value = value;
          }
          return item;
     });
     localStorage.setItem('list',JSON.stringify(items));
}
function getLocalStorage(){
     return localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")): [];
}
// localStorage API
// setItem
// getItem
// removeItem
// save as string
// localStorage.setItem('orange', JSON.stringify(['item','item2']));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// localStorage.removeItem("orange");

// ****** SETUP ITEMS **********


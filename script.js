let ul = document.querySelector(".display ul")
document.querySelector(".choose-expense form").addEventListener('submit',saveDetails);
window.addEventListener('load', renderElements)
ul.addEventListener('click', handleClick)


const axiosInstance = axios.create({
    baseURL : "http://localhost:4000/expense"
})

var next = null;
var id = null;

async function saveDetails(e){
    e.preventDefault();
    // console.log("demo")

    try{
    const value = {
        expense : e.target.expense.value,
        description : e.target.description.value,
        category : e.target.category.value
    }
    if(id === null){

    
    let {data } = await axiosInstance.post('/add-expense' , value)
    console.log(data.data)
    let li = display(data.data)
     ul.appendChild(li)
    }else{
        let res = await axiosInstance.post(`/edit-expense/${id}` , value)
        console.log(res)
        if(res.status == 200){
            value.id = id;
            let li = display(value);
            ul.insertBefore( li , next)

        }
            next = null
            id= null
      
       
    }


    document.getElementById('expense').value = ''
    document.getElementById('description').value = ''
    document.getElementById('category').value = 'movie'
}catch(e){
    console.log(e)
}
}

async function renderElements(){

    let data = await axiosInstance.get()
    console.log(data)
    let users = data.data.data;
    users.forEach((value) => {
        
  
    let li = display(value)
     ul.appendChild(li)
    })
}


function display(data){
    let li = document.createElement('li')
    let span1 = document.createElement('span')
    span1.textContent = data.expense
    let span2 = document.createElement('span')
    span2.textContent = data.description
    let span3 = document.createElement('span')
    span3.textContent = data.category

    li.appendChild(span1)
    li.appendChild(span2)
    li.appendChild(span3)


     let del = document.createElement('button')
     del.appendChild(document.createTextNode("Delete expense"))
     del.classList.add('delete')
     del.id = data.id
     let edit = document.createElement('button')
     edit.appendChild(document.createTextNode("Edit expense"))
     edit.classList.add('edit')
     edit.id = data.id
     li.appendChild(del)
     li.appendChild(edit)
     return li;
}

async function handleClick(e){
    try{
    if(e.target.classList.contains('delete')){
        let expenseId = e.target.id;
        let res = await axiosInstance.delete(`/deleteExpense/${expenseId}`)
        if(res.status == 200){
            ul.removeChild(e.target.parentElement)
        }
        console.log(res)
    }
    if(e.target.classList.contains('edit')){
        next = e.target.parentElement.nextElementSibling
        id = e.target.id;
        let li = e.target.parentElement;
        let spans = li.getElementsByTagName('span')
        document.getElementById('expense').value = spans[0].textContent
        document.getElementById('description').value = spans[1].textContent
        document.getElementById('category').value = spans[2].textContent
        ul.removeChild(li)
    }
    }catch(e){
        console.log(e)
    }
}


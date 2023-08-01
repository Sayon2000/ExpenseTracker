let ul = document.querySelector(".display ul")
document.querySelector(".choose-expense form").addEventListener('submit',saveDetails);
window.addEventListener('load', renderElements)
ul.addEventListener('click', handleClick)
function saveDetails(e){
    e.preventDefault();
    // console.log("demo")

    const value = {
        expense : e.target.expense.value,
        description : e.target.description.value,
        category : e.target.category.value
    }
    let data = []
    if(localStorage.getItem('values') !== null){
        data = JSON.parse(localStorage.getItem('values'))

    }
    data.push(value)
    console.log(data)
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(`${data.length} ${value.expense} -
     ${value.description} - ${value.category} `))

     let del = document.createElement('button')
     del.appendChild(document.createTextNode("Delete expense"))
     del.classList.add('delete')
     let edit = document.createElement('button')
     edit.appendChild(document.createTextNode("Edit expense"))
     edit.classList.add('edit')
     li.appendChild(del)
     li.appendChild(edit)

     ul.appendChild(li)

    // renderElements(data)

        // data = localStorage.getItem
    localStorage.setItem('values' , JSON.stringify(data ))
    document.getElementById('expense').value = ''
    document.getElementById('description').value = ''
    document.getElementById('category').value = 'movie'
}

function renderElements(){
    if(localStorage.getItem('values') !== null){
        ul.innerHTML =``
    let data = JSON.parse(localStorage.getItem('values'))
    data.forEach((value,index) => {
        
  
        let li = document.createElement('li')
    li.appendChild(document.createTextNode(`${index+1} ${value.expense} -
     ${value.description} - ${value.category} `))

     let del = document.createElement('button')
     del.appendChild(document.createTextNode("Delete expense"))
     del.classList.add('delete')
     let edit = document.createElement('button')
     edit.appendChild(document.createTextNode("Edit expense"))
     edit.classList.add('edit')
     li.appendChild(del)
     li.appendChild(edit)

     ul.appendChild(li)
    })
}
}

function handleClick(e){
    if(e.target.classList.contains('delete')){
        let index = e.target.parentNode.textContent.substr(0,1) -1
        console.log(index)
        let data = JSON.parse(localStorage.getItem('values'))
        data.splice(index,1)
        localStorage.setItem('values' , JSON.stringify(data))
        renderElements()
    }
    if(e.target.classList.contains('edit')){
        let index = e.target.parentNode.textContent.substr(0,1) -1
        console.log(index)
        let data = JSON.parse(localStorage.getItem('values'))
        let edit = data.splice(index,1)
        localStorage.setItem('values' , JSON.stringify(data))
        renderElements()
        console.log(edit[0].expense)
        document.getElementById('expense').value = edit[0].expense
        document.getElementById('description').value = edit[0].description
        document.getElementById('category').value = edit[0].category
    }
    // console.log(e.target.style.contains('.delete'))
}


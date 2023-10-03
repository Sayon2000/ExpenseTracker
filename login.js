document.getElementById('signup').addEventListener('submit' , loginUser)

const axiosInstance = axios.create({
    baseURL : "http://localhost:4000/user"
})


async function loginUser(e){
    e.preventDefault()
    
    const data = {
        email : e.target.email.value,
        password : e.target.password.value
    }
    console.log(data)

    try{
        const result = await axiosInstance.post('/login' , data)
        console.log(result)
        if(result.data.success){
            alert("login succesfully")
            window.location ="/"
        }
    }catch(e){
        console.log(e)
        alert(e.response.data.msg)
    }

}
import { API } from "../config"
// API = http://localhost:5000/api

export const userRegister = (name, email, password) => {
    const user = {name, email, password}
    return fetch(`${API}/register`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        // body:JSON.stringify({name, email, password})
        body: JSON.stringify(user)
    })
    // .then(res=>res.json())
    .then((res)=>{ return res.json()})
    .catch(err=>console.log(err))
}
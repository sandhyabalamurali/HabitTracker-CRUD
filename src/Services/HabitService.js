import axios from 'axios';
const API='http://localhost:8080/habit';
//get all
const Getall=async()=>{
     return axios.get(`${API}/getAll`);
}
//getbyskills;
const Getbyname=async(name)=>{
     return axios.get(`${API}/getbyhabit/${name}`);
}
//post
const post=async(data)=>{
     return axios.post(`${API}/post`,data,{
          headers:{
               'Content-Type':'Application/json'
          }
     })
}

//update
const update=async(id,data)=>{
     return axios.put(`${API}/update/${id}`,data,{
          headers:{
               'Content-Type':'Application/json'
          }
     })
}

//delete
const deletehabit=async(id)=>{
     return axios.delete(`${API}/del/${id}`);
}

export default {Getall,Getbyname,post,update,deletehabit};
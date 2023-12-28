const express= require("express");
const app= express();
const methodOverride= require("method-override");
const port= 8080;
const path= require("path");
const {v4: uuidv4}= require('uuid');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts= [
{
    id:uuidv4(),
    username:"apnacollege",
    content:"I love coding!",
},

{
    id:uuidv4(),
    username:"Tushar bagal",
    content:"Hard work and perseverance is important to achieve success",
},

{
    id:uuidv4(),
    username:"Body",
    content:"Gym is important to achieve fat loss and muscle bulding both",
}
    

]


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.post("/posts",(req,res)=>{
    let {username,content}= req.body;
    let id= uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
})


//DELETE POST

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    post= posts.filter((p)=> id!== p.id);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    // res.send("Edit request working");
    let {id}= req.params;
    let post= posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})



app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    console.log(id);
    let newContent= req.body.content;
    let post= posts.find((p)=>id===p.id);
    post.content= newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
   let {id}= req.params;
    let post= posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
    res.send("Request working");
})







app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`);
})
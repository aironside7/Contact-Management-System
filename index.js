const express = require("express")
const bodypasrser = require("body-parser")
const route = express()
route.use(bodypasrser.urlencoded({extended:true}))
route.use(bodypasrser.json())
require("./conn")
const Contact = require("./models/Contact")

// route.post("/v1/contacts",async(req,res)=>{
//     const {firstName,lastName,email,phone} = req.body
//     const Condel =  new Contact({firstName,lastName,email,phone})
//     Condel.save().then((condel)=>{
//         res.status(201).json(condel)
//     }).catch((err)=>{
//         res.status(400).send(err)
//     })
    
// })
route.post("/v1/contacts", async(req,res)=>{
    const {firstName,lastName,email,phone} = req.body
   if(!email){
    res.status(400).json({"error": "Missing required field(s): email"})
   }else{
    try{
        const savedData = await Contact.findOne({$or:[{firstName},{lastName},{email},{phone}]})
        if(!savedData){
            res.status(400).json({error:"Email  or Phone number already exists"})
        }
         const contact = new Contact({firstName,lastName,email,phone})
         await contact.save()
         res.status(201).json(contact)    
       }catch(err){
        res.status(400).json({error:"Email or Phone number already Exists"})
    }

   }
   

})
route.get("/v1/contacts",(req,res)=>{
    Contact.find({}).then((contact)=>{
        res.status(201).json(contact)
    }).catch((err)=>{
        res.status(400).send(err)
    })
    
})
route.get("/v1/contacts/:id",(req,res)=>{
    const {id} = req.params
    Contact.findById(id).then((contact)=>{
        if(!contact){
            return res.status(404).json(
            {"error":
             "There is no contact with that id"})
        }
        res.status(200).json(contact)
    }).catch((err)=>{
        res.status(404).json(
            {"error":
            "There is no contact with that id"})
    })
    
})

route.delete("/v1/contacts/:id", (req,res)=>{
    const {id} = req.params
    Contact.findByIdAndDelete(id)
    .then(()=>{
        res.sendStatus(204)
    }).catch((err)=>{
        res.status(404).json(
            {"error":
            "There is no contact with that id"})

    })
})

route.put("/v1/contacts/:id",async(req,res)=>{
    const id = req.params.id
    const {firstName,lastName,email,phone} = req.body
    try{
        const contact = await Contact.findByIdAndUpdate(id,{firstName,lastName,email,phone},{new:true})
        if(contact){
            res.sendStatus(204)

        }else{
            res.status(404).json({"error": "There is no contact with that id"})
        }

    }catch(err){
        res.status(500).json({"error": "There is no contact with that id"})

    }

        
    })
    route.patch("/v1/contacts/:id",async(req,res)=>{
        const id = req.params.id
        const {firstName,lastName,email,phone} = req.body
        try{
            const contact = await Contact.findByIdAndUpdate(id,{firstName,lastName,email,phone},{new:true})
            if(contact){
                res.sendStatus(204)
    
            }else{
                res.status(404).json({"error": "There is no contact with that id"})
            }
    
        }catch(err){
            res.status(500).json({"error": "There is no contact with that id"})
    
        }
    
            
        })



    



route.listen(4000, ()=>{
    console.log("server connected at 4000")
})
const express = require("express")
const projectDb = require("../helpers/projectModel")
const mapper = require("../helpers/mappers");
const { orWhereNotExists } = require("../dbConfig");

const router = express.Router();

// router.get("/", (req,res)=> {
//     res.json({
//         message: "Hey this is project router"
//     })
// })

router.get("/", (req,res)=> {
    projectDb.get()
        .then((project)=> {
            res.status(200).json(project)

        })
        .catch((err)=> {
            console.log(err)
        })
})




router.post("/", (req, res)=> {
    projectDb.insert(req.body)
        .then((project) => {
            return res.status(201).json(project)
            
        })
        .catch((err)=> {
            console.log(err)
        })
})

router.put("/:id", (req, res)=> {
    id = req.params.id
    projectDb.update(id, req.body)
        .then((project)=>{
            if(project) {
                res.status(200).json(project)
            } 
            else {
                res.status(404).json({errorMessage: "This project could not be found"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })

})

router.delete("/:id", (req, res)=> {
    id = req.params.id
    projectDb.get(id)
        .then((project)=> {
            if(project){
                projectDb.remove(req.params.id)
                    .then(()=> {
                        res.status(200).json({
                            message: "It's gone!"
                        })
                    })
                    

            } 
            else {
                res.status(404).json({
                    message: "The post with this specified ID doesn't exist"
                })
            }

        })
        .catch((err)=> {
            console.log(err)
        })
})

router.get("/:id/actions", (req, res)=> {
    id = req.params.id
    projectDb.getProjectActions(id)
        .then((actions)=>{
            if (actions){
                res.status(200).json(actions)
            }
            else {
                res.status(404).json({
                    message: "There's no project with this ID"
                })
            }

        })
        .catch((err)=> {
            console.log(err)
        })
})




module.exports = router
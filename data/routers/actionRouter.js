const express = require("express")
const actionDb = require("../helpers/actionModel")
const mapper = require("../helpers/mappers")

const router = express.Router();

// router.get("/", (req,res)=> {
//     res.json({
//         message: "Hey this is action router"
//     })
// })

router.get("/:id", (req,res)=> {
   const id = req.params.id
   console.log(id)
    actionDb.get(id)
        .then((action)=> {
            console.log(action)
             return res.status(200).json(action)

        })
        .catch((err)=> {
            console.log(err)
        })
})


module.exports = router
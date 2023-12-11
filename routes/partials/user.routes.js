const express = require('express');
const userModel = require('../../app/models/user.model');
const { userControllers } = require('../../app/controllers/backend/user.controller');
const router = express.Router()



router
    .get('/dashboard/users', userControllers.all )
    .post('/dashboard/user/set_role', userControllers.set_role)
    .post("/dashboard/banner/delete-items", userControllers.delete_items)
    .get("/dashboard/user/:id/delete", userControllers.delete)
    .get("/dashboard/user/:id", userControllers.show)


    // .post('/dashboard/banner/create', bannerControllers.store)
    // .post("/dashboard/banner/from-ids", bannerControllers.from_ids)
    
    
    .get('/dashboard/user/create', async  function (req, res) {
        const Data = new userModel({ name: 'siyam', email: "siyam@gmail.com", age: 40 });
        let status = "";
        await Data.save()
            .then(() =>(status = Data))
            .catch((e)=>(status = e.message))
           res.send(status)
    })
    .get('/dashboard/user/:id/edit', async function (req, res) {
        let id = req.params.id ;
        let data = await userModel.where({
           "_id" : id,
        }).findOne();
         data.name = "updated Name";
         data.age = 45;
         data.save();
         res.send(data);
    })
    

    module.exports =()=>  router;
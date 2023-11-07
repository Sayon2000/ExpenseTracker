const express = require('express')

const router = express.Router()

var Brevo = require('@getbrevo/brevo');
require('dotenv').config()



router.post('/forgot-password' , async(req,res)=>{
    try{
        var defaultClient = Brevo.ApiClient.instance;
        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY

        var apiInstance = new Brevo.TransactionalEmailsApi();

        var sendSmtpEmail = new Brevo.SendSmtpEmail()
        const sender = { "email": "sayondutta2000@gmail.com"}

        const reciever = [{
            "email": req.body.email
        }]
        const response = await apiInstance.sendTransacEmail({
            sender,
            to : reciever,
            subject : 'testing',
            textContent : `click the link to reset your password`
        })
        return res.json(response)


    }catch(e){
        console.log(e)
        return res.json({msg :"Internal server error"})
    }
})


module.exports = router;
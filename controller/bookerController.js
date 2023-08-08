const bookerModel = require("../model/bookerModel");
const {generateToken} = require("../misc/jwt");
const { jwtSecret } = require("../dbConfig");

exports.addBookerController = async (req,res)=>{
    let data = req.body;

    try {
        const query = {
            bookerEmail: data.bookerEmail.toLowerCase(),
        };
        let booker = await bookerModel.exists(query);
        if(booker){
            res.status(200).json({
                bookerExist: true,
                bookerAdded: false
            })
        }else{
            const newBookerData = await bookerModel(data);
            await newBookerData.save().then(()=>{
                res.status(200).json({
                    bookerExist: false,
                    bookerAdded: true
                })
            }).catch((error)=>{
                console.log(error)
                res.status(200).json({
                    bookerExist: false,
                    bookerAdded: false
                })
            })
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            bookerExist: false,
            bookerAdded: false
        })
    }
}


exports.loginBookerController = async (req,res)=>{
    let data = req.body;

    try {
        const query = {
            bookerEmail: data.bookerEmail.toLowerCase(),
        };
        let booker = await bookerModel.exists(query);
        if(booker){
            let bookerPassword = data.bookerPassword.toLowerCase()
            await bookerModel.findById({_id: booker._id}).then((response)=>{
                if(bookerPassword == response.bookerPassword.toLowerCase()){
                    console.log(response);
                    let user = {
                        id: response.id,
                        username: response.bookerName,
                        role: 'admin',
                      };                      
                    let token = generateToken(user,jwtSecret);
                    res.status(200).json({
                        bookerLogin: true,
                        description: "Login Successful",
                        jwt:token
                    })
                }else{
                    res.status(200).json({
                        bookerLogin: false,
                        description: "Incorrect Password"
                    })
                }
            }).catch((error)=>{
                console.log(error);
                res.status(200).json({
                    bookerLogin: false,
                    description: "User Not Found"
                })
            })
            

        }else{
            res.status(200).json({
                bookerLogin: false,
                description: "User Not Found"
            })
        }
        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            bookerLogin: false
        })
    }
}
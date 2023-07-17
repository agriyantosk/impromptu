// masukan error handling setiap request

const errorHandler = (error,req,res,next)=>{
    if (error.name === "Invalid Input") {
        res.status(401).json({message: "Please check your inputs"})
    } else if (error.name === "Email has already been used") {
        res.status(401).json({message: "Please use another email"})
    } else if (error.name === "Invalid email/password input") {
        res.status(401).json({message: "Invalid email/password input"})
    } else if (error.name === "Data not found") {
        res.status(404).json({message: "Data not found"})
    } else if (error.name === "You already been friends") {
        res.status(401).json({message: "You already been friends"}) 
    } else if (error.name === "Invalid Token") {
        res.status(403).json({message: "You are not logged in yet"})
    } else if (error.name === "Trip has already been created before") {
        res.status(401).json({message: "Trip has already been created before, please choose another name"})
    } else if (error.name === "You've already invited this account!") {
        res.status(401).json({message: "You've already invited this account!"})
    } else if (error.name === "You already inputed a budget!") {
        res.status(401).json({message: "You already inputed a budget!"})
    } else if (error.name === "Unauthorized") {
        res.status(403).json({message: "Sorry, you are not the trip master"})
    } else if (error.name === "You have not inputed a budget!") {
        res.status(401).json({message: "Please input a budget first"})
    } else {
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports = errorHandler

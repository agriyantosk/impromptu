const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

class model{
    static async login(){
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    static async register(){
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
    static async createRoom(req,res,next){
        try {
         
            
        } catch (error) {
            next(error)
        }
    }

    static async addFriend(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    static async inviteFriend(req,res,next){
        try {
            
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = model
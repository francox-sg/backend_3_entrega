import passport from 'passport'
import local from 'passport-local'
import jwt from 'jsonwebtoken'
import jwtStrategy from 'passport-jwt' 
import { userModel } from '../daos/mongodb/models/user.model.js';
import {comparePassword} from '../utils/hash.js'
import 'dotenv/config' 

 


const LocalStrategy = local.Strategy;
const JWTStrategy = jwtStrategy.Strategy; 
const ExtractJWT = jwtStrategy.ExtractJwt

export const initializePassport = () =>{


    //Estrategia de Login
    passport.use( "login",
        new LocalStrategy({usernameField:"email", passReqToCallback: true}, async (req, email, password, done) =>{
            try {
                console.log("PASSPORT LOGIN");
                const user = await userModel.findOne({email})
                
                if(!user){
                    return done(null, false, {message: "Usuario No Encontrado"})
                }

                const passwordIsCorrect = comparePassword(password, user.password)
                if(!passwordIsCorrect){
                    return done(null, false, {message: "Contraseña Incorrecta"})
                }

                return done(null, user,{message: "Usuario Logueado"})
            } catch (error) {
                done(error)
            }
        })
    )


    //Estrategia Current
    passport.use("jwt", new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET
        },
        async (payload, done) =>{
            try {
                return done(null, payload)
            } catch (error) {
                return done(error)
            }
        })
    )



    //Serializar User
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    //Des-Serializar User
    passport.deserializeUser(async (id,done)=>{
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            done(error)
        }
    })


}


function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["token"];
    }

    return token;
}
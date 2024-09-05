
export function authorizationRole(roles){
    return async (req, res, next)=>{
        
    console.log("Roles a validar: ", roles);

    const {role} = req.user
    
    const pass = roles.includes((role))

    if(pass){
        console.log("Authorization Role: --> Usuario Autorizado:", role);
        next();
    }
    else{
        console.log("Authorization Role: --> Usuario NO pertenece a:", roles);
        res.status(500).send("Usuario NO autorizado por Middleware authorization Role")
    }
    }
}

/* 
export const validateAdminRole = (req, res, next)=>{
    console.log("Req de validateUserRole",req.user);
    const {role} = req.user
    
    if(role == "admin"){
        console.log("Validate User Role: --> Usuario Autorizado: ADMIN");
        next();
    }
    else{
        console.log("Validate User Role: --> Usuario NO es ADMIN");
        res.status(500).send("Usuario NO autorizado por Validate Admin Role")
    }
}

export const validateUserRole = (req, res, next)=>{
    console.log("Req de validateUserRole",req.user);
    const {role} = req.user
    
    if(role == "user"){
        console.log("Validate User Role: --> Usuario Autorizado: USER");
        next();
    }
    else{
        console.log("Validate User Role: --> Usuario NO es USER");
        res.status(500).send("Usuario NO autorizado por Validate User Role")
    }
} */
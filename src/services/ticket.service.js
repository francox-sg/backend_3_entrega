import { TicketDaoMongoDB } from "../daos/mongodb/ticket.dao.js";




export const addTicket = async(ticket)=>{
    try {
        
            const resp= await TicketDaoMongoDB.addTicket(ticket);
            return resp
        
        
    } catch (error) {
        console.log(error);
    }
}
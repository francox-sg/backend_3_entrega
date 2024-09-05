import { TicketModel } from "./models/ticket.model.js"


class TicketManager{
    
    

    //Metodo Obtener Tickets
    async getTickets(){
        return await TicketModel.find({})
    }

    //Metodo Agregar Ticket
    async addTicket(ticket){
        
        const resp = await TicketModel.create(ticket)
        
        return  await this.getTicketByCode(ticket.code)
    }




    //Metodo Devuelve ticket por code
    async getTicketByCode(ticketCode){
        return await TicketModel.find({code: ticketCode})
    }
    
}



export const TicketDaoMongoDB = new TicketManager()






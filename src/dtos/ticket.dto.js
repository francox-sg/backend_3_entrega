export const resTicketDto = (ticket)=>{
    const responseTicket = {
        
            code:               ticket.code,
            amount:             ticket.amount,
            purchaser:          ticket.purchaser,
            purchaserId:        ticket.purchaserId,
            purchase_datetime:  ticket.purchase_datetime
    }

    return responseTicket
}
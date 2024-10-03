export const info = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'API Backend 3',
            version: '1.0.0',
            description: 'E-Commerce Backend 3'
        },
        servers:[
            {
                url:'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
};
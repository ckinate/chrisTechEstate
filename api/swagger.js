import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Real Estate Management System',
        version: '1.0.0',
        description: 'Real Estate Management System  using a Node.js API',
        },
        servers: [
            {
              url: 'http://localhost:3000',
              description: 'Development server',
            },
          ],
    },
  
    apis: ['./routes/*.route.js'], //you can change you swagger path
  };
  
const specs = swaggerJsdoc(options);
  
 export { specs , swaggerUi }
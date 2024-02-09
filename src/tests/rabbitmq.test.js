const { connectToRabbitMQForTest } = require('../dbs/init.rabbit.js')


describe('Rabbit MQ Connection', () => {
    it('should connect to successfull RabbitMQ', async () => {
        const result = await connectToRabbitMQForTest();
        console.log(result);
        expect(result).toBeUndefined();
    });
})
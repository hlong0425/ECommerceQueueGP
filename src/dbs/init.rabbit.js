const ampq = require('amqplib')

/**
 * 
 */
const connectToRabbitMQ = async () => {
    try {
        const connection = await ampq.connect('amqp://guest:guest@localhost');
        const channel = await connection.createChannel();

        return { channel, connection };
    } catch (err) {
        console.log(err)
    }
}

const connectToRabbitMQForTest = async () => {
    try {
        const { channel, connection } = await connectToRabbitMQ();
        const queue = 'test-queue';
        const message = 'This is rabbit mq message';

        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message));

        // close connection
        await connection.close();

    } catch (error) {
        console.log(`Error connecting to RabbitMQ`, error);
    }
};

const consumerQueue = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName, { durable: true });
        console.log(`Waiting for message...`);
        channel.consume(queueName, msg => {
            console.log(`Received message: ${queueName}::`, msg.content.toString());
            //1. find User;
            //2. Send message to user.
            //3. yes, ok => success,
            //4. error => setup DLX, ...
        }, {
            noAck: true
        });
    } catch (error) {
        console.error('error publish message to rabbitMQ::', error);
        throw error;
    }
}

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue
};

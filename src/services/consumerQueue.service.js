const {
    consumerQueue, connectToRabbitMQ, connectToRabbitMQForTest
} = require('../dbs/init.rabbit');


const messageService = {
    consumerQueue: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            await consumerQueue(channel, queueName);
        } catch (err) {
            console.log(`Error consumerToQueue`, err);
        }
    },
    consumerToQueueNormal: async () => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            const notiQueue = 'notificationQueueProcess';
            setTimeout(() => {
                channel.consume(notiQueue, msg => {
                    console.log('SEND notification successfully.', msg.content.toString());
                    channel.ack(msg);
                });
            }, 15000)

        } catch (err) {
            console.log(err);
        }
    },

    consumerQueueFailed: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            const notificaionExchangeDLX = 'notificationExDLX';
            const notificationRoutingKeyDLX = 'notificationRoutingDLX';
            const notiQueueHandler = 'notificationQueueHotFix';

            await channel.assertExchange(notificaionExchangeDLX, 'direct', {
                durable: true,
            });

            const queueResult = await channel.assertQueue(notiQueueHandler, {
                exclusive: false
            });

            await channel.bindQueue(queueResult.queue, notificaionExchangeDLX, notificationRoutingKeyDLX);
            await channel.consume(queueResult.queue, msgFail => console.log({ notificationQueueHotFix: msgFail.content.toString() }), {
                noAck: true
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};

module.exports = messageService;
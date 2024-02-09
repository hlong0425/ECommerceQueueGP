const { consumerQueue, consumerToQueueNormal, consumerQueueFailed } = require('./src/services/consumerQueue.service');

const queueName = 'test-topic';

// consumerQueue(queueName).then(() => {
//     console.log(`Message consumer started ${queueName}`)
// }).catch(err => console.error(err));

consumerToQueueNormal(queueName).then(() => {
    console.log(`Message consumerToQueueNormal started ${queueName}`);
}).catch(err => {
    console.error(`error: >>`, err);
});

consumerQueueFailed(queueName).then(() => {
    console.log(`Message consumerToQueueNormal started ${queueName}`);
}).catch(err => {
    console.error(`error: >>`, err);
});





import AWS from "aws-sdk";

const sqs = new AWS.SQS();

export const sendMessage = async (message: any) => {
  const params = {
    QueueUrl: process.env.QUEUE_URL!,
    MessageBody: JSON.stringify(message),
  };

  await sqs.sendMessage(params).promise();
};
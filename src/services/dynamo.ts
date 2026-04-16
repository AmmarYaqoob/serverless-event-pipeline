import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();

export const saveEvent = async (event: any) => {
  await dynamo
    .put({
      TableName: process.env.TABLE_NAME!,
      Item: event,
    })
    .promise();
};
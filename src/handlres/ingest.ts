import { APIGatewayProxyHandler } from "aws-lambda";
import { sendMessage } from "../services/sqs";
import { v4 as uuid } from "uuid";

export const handler: APIGatewayProxyHandler = async (event: any) => {
  const body = JSON.parse(event.body || "{}");

  const payload = {
    id: uuid(),
    type: body.type || "default",
    data: body.data || {},
    createdAt: new Date().toISOString(),
  };

  await sendMessage(payload);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Event queued",
      payload,
    }),
  };
};
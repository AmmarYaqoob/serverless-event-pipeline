import { SQSEvent } from "aws-lambda";
import { saveEvent } from "../services/dynamo";

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    console.log("Processing event:", body.id);

    await saveEvent(body);
  }
};
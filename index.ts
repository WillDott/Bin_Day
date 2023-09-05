import { SNSClient, PublishCommand, PublishCommandInput } from "@aws-sdk/client-sns";

enum WEEK_TYPE {
    REFUSE,
    RECYCLING
}

const client = new SNSClient({region: "eu-west-2"});

const createInput = (week: WEEK_TYPE): PublishCommandInput => {
    const today = new Date()
    return {
        TopicArn: process.env.QUEUE_ARN,
        Message: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}: ${WEEK_TYPE[week.valueOf()]}`,
    }
}

const getWeek = (): number => {
    const today = new Date()
    const startDate = new Date(today.getFullYear(),0,1)
    const days = Math.floor((today.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))
    return Math.ceil(days / 7)
}

const isRefuseWeek = (week: number): WEEK_TYPE => {
    return (week % 2) == 0 ? WEEK_TYPE.REFUSE : WEEK_TYPE.RECYCLING
}

export const handler = async () => {
    const week = isRefuseWeek(getWeek())
    const command = new PublishCommand(createInput(week));
    await client.send(command)
}
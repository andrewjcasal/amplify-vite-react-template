import { DataStore } from 'aws-amplify/datastore';
import { Schema } from '../../data/resource';
import { generateClient } from 'aws-amplify/data';
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

export const handler: Schema["getUserTodos"]["functionHandler"] = async (event) => {
    // Initialize DynamoDB Client
    const client = new DynamoDBClient();

    const userId = event.arguments.userId;

    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing userId" })
        };
    }

    const params = {
        TableName: "Todo-fg4zsnsocvfolf6u7jrkdvmwwm-NONE", // The name of your DynamoDB table
        IndexName: 'owner-index',
        KeyConditionExpression: "#owner = :userId", // Assuming 'userId' is the partition key
        ExpressionAttributeNames: {
            "#owner": "owner" // Replace 'owner' with the field name you have
        },
        ExpressionAttributeValues: {
            ":userId": { S: userId } // Replace 'userId' with the value you need
        }
    };

    try {
        const data = await client.send(new QueryCommand(params));

        const todos = data.Items ? data.Items.map(item => ({
            id: item.id.S,
            content: item.content.S,
            createdAt: item.createdAt.S
        })) : [];

        console.log("Todos:", todos);
        // Return the todos data
        return {
            statusCode: 200,
            body: todos
        };

    } catch (error) {
        console.error("Error querying DynamoDB:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error fetching todos" })
        };
    }
};
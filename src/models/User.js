const AWS = require('../config/aws');

const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users';

const User = {
  async getAll() {
    const params = {
      TableName: TABLE_NAME
    };

    try {
      const data = await docClient.scan(params).promise();
      return data.Items;
    } catch (error) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  },
  async getById(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: parseInt(id)
      }
    };

    try {
      const data = await docClient.get(params).promise();
      return data.Item;
    } catch (error) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  },
  async createUser(userData) {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: Date.now().toString(),
        ...userData
      }
    };

    try {
      await docClient.put(params).promise();
      return params.Item;
    } catch (error) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  },
  async updateUser(id, userData) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: parseInt(id)
      },
      UpdateExpression: "set #username = :username, #email = :email, #password = :password",
      ExpressionAttributeNames: {
        "#username": "username",
        "#email": "email",
        "#password": "password"
      },
      ExpressionAttributeValues: {
        ":username": userData.username,
        ":email": userData.email,
        ":password": userData.password
      },
      ReturnValues: "ALL_NEW"
    };

    try {
      const data = await docClient.update(params).promise();
      return data.Attributes;
    } catch (error) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  },

  
  async patchUser(id, userData) {
    try {
      const existingItem = await docClient.get({
        TableName: TABLE_NAME,
        Key: { id: parseInt(id) }
      }).promise();
  
      if (existingItem.Item) {
        const params = {
          TableName: TABLE_NAME,
          Key: { id: parseInt(id) },
          UpdateExpression: "SET #username = :username, #email = :email, #password = :password",
          ExpressionAttributeNames: {
            "#username": "username",
            "#email": "email",
            "#password": "password"
          },
          ExpressionAttributeValues: {
            ":username": userData.username || existingItem.Item.username,
            ":email": userData.email || existingItem.Item.email,
            ":password": userData.password || existingItem.Item.password
          },
          ReturnValues: "ALL_NEW"
        };
  
        const data = await docClient.update(params).promise();
        return data.Attributes;
      } else {
        throw new Error("Item not found");
      }
    } catch (error) {
      console.error("Unable to patch item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  }
  ,
  async deleteUser(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: parseInt(id)
      },
      ReturnValues: "ALL_OLD"
    };

    try {
      const data = await docClient.delete(params).promise();
      return data.Attributes;
    } catch (error) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  }
};

module.exports = User;

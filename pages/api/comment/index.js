// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  //database connection
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  const dbName = 'events';
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const commentsCollection = db.collection('comments');
  if(req.method === "POST") {
    const { name, email, comment, eventId } = req.body;

    if(!email.includes('@')) {
      res.status(422).json({
        msg: 'Email is invalid!'
      });
      return;
    }

    const newComment = {
      name,
      email,
      comment,
      eventId
    };

    //add comment to database collection
    const insertResult = await commentsCollection.insertMany([newComment]);
    console.log('Inserted documents =>', insertResult);

    res.status(201).json({
      msg: 'Comment is submitted',
      data: newComment
    });
  }

  if(req.method === "GET") {
    const findResult = await commentsCollection.find().toArray();
    res.status(200).json({
      msg: `There are ${findResult.length} comments`,
      data: findResult
    });
  }
}

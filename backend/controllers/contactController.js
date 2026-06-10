const Contact =
require("../models/Contact");

const createMessage =
async (req,res) => {

  try{

    const {
      name,
      email,
      message
    } = req.body;

    const newMessage =
    await Contact.create({

      name,
      email,
      message

    });

    res.status(201).json(
      newMessage
    );

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

const getMessages =
async (req,res) => {

  try{

    const messages =
    await Contact.find()
    .sort({
      createdAt:-1
    });

    res.json(messages);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

const deleteMessage =
async (req,res) => {

  try{

    await Contact.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success:true
    });

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

module.exports = {

  createMessage,
  getMessages,
  deleteMessage

};
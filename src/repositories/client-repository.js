const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.get = async() => {
  const result = await Client.find({ active: true });
  return result;
}

exports.create = async(data) => {
  let cliente = Client(data);
  await cliente.save();
}

exports.delete = async(id) => {
  await Client.findByIdAndUpdate(id, {
    $set: {
      active: false
    }
  })
}

exports.getById = async(id) => {
  const result = await Client.findById(id);
  return result;
}

exports.update = async(id, data) => {
    await Client.findByIdAndUpdate(id, {
      $set: {
        name : data.name,
        address : data.address
      }
    })
}
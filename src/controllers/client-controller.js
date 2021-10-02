const mongoose = require('mongoose');
const repository = require('../repositories/client-repository');
const ValidationContract = require('../validator');

exports.get = async(req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar os clientes."
    })
  }
}

exports.post = async(req, res, next) => {
  
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, 'O Nome deve ter no mínimo 3 caracteres')
  contract.hasMaxLen(req.body.address, 100, 'O endereço deve ter no máximo 100 caracteres')

  try {
    if (!contract.isValid()) {
      res.status(400).send({ message: "Erro ao cadastrar. Valide as informações envidas" })
    }
    await repository.create(req.body);
    res.status(201).send({ message: "Criado com sucesso" });
  } catch (error) {
    res.status(400).send({ message: "Erro ao cadastrar. Valide as informações envidas" });
  }
}

exports.put = async(req, res, next) => {
  
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, 'O Nome deve ter no mínimo 3 caracteres')
  contract.hasMaxLen(req.body.address, 100, 'O endereço deve ter no máximo 100 caracteres')

  try {
    if (!contract.isValid()) {
      res.status(400).send({ message: "Erro ao cadastrar. Valide as informações envidas" })
    }
    
    await repository.update(req.params.id, req.body);
    res.status(200).send({ message: "Atualizada com sucesso" });
  } catch (error) {
    res.status(400).send({ message: "Erro ao cadastrar. Valide as informações envidas" });
  }
}

exports.delete = async(req, res, next) => {
  const id = req.params.id;
  
  let response = {
    id: id,
    message: "Removed"
  }

  try {
    await repository.delete(id);
    res.status(200).send({ message: "Deletado com sucesso" });
  } catch (error) {
    res.status(400).send({ message: "Erro ao cadastrar. Valide as informações envidas" });
  }
}
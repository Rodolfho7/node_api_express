const express = require('express');
const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {

  User.findOne({ email: req.body.email }).exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: 'user already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          else {
            const user = new User({
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(result => {
                return res.status(200).json({
                  message: result
                })
              })
              .catch(err => {
                return res.status(500).json({
                  error: err
                })
              });
          }
        });
      }
    })
});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(result => {
      if (result == null) {
        return res.status(404).json({
          message: 'falha na autenticacao'
        });
      } else {
        bcrypt.compare(req.body.password, result.password, (err, resul) => {
          if (err) {
            return res.status(401).json({
              error: 'login ou senha errado'
            });
          }
          if (resul) {
            const token = jwt.sign({
              email: result.email,
              userId: result._id
            },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              });

            return res.status(200).json({
              message: 'autenticacao bem sucedida',
              token: token
            })
          }

          res.status(401).json({
            message: 'autenticacao falhou'
          });
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        erro: err
      });
    });
});

router.delete('/:userId', (req, res, next) => {
  User.deleteOne({ _id: req.params.userId }).exec()
    .then(result => {
      return res.status(200).json({
        message: result
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    })
});

router.get('/users', (req, res, next) => {
  User.find()
    .then(users => {
      return res.status(200).json({
        usuarios: users
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
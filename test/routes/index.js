'use strict';

import app from '../../src/server'
import test from 'tape'
import request from 'supertest'

test('Correct users returned', function (t) {
    request(app)
      .get('/api/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        var expectedUsers = {
            "message":"Todos los usuarios registrados son:",
            "data":[
                {
                "id":1,
                "nombre":"josue",
                "pass":"contra",
                "mail":"josue@"
                },

                {
                "id":2,
                "nombre":"maya",
                "pass":"maya123",
                "mail":"maya@gmail.com"
                }
            ]             
        };
  
        t.error(err, 'Sin Error');
        t.same(res.body, expectedUsers, 'Usuarios Esperados');
        t.end();
      });
  });

  test('Consulta de perfil', function (t) {
    request(app)
      .get('/api/user/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        var expectedUser = {
            
                "id":1,
                "nombre":"josue",
                "pass":"contra",
                "mail":"josue@"
               
        };
  
        t.error(err, 'Sin Error');
        t.same(res.body, expectedUser, 'Usuario Esperado');
        t.end();
      });
  });
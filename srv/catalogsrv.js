const cds = require('@sap/cds');
const { DELETE } = require('@sap/cds/lib/ql/cds-ql');
const {Books} = cds.entities;

module.exports = srv => {

const db = cds.db;

// READ : SELECT
// CREATE : INSERT
// UPDATE : UPDATE
// DELETE : DELETE

        // READ
      /*   srv.on('READ','BooksSet',async (req,resp)=>{
            results = [];

            results = await db.run([
                SELECT.from(Books).where({ID : req.data.ID})
            ]);

            return results;

        }); */

        srv.before('CREATE','BooksSet',req=>{
            if(req.data.price < 0) req.error(400,'Price cannot be negative');
        })

        // CREATE
        srv.on('CREATE','BooksSet',async (req,resp)=>{
            results = [];
            results = await db.run([
                INSERT.into(Books).entries(req.data)
            ])
            .then((resolve,reject)=>{
                if(resolve)
                    return req.data;
                else
                    return req.error(400,'Failed to Create');
            })
            .catch(err=>{
                return req.error(500,'Server down, Try again'+err.toString());
            })

            return results;
        });

        

        // UPDATE
         srv.on('UPDATE','BooksSet',async (req,resp)=>{
            results = [];
            results = await db.run([
                //INSERT.into(Books).entries(req.data)
                UPDATE(Books).set(req.data).where({ID : req.data.ID})
            ])
            .then((resolve,reject)=>{
                if(resolve)
                    return req.data;
                else
                    return req.error(400,'Failed to Update');
            })
            .catch(err=>{
                return req.error(500,'Server down, Try again'+err.toString());
            })

            return results;
        });
        srv.after('UPDATE','BooksSet',(data)=>{
            console.log(`Books Update: ${data.ID}`);
        });

        // DELETE
        srv.on('DELETE','BooksSet',async req=>{
            results = [];
            return results = await db.run([
                DELETE.from(Books).where({ID : req.data.ID})
            ])
        });








}
/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vyfjk2uyk5ql8jz")

  collection.listRule = "(@request.auth.id = createdBy || @request.auth.role = 'admin')"
  collection.viewRule = "(@request.auth.id = createdBy || @request.auth.role = 'admin')"
  collection.createRule = "(@request.auth.id = createdBy || @request.auth.role = 'admin')"
  collection.updateRule = "(@request.auth.id = createdBy || @request.auth.role = 'admin')"
  collection.deleteRule = "(@request.auth.id = createdBy || @request.auth.role = 'admin')"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vyfjk2uyk5ql8jz")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vyfjk2uyk5ql8jz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "goamcaky",
    "name": "createdBy",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vyfjk2uyk5ql8jz")

  // remove
  collection.schema.removeField("goamcaky")

  return dao.saveCollection(collection)
})

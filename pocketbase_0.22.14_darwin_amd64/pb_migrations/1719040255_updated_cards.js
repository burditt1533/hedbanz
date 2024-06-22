/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwlj5kw1josu0dc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lmp0oib5",
    "name": "timesPlayed",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zwlj5kw1josu0dc")

  // remove
  collection.schema.removeField("lmp0oib5")

  return dao.saveCollection(collection)
})

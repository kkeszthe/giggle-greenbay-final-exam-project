'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('products', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    product_name: { type: 'string', notNull: true },
    description: { type: 'text', notNull: true },
    photo_url: { type: 'text', notNull: true },
    price: { type: 'int', notNull: true },
    seller_id: { type: 'int', notNull: true },
    buyer_id: { type: 'int' },
  });
};

exports.down = function (db) {
  return db.dropTable('products');
};

exports._meta = {
  version: 1,
};

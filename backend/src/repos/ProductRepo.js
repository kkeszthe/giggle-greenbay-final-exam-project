export class ProductRepo {
  constructor(db, errorCodes) {
    this.db = db;
    this.errorCodes = errorCodes;
    this.table = {
      name: 'products',
      columns: {
        id: 'id',
        name: 'product_name',
        description: 'description',
        photo_url: 'photo_url',
        price: 'price',
        seller_id: 'seller_id',
        buyer_id: 'buyer_id',
      },
    };
  }

  async add({ product_name, description, photo_url, price, seller_id }) {
    if (!product_name || !description || !photo_url || !price || !seller_id)
      throw new Error(this.errorCodes.missingParam);

    return (
      await this.db.query(
        `INSERT INTO ${this.table.name} (${this.table.columns.name},${this.table.columns.description},${this.table.columns.photo_url},${this.table.columns.price},${this.table.columns.seller_id})
        VALUES("${product_name}","${description}","${photo_url}",${price},${seller_id});`
      )
    ).results;
  }

  async getSellableProducts() {
    return (
      await this.db.query(
        `SELECT ${this.table.name}.${this.table.columns.id}, ${this.table.name}.${this.table.columns.name}, ${this.table.name}.${this.table.columns.description}, ${this.table.name}.${this.table.columns.photo_url} AS product_photo, ${this.table.name}.${this.table.columns.price}, ${this.table.name}.${this.table.columns.seller_id}, ${this.table.name}.${this.table.columns.buyer_id}, sellers.username AS seller_name, sellers.photo_url AS seller_photo 
        FROM products 
        LEFT JOIN users AS sellers ON ${this.table.name}.${this.table.columns.seller_id} = sellers.id 
        WHERE ${this.table.name}.${this.table.columns.buyer_id} IS NULL;`
      )
    ).results;
  }

  async getById({ productId }) {
    return (
      await this.db.query(
        `SELECT ${this.table.name}.${this.table.columns.id}, ${this.table.name}.${this.table.columns.name}, ${this.table.name}.${this.table.columns.description}, ${this.table.name}.${this.table.columns.photo_url} AS product_photo, ${this.table.name}.${this.table.columns.price}, ${this.table.name}.${this.table.columns.seller_id}, ${this.table.name}.${this.table.columns.buyer_id}, sellers.username AS seller_name, sellers.photo_url AS seller_photo
      FROM products 
      LEFT JOIN users AS sellers ON ${this.table.name}.${this.table.columns.seller_id} = sellers.id 
      WHERE ${this.table.name}.${this.table.columns.id} = ${productId};`
      )
    ).results;
  }

  async sellProduct({ productId, userId }) {
    if (!productId || !userId) throw new Error(this.errorCodes.missingParam);
    return (
      await this.db.query(
        `UPDATE ${this.table.name} SET  ${this.table.columns.buyer_id}=${userId} WHERE ${this.table.columns.id}=${productId};`
      )
    ).results;
  }
}

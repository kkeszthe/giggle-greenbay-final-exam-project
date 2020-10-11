import { userService } from '../dependencies/dependencyInjection';

export class ProductService {
  constructor(productRepo, errorCodes) {
    this.product = productRepo;
    this.user = userService;
    this.errorCodes = errorCodes;
  }

  validateURL(string) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(string);
  }

  async getSellableProducts() {
    const products = await this.product.getSellableProducts();
    return { products };
  }
  async getById({ productId }) {
    return (await this.product.getById({ productId }))[0];
  }

  async add({ product_name, description, photo_url, price, seller_id }) {
    if (!product_name || !description || !seller_id)
      throw new Error(this.errorCodes.missingParam);

    if (!price || !(Number.isInteger(price) && price > 0))
      throw new Error(this.errorCodes.invalidPrice);
    if (!photo_url || this.validateURL(photo_url))
      throw new Error(this.errorCodes.invalidURL);
    const productId = (
      await this.product.add({
        product_name,
        description,
        photo_url,
        price,
        seller_id,
      })
    ).insertId;
    return await this.getById({ productId });
  }

  async sellProduct({ productId, userId }) {
    if (!productId || !userId) throw new Error(this.errorCodes.missingParam);
    const product = await this.getById({ productId });
    const buyer = await this.user.getById({ userId });
    if (!product) throw new Error(this.errorCodes.invalidProductId);
    if (product.price > buyer.balance)
      throw new Error(this.errorCodes.invalidBalance);
    if (product.buyer_id) throw new Error(this.errorCodes.usedUserId);
    await this.product.sellProduct({ productId, userId });
    await this.user.updateBalance({ userId, amount: product.price * -1 });
    await this.user.updateBalance({
      userId: product.seller_id,
      amount: product.price,
    });
    return await this.getById({ productId });
  }
}

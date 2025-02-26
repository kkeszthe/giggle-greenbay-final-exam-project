export class ProductService {
  constructor({ productRepo, userService, errorCodes }) {
    this.product = productRepo;
    this.user = userService;
    this.errorCodes = errorCodes;
  }

  validateURL(string) {
    var pattern = new RegExp(
      '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?'
    );
    return pattern.test(string);
  }

  async add({ product_name, description, photo_url, price, seller_id }) {
    if (!product_name || !description || !seller_id || !price)
      throw new Error(this.errorCodes.missingParam);
    price = parseInt(price);
    if (!(Number.isInteger(price) && price > 0))
      throw new Error(this.errorCodes.invalidPrice);
    if (!photo_url) throw new Error(this.errorCodes.missingUrl);
    if (!this.validateURL(photo_url))
      throw new Error(this.errorCodes.invalidUrl);
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

  async getSellableProducts() {
    const products = await this.product.getSellableProducts();
    return { products };
  }
  async getById({ productId }) {
    return (await this.product.getById({ productId }))[0];
  }

  async sellProduct({ productId, userId }) {
    if (!productId || !userId) throw new Error(this.errorCodes.missingParam);
    const product = await this.getById({ productId });
    const balance = (await this.user.getById({ userId })).balance;
    if (!product) throw new Error(this.errorCodes.invalidProductId);
    if (product.price > balance)
      throw new Error(this.errorCodes.invalidBalance);
    if (product.buyer_id) throw new Error(this.errorCodes.usedUserId);
    await this.product.sellProduct({ productId, userId });
    await this.user.updateBalance({
      userId,
      amount: product.price * -1,
    });
    await this.user.updateBalance({
      userId: product.seller_id,
      amount: product.price,
    });
    return await this.getById({ productId });
  }
}

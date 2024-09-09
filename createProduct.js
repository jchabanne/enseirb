async function createProduct(categoryId, name, reference) {
  const category = await categoryRepository.getCategory(categoryId);
  const product = new Catalogue().createProduct(category, name, reference);
  await productRepository.addProduct(product);
  await eventBus.dispatch("productCreated", product);
}

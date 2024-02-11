import productJson from './product.json';
import blogJson from './blog.json';
/**

*/
function generateMockProductData(count, tag) {
  const products = productJson;
  const filtered = products.filter((item) => item.tags.includes(tag));
  return filtered.slice(0, count);
}

function getProductById(id) {
  const products = productJson;
  const filtered = products.find((item) => item.id === id);

  return filtered;
}

function generateMockBlogData(count) {
  return blogJson.slice(0, count);
}

export { generateMockProductData, generateMockBlogData, getProductById };

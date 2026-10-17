import { getProducts, createProduct, updateProduct, deleteProduct } from "./api.js";
import { createProductForm } from "./ProductForm.js";
import { renderProductTable } from "./ProductTable.js";

export function initApp(root) {
  root.innerHTML = "<h1>School Buffet</h1>";

  const tableContainer = document.createElement("div");
  let editingId = null;

  const { setEditing, resetForm } = createProductForm(root, {
    onSubmit: async ({ id, name, cost }) => {
      if (id !== null) {
        await updateProduct(id, { name, cost });
        resetForm();
        editingId = null;
      } else {
        await createProduct({ name, cost });
      }
      loadProducts();
    },
  });

  root.appendChild(tableContainer);

  async function loadProducts() {
    try {
      const data = await getProducts();
      renderProductTable(tableContainer, data, {
        onEdit: (product) => {
          editingId = product.id;
          setEditing(product);
        },
        onDelete: async (id) => {
          await deleteProduct(id);
          if (editingId === id) {
            resetForm();
            editingId = null;
          }
          loadProducts();
        },
      });
    } catch (e) {
      console.error("Failed to load products:", e);
    }
  }

  loadProducts();
}

export function createProductForm(container, { onSubmit }) {
  const form = document.createElement("form");
  form.innerHTML = `
    <label>
      Name
      <input name="name" required />
    </label>
    <label>
      Cost
      <input name="cost" type="number" required />
    </label>
    <button type="submit">Add</button>
    <button type="button" class="btn-cancel" style="display:none">Cancel</button>`;

  const inputName = form.querySelector('[name="name"]');
  const inputCost = form.querySelector('[name="cost"]');
  const btnSubmit = form.querySelector('[type="submit"]');
  const btnCancel = form.querySelector(".btn-cancel");

  let editingId = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = inputName.value.trim();
    const cost = Number(inputCost.value);
    if (!name || !cost) return;

    onSubmit({ id: editingId, name, cost });

    if (!editingId) {
      form.reset();
    }
  });

  btnCancel.addEventListener("click", () => {
    resetForm();
  });

  function setEditing(product) {
    editingId = product.id;
    inputName.value = product.name;
    inputCost.value = product.cost;
    btnSubmit.textContent = "Save";
    btnCancel.style.display = "";
  }

  function resetForm() {
    editingId = null;
    form.reset();
    btnSubmit.textContent = "Add";
    btnCancel.style.display = "none";
  }

  container.appendChild(form);

  return { setEditing, resetForm };
}

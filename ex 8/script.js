(() => {
	const API_BASE = '/api/items';

	const tableBody = () => document.querySelector('#items-table tbody');
	const form = () => document.querySelector('#item-form');
	const idInput = () => document.querySelector('#item-id');
	const nameInput = () => document.querySelector('#name');
	const descInput = () => document.querySelector('#description');
	const saveBtn = () => document.querySelector('#save-btn');
	const cancelBtn = () => document.querySelector('#cancel-btn');

	async function loadItems() {
		const res = await fetch(API_BASE);
		const items = await res.json();
		renderRows(items);
	}

	function renderRows(items) {
		const tbody = tableBody();
		tbody.innerHTML = '';
		for (const item of items) {
			const tr = document.createElement('tr');
			tr.innerHTML = `
				<td>${item.id}</td>
				<td>${escapeHtml(item.name)}</td>
				<td>${escapeHtml(item.description || '')}</td>
				<td>
					<div class="table-actions">
						<button data-edit="${item.id}">Edit</button>
						<button class="secondary" data-delete="${item.id}">Delete</button>
					</div>
				</td>
			`;
			tbody.appendChild(tr);
		}
	}

	function escapeHtml(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	async function onSubmit(e) {
		e.preventDefault();
		const id = idInput().value.trim();
		const name = nameInput().value.trim();
		const description = descInput().value.trim();
		if (!name) return alert('Name is required');
		const method = id ? 'PUT' : 'POST';
		const url = id ? `${API_BASE}/${id}` : API_BASE;
		await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, description })
		});
		resetForm();
		await loadItems();
	}

	function resetForm() {
		idInput().value = '';
		nameInput().value = '';
		descInput().value = '';
		saveBtn().textContent = 'Add';
		cancelBtn().hidden = true;
	}

	function startEdit(id, name, description) {
		idInput().value = id;
		nameInput().value = name;
		descInput().value = description || '';
		saveBtn().textContent = 'Update';
		cancelBtn().hidden = false;
		nameInput().focus();
	}

	async function onClick(e) {
		const editId = e.target.getAttribute('data-edit');
		const delId = e.target.getAttribute('data-delete');
		if (editId) {
			const res = await fetch(`${API_BASE}/${editId}`);
			if (!res.ok) return alert('Item not found');
			const item = await res.json();
			startEdit(item.id, item.name, item.description);
		}
		if (delId) {
			if (!confirm('Delete this item?')) return;
			await fetch(`${API_BASE}/${delId}`, { method: 'DELETE' });
			await loadItems();
		}
	}

	function wireEvents() {
		form().addEventListener('submit', onSubmit);
		cancelBtn().addEventListener('click', resetForm);
		document.body.addEventListener('click', onClick);
	}

	wireEvents();

	window.CrudUI = { loadItems };
})();




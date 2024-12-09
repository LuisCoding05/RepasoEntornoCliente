class UserManager {
    constructor() {
      this.users = []; // Array para almacenar usuarios
      this.tableBody = document.querySelector('#userTable tbody');
      this.form = document.querySelector('#userForm');
      this.error = document.querySelector('#error');
      this.init();
    }
  
    // Método para iniciar eventos
    init() {
      this.form.addEventListener('submit', (e) => this.addUser(e));
      this.tableBody.addEventListener('click', (e) => this.handleTableClick(e));
    }
  
    // Validaciones
    validate(name, email, phone) {
      const nameRegex = /^[a-zA-Z\s]+$/;
      const emailRegex = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
  
      if (!nameRegex.test(name)) return 'El nombre solo debe contener letras y espacios.';
      if (!emailRegex.test(email)) return 'El correo es inválido.';
      if (!phoneRegex.test(phone)) return 'El teléfono es inválido.';
      return null;
    }
  
    // Añadir usuario
    addUser(e) {
      e.preventDefault();
      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const phone = document.querySelector('#phone').value.trim();
  
      const error = this.validate(name, email, phone);
      if (error) {
        this.error.textContent = error;
        return;
      }
  
      this.error.textContent = '';
      this.users.push({ name, email, phone });
      this.updateTable();
      this.form.reset();
    }
  
    // Actualizar tabla
    updateTable() {
      this.tableBody.innerHTML = '';
      this.users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>
            <button data-action="edit" data-index="${index}">Editar</button>
            <button data-action="delete" data-index="${index}">Eliminar</button>
          </td>
        `;
        this.tableBody.appendChild(row);
      });
    }
  
    // Manejar clic en tabla (delegación)
    handleTableClick(e) {
      const action = e.target.dataset.action;
      const index = e.target.dataset.index;
  
      if (action === 'edit') {
        this.editUser(index);
      } else if (action === 'delete') {
        this.deleteUser(index);
      }
    }
  
    // Editar usuario
    editUser(index) {
      const user = this.users[index];
      document.querySelector('#name').value = user.name;
      document.querySelector('#email').value = user.email;
      document.querySelector('#phone').value = user.phone;
      this.users.splice(index, 1); // Elimina temporalmente el usuario
      this.updateTable();
    }
  
    // Eliminar usuario
    deleteUser(index) {
      this.users.splice(index, 1);
      this.updateTable();
    }
  }
  
  // Inicializar gestor de usuarios
  new UserManager();
  
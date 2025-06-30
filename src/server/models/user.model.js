const UserModel = {
  findById(id) {
    const data = DB.getData("Users");
    return data.find((user) => user.id == id) || null;
  },

  getAll(selectedColumns = []) {
    const data = DB.getData("Users");
    return data.map((row) => {
      const user = {};

      if (selectedColumns.length > 0) {
        selectedColumns.forEach((colName) => {
          if (row[colName] !== undefined) {
            user[colName] = row[colName];
          }
        });
      } else {
        Object.assign(user, row);
      }

      return user;
    });
  },

  update(id, values) {
    const data = DB.getData("Users");

    const rowIndex = data.findIndex((user) => user.id == id);

    if (rowIndex === -1)
      return ErrorHandler.send(400, "Usuario não encontrado!");

    const updatedData = { ...data[rowIndex], ...values };

    DB.writeRow("Users", rowIndex, updatedData);

    return updatedData;
  },
};

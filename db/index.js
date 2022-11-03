class DB {
  constructor(connect, firstName, lastName, roleID, managerID) {
    this.connect = connect;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleID = roleID;
    this.managerID = managerID;
  }

  saveToDatabase() {}

  getAllEmployees() {
    return this.connect.query, this.connect, this.firstName, this.lastName, this.roleID, this.managerID;
  }
}

module.exports = DB;
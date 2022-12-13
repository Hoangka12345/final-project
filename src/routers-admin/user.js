const { verifyAdmin } = require("../verify");

const { showUsers } = require("../controller-admin/user/showUsers");
const { showUserDetail } = require("../controller-admin/user/showUserDetail");
const { updateUser } = require("../controller-admin/user/updateUser");
const { deleteUser } = require("../controller-admin/user/deleteUser");

const { showCompanies } = require("../controller-admin/user/showCompanies");
const { showCompanyDetail } = require("../controller-admin/user/showCompanyDetail");

const { showCompanyAuth } = require("../controller-admin/user/showCompanyAuth");
const { showCompanyUnAuth } = require("../controller-admin/user/showCompanyUnAuth");
const { authcompany } = require("../controller-admin/user/authCompany");

const user = require("express")();

user.get("/showusers", verifyAdmin, showUsers);
user.get("/showuserdetail/:userId", verifyAdmin, showUserDetail);
user.put("/update-user/:userId", verifyAdmin, updateUser);

user.delete("/delete-user/:userId", verifyAdmin, deleteUser);

user.get("/showcompanies", verifyAdmin, showCompanies);
user.get("/showcompanydetail/:companyId", verifyAdmin, showCompanyDetail);

user.get("/companyauth", verifyAdmin, showCompanyAuth);
user.get("/companyunauth", verifyAdmin, showCompanyUnAuth);
user.put("/auth", verifyAdmin, authcompany); //handle verify for company account

module.exports = {
  user,
};

import Http from './http';

class companySettingsService {

  UpdateCompanyInfo(data) {
    return Http.post('Admin/Company/UpdateCompanyInfo', data)
  }

  GetCompanyById() {
    return Http.get('Admin/Company/GetCompanyById')
  }
  
  UserListing(data) {
    return Http.post('Admin/User/GetAllCompanyUsers', data)
  }

  AddCompanyUser(data){
    return Http.post('Admin/User/AddCompanyUser', data)
  }

  GetUserById(userId){
    return Http.get(`Admin/User/GetUserById?userId=${userId}`)
  }

  DeleteUser(data) {
    return Http.delete(`Admin/User/DeleteCompanyUser?userId=${data}`)
  }

}

export default new companySettingsService();
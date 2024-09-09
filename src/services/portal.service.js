import Http from './http';

class portalService {

  getAllPortals(data) {
    return Http.post('Admin/Portal/GetAllPortals',data);
  }

  getProjectTypes() {
    return Http.get('Admin/Project/GetProjectTypesOfCompany');
  }

  submitCreatePortal(data) {
    return Http.post('Admin/Customer/create', data)
  }

  getStageData() {
    return Http.get('Admin/Project/GetProjectStagesOfCompany')
  }

  changePortalStatus(body) {
    return Http.post('Admin/Portal/ChangePortalStatus', body)
  }

  chnagePortalStage(body) {
    return Http.post(`Admin/Portal/StageChange`,body)
  }
}

export default new portalService();
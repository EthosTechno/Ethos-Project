import Http from './http';
class dashboardService {

  getDashboard(range) {
    return Http.get(`Home/dashboard?range=${range}`)
  }

  GetAllDashboardEnums(){
    return Http.get('Home/GetAllDashboardEnums')
  }
}

export default new dashboardService();
import Http from './http';
class exploreReferralService {

 getExploreReferrals(body) {
    return Http.post('Admin/Project/GetAllProjectReferrals',body)
 }

 exportReferrals(body){
    return Http.postResType('Admin/Project/ExportProjectReferral', body)
 }
}

export default new exploreReferralService();
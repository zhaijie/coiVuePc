/**
 * Created by Administrator on 2018/11/13 0013.
 */
import http from './http';

//获取最新资讯
export function getNewInformation(callback) {
  http.post('/pc/coit/newInformation', {}, function (data, err) {
    data.forEach(function (v) {
      v.typeText = setTypeText(v.type);
    });
    callback(data, err);
  })
}

//获取资讯详情
export function getNewInfoDetail(params, callback) {
  http.post('/app/feedback/getInformationDetail', params, function (data, err) {
    callback(data, err);
  })
}

//获取公告详情
export function getAnnouncementDetail(params, callback) {
  http.post('/pc/coit/getAnnouncementDetail', params, function (data, err) {
    callback(data, err);
  })
}

//查询公告、资讯列表
export function announcementList(params, callback) {
  http.post('/pc/coit/announcementList', params, function (data, err) {
    data.item.forEach(function (v) {
      v.typeText = setTypeText(v.type);
    });
    callback(data, err);
  })
}

//查询公告、资讯列表
export function setTypeText(type) {

  let typeText;
  switch (type) {
    case 'GG':
      typeText = '公告';
      break;
    case 'WC':
      typeText = '文创资讯';
      break;
    case 'KX':
      typeText = '区块资讯';
      break;
  }

  return typeText;
}




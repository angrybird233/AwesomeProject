import http from '../utils/http';

// 获取土地H5首页-客户列表
export const getLandCustomersApi = data => {
  return http('api/land/customer-list', {
    method: 'POST',
    data,
  });
};
// 获取土地H5首页数据统计
export const getLandStatisticsApi = data => {
  return http('api/land/statistics', {
    method: 'POST',
    data,
  });
};

// 获取土地列表
export const getLandListApi = data => {
  return http('api/land/list', {
    method: 'POST',
    data,
  });
};

// 地块新增/编辑
export const landSaveApi = data => {
  return http('api/land/save', {
    method: 'POST',
    data,
  });
};
// 地块删除
export const landDeleteApi = data => {
  return http('api/land/delete', {
    method: 'POST',
    data,
  });
};

// 获取工单中已选地块
export const getOrderSelectedLandsApi = data => {
  return http('api/order/select-land-list', {
    method: 'POST',
    data,
  });
};

// 工单编辑地块保存
export const submitOrderSelectedLandsApi = data => {
  return http('api/order/bind-land-edit', {
    method: 'POST',
    data,
  });
};

'use strict';

// --------------------------------------------------
/* Services */
// --------------------------------------------------

var mcpServices = angular.module('mcp.dataservices', ['ngResource'])

    .constant("servicePort", /*"8080"*/ null)
    .constant("servicePortBackend", "443")
    .constant("loginType", "oidc")
    
    .factory('serviceBaseUrl', ['$location', 'servicePort',
      function ($location, servicePort) {
        var protocol = $location.protocol();
        var host = $location.host();
        var port = servicePort ? servicePort : $location.port();
        return protocol + "://" + host + ":" + port;
      }])
      
    .factory('serviceBaseUrlBackend', ['$location', 'servicePortBackend',
      function ($location, servicePortBackend) {
        var protocol = 'https';
        var host = 'api.maritimecloud.net';
        var port = servicePortBackend ? servicePortBackend : $location.port();
        return protocol + "://" + host + ":" + port;
      }])
      
    
    .factory('DeviceService', ['$resource', 'serviceBaseUrlBackend', 'loginType', 'Auth', function ($resource, serviceBaseUrlBackend, loginType, Auth) {
    	var resource = $resource(serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/device/:deviceId', {}, {
    		post: {method: 'POST', params: {}, isArray: false},
            put: {method: 'PUT', params: {deviceId: '@id'}, isArray: false},
            deleteD: {method: 'DELETE', params: {deviceId: '@deviceId'}, isArray: false},
            getDeviceList: {
            	method: 'GET', 
            	url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/devices', 
            	isArray: true
            },
            generateCertificate: {
                method: 'GET',
                params: {deviceId: '@deviceId'},
                url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/device/:deviceId/generatecertificate'
            },
            revokeCertificate: {
                method: 'POST',
                params: {deviceId: '@deviceId', certId: '@certId'},
                url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/device/:deviceId/certificates/:certId/revoke'
            }
        });

        resource.update = function (device, succes, error) {
            return this.put(device, succes, error);
        };
        resource.create = function (device, succes, error) {
            return this.post(device, succes, error);
        };
        resource.deleteDevice = function (deviceId, succes, error) {
            return this.deleteD({deviceId: deviceId}, succes, error);
        };        
        resource.generateCertificateForDevice = function (deviceId, succes, error) {
            return this.generateCertificate({deviceId: deviceId}, succes, error);
        };
        resource.revokeCertificateForDevice = function (deviceId, certId, revokationReason, revokedAt, succes, error) {
            return this.revokeCertificate({deviceId: deviceId, certId: certId, revokationReason: revokationReason, revokedAt: revokedAt}, succes, error);
        };
    	return resource;
    }])

    .factory('VesselService', ['$resource', 'serviceBaseUrlBackend', 'loginType', 'Auth', function ($resource, serviceBaseUrlBackend, loginType, Auth) {
        var resource = $resource(serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/vessel/:vesselId', {}, {
            post: {method: 'POST', params: {}, isArray: false},
            put: {method: 'PUT', params: {vesselId: '@id'}, isArray: false},
            deleteV: {method: 'DELETE', params: {vesselId: '@vesselId'}, isArray: false},
            getVesselList: {
            	method: 'GET', 
            	url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/vessels', 
            	isArray: true
            },
            generateCertificate: {
                method: 'GET',
                params: {vesselId: '@vesselId'},
                url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/vessel/:vesselId/generatecertificate'
            },
            revokeCertificate: {
                method: 'POST',
                params: {vesselId: '@vesselId', certId: '@certId'},
                url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/vessel/:vesselId/certificates/:certId/revoke'
            }
        });

        resource.update = function (vessel, succes, error) {
            return this.put(vessel, succes, error);
        };
        resource.create = function (vessel, succes, error) {
            return this.post(vessel, succes, error);
        };
        resource.deleteVessel = function (vesselId, succes, error) {
            return this.deleteV({vesselId: vesselId}, succes, error);
        };        
        resource.generateCertificateForVessel = function (vesselId, succes, error) {
            return this.generateCertificate({vesselId: vesselId}, succes, error);
        };
        resource.revokeCertificateForVessel = function (vesselId, certId, revokationReason, revokedAt, succes, error) {
            return this.revokeCertificate({vesselId: vesselId, certId: certId, revokationReason: revokationReason, revokedAt: revokedAt}, succes, error);
        };
        
        return resource;
      }])

    .factory('UserService', ['$resource', 'serviceBaseUrlBackend', 'loginType', 'Auth', function ($resource, serviceBaseUrlBackend, loginType, Auth) {
    	var resource = $resource(serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/user/:userId', {}, {
    		post: {method: 'POST', params: {}, isArray: false},
            put: {method: 'PUT', params: {userId: '@id'}, isArray: false},
            deleteU: {method: 'DELETE', params: {userId: '@userId'}, isArray: false},
            getUserList: {
            	method: 'GET', 
            	url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/users', 
            	isArray: true
            },
            generateCertificate: {
                method: 'GET',
                params: {userId: '@userId'},
                url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/user/:userId/generatecertificate'
            },
            revokeCertificate: {
                method: 'POST',
                params: {userId: '@userId', certId: '@certId'},
                url: serviceBaseUrlBackend + '/' + loginType + '/api/org/' + auth.org + '/user/:userId/certificates/:certId/revoke'
            }
        });

        resource.update = function (user, succes, error) {
            return this.put(user, succes, error);
        };
        resource.create = function (user, succes, error) {
            return this.post(user, succes, error);
        };
        resource.deleteUser = function (userId, succes, error) {
            return this.deleteU({userId: userId}, succes, error);
        };        
        resource.generateCertificateForUser = function (userId, succes, error) {
            return this.generateCertificate({userId: userId}, succes, error);
        };
        resource.revokeCertificateForUser = function (userId, certId, revokationReason, revokedAt, succes, error) {
            return this.revokeCertificate({userId: userId, certId: certId, revokationReason: revokationReason, revokedAt: revokedAt}, succes, error);
        };
    	return resource;
    }])
    
    .factory('OrganizationService', ['$resource', 'serviceBaseUrlBackend', 'loginType', function ($resource, serviceBaseUrlBackend, loginType) {
        var resource = $resource(serviceBaseUrlBackend + '/' + loginType + '/api/org/:shortName', {}, {
            put: {method: 'PUT', params: {shortName: '@shortName'}},
            applyOrg: {method: 'POST', params: {shortName: '@shortName'}},
            getOrganizationList: {
            	method: 'GET', 
            	url: serviceBaseUrlBackend + '/' + loginType + '/api/orgs', 
            	isArray: true
            },
            applyOrg: {
                method: 'POST',
                params: {},
                url: serviceBaseUrlBackend + '/' + loginType + '/api/org/apply'
            }
        });

        resource.update = function (organization, succes, error) {
            return this.put(organization, succes, error);
        };

        resource.apply = function (organization, succes, error) {
            return this.applyOrg(organization, succes, error);
        };

        return resource;
    }])
    
    .factory('UserOldService', ['$resource', 'serviceBaseUrl', function ($resource, serviceBaseUrl) {
    	var resource = $resource(serviceBaseUrl + '/rest/api/users/:userId', {}, {
    		query: {method: 'GET', params: {userId: ''}, isArray: false},
            count: {method: 'GET', params: {userId: 'count'}, isArray: false},
            post: {method: 'POST', params: {}, isArray: false},
            put: {method: 'PUT', params: {}, isArray: false},
            queryUserMemberOrganizations: {method: 'GET', url: '/rest/api/users/:userId/member-organizations', isArray: true},
            queryUserOrganizations: {method: 'GET', url: '/rest/api/users/:userId/organizations', isArray: true}
        });
    	return resource;
    }])
    
    .factory('OrganizationOldService', ['$resource', 'serviceBaseUrl',
      function ($resource, serviceBaseUrl) {
        var resource = $resource(serviceBaseUrl + '/rest/api/org/:organizationId', {}, {
          post: {method: 'POST'},
          put: {method: 'PUT', params: {organizationId: '@organizationId.identifier'}},
          membershipQuery: {method: 'GET', url: serviceBaseUrl + '/rest/api/org/:organizationId/member', isArray: true },
          membership: {method: 'POST', params: {},
            url: serviceBaseUrl + '/rest/api/org/:organizationId/member'
          },
          membershipPut: {method: 'PUT', params: {},
            url: serviceBaseUrl + '/rest/api/org/:organizationId/member'
          },
          membershipCount: {method: 'GET', url: serviceBaseUrl + '/rest/api/org/:organizationId/member/count' },
          exists: {method: 'GET', params: {},
            url: serviceBaseUrl + '/rest/api/org/:organizationId/exists',
            transformResponse: function(data) {
                return {result: data};
            }
          },
          roleUpdate: {method: 'PUT', params: { organizationId: '@organizationId' },
            url: serviceBaseUrl + '/rest/api/org/:organizationId/role'
          }
        });

        resource.create = function (organization, succes, error) {
          return this.post(organization, succes, error);
        };

        resource.update = function (organization, succes, error) {
          return this.put(organization, succes, error);
        };

        resource.updateRole = function (organization, userId, role, update, success, error) {
          return this.roleUpdate({ organizationId: organization.organizationId, userId: userId, role: role, update: update }, success, error)
        };

        resource.updateRoleWithMessage = function (organization, userId, role, update, message, success, error) {
          return this.roleUpdate({ organizationId: organization.organizationId, userId: userId, role: role, message: message, update: update }, success, error)
        };

        return resource;
      }])

    .factory('ServiceStatsService', ['$resource', 'serviceBaseUrl',
      function ($resource, serviceBaseUrl) {
        return $resource(serviceBaseUrl + '/rest/api/stats');
      }])


    .factory('OperationalServiceService', ['$resource', 'serviceBaseUrl',
      function ($resource, serviceBaseUrl) {
        return $resource(serviceBaseUrl + '/rest/api/operational-service/:operationalServiceId');
      }])

    .factory('ServiceTypeService', ['$resource', 'serviceBaseUrl',
        function ($resource, serviceBaseUrl) {
            return $resource(serviceBaseUrl + '/rest/api/service-types');
        }])

    .factory('ServiceSpecificationService', ['$resource', 'serviceBaseUrl',
      function ($resource, serviceBaseUrl) {
          var resource = $resource(serviceBaseUrl + '/rest/api/service-specification/:serviceSpecificationId', {},
              {
                  post: {method: 'POST'},
                  put: {method: 'PUT'},
                  exists: {method: 'GET', params: {},
                      url: serviceBaseUrl + '/rest/api/service-specification/:serviceSpecificationId/exists',
                      transformResponse: function(data) {
                          return {result: data};
                      }
                  }
              }
          );

          resource.create = function (serviceSpec, succes, error) {
              return this.post(serviceSpec, succes, error);
          };

          resource.update = function (serviceSpec, succes, error) {
              return this.put(serviceSpec, succes, error);
          };

          return resource;
      }])

    .factory('ServiceInstanceService', ['$resource', 'serviceBaseUrl',
      function ($resource, serviceBaseUrl) {

        var resource = $resource(serviceBaseUrl + '/rest/api/service-instance/:serviceInstanceId', {},
            {
                post: {method: 'POST'},
                put: {method: 'PUT'},
                exists: {method: 'GET', params: {},
                    url: serviceBaseUrl + '/rest/api/service-instance/:serviceInstanceId/exists',
                    transformResponse: function(data) {
                        return {result: data};
                    }
                },
                members: {
                    method: 'GET',
                    params: {},
                    url: serviceBaseUrl + '/rest/api/service-instance/:serviceInstanceId/member',
                    isArray: true
                },
                roleUpdate: {
                    method: 'PUT',
                    params: { serviceInstanceId: '@serviceInstanceId' },
                    url: serviceBaseUrl + '/rest/api/service-instance/:serviceInstanceId/role'
                }

            });

          resource.create = function (serviceInstance, succes, error) {
              return this.post(serviceInstance, succes, error);
          };

          resource.update = function (serviceInstance, succes, error) {
              return this.put(serviceInstance, succes, error);
          };

          resource.updateRole = function (serviceInstance, userId, role, update, success, error) {
              return this.roleUpdate({ serviceInstanceId: serviceInstance.serviceInstanceId, userId: userId, role: role, update: update }, success, error)
          };

          resource.updateOrgRole = function (serviceInstance, organizationId, role, update, success, error) {
              return this.roleUpdate({ serviceInstanceId: serviceInstance.serviceInstanceId, organizationId: organizationId, role: role, update: update }, success, error)
          };

          return resource;
      }]);

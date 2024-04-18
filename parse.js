let aliases = {
  "GET app/config": "appconfig.getAppConfig",
  "GET auth/check": "auth.check",
  "POST auth/prabandhak/profile": "auth.fetchUserProfile",
  "POST auth/user/list": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, distributionType, userFilter, search, filter, service, targetLanguage, sourceLanguage, existUser, assignmentUnit, unitId, flag, inviteId } = req.body;
    this.broker
      .call("auth.getUserList", {
        user,
        pageNumber,
        pageSize,
        distributionType,
        userFilter,
        search,
        filter,
        service,
        targetLanguage,
        sourceLanguage,
        existUser,
        assignmentUnit,
        unitId,
        flag,
        inviteId
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET auth/approvedUser/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search, filter } = req.$params;
    this.broker
      .call("auth.getApprovedUserList", {
        pageNumber,
        pageSize,
        search,
        filter
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET project/status/count/:distributionType": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { distributionType } = req.$params;
    this.broker
      .call("project.fetchProjectStatusCount", {
        distributionType,
        user
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  // "GET auth/user/by/serviceinfo/list/:pageNumber/:pageSize"(req,res){
  // 	const verificationData = this.authenticate(req.headers["authorization"]);
  // 	const user = verificationData.data;
  // 	const {pageNumber,pageSize, search, filter, service, targetLanguage, sourceLanguage} = req.$params;
  // 	this.broker.call("auth.getUserByServiceInfo", {
  // 		user,
  // 		pageNumber,
  // 		pageSize,
  // 		search,
  // 		filter,
  // 		service,
  // 		targetLanguage,
  // 		sourceLanguage,
  // 	 }).then(data => {
  // 		res.writeHead(200);
  // 		res.end(JSON.stringify(data));
  // 	});
  // },
  "POST auth/login": "auth.login",
  "POST auth/register": "auth.register",
  "POST test": (req, res) => {
    res.end("OKAY");
  },
  "POST auth/otp/verification": "auth.verifyOtp",
  "POST auth/otp/resend": "auth.resendOtp",
  "POST auth/password/reset": "auth.resetPassword",
  "POST auth/eula": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("auth.acceptEula", { user }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST auth/privacy/policy": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("auth.acceptPrivacyAndPolicy", { user }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST auth/admin/user/list": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("auth.fetchUserListsOfAdminUsers", { user }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST auth/app/refresh": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("auth.updateUserAppRefresh", { user }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  // put to post
  "POST auth/password/change": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("auth.changePassword", {
        user,
        body: req.body
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // put to post
  "POST auth/profile/password/change": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { oldPassword, newPassword } = req.body;
    this.broker
      .call("auth.changePasswordfromProfile", {
        user,
        oldPassword,
        newPassword
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // put to post
  // "PUT auth/user/update/:id": "auth.updateUserInfo",
  "POST auth/user/update": function (req, res) {
    const userObj = req.body;
    this.broker.call("auth.updateUserInfo", { userObj }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  // put to post
  // "PUT auth/user/updateOnboard/:id": "auth.updateUserOnboardInfo",
  "POST auth/user/updateOnboard": function (req, res) {
    const userObj = req.body;
    this.broker.call("auth.updateUserOnboardInfo", { userObj }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  "POST auth/user/update/phone": "auth.updatePhoneNumber",
  "POST auth/verify/phone": "auth.verifyPhoneNumber",
  // put to post
  "POST auth/user/accept": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const userObj = req.body;
    this.broker
      .call("auth.acceptDocument", {
        userObj,
        user
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET auth/lsp/clients/all": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("auth.fetchallLspClients", { user }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  // put to post
  "POST auth/user/language/preference": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { dashboardLanguages, tmLanguages } = req.body;
    this.broker
      .call("auth.updateLanguagePreferences", {
        user,
        dashboardLanguages,
        tmLanguages
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST auth/user/reject": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const userObj = req.body;
    this.broker
      .call("auth.rejectDocument", {
        user,
        userObj
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST auth/user/update/kyc": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("auth.updateKycInfo", {
          files,
          fields,
          user
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST auth/user/update/picture": function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      const verificationData = this.authenticate(req.headers.authorization);
      const user = verificationData.data;
      this.broker
        .call("auth.updateProfileImage", {
          files,
          user
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST auth/request/credit": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const note = req.body;
    this.broker
      .call("auth.requestCredit", {
        user,
        note
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET auth/plans/admin": "auth.getUserPlansForAdmin",
  "GET /admin/user/feedback/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search } = req.$params;
    this.broker
      .call("feedback.getFeedbacks", {
        user,
        pageNumber,
        pageSize,
        search
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  "POST auth/feedback/action": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { action, feedback } = req.body;
    this.broker
      .call("auth.userActionFeedback", {
        user,
        feedback,
        action
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  /** ****************************************** ADMIN ROUTER ******************************* */

  "POST admin/create/user": "admin.createUser",
  // put to post
  "POST admin/update/user": "admin.updateUser",
  "POST admin/create/client": function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("admin.createProClient", {
          files,
          fields
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "GET admin/users/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, search, plan } = req.$params;
    this.broker
      .call("admin.fetchUsers", {
        user,
        pageNumber,
        pageSize,
        search,
        filter,
        plan
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET admin/online/users/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, search } = req.$params;
    this.broker
      .call("active_user.fetchOnlineUsers", {
        user,
        pageNumber,
        pageSize,
        search,
        filter
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST /admin/active/deactive": "admin.onActiveAndDeactiveChange",
  "POST /admin/manage/multipleLogin": "admin.manageUserMultiLogin",
  "GET /admin/userInfo/:apikey": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    if (user.role !== "admin" && user.role !== "management") {
      res.end(JSON.stringify(this.error("Invalid Data")));
    }
    const { apikey } = req.$params;
    this.broker
      .call("admin.fetchUserViewInfo", {
        user,
        apikey
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST admin/create/commission": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { commission, role } = req.body;
    this.broker
      .call("manage_config.createCommission", {
        commission,
        role,
        user
      })
      .then(result => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(result));
      });
  },
  "GET admin/fetch/commission": "manage_config.fetchCommission",
  "GET admin/commission/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, search } = req.$params;
    this.broker
      .call("manage_config.fetchCommissionList", {
        user,
        pageNumber,
        pageSize,
        search,
        filter
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  /** ****************************************** LSP CREATE USER OR CLIENT ******************************* */
  // 'POST auth/create/user': 'auth.createLspUser',
  "POST auth/create/user": function(req, res) {
    const {email, role, name, phone, referenceKey, subjectMatters, password, languages, translitionLimit, proofreadsLimit, editingLimit } = req.body;
    this.broker
      .call("auth.createLspUser", {
        email,
        role,
        name,
        phone,
        referenceKey,
        subjectMatters,
        password,
        languages,
        translitionLimit,
        proofreadsLimit,
        editingLimit
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  "GET auth/fetch/user/:page/:rowsPerPage": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { page, rowsPerPage, filter, filterSearch } = req.$params;
    this.broker
      .call("auth.fetchLspUser", {
        user,
        page,
        rowsPerPage,
        filter,
        filterSearch
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET auth/fetch/usercounts": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("auth.fetchUserListsByReferenceKey", {
        role: user.role,
        referenceKey: user.apikey
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // delete to post
  // "DELETE auth/delete/lsp/user/:id": "auth.deleteLspUser",
  "POST auth/delete/lsp/user": function (req, res) {
    const { _id } = req.body;
    this.broker.call("auth.deleteLspUser", { id: _id }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  "POST auth/update/lsp/user": "auth.updateLspUser",
  "GET auth/user/by/:apikey": "auth.getUserByApikey",
  "GET auth/user/:email": "auth.fetchUserByEmail",

  /** ******************c***************************** GLOSSARY ROUTER *************************************** */

  "GET glossary/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const createdBy = user.email;
    const { search, pageNumber, pageSize, domain, clientName, projectTag, targetLang } = req.$params;
    this.broker
      .call("glossary.getGlossary", {
        search,
        createdBy,
        pageNumber,
        pageSize,
        domain,
        clientName,
        projectTag,
        targetLang
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET glossary/list/attach/:unit/:unitId": function (req, res) {
    const { unit, unitId } = req.$params;
    this.broker
      .call("glossary.attchedGlossary", {
        unit,
        unitId
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST glossary/reattach/:glossaryId": function (req, res) {
    const { glossaryId } = req.$params;
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("glossary.reattachGlossary", {
        glossaryId,
        userData: user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST glossary": "glossary.createGlossary",
  // put to post
  "POST glossary/update": function (req, res) {
    const { glossaryId, allocatedTo, glossaryObj } = req.$params;
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("glossary.updateGlossaryPM", {
        glossaryId,
        allocatedTo,
        glossaryObj,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // delete to post
  // "DELETE glossary/:id": "glossary.deleteGlossary",
  "POST glossary/delete": function (req, res) {
    const { id } = req.body;
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("glossary.deleteGlossary", { id, user }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  "POST glossary/fetch": function (req, res) {
    const {projectId, subprojectId, taskId, segmentId, assignmentUnit, targetLanguage} = req.body;
    this.broker.call("glossary.checkGlossary", {
      projectId, subprojectId, taskId, segmentId, assignmentUnit, targetLanguage
    })
      .then((data) => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  /** *********************************************** GLOSSARY TERMS ROUTER *************************************** */

  "GET terms/:id/:page/:rowsPerPage": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("termslist.getGlossaryTermList", {
        ...req.$params,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST terms/upload": function (req, res) {
    const form = new multiparty.Form({ maxFieldsSize: 524288000 });
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("termslist.uploadTerms", {
          files,
          fields
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },

  "POST terms/update": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("termslist.updateGlossaryTerm", {
        user,
        data: req.body
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // delete to post
  // "DELETE terms/delete/:id": "termslist.deleteGlossaryTerm",
  "POST terms/delete": function (req, res) {
    const { id } = req.body;
    this.broker.call("termslist.deleteGlossaryTerm", { id }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  /** ************************************************* GLOSSARY FINDER ROUTER *************************************** */

  "POST finder": function (req, res) {
    const form = new multiparty.Form({ maxFieldsSize: 524288000 });
    form.parse(req, (err, fields, files) => {
      this.broker.call("finder.findTerminilogy", files).then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
    });
  },
  "POST finder/add/term": "finder.addTermToGlossary",

  /** ************************************************** MEMORY ROUTER *********************************************** */

  "POST upload/memory": function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("memory.uploadTmxFile", {
          files,
          fields
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "GET tm_Stats/:email/:apikey": "memory.fetchTmStats",
  "GET tm/stats/:sourceLanguage/:apikey": "tm.getTmStats",
  "POST tmInfo/data": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { page, rowsPerPage, unit, unitId } = req.body;
    this.broker
      .call("tm_info.fetchTMInfoForApply", {
        page,
        rowsPerPage,
        user,
        unit,
        unitId
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST tmInfo/apply": "tm_info.applyTMLevelWise",
  "POST tmInfo/remove": "tm_info.removeTMLevelWise",
  "GET tm/admin/stats/:apikey": "tm.getTmStatsForAdmin",
  // put to post
  "POST tmInfo/update": "tm_info.updateTmDomain",
  "POST tm_info/attach/tm": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, targetLanguages, tmInfoId, action, flag, targetLanguage, tmType, pipeline } = req.body;
    this.broker
      .call("tm_info.attachTmData", {
        projectId,
        targetLanguages,
        tmInfoId,
        user,
        action,
        flag,
        targetLanguage,
        tmType,
        pipeline
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST tm_info/attach/tm/invitation": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, targetLanguages, tmInfoId, action, flag, targetLanguage } = req.body;
    this.broker
      .call("tm_info.attachTmDataInvitation", {
        projectId,
        targetLanguages,
        tmInfoId,
        user,
        action,
        flag,
        targetLanguage
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  "POST tm_info/get/attach": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { clientName, filterCheck, clientRole, targetLanguages, search, pageNumber, pageSize, domain, targetLanguage, attachedTm } = req.body;
    this.broker
      .call("tm_info.fetchAttachTmInfo", {
        clientName,
        filterCheck,
        clientRole,
        targetLanguages,
        targetLanguage,
        user,
        search,
        pageNumber,
        pageSize,
        domain,
        attachedTm
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // ********************************************* Lookup Router **************************************************/
  "GET lookup/:fileName/:sourceLanguage/:targetLanguage/:apikey/:page/:rowsPerPage": "lookup_db.fetchLookUpData",

  // ********************************************* Tm_Info Router **************************************************/
  "GET tm_Info/:email/:apikey/:page/:rowsPerPage": function (req, res) {
    const { page, rowsPerPage, search, email, apikey } = req.$params;
    this.broker
      .call("tm_info.fetchTmInfo", {
        page,
        rowsPerPage,
        search,
        email,
        apikey
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET tm/data/:id/:page/:rowsPerPage": "tm_info.fetchLookUpData",
  "POST tm/data/:pageNumber/:pageSize": "tm.getTmTermsByTmName",

  //* ********************************************* LSP_CLIENT ROUTER *********************************************** */
  "POST lsp/create/client": function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("lsp.createLspClient", {
          files,
          fields
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST lsp/create/proclient": function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("auth.createProClient", {
          files,
          fields
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "GET lsp/fetch/client/:page/:rowsPerPage": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { page, rowsPerPage, search } = req.$params;
    this.broker
      .call("lsp.fetchLspClient", {
        page,
        rowsPerPage,
        user,
        search
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET lsp/fetch/proclient/:proClientPage/:proClientRowsPerPage": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { proClientPage, proClientRowsPerPage, proClientSearch } = req.$params;
    this.broker
      .call("auth.fetchProClient", {
        proClientPage,
        proClientRowsPerPage,
        user,
        proClientSearch
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST lsp/proclient/requestproject": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const userAuth = verificationData.data;
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("proclient.createProjectRequest", {
          files,
          fields,
          userAuth
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST client/project-request": function (req, res) {
    const userAuth = { apikey: req.headers.apikey };
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("proclient.createProjectRequest", {
          files,
          fields,
          userAuth
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST client/export-client-translations": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const userAuth = verificationData.data;
    const { unit, unitId, targetLanguages, webhookUrl, status } = req.body;
    this.broker
      .call("export.exportClientTranslations", {
        user: userAuth,
        unit,
        unitId,
        targetLanguages,
        webhookUrl,
        status
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST cms/proclient/create": [
    (req, res) => {
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        req.$ctx.broker
          .call("proclient.createApiProjectRequest", {
            fields,
            files
          })
          .then(data => {
            configureHeaders(res);
            res.writeHead(200);
            res.end(JSON.stringify(data));
          });
      });
    }
  ],
  "POST upload/cert/files": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const userAuth = verificationData.data;
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("trainingcert.uploadCertificationFiles", {
          files,
          fields,
          userAuth
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },

  "POST lsp/proclient/project/wordcount": "project.processRequestedProjectWordcounts",
  "GET lsp/proclient/fetchProjects/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filterSearch, filter, status, createdBy } = req.$params;
    this.broker
      .call("proclient.fetchProjectRequests", {
        user,
        pageNumber,
        pageSize,
        filter,
        filterSearch,
        status,
        createdBy
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // put to post
  // "PUT lsp/proclient/reject/:requestId"(req, res) {
  // 	const verificationData = this.authenticate(req.headers["authorization"]);
  // 	const user = verificationData.data;
  // 	const { requestId } = req.$params;
  // 	const { comment } = req.body;
  // 	this.broker.call("proclient.rejectProjectRequest", { user, requestId, comment }).then(data => {
  // 		configureHeaders(res);
  // 		res.writeHead(200);
  // 		res.end(JSON.stringify(data));
  // 	});
  // },
  "POST lsp/proclient/reject": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId } = req.body;
    const requestId = projectId;
    const { comment } = req.body;
    this.broker
      .call("proclient.rejectProjectRequest", {
        user,
        requestId,
        comment
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // delete to post
  // "DELETE lsp/proclient/:requestId": "proclient.deleteProjectRequest",
  "POST lsp/proclient": function (req, res) {
    const { projectId } = req.body;
    this.broker.call("proclient.deleteProjectRequest", { requestId: projectId }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST lsp/proclient/acceptProject": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("proclient.acceptProjectRequest", {
          fields,
          files,
          user,
          authToken: req.headers.authorization
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST freelancer/certProject": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { certificate, service, targetLang } = req.body;
    this.broker
      .call("trainingcert.createCertproject", {
        certificate,
        service,
        targetLang,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  "POST certification/qa/report": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { taskId, page, rowsPerPage, search, service, targetLanguage, segmentFilter } = req.body;
    this.broker
      .call("trainingcert.getCertificationCandidates", {
        taskId,
        page,
        rowsPerPage,
        search,
        service,
        targetLanguage,
        segmentFilter,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  "GET lsp/proclient/getProject/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filterSearch, filter, status } = req.$params;
    this.broker
      .call("proclient.getAcceptProjectRequest", {
        pageNumber,
        pageSize,
        distributionType: "marketplace",
        filterSearch,
        filter,
        user,
        status
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // delete to post
  // "DELETE lsp/delete/client/:id": "lsp.deleteLspClient",
  "POST lsp/delete/client": function (req, res) {
    const { id } = req.body;
    this.broker.call("lsp.deleteLspClient", { id }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  // delete to post
  // "DELETE lsp/delete/proclient/:id": "auth.deleteLspProClient",
  "POST lsp/delete/proclient": function (req, res) {
    const { id } = req.body;
    this.broker.call("auth.deleteLspProClient", { id }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST lsp/update/client": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("lsp.updateLspClient", {
          fields,
          files,
          user
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST lsp/update/proclient": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("auth.updateProClient", {
          fields,
          files,
          user
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },

  //* ********************************************* PROJECT ROUTER *********************************************** */

  "POST project": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("project.createProject", {
          fields,
          user
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
          this.broker.call("project.processProjectFiles", {
            files,
            project: data.data,
            user,
            authToken: req.headers.authorization
          });
        });
    });
  },
  "POST project/add/task": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      // createTaskForProject
      this.broker
        .call("project.validateAddTaskFiles", {
          fields,
          files,
          user,
          authToken: req.headers.authorization
        })
        .then(data => {
          res.setHeader("Content-Type", "Application/Json; charset=utf-8");
          res.writeHead(200);
          res.end(JSON.stringify(data));
          this.broker.call("project.createTaskForAnuvadak", {
            fields,
            files,
            user,
            authToken: req.headers.authorization
          });
        });
    });
  },
  "POST onboardProject": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("project.createOnboardProject", {
          fields,
          user
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
          this.broker.call("project.processOnboardProjectFiles", {
            files,
            project: data.data,
            user
          });
        });
    });
  },
  "POST anuvadak/add/task": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("project.createTaskForAnuvadak", {
          fields,
          files,
          user,
          authToken: req.headers.authorization
        })
        .then(data => {
          res.setHeader("Content-Type", "Application/Json; charset=utf-8");
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST anuvadak/getwordcount"(req, res) {
    let form = new multiparty.Form();
    const verificationData = this.authenticate(
      req.headers["authorization"]
    );
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("project.getWordCountForAnuvadak", { fields, files, user })
        .then((data) => {
          res.setHeader(
            "Content-Type",
            "Application/Json; charset=utf-8"
          );
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST upload/certification/files": function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("trainingcert.uploadTestFile", {
          files,
          fields
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST /admin/verify/bulk/user": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("admin.verifyUserExistFormTheFile", {
          files,
          user
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST /admin/bulk/register": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("admin.bulkRegister", body).then(data => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  // put to post
  "POST project/update": function (req, res) {
    // console.log('here')
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("project.updateProject", body).then(updatedProject => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(updatedProject));
    });
  },

  // put to post
  "POST project/tmEdit": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("project.projectTmEditToggle", body).then(updatedProject => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(updatedProject));
    });
  },
  "GET bulk/register/info/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter } = req.$params;
    this.broker
      .call("bulk_register.fetchBulkRegistrationInfo", {
        user,
        pageNumber,
        pageSize,
        filter
      })
      .then(info => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(info));
      });
  },

  "GET project/1/:projectId": "project.getProject",
  "GET project/tasks/:projectId/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, pageNumber, pageSize, search, distributionType } = req.$params;
    this.broker
      .call("project.getProjectTasks", {
        user,
        projectId,
        pageNumber,
        pageSize,
        search,
        distributionType
      })
      .then(tasks => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", tasks)));
      });
  },
  "GET project/tasks/proclient/:projectId/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, pageNumber, pageSize, search, distributionType } = req.$params;
    this.broker
      .call("project.fetchProclientTasksByRequestId", {
        user,
        projectId,
        pageNumber,
        pageSize,
        search,
        distributionType
      })
      .then(tasks => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(tasks));
      });
  },

  "GET project/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, filterSearch, distributionType, status, sortBy, action, flag } = req.$params;
    this.broker
      .call("project.getProjectsForUser", {
        user,
        pageNumber,
        pageSize,
        filter,
        filterSearch,
        distributionType,
        status,
        sortBy,
        action,
        flag
      })
      .then(projects => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", projects)));
      });
  },

  "GET certification/project/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, filterSearch, distributionType, status, sortBy, action, flag } = req.$params;
    this.broker
      .call("project.getCertificationProjects", {
        user,
        pageNumber,
        pageSize,
        filter,
        filterSearch,
        distributionType,
        status,
        sortBy,
        action,
        flag
      })
      .then(projects => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", projects)));
      });
  },
  "POST signoff/details": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId } = req.body;
    this.broker.call("candidates.getCandidatesCheckedInfo", { projectId }).then(projects => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(this.success("", projects)));
    });
  },

  "GET certification/project/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, filterSearch, distributionType, status, sortBy, action } = req.$params;
    this.broker
      .call("tasks.getCertificationTasks", {
        user,
        pageNumber,
        pageSize,
        filter,
        filterSearch,
        distributionType,
        status,
        sortBy,
        action
      })
      .then(projects => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", projects)));
      });
  },

  "GET project/onBoardProject": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("project.onBoardProject", { user }).then(data => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  "GET project/overall/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, filterSearch, distributionType, status, sortBy, action } = req.$params;
    this.broker
      .call("project.fetchOverAllProject", {
        user,
        pageNumber,
        pageSize,
        filter,
        filterSearch,
        distributionType,
        status,
        sortBy,
        action
      })
      .then(projects => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", projects)));
      });
  },
  "POST project/progress": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projects, invIds } = req.body;
    this.broker
      .call("project.getProjectProgress", {
        projects,
        invIds,
        user
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
        // res.end(JSON.stringify(this.success("", projects)));
      });
  },
  // Get Assigned marketplace project
  "GET project/invited/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, filterSearch, status, sortBy } = req.$params;
    this.broker
      .call("project.getAssignedMarketplaceProjects", {
        user,
        pageNumber,
        pageSize,
        filter,
        filterSearch,
        status,
        sortBy
      })
      .then(projects => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", projects)));
      });
  },
  "GET project/admin/client/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, filter, filterSearch, distributionType, projectStatus, sortBy } = req.$params;
    this.broker
      .call("project.getAdminClientsProjects", {
        user,
        pageNumber,
        pageSize,
        filter,
        filterSearch,
        distributionType,
        projectStatus,
        sortBy
      })
      .then(projects => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", projects)));
      });
  },

  "GET project/invitations": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId } = req.$params;
    this.broker
      .call("invitation.getProjectInvitations", {
        projectId,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET invitation/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, langFilter, serviceFilter, status, search, inviteId } = req.$params;
    this.broker
      .call("invitation.fetchProjectInvitationByInviteId", {
        pageNumber,
        pageSize,
        langFilter,
        serviceFilter,
        status,
        search,
        user,
        inviteId
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET invitation/single/:inviteId": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { inviteId } = req.$params;
    this.broker
      .call("invitation.fetchSingleInvitation", {
        user,
        inviteId
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET invitation/lsp/sent/:inviteId/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { inviteId, pageNumber, pageSize } = req.$params;
    this.broker
      .call("invitation.fetchLspSentInvitation", {
        user,
        inviteId,
        pageNumber,
        pageSize
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  // Get preprocessed Word Count from files
  "POST project/preprocessedWordCount": function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("project.processFilesAndGetPreprocessedWordCount", {
          fields,
          files
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST invitation/accept": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { invitationDetails } = req.body;
    this.broker
      .call("invitation.acceptInvitationForSecondLSP", {
        invitationDetails,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },


  // Get Assigned marketplace project
  "GET project/marketplace/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search, distributionType } = req.$params;
    this.broker
      .call("project.getMarketplaceProjects", {
        user,
        pageNumber,
        pageSize,
        search,
        distributionType
      })
      .then(projects => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(projects));
      });
  },
  "GET application/unallocatedwordcount": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, targetLanguage, service } = req.$params;
    this.broker
      .call("project.fetchUnallocatedWordCount", {
        projectId,
        targetLanguage,
        service
      })
      .then(unallocatedWordCount => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(unallocatedWordCount));
      });
  },
  "GET project/metrics/:projectId": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId } = req.$params;
    this.broker
      .call("metrics.getProjectMetrics", {
        projectId,
        user
      })
      .then(projectMetrics => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(projectMetrics));
      });
  },
  "POST metrics/unit": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unitId, unit, targetLanguage, service, status, pageNumber, pageSize, userFlag, projectId, username } = req.body;
    this.broker
      .call("metrics.getUnitMetrics", {
        unitId,
        unit,
        user,
        targetLanguage,
        service,
        status,
        pageNumber,
        pageSize,
        userFlag,
        projectId,
        username
      })
      .then(projectMetrics => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(projectMetrics));
      });
  },
  "GET metrics/level/based": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unitId, unit } = req.$params;
    this.broker
      .call("metrics.getUserMetricsDataInTask", {
        unitId,
        unit,
        user
      })
      .then(projectMetrics => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(projectMetrics));
      });
  },
  "GET metrics/effective/wordcount/:unit/:unitId": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unitId, unit } = req.$params;
    this.broker
      .call("metrics.fetchEffectiveWordCount", {
        unitId,
        unit,
        user
      })
      .then(effectiveWordcount => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(effectiveWordcount));
      });
  },
  // delete to post testum
  // "DELETE project/1/:projectId": "project.deleteProject",
  "POST project/1": function (req, res) {
    const { projectId } = req.body;
    this.broker.call("project.deleteProject", { projectId }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST project/glossary": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      console.log("files", files);
      this.broker
        .call("project.createGlossaryProject", {
          fields,
          userDetails: user
        })
        .then(project => {
          res.setHeader("Content-Type", "Application/Json; charset=utd-8");
          res.writeHead(200);
          res.end(JSON.stringify(project));
          this.broker.call("project.processGlossaryProjectTerms", {
            files,
            project: project.data
          });
        });
    });
  },
  "POST project/tm/:projectId": "project.convertToTmProject",
  "POST project/comment/add": "project_comments.projectComments",
  "POST project/comment/delete": "project_comments.deletProjectComment",
  "POST project/getTaskFile": function (req, res) {
    const { apikey, projectId, taskId, targetLanguage, projectName, sourceLanguage, fileName, sourceFileUrl, userEmail, type } = req.body;

    this.broker.call("project.getPreviewFile", req.body).then(response => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(response));
    });
  },

  // tajammul
  "POST project/get/video/url": function (req, res) {
    const { projectId } = req.body;
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    // let apiKey = user.apiKey
    this.broker
      .call("project.getProjectVideoUrl", {
        user,
        projectId
      })
      .then(data => {
        res.setHeader("Content-Type", "Application/Json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify({ data }));
        // console.log('all data------------- ' + JSON.stringify({data}))
        res.end();
      });
  },

  // api route for uploading video in task
  "POST project/upload/video": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    // let apiKey = user.apiKey
    form.parse(req, (err, fields, files) => {
      if (err) console.log(err.message);
      this.broker
        .call("project.getVideoFromClient", {
          user,
          files,
          fields
        })
        .then(data => {
          res.setHeader("Content-Type", "Application/Json; charset=utf-8");
          res.writeHead(200);
          res.end(JSON.stringify({ data }));
          console.log(`sending response ${data}`);
          res.end();
        });
    });
  },

  // upload in project
  "POST project/upload/video/all": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    // let apiKey = user.apiKey
    form.parse(req, (err, fields, files) => {
      if (err) console.log(err.message);
      this.broker
        .call("project.getVideoForProject", {
          user,
          files,
          fields
        })
        .then(async data => {
          res.setHeader("Content-Type", "Application/Json; charset=utf-8");
          res.writeHead(200);
          res.end(JSON.stringify({ data }));
          res.end();
        });
    });
  },

  // upload in subproject
  "POST project/upload/video/subproject": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    // let apiKey = user.apiKey
    form.parse(req, (err, fields, files) => {
      if (err) console.log(err.message);
      this.broker
        .call("project.getVideoForSubroject", {
          user,
          files,
          fields
        })
        .then(async data => {
          res.setHeader("Content-Type", "Application/Json; charset=utf-8");
          res.writeHead(200);
          res.end(JSON.stringify({ data }));
          res.end();
        });
    });
  },

  "POST project/get/video": function (req, res) {
    const { taskId } = req.body;
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    // let apiKey = user.apiKey
    this.broker
      .call("tasks.getVideoURL", {
        user,
        taskId
      })
      .then(data => {
        res.setHeader("Content-Type", "Application/Json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify({ data }));
        // console.log('video url ' + JSON.stringify({data}))
        res.end();
      });
  },

  // delete in project
  "POST project/delete/video/all": function (req, res) {
    const { projectId } = req.body;
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    // let apiKey = user.apiKey
    this.broker
      .call("project.deleteProjectVideo", {
        user,
        projectId
      })
      .then(data => {
        res.setHeader("Content-Type", "Application/Json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify({ data }));
        res.end();
      });
  },

  // delete in subproject
  "POST project/delete/video/subproject": function (req, res) {
    const { subprojectId } = req.body;
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    // let apiKey = user.apiKey
    this.broker
      .call("subprojects.deleteSubprojectVideo", {
        user,
        subprojectId
      })
      .then(data => {
        res.setHeader("Content-Type", "Application/Json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify({ data }));
        res.end();
      });
  },

  // delete in task
  "POST project/delete/video": function (req, res) {
    const { taskId } = req.body;
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    // let apiKey = user.apiKey
    this.broker
      .call("tasks.deleteVideo", {
        user,
        taskId
      })
      .then(data => {
        res.setHeader("Content-Type", "Application/Json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify({ data }));
        res.end();
      });
  },
  // get all tasks in project without subproject
  "POST project/tasks": function (req, res) {
    this.broker.call("project.getAllTasksByProjectId", req.body.data).then(data => {
      res.setHeader("Content-Type", "Application/Json; charset=utf-8");
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  // check for srt file in project
  "POST project/check": function (req, res) {
    this.broker.call("project.checkSrtFiles", { projectId: req.body.projectId }).then(data => {
      res.setHeader("Content-Type", "Application/Json; charset=utf-8");
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  //* ********************************************* SUB-PROJECT ROUTER *********************************************** */
  // check for srt file in project
  "POST subproject/check": function (req, res) {
    this.broker.call("subprojects.checkSrtFilesSubproject", { subprojectId: req.body.subprojectId }).then(data => {
      res.setHeader("Content-Type", "Application/Json; charset=utf-8");
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  "POST subproject": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("subprojects.createSubproject", {
        data: req.body,
        user
      })
      .then(subproject => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("Sub Project Created Successfully", { subproject })));
      });
  },

  "POST subproject/tasks/add": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("subprojects.addTaskToSubproject", body).then(addedTasks => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(addedTasks));
    });
  },
  // get all tasks from subprojects in project overview
  "POST subproject/tasks/all": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);

    const { subprojectIds } = req.body;
    const user = verificationData.data;
    this.broker.call("tasks.getTaskFromSubproject", subprojectIds).then(tasks => {
      res.setHeader("Content-Type", "Application/Json; charset=utf-8");
      res.writeHead(200);
      res.end(JSON.stringify(tasks));
    });
  },

  "POST subproject/tasks": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);

    const user = verificationData.data;
    this.broker.call("subprojects.getTasksBySubproject", req.body.data).then(data => {
      res.setHeader("Content-Type", "Application/Json; charset=utf-8");
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  "GET project/subprojects/:projectId/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, pageNumber, pageSize, search, distributionType } = req.$params;
    this.broker
      .call("project.getProjectSubProjects", {
        user,
        projectId,
        pageNumber,
        pageSize,
        search,
        distributionType
      })
      .then(subprojects => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", subprojects)));
      });
  },

  "GET subproject/1/:subprojectId": "subprojects.getSubProject",

  "GET subproject/tasks/:subprojectId/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { subprojectId, pageNumber, pageSize, search, distributionType } = req.$params;
    this.broker
      .call("subprojects.getSubProjectTasks", {
        user,
        subprojectId,
        pageNumber,
        pageSize,
        search,
        distributionType
      })
      .then(tasks => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", tasks)));
      });
  },
  // delete to post
  // "DELETE subproject/1/:subprojectId"(req, res) {
  "POST subproject/1": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { subprojectId } = req.body;
    this.broker
      .call("subprojects.deleteSubProject", {
        subprojectId,
        user
      })
      .then(deletedSubproject => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(deletedSubproject));
      });
  },

  // put to post
  "POST subproject/update": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("subprojects.updateSubProject", body).then(subproject => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(subproject));
    });
  },
  // put to post
  "POST subproject/task": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("subprojects.updateSubProjectTask", body).then(tasks => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(tasks));
    });
  },

  // get subprojects in task overview page
  "POST project/subprojects/overview/:projectId": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId } = req.$params;
    this.broker.call("subprojects.getSubProjectsOverview", { projectId }).then(subprojects => {
      res.setHeader("Content-Type", "Application/Json; charset=utf-8");
      res.writeHead(200);
      res.end(JSON.stringify(subprojects));
    });
  },

  //* ********************************************* TASK ROUTER *********************************************** */

  "GET tasks/1/:taskId": "tasks.getTask",
  "GET task/onBoardTask": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("tasks.getOnBoardTask", { user }).then(data => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  // delete to post
  // "DELETE tasks/1/:taskId"(req, res) {
  "POST tasks/1": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { taskId } = req.body;
    this.broker
      .call("tasks.deleteTask", {
        taskId,
        user
      })
      .then(tasks => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(tasks));
      });
  },
  "POST task/sign-acknowledgement": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("tasks.updateSignedParticipant", body).then(tasks => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(tasks));
    });
  },
  "POST task/sign-acknowledgement": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("tasks.updateSignedParticipant", body).then(tasks => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(tasks));
    });
  },
  // put to post
  "POST tasks": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("tasks.updateTask", body).then(tasks => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(tasks));
    });
  },
  "POST tasks/tm/:taskId": "tasks.convertToTm",
  "GET lang/wise/metrics/:unit/:unitId": "metrics.fetchLangWiseMetrics",
  "POST tasks/progress/language": "metrics.getTaskProgress",
  "POST project/sync" : function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("tasks.syncParticipants", body).then(success => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(success));
    });
  },

  //* ********************************************* ASSIGNMENT ROUTER *********************************************** */

  "POST assignments": "assignments.assignSegments",

  //* ********************************************* INVITATION ROUTER *********************************************** */
  "POST invitation": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("invitation.inviteUsers", body).then(success => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(success));
    });
  },
  "GET invitation/project/:unitId/:assignmentUnit": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unitId, assignmentUnit } = req.$params;
    this.broker
      .call("invitation.getInvitationProject", {
        user,
        unitId,
        assignmentUnit
      })
      .then(success => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(success));
      });
  },
  "GET invitation/achieved/target/:unit/:unitId": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unitId, unit } = req.$params;
    this.broker
      .call("metrics.getProjectInvitedMetrics", {
        user,
        unitId,
        unit
      })
      .then(success => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(success));
      });
  },
  "GET invitation/tasks/:projectId/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search, projectId } = req.$params;
    this.broker
      .call("invitation.getInvitationTask", {
        pageNumber,
        pageSize,
        projectId,
        user,
        search
      })
      .then(success => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(success));
      });
  },
  "POST invitation/remove": "invitation.removeUsers",
  "GET invitation/list/:username/:pageNumber/:pageSize": "invitation.getInvitesForUser",
  "POST invitation/marketplace/send": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("invitation.inviteMarketplace", {
        user,
        body: req.body
      })
      .then(success => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(success));
      });
  },
  "POST invitation/marketplaceApplication/send": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("applications.inviteMkpAppliedUser", {
        user,
        body: req.body
      })
      .then(success => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(success));
      });
  },
  "POST invitation/marketplace/whole/project": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("invitation.inviteFullProject", {
        user,
        body: req.body
      })
      .then(success => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(success));
      });
  },
  "GET invitation/marketplace/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search, filter, status } = req.$params;
    this.broker
      .call("invitation.getInvitations", {
        user,
        pageNumber,
        pageSize,
        search,
        filter,
        status
      })
      .then(invitations => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(invitations));
      });
  },

  "POST invitation/marketplace/status": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("invitation.inviteStatusChange", {
        user,
        body: req.body
      })
      .then(success => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(success));
      });
  },
  "POST invitation/marketplace/delete": function (req, res) {
    this.broker.call("invitation.deleteMarketplaceInvitations", { body: req.body }).then(invitations => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(invitations));
    });
  },
  "POST invitation/team/status": function (req, res) {
    this.broker.call("invitation.EnableOrDisableMarketplaceInvitations", { body: req.body }).then(invitations => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(invitations));
    });
  },
  "GET invitation/invited/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, distributionType, inviteIds } = req.$params;
    this.broker
      .call("invitation.getLspInvitedList", {
        pageNumber,
        pageSize,
        distributionType,
        inviteIds,
        user
      })
      .then(invitations => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(invitations));
      });
  },
  "GET invitation/post/:unitId/:assignmentUnit": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unitId, assignmentUnit } = req.$params;
    this.broker
      .call("invitation.getInvitedUserForProject", {
        user,
        unitId,
        assignmentUnit
      })
      .then(invitations => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(invitations));
      });
  },
  "GET invitation/all/:unitId/:assignmentUnit/:oldProject": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unitId, assignmentUnit, oldProject } = req.$params;
    this.broker
      .call("invitation.getAllInvitation", {
        user,
        unitId,
        assignmentUnit,
        oldProject
      })
      .then(invitations => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(invitations));
      });
  },
  // delete to post
  // "DELETE invitation/delete/:inviteId"(req, res) {
  "POST invitation/delete": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { inviteId } = req.body;
    this.broker
      .call("invitation.deleteSentInvitation", {
        user,
        inviteId
      })
      .then(invitations => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(invitations));
      });
  },
  // delete to post
  // "DELETE invitation/deactivate/:inviteId"(req, res) {
  "POST invitation/deactivate": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { inviteId } = req.body;
    this.broker
      .call("invitation.deactivateAllUserByInviteId", {
        user,
        inviteId
      })
      .then(invitations => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(invitations));
      });
  },
  // put to post
  "POST invitation/allocateto": "invitation.allocateTo",
  // put to post
  "POST invitation/remove/invitation": "invitation.deleteInvitation",
  "POST invitation/active": "invitation.activeUserFormTeamBoard",
  "POST invitation/disable": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("invitation.disabledUserFormTeamBoard", body).then(invitations => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(invitations));
    });
  },
  "POST invitation/nmt/action": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const body = {
      ...req.body,
      user
    };
    this.broker.call("invitation.updateNmtAction", body).then(invitations => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(invitations));
    });
  },

  // ++++++++++++++++++++++++++++++++++++++++++++++ACTIVITY ROUTER ********************************************//
  "GET activity/get": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unit, unitId, search, pageNumber, pageSize, filter } = req.$params;
    this.broker
      .call("activity_log.getLogs", {
        unit,
        unitId,
        search,
        pageNumber,
        pageSize,
        user,
        filter
      })
      .then(activites => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(activites));
      });
  },
  // ++++++++++++++++++++++++++++++++++++++++++++++APLICATIONS ROUTER ********************************************//

  "POST application": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("applications.applyApplication", {
        data: req.body,
        user
      })
      .then(status => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(status));
      });
  },

  "GET application/marketplace/list/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search } = req.$params;
    this.broker
      .call("applications.getApplication", {
        user,
        pageNumber,
        pageSize,
        search
      })
      .then(applications => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(applications));
      });
  },
  "GET application/marketplace/applied/:username": "applications.appliedApplication",

  //* ********************************************* SEGMENT ROUTER *********************************************** */
  "POST apply/nmt/project": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("segments.applyNmtonCompleteProject", {
        ...req.body,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST apply/nmt/task": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("segments.applyNmtOnTask", {
        ...req.body,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST remove/nmt/task": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("tasks.removeNmtOnTask", {
        ...req.body,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST apply/nmt/invitation": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("segments.applyNmtonInvitation", {
        ...req.body,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST loksabha/nmt/export": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker
        .call("loksabha.createProjectAndApplyNMT", {
          fields,
          user,
          files,
          authToken: req.headers.authorization
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST loksabha/fetch/taskId": function(req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { taskId, fileName } = req.body;
    this.broker.call("loksabha.fetchTaskId", {taskId, fileName})
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST loksabha/add/task": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    form.parse(req, (err, fields, files) => {
      this.broker.call("loksabha.addTaskInLoksabhaProject", {
        fields,
        files,
        user,
        authToken: req.headers.authorization
      })
        .then(data => {
          res.setHeader("Content-Type", "Application/Json; charset=utf-8");
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST loksabha/fetch/files": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unit, unitId, targetLanguages, filter } = req.body;
    this.broker
      .call("loksabha.fetchLoksabhaFilesFromS3", {
        user,
        unit,
        unitId,
        targetLanguages,
        filter
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST loksabha/export/files": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unit, unitId, targetLanguages, headerText, footerText, exportPDFAsDoc } = req.body;
    this.broker
      .call("loksabha.exportLoksabhaFiles", {
        user,
        unit,
        unitId,
        targetLanguages,
        headerText,
        footerText, 
        exportPDFAsDoc
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST loksabha/files/status": function (req, res) {
    const form = new multiparty.Form();
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unit, unitId } = req.body;
    this.broker
      .call("loksabha.anuvadakProjectStatus", {
        user,
        unit,
        unitId,
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST segment/list": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("segments.getSegmentList", {
        data: req.body,
        user
      })
      .then(segmentList => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", { segmentList })));
      });
  },
  "POST tm/correction/report": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    let {projectId, taskId, term, targetLanguage, pageNumber, pageSize}  = req.body;
    this.broker
      .call("candidates.tmCorrectionCandidates", {
        projectId, taskId, targetLanguage, pageNumber, pageSize, term
      })
      .then(count => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(count));
      });
  },
  "POST tm/correction/upload": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    let form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      // let {projectId, taskId, term, targetLanguage, pageNumber, pageSize}  = req.body;
      this.broker
        .call("candidates.updateTmFromCorrectionFile", {
         user,
         files,
         fields
        })
        .then(count => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(count));
        });
    })
  },
  "POST tm/correction/download": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const form = new multiparty.Form();
    let {projectId, taskId, term, targetLanguage, pageNumber, pageSize}  = req.body;
    this.broker
      .call("candidates.downloadTmCorrectionReport", {
        projectId, taskId, targetLanguage, pageNumber, pageSize, term
      })
      .then(count => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(count));
      });
  },
  "POST cattool/resumework": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    let {taskId, targetLanguage, service, pageNumber, pageSize, inviteId}  = req.body;
    this.broker
      .call("segments.resumeWork", {
        taskId, targetLanguage, service, pageNumber, pageSize, inviteId, user
      })
      .then(count => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(count));
      });
  },
  "POST segment/list/report": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("segments.getSegmentListReport", {
        data: req.body,
        user
      })
      .then(segmentList => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", { segmentList })));
      });
  },
  "POST segment/total/list/report": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("segments.getTotalSegmentListReport", {
        data: req.body,
        user
      })
      .then(segmentList => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", { segmentList })));
      });
  },
  "GET segment/list/view/:taskId/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search, taskId } = req.$params;
    this.broker
      .call("segments.viewSegmentList", {
        user,
        pageNumber,
        pageSize,
        search,
        taskId
      })
      .then(segments => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(segments));
      });
  },
  "GET segment/find/:taskId/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search, taskId, targetLanguage, service, sourceLanguage, flag } = req.$params;
    this.broker
      .call("segments.findSegmentsList", {
        user,
        pageNumber,
        pageSize,
        search,
        taskId,
        targetLanguage,
        sourceLanguage,
        service,
        flag
      })
      .then(segments => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(segments));
      });
  },
  "GET segment/list/view/export/:taskId": function (req, res) {
    const { search, taskId } = req.$params;
    this.broker
      .call("segments.exportStringsForTask", {
        search,
        taskId
      })
      .then(segments => {
        res.writeHead(200, {
          "Content-Type": "application/force-download",
          "Content-disposition": "attachment; filename=segments.txt"
        });
        res.end(segments);
      });
  },
  "POST auto/export": function(req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const {targetLanguage, service, taskId} = req.body;
    this.broker
      .call("export.autoExportUnit", {
        user,
        targetLanguage,
        service,
        taskId
      })
      .then(segments => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(segments));
      });
  },
  "POST project/segment/glossary/operation": function (req, res) {
    this.broker.call("segments.operationOnGlossaryTermToSegments", { data: req.body })
      .then(glossaryTermList => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(
          JSON.stringify(
            glossaryTermList.success
              ? req.body.operation === "ADD"
                ? this.success("Glossary added successfully.", { glossaryTermList })
                : this.success("Glossary removed successfully.", { glossaryTermList })
              : this.error(glossaryTermList.message)
          )
        );
      });
  },
  "POST project/invitation/glossary/operation": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("segments.operationOnInvitationGlossaryTermsToSegments", {
        data: req.body.data,
        user
      })
      .then(glossaryTermList => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(
          JSON.stringify(
            glossaryTermList.success
              ? req.body.data.operation === "ADD"
                ? this.success("Glossary added successfully.", { glossaryTermList })
                : this.success("Glossary removed successfully.", { glossaryTermList })
              : this.error(glossaryTermList.message)
          )
        );
      });
  },
  "POST segment/unconfirmed": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { email } = user;
    const { targetLanguage, service, taskId, inviteId } = req.body;
    this.broker
      .call("segments.checkUnconfirmedCount", {
        email,
        targetLanguage,
        service,
        taskId,
        inviteId
      })
      .then(unconfirmed => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(unconfirmed));
      });
  },
  "POST efficiency": "efficiency.efficiency",
  //* ********************************************* CANDIDATE ROUTER *********************************************** */
  "POST candidate": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const candidateData = req.body;
    this.broker
      .call("candidates.addCandidate", {
        user,
        candidateData
      })
      .then(candidateData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(candidateData));
      });
  },
  "POST nmtResult": function (req, res) {
    const form = new multiparty.Form();
    let { id_, status, tgt_blob_name, tgt_blob_url, created_time } = req.body;
    const ref = this;
    this.broker.call("segments.nmtResponseHandler", {id_, status, tgt_blob_name, tgt_blob_url, created_time })
      .then(candidateData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(candidateData));
      });
  },
  "POST nmtResult/2": function (req, res) {
    const form = new multiparty.Form();
    const ref = this;
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
      }
      ref.broker
        .call("segments.nmtResponseHandler2", {
          fields,
          files
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    });
  },
  "POST nmt/suggestion": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { data, src, tgt, domain } = req.body;
    this.broker
      .call("candidates.getNmtSuggestions", {
        user,
        data,
        src,
        tgt,
        domain
      })
      .then(candidateData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(candidateData));
      });
  },
  "POST transliteration": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { data, src, tgt, domain } = req.body;
    this.broker
      .call("candidates.getTransliteration", {
        user,
        data,
        src,
        tgt,
        domain
      })
      .then(candidateData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(candidateData));
      });
  },
  "POST apply/nmt": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const {candidateArr, domain} = req.body;
    this.broker
      .call("candidates.applyNmtOnSegments", {
        user,
        candidates: candidateArr,
        domain
      })
      .then(candidateData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(candidateData));
      });
  },
  "POST confirm/all": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const candidates = req.body;
    this.broker
      .call("candidates.confirmAllSegments", {
        user,
        candidates
      })
      .then(candidateData => {
        res.setHeader("Content-Type", "Application/Json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify(candidateData));
      });
  },
  "POST rapidNmtSuggestion": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { data, tgt, src } = req.body;
    this.broker
      .call("candidates.getRapidNmtSuggestion", {
        data,
        src,
        tgt,
        user
      })
      .then(translatedSegment => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(translatedSegment));
      });
  },
  "POST candidate/reject": "candidates.rejectCandidate",
  "POST candidate/referencesegment": "candidates.fetchReferenceSegment",
  // "POST candidate/comment": "candidates.addComment",
  "POST candidate/comment": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { candidate, comment, taskName } = req.body;
    this.broker
      .call("candidates.addComment", {
        user,
        comment,
        candidate,
        taskName
      })
      .then(commentData => {
        res.setHeader("Content-Type", "Application/Json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify(commentData));
      });
  },
  "POST candidate/replace": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { taskId, targetLanguage, service, replaceString, findString } = req.body;
    this.broker
      .call("candidates.addReplacedCandidate", {
        taskId,
        targetLanguage,
        service,
        user,
        replaceString,
        findString
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST candidate/replace/undo": "candidates.replaceUndoCandidate",
  "POST candidate/replace/one": "candidates.addReplaceOneCandidate",
  "GET metrics/:unit/:unitId": "metrics.aggregate",
  "POST confirmTranslation": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unit, unitId, language, service, totalwc, tmEdit } = req.body;
    this.broker
      .call("candidates.confirmNMTtoTranslation", {
        unit,
        unitId,
        language,
        service,
        user,
        totalwc,
        tmEdit
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  //* ********************************************* COMMENTS ROUTER *********************************************** */
  "POST candidate/segment/checked": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { candidate, checkedFlag } = req.body;
    this.broker
      .call("candidates.updateCandidate", {
        user,
        candidate,
        segmentChecked: checkedFlag
      })
      .then(commentData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(commentData));
      });
  },
  "POST candidate/comment/candidate": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { latestCandidate, comment } = req.body;
    this.broker
      .call("candidates.updateCommentOnCandidate", {
        user,
        latestCandidate,
        comment
      })
      .then(commentData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(commentData));
      });
  },
  "POST candidate/confirm/all/candidates": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { segments, segmentCheckedAll } = req.body;
    this.broker
      .call("candidates.updateAllCandidate", {
        user,
        segments,
        segmentCheckedAll
      })
      .then(commentData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(commentData));
      });
  },
  "GET tasks/comments/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize } = req.$params;
    this.broker
      .call("comments.getComments", {
        user,
        pageNumber,
        pageSize
      })
      .then(commentData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(commentData));
      });
  },
  // delete to post
  // "DELETE candidate/comment/delete/:commentId/:candidateId": "candidates.deleteComment",
  "POST candidate/comment/delete": function (req, res) {
    const { commentId, candidateId } = req.body;
    this.broker
      .call("candidates.deleteComment", {
        commentId,
        candidateId
      })
      .then(commentData => {
        res.writeHead(200);
        res.end(JSON.stringify(commentData));
      });
  },

  // put to post
  // "PUT candidate/comment/edit/:commentId/:candidateId/:status": "candidates.editComment",
  "POST candidate/comment/edit": function (req, res) {
    const { commentId, candidateId, status } = req.body;
    this.broker
      .call("candidates.editComment", {
        commentId,
        candidateId,
        status
      })
      .then(commentData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(commentData));
      });
  },

  //* ********************************************* TM ROUTER *********************************************** */
  "POST tm": "tm.getSingleTmMatches",
  // delete to post
  "POST tm/delete": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { tmId } = req.body;
    this.broker
      .call("tm.deleteTmById", {
        user,
        tmId
      })
      .then(commentData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(commentData));
      });
  },
  "POST client/localization": "localization.getMultiTmMatches",
  "GET tm/admin": "tm.getTMWordcountforAdmin",
  //* ********************************************* NOTIFICATION ROUTER *********************************************** */
  "POST notify": "notifications.emitThat",
  //* ********************************************* EXPORT ROUTER *********************************************** */
  "POST export": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unit, unitId, nlpyTags, nlpyTagsRtl, regExes, targetLanguages, exportDirectoryName, exportPDFAsDoc, headerText, footerText } = req.body;
    console.log(req.body);
    this.broker
      .call("export.exportUnitFiles", {
        unit,
        unitId,
        nlpyTags,
        nlpyTagsRtl,
        regExes,
        targetLanguages,
        exportDirectoryName,
        exportPDFAsDoc,
        headerText,
        footerText,
        user
      })
      .then(response => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(response));
      });
  },
  "POST export/srt": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { unit, unitId, targetLanguages, exportDirectoryName } = req.body;
    this.broker
      .call("export.exportSrtFile", {
        unit,
        unitId,
        targetLanguages,
        exportDirectoryName,
        user
      })
      .then(response => {
        res.setHeader("Content-Type", "Application/Json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify(response));
      });
  },
  "GET export/glossary/:glossaryId": function (req, res) {
    const { glossaryId } = req.$params;
    this.broker.call("export.exportGlossaryTerms", { glossaryId }).then(terms => {
      const { fileContent, glossaryName } = terms;
      const fileBuffer = new Buffer(fileContent, "binary");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileBuffer);
      res.writeHead(200, {
        "Content-Type": "application/force-download",
        "Content-disposition": `attachment; filename=${glossaryName}`
      });
      bufferStream.pipe(res);
    });
  },
  "POST export/report/download": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("export.downloadReport", {
        data: req.body,
        user
      })
      .then(report => {
        if (report) {
          const { fileContent, reportName, reportData } = report;
          // let fileBuffer = new Buffer(fileContent, "binary");
          // const buffer = await workbook.xlsx.writeBuffer();
          const bufferStream = new stream.PassThrough();
          bufferStream.end(fileContent);
          res.writeHead(200, {
            "Content-Type": "application/force-download",
            "Content-disposition": `attachment; filename=${reportName}`
          });
          bufferStream.pipe(res);
        }
      });
  },
  "GET export/report/:taskId/:targetLanguage/:segmentFilter/:service": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { taskId, targetLanguage, segmentFilter, service } = req.$params;
    this.broker
      .call("export.exportReports", {
        taskId,
        targetLanguage,
        segmentFilter,
        service,
        user
      })
      .then(terms => {
        const { fileContent, reportName } = terms;
        const fileBuffer = new Buffer(fileContent, "binary");
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);
        res.writeHead(200, {
          "Content-Type": "application/force-download",
          "Content-disposition": `attachment; filename=${reportName}`
        });
        bufferStream.pipe(res);
      });
  },
  "GET export/users/:role": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { role } = req.$params;
    this.broker
      .call("admin.exportUsers", {
        user,
        role
      })
      .then(response => {
        const { fileContent, fileName } = response;
        const fileBuffer = new Buffer(fileContent, "binary");
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);
        res.writeHead(200, {
          "Content-Type": "application/force-download",
          "Content-disposition": `attachment; filename=${fileName}`
        });
        bufferStream.pipe(res);
      });
  },
  "GET export/admin/users/feedback": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("feedback.exportUserFeedback", { user }).then(response => {
      const { fileContent, fileName } = response;
      const fileBuffer = new Buffer(fileContent, "binary");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileBuffer);
      res.writeHead(200, {
        "Content-Type": "application/force-download",
        "Content-disposition": `attachment; filename=${fileName}`
      });
      bufferStream.pipe(res);
    });
  },
  "GET bulk/register/users/by/:bulkRegistrationId": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { bulkRegistrationId } = req.$params;
    this.broker
      .call("bulk_register.exportBulkRegistrationInfo", {
        user,
        bulkRegistrationId
      })
      .then(response => {
        const { fileContent, fileName } = response;
        const fileBuffer = new Buffer(fileContent, "binary");
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);
        res.writeHead(200, {
          "Content-Type": "application/force-download",
          "Content-disposition": `attachment; filename=${fileName}`
        });
        bufferStream.pipe(res);
      });
  },
  "GET bulk/register/download/sample/file": function (req, res) {
    this.broker.call("bulk_register.downloadSampleFile").then(response => {
      const { fileContent, fileName } = response;
      const fileBuffer = new Buffer(fileContent, "binary");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileBuffer);
      res.writeHead(200, {
        "Content-Type": "application/force-download",
        "Content-disposition": `attachment; filename=${fileName}`
      });
      bufferStream.pipe(res);
    });
  },
  // delete to post
  // "DELETE bulk/register/by/:bulkRegistrationId": "bulk_register.deleteBulkRegistrationInfo",
  "POST bulk/register/by": function (req, res) {
    const { bulkRegistrationId } = req.body;
    this.broker.call("bulk_register.deleteBulkRegistrationInfo", { bulkRegistrationId });
  },

  "GET export/proclient/files/:directory*": function (req, res) {
    const { directory } = req.$params;
    const directoryString = directory.join("/");
    this.broker.call("blob.getZippedFolder", {
      directoryString,
      response: res
    });
  },
  "GET exports3/proclient/files/:directory*": function (req, res) {
    const { directory } = req.$params;
    const directoryString = directory.join("/");
    this.broker.call("s3.getZippedFolder", {
      directoryString,
      response: res
    });
  },
  // "GET export/proclient/files/:directory*": function (req, res) {
  //   const { directory } = req.$params;
  //   const directoryString = directory.join("/");
  //   this.broker.call("s3.getZippedFolder", {
  //     directoryString,
  //     response: res
  //   });
  // },
  "POST export/getTaskFile": function (req, res) {
    // update task files with candidates and return url
    const { apikey, projectId, taskId, targetLanguage, projectName, sourceLanguage, fileName, sourceFileUrl } = req.body;
    this.broker
      .call("export.updateTaskFileUrl", {
        apikey,
        projectId,
        taskId,
        projectName,
        sourceLanguage,
        targetLanguage,
        fileName,
        sourceFileUrl
      })
      .then(response => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(response));

        // res.setHeader("Content-Type", "text/html; charset=utf-8");
        // res.setHeader("type", response.type)
        // res.setHeader("fileExt", response.fileExt)
        // res.write(response.htmlDoc)
        // res.end();
      });
  },
  // "GET export/:directory*": function (req, res) {
  //   const { directory } = req.$params;
  //   const directoryString = directory.join("/");
  //   utils.storage === "s3_bucket" ? this.broker.call("s3.getZippedFolder", {
  //     directoryString,
  //     response: res
  //   }) : this.broker.call("blob.getZippedFolder", {
  //     directoryString,
  //     response: res
  //   })
  //     .then(data => {
  //       configureHeaders(res);
  //       res.writeHead(200);
  //       res.end(JSON.stringify(this.success("", data)));
  //     });
  // },
  "GET export/:directory*": function (req, res) {
    const { directory } = req.$params;
    const directoryString = directory.join("/");
    this.broker.call("blob.getZippedFolder", {
      directoryString,
      response: res
    });
  },
  "GET exports3/:directory*": function (req, res) {
    const { directory } = req.$params;
    const directoryString = directory.join("/");
    this.broker.call("s3.getZippedFolder", {
      directoryString,
      response: res
    });
  },
  "POST client/export": [
    (req, res) => {
      req.$ctx.broker.call("export.getClientData", { ...req.body }).then(data => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
    }
  ],
  // ********************************************** REVIEW ROUTER *********************************************** */
  "GET reviews/pending/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize } = req.$params;
    this.broker
      .call("reviews.fetchPendingReviews", {
        user,
        pageNumber,
        pageSize
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", data)));
      });
  },

  "POST reviews/:reviewId": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { reviewId, questionaire } = req.$params;
    this.broker
      .call("reviews.addReview", {
        user,
        reviewId,
        questionaire
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", data)));
      });
  },

  "GET reviews/completed/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize } = req.$params;
    this.broker
      .call("reviews.fetchCompletedReviews", {
        user,
        pageNumber,
        pageSize
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("", data)));
      });
  },

  //* ********************************************* CLIENT ROUTER *********************************************** */
  "POST client/project": [
    (req, res) => {
      req.$ctx.broker.call("client.createApiProject", { ...req.body }).then(data => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
    }
  ],
  "POST client/task": [
    (req, res) => {
      req.$ctx.broker.call("client.createApiTask", { ...req.body }).then(data => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
    }
  ],
  "POST client/fileupload": [
    (req, res) => {
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        req.$ctx.broker
          .call("client.createApiProjectWithFile", {
            fields,
            files
          })
          .then(data => {
            configureHeaders(res);
            res.writeHead(200);
            res.end(JSON.stringify(data));
            req.$ctx.broker.call("client.processApiProjectFiles", {
              files,
              project: data.data,
              fields
            });
          });
      });
    }
  ],
  "POST client/fetchproject": [
    (req, res) => {
      const { projectId } = req.body;
      req.$ctx.broker.call("client.fetchProject", { projectId }).then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
    }
  ],
  "POST client/progress": [
    (req, res) => {
      const { projectId, apikey, targetLanguage } = req.body;
      req.$ctx.broker
        .call("client.getProgress", {
          projectId,
          apikey,
          targetLanguage
        })
        .then(data => {
          configureHeaders(res);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        });
    }
  ],
  "POST client/webhook": [
    (req, res) => {
      req.$ctx.broker.call("export.callWebhook", { ...req.body }).then(data => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
    }
  ],
  "POST client/convert": [
    (req, res) => {
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        req.$ctx.broker
          .call("client.convert", {
            fields,
            files
          })
          .then(data => {
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.writeHead(200);
            res.end(JSON.stringify(data));
          });
      });
    }
  ],
  //* ********************************************* DASHBOARD ROUTER *********************************************** */
  "GET dashboard/counts": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("dashboard.getDashboardData", { user }).then(dashboardData => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(dashboardData));
    });
  },
  "POST dashboard/kpis/custom": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { kpiFromDate, kpiToDate, service, searchPm, searchAsc } = req.body;
    this.broker
      .call("dashboard.getKpiData", {
        user,
        action: "custom",
        fromDate: kpiFromDate,
        toDate: kpiToDate,
        service,
        searchPm,
        searchAsc
      })
      .then(dashboardData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(dashboardData));
      });
  },
  "GET dashboard/languages": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("dashboard.getLanguageData", { user }).then(dashboardData => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(dashboardData));
    });
  },
  "GET dashboard/admin": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("dashboard.getAdminDashboardData", { user }).then(adminData => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(adminData));
    });
  },
  "POST dashboard/admin/report": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { toDate, fromDate } = req.body;
    this.broker
      .call("dashboard.getAdminReportData", {
        toDate,
        fromDate
      })
      .then(reportData => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(reportData));
      });
  },
  "POST active/user/between/date": "active_user.fetchUserActiveBetweenDate",
  "POST fetch/user/working/hours": "active_user.fetchUserLoginHours",
  "GET dashboard/admin/langauges": "dashboard.getTranslationStatsForAdmin",
  "GET dashboard/proclient/wordcount": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("project.getWordCountsForProClient", { user }).then(countData => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(countData));
    });
  },
  "GET dashboard/proclient/translationstats": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("project.getWordCountForLanguagesForProClient", { user }).then(countData => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(countData));
    });
  },
  "GET dashboard/users/lspList/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search } = req.$params;
    this.broker
      .call("admin.fetchLSPUsers", {
        pageNumber,
        pageSize,
        search
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET dailyreport/:reportDate": "dashboard.getDailyReport",
  "POST daily/tm/catool/data": "dashboard.getTMCatoolDailyData",
  //* ********************************************* NOTIFICATION ROUTER *********************************************** */
  "POST notification/create": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { message, action, type } = req.body;
    this.broker
      .call("notifications.insertNotification", {
        user,
        type,
        message,
        action
      })
      .then(notification => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(notification));
      });
  },
  "GET notification/get/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search } = req.$params;
    this.broker
      .call("notifications.getNotifications", {
        user,
        pageNumber,
        pageSize,
        search
      })
      .then(notifications => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(this.success("Notifications are found for this user", notifications)));
      });
  },
  // put to post
  "POST notification/update": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("notifications.updateNotification", { user }).then(notification => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(notification));
    });
  },
  // delete to post
  // "DELETE notification/delete"(req, res) {
  "POST notification/delete": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("notifications.removeNotifications", { user }).then(notification => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(notification));
    });
  },
  "POST subscription": "subscription.createSubscription",
  //* ********************************************* TRAINING AND CERTIFICATION *********************************************** */
  "POST certification/request": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { certificate, service, sourceLang, certUser } = req.body;
    this.broker
      .call("trainingcert.createCertRequest", {
        user,
        certificate,
        service,
        sourceLang,
        certUser
      })
      .then(coupon => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(coupon));
      });
  },
  "POST badge/details": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { certUser, targetLanguage, service, flag } = req.body;
    this.broker
      .call("badges.fetchBadgeDetails", {
        certUser,
        targetLanguage,
        service,
        flag,
        user
      })
      .then(coupon => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(coupon));
      });
  },
  "POST cert/associatelist": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { targetLanguage, taskId } = req.body;
    this.broker
      .call("auth.getAssociateListForCert", {
        targetLanguage,
        taskId,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST cert/assign/associate": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { task, targetLanguages, associate } = req.body;
    this.broker
      .call("trainingcert.assignCertificationToAssociate", {
        task,
        targetLanguages,
        associate,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "GET cert/fetch/request/:page/:rowsPerPage": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { page, rowsPerPage, filter, filterSearch } = req.$params;
    this.broker
      .call("trainingcert.fetchCertificationRequest", {
        user,
        page,
        rowsPerPage,
        filter,
        filterSearch
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST training/request": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { trainingDescription, trainingUser, badge } = req.body;
    this.broker
      .call("training.createTrainingRequest", {
        user,
        trainingDescription,
        trainingUser,
        badge
      })
      .then(coupon => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(coupon));
      });
  },
  "GET train/fetch/request/:page/:rowsPerPage": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { page, rowsPerPage, filter, filterSearch, status, flag } = req.$params;
    this.broker
      .call("training.fetchTrainingRequest", {
        user,
        page,
        rowsPerPage,
        filter,
        filterSearch,
        status,
        flag
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST training/status/update": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { status, request, trainingLink, trainingDateAndTime } = req.body;
    this.broker
      .call("training.updateTrainingStatus", {
        status,
        request,
        trainingLink,
        trainingDateAndTime
      })
      .then(coupon => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(coupon));
      });
  },

  "POST /cert/update/deadline": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { taskId, projectId, status } = req.body;
    this.broker
      .call("trainingcert.updateDeadline", {
        taskId,
        projectId,
        status
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST /certification/result/update": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, result, performancePercentage, certResultFeedback, badgeType } = req.body;
    this.broker
      .call("project.updateCertResult", {
        projectId,
        result,
        performancePercentage,
        certResultFeedback,
        badgeType
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  //* *********************************************USER PROFILE ROUTER ****************************************** */
  "POST user/profile": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { apikey, email } = req.body;
    this.broker
      .call("auth.getMarketplaceUserProfile", {
        apikey,
        email
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST user/url_profile": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { apikey } = req.body;
    this.broker.call("auth.getMarketplaceUserURLProfile", { apikey }).then(data => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST user/profile/review": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { apikey, email, reviewParams, page, rowsPerPage } = req.body;
    this.broker
      .call("reviews.getDetailedReview", {
        apikey,
        email,
        reviewParams,
        page,
        rowsPerPage
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  //* ********************************************* COUPON ROUTER *********************************************** */
  "POST admin/coupon": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { couponAmount, couponExpiry, totalCoupons, couponUser } = req.body;
    this.broker
      .call("coupons.createCoupon", {
        user,
        couponAmount,
        couponExpiry,
        totalCoupons,
        couponUser
      })
      .then(coupon => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(coupon));
      });
  },
  "POST admin/coupons": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { couponUser, type, search, pageNumber, pageSize } = req.body;
    this.broker
      .call("coupons.getUserCoupons", {
        couponUser,
        type,
        search,
        pageNumber,
        pageSize
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  // delete to post (test)
  // "DELETE admin/delete/:couponUniqueId": "coupons.deleteCoupon",
  "POST admin/delete": function (req, res) {
    const { couponUniqueId } = req.body;
    this.broker.call("coupons.deleteCoupon", { couponUniqueId });
  },

  "POST share/coupon": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { email, apikey, role, displayName, couponUniqueId } = req.body;
    this.broker
      .call("coupons.shareCoupon", {
        user,
        email,
        apikey,
        role,
        displayName,
        couponUniqueId
      })
      .then(coupon => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(coupon));
      });
  },

  "POST apply/coupon": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { couponCode } = req.body;
    this.broker
      .call("coupons.applyCoupon", {
        user,
        couponCode
      })
      .then(coupon => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(coupon));
      });
  },

  //* ********************************************* FEEDBACK ROUTER *********************************************** */
  "POST feedback/create/question": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { question, choices, role, planType, frequency, integrationPlace } = req.body;
    this.broker
      .call("feedback_question.createFeedbackQuestion", {
        user,
        question,
        choices,
        role,
        planType,
        frequency,
        integrationPlace
      })
      .then(questionRes => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(questionRes));
      });
  },

  "GET feedback/questions/:pageNumber/:pageSize": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search } = req.$params;
    this.broker
      .call("feedback_question.getFeedbacksQuestions", {
        user,
        pageNumber,
        pageSize,
        search
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  "GET feedback/questions/users": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker.call("feedback_question.getFeedbacksQuestionsForUser", { user }).then(data => {
      configureHeaders(res);
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },

  "DELETE feedback/delete/:questionUniqueId": "feedback_question.deleteFeedbackQuestion",

  "PUT feedback/update/questions": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { questionSet } = req.body;
    this.broker
      .call("feedback_question.updatefeedbackQuestions", {
        user,
        questionSet
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  //* ********************************************* BIDDING ROUTER *************************************************** *//

  "POST marketplace/placebid": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, service, targetLanguage, bidType, initialBid, event } = req.body;
    this.broker
      .call("bidding.placeBid", {
        projectId,
        user,
        service,
        targetLanguage,
        bidType,
        initialBid,
        event
      })
      .then(transaction => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(transaction));
      });
  },
  "GET marketplace/getAllBids/:projectId": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId } = req.$params;
    this.broker
      .call("bidding.getAllBids", {
        projectId,
        user
      })
      .then(transaction => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(transaction));
      });
  },

  "GET /marketplace/fetchchat": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { chatId } = req.$params;
    this.broker
      .call("chat.fetchAllMessages", {
        chatId,
        user
      })
      .then(transaction => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(transaction));
      });
  },

  "POST marketplace/sendmessage": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { content, receiver, projectId } = req.body;
    this.broker
      .call("chat.sendMessage", {
        content,
        projectId,
        receiver,
        user
      })
      .then(transaction => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(transaction));
      });
  },

  "POST marketplace/bidstatus": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { projectId, chatId, status, finalBid } = req.body;
    this.broker
      .call("bidding.updateBidStatus", {
        projectId,
        chatId,
        status,
        finalBid,
        user
      })
      .then(transaction => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(transaction));
      });
  },

  "POST marketplace/apply/application": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    // const user = verificationData.data;
    const { user, data } = req.body;
    this.broker
      .call("applications.applyApplication", {
        user,
        data
      })
      .then(transaction => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(transaction));
      });
  },

  //* ********************************************* TRANSACTION ROUTER *********************************************** */
  "POST transaction": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { transaction, razorpayTransaction, meta, status } = req.body;
    this.broker
      .call("transaction.createTransaction", {
        user,
        transaction,
        razorpayTransaction,
        meta,
        status
      })
      .then(transaction => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(transaction));
      });
  },
  "POST transaction/create": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { amount } = req.body;
    this.broker
      .call("transaction.createOrder", {
        amount,
        user
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST transaction/capture": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { data, flag, planDetails } = req.body;
    this.broker
      .call("transaction.captureRazorpayTransaction", {
        data,
        user,
        flag,
        planDetails
      })
      .then(transaction => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(transaction));
      });
  },
  "GET transactions": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize } = req.$params;
    this.broker
      .call("transaction.getTransactions", {
        user,
        pageNumber,
        pageSize
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST custom/reports/project": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { targetLanguages, service, fromDate, toDate, pageNumber, pageSize, search, columns, projectTypeForUser } = req.body;
    this.broker
      .call("report.generateCustomReportProject", {
        user,
        targetLanguages,
        service,
        fromDate,
        toDate,
        pageNumber,
        pageSize,
        search,
        columns,
        projectTypeForUser
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST custom/reports/assignment": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { pageNumber, pageSize, search, service, selectedUser, reportSortOrder, targetLanguage, projectTypeForUser } = req.body;
    this.broker
      .call("report.generateCustomReportUserAssignment", {
        user,
        service,
        pageNumber,
        pageSize,
        search,
        selectedUser,
        reportSortOrder,
        targetLanguage,
        projectTypeForUser
      })
      .then(data => {
        configureHeaders(res);
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST custom/report/download": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    this.broker
      .call("report.downloadCustomReport", {
        ...req.body,
        user
      })
      .then(report => {
        if (report) {
          const { fileContent, reportName } = report;
          const fileBuffer = new Buffer(fileContent, "binary");
          const bufferStream = new stream.PassThrough();
          bufferStream.end(fileBuffer);
          res.writeHead(200, {
            "Content-Type": "application/force-download",
            "Content-disposition": `attachment; filename=${reportName}`
          });
          bufferStream.pipe(res);
        }
      });
  },
  "GET auth/fetch/mkpuser/:page/:rowsPerPage": function (req, res) {
    const verificationData = this.authenticate(req.headers.authorization);
    const user = verificationData.data;
    const { page, rowsPerPage, filter, filterSearch } = req.$params;
    this.broker
      .call("auth.fetchMkpUser", {
        user,
        page,
        rowsPerPage,
        filter,
        filterSearch
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },

  //* ********************************************* PREVIEW ROUTER *********************************************** */
  // Unrestricted access to apis for PREVIEW files - cattool
  "POST preview/getAllTasks": function (req, res) {
    const { projectId } = req.$params;
    this.broker.call("tasks.getAllTasks", { projectId }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST preview/getFileFromDirectory": function (req, res) {
    const { directory } = req.$params;
    utils.storage === "s3_bucket" ? this.broker.call("s3.getFileFromDirectory", { directory }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    }) : this.broker.call("blob.getFileFromDirectory", { directory }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST client/getFileFromDirectory": function (req, res) {
    const { directory } = req.$params;
    this.broker.call("blob.getFileFromDirectory", { directory }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST client/getFileFromDirectorys3": function (req, res) {
    const { directory } = req.$params;
    this.broker.call("s3.getFileFromDirectory", { directory }).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  },
  "POST preview/getAllSegmentsDetailsByUnit": function (req, res) {
    const { unit, unitId } = req.$params;
    this.broker
      .call("segments.getAllSegmentsDetailsByUnit", {
        unit,
        unitId
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST preview/uploadPreviewFileToS3": function (req, res) {
    const { directory, base64Data, fileExt } = req.$params;
    utils.storage === "s3_bucket" ? this.broker
      .call("s3.uploadPreviewFileToS3", {
        directory,
        base64Data,
        fileExt
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      }) : this.broker
      .call("blob.uploadPreviewFiles", {
        directory,
        base64Data,
        fileExt
      })
      .then(data => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      });
  },
  "POST preview/getSegmentList": function (req, res) {
    this.broker.call("segments.getSegmentList", req.body).then(data => {
      res.writeHead(200);
      res.end(JSON.stringify(data));
    });
  }
}


console.log(Object.keys(aliases))

let urlKey = Object.keys(aliases);
const result = [];

urlKey.map((url) => {
  result.push(`\n${url}`)
})


console.log(result)
require("fs").writeFileSync("url.txt", result);
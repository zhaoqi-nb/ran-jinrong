const BaseController = require('./baseController'),
    apiConfig = require('../../config/apiConfig'),
    Qs = require('qs');

class templateOperationController extends BaseController {

    async getTemplateList() {
        const query = this.ctx.request.body || {},
            sysUserId = await this.getUserId();

        const param = {
            ...query,
            sysUserId
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETTEMPLATELIST, {
            data: param,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        this.returnData(result.data);
    }

    async addTemplate() {
        const query = this.ctx.request.body || {},
            sysUserId = await this.getUserId();

        const param = {
            ...query,
            sysUserId
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.ADDTEMPLATE, {
            data: param,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        this.returnData(result.data);
    }

    async upTemplateInfo() {
        const query = this.ctx.request.body || {},
            sysUserId = await this.getUserId();

        const param = {
            ...query,
            sysUserId
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.UPTEMPLATEINFO, {
            data: param,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        this.returnData(result.data);
    }

    //创建记录
    async createRecord(query){
        // const sysUserId = await this.getUserId();
        const sysUserId = 24;
        const param = {
            ...query,
            sysUserId
        }

        const result = await this.ctx.service.api.ajax(apiConfig.ADDTEMPLATE, {
            data: param,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })

        return result&&result.data.code?result.data.data:null;
    }


    async addBatchAppend() {
        const   query               = this.ctx.request.body || {},
                rootInstantiationId = query.rootInstantiationId,
                num                 = Number(query.num),
                param               = JSON.parse(query.param);

        if (!rootInstantiationId || !num || !param) {
            this.paramError();
            return;
        }

        for(let i=0;i<num;i++){
            let result = await this.createRecord({
                ...param,
                rootInstantiationId,
            });
            if(!result){
                this.paramError("505")
                return;
            }
        }

        this.success();
    }

    async createMoreRecord() {
        const   query     = this.ctx.request.body || {},
                num       = Number(query.num),
                param     = JSON.parse(query.param),
                sysUserId = await this.getUserId();


        if (!num || !param) {
            this.paramError();
            return;
        }

        let rootInstantiationId = 0;
        for(let i=0;i<num;i++){
            let result = await this.createRecord({
                ...param,
                rootInstantiationId,
            });
            if(!result){
                this.paramError("505")
                return;
            }else{
                if(!rootInstantiationId){
                    rootInstantiationId= result;

                    const temp = await this.ctx.service.api.ajax(apiConfig.UPTEMPLATEINFO, {
                        data: {
                            sysUserId,
                            instantiationId:rootInstantiationId,
                            parentInstantiationId:0,
                            rootInstantiationId,
                            templateId:99999
                        },
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                    if(temp.data.code != 200){
                        this.paramError("505")
                        return;
                    }
                } 
            }
        }

        this.success();
    }

    async copyRecord() {
        const   query = this.ctx.request.body || {},
                oldRootId   = query.oldRootId;

        if (!oldRootId) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.BATCHCOPY, {
            data: {
                oldRootId
            },
            // method: "POST",
            // headers: {
            //     "Content-Type": "application/json"
            // },
        })

        this.returnData(result.data);
    }
}
module.exports = templateOperationController;
const uuid = require("uuid");
const LabOrderPanelService = function(UniversalPanelRecord, SelfRegistrationUniversalPanelRecord) {

    async function getPanelName(self_registration_link_id) {
        return new Promise(async (resolve, reject) => {
            try {
                
                const self_registration_panel = await SelfRegistrationUniversalPanelRecord.getPanelByRegistrationID(self_registration_link_id);

                if (self_registration_panel) {

                    const universal_panel_id = self_registration_panel["universal_panel_id"];

                    const universal_panel = await UniversalPanelRecord.getPanelNameByPanelID(universal_panel_id);

                    if(universal_panel){
                        resolve(universal_panel["PANEL_NAME"]);
                    } else{
                        reject("No record found in universal panel");
                    }

                } else {
                    reject("self_registration_panel not found");
                }
            } catch (err) {
                console.log("err-->", err);
                reject(err);
            }
        });
    }

    async function createNewUuid(){
        return uuid.v4()
    }
    return {getPanelName,createNewUuid}

}

module.exports = LabOrderPanelService
var codeautomation = {
    el: {
        debugger: false,
        canvas: '#canvas',
        blocks: {
            alive: {},
            definition: {},
        },
        form: {
            container: '#properties'
        }
    },
    init: ()=> {
        codeautomation.blocksDefinition();
    },
    getBlockDefinition: (blockID = null)=>{
        let block = null;
        if(!!blockID) {
            block = codeautomation.el.blocks.definition[blockID];
        } 
        return block;
    },
    blocksDefinition: ()=> {
        // codeautomation.el.blocks.definition;
        //core
        codeautomation.el.blocks.definition['core_1'] = {
            id: 'core_1',
            name: 'SMS',
            desc: 'Triggers when a specified number receives a text message',
            fields: [
                {
                    label: 'Receiver number',
                    name: 'receiver_number',
                    id: 'receiver_number',
                    type: 'text'
                },
                {
                    label: 'Channel',
                    name: 'sms_channel',
                    id: 'sms_channel',
                    type: 'select',
                    options: [
                        {
                            name: 'Test channel',
                            value: 'test_channel'
                        }
                    ],
                    dataSource: '/routeToGetChannels'
                }
            ]
        }
        //action
        codeautomation.el.blocks.definition['action_2'] = {
            id: 'action_2',
            name: 'Time has passed',
            desc: 'Triggers after a specified amount of time',
            fields: [
                {
                    label: 'After time has passed',
                    name: 'time_passed',
                    id: 'time_passed',
                    type: 'select',
                    options: [
                        {
                            name: '1 min',
                            value: '1min'
                        },
                        {
                            name: '5 min',
                            value: '5min'
                        },
                        {
                            name: '15 min',
                            value: '15min'
                        },
                        {
                            name: '30 min',
                            value: '30min'
                        },
                        {
                            name: '45 min',
                            value: '45min'
                        },
                        {
                            name: '60 min',
                            value: '60min'
                        }
                    ]
                },
                {
                    label: 'Do',
                    name: 'do_event',
                    id: 'do_event',
                    type: 'select',
                    options: [
                        {
                            name: 'Forward to email',
                            value: 'forwardtoemail'
                        }
                    ]
                },
                {
                    label: 'To Email',
                    name: 'email',
                    id: 'email',
                    type: 'email'
                }
            ]
        }
        codeautomation.el.blocks.definition['action_3'] = {
            id: 'action_3',
            name: 'Action is performed',
            desc: 'Triggers when somebody performs a specified action',
            fields: [
                {
                    label: 'Action performed',
                    name: 'action_performed',
                    id: 'action_performed',
                    type: 'text'
                }
            ]
        }
        //log
        codeautomation.el.blocks.definition['logger_1'] = {
            id: 'logger_1',
            name: 'Add new log entry',
            desc: 'Adds a new log entry to this project',
            fields: [
                {
                    label: 'Log entry',
                    name: 'log_entry',
                    id: 'log_entry',
                    type: 'textarea'
                }
            ]
        }
    },
    initRightPanel: (type = null, uuid = null)=> {
        let flag = false;
        if(!!type) {
            let blockDef = codeautomation.getBlockDefinition(type);
            let tpl = codeautomation.utils.form.create(blockDef, uuid);
            document.getElementById("properties").innerHTML = tpl;
            if(!!tpl) {
                flag = true;
            }
        }
        return flag;
    },
    export: ()=> {
        console.log('codeautomation export');
        let flOut = flowy.output();
        if(!!flOut) {
            flOut.blocks.forEach((currentElem)=>{
                codeautomation.el.blocks.alive[currentElem.uuid].link.parent = !!flOut.blocks[currentElem.parent]?.uuid ? flOut.blocks[currentElem.parent].uuid : 0;
            });
        }
        console.log(codeautomation.el.blocks.alive);
    },
    import: (flowyData = null, cdaData = null)=> {
        cdaData = JSON.parse(`{"debce9badf7":{"id":"debce9badf7","blockID":"core_1","data":{"receiver_number":"hjkh","sms_channel":"test_channel"},"link":{"parent":0}},"ba222bf2f11":{"id":"ba222bf2f11","blockID":"action_2","data":{"time_passed":"30min","do_event":"forwardtoemail","email":"asdasdasdtest@yopmail.com"},"link":{"parent":"debce9badf7"}},"97bffa86e6c":{"id":"97bffa86e6c","blockID":"action_1","data":{},"link":{"parent":"ba222bf2f11"}}}`);
        flowyData = {
            "html": "<div class=\"blockelem noselect block\" style=\"left: 148px; top: 160px;\">\n                                <input type=\"hidden\" name=\"blockelemtype\" class=\"blockelemtype\" value=\"core_1\">\n                                <input type=\"hidden\" name=\"blockelemiscore\" class=\"blockelemiscore\" value=\"1\">\n                                \n                                \n                            <input type=\"hidden\" name=\"blockid\" class=\"blockid\" value=\"0\"><div class=\"codeautomation_block_core\"><i class=\"icon-bolt\"></i></div><input type=\"hidden\" name=\"blockuuid\" class=\"blockuuid\" value=\"debce9badf7\">\n            <div class=\"codeautomation_block\" onclick=\"openRightCard(event);\">\n                <div class=\"codeautomation_block_icon\">\n                    <i class=\"icon-textsms\"></i>\n                </div>\n            </div>\n            </div><div class=\"blockelem noselect block\" style=\"left: 148px; top: 270px;\">\n                <input type=\"hidden\" name=\"blockelemtype\" class=\"blockelemtype\" value=\"action_2\">\n                \n                \n                <input type=\"hidden\" name=\"blockid\" class=\"blockid\" value=\"1\"><input type=\"hidden\" name=\"blockuuid\" class=\"blockuuid\" value=\"ba222bf2f11\">\n            <div class=\"codeautomation_block\" onclick=\"openRightCard(event);\">\n                <div class=\"codeautomation_block_icon\">\n                    <i class=\"icon-access_time\"></i>\n                </div>\n            </div>\n            <div class=\"indicator invisible\" style=\"left: 25px; top: 60px;\"></div></div><div class=\"arrowblock\" style=\"left: 158px; top: 220px;\"><input type=\"hidden\" class=\"arrowid\" value=\"1\"><svg preserveAspectRatio=\"none\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 0L20 25L20 25L20 50\" stroke=\"#C5CCD0\" stroke-width=\"2px\"></path><path d=\"M15 45H25L20 50L15 45Z\" fill=\"#C5CCD0\"></path></svg></div><div class=\"blockelem noselect block\" style=\"left: 148px; top: 380px;\">\n                <input type=\"hidden\" name=\"blockelemtype\" class=\"blockelemtype\" value=\"action_1\">\n                <input type=\"hidden\" name=\"blockelemiend\" class=\"blockelemiend\" value=\"1\">\n                \n                \n            <input type=\"hidden\" name=\"blockid\" class=\"blockid\" value=\"2\"><div class=\"codeautomation_block_end\"><i class=\"icon-flash_off\"></i></div><input type=\"hidden\" name=\"blockuuid\" class=\"blockuuid\" value=\"97bffa86e6c\">\n            <div class=\"codeautomation_block\" onclick=\"openRightCard(event);\">\n                <div class=\"codeautomation_block_icon\">\n                    <i class=\"icon-logout\"></i>\n                </div>\n            </div>\n            </div><div class=\"arrowblock\" style=\"left: 158px; top: 330px;\"><input type=\"hidden\" class=\"arrowid\" value=\"2\"><svg preserveAspectRatio=\"none\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 0L20 25L20 25L20 50\" stroke=\"#C5CCD0\" stroke-width=\"2px\"></path><path d=\"M15 45H25L20 50L15 45Z\" fill=\"#C5CCD0\"></path></svg></div>",
            "blockarr": [
                {
                    "parent": -1,
                    "childwidth": 60,
                    "id": 0,
                    "x": 178,
                    "y": 190,
                    "width": 60,
                    "height": 60
                },
                {
                    "childwidth": 60,
                    "parent": 0,
                    "id": 1,
                    "x": 178,
                    "y": 300,
                    "width": 60,
                    "height": 60
                },
                {
                    "childwidth": 0,
                    "parent": 1,
                    "id": 2,
                    "x": 178,
                    "y": 410,
                    "width": 60,
                    "height": 60
                }
            ],
            "blocks": [
                {
                    "uuid": "debce9badf7",
                    "id": 0,
                    "parent": -1,
                    "data": [
                        {
                            "name": "blockelemtype",
                            "value": "core_1"
                        },
                        {
                            "name": "blockelemiscore",
                            "value": "1"
                        },
                        {
                            "name": "blockid",
                            "value": "0"
                        },
                        {
                            "name": "blockuuid",
                            "value": "debce9badf7"
                        }
                    ],
                    "attr": [
                        {
                            "class": "blockelem noselect block"
                        },
                        {
                            "style": "left: 148px; top: 160px;"
                        }
                    ]
                },
                {
                    "uuid": "ba222bf2f11",
                    "id": 1,
                    "parent": 0,
                    "data": [
                        {
                            "name": "blockelemtype",
                            "value": "action_2"
                        },
                        {
                            "name": "blockid",
                            "value": "1"
                        },
                        {
                            "name": "blockuuid",
                            "value": "ba222bf2f11"
                        }
                    ],
                    "attr": [
                        {
                            "class": "blockelem noselect block"
                        },
                        {
                            "style": "left: 148px; top: 270px;"
                        }
                    ]
                },
                {
                    "uuid": "97bffa86e6c",
                    "id": 2,
                    "parent": 1,
                    "data": [
                        {
                            "name": "blockelemtype",
                            "value": "action_1"
                        },
                        {
                            "name": "blockelemiend",
                            "value": "1"
                        },
                        {
                            "name": "blockid",
                            "value": "2"
                        },
                        {
                            "name": "blockuuid",
                            "value": "97bffa86e6c"
                        }
                    ],
                    "attr": [
                        {
                            "class": "blockelem noselect block"
                        },
                        {
                            "style": "left: 148px; top: 380px;"
                        }
                    ]
                }
            ]
        };
        
        if(!!flowyData && !!cdaData) {
            flowy.import(flowyData);
            codeautomation.el.blocks.alive = cdaData;
        }
    },
    utils: {
        form: {
            submit: (evt,currentElem)=> {
                let formWrapper = evt.target.closest(".codeautomation_right_form_wrapper");
                let form = formWrapper.querySelector("form");
                let uuid = formWrapper.getAttribute('data-cda-blk-uuid');
                let formElem = form.elements;
                
                Array.from(formElem).forEach(function (curField) {
                    let fname = curField.getAttribute('name');
                    fname = fname.split('__')[1];
                    let fval = curField.value;
                    codeautomation.el.blocks.alive[uuid].data[fname] = fval;
                });

            },
            create: (data = null, uuid = null)=>{
                uuid = !!uuid ? uuid : codeautomation.utils.generateUUID();
                let tpl = ``;
                let blockData = codeautomation.el.blocks.alive[uuid];

                if(!!data) {
                    tpl = `
                    <div class="codeautomation_right_form_wrapper" data-cda-blk-uuid="${uuid}">
                        <div class="codeautomation_right_header">
                            <div>
                                <h5>${data.name} Properties</h5>
                                <p>${data.desc}</p>
                            </div>
                            <button onclick="closeRightCard();" type="button" class="cda_btn cda_btn--sm">
                                <i class="icon-clear"></i>
                            </button>
                        </div>`;


                        if(data?.fields) {
                            tpl += `
                            <div class="codeautomation_right_body">
                                <form name="codeautomation_block_form">
                                <div class="codeautomation_right_form">
                                    `;
                                    
                                    data.fields.forEach(function (curField) {
                                        tpl += `
                                        <div class="codeautomation_right_form_row">
                                            <label for="${uuid}__${curField?.id}">${curField?.label}</label>
                                            `;

                                            if(!!curField?.type) {
                                                let val = ''
                                                switch (curField.type) {
                                                    case 'select':
                                                        var fieldOpt = `<option>Select...</option>`;
                                                        if(!!curField?.options) {
                                                            curField.options.forEach(function (curOption) {
                                                                let selectattr = '';
                                                                val =  !!blockData?.data && !!blockData?.data[curField?.name] ? blockData.data[curField.name] : '';
                                                                if(val == curOption.value) {
                                                                    selectattr = 'selected';
                                                                }
                                                                fieldOpt += `<option ${selectattr} value="${curOption.value}">${curOption.name}</option>`;
                                                            });
                                                        }
                                                        tpl += `
                                                        <select name="${uuid}__${curField?.name}" id="${uuid}__${curField?.id}">
                                                            ${fieldOpt}
                                                        </select>
                                                        `;
                                                        break;
                                                    case 'email':
                                                    case 'text':
                                                        val =  !!blockData?.data && !!blockData?.data[curField?.name] ? blockData.data[curField.name] : '';
                                                        tpl += `
                                                        <input name="${uuid}__${curField?.name}" id="${uuid}__${curField?.id}" value="${val}" placeholder="type..." type="text">
                                                        `;
                                                        break;
                                                    case 'textarea':
                                                        val =  !!blockData?.data && !!blockData?.data[curField?.name] ? blockData.data[curField.name] : '';
                                                        tpl += `
                                                        <textarea name="${uuid}__${curField?.name}" id="${uuid}__${curField?.id}" placeholder="type...">${val}</textarea>
                                                        `;
                                                        break;
                                                
                                                    default:
                                                        break;
                                                }
                                            }

                                        tpl += `
                                        </div>
                                        `;
                                    });
    
                                    tpl += `
                                </div>
                                </form>
                                <div class="codeautomation_right_form_row">
                                    <button onclick="codeautomation.utils.form.submit(event, this);" class="cda_btn cda_btn--icon codeautomation_right_form_submit" type="button">
                                        <i class="icon-save"></i><span>Save</span>
                                    </button>
                                </div>
                            </div>`;
                        }
                    tpl += `
                    </div>
                `
                }
                return tpl;
            }
        },
        zoom:(state = 'in')=> {
            let level = !!$(codeautomation.el.canvas).attr('data-zoom') ? parseInt($(codeautomation.el.canvas).attr('data-zoom')) : 100;
            if (state == 'in') {
                level = level + 10;
            } else {
                level = level - 10;
            }
            $(codeautomation.el.canvas).attr('data-zoom', level);
            $(codeautomation.el.canvas).css("zoom",level+"%"); 
        },
        generateUUID: ()=> {
            if(codeautomation.el.debugger) {
                console.log('generateUUID()');
            }
            var d = new Date().getTime();//Timestamp
            var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
            return 'xxxxxyxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16;//random number between 0 and 16
                if(d > 0){//Use timestamp until depleted
                    r = (d + r)%16 | 0;
                    d = Math.floor(d/16);
                } else {//Use microseconds since page-load if supported
                    r = (d2 + r)%16 | 0;
                    d2 = Math.floor(d2/16);
                }
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        },
    }
};
codeautomation.init();
// document.addEventListener("DOMContentLoaded", function(){
    var rightcard = false;
    var tempblock;
    var tempblock2;
    // document.getElementById("blocklist").innerHTML = `<div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="1"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                  <div class="blockico"><span></span><img src="assets/eye.svg"></div><div class="blocktext">                        <p class="blocktitle">New visitor</p><p class="blockdesc">Triggers when somebody visits a specified page</p>        </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="2"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                    <div class="blockico"><span></span><img src="assets/action.svg"></div><div class="blocktext">                        <p class="blocktitle">Action is performed</p><p class="blockdesc">Triggers when somebody performs a specified action</p></div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="3"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                    <div class="blockico"><span></span><img src="assets/time.svg"></div><div class="blocktext">                        <p class="blocktitle">Time has passed</p><p class="blockdesc">Triggers after a specified amount of time</p>          </div></div></div><div class="blockelem create-flowy noselect"><input type="hidden" name="blockelemtype" class="blockelemtype" value="4"><div class="grabme"><img src="assets/grabme.svg"></div><div class="blockin">                    <div class="blockico"><span></span><img src="assets/error.svg"></div><div class="blocktext">                        <p class="blocktitle">Error promptdd</p><p class="blockdesc">Triggers when a specified error happens</p>              </div></div></div>`;
    flowy(document.getElementById("canvas"), drag, release, snapping, rearrange, 50, 50);
    function addEventListenerMulti(type, listener, capture, selector) {
        var nodes = document.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener(type, listener, capture);
        }
    }
    function snapping(drag, first) {
        console.log('snapping');

        if (rightcard) {
            rightcard = false;
            document.getElementById("properties").classList.remove("expanded");
            setTimeout(function(){
                 document.getElementById("propwrap").classList.remove("itson"); 
            }, 300);
            tempblock.classList.remove("selectedblock");
        }

        var grab = drag.querySelector(".grabme");
        grab.parentNode.removeChild(grab);
        var blockin = drag.querySelector(".blockin");
        blockin.parentNode.removeChild(blockin);

        if (!!drag.querySelector(".blockelemiscore") && drag.querySelector(".blockelemiscore").value == "1") {
            drag.innerHTML += `<div class="codeautomation_block_core"><i class="icon-bolt"></i></div>`;
        }
        if (!!drag.querySelector(".blockelemiend") && drag.querySelector(".blockelemiend").value == "1") {
            drag.innerHTML += `<div class="codeautomation_block_end"><i class="icon-flash_off"></i></div>`;
        }
        
        let uuid = codeautomation.utils.generateUUID();
        
        drag.innerHTML += `<input type="hidden" name="blockuuid" class="blockuuid" value="${uuid}"></input>`;

        codeautomation.el.blocks.alive[uuid] = {
            id: uuid,
            blockID: drag.querySelector(".blockelemtype").value,
            data: {},
            link: {
                parent: '',
                // child: ''
            }
        }
        
        if (drag.querySelector(".blockelemtype").value == "core_1") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-textsms"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "action_1") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-logout"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "action_2") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-access_time"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "action_3") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-bolt"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "logger_1") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-create"></i>
                </div>
            </div>
            `;
        }
        return true;
    }
    function drag(block) {
        console.log('drag');
        block.classList.add("blockdisabled");
        tempblock2 = block;
    }
    function rearrange(block, parent) {
        console.log('rearrange AKA delete', block);
        let oldUUID = [];
        let curUUID = [];
        let flOut = flowy.output();
        flOut.blocks.forEach((currentElem)=>{
            curUUID.push(currentElem.uuid);
        });
        for (let currentElemIndex in codeautomation.el.blocks.alive) {
            oldUUID.push(currentElemIndex);
        }

        let toberemoved = oldUUID.filter(x => curUUID.indexOf(x) === -1);
        
        toberemoved.forEach((currentElem)=>{
            delete codeautomation.el.blocks.alive[currentElem];
        });

    }
    function release() {
        console.log('release');
        if (tempblock2) {
            console.log('release inside', tempblock2, tempblock);
            tempblock2.classList.remove("blockdisabled");
        }
    }
    var disabledClick = function(){
        console.log('asd');
        document.querySelector(".navactive").classList.add("navdisabled");
        document.querySelector(".navactive").classList.remove("navactive");
        this.classList.add("navactive");
        this.classList.remove("navdisabled");
        if (this.getAttribute("id") == "cores") {
            document.getElementById("blocklist").innerHTML = `
            <div class="blockelem create-flowy noselect">
                <input type="hidden" name='blockelemtype' class="blockelemtype" value="core_1">
                <input type="hidden" name='blockelemiscore' class="blockelemiscore" value="1">
                <div class="grabme">
                    <img src="assets/grabme.svg">
                </div>
                <div class="blockin">
                    <div class="blockelem_body">
                        <div class="blockelem_icon">
                            <i class="icon-textsms"></i>
                        </div>
                        <div class="blockelem_titledesc">
                            <p class="blockelem_title">SMS</p>
                            <p class="blockelem_desc">Triggers when a specified number receives a text message</p>
                        </div>
                    </div>
                </div>
            </div>`;
        } else if (this.getAttribute("id") == "actions") {
            document.getElementById("blocklist").innerHTML = `
            <div class="blockelem create-flowy noselect">
                <input type="hidden" name="blockelemtype" class="blockelemtype" value="action_1">
                <input type="hidden" name='blockelemiend' class="blockelemiend" value="1">
                <div class="grabme">
                    <img src="assets/grabme.svg">
                </div>
                <div class="blockin">
                    <div class="blockelem_body">
                        <div class="blockelem_icon">
                            <i class="icon-logout"></i>
                        </div>
                        <div class="blockelem_titledesc">
                            <p class="blockelem_title">End flow</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="blockelem create-flowy noselect">
                <input type="hidden" name="blockelemtype" class="blockelemtype" value="action_2">
                <div class="grabme">
                    <img src="assets/grabme.svg">
                </div>
                <div class="blockin">
                        <div class="blockelem_body">
                            <div class="blockelem_icon">
                                <i class="icon-access_time"></i>
                            </div>
                            <div class="blockelem_titledesc">
                                <p class="blockelem_title">Time has passed</p>
                                <p class="blockelem_desc">Triggers after a specified amount of time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="blockelem create-flowy noselect">
                <input type="hidden" name="blockelemtype" class="blockelemtype" value="action_3">
                <div class="grabme">
                    <img src="assets/grabme.svg">
                </div>
                <div class="blockin">
                        <div class="blockelem_body">
                            <div class="blockelem_icon">
                                <i class="icon-bolt"></i>
                            </div>
                            <div class="blockelem_titledesc">
                                <p class="blockelem_title">Action is performed</p>
                                <p class="blockelem_desc">Triggers when somebody performs a specified action</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            `;
        } else if (this.getAttribute("id") == "loggers") {
            document.getElementById("blocklist").innerHTML = `
            <div class="blockelem create-flowy noselect">
                <input type="hidden" name="blockelemtype" class="blockelemtype" value="logger_1">
                <div class="grabme">
                    <img src="assets/grabme.svg">
                </div>
                <div class="blockin">
                    <div class="blockelem_body">
                        <div class="blockelem_icon">
                            <i class="icon-create"></i>
                        </div>
                        <div class="blockelem_titledesc">
                            <p class="blockelem_title">Add new log entry</p>
                            <p class="blockelem_desc">Adds a new log entry to this project</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
    addEventListenerMulti("click", disabledClick, false, ".side");
    // document.getElementById("close").addEventListener("click", function(){
    //     console.log('asddddddddd');
    //    if (rightcard) {
    //        rightcard = false;
    //        document.getElementById("properties").classList.remove("expanded");
    //        setTimeout(function(){
    //             document.getElementById("propwrap").classList.remove("itson"); 
    //        }, 300);
    //         tempblock.classList.remove("selectedblock");
    //    } 
    // });

    let closeRightCard = ()=> {
        console.log('asddddddddd');
       if (rightcard) {
           rightcard = false;
           document.getElementById("properties").classList.remove("expanded");
           setTimeout(function(){
                document.getElementById("propwrap").classList.remove("itson"); 
           }, 300);
            tempblock.classList.remove("selectedblock");
       } 
    };

    let openRightCard = (event)=> {
        console.log('openRightCard');
        let allSelectedBlocks = document.querySelectorAll('.blockelem.selectedblock');
        allSelectedBlocks.forEach(function (currentValue) {
            currentValue.classList.remove("selectedblock");
        });

        tempblock = event.target.closest(".block");
        let blockType = tempblock.querySelector(".blockelemtype").value;
        let blockUUid = tempblock.querySelector(".blockuuid").value;

        let tpl = codeautomation.initRightPanel(blockType, blockUUid);
        if(!!tpl) {
            rightcard = true;
            document.getElementById("properties").classList.add("expanded");
            document.getElementById("propwrap").classList.add("itson");
            tempblock.classList.add("selectedblock");
        }
    };
    
    document.getElementById("removeblock").addEventListener("click", function(){
        console.log('wawaw');
        flowy.deleteBlocks();
        if (rightcard) {
            rightcard = false;
            document.getElementById("properties").classList.remove("expanded");
            setTimeout(function(){
                document.getElementById("propwrap").classList.remove("itson"); 
            }, 300);
            tempblock.classList.remove("selectedblock");
        } 
    });
    var aclick = false;
    var noinfo = false;
    var beginTouch = function (event) {
        console.log('beginTouch');
        aclick = true;
        noinfo = false;
        if (event.target.closest(".create-flowy")) {
            noinfo = true;
        }
    }
    var checkTouch = function (event) {
        // console.log('checkTouch');
        aclick = false;
    }
    var doneTouch = function (event) {
        console.log('doneTouch');
        if (event.type === "mouseup" && aclick && !noinfo) {
            if (!rightcard && event.target.closest(".block") && !event.target.closest(".block").classList.contains("dragging")) {
                    // tempblock = event.target.closest(".block");
                    // rightcard = true;
                    // document.getElementById("properties").classList.add("expanded");
                    // document.getElementById("propwrap").classList.add("itson");
                    // tempblock.classList.add("selectedblock");
            } 
        }
    }
    addEventListener("mousedown", beginTouch, false);
    addEventListener("mousemove", checkTouch, false);
    addEventListener("mouseup", doneTouch, false);
    addEventListenerMulti("touchstart", beginTouch, false, ".block");
// });


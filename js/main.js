var codeautomation = {
    el: {
        debugger: false,
        canvas: '#canvas',
        blocks: {
            alive: [],
            definition: [],
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
        codeautomation.el.blocks.definition['core1'] = {
            id: 'core1',
            name: 'SMS',
            desc: 'Triggers when a specified number receives a text message',
            fields: [
                {
                    label: 'Receiver number',
                    name: 'receiver_number',
                    id: 'sms_receiver',
                    type: 'text'
                },
                {
                    label: 'Channel',
                    name: 'sms_channel',
                    id: 'sms_channel',
                    type: 'select',
                    options: [],
                    dataSource: '/routeToGetChannels'
                }
            ]
        }
        //action
        codeautomation.el.blocks.definition['b2'] = {
            id: 'b2',
            name: 'Time has passed',
            desc: 'Triggers after a specified amount of time',
            fields: [
                {
                    label: 'Time passed',
                    name: 'time_passed',
                    id: 'time_passed',
                    type: 'text'
                }
            ]
        }
        codeautomation.el.blocks.definition['b3'] = {
            id: 'b3',
            name: 'Action is performed',
            desc: 'Triggers when somebody performs a specified action',
            fields: [
                {
                    label: 'Action performed',
                    name: 'action_performed',
                    id: 'action_performed',
                    type: 'select',
                    options: []
                }
            ]
        }
        //log
        codeautomation.el.blocks.definition['c1'] = {
            id: 'c1',
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
    utils: {
        form: {
            create: (data = null, uuid = null)=>{
                uuid = !!uuid ? uuid : codeautomation.utils.generateUUID();
                let tpl = ``;
                if(!!data) {
                    tpl = `
                    <div class="codeautomation_right_form_wrapper">
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
                                <div class="codeautomation_right_form">
                                    `;
                                    
                                    data.fields.forEach(function (curField) {
                                        tpl += `
                                        <div class="codeautomation_right_form_row">
                                            <label for="${uuid}__${curField?.id}">${curField?.label}</label>
                                            `;
                                            switch (curField?.type) {
                                                case 'select':
                                                    tpl += `
                                                    <select name="${uuid}__${curField?.name}" id="${uuid}__${curField?.id}">
                                                        <option>Select a channel</option>
                                                    </select>
                                                    `;
                                                    break;
                                                case 'text':
                                                    tpl += `
                                                    <input name="${uuid}__${curField?.name}" id="${uuid}__${curField?.id}" placeholder="type..." type="text">
                                                    `;
                                                    break;
                                                case 'textarea':
                                                    tpl += `
                                                    <textarea name="${uuid}__${curField?.name}" id="${uuid}__${curField?.id}" placeholder="type..."></textarea>
                                                    `;
                                                    break;
                                            
                                                default:
                                                    break;
                                            }
                                            
                                        tpl += `
                                        </div>
                                        `;
                                    });
    
                                    tpl += `
                                    <div class="codeautomation_right_form_row">
                                        <button class="cda_btn cda_btn--icon" type="button">
                                            <i class="icon-save"></i><span>Save</span>
                                        </button>
                                    </div>
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
        console.log('asdasd');
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
            'id': uuid,
            'blockID': drag.querySelector(".blockelemtype").value
        }
        
        if (drag.querySelector(".blockelemtype").value == "core1") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-textsms"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "b1") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-logout"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "b2") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-access_time"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "b3") {
            drag.innerHTML += `
            <div class="codeautomation_block" onclick="openRightCard(event);">
                <div class="codeautomation_block_icon">
                    <i class="icon-bolt"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "c1") {
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
    function rearrange() {
        console.log('rearrange');
    }
    function release() {
        console.log('release');
        if (tempblock2) {
            console.log('fffff');
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
                <input type="hidden" name='blockelemtype' class="blockelemtype" value="core1">
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
                <input type="hidden" name="blockelemtype" class="blockelemtype" value="b1">
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
                <input type="hidden" name="blockelemtype" class="blockelemtype" value="b2">
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
                <input type="hidden" name="blockelemtype" class="blockelemtype" value="b3">
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
                <input type="hidden" name="blockelemtype" class="blockelemtype" value="c1">
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
        console.log('checkTouch');
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


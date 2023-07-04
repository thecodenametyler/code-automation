var codeautomation = {
    el: {
        canvas: '#canvas'
    },
    utils   : {
        zoom:(state = 'in')=> {
            let level = !!$(codeautomation.el.canvas).attr('data-zoom') ? parseInt($(codeautomation.el.canvas).attr('data-zoom')) : 100;
            if (state == 'in') {
                level = level + 10;
            } else {
                level = level - 10;
            }
            $(codeautomation.el.canvas).attr('data-zoom', level);
            $(codeautomation.el.canvas).css("zoom",level+"%"); 
        }
    }
};

document.addEventListener("DOMContentLoaded", function(){
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
        
        if (drag.querySelector(".blockelemtype").value == "core1") {
            drag.innerHTML += `
            <div class="codeautomation_block">
                <div class="codeautomation_block_icon">
                    <i class="icon-textsms"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "b1") {
            drag.innerHTML += `
            <div class="codeautomation_block">
                <div class="codeautomation_block_icon">
                    <i class="icon-logout"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "b2") {
            drag.innerHTML += `
            <div class="codeautomation_block">
                <div class="codeautomation_block_icon">
                    <i class="icon-access_time"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "b3") {
            drag.innerHTML += `
            <div class="codeautomation_block">
                <div class="codeautomation_block_icon">
                    <i class="icon-bolt"></i>
                </div>
            </div>
            `;
        } else if (drag.querySelector(".blockelemtype").value == "c1") {
            drag.innerHTML += `
            <div class="codeautomation_block">
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
    document.getElementById("close").addEventListener("click", function(){
        console.log('asddddddddd');
       if (rightcard) {
           rightcard = false;
           document.getElementById("properties").classList.remove("expanded");
           setTimeout(function(){
                document.getElementById("propwrap").classList.remove("itson"); 
           }, 300);
            tempblock.classList.remove("selectedblock");
       } 
    });
    
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
            tempblock = event.target.closest(".block");
            rightcard = true;
            document.getElementById("properties").classList.add("expanded");
            document.getElementById("propwrap").classList.add("itson");
            tempblock.classList.add("selectedblock");
       } 
    }
}
addEventListener("mousedown", beginTouch, false);
addEventListener("mousemove", checkTouch, false);
addEventListener("mouseup", doneTouch, false);
addEventListenerMulti("touchstart", beginTouch, false, ".block");
});

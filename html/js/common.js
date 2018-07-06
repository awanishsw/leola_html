function inputHint() {
    $("form").submit(function() {
        return $("input, textarea").each(function() {
            $(this).val() != $(this).attr("alt") || $(this).hasClass("clone") || ($(this).val(""), $(this).removeClass("inputalt"))
        }), !0
    }), $("input, textarea").each(function() {
        $(this).attr("alt") && ($(this).val() != $(this).attr("alt") || $(this).hasClass("inputalt") || $(this).addClass("inputalt"), $(this).focus(function() {
            var e = $(this).attr("alt");
            $(this).val() == e && ($(this).hasClass("clone") || $(this).removeClass("inputalt"), $(this).hasClass("clone") ? ($(this).addClass("hide"), $(this).parent().find(".password").css("visibility", "visible"), $(this).parent().find(".password").css("color", "#000000"), $(this).parent().find(".password").focus()) : $(this).hasClass("password") || $(this).val(""))
        }), $(this).blur(function() {
            var e = $(this).attr("alt");
            "" == $(this).val() && ($(this).hasClass("inputalt") || $(this).addClass("inputalt"), $(this).hasClass("password") ? ($(this).css("visibility", "hidden"), $(this).parent().find(".clone").removeClass("hide")) : $(this).val(e))
        }))
    })
}

function inputStyle() {
    $("input:text,input:password").each(function() {
        $(this).hasClass("input") || ($(this).addClass("input"), $(this).wrap('<span class="input" />'))
    }), $("input:checkbox").each(function() {
        $(this).hasClass("checkbox") || $(this).addClass("checkbox")
    }), $("input:submit,input:button").each(function() {
        $(this).hasClass("button") || $(this).addClass("button")
    })
}

function searchFieldFunc() {
    $("#searchbar").find('input[name="search"]').focus(function() {
        $(this).animate({
            width: "250"
        }, 500, function() {})
    }), $("#searchbar").find('input[name="search"]').blur(function() {
        $(this).animate({
            width: "150"
        }, 500, function() {})
    }), $("#searchbar .inputIcon").click(function() {
        $(this).parents("form:first").submit()
    })
}

function addDays(e, t) {
    var a = Date.parse(e);
    return (a = new Date(a)).setDate(a.getDate() + 1 * t), a.getMonth() + 1 + "/" + a.getDate() + "/" + a.getFullYear()
}

function substractDays(e, t) {
    var a = Date.parse(e);
    return (a = new Date(a)).setDate(a.getDate() - 1 * t), a.getMonth() + 1 + "/" + a.getDate() + "/" + a.getFullYear()
}

function isValidDate(e) {
    if (!/^\d{1,2}\/\d{1,2}\/\d{1,4}$/.test(e)) return !1;
    var t = e.split("/"),
        a = parseInt(t[1], 10),
        s = parseInt(t[0], 10),
        n = /^\d{1,2}\/\d{1,2}\/\d{1,3}$/.test(e) ? parseInt(1 * t[2] + 2e3, 10) : parseInt(t[2], 10);
    if (n < 1e3 || n > 3e3 || 0 == s || s > 12) return !1;
    var i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return (n % 400 == 0 || n % 100 != 0 && n % 4 == 0) && (i[1] = 29), a > 0 && a <= i[s - 1]
}

function confirmAction(e, t) {
    var a = _getMsgByType(t);
    return confirm(a) && (window.location = e), !1
}

function _getMsgByType(e) {
    switch (void 0 === e ? "" : e) {
        case "lot":
            msg = 'Are you sure to delete this "Lot"?', msg += "\r\nThis action cannot be undone.";
            break;
        case "user":
            msg = 'Are you sure to delete this "User"?', msg += "\r\nThis action cannot be undone.";
            break;
        case "user-admin":
            msg = 'Are you sure to delete this "Admin User"?', msg += "\r\nThis action cannot be undone.";
            break;
        case "option":
            msg = 'Are you sure to delete this "Option"?', msg += "\r\nThis action cannot be undone.";
            break;
        case "model":
            msg = 'Are you sure to delete this "Model"?', msg += "\r\nThis action cannot be undone.";
            break;
        case "community":
            msg = 'Are you sure to delete this "Community"?', msg += "\r\nThis action cannot be undone.";
            break;
        default:
            msg = "Are you sure?", msg += "\r\nThis action cannot be undone."
    }
    return msg
}

function goTo(e) {
    window.location = e
}

function checkAll(e, t) {
    $("." + t).each(function() {
        $(this).prop("checked", $(e).prop("checked"))
    })
}

function substr_count(e, t, a, s) {
    var n = 0;
    a && (e = e.substr(a)), s && (e = e.substr(0, s));
    for (var i = 0; i < e.length; i++) t == e.substr(i, t.length) && n++;
    return n
}

function taskChange(e, t) {
    $.ajax({
        url: window.appPath + "modules/workorder/ajax.update.php",
        type: "POST",
        data: {
            item: "task",
            id: t,
            meta: e,
            value: "Y"
        },
        error: function() {
            alert("Unable to save changes to task. Please try again!")
        },
        success: function(e) {
            "success" != e.substr(0, 7) && alert("Unable to save changes to task. Please try again!")
        },
        timeout: 3e3
    })
}

function completeToggle(e, t) {
    var a = $(e).is(":checked") ? "Y" : "";
    $.ajax({
        url: window.appPath + "modules/workorder/ajax.update.php",
        type: "POST",
        data: {
            item: "task",
            id: t,
            meta: "date_completed",
            value: a
        },
        error: function() {
            alert("Unable to save changes to task. Please try again!"), a = "Y" != a, $(e).prop("checked", a)
        },
        success: function(s) {
            if ("no_vendor" == s.substr(0, 9)) a = "Y" != a, $(e).prop("checked", a), vendorPopup(e, t);
            else if ("success" != s.substr(0, 7)) alert("Unable to save changes to task. Please try again!"), a = "Y" != a, $(e).prop("checked", a);
            else {
                s = s.substr(8);
                var n = $(e).attr("id").replace("task_complete_", ""),
                    i = 0 == substr_count(s, "|") ? s : s.substr(0, 1 * s.indexOf("|") - 1);
                if ($("#task_completed_date_" + n).html(i), 1 == substr_count(s, "|qc_checklist|")) {
                    var o = s.substr(1 * s.lastIndexOf("|") + 1);
                    $("#qcPopupContent").html('<div style="max-width:400px;"><h2><span class="fa fa-list green big_icon"></span> QC Checklist Required</h2><br><b>Would you like to complete the QC checklist now?</b><br><br>You have 24 hours to complete the checklist or 5 days if it\'s a frame task.<div style="margin-top:15px;"><input type="button" value="Yes" onClick="redirect(\'' + window.appPath + "modules/checklist/edit.php?id=" + o + '\')"> <span style="padding-left:25px;"><input type="button" value="No" onClick="$.fancybox.close()"></span></div></div>'), inputHint(), inputStyle(), $("#qcPopup").click()
                }
                1 == substr_count(s, "|ask_pump|") && ($("#qcPopupContent").html('<h2>Pump Measurements</h2>Please enter this task\'s pump measurements.<div><table cellpadding="0" cellspacing="0"><tr><td style="padding-right:65px;"><label>Yards</label><input id="measurement_yards" type="text" name="measurement_yards" style="width:65px;"></td><td><label>Total Square Fotage</label><input id="measurement_total_square_fotage" type="text" name="measurement_total_square_fotage" style="width:65px;"></td></tr><tr><td style="padding-right:65px;"><label>4&quot;</label><input id="measurement_4" type="text" name="measurement_4" style="width:65px;"></td><td><label>6&quot;</label><input id="measurement_6" type="text" name="measurement_6" style="width:65px;"></td></tr></table><label>Additional Notes</label><textarea id="pump_notes"></textarea><div style="margin-top:15px;"><input type="button" value="Save Details" onClick="savePump(' + t + ')"></div><div>'), inputHint(), inputStyle(), $("#qcPopup").click()), 1 == substr_count(s, "|ask_drives|") && ($("#qcPopupContent").html('<h2>Walk/Drive Measurements</h2>Please enter this task\'s walk/drive measurements.<div><table cellpadding="0" cellspacing="0"><tr><td style="padding-right:65px;"><label>Yards</label><input id="measurement_yards" type="text" name="measurement_yards" style="width:65px;"></td><td><label>Total Square Fotage</label><input id="measurement_total_square_fotage" type="text" name="measurement_total_square_fotage" style="width:65px;"></td></tr><tr><td style="padding-right:65px;"><label>4&quot;</label><input id="measurement_4" type="text" name="measurement_4" style="width:65px;"></td><td><label>6&quot;</label><input id="measurement_6" type="text" name="measurement_6" style="width:65px;"></td></tr></table><label>Additional Notes</label><textarea id="drive_notes"></textarea><div style="margin-top:15px;"><input type="button" value="Save Details" onClick="saveWalkDrive(' + t + ')"></div><div>'), inputHint(), inputStyle(), $("#qcPopup").click())
            }
        },
        timeout: 3e3
    })
}

function vendorPopup(e, t) {
    $("#vendorPopupContent").find("select").val("").end(), $("#vendorPopup").click();
    var a = $(e).is(":checked") ? "Y" : "";
    a = "Y" != a, $("#vendorPopupSave").unbind("click"), $("#vendorPopupSave").click(function() {
        var s = $("#vendorPopupContent #vendor").val();
        $.ajax({
            url: window.appPath + "modules/workorder/ajax.update.php",
            type: "POST",
            data: {
                item: "task",
                id: t,
                meta: "vendor",
                value: s
            },
            error: function() {
                alert("Unable to save. Please try again!")
            },
            success: function(s) {
                "success" != s.substr(0, 7) ? alert("Unable to save. Please try again!") : ($(e).prop("checked", a), $.fancybox.close(), completeToggle(e, t))
            },
            timeout: 3e3
        })
    })
}

function qcPopup(e) {
    $("#fancyboxGeneralContent").html('<div style="max-width:400px;"><h2><span class="fa fa-list green big_icon"></span> QC Checklist Required</h2><br><b>Would you like to complete the QC checklist now?</b><br><br>You have 24 hours to complete the checklist or 5 days if it\'s a frame task.<div style="margin-top:15px;"><input type="button" value="Yes" onClick="redirect(\'' + window.appPath + "modules/checklist/edit.php?id=" + e + '\')"> <span style="padding-left:25px;"><input type="button" value="No" onClick="$.fancybox.close()"></span></div></div>'), inputHint(), inputStyle(), $("#fancyboxGeneral").click()
}

function savePump(e) {
    var t;
    t = $("#measurement_yards").val() + "|" + $("#measurement_total_square_fotage").val() + "|" + $("#measurement_4").val() + "|" + $("#measurement_6").val();
    var a = $("#pump_notes").val(),
        s = "||=||";
    $.ajax({
        url: window.appPath + "modules/workorder/ajax.update.php",
        type: "POST",
        data: {
            item: "note",
            id: e,
            meta: s,
            value: "pump" + s + t + s + a
        },
        error: function() {
            alert("Unable to save. Please try again!")
        },
        success: function(e) {
            "success" != e.substr(0, 7) ? alert("Unable to save. Please try again!") : $.fancybox.close()
        },
        timeout: 3e3
    })
}

function saveWalkDrive(e) {
    var t;
    t = $("#measurement_yards").val() + "|" + $("#measurement_total_square_fotage").val() + "|" + $("#measurement_4").val() + "|" + $("#measurement_6").val();
    var a = $("#drive_notes").val(),
        s = "||=||";
    $.ajax({
        url: window.appPath + "modules/workorder/ajax.update.php",
        type: "POST",
        data: {
            item: "note",
            id: e,
            meta: s,
            value: "drive" + s + t + s + a
        },
        error: function() {
            alert("Unable to save. Please try again!")
        },
        success: function(e) {
            "success" != e.substr(0, 7) ? alert("Unable to save. Please try again!") : $.fancybox.close()
        },
        timeout: 3e3
    })
}

function paidToggle(e, t, a) {
    var s = $(e).is(":checked") ? $(e).val() : 0;
    $.ajax({
        url: window.appPath + "modules/reports/ajax.paid.php",
        type: "POST",
        data: {
            id: t,
            paid: s
        },
        error: function() {
            alert("Unable to save. Please try again!"), 0 != s ? $(e).prop("checked", !1) : $(e).prop("checked", !0)
        },
        success: function(n) {
            if ("success" != n.substr(0, 7)) alert("Unable to save. Please try again!"), 0 != s ? $(e).prop("checked", !1) : $(e).prop("checked", !0);
            else {
                var i = $("#task_org_" + t).val(),
                    o = "#paid_dt_" + t;
                0 != s ? ($(o).html(n.substr(8)), $("#task_" + t).closest("tr").addClass("bg_green"), a && paymentDate()) : ($("#task_" + t).html(i), $(o).html(""), $("#task_" + t).closest("tr").removeClass("bg_green"))
            }
        },
        timeout: 3e3
    })
}

function paidCheckbox(e, t) {
    $(e).prop("checked") ? $("#task_paid_" + t).val($(e).val()) : $("#task_paid_" + t).val(0)
}

function invoicedCheckbox(e, t) {
    $(e).prop("checked") ? $("#task_invoiced_" + t).val($(e).val()) : $("#task_invoiced_" + t).val(0)
}

function taskMassChange(e) {
    var t, a, s = $(e).val();
    $(".task_checkbox").each(function() {
        if ($(this).is(":checked")) switch (t = $(this).attr("id").replace("task_checkbox_", ""), a = document.getElementById("task_complete_" + t), s) {
            case "started":
            case "red_tag":
            case "epo":
            case "back_charge":
                taskChange(s, t);
                break;
            case "completed":
                $("#task_complete_" + t).prop("checked", !0), completeToggle(a, t)
        }
    }), $(e).val(""), $(".task_checkbox").prop("checked", !1)
}

function calendarDateChange() {
    if (!$("#start_date").val()) return $.alert({
        boxWidth: "30%",
        title: "Error!",
        useBootstrap: !1,
        content: "You need to select Start Date."
    }), !1;
    $("#frmFilter").submit()
}

function gotoWorkOrder(e, t) {
    var a = t ? "#workorder_template_task_" + t : "";
    window.location = window.appPath + "modules/workorder/edit.php?id=" + e + a
}

function saveFilterOptions() {
    return $.ajax({
        url: window.appPath + "modules/settings/ajax.schedule_filter.php",
        type: "POST",
        data: {
            builder: $("#filterBuilder").val(),
            community: $("#filterCommunity").val(),
            super: $("#filterSuper").val(),
            account_manager: $("#filterAccountManager").val(),
            task: $("#filterTask").val(),
            lot: $("#filterLot").val()
        },
        error: function() {
            alert("Unable to save. Please try again!")
        },
        success: function(e) {
            "success" != e.substr(0, 7) ? alert("Unable to save. Please try again!") : ($("#fancyboxGeneralContent").html('<h2><span class="fa fa-check-circle green big_icon"></span> Filter Options Saved!</h2>Your filter options have been saved. Now when viewing a schedule it will have these filters applied by default.'), $("#fancyboxGeneral").click())
        },
        timeout: 3e3
    }), !1
}

function filterOptions() {
    $("#filter_options").removeClass("hide"), $("#filter_options").hide(), $("#viewFilterOptions").click(function() {
        return $(this).toggleClass("active"), $("#filter_options").slideToggle(), !1
    }), $("#frmFilter").submit(function() {
        $("#start_date").val() && $("#frmFilter input[name=start_date]").val($("#start_date").val()), $("#end_date").val() && $("#frmFilter input[name=end_date]").val($("#end_date").val()), $("#schedule_date").val() && $("#frmFilter input[name=schedule_date]").val($("#schedule_date").val())
    })
}

function closeFilterOptions() {
    return $("#filter_options").slideUp(), $("#viewFilterOptions").removeClass("active"), !1
}

function redirect(e) {
    window.location = e
}

function startMessagePopup() {
    window.receiveNoticePopups && (window.messagePopupInterval = setInterval(window.messagePopup, 3e3))
}

function addNoteAssignee(e, t) {
    return $("#notes_assigned_" + t + " select:first").clone().val("").wrap('<div class="note_assignee_div"></div>').parent().append('<a href="#" class="note_assignee_button" onClick="return removeNoteAssignee(this);"><span class="fa fa-times-circle red"></span></a>').appendTo($(e).parent()), !1
}

function removeNoteAssignee(e) {
    return $(e).parent().remove(), !1
}

function addNoteFile(e) {
    return $("#notes_file_" + e + " input").clone().val("").wrap('<div class="note_file_div"></div>').parent().append('<a href="#" class="note_file_button" onClick="return removeNoteFile(this);"><span class="fa fa-times-circle red"></span></a>').appendTo("#notes_files_" + e), !1
}

function removeNoteFile(e) {
    return $(e).parent().remove(), !1
}
$(function() {
    var e = new Date;
    window.messagePopupDate = Math.round(e.getTime() / 1e3), window.messagePopup = function() {}, startMessagePopup(), $("#messagePopupLink").fancybox()
}), $(function() {
    inputHint(), inputStyle(), searchFieldFunc(), filterOptions(), $(".fancybox").fancybox({
        closeBtn: !!flagShowCloseBtn,
        closeClick: !1,
        beforeShow: function() {
            clearInterval(window.messagePopupInterval)
        },
        afterClose: function() {
            startMessagePopup()
        },
        helpers: {
            overlay: {
                closeClick: !1
            }
        }
    })
});
var showLoadere, showLoadert, js_debug = !1;

function loadjscssfile(e, t) {
    if ("js" == t)(a = document.createElement("script")).setAttribute("type", "text/javascript"), a.setAttribute("src", e);
    else if ("css" == t) {
        var a;
        (a = document.createElement("link")).setAttribute("rel", "stylesheet"), a.setAttribute("type", "text/css"), a.setAttribute("href", e)
    }
    if (void 0 !== a) {
        var s = document.getElementsByTagName("head")[0];
        s.insertBefore(a, s.children[0])
    }
}

function showAJAXLoader(e, t) {
    showLoadere = e, showLoadert = t; 
        var e = '<div id="loaderDiv"><img src="' + window.appPath + 'images/loaders/loader-ajax.gif" /></div>';
        $(".ms-options-wrap > .ms-options").css("z-index", "100");
        $("#loaderDiv").html('');
        $((void 0 === showLoadert ? "div" : showLoadert) + "#" + showLoadere).append(e);
}

function hideAJAXLoader(e, t) {
    $("#loaderDiv").remove();
}
js_debug && (window.onerror = function(e, t, a) {
    return alert("Error message: " + e + "\nURL: " + t + "\nLine Number: " + a), !0
}), $(document).ready(function() {
    $(".toggle-menu").click(function() {
        $("#nav").slideToggle()
    }), $(".errMess").is(":visible") && ($(".hide-form").is(":visible") || $(".hide-form").slideDown()), $(".view-form").click(function() {
        $(".hide-form").slideToggle()
    })
}), loadjscssfile(window.appPath + "js/jquery.blockUI.js", "js");
var builderValues = [],
    communityValues = [];

function changeChildDropDown(e, t, a, s, n) {
    if ("builder" == t) {
        var i = "filterCommunity";
        communityValues = [];
        var o = "";
        null != (builderValues = $('[name="schedule_filters[' + t + '][]"]').val()) && (o = builderValues.join(","))
    } else {
        if ("community" != t) return;
        i = "filterSuper", builderValues = [], o = "", null != (communityValues = $('[name="schedule_filters[' + t + '][]"]').val()) && (o = communityValues.join(","))
    }
    if (o = e.includes(",") ? e.replace(/,+/g, ",").replace(/(^,)|(,$)/g, "") : o.replace(/,+/g, ",").replace(/(^,)|(,$)/g, ""), "1" == n) var r = "&selectedLots=1";
    showAJAXLoader("filter_options"), $(".blockUI").css("z-index", "9999"), $.ajax({
        url: window.appPath + "modules/schedule/ajax/ajax.load-dropdown.php?optionValue=" + o + "&type=" + t + "&nextElementValue=" + a + "&optionalElementValue=" + s + r,
        success: function(e) {
            var a = JSON.parse(e);
            "builder" == t ? $("." + i).html(a.d + a.a) : "community" == t && ($(".filterSuper").html(a.d + a.a), $(".filterAccountManager").html(a.b), "1" != n && $(".filterLot").html(a.c)), hideAJAXLoader("filter_options")
        }
    })
}

function getUrlVars(e) {
    for (var t, a = [], s = decodeURIComponent(window.location.href.slice(window.location.href.indexOf("?") + 1)).split("&"), n = "", i = 0; i < s.length; i++) e == (t = s[i].split("="))[0] && (n = n + "," + t[1]), a[e] = n.replace(/,+/g, ",").replace(/(^,)|(,$)/g, "");
    return a
}
var builderId = getUrlVars("schedule_filters[builder][]")["schedule_filters[builder][]"],
    communityId = getUrlVars("schedule_filters[community][]")["schedule_filters[community][]"],
    superId = getUrlVars("schedule_filters[super][]")["schedule_filters[super][]"],
    accountManagerId = getUrlVars("schedule_filters[account_manager][]")["schedule_filters[account_manager][]"];
$(function() {
    $("body").on("click", ".ms-selectall", function() {
        var e = $(this).parent().parent().prevAll("select").attr("id");
        if ("unselect all" == $(this).text().toLowerCase()) $("#" + e + " option").prop("selected", "selected"), $(this).parent().prevAll("button").text($("#" + e + " option").length + " selected"), "filterBuilder" == e && changeChildDropDown("", "builder", ""), "filterCommunity" == e && changeChildDropDown("", "community", "", "", null);
        else {
            $("#" + e + " option").removeAttr("selected");
            var t = e.replace("filter", "");
            $(this).parent().prevAll("button").text("--Select " + t + "--"), "filterBuilder" == e && changeChildDropDown("", "builder", ""), "filterCommunity" == e && changeChildDropDown("", "community", "", "", null)
        }
    })
});
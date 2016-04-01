!function (e, t) {
    "object" == typeof exports ? module.exports = t(require("angular")) : "function" == typeof define && define.amd ? define(["angular"], t) : t(e.angular)
}(this, function (e) {
    "use strict";
    e.module("ngWYSIWYG", ["ngSanitize"]), e.module("ngWYSIWYG").config(["$provide", function (e) {
        e.decorator("$sanitize", ["$delegate", "$log", function (e, t) {
            return function (t, n) {
                var o = e(t, n);
                return o
            }
        }])
    }]), e.module("ngWYSIWYG").constant("NGP_EVENTS", {
        ELEMENT_CLICKED: "ngp-element-clicked",
        CLICK_AWAY: "ngp-click-away"
    }), e.module("ngWYSIWYG").directive("ngpColorsGrid", ["NGP_EVENTS", function (e) {
        var t = function (t, n) {
            t.$on(e.CLICK_AWAY, function () {
                t.$apply(function () {
                    t.show = !1
                })
            }), n.parent().bind("click", function (e) {
                e.stopPropagation()
            }), t.colors = ["#000000", "#993300", "#333300", "#003300", "#003366", "#000080", "#333399", "#333333", "#800000", "#FF6600", "#808000", "#008000", "#008080", "#0000FF", "#666699", "#808080", "#FF0000", "#FF9900", "#99CC00", "#339966", "#33CCCC", "#3366FF", "#800080", "#999999", "#FF00FF", "#FFCC00", "#FFFF00", "#00FF00", "#00FFFF", "#00CCFF", "#993366", "#C0C0C0", "#FF99CC", "#FFCC99", "#FFFF99", "#CCFFCC", "#CCFFFF", "#99CCFF", "#CC99FF", "#FFFFFF"], t.pick = function (e) {
                t.onPick({color: e})
            }, n.ready(function () {
                function e(t) {
                    1 == t.nodeType && (t.setAttribute("unselectable", "on"), t.unselectable = "on");
                    for (var n = t.firstChild; n;)e(n), n = n.nextSibling
                }

                for (var t = 0; t < document.getElementsByClassName("ngp-colors-grid").length; t += 1)e(document.getElementsByClassName("ngp-colors-grid")[t])
            })
        };
        return {
            link: t,
            scope: {show: "=", onPick: "&"},
            restrict: "AE",
            template: '<ul ng-show="show" class="ngp-colors-grid"><li ng-style="{\'background-color\': color}" title: "{{color}}" ng-repeat="color in colors" unselectable="on" ng-click="pick(color)"></li></ul>'
        }
    }]), e.module("ngWYSIWYG").directive("ngpSymbolsGrid", ["NGP_EVENTS", function (e) {
        var t = function (t, n) {
            t.$on(e.CLICK_AWAY, function () {
                t.$apply(function () {
                    t.show = !1
                })
            }), n.parent().bind("click", function (e) {
                e.stopPropagation()
            }), t.symbols = ["&iexcl;", "&iquest;", "&ndash;", "&mdash;", "&raquo;", "&laquo;", "&copy;", "&divide;", "&micro;", "&para;", "&plusmn;", "&cent;", "&euro;", "&pound;", "&reg;", "&sect;", "&trade;", "&yen;", "&deg;", "&forall;", "&part;", "&exist;", "&empty;", "&nabla;", "&isin;", "&notin;", "&ni;", "&prod;", "&sum;", "&uarr;", "&rarr;", "&darr;", "&spades;", "&clubs;", "&hearts;", "&diams;", "&aacute;", "&agrave;", "&acirc;", "&aring;", "&atilde;", "&auml;", "&aelig;", "&ccedil;", "&eacute;", "&egrave;", "&ecirc;", "&euml;", "&iacute;", "&igrave;", "&icirc;", "&iuml;", "&ntilde;", "&oacute;", "&ograve;", "&ocirc;", "&oslash;", "&otilde;", "&ouml;", "&szlig;", "&uacute;", "&ugrave;", "&ucirc;", "&uuml;", "&yuml;"], t.pick = function (e) {
                t.onPick({symbol: e})
            }, n.ready(function () {
                function e(t) {
                    1 == t.nodeType && (t.setAttribute("unselectable", "on"), t.unselectable = "on");
                    for (var n = t.firstChild; n;)e(n), n = n.nextSibling
                }

                for (var t = 0; t < document.getElementsByClassName("ngp-symbols-grid").length; t += 1)e(document.getElementsByClassName("ngp-symbols-grid")[t])
            })
        };
        return {
            link: t,
            scope: {show: "=", onPick: "&"},
            restrict: "AE",
            template: '<ul ng-show="show" class="ngp-symbols-grid"><li ng-repeat="symbol in symbols" unselectable="on" ng-click="pick(symbol)" ng-bind-html="symbol"></li></ul>'
        }
    }]), e.module("ngWYSIWYG").service("ngpImageResizer", ["NGP_EVENTS", function (e) {
        function t(e) {
            e.preventDefault()
        }

        function n(e) {
            e.preventDefault(), e.stopPropagation(), v.style.height = "", v.style.width = "", l()
        }

        function o(e) {
            e.preventDefault(), e.stopPropagation(), v.style.width = "100%", v.style.height = "", l()
        }

        function i(e) {
            return e.target != y ? (c.removeEventListener("mousemove", r), void(h = !1)) : (e.stopPropagation(), e.preventDefault(), c.addEventListener("mousemove", r), void(h = !0))
        }

        function r(e) {
            e.stopPropagation(), e.preventDefault();
            var t = e.pageY, n = t - (v.getBoundingClientRect().top + d.pageYOffset);
            v.style.height = n + "px", v.style.width = "", g && e.clientY > g && d.innerHeight - e.clientY <= 45 && d.scrollTo(0, d.innerHeight), g = e.clientY, l()
        }

        function a(e, t) {
            return t == p || h ? void c.removeEventListener("mousemove", r) : "IMG" !== t.tagName ? s() : (p.parentNode || u.appendChild(p), v = t, void l())
        }

        function l() {
            var e = d.getComputedStyle(v);
            p.style.height = e.getPropertyValue("height"), p.style.width = e.getPropertyValue("width"), p.style.top = v.getBoundingClientRect().top + d.pageYOffset + "px", p.style.left = v.getBoundingClientRect().left + d.pageXOffset + "px", p.style.display = "block"
        }

        function s(e) {
            p.parentNode && (e && "IMG" === e.target.tagName || (p.style.display = "none", g = null))
        }

        var c, d, u, p, g, m, y, f, h, v, b = this;
        b.setup = function (r, l) {
            d = l.defaultView, c = l, u = c.querySelector("body"), m = r, p = c.createElement("div"), p.className = "ngp-image-resizer", p.style.position = "absolute", p.style.border = "1px dashed black", p.style.display = "none", p.setAttribute("contenteditable", !1), y = c.createElement("div"), y.style.position = "absolute", y.style.height = "10px", y.style.width = "10px", y.style.bottom = "-5px", y.style.right = "-5px", y.style.border = "1px solid black", y.style.backgroundColor = "#fff", y.style.cursor = "se-resize", y.setAttribute("contenteditable", !1), p.appendChild(y), f = c.createElement("div"), f.style.position = "absolute", f.style.height = "30px", f.style.width = "150px", f.style.bottom = "-30px", f.style.left = "0", p.appendChild(f);
            var g = c.createElement("button");
            g.addEventListener("click", n), g.innerHTML = "Auto", f.appendChild(g);
            var h = c.createElement("button");
            h.addEventListener("click", o), h.innerHTML = "100%", f.appendChild(h), c.addEventListener("mousedown", i), c.addEventListener("mouseup", i), d.parent.document.addEventListener("mouseup", i), u.addEventListener("mscontrolselect", t), m.$on(e.ELEMENT_CLICKED, a), m.$on(e.CLICK_AWAY, s)
        }
    }]);
    var t = '<div class="tinyeditor"><div class="tinyeditor-header" ng-hide="editMode">{toolbar}<div style="clear: both;"></div></div><div class="sizer" ngp-resizable><textarea data-placeholder-attr="" style="-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; resize: none; width: 100%; height: 100%;" ng-show="editMode" aria-label="Comment" ng-model="content"></textarea><iframe style="-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: 100%; height: 100%;" ng-hide="editMode" ngp-content-frame="{sanitize: config.sanitize}" content-style="{contentStyle}" ng-model="content"></iframe></div><div class="tinyeditor-footer"></div></div>';
    return e.module("ngWYSIWYG").directive("wysiwygEdit", ["ngpUtils", "NGP_EVENTS", "$rootScope", "$compile", "$timeout", "$q", function (n, o, i, r, a, l) {
        var s = function (a, s, c, d) {
            function u() {
                null == m && (m = document.querySelector("wysiwyg-edit").querySelector("iframe"), y = m.contentDocument, f = y.defaultView)
            }

            function p(e) {
                a.$broadcast("insertElement", e)
            }

            function g(e) {
                var t = "<" + e.type;
                if (t += ' class="' + e["class"], h && (t += " tinyeditor-control-fa"), t += '" ', "div" == e.type) {
                    if (e.title && (t += 'title="' + e.title + '" '), e.backgroundPos && !h && (t += 'style="background-position: ' + e.backgroundPos + '; position: relative;" '), e.pressed && (t += "ng-class=\"{'pressed': cursorStyle." + e.pressed + '}" '), e.command) {
                        var n = "'" + e.command + "'";
                        e.commandParameter && (n += ", '" + e.commandParameter + "'"), t += 'ng-click="execCommand(' + n + ')" '
                    } else e.specialCommand && (t += 'ng-click="' + e.specialCommand + '" ');
                    t += ">", e.faIcon && h && "-" != e.faIcon && (t += '<i class="fa fa-' + e.faIcon + '"></i>'), e.faIcon && h && "-" == e.faIcon && (t += '<div class="hr"></div>'), e.inner && (t += e.inner)
                } else"select" == e.type && (t += 'ng-model="' + e.model + '" ', t += 'ng-options="' + e.options + '" ', t += 'ng-change="' + e.change + '" ', t += '<option value="">' + e.title + "</option>");
                return t += "</" + e.type + ">"
            }

            a.editMode = !1, a.cursorStyle = {}, document.addEventListener("click", function () {
                i.$broadcast(o.CLICK_AWAY)
            });
            var m = null, y = null, f = null;
            a.panelButtons = {
                "-": {type: "div", "class": "tinyeditor-divider"},
                bold: {
                    type: "div",
                    title: "Bold",
                    "class": "tinyeditor-control",
                    faIcon: "bold",
                    backgroundPos: "34px -120px",
                    pressed: "bold",
                    command: "bold"
                },
                italic: {
                    type: "div",
                    title: "Italic",
                    "class": "tinyeditor-control",
                    faIcon: "italic",
                    backgroundPos: "34px -150px",
                    pressed: "italic",
                    command: "italic"
                },
                underline: {
                    type: "div",
                    title: "Underline",
                    "class": "tinyeditor-control",
                    faIcon: "underline",
                    backgroundPos: "34px -180px",
                    pressed: "underline",
                    command: "underline"
                },
                strikethrough: {
                    type: "div",
                    title: "Strikethrough",
                    "class": "tinyeditor-control",
                    faIcon: "strikethrough",
                    backgroundPos: "34px -210px",
                    pressed: "strikethrough",
                    command: "strikethrough"
                },
                subscript: {
                    type: "div",
                    title: "Subscript",
                    "class": "tinyeditor-control",
                    faIcon: "subscript",
                    backgroundPos: "34px -240px",
                    pressed: "sub",
                    command: "subscript"
                },
                superscript: {
                    type: "div",
                    title: "Superscript",
                    "class": "tinyeditor-control",
                    faIcon: "superscript",
                    backgroundPos: "34px -270px",
                    pressed: "super",
                    command: "superscript"
                },
                leftAlign: {
                    type: "div",
                    title: "Left Align",
                    "class": "tinyeditor-control",
                    faIcon: "align-left",
                    backgroundPos: "34px -420px",
                    pressed: "alignmet == 'left'",
                    command: "justifyleft"
                },
                centerAlign: {
                    type: "div",
                    title: "Center Align",
                    "class": "tinyeditor-control",
                    faIcon: "align-center",
                    backgroundPos: "34px -450px",
                    pressed: "alignment == 'center'",
                    command: "justifycenter"
                },
                rightAlign: {
                    type: "div",
                    title: "Right Align",
                    "class": "tinyeditor-control",
                    faIcon: "align-right",
                    backgroundPos: "34px -480px",
                    pressed: "alignment == 'right'",
                    command: "justifyright"
                },
                blockJustify: {
                    type: "div",
                    title: "Block Justify",
                    "class": "tinyeditor-control",
                    faIcon: "align-justify",
                    backgroundPos: "34px -510px",
                    pressed: "alignment == 'justify'",
                    command: "justifyfull"
                },
                orderedList: {
                    type: "div",
                    title: "Insert Ordered List",
                    "class": "tinyeditor-control",
                    faIcon: "list-ol",
                    backgroundPos: "34px -300px",
                    command: "insertorderedlist"
                },
                unorderedList: {
                    type: "div",
                    title: "Insert Unordered List",
                    "class": "tinyeditor-control",
                    faIcon: "list-ul",
                    backgroundPos: "34px -330px",
                    command: "insertunorderedlist"
                },
                outdent: {
                    type: "div",
                    title: "Outdent",
                    "class": "tinyeditor-control",
                    faIcon: "outdent",
                    backgroundPos: "34px -360px",
                    command: "outdent"
                },
                indent: {
                    type: "div",
                    title: "Indent",
                    "class": "tinyeditor-control",
                    faIcon: "indent",
                    backgroundPos: "34px -390px",
                    command: "indent"
                },
                removeFormatting: {
                    type: "div",
                    title: "Remove Formatting",
                    "class": "tinyeditor-control",
                    faIcon: "eraser",
                    backgroundPos: "34px -720px",
                    command: "removeformat"
                },
                undo: {
                    type: "div",
                    title: "Undo",
                    "class": "tinyeditor-control",
                    faIcon: "undo",
                    backgroundPos: "34px -540px",
                    command: "undo"
                },
                redo: {
                    type: "div",
                    title: "Redo",
                    "class": "tinyeditor-control",
                    faIcon: "repeat",
                    backgroundPos: "34px -570px",
                    command: "redo"
                },
                fontColor: {
                    type: "div",
                    title: "Font Color",
                    "class": "tinyeditor-control",
                    faIcon: "font",
                    backgroundPos: "34px -779px",
                    specialCommand: "showFontColors = !showFontColors",
                    inner: '<ngp-colors-grid show="showFontColors" on-pick="setFontColor(color)"><ngp-colors-grid>'
                },
                backgroundColor: {
                    type: "div",
                    title: "Background Color",
                    "class": "tinyeditor-control",
                    faIcon: "paint-brush",
                    backgroundPos: "34px -808px",
                    specialCommand: "showBgColors = !showBgColors",
                    inner: '<ngp-colors-grid show="showBgColors" on-pick="setBgColor(color)"><ngp-colors-grid>'
                },
                image: {
                    type: "div",
                    title: "Insert Image",
                    "class": "tinyeditor-control",
                    faIcon: "picture-o",
                    backgroundPos: "34px -600px",
                    specialCommand: "insertImage()"
                },
                hr: {
                    type: "div",
                    title: "Insert Horizontal Rule",
                    "class": "tinyeditor-control",
                    faIcon: "-",
                    backgroundPos: "34px -630px",
                    command: "inserthorizontalrule"
                },
                symbols: {
                    type: "div",
                    title: "Insert Special Symbol",
                    "class": "tinyeditor-control",
                    faIcon: "cny",
                    backgroundPos: "34px -838px",
                    specialCommand: "showSpecChars = !showSpecChars",
                    inner: '<ngp-symbols-grid show="showSpecChars" on-pick="insertSpecChar(symbol)"><ngp-symbols-grid>'
                },
                link: {
                    type: "div",
                    title: "Insert Hyperlink",
                    "class": "tinyeditor-control",
                    faIcon: "link",
                    backgroundPos: "34px -660px",
                    specialCommand: "insertLink()"
                },
                unlink: {
                    type: "div",
                    title: "Remove Hyperlink",
                    "class": "tinyeditor-control",
                    faIcon: "chain-broken",
                    backgroundPos: "34px -690px",
                    command: "unlink"
                },
                print: {
                    type: "div",
                    title: "Print",
                    "class": "tinyeditor-control",
                    faIcon: "print",
                    backgroundPos: "34px -750px",
                    command: "print"
                },
                font: {
                    type: "select",
                    title: "Font",
                    "class": "tinyeditor-font",
                    model: "font",
                    options: "a as a for a in fonts",
                    change: "fontChange()"
                },
                size: {
                    type: "select",
                    title: "Size",
                    "class": "tinyeditor-size",
                    model: "fontsize",
                    options: "a.key as a.name for a in fontsizes",
                    change: "sizeChange()"
                },
                format: {
                    type: "select",
                    title: "Style",
                    "class": "tinyeditor-size",
                    model: "textstyle",
                    options: "s.key as s.name for s in styles",
                    change: "styleChange()"
                }
            };
            var h = a.config && a.config.fontAwesome;
            a.toolbar = a.config && a.config.toolbar ? a.config.toolbar : [{
                name: "basicStyling",
                items: ["bold", "italic", "underline", "strikethrough", "subscript", "superscript", "leftAlign", "centerAlign", "rightAlign", "blockJustify", "-"]
            }, {name: "paragraph", items: ["orderedList", "unorderedList", "outdent", "indent", "-"]}, {
                name: "doers",
                items: ["removeFormatting", "undo", "redo", "-"]
            }, {name: "colors", items: ["fontColor", "backgroundColor", "-"]}, {
                name: "links",
                items: ["image", "hr", "symbols", "link", "unlink", "-"]
            }, {name: "tools", items: ["print", "-"]}, {name: "styling", items: ["font", "size", "format"]}];
            var v = [];
            e.forEach(a.toolbar, function (t, n) {
                var o = [];
                e.forEach(t.items, function (e, t) {
                    var n = a.panelButtons[e];
                    n || (n = a.config.buttons[e]), this.push(g(n))
                }, o), this.push('<div class="tinyeditor-buttons-group">' + o.join("") + "</div>")
            }, v);
            var b = t.replace("{toolbar}", v.join(""));
            b = b.replace("{contentStyle}", c.contentStyle || ""), s.html(b), r(s.contents())(a), a.execCommand = function (e, t) {
                switch (e) {
                    case"bold":
                        a.cursorStyle.bold = !a.cursorStyle.bold;
                        break;
                    case"italic":
                        a.cursorStyle.italic = !a.cursorStyle.italic;
                        break;
                    case"underline":
                        a.cursorStyle.underline = !a.cursorStyle.underline;
                        break;
                    case"strikethrough":
                        a.cursorStyle.strikethrough = !a.cursorStyle.strikethrough;
                        break;
                    case"subscript":
                        a.cursorStyle.sub = !a.cursorStyle.sub;
                        break;
                    case"superscript":
                        a.cursorStyle["super"] = !a.cursorStyle["super"];
                        break;
                    case"justifyleft":
                        a.cursorStyle.alignment = "left";
                        break;
                    case"justifycenter":
                        a.cursorStyle.alignment = "center";
                        break;
                    case"justifyright":
                        a.cursorStyle.alignment = "right";
                        break;
                    case"justifyfull":
                        a.cursorStyle.alignment = "justify"
                }
                a.$broadcast("execCommand", {command: e, arg: t})
            }, a.fonts = ["Verdana", "Arial", "Arial Black", "Arial Narrow", "Courier New", "Century Gothic", "Comic Sans MS", "Georgia", "Impact", "Tahoma", "Times", "Times New Roman", "Webdings", "Trebuchet MS"], a.fontChange = function () {
                a.execCommand("fontname", a.font)
            }, a.fontsizes = [{key: 1, name: "x-small"}, {key: 2, name: "small"}, {key: 3, name: "normal"}, {
                key: 4,
                name: "large"
            }, {key: 5, name: "x-large"}, {key: 6, name: "xx-large"}, {
                key: 7,
                name: "xxx-large"
            }], a.mapFontSize = {10: 1, 13: 2, 16: 3, 18: 4, 24: 5, 32: 6, 48: 7}, a.sizeChange = function () {
                a.execCommand("fontsize", a.fontsize)
            }, a.styles = [{name: "Paragraph", key: "<p>"}, {name: "Header 1", key: "<h1>"}, {
                name: "Header 2",
                key: "<h2>"
            }, {name: "Header 3", key: "<h3>"}, {name: "Header 4", key: "<h4>"}, {
                name: "Header 5",
                key: "<h5>"
            }, {name: "Header 6", key: "<h6>"}], a.styleChange = function () {
                a.execCommand("formatblock", a.textstyle)
            }, a.showFontColors = !1, a.setFontColor = function (e) {
                a.execCommand("foreColor", e)
            }, a.showBgColors = !1, a.setBgColor = function (e) {
                a.execCommand("hiliteColor", e)
            }, a.showSpecChars = !1, a.insertSpecChar = function (e) {
                p(e)
            }, a.insertLink = function () {
                if (u(), null != f.getSelection().focusNode) {
                    var t = n.getSelectionBoundaryElement(f, !0), o = "http://";
                    if (t && "A" == t.nodeName) {
                        o = t.href;
                        var i = y.createRange();
                        i.setStart(t.firstChild, 0), i.setEnd(t.firstChild, t.firstChild.length);
                        var r = f.getSelection();
                        r.removeAllRanges(), r.addRange(i)
                    }
                    var s;
                    s = a.api && a.api.insertLink && e.isFunction(a.api.insertLink) ? a.api.insertLink.apply(a.api.scope || null, [o]) : prompt("Please enter the URL", "http://"), l.when(s).then(function (e) {
                        a.execCommand("createlink", e)
                    })
                }
            }, a.insertImage = function () {
                var t;
                a.api && a.api.insertImage && e.isFunction(a.api.insertImage) ? t = a.api.insertImage.apply(a.api.scope || null) : (t = prompt("Please enter the picture URL", "http://"), t = '<img src="' + t + '">'), l.when(t).then(function (e) {
                    p(e)
                })
            }, s.ready(function () {
                function e(t) {
                    1 == t.nodeType && (t.setAttribute("unselectable", "on"), t.unselectable = "on");
                    for (var n = t.firstChild; n;)e(n), n = n.nextSibling
                }

                for (var t = 0; t < document.getElementsByClassName("tinyeditor-header").length; t += 1)e(document.getElementsByClassName("tinyeditor-header")[t])
            }), a.$on("cursor-position", function (e, t) {
                a.cursorStyle = t, a.font = t.font.replace(/(')/g, ""), a.fontsize = a.mapFontSize[t.size] ? a.mapFontSize[t.size] : 0
            })
        };
        return {link: s, scope: {content: "=", api: "=", config: "="}, restrict: "AE", replace: !0}
    }]), e.module("ngWYSIWYG").directive("ngpContentFrame", ["ngpImageResizer", "ngpUtils", "NGP_EVENTS", "$compile", "$timeout", "$sanitize", function (t, n, o, i, r, a) {
        var l = function (i, l, s, c) {

            r(function() {
                var d = l[0].contentDocument;
                d.open(), d.write('<!DOCTYPE html><html><head></head><body contenteditable="true"></body></html>'), d.close(), d.designMode = "On", t.setup(i, d);
                var u = e.element(l[0].contentDocument.body), p = e.element(l[0].contentDocument.head);
                u.attr("contenteditable", "true"), d.addEventListener("click", function (e) {
                    "HTML" === e.target.tagName && e.target.querySelector("body").focus(), i.$emit(o.ELEMENT_CLICKED, e.target)
                }), s.contentStyle && p.append('<link rel="stylesheet" type="text/css" href="' + s.contentStyle + '">'), c.$render = function () {
                    u[0].innerHTML = c.$viewValue ? i.config && i.config.sanitize ? a(c.$viewValue) : c.$viewValue : ""
                }, i.sync = function () {
                    i.$evalAsync(function (e) {
                        c.$setViewValue(u.html())
                    })
                };
                var g = null;
                u.bind("click keyup change paste", function () {
                    g && r.cancel(g), g = r(function () {
                        var e = u[0].ownerDocument, t = e.querySelector(".ngp-image-resizer"), o = u[0].innerHTML;
                        t && (o = o.replace(t.outerHTML, "")), c.$setViewValue(o);
                        var r = n.getSelectionBoundaryElement(l[0].contentWindow, !0);
                        if (r) {
                            var a = l[0].contentWindow.getComputedStyle(r), s = {
                                bold: "bold" == a.getPropertyValue("font-weight") || parseInt(a.getPropertyValue("font-weight")) >= 700,
                                italic: "italic" == a.getPropertyValue("font-style"),
                                underline: "underline" == a.getPropertyValue("text-decoration"),
                                strikethrough: "line-through" == a.getPropertyValue("text-decoration"),
                                font: a.getPropertyValue("font-family"),
                                size: parseInt(a.getPropertyValue("font-size")),
                                color: a.getPropertyValue("color"),
                                sub: "sub" == a.getPropertyValue("vertical-align"),
                                "super": "super" == a.getPropertyValue("vertical-align"),
                                background: a.getPropertyValue("background-color"),
                                alignment: a.getPropertyValue("text-align")
                            };
                            i.$emit("cursor-position", s)
                        }
                    }, 100, !0)
                }), i.range = null, i.getSelection = function () {
                    if (d.getSelection) {
                        var e = d.getSelection();
                        e.getRangeAt && e.rangeCount && (i.range = e.getRangeAt(0))
                    }
                }, i.restoreSelection = function () {
                    if (i.range && d.getSelection) {
                        var e = d.getSelection();
                        e.removeAllRanges(), e.addRange(i.range)
                    }
                }, i.$on("execCommand", function (e, t) {
                    //console.log("execCommand: "), console.log(t),
                    l[0].contentDocument.body.focus();
                    var n = d.selection;
                    if (n) {
                        var o = n.createRange();
                        d.execCommand(t.command, 0, t.arg), o.collapse(!1), o.select()
                    } else d.execCommand(t.command, 0, t.arg);
                    d.body.focus(), i.sync()
                }), i.$on("insertElement", function (e, t) {
                    var n, o;
                    if (d.defaultView.getSelection) {
                        if (n = d.defaultView.getSelection(), n.getRangeAt && n.rangeCount) {
                            o = n.getRangeAt(0), o.deleteContents();
                            var r = d.createElement("div");
                            r.innerHTML = t;
                            for (var a, l, s = d.createDocumentFragment(); a = r.firstChild;)l = s.appendChild(a);
                            s.firstChild;
                            o.insertNode(s), l && (o = o.cloneRange(), o.setStartAfter(l), o.collapse(!0), n.removeAllRanges(), n.addRange(o))
                        }
                    } else d.selection && "Control" != d.selection.type && d.selection.createRange().pasteHTML(t);
                    i.sync()
                }), i.$on("$destroy", function () {
                });
                try {
                    d.execCommand("styleWithCSS", 0, 0), d.execCommand("enableObjectResizing", !1, "false"), d.execCommand("contentReadOnly", 0, "false")
                } catch (m) {
                    try {
                        d.execCommand("useCSS", 0, 1)
                    } catch (m) {
                    }
                }



            }, 1000);
                    };
        return {link: l, require: "ngModel", scope: {config: "=ngpContentFrame"}, replace: !0, restrict: "AE"}
    }]), e.module("ngWYSIWYG").directive("ngpResizable", ["$document", function (e) {
        return function (t, n) {
            var o = e[0], i = n[0], r = o.createElement("span");
            r.className = "resizer", i.appendChild(r), r.addEventListener("mousedown", function () {
                function e(e) {
                    e.preventDefault();
                    var t = e.pageY;
                    e.view != o.defaultView && (t = e.pageY + e.view.frameElement.getBoundingClientRect().top + o.defaultView.pageYOffset);
                    var n = t - (i.getBoundingClientRect().top + o.defaultView.pageYOffset), r = i.style.height.replace("px", "");
                    r && n > r && window.innerHeight - e.clientY <= 45 && o.defaultView.scrollBy(0, n - r), i.style.height = n + "px"
                }

                function t() {
                    o.removeEventListener("mousemove", e), o.removeEventListener("mouseup", t);
                    for (var n = o.querySelectorAll("iframe"), i = 0; i < n.length; i++)n[i].contentWindow.document.removeEventListener("mouseup", t), n[i].contentWindow.document.removeEventListener("mousemove", e)
                }

                o.addEventListener("mousemove", e), o.addEventListener("mouseup", t);
                for (var n = o.querySelectorAll("iframe"), r = 0; r < n.length; r++)n[r].contentWindow.document.addEventListener("mouseup", t), n[r].contentWindow.document.addEventListener("mousemove", e)
            })
        }
    }]), e.module("ngWYSIWYG").service("ngpUtils", [function () {
        var e = this;
        e.getSelectionBoundaryElement = function (e, t) {
            var n, o, i = null, r = e.document;
            return r.selection ? (n = r.selection.createRange(), n.collapse(t), n.parentElement()) : (r.getSelection ? (o = r.getSelection(), o.rangeCount > 0 && (n = o.getRangeAt(0), i = n[t ? "startContainer" : "endContainer"], 3 === i.nodeType && (i = i.parentNode))) : e.getSelection && (o = e.getSelection(), o.rangeCount > 0 && (n = o.getRangeAt(0), i = n[t ? "startContainer" : "endContainer"], 3 === i.nodeType && (i = i.parentNode))), i)
        }
    }]), "ngWYSIWYG"
});

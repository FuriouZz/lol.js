"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeChildren = exports.createDocument = exports.createElements = exports.createElement = void 0;
var PARSER = new DOMParser();
function createElement(template) {
    var is_text_node = false;
    template = template.trim();
    if (template.length === 0) {
        is_text_node = true;
        template = '.';
    }
    var doc = PARSER.parseFromString(template, 'text/html');
    var $node = doc.body.childNodes[0];
    if (is_text_node) {
        $node.textContent = '';
    }
    return $node;
}
exports.createElement = createElement;
function createElements(template) {
    template = template.trim();
    var doc = PARSER.parseFromString(template, 'text/html');
    var $nodes = Array.from(doc.body.childNodes);
    return $nodes;
}
exports.createElements = createElements;
function createDocument(template) {
    template = template.trim();
    var doc = PARSER.parseFromString(template, 'text/html');
    return doc;
}
exports.createDocument = createDocument;
function removeChildren($el) {
    while ($el.firstChild) {
        if ($el.lastChild == null) {
            break;
        }
        $el.lastChild.remove();
    }
}
exports.removeChildren = removeChildren;

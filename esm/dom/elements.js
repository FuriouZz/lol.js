const PARSER = new DOMParser();
export function createElement(template) {
    let is_text_node = false;
    template = template.trim();
    if (template.length === 0) {
        is_text_node = true;
        template = '.';
    }
    const doc = PARSER.parseFromString(template, 'text/html');
    const $node = doc.body.childNodes[0];
    if (is_text_node) {
        $node.textContent = '';
    }
    return $node;
}
export function createElements(template) {
    template = template.trim();
    const doc = PARSER.parseFromString(template, 'text/html');
    const $nodes = Array.from(doc.body.childNodes);
    return $nodes;
}
export function createDocument(template) {
    template = template.trim();
    const doc = PARSER.parseFromString(template, 'text/html');
    return doc;
}
export function removeChildren($el) {
    while ($el.firstChild) {
        if ($el.lastChild == null) {
            break;
        }
        $el.lastChild.remove();
    }
}

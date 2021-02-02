export declare function createElement<T extends ChildNode = ChildNode>(template: string): T;
export declare function createElements<T extends Array<ChildNode> = Array<ChildNode>>(template: string): T;
export declare function createDocument(template: string): Document;
export declare function removeChildren($el: Element): void;

export function loadFile(file, type, beforeLoad) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (typeof beforeLoad === "function")
            beforeLoad(reader);
        reader.addEventListener("error", reject, { once: true });
        reader.addEventListener("load", () => {
            if (!reader.result) {
                reject('[FileReader] No result found');
                return;
            }
            resolve({
                file,
                type,
                reader,
                response: reader.result
            });
        }, { once: true });
        if (type == 'arraybuffer') {
            reader.readAsArrayBuffer(file);
        }
        else if (type == 'binarystring') {
            reader.readAsBinaryString(file);
        }
        else if (type == 'dataurl') {
            reader.readAsDataURL(file);
        }
        else if (type == 'text') {
            reader.readAsText(file);
        }
    });
}

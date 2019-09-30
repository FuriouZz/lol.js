export function load(file, type) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
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
        };
        reader.onerror = function (e) {
            reject(e);
        };
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

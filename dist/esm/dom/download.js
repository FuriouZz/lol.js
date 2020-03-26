export function saveAs(data, filename = 'file.json', type = 'application/json') {
    return new Promise((resolve) => {
        const blob = new Blob([data], { type });
        const $a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        $a.href = url;
        $a.download = filename;
        document.body.appendChild($a);
        $a.click();
        setTimeout(() => {
            document.body.removeChild($a);
            window.URL.revokeObjectURL(url);
            resolve();
        }, 100);
    });
}

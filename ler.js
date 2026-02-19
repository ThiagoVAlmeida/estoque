const fs = require('fs/promises');

module.exports = async (caminho) => {
    try {
        return await fs.readFile(caminho, 'utf-8');
    } catch (e) {
        return "[]";
    }
};

import '../../lib/reflect-metadata/Reflect.js';
export function getMetadata(obj) {
    let ret = new Array();
    let metakeys = Reflect.getMetadataKeys(obj);
    let keys = Object.keys(obj);
    metakeys.forEach(m => {
        let _item = { owner: 'object', metaKey: m, metaValue: Reflect.getMetadata(m, obj) };
        ret.push(_item);
    });
    keys.forEach(k => {
        let _metaKeys = Reflect.getMetadataKeys(obj, k);
        _metaKeys.forEach(m => {
            let _item = {
                owner: 'property',
                ownerName: k,
                metaKey: m,
                metaValue: Reflect.getMetadata(m, obj, k)
            };
            ret.push(_item);
        });
    });
    return ret;
}

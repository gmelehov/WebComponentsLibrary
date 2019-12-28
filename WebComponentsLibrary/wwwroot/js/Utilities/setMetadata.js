export function setMetadata(obj, data) {
    if (obj && data && data.owner) {
        switch (data.owner) {
            case 'object':
                if (data.metaKey && data.metaValue)
                    Reflect.defineMetadata(data.metaKey, data.metaValue, obj);
                break;
            case 'property':
                if (data.metaKey && data.metaValue && data.ownerName)
                    Reflect.defineMetadata(data.metaKey, data.metaValue, obj, data.ownerName);
                break;
            default:
                break;
        }
        ;
    }
    ;
}

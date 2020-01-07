import { IMetadataDescriptor } from '../Interfaces/interfaces';
import '../../lib/reflect-metadata/Reflect.js';






export function getMetadata(obj: Object): Array<IMetadataDescriptor>
{
	let ret = new Array<IMetadataDescriptor>();

  let metakeys = Reflect.getMetadataKeys(obj);
	let keys = Object.keys(obj);

	metakeys.forEach(m =>
	{
		let _item: IMetadataDescriptor = { owner: 'object', metaKey: m, metaValue: Reflect.getMetadata(m, obj) };
		ret.push(_item);
	});

	keys.forEach(k =>
	{
		let _metaKeys = Reflect.getMetadataKeys(obj, k);
		_metaKeys.forEach(m =>
		{
			let _item: IMetadataDescriptor = {
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
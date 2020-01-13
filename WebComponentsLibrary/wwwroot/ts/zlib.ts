import * as Utils from './utilities-index.js';
import * as Elems from './elems-index.js';


window['ZLib'] = {};


declare namespace ZLib
{
  let Utils;
  let Elems;
};


ZLib.Utils = Utils;
ZLib.Elems = Elems;


export default ZLib;
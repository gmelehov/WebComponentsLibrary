import { PolymerElement } from '../../lib/@polymer/polymer/polymer-element.js';
import { microTask } from '../../lib/@polymer/polymer/lib/utils/async.js';





/**
 * Динамически заменяет текущий инстанс HTML-шаблона 
 * в указанном Polymer-элементе на его новый подготовленный экземпляр. 
 * 
 * В случае, если у указанного элемента отсутствует shadowRoot - 
 * создает и подключает его в режиме 'open'.
 * 
 * Выполняет принудительный сброс любого имеющегося HTML-содержимого 
 * shadowRoot, после чего вставляет в него подготовленный инстанс HTML-шаблона.
 * 
 * После выполнения всех этих операций сгенерированный этим методом
 * инстанс HTML-шаблона полностью теряет свою функциональность
 * и не может быть использован повторно.
 * 
 * @param elem экземпляр Polymer-элемента, в котором необходимо динамически заменить HTML-шаблон
 * @param templ новый HTML-шаблон (<template></template>), соответствующий модели Polymer-элемента elem
 */
export function changePolymerElementTemplate<T extends PolymerElement>(elem: T, templ: HTMLTemplateElement): void
{
  let _instance = elem._stampTemplate(templ);
  if (!elem.shadowRoot)
  {
    elem.attachShadow({ mode: 'open', delegatesFocus: true });
  };
  elem.shadowRoot.innerHTML = '';
  microTask.run(() => { elem.shadowRoot.appendChild(_instance); });
}